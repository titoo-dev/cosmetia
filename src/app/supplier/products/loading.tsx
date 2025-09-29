import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function SupplierProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <Skeleton className="h-9 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Add Product Button Skeleton */}
              <Skeleton className="h-12 w-48 order-1 sm:order-2" />
              
              {/* View Toggle Skeleton */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 order-2 sm:order-1">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>

          {/* Search and Filters Bar Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-none">
            <div className="relative flex-1 max-w-lg">
              <Skeleton className="w-full h-12" />
            </div>
            
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="group bg-white border border-gray-200 overflow-hidden pt-0">
                  <CardContent className="p-0">
                    {/* Product Image Skeleton */}
                    <Skeleton className="w-full h-48" />

                    {/* Product Info Skeleton */}
                    <div className="p-5">
                      {/* Product Name Skeleton */}
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      
                      {/* Description Skeleton */}
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-4" />

                      {/* Categories and Functions Skeleton */}
                      <div className="space-y-2 mb-4">
                        <div className="flex flex-wrap gap-1">
                          <Skeleton className="h-5 w-16 rounded-full" />
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Skeleton className="h-5 w-14 rounded-full" />
                          <Skeleton className="h-5 w-18 rounded-full" />
                        </div>
                      </div>

                      {/* Rating and Certificate Skeleton */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                        <div className="flex items-center space-x-1">
                          <Skeleton className="h-3 w-8" />
                          <div className="flex space-x-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Skeleton key={j} className="w-4 h-4" />
                            ))}
                          </div>
                          <Skeleton className="h-3 w-8" />
                        </div>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>

                      {/* Actions Skeleton */}
                      <div className="space-y-2">
                        <Skeleton className="w-full h-8" />
                        <div className="flex gap-2">
                          <Skeleton className="flex-1 h-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Floating Action Button Skeleton */}
          <div className="fixed bottom-6 right-6 z-10">
            <Skeleton className="w-14 h-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
