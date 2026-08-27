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
