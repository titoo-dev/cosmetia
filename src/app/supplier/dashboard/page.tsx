import { Suspense } from "react";
import { DashboardClient } from "./dashboard-client";

export default function SupplierDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#000000]">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">
            Suivez vos performances et gérez vos leads efficacement
          </p>
        </div>
        
        <Suspense fallback={<div>Chargement...</div>}>
          <DashboardClient />
        </Suspense>
      </div>
    </div>
  );
}
