'use server'

import { getAccessToken } from '@/lib/cookies-storage';
import { CustomerUserEntity, ProviderUserEntity, SupplierUserEntity, UserEntity } from '@/lib/types/types';


export type CurrentUser = UserEntity & {
  customer?: CustomerUserEntity;
  supplier?: SupplierUserEntity;
};



export async function getCurrentUserAction(): Promise<CurrentUser | null> {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${process.env.API_BASE_URL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status !== 200) {
            console.error('Failed to fetch current user:', response.statusText);
            return null;
        }

        const data: CurrentUser = await response.json();

        if (data.role === 'CUSTOMER') {
            const customerResponse = await fetch(`${process.env.API_BASE_URL}/customer/customer`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (customerResponse.status === 200) {
                const customerData = await customerResponse.json();
                data.customer = customerData;
            }
        } else if (data.role === 'SUPPLIER') {
            const supplierResponse = await fetch(`${process.env.API_BASE_URL}/supplier/supplier`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (supplierResponse.status === 200) {
                const supplierData = await supplierResponse.json();
                data.supplier = supplierData;
            }
        }

        return data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}