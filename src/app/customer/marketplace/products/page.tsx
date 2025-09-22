import { Star } from "lucide-react";
import { getCustomerProducts } from "@/actions/customer/marketplace/products/get-customer-product-action";
import ProductsClient from "./products-client";
import { getCategories } from "@/actions/customer/marketplace/get-categories-action";

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
    const categories = await getCategories();

    return (
        <ProductsClient 
            products={products}
            searchParams={searchParamsData}
            categories={categories}
        />
    );
}
