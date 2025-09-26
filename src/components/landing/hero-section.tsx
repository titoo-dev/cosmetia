import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
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
