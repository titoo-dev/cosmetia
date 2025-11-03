import { getLeadByIdAction } from "@/actions/supplier/dashboard/get-lead-by-id-action";
import { notFound } from "next/navigation";
import { LeadDetailClient } from "./lead-detail-client";

interface LeadDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;

  const result = await getLeadByIdAction(id);

  if (!result.success || !result.lead) {
    notFound();
  }

  return <LeadDetailClient lead={result.lead} />;
}
