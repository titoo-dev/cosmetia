import { Search, Users, Zap } from "lucide-react";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
	return (
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-black mb-4 font-space-grotesk">
						Pourquoi choisir Cosmetia ?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto font-plus-jakarta">
						Une plateforme moderne qui révolutionne le sourcing
						d'ingrédients cosmétiques
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					<FeatureCard 
						icon={<Search className="w-8 h-8 text-[#166970]" />}
						title="Recherche intelligente"
						description="Trouvez rapidement les ingrédients parfaits grâce à notre IA spécialisée dans la cosmétique"
					/>
					<FeatureCard 
						icon={<Users className="w-8 h-8 text-[#166970]" />}
						title="Réseau vérifié"
						description="Accédez à un réseau de fournisseurs vérifiés et certifiés pour une qualité garantie"
					/>
					<FeatureCard 
						icon={<Zap className="w-8 h-8 text-[#166970]" />}
						title="Process simplifié"
						description="De la recherche à la commande, un processus optimisé pour gagner du temps"
					/>
				</div>
			</div>
		</section>
	);
}