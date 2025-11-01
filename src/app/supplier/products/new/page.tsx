import { getCategories } from "@/actions/customer/marketplace/get-categories-action";
import { getFunctions } from "@/actions/customer/marketplace/get-functions-actions";
import { getCountries } from "@/actions/customer/marketplace/get-countries-action";
import NewProductClient from "./new-product-client";

export default async function NewProductPage() {
  const [categories, functions, countries] = await Promise.all([
    getCategories(),
    getFunctions(),
    getCountries(),
  ]);

  return (
    <NewProductClient
      categories={categories}
      functions={functions}
      countries={countries}
    />
  );
}
