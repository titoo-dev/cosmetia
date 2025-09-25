import { Header } from "@/components/header";
import { ArrowRight, Search, Users, Globe, Zap } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
		<div className="min-h-screen bg-white">
			<Header />
			<HeroSection />
			<FeaturesSection />
			<TargetAudienceSection />
			<AIAssistantSection />
		</div>
  );
}

function HeroSection() {
	return (
		<section className="py-20 bg-[#F7F4EF]">
			<div className="container mx-auto px-6 text-center">
				<h1 className="text-5xl md:text-6xl font-bold text-black mb-6 font-space-grotesk leading-tight">
					La marketplace B2B pour l&apos;industrie cosmétique
				</h1>
				<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto font-plus-jakarta">
					Connectez-vous avec les meilleurs fournisseurs
					d&apos;ingrédients cosmétiques. Sourcez intelligemment
					avec l&apos;aide de notre IA spécialisée.
				</p>
				<HeroCTAButtons />
			</div>
		</section>
	);
}

function HeroCTAButtons() {
	return (
		<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<Link href="/customer/register" className="bg-[#166970] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#145a61] transition-colors flex items-center gap-2">
				S'inscrire en tant qu'acheteur
				<ArrowRight className="w-5 h-5" />
			</Link>
			<Link href="/supplier/register" className="border-2 border-[#166970] text-[#166970] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#166970] hover:text-white transition-colors">
				S'inscrire en tant que fournisseur
			</Link>
		</div>
	);
}

function FeaturesSection() {
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
	return (
		<div className="text-center p-8 rounded-2xl bg-[#F7F4EF] hover:bg-gray-50 transition-colors">
			<div className="w-16 h-16 bg-[#GFFBBF] rounded-2xl flex items-center justify-center mx-auto mb-6">
				{icon}
			</div>
			<h3 className="text-xl font-bold text-black mb-4 font-space-grotesk">
				{title}
			</h3>
			<p className="text-gray-600 font-plus-jakarta">
				{description}
			</p>
		</div>
	);
}

function TargetAudienceSection() {
	return (
		<section className="py-20 bg-[#F7F4EF]">
			<div className="container mx-auto px-6">
				<div className="grid md:grid-cols-2 gap-16 items-center">
					<BuyersSection />
					<SuppliersSection />
				</div>
			</div>
		</section>
	);
}

function BuyersSection() {
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
			<Link href="/customer/marketplace/products" className="bg-[#166970] text-white px-6 py-3 rounded-lg hover:bg-[#145a61] transition-colors inline-block">
				Explorer le marketplace
			</Link>
		</div>
	);
}

function SuppliersSection() {
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

function FeatureList({ items }: { items: string[] }) {
	return (
		<ul className="space-y-4 mb-8">
			{items.map((item, index) => (
				<li key={index} className="flex items-center gap-3 text-gray-700">
					<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
					{item}
				</li>
			))}
		</ul>
	);
}

function AIAssistantSection() {
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
