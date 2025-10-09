import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title Skeleton */}
            <Skeleton className="h-8 w-48" />
            
            {/* Search and Actions Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar Skeleton */}
              <Skeleton className="h-10 w-64" />
              
              {/* Filter Button Skeleton */}
              <Skeleton className="h-10 w-20" />
              
              {/* Export Button Skeleton */}
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Table Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 py-4 px-6">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          
          {/* Table Rows Skeleton */}
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border-b border-gray-100 py-4 px-6">
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

