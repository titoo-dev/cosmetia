"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isProductsActive = pathname === "/marketplace" || pathname === "/marketplace/products";

  // Hide tabs on product or document detail pages
  const isProductDetailPage = /\/marketplace\/products\/[^\/]+/.test(pathname);
  const isDocumentDetailPage = /\/marketplace\/documents\/[^\/]+/.test(pathname);
  const isDetailPage = isProductDetailPage || isDocumentDetailPage;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isDetailPage && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Tabs value={isProductsActive ? "products" : "documents"} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="products" asChild>
                <Link href="/marketplace/products" className="text-sm font-semibold">
                  Produits
                </Link>
              </TabsTrigger>
              <TabsTrigger value="documents" asChild>
                <Link href="/marketplace/documents" className="text-sm font-semibold">
                  Documents
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-4">
       {children}
      </div>
      
    </div>
  );
}
