"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { ProductEntity } from "@/lib/types/types";

interface ProductDetailClientProps {
    product: ProductEntity;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [quantity, setQuantity] = useState("");
    const [quantityUnit, setQuantityUnit] = useState("Kg");
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <div className="space-y-6">
                {/* Quote Request Card */}
                <Card className="bg-white shadow-sm">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Obtenir un devis</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Quantité commandée:
                                </label>
                                <div className="flex space-x-2">
                                    <Input
                                        type="number"
                                        placeholder="Volume"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Select value={quantityUnit} onValueChange={setQuantityUnit}>
                                        <SelectTrigger className="w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Kg">Kg</SelectItem>
                                            <SelectItem value="L">L</SelectItem>
                                            <SelectItem value="g">g</SelectItem>
                                            <SelectItem value="ml">ml</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    La quantité minimale de commande est de {product.minimumOrderQuantity} unités
                                </p>
                            </div>
                            
                            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
                                Demander un devis
                            </Button>
                        </div>
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
