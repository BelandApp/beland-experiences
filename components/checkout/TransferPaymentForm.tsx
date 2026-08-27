"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote, CopyIcon } from "lucide-react";
import type { Publication } from "@/lib/data/types";
import { submitOrder } from "@/lib/orders/cash-order";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";

type CashPaymentFormProps = {
  publication: Publication;
  quantity: number;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  check: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^((?:\+593|0)9\d{8}|(?:\+593|0)[2-7]\d{7})$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Ingresa tu nombre completo.";
  } else if (values.name.trim().length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Ingresa tu número de teléfono.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Ingresa un teléfono válido, por ejemplo: 0991234567.";
  }
  if (values.check === false) {
    errors.check = "Debes marcar la casilla";
  }
  if (!values.email.trim()) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  return errors;
}

export function TransferPaymentForm({
  publication,
  quantity,
}: CashPaymentFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    check: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [info, setInfo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await submitOrder({
      items: [
        {
          product_id: publication.id,
          quantity: quantity,
        },
      ],
      is_reserved: false,
      payment_method: "TRANSFER",
      total_amount: publication.price,
      phone: values.phone.trim(),
      email: values.email.trim(),
    });

    if (result.status === "RESERVADO") {
      router.push(
        `/checkout/transfer-confirmation?product=${publication.id}&name=${encodeURIComponent(values.name.trim())}&ref=${encodeURIComponent(result.purchase_id)}`,
      );
    } else {
      setSubmitting(false);
      alert("Error al comprar el producto");
    }
  };
  const handleCopy = (text: string) => {
    setInfo(true);
    navigator.clipboard.writeText(text);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setInfo(false);
    }, 700);
    return () => {
      clearTimeout(timer);
    };
  }, [info]);
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft"
    >
      <div className="flex items-center gap-2 text-[15px] font-semibold tracking-wide text-foreground">
        <Banknote className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
        Tus datos de contacto
      </div>
      <p className="-mt-2 text-[13px] leading-relaxed text-muted">
        Realiza la transferencia y muestra el comprobante al retirar el
        producto.
      </p>
      <div className="p-4 rounded-2xl bg-primary shadow text-white relative">
        {info && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center m-10 rounded-2xl bg-slate-200 animate-fade-in text-black shadow">
            Copiado
          </div>
        )}
        <div className="flex flex-row justify-between gap-2">
          <p>Nombre: Beland Ecuador SAS</p>
          <CopyIcon
            onClick={() => handleCopy("Beland Ecuador SAS")}
            size={16}
            className="hover:text-black hover:scale-120"
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p>Nro. de cuenta: 58445376</p>
          <CopyIcon
            onClick={() => handleCopy("58445376")}
            size={16}
            className="hover:text-black hover:scale-120"
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <p>Ruc Nro.: 1793236748001</p>
          <CopyIcon
            onClick={() => handleCopy("1793236748001")}
            size={16}
            className="hover:text-black hover:scale-120"
          />
        </div>

        <p>Tipo de cuenta: Ahorros</p>
      </div>
      <Input
        label="Nombre completo"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="María Fernanda López"
        value={values.name}
        onChange={(event) => updateField("name", event.target.value)}
        error={errors.name}
      />

      <Input
        label="Teléfono"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder="0991234567"
        value={values.phone}
        onChange={(event) => updateField("phone", event.target.value)}
        error={errors.phone}
      />

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="maria@correo.com"
        value={values.email}
        onChange={(event) => updateField("email", event.target.value)}
        error={errors.email}
      />
      <div className="flex flex-row items-center justify-between gap-4">
        <input
          type="checkbox"
          checked={values.check}
          onChange={(event) => updateField("check", event.target.checked)}
        />
        <span className="text-sm">
          Declaro haber realizado la transferencia a los datos bancarios
          suministrados y entiendo las consecuencias de reservar un producto
          indebidamente
        </span>
      </div>
      {errors.check && (
        <p role="alert" className="text-[13px] text-destructive">
          {errors.check}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="mt-1 w-full"
      >
        {submitting ? (
          <>
            <Spinner size="sm" variant="inverse" />
            Registrando tu pedido…
          </>
        ) : (
          "Confirmar pedido"
        )}
      </Button>
    </form>
  );
}
