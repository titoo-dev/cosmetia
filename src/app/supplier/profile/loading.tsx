import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {/* Header Section Skeleton */}
                    <div className="text-center mb-6">
                        <Skeleton className="h-8 w-56 mx-auto mb-2" />
                        <Skeleton className="h-4 w-72 mx-auto" />
                    </div>

                    {/* Profile Image Skeleton */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Skeleton className="w-24 h-24 rounded-full" />
                            <Skeleton className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full" />
                        </div>
                    </div>

                    {/* Form Fields Skeleton */}
                    <div className="space-y-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                {index === 6 ? (
                                    <Skeleton className="h-24 w-full" />
                                ) : (
                                    <Skeleton className="h-10 w-full" />
                                )}
                            </div>
                        ))}
                        
                        {/* Textarea Skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        
                        {/* Button Skeleton */}
                        <Skeleton className="h-11 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
