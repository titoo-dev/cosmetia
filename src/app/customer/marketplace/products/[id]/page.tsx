import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { getCustomerProductById } from "@/actions/customer/marketplace/products/get-customer-product-action";
import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";
import Image from "next/image";

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


    const getCompanyLogo = (companyName: string) => {
        const logos: { [key: string]: string } = {
            "Givaudan": "G",
            "Symrise": "S",
            "Firmenich": "F",
            "Lancôme": "L",
            "Biotherm": "B"
        };
        return logos[companyName] || companyName.charAt(0);
    };

    const getCompanyLogoColor = (companyName: string) => {
        const colors: { [key: string]: string } = {
            "Givaudan": "bg-blue-600",
            "Symrise": "bg-purple-600",
            "Firmenich": "bg-green-600",
            "Lancôme": "bg-red-600",
            "Biotherm": "bg-blue-500"
        };
        return colors[companyName] || "bg-gray-600";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                                {product.tradeName}
                            </h1>
                            
                            {/* Product Image */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                {product.pictureUrl ? (
                                    <Image
                                        src={product.pictureUrl}
                                        alt={product.tradeName}
                                        width={400}
                                        height={256}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                            <span className="text-gray-500 text-sm">Product Image</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{product.tradeName}</p>
                                    </div>
                                )}
                            </div>

                            {/* Product Description */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Supplier Information */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className={`w-10 h-10 ${getCompanyLogoColor(product.supplier?.companyName || '')} rounded-full flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg">
                                        {getCompanyLogo(product.supplier?.companyName || '')}
                                    </span>
                                </div>
                                <span className="text-lg font-semibold text-gray-800">
                                    {product.supplier?.companyName || 'Unknown Supplier'}
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
                        </div>
                    </div>

                    {/* Sidebar */}
                    <ProductDetailClient product={product} />
                </div>
            </div>
        </div>
    );
}
