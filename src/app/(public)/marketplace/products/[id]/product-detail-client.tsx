"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Share2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { ProductEntity } from "@/lib/types/types";
import { createOrderAction } from "@/actions/customer/marketplace/products/[id]/create-order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
    product: ProductEntity;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [state, formAction, isPending] = useActionState(createOrderAction, {
        error: "",
    });
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success(state.message);
            setQuantity("");
            router.push("/customer/orders");
        }
        if (state.error) {
            toast.error(state.error);
        }
    }, [state.success, state.error, state.message, router]);

    return (
        <>
            {/* Sidebar */}
            <div className="space-y-6">
                {/* Quote Request Card */}
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Obtenir un devis</h3>
                        
                        <form action={formAction} className="space-y-4">
                            <input type="hidden" name="productId" value={product.id} />
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Quantité commandée:
                                </label>
                                <div className="flex space-x-2">
                                    <Input
                                        type="number"
                                        name="quantity"
                                        placeholder="Volume"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="flex-1"
                                        min={product.minimumOrderQuantity}
                                        disabled={isPending}
                                    />
                                    <span className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md">
                                        Kg
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    La quantité minimale de commande est de {product.minimumOrderQuantity} unités
                                </p>
                            </div>
                            
                            {state.errors?.quantity && (
                                <p className="text-sm text-red-600">{state.errors.quantity[0]}</p>
                            )}
                            
                            <Button 
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3"
                                disabled={isPending || !quantity}
                            >
                                {isPending ? "Création en cours..." : "Demander un devis"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center space-x-2"
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                        <span>Favoris</span>
                    </Button>
                    
                    <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center space-x-2"
                    >
                        <Share2 className="w-4 h-4 text-gray-500" />
                        <span>Partager</span>
                    </Button>
                </div>
            </div>
        </>
    );
}
