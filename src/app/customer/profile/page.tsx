import { getCurrentCustomerAction } from "@/actions/customer/profile/get-current-customer-action";
import CustomerProfileClient from "./profile-client";
import { getCurrentUserAction } from "@/actions/get-current-user-action";

export const dynamic = 'force-dynamic'

export default async function CustomerProfilePage() {
    const currentUser = await getCurrentUserAction();
    const customerData = await getCurrentCustomerAction();
    
    if (!currentUser || !customerData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
                    <p className="text-gray-600">Impossible de charger les données du profil client</p>
                </div>
            </div>
        );
    }

    return <CustomerProfileClient customerData={customerData} currentUser={currentUser} />;
}
