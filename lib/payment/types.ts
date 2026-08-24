export type PaymentOrder = {
  reference: string;
  productId: string;
  amount: number;
  currency: "USD";
};

export type PaymentInitResult =
  | { ok: true; transactionId: string; amount: number }
  | { ok: false; error: string };

export type PaymentProcess = {
  id: number;
  transactionId: string;
  signal: AbortSignal;
};
export type PaymentResult =
  | {
      status: "success";
      reference: string;
      transactionId: string;
      total_amount: number;
      phone: string;
      email: string;
    }
  | { status: "failed"; reference: string; message: string };

/**
 * Contract every payment provider must implement.
 * The checkout UI depends only on this interface, never on a
 * concrete provider (e.g. Payphone), so providers can be swapped
 * without touching UI code.
 */
export interface PaymentProvider {
  readonly id: string;
  readonly displayName: string;
  initializePayment(order: PaymentOrder): Promise<PaymentInitResult>;
  processPayment(data: PaymentProcess): Promise<PaymentResult>;
  destroyPaymentBrick(): void;
}

/**
 * Payphone would response like this when we try to confirm a payment.
 */
export interface PayphoneConfirmResponse {
  transactionStatus: "Approved" | "Rejected" | "Cancelled";
  transactionId: number;
  amount: number;
  email: string;
  reference: string;
  phoneNumber: string;
  optionalParameter4?: string;
  document: string;
  cardHolder?: string;
  cardBrand?: string;
  cardType: string;
  lastDigits?: string;
  cardToken?: string;
}
