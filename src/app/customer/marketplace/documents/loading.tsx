import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DocumentsLoading() {
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

      {/* Document Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-white shadow-md">
            <CardContent className="p-4">
              {/* Document Type and Company Info Skeleton */}
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>

              {/* Company Name Skeleton */}
              <div className="mb-3">
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Document Title Skeleton */}
              <div className="mb-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-4">
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Compare Checkbox Skeleton */}
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Button Skeleton */}
      <div className="fixed bottom-6 right-6">
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
}
