"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, MessageCircle, Search, Star, Grid3X3, List, Plus, Edit, Trash2, Filter } from "lucide-react";
import { ProductEntity } from "@/lib/types/types";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSupplierProductAction } from "@/actions/supplier/products/[id]/delete-supplier-product-action";
import { toast } from "sonner";

interface SupplierProductsClientProps {
  products: ProductEntity[];
}

export default function SupplierProductsClient({ 
  products,
}: SupplierProductsClientProps) {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(urlSearchParams.get('query') || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(urlSearchParams);
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    router.push(`/supplier/products?${params.toString()}`);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    startTransition(async () => {
      try {
        await deleteSupplierProductAction(productToDelete);
        toast.success("Produit supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression du produit");
      } finally {
        setProductToDelete(null);
      }
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden pt-0">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="w-full h-48 bg-[#F7F4EF] relative overflow-hidden">
              {product.pictureUrl ? (
                <Image
                  src={product.pictureUrl}
                  alt={product.name || "Product Image"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-sm font-medium">Image produit</div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Product Name */}
              <h3 className="font-semibold text-lg text-[#000000] mb-2 line-clamp-2 group-hover:text-[#166970] transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Categories and Functions */}
              <div className="space-y-2 mb-4">
                {product.categories && product.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.categories.slice(0, 2).map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-[#F7F4EF] text-[#166970] hover:bg-[#166970] hover:text-white transition-colors">
                        {category.name}
                      </Badge>
                    ))}
                    {product.categories.length > 2 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{product.categories.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                {product.functions && product.functions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.functions.slice(0, 2).map((func, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-[#166970] text-[#166970]">
                        {func.name}
                      </Badge>
                    ))}
                    {product.functions.length > 2 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{product.functions.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Regulation Score and Certificate */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500 mr-1">Note:</span>
                  {renderStars(product.regulationScore)}
                  <span className="text-xs text-gray-600 ml-1">({product.regulationScore}/5)</span>
                </div>
                {product.certificate && (
                  <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">Certifié</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button 
                  className="w-full bg-[#166970] hover:bg-[#145a61] text-white font-medium"
                  size="sm"
                  onClick={() => router.push(`/supplier/products/${product.id}/details`)}
                >
                  Voir les détails
                </Button>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-[#166970] border-[#166970] hover:bg-[#166970] hover:text-white">
                    <Edit className="w-3 h-3 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => setProductToDelete(product.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-[#F7F4EF]">
            <TableHead className="font-semibold text-[#000000] py-4 px-6">Produit</TableHead>
            <TableHead className="font-semibold text-[#000000] py-4 px-6 hidden lg:table-cell">Catégories</TableHead>
            <TableHead className="font-semibold text-[#000000] py-4 px-6 hidden xl:table-cell">Fonctions</TableHead>
            <TableHead className="font-semibold text-[#000000] py-4 px-6 hidden md:table-cell">Note</TableHead>
            <TableHead className="font-semibold text-[#000000] py-4 px-6 hidden sm:table-cell">Statut</TableHead>
            <TableHead className="font-semibold text-[#000000] py-4 px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-b border-gray-100 hover:bg-[#F7F4EF]/50 transition-colors">
              <TableCell className="py-4 px-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#F7F4EF] rounded-xl flex items-center justify-center overflow-hidden">
                    {product.pictureUrl ? (
                      <Image
                        src={product.pictureUrl}
                        alt={product.name || "Product Image"}
                        width={56}
                        height={56}
                        className="rounded-xl object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs font-medium">Image</div>
                    )}
                  </div>
                  <div className="max-w-xs">
                    <div className="font-semibold text-[#000000] mb-1 truncate">{product.name}</div>
                    <div className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.description}</div>
                    
                    {/* Mobile categories and functions */}
                    <div className="mt-2 lg:hidden">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {product.categories?.slice(0, 2).map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-[#F7F4EF] text-[#166970]">
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 xl:hidden">
                        {product.functions?.slice(0, 2).map((func, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#166970] text-[#166970]">
                            {func.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {product.categories?.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-[#F7F4EF] text-[#166970]">
                      {category.name}
                    </Badge>
                  ))}
                  {product.categories && product.categories.length > 2 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{product.categories.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 hidden xl:table-cell">
                <div className="flex flex-wrap gap-1">
                  {product.functions?.slice(0, 2).map((func, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-[#166970] text-[#166970]">
                      {func.name}
                    </Badge>
                  ))}
                  {product.functions && product.functions.length > 2 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{product.functions.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 hidden md:table-cell">
                <div className="flex items-center space-x-1">
                  {renderStars(product.regulationScore)}
                  <span className="text-xs text-gray-600 ml-1">({product.regulationScore}/5)</span>
                </div>
              </TableCell>
              
              <TableCell className="py-4 px-6 hidden sm:table-cell">
                {product.certificate && (
                  <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full w-fit">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">Certifié</span>
                  </div>
                )}
              </TableCell>
              
              <TableCell className="py-4 px-6">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="text-[#166970] border-[#166970] hover:bg-[#166970] hover:text-white">
                    <Edit className="w-3 h-3 sm:mr-1" />
                    <span className="hidden sm:inline">Modifier</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => setProductToDelete(product.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-[#000000] mb-2">Mes Produits</h1>
              <p className="text-gray-600">Gérez votre catalogue de produits cosmétiques</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Add Product Button */}
              <Button className="bg-[#166970] hover:bg-[#145a61] text-white flex items-center gap-2 px-6 py-3 font-medium order-1 sm:order-2">
                <Plus className="w-5 h-5" />
                Ajouter un produit
              </Button>
              
              {/* View Toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 order-2 sm:order-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md ${viewMode === "grid" ? "bg-[#166970] text-white" : "text-gray-600 hover:text-[#166970]"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Grille</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-md ${viewMode === "list" ? "bg-[#166970] text-white" : "text-gray-600 hover:text-[#166970]"}`}
                >
                  <List className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Liste</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-none">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un produit par nom, catégorie..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-sm border-gray-200 rounded-lg focus:border-[#166970] focus:ring-2 focus:ring-[#166970]/20 shadow-none"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2 text-gray-600 border-gray-200 hover:border-[#166970] hover:text-[#166970]">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtres</span>
              </Button>
              
              {products.length > 0 && (
                <div className="text-sm text-gray-600 bg-[#F7F4EF] px-3 py-2 rounded-lg">
                  {products.length} produit{products.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Products Display */}
          <div className="space-y-6">
            {viewMode === "grid" ? renderGridView() : renderListView()}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#F7F4EF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-[#166970]" />
                </div>
                <h3 className="text-lg font-semibold text-[#000000] mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-6">Commencez par ajouter votre premier produit à votre catalogue.</p>
                <Button className="bg-[#166970] hover:bg-[#145a61] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </div>
            </div>
          )}

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-10">
            <Button
              size="lg"
              className="bg-[#166970] hover:bg-[#145a61] text-white rounded-full w-14 h-14 shadow-xl hover:shadow-2xl transition-all duration-300"
              title="Chat IA - Assistance"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le produit sera définitivement supprimé de votre catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
