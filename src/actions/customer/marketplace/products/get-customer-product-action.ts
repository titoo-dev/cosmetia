"use server";

import { ProductEntity } from "@/lib/types/types";


export async function getCustomerProducts(params?: {
    query?: string;
    categoryId?: string;
    functionId?: string;
    exportCountrieId?: string;
}): Promise<ProductEntity[]> {
    try {
        const searchParams = new URLSearchParams();
        
        if (params?.query) {
            searchParams.append('query', params.query);
        }
        if (params?.categoryId) {
            searchParams.append('categoryId', params.categoryId);
        }
        if (params?.functionId) {
            searchParams.append('functionId', params.functionId);
        }
        if (params?.exportCountrieId) {
            searchParams.append('exportCountrId', params.exportCountrieId);
        }

        const queryString = searchParams.toString();
        const url = `${process.env.API_BASE_URL}/product/customer/marketplace${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const products = await response.json();

        return products;
    } catch (error) {
        console.error("Error fetching customer products:", error);
        return [];
    }
}

export async function getCustomerProductById(id: string): Promise<ProductEntity | null> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/product/customer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const product = await response.json();

        console.log('PRODUCT', product);

        return product;
    } catch (error) {
        console.error(`Error fetching customer product ${id}:`, error);
        return null;
    }
}

