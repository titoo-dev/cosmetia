import { getCurrentSupplierAction } from "@/actions/supplier/profile/get-current-supplier-action";
import SupplierProfileClient from "./profile-client";

export const dynamic = 'force-dynamic'

export default async function SupplierProfilePage() {
    const supplierData = await getCurrentSupplierAction();
    
    if (!supplierData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
                    <p className="text-gray-600">Impossible de charger les données du profil fournisseur</p>
                </div>
            </div>
        );
    }

    return <SupplierProfileClient supplierData={supplierData} />;
}
