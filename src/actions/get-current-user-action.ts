'use server'

import { getAccessToken } from '@/lib/cookies-storage';
import { UserEntity } from '@/lib/types/types';


export async function getCurrentUserAction(): Promise<UserEntity | null> {
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

        const data: UserEntity = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}