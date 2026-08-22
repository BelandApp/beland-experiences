const api = process.env.NEXT_PUBLIC_BACKEND_URL;
export type CashOrderInput = {
  productId: string;
  name: string;
  phone: string;
  email: string;
};

export type CashOrderResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock submission layer for cash orders.
 *
 * Replace the body of this function with a real API call when a backend is
 * available; the checkout UI keeps consuming CashOrderResult regardless.
 */
export async function submitCashOrder(
  input: CashOrderInput,
): Promise<CashOrderResult> {
  void input;
  await delay(1400);
  return {
    ok: true,
    reference: `EFV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  };
}
// TODO: REAL IMPLEMENTATION necesitamos del backend un endpoint que permita sin usuario crear una intencion de pago, solamente para guardar que efectivamente se compró. se manda el id de la transaccion y el monto.  luego se consulta para procesarlo, si esta todo correcto se indica que ya fue procesado, creando la idempotencia. chequear si el transaction id TX-time.now es el devuelto por payphone y usar ese mismo.
export type PaymentIntentResult = {
  ok: boolean;
  error?: string;
};
export async function paymentIntent(
  transactionId: string,
  amount: number,
): Promise<PaymentIntentResult> {
  const data = { transactionId, amount };
  const response = await fetch(`${api}/payment-intent`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
}
