import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Skeleton className="h-8 w-3/4 mb-6" />
                            
                            {/* Product Image */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                                <Skeleton className="w-32 h-32 rounded-lg" />
                            </div>

                            {/* Product Description */}
                            <div className="space-y-2 mb-6">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            {/* Supplier Information */}
                            <div className="flex items-center space-x-3 mb-6">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        </div>

                        {/* Product Specifications */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Skeleton className="h-6 w-48 mb-6" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="flex justify-between py-3 border-b border-gray-100">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Skeleton className="h-6 w-32 mb-6" />
                            <div className="space-y-4">
                                {Array.from({ length: 2 }).map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Skeleton className="w-5 h-5" />
                                            <div>
                                                <Skeleton className="h-4 w-32 mb-1" />
                                                <Skeleton className="h-3 w-24" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-8 w-16" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quote Request Card */}
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-40 mb-4" />
                                
                                <div className="space-y-4">
                                    <div>
                                        <Skeleton className="h-4 w-32 mb-2" />
                                        <div className="flex space-x-2">
                                            <Skeleton className="h-10 flex-1" />
                                            <Skeleton className="h-10 w-20" />
                                        </div>
                                        <Skeleton className="h-3 w-48 mt-1" />
                                    </div>
                                    
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
