"use client";

import { DocumentEntity } from "@/lib/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Share2, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface DocumentDetailClientProps {
  document: DocumentEntity;
}

export default function DocumentDetailClient({
  document,
}: DocumentDetailClientProps) {
  const [pdfError, setPdfError] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.technicalSheet,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavorite = () => {
    // TODO: Implement favorite functionality
    console.log("Add to favorites");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{document.technicalSheet}</h1>
            {document.description && (
              <p className="text-muted-foreground leading-relaxed">
                {document.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleFavorite}
              variant="outline"
              className="gap-2"
            >
              <Star className="h-4 w-4" />
              Favoris
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>

        {/* Supplier Info */}
        {document.owner && (
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-10 w-10">
              <AvatarImage
                className="object-cover"
                src={document.owner.picture}
                alt={document.owner.companyName}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {document.owner.companyName?.charAt(0) || "S"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-base">
              {document.owner.companyName}
            </span>
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* PDF Header */}
        <div className="bg-[#2C2C2C] text-white px-4 py-3">
          <p className="text-sm font-medium">
            Fiche technique du {document.name}
          </p>
        </div>

        {/* PDF Content */}
        {pdfError ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Impossible de charger le PDF
            </h3>
            <p className="text-muted-foreground mb-4">
              Votre navigateur ne supporte pas l&apos;affichage des PDFs ou le
              fichier est indisponible.
            </p>
            <Button
              onClick={() => window.open(document.fileUrl, "_blank")}
              variant="outline"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Ouvrir le document
            </Button>
          </div>
        ) : (
          <div className="relative w-full" style={{ height: "800px" }}>
            <iframe
              src={document.fileUrl}
              className="w-full h-full border-0"
              title={document.name}
              onError={() => setPdfError(true)}
            />
          </div>
        )}
      </div>

      {/* Related Products */}
      {document.products && document.products.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">Produits associés</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {document.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/marketplace/products/${product.id}`}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {product.pictureUrl ? (
                      <Image
                        src={product.pictureUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <FileText className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    {product.inciName && (
                      <p className="text-sm text-muted-foreground truncate">
                        {product.inciName}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
