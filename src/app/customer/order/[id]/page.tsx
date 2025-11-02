import { getCustomerOrderByIdAction } from "@/actions/customer/orders/[id]/get-customer-order-by-id-action";
import { redirect } from "next/navigation";
import OrderDetailClient from "./order-detail-client";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  const result = await getCustomerOrderByIdAction(id);

  if (result.error || !result.data) {
    throw new Error(result.error || 'Failed to fetch order');
  }

  return <OrderDetailClient order={result.data} />;
}
