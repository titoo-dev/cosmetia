import { getSupplierProducts } from "@/actions/supplier/products/get-supplier-products-action";
import SupplierProductsClient from "./supplier-products-client";

export default async function SupplierProductsPage() {

  const [products] = await Promise.all([
    getSupplierProducts(),
  ]);

  return (
    <SupplierProductsClient 
      products={products}
    />
  );
}
