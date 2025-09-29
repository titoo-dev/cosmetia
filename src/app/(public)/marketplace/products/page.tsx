import { getCustomerProducts } from "@/actions/customer/marketplace/products/get-customer-product-action";
import ProductsClient from "./products-client";
import { getCategories } from "@/actions/customer/marketplace/get-categories-action";
import { getFunctions } from "@/actions/customer/marketplace/get-functions-actions";
import { getCountries } from "@/actions/customer/marketplace/get-countries-action";

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

    const [products, categories, functions, countries] = await Promise.all([
        getCustomerProducts(searchParamsData),
        getCategories(),
        getFunctions(),
        getCountries()
    ]);

    console.log('products', products);

    return (
        <ProductsClient 
            products={products}
            searchParams={searchParamsData}
            categories={categories}
            functions={functions}
            countries={countries}
        />
    );
}
