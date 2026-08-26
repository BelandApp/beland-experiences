"use client";
import { useEffect } from "react";
import { Logo } from "../ui/Logo";
import { Spinner } from "../ui/Spinner";
import { useRouter } from "next/navigation";
import { getPaymentProvider } from "@/lib/payment/provider";
import { submitOrder } from "@/lib/orders/cash-order";

type CheckStateProps = {
  id?: string;
  clientTransactionId?: string;
};
export function CheckState({ id, clientTransactionId }: CheckStateProps) {
  const router = useRouter();

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    const controller = new AbortController();
    if (!id || !clientTransactionId) {
      router.replace(`/checkout/error?product=${productId ?? ""}`);
      return;
    }

    const checkPayment = async () => {
      const idNumber = Number(id);

      if (!Number.isFinite(idNumber)) {
        router.replace(`/checkout/error?product=${productId ?? ""}`);
        return;
      }

      const result = await getPaymentProvider().processPayment({
        id: idNumber,
        transactionId: clientTransactionId,
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      if (result.status === "success") {
        localStorage.setItem("email-order", result.email);
        submitOrder({
          payphone_transaction_id: result.transactionId,
          total_amount: result.total_amount,
          is_reserved: false,
          phone: result.phone ?? "no registro teléfono",
          payment_method: "PAYPHONE",
          email: result.email ?? "no registro email",
          items: [
            {
              product_id: productId ?? result.reference.split(":")[1]?.trim(),
              quantity: 1,
            },
          ],
        });
        router.replace(
          `/checkout/success?product=${productId ?? ""}&ref=${encodeURIComponent(
            result.reference,
          )}&tx=${encodeURIComponent(result.transactionId)}`,
        );
        return;
      }

      router.replace(
        `/checkout/error?product=${productId ?? ""}&ref=${encodeURIComponent(
          result.reference,
        )}`,
      );
    };

    void checkPayment();
    return () => {
      controller.abort();
      localStorage.removeItem("productId");
    };
  }, [id, clientTransactionId, router]);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border">
        <Logo row />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center items-center gap-6 px-6 py-10">
        <h2 className="text-xl font-semibold">
          Esperando confirmación de pago
        </h2>
        <Spinner />
        <p className="text-center">
          Apenas nos confirme Payphone serás redirigido, no cierres esta
          ventana.
        </p>
      </main>
    </div>
  );
}
