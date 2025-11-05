import { notFound } from "next/navigation";
import { getCustomerDocumentById } from "@/actions/customer/marketplace/documents/get-document-product-action";
import DocumentDetailClient from "./document-detail-client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const document = await getCustomerDocumentById(id);

  if (!document) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: `${document.name} - Cosmetia Marketplace`,
    description: document.description || document.technicalSheet,
  };
}

export default async function DocumentDetailPage({ params }: Props) {
  const { id } = await params;
  const document = await getCustomerDocumentById(id);

  if (!document) {
    notFound();
  }

  return <DocumentDetailClient document={document} />;
}
