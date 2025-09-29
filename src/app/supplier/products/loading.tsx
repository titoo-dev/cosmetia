import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SupplierProductsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-40" />
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="relative mb-6">
        <Skeleton className="w-full max-w-md h-12" />
      </div>

      {/* Filter Dropdowns Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-10" />
        ))}
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white shadow-md p-0">
            <CardContent className="p-0">
              {/* Product Image Skeleton */}
              <Skeleton className="w-full h-48 rounded-tl-lg rounded-tr-lg mb-4" />

              {/* Product Info Skeleton */}
              <div className="px-4 pb-4">
                {/* Product Name Skeleton */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                
                {/* Description Skeleton */}
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-3" />

                {/* Categories Skeleton */}
                <div className="flex gap-1 mb-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Functions Skeleton */}
                <div className="flex gap-1 mb-3">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-18 rounded-full" />
                </div>

                {/* Rating and Certificate Skeleton */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Skeleton key={j} className="w-4 h-4" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Actions Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button Skeleton */}
      <div className="fixed bottom-6 right-6">
        <Skeleton className="w-14 h-14 rounded-full" />
      </div>
    </div>
  );
}
