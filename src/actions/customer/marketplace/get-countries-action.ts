"use server";

import { ProductCountryEntity } from "@/lib/types/types";

export async function getCountries(): Promise<ProductCountryEntity[]> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/product/customer/filter/countries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}
