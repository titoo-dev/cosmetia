"use server";

import { DocumentEntity } from "@/lib/types/types";

export async function getCustomerDocuments(params?: {
    query?: string;
    categoryId?: string;
    functionId?: string;
    exportCountrieId?: string;
}): Promise<DocumentEntity[]> {
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
        const url = `${process.env.API_BASE_URL}/document/customer${queryString ? `?${queryString}` : ''}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const documents = await response.json();

        console.log(documents);

        return documents;
    } catch (error) {
        console.error("Error fetching customer documents:", error);
        return [];
    }
}

export async function getCustomerDocumentById(id: string): Promise<DocumentEntity | null> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/document/customer/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (response.status !== 200) {
            return null;
        }

        const document: DocumentEntity = await response.json();
        return document;
    } catch (error) {
        return null;
    }
}
