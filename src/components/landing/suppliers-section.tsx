import { Globe } from "lucide-react";
import { FeatureList } from "./feature-list";
import Link from "next/link";

export function SuppliersSection() {
	return (
		<div>
			<div className="w-16 h-16 bg-[#166970] rounded-2xl flex items-center justify-center mb-6">
				<Globe className="w-8 h-8 text-white" />
			</div>
			<h3 className="text-3xl font-bold text-black mb-6 font-space-grotesk">
				Pour les fournisseurs
			</h3>
			<p className="text-lg text-gray-600 mb-8 font-plus-jakarta">
				Fournisseurs de matières premières et de
				produits chimiques spécialisés, développez votre
				visibilité et touchez de nouveaux clients dans
				l'industrie cosmétique.
			</p>
			<FeatureList 
				items={[
					"Présentation enrichie de vos produits",
					"Gestion des leads et statistiques",
					"Relation client simplifiée"
				]}
			/>
			<Link href="/supplier/register" className="border-2 border-[#166970] text-[#166970] px-6 py-3 rounded-lg hover:bg-[#166970] hover:text-white transition-colors inline-block">
				Rejoindre en tant que fournisseur
			</Link>
		</div>
	);
}