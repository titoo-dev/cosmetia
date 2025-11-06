import { getSupplierOrderByIdAction } from "@/actions/supplier/orders/[id]/get-supplier-order-by-id-action";
import OrderDetailClient from "./order-detail-client";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  const result = await getSupplierOrderByIdAction(id);

  if (result.error || !result.data) {
    throw new Error(result.error || 'Failed to fetch order');
  }

  return <OrderDetailClient order={result.data} />;
}
