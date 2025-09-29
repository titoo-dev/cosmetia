import { Search } from "lucide-react";
import Link from "next/link";
import { FeatureList } from "./feature-list";

export function BuyersSection() {
	return (
		<div>
			<div className="w-16 h-16 bg-[#166970] rounded-2xl flex items-center justify-center mb-6">
				<Search className="w-8 h-8 text-white" />
			</div>
			<h3 className="text-3xl font-bold text-black mb-6 font-space-grotesk">
				Pour les acheteurs
			</h3>
			<p className="text-lg text-gray-600 mb-8 font-plus-jakarta">
				Marques, laboratoires et fabricants de
				cosmétiques, accédez à une large base de
				fournisseurs spécialisés dans les matières
				premières et les produits chimiques dédiés à
				l'industrie cosmétique.
			</p>
			<FeatureList 
				items={[
					"Catalogue de milliers d'ingrédients",
					"Comparaison de prix et certification",
					"Assistant IA pour la formulation"
				]}
			/>
			<Link href="/marketplace/products" className="bg-[#166970] text-white px-6 py-3 rounded-lg hover:bg-[#145a61] transition-colors inline-block">
				Explorer le marketplace
			</Link>
		</div>
	);
}