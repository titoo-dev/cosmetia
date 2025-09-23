import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-[#166970] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-2xl font-bold text-[#166970] font-space-grotesk">
            Cosmetia
          </span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#166970] mb-4 font-space-grotesk">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-space-grotesk">
            Page non trouvée
          </h2>
          <p className="text-gray-600 text-lg font-plus-jakarta">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild className="bg-[#166970] hover:bg-[#166970]/90">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="border-[#166970] text-[#166970] hover:bg-[#166970] hover:text-white">
            <Link href="/customer/marketplace" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Marketplace</span>
            </Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-[#166970] mb-2 font-space-grotesk">
              Marketplace
            </h3>
            <p className="text-gray-600 text-sm font-plus-jakarta">
              Découvrez nos produits cosmétiques
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-[#166970] mb-2 font-space-grotesk">
              Fournisseurs
            </h3>
            <p className="text-gray-600 text-sm font-plus-jakarta">
              Rejoignez notre réseau de partenaires
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-[#166970] mb-2 font-space-grotesk">
              Support
            </h3>
            <p className="text-gray-600 text-sm font-plus-jakarta">
              Besoin d'aide ? Contactez notre équipe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
