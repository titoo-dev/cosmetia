import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuppliersLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header and Search Bar Skeleton */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Skeleton className="w-full max-w-md h-12" />
          </div>

          {/* Filter Dropdowns Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-md">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>

        {/* Supplier Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="bg-white shadow-md p-0">
              <CardContent className="p-0">
                {/* Supplier Image Skeleton */}
                <Skeleton className="w-full h-48 rounded-tl-lg rounded-tr-lg mb-4" />

                {/* Company Logo Skeleton */}
                <div className="relative -mt-8 ml-4 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>

                {/* Company Info Skeleton */}
                <div className="px-4 pb-4">
                  {/* Company Name Skeleton */}
                  <Skeleton className="h-6 w-3/4 mb-2" />

                  {/* Location Skeleton */}
                  <div className="flex items-center space-x-1 mb-3">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>

                  {/* Stats Skeleton */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>

                  {/* Certification Status Skeleton */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Skeleton className="w-4 h-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>

                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
