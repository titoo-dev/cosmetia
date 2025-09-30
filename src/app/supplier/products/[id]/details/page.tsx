import { getSupplierProductDetails } from "@/actions/supplier/products/[id]/get-supplier-product-details";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./product-details-client";

interface ProductDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const paramsData = await params;
  const product = await getSupplierProductDetails(paramsData.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}
