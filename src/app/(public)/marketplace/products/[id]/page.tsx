import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { getCustomerProductById } from "@/actions/customer/marketplace/products/get-customer-product-action";
import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const paramsData = await params;
    const product = await getCustomerProductById(paramsData.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                                {product.name}
                            </h1>
                            
                            {/* Product Image */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                {product.pictureUrl ? (
                                    <Image
                                        src={product.pictureUrl}
                                        alt={product.name || "Product Image"}
                                        width={400}
                                        height={256}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">Product Image</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{product.name}</p>
                                    </div>
                                )}
                            </div>

                            {/* Product Description */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Supplier Information */}
                            <div className="flex items-center space-x-3 mb-6">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage 
                                        src={product.owner?.picture} 
                                        alt={product.owner?.companyName || 'Company'}
                                        className="object-cover"
                                    />
                                    <AvatarFallback className="bg-blue-500 text-white text-lg font-bold uppercase">
                                        {product.owner?.companyName?.charAt(0) || 'N/A'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-lg font-semibold text-gray-800">
                                    {product.owner?.companyName || 'Unknown Supplier'}
                                </span>
                            </div>
                        </div>

                        {/* Product Specifications */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Spécifications du produit</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Nom INCI:</span>
                                    <span className="font-semibold text-gray-900">{product.inciName}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Fonctions du produit:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {product.functions.map((func, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {func.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Catégories:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {product.categories.map((category, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {category.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Certificats:</span>
                                    <span className="font-semibold text-gray-900">{product.certificate}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Pays d'exportation:</span>
                                    <span className="font-semibold text-gray-900">
                                        {product.countries.map(country => country.name).join(", ")}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Prix par quantité (avec MOQ):</span>
                                    <span className="font-semibold text-gray-900">{product.pricePerQuantity}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Délais de livraison:</span>
                                    <span className="font-semibold text-gray-900">{product.deliveryTime}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Score régulation:</span>
                                    <span className="font-semibold text-gray-900">{product.regulationScore}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Quantité minimale de commande:</span>
                                    <span className="font-semibold text-gray-900">{product.minimumOrderQuantity}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">ID produit:</span>
                                    <span className="font-semibold text-gray-900">{product.id_seq}</span>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Documents</h2>
                            {product.documents.length > 0 ? (
                                <div className="space-y-4">
                                    {product.documents.map((document) => (
                                        <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {document.technicalSheet}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {document.name}
                                                    </div>
                                                </div>
                                            </div>
                                            <a 
                                                href={document.fileUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                            >
                                                <Download className="w-4 h-4 mr-2" />
                                                Voir
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <FileText className="w-12 h-12 text-gray-300 mb-4" />
                                    <p className="text-sm font-medium text-gray-900 mb-1">Aucun document disponible</p>
                                    <p className="text-sm text-gray-500">Les documents techniques seront affichés ici une fois disponibles.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <ProductDetailClient product={product} />
                </div>
            </div>
        </div>
    );
}
