import { getCustomerDocuments } from "@/actions/customer/marketplace/documents/get-document-product-action";
import DocumentsClient from "./documents-client";
import { getCategories } from "@/actions/customer/marketplace/get-categories-action";
import { getFunctions } from "@/actions/customer/marketplace/get-functions-actions";
import { getCountries } from "@/actions/customer/marketplace/get-countries-action";

interface DocumentsPageProps {
  searchParams: Promise<{
    query?: string;
    categoryId?: string;
    functionId?: string;
    exportCountrieId?: string;
  }>;
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
    const searchParamsData = await searchParams;

    const [documents, categories, functions, countries] = await Promise.all([
        getCustomerDocuments(searchParamsData),
        getCategories(),
        getFunctions(),
        getCountries()
    ]);

    return (
        <DocumentsClient 
            documents={documents}
            searchParams={searchParamsData}
            categories={categories}
            functions={functions}
            countries={countries}
        />
    );
}
