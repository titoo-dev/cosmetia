import { getSupplierOrdersAction, SupplierOrderItem } from "@/actions/supplier/orders/get-supplier-orders-action";
import SupplierOrdersClient from "./orders-client";

export const dynamic = 'force-dynamic'

export default async function SupplierOrdersPage() {
  const result = await getSupplierOrdersAction();
  
  if (result.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{result.error}</p>
        </div>
      </div>
    );
  }

  const orders: SupplierOrderItem[] = result.data || [];

  return <SupplierOrdersClient orders={orders} />;
}
