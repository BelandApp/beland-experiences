import type { Metadata } from "next";
import { Checkout } from "@/components/checkout/Checkout";
import { CheckoutEmpty } from "@/components/checkout/CheckoutEmpty";
import { experiencesApi } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Finalizar compra — Beland",
};

export default async function CheckoutPage(props: PageProps<"/checkout">) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;

  const publication = await experiencesApi.getById(productId!);
  if (!publication) {
    return <CheckoutEmpty />;
  }

  return <Checkout publication={publication} />;
}
