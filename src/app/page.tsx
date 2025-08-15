import { ArrowRight, Search, Users, Globe, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="border-b border-gray-100">
				<div className="container mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">
									C
								</span>
							</div>
							<span className="text-xl font-bold text-[#166970] font-space-grotesk">
								Cosmetia
							</span>
						</div>
						<nav className="hidden md:flex items-center space-x-8">
							<Link
								href="/marketplace"
								className="text-gray-600 hover:text-[#166970] transition-colors"
							>
								Marketplace
							</Link>
							<Link
								href="/suppliers"
								className="text-gray-600 hover:text-[#166970] transition-colors"
							>
								Fournisseurs
							</Link>
							<Link
								href="/pricing"
								className="text-gray-600 hover:text-[#166970] transition-colors"
							>
								Tarifs
							</Link>
							<Link
								href="/login"
								className="text-gray-600 hover:text-[#166970] transition-colors"
							>
								Se connecter
							</Link>
							<button className="bg-[#166970] text-white px-6 py-2 rounded-lg hover:bg-[#145a61] transition-colors">
								Créer un compte
							</button>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
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
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<button className="bg-[#166970] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#145a61] transition-colors flex items-center gap-2">
							Découvrir la marketplace
							<ArrowRight className="w-5 h-5" />
						</button>
						<button className="border-2 border-[#166970] text-[#166970] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#166970] hover:text-white transition-colors">
							Devenir fournisseur
						</button>
					</div>
				</div>
			</section>

			{/* Features Section */}
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
						<div className="text-center p-8 rounded-2xl bg-[#F7F4EF] hover:bg-gray-50 transition-colors">
							<div className="w-16 h-16 bg-[#GFFBBF] rounded-2xl flex items-center justify-center mx-auto mb-6">
								<Search className="w-8 h-8 text-[#166970]" />
							</div>
							<h3 className="text-xl font-bold text-black mb-4 font-space-grotesk">
								Recherche intelligente
							</h3>
							<p className="text-gray-600 font-plus-jakarta">
								Trouvez rapidement les ingrédients parfaits
								grâce à notre IA spécialisée dans la cosmétique
							</p>
						</div>

						<div className="text-center p-8 rounded-2xl bg-[#F7F4EF] hover:bg-gray-50 transition-colors">
							<div className="w-16 h-16 bg-[#GFFBBF] rounded-2xl flex items-center justify-center mx-auto mb-6">
								<Users className="w-8 h-8 text-[#166970]" />
							</div>
							<h3 className="text-xl font-bold text-black mb-4 font-space-grotesk">
								Réseau vérifié
							</h3>
							<p className="text-gray-600 font-plus-jakarta">
								Accédez à un réseau de fournisseurs vérifiés et
								certifiés pour une qualité garantie
							</p>
						</div>

						<div className="text-center p-8 rounded-2xl bg-[#F7F4EF] hover:bg-gray-50 transition-colors">
							<div className="w-16 h-16 bg-[#GFFBBF] rounded-2xl flex items-center justify-center mx-auto mb-6">
								<Zap className="w-8 h-8 text-[#166970]" />
							</div>
							<h3 className="text-xl font-bold text-black mb-4 font-space-grotesk">
								Process simplifié
							</h3>
							<p className="text-gray-600 font-plus-jakarta">
								De la recherche à la commande, un processus
								optimisé pour gagner du temps
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Target Audience Section */}
			<section className="py-20 bg-[#F7F4EF]">
				<div className="container mx-auto px-6">
					<div className="grid md:grid-cols-2 gap-16 items-center">
						{/* For Buyers */}
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
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Catalogue de milliers d'ingrédients
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Comparaison de prix et certification
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Assistant IA pour la formulation
								</li>
							</ul>
							<button className="bg-[#166970] text-white px-6 py-3 rounded-lg hover:bg-[#145a61] transition-colors">
								Explorer le marketplace
							</button>
						</div>

						{/* For Suppliers */}
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
							<ul className="space-y-4 mb-8">
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Présentation enrichie de vos produits
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Gestion des leads et statistiques
								</li>
								<li className="flex items-center gap-3 text-gray-700">
									<div className="w-2 h-2 bg-[#166970] rounded-full"></div>
									Relation client simplifiée
								</li>
							</ul>
							<button className="border-2 border-[#166970] text-[#166970] px-6 py-3 rounded-lg hover:bg-[#166970] hover:text-white transition-colors">
								Rejoindre en tant que fournisseur
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* AI Assistant Section */}
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

			{/* Footer */}
			<footer className="bg-[#166970] text-white py-16">
				<div className="container mx-auto px-6">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-6">
								<div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
									<span className="text-[#166970] font-bold text-sm">
										C
									</span>
								</div>
								<span className="text-xl font-bold font-space-grotesk">
									Cosmetia
								</span>
							</div>
							<p className="text-gray-300 font-plus-jakarta">
								La marketplace B2B de référence pour l'industrie
								cosmétique.
							</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4 font-space-grotesk">
								S'inscrire
							</h4>
							<ul className="space-y-2 text-gray-300">
								<li>
									<Link
										href="/register/buyer"
										className="hover:text-white transition-colors"
									>
										Acheteurs
									</Link>
								</li>
								<li>
									<Link
										href="/register/supplier"
										className="hover:text-white transition-colors"
									>
										Fournisseurs
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4 font-space-grotesk">
								Compagnie
							</h4>
							<ul className="space-y-2 text-gray-300">
								<li>
									<Link
										href="/about"
										className="hover:text-white transition-colors"
									>
										À propos
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="hover:text-white transition-colors"
									>
										Contact
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4 font-space-grotesk">
								Support
							</h4>
							<ul className="space-y-2 text-gray-300">
								<li>
									<Link
										href="/help"
										className="hover:text-white transition-colors"
									>
										Centre d'aide
									</Link>
								</li>
								<li>
									<Link
										href="/privacy"
										className="hover:text-white transition-colors"
									>
										Politique de confidentialité
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="hover:text-white transition-colors"
									>
										Conditions d'utilisation
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
						<p>&copy; 2025 Cosmetia. Tous droits réservés.</p>
					</div>
				</div>
			</footer>
		</div>
  );
}
