"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Edit, Trash2 } from "lucide-react";
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
import { ProductEntity } from "@/lib/types/types";
import { deleteSupplierProductAction } from "@/actions/supplier/products/[id]/delete-supplier-product-action";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsClientProps {
  product: ProductEntity;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDeleteProduct = async () => {
    startTransition(async () => {
      try {
        await deleteSupplierProductAction(product.id);
        toast.success("Produit supprimé avec succès");
        router.push("/supplier/products");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Erreur lors de la suppression du produit");
        setShowDeleteDialog(false);
      }
    });
  };

  return (
    <>
      <Card className="shadow-none">
        <CardContent className="space-y-6">
          <div className="flex gap-4 pt-4">
            <Button
              className="bg-[#166970] hover:bg-[#145a61] text-white"
              size="lg"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier le produit
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer le produit
            </Button>
          </div>

          <Separator />

          <div>
            <h1 className="text-3xl font-bold text-[#000000] mb-6">
              {product.name}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="w-full aspect-square bg-[#F7F4EF] rounded-xl overflow-hidden border border-gray-200">
                  {product.pictureUrl ? (
                    <Image
                      src={product.pictureUrl}
                      alt={product.name || "Image produit"}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 text-sm font-medium">Image produit</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>

                <Card className="shadow-none">
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Nom INCI</dt>
                        <dd className="text-base font-semibold text-[#000000]">{product.inciName}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Fonctions du produit</dt>
                        <dd className="text-base font-semibold text-[#000000]">
                          {product.functions && product.functions.length > 0
                            ? product.functions.map(f => f.name).join(", ")
                            : "-"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Certificats</dt>
                        <dd className="text-base font-semibold text-[#000000]">{product.certificate || "-"}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Pays d&apos;exportation / zones disponibles</dt>
                        <dd className="text-base font-semibold text-[#000000]">
                          {product.countries && product.countries.length > 0
                            ? product.countries.map(c => c.name).join(", ")
                            : "-"}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Prix par quantité (avec MOQ)</dt>
                        <dd className="text-base font-semibold text-[#000000]">{product.pricePerQuantity}</dd>
                      </div>

                      <div>
                        <dt className="text-sm font-medium text-gray-600 mb-2">Délais de livraison</dt>
                        <dd className="text-base font-semibold text-[#000000]">{product.deliveryTime}</dd>
                      </div>

                      <div className="md:col-span-2">
                        <dt className="text-sm font-medium text-gray-600 mb-2">Score régulation</dt>
                        <dd className="text-base font-semibold text-[#000000]">{product.regulationScore}</dd>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#000000]">Documents</h2>

            {product.documents && product.documents.length > 0 ? (
              <Card className="shadow-none pt-0">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-[#F7F4EF]">
                        <th className="text-left py-4 px-6 font-semibold text-[#000000]">Fiche technique</th>
                        <th className="text-left py-4 px-6 font-semibold text-[#000000]">Nom du document</th>
                        <th className="py-4 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.documents.map((document) => (
                        <tr key={document.id} className="border-b border-gray-100 last:border-0 hover:bg-[#F7F4EF]/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <span className="text-[#000000]">{document.technicalSheet || document.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-700">{document.name}</td>
                          <td className="py-4 px-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 hover:bg-[#F7F4EF]"
                              asChild
                            >
                              <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">
                                Voir
                              </a>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-none" >
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucun document disponible</p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le produit &quot;{product.name}&quot; sera définitivement supprimé de votre catalogue.
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
    </>
  );
}
