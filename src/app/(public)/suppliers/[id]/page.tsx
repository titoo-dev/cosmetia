import { getSupplierDetail } from "@/actions/get-supplier-detail-action";
import { notFound } from "next/navigation";
import SupplierDetailClient from "./supplier-detail-client";

interface SupplierDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SupplierDetailPage({ params }: SupplierDetailPageProps) {
  const { id } = await params;
  const supplier = await getSupplierDetail(id);

  if (!supplier) {
    notFound();
  }

  return <SupplierDetailClient supplier={supplier} />;
}
