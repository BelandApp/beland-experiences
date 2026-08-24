import type {
  PaymentInitResult,
  PaymentOrder,
  PaymentProcess,
  PaymentProvider,
  PaymentResult,
} from "./types";
import { confirmPayphoneTransaction } from "./utils";

/**
 * Real Payphone Brick integration point.
 */
export class PayphoneProvider implements PaymentProvider {
  readonly id = "payphone";
  readonly displayName = "Payphone";

  async loadPayphoneScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!document.getElementById("payphone-css")) {
        const link = document.createElement("link");
        link.id = "payphone-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.css";
        document.head.appendChild(link);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (window.PPaymentButtonBox) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://cdn.payphonetodoesposible.com/box/v2.0/payphone-payment-box.js";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("No se pudo cargar el script de Payphone."));
      document.body.appendChild(script);
    });
  }
  async destroyPaymentBrick() {
    try {
      const container = document.getElementById("pp-button");

      if (container) {
        container.innerHTML = "";
      }
    } catch (error) {
      console.error("Error limpiando Payphone:", error);
    }
  }
  /**
   * Inicializa el brick con la orden. Al pagar el usuario es redirigido a la pagina de /checkout/check
   * @param order
   * @returns {ok:true, reference: string}
   */
  async initializePayment(order: PaymentOrder): Promise<PaymentInitResult> {
    await this.loadPayphoneScript();
    try {
      const payphoneToken = process.env.NEXT_PUBLIC_PAYPHONE_TOKEN;
      const transactionId = `TX-${Date.now()}`;
      const payphoneConfig = {
        token: payphoneToken,
        clientTransactionId: transactionId,
        // if not natural number try> amount: Math.round(order.amount * 100),
        amount: Math.round(order.amount * 100),
        amountWithoutTax: Math.round(order.amount * 100),
        currency: "USD",
        storeId: process.env.NEXT_PUBLIC_PAYPHONE_STORE_ID,
        reference: `Pago por productoId: ${order.productId}`,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new window.PPaymentButtonBox(payphoneConfig).render("pp-button");

      return {
        ok: true,
        transactionId: transactionId,
        amount: order.amount,
      };
    } catch (error) {
      console.error(error);
      return { ok: false, error: String(error) };
    }
  }
  /**
   * Confirma el pago con payphone
   * @param id de
   * @returns {ok:true, reference: string}
   */
  async processPayment({
    id,
    transactionId,
    signal,
  }: PaymentProcess): Promise<PaymentResult> {
    const response = await confirmPayphoneTransaction(
      id,
      transactionId,
      signal,
    );
    if (response.transactionStatus != "Approved") {
      return {
        status: "failed",
        reference: response.reference,
        message: "No se pudo cobrar, intente nuevamente",
      };
    }
    return {
      status: "success",
      reference: response.reference,
      transactionId: String(response.transactionId),
      total_amount: response.amount,
      phone: response.phoneNumber ?? "sin numero",
      email: response.email ?? "sin mail",
    };
  }
}
