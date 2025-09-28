'use server'

import { getAccessToken } from '@/lib/cookies-storage';
import { SupplierUserEntity } from '@/lib/types/types';

export async function getCurrentSupplierAction(): Promise<SupplierUserEntity | null> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${process.env.API_BASE_URL}/supplier/supplier`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            console.error('Failed to fetch current supplier:', response.statusText);
            return null;
        }

        const data: SupplierUserEntity = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching current supplier:', error);
        return null;
    }
}
