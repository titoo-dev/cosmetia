import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-full max-w-xl mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>

        {/* Supplier Info Skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      {/* PDF Viewer Skeleton */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="w-full rounded-none" style={{ height: "800px" }} />
      </div>
    </div>
  );
}
