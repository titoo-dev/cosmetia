'use server'

import { getAccessToken } from '@/lib/cookies-storage';
import { CustomerUserEntity } from '@/lib/types/types';

export async function getCurrentCustomerAction(): Promise<CustomerUserEntity | null> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${process.env.API_BASE_URL}/customer/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            console.error('Failed to fetch current customer:', response.statusText);
            return null;
        }

        const data: CustomerUserEntity = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching current customer:', error);
        return null;
    }
}
