import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductsLoading() {
  return (
    <div className="space-y-6">
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

      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white shadow-md p-0">
            <CardContent className="p-0">
              {/* Product Image Skeleton */}
              <Skeleton className="w-full h-48 rounded-tl-lg rounded-tr-lg mb-4" />

              {/* Company Info Skeleton */}
              <div className="flex items-center justify-between mb-3 px-4">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center space-x-1">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              {/* Product Name Skeleton */}
              <div className="px-4 mb-2">
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Description Skeleton */}
              <div className="px-4 mb-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Rating Skeleton */}
              <div className="flex items-center space-x-1 mb-4 px-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="w-4 h-4" />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons Skeleton */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-3">
        <Skeleton className="h-12 w-48 rounded-lg" />
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
}
