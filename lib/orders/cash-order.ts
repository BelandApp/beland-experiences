import { apiFetch } from "../core";

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

export type order = {
  phone: string;
  is_reserved: boolean;
  payment_method: "PAYPHONE" | "TRANSFER";
  payphone_transaction_id?: string;
  email: string;
  total_amount: number;
  items: { product_id: string; quantity: number }[];
};
export type submitOrderResponse = {
  is_reserved: boolean;
  status: "RESERVADO" | "ENTREGADO" | "PAGADO";
  purchase_id: string;
  orange_reward_amount: number;
};
export async function submitOrder(data: order): Promise<submitOrderResponse> {
  return apiFetch("/api/experiences/purchases", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
