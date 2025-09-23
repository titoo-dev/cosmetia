import { getCustomerSuppliers } from "@/actions/customer/suppliers/get-customer-suppliers";
import SuppliersClient from "./suppliers-client";
import { getCategories } from "@/actions/customer/marketplace/get-categories-action";
import { getCountries } from "@/actions/customer/marketplace/get-countries-action";

interface SuppliersPageProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    region?: string;
  }>;
}

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const searchParamsData = await searchParams;

  const [suppliers, categories, countries] = await Promise.all([
    getCustomerSuppliers(searchParamsData),
    getCategories(),
    getCountries()
  ]);

  return <SuppliersClient suppliers={suppliers} searchParams={searchParamsData} categories={categories} countries={countries} />;
}