import { Zap } from "lucide-react";

export function AIAssistantSection() {
	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6 text-center">
				<div className="w-20 h-20 bg-[#GFFBBF] rounded-3xl flex items-center justify-center mx-auto mb-8">
					<Zap className="w-10 h-10 text-[#166970]" />
				</div>
				<h2 className="text-4xl font-bold text-black mb-6 font-space-grotesk">
					Notre assistance vous aide à sélectionner les
					ingrédients idéaux pour votre produit
				</h2>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 font-plus-jakarta">
					Grâce à l'intelligence artificielle spécialisée en
					cosmétique, obtenez des recommandations personnalisées
					pour vos formulations et découvrez les meilleurs
					fournisseurs.
				</p>
				<button className="bg-[#166970] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#145a61] transition-colors">
					Découvrir l'assistant IA
				</button>
			</div>
		</section>
	);
}
