import { PayphoneProvider } from "./payphone-provider";
import type { PaymentProvider } from "./types";

let provider: PaymentProvider | undefined;

/**
 * Returns the active payment provider.
 *
 * This is the single integration boundary between the checkout UI and the
 * payment payphone/backend.
 */
export function getPaymentProvider(): PaymentProvider {
  if (!provider) {
    provider = new PayphoneProvider();
  }
  return provider;
}
