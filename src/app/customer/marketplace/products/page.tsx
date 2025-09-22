import { Star } from "lucide-react";
import { getCustomerProducts } from "@/actions/customer/marketplace/products/get-customer-product-action";
import ProductsClient from "./products-client";

interface ProductsPageProps {
  searchParams: Promise<{
    query?: string;
    categoryId?: string;
    functionId?: string;
    exportCountrieId?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const searchParamsData = await searchParams;

    const products = await getCustomerProducts(searchParamsData);

    return (
        <ProductsClient 
            products={products}
            searchParams={searchParamsData}
        />
    );
}
