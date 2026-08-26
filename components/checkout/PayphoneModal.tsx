"use client";

import { useEffect, useMemo, useState } from "react";
import type { Publication } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/publications";
import { getPaymentProvider } from "@/lib/payment/provider";
import type { PaymentOrder } from "@/lib/payment/types";
import { generateReference } from "@/lib/utils";
import { Dialog } from "@/components/ui/Dialog";

type PayphoneModalProps = {
  publication: Publication;
  quantity: number;
  totalAmount: number;
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "processing";

export function PayphoneModal({
  publication,
  open,
  quantity,
  onClose,
}: PayphoneModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [hasOpened, setHasOpened] = useState(open);

  if (open !== hasOpened) {
    setHasOpened(open);
    if (open) {
      setStatus("idle");
    }
  }

  const order = useMemo<PaymentOrder>(
    () => ({
      reference: generateReference("PYF"),
      productId: publication.id,
      amount: publication.price * quantity,
      currency: "USD",
    }),
    [publication.id, publication.price, quantity],
  );

  useEffect(() => {
    if (!open) return;
    const createOrder = async () => {
      // creamos orden para payphone
      await getPaymentProvider().initializePayment(order);
      localStorage.setItem("productId", order.productId);
    };

    createOrder();
    return () => {
      // ensure clean de paymentBrick
      getPaymentProvider().destroyPaymentBrick();
    };
  }, [open, order]);

  const handleClose = () => {
    if (status === "processing") return;

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Pagar con Payphone"
      description="Pago seguro mediante tarjeta de crédito o débito."
    >
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 ">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] text-muted">{publication.name}</span>
          <span className="text-sm font-semibold text-foreground">
            {formatPrice(publication.price * quantity)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {quantity} unidad{quantity > 1 ? "es" : ""}
        </span>
      </div>

      <div id="pp-button" />
    </Dialog>
  );
}
