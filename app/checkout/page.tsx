import type { Metadata } from "next";
import { getPublicationById } from "@/lib/data/publications";
import { Checkout } from "@/components/checkout/Checkout";
import { CheckoutEmpty } from "@/components/checkout/CheckoutEmpty";

export const metadata: Metadata = {
  title: "Finalizar compra — Maroon",
};

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;

  const publication = getPublicationById(productId);
  if (!publication) {
    return <CheckoutEmpty />;
  }

  return <Checkout publication={publication} />;
}