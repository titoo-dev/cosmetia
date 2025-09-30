"use server";

import { SupplierUserEntity } from "@/lib/types/types";

export async function getCustomerSuppliers(params?: {
    query?: string;
    category?: string;
    region?: string;
}): Promise<SupplierUserEntity[]> {
    try {
        const searchParams = new URLSearchParams();
        
        if (params?.query) {
            searchParams.append('query', params.query);
        }
        if (params?.category) {
            searchParams.append('category', params.category);
        }
        if (params?.region) {
            searchParams.append('region', params.region);
        }

        const queryString = searchParams.toString();
        const url = `${process.env.API_BASE_URL}/supplier/customer${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const suppliers = await response.json();

        console.log('CUSTOMER SUPPLIERS', suppliers);

        return suppliers;
    } catch (error) {
        console.error("Error fetching customer suppliers:", error);
        return [];
    }
}

export async function getCustomerSupplierById(id: string): Promise<SupplierUserEntity | null> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/customer/suppliers/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const supplier = await response.json();
        return supplier;
    } catch (error) {
        console.error(`Error fetching customer supplier ${id}:`, error);
        return null;
    }
}
