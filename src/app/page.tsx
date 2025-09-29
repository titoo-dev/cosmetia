import { getCurrentUserAction } from "@/actions/get-current-user-action";
import { AIAssistantSection } from "@/components/landing/ai-assistant-section";
import { FeaturesSection } from "@/components/landing/feature-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TargetAudienceSection } from "@/components/landing/target-audience-section";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Home() {

	const currentUser = await getCurrentUserAction();

	console.log('currentUser', currentUser);

	if (currentUser && currentUser.role === 'CUSTOMER') {
		return redirect('/marketplace');
	}

	if (currentUser && currentUser.role === 'SUPPLIER') {
		return redirect('/supplier/dashboard');
	}

	return (
		<div className="min-h-screen bg-white">
			<HeroSection />
			<FeaturesSection />
			<TargetAudienceSection />
			<AIAssistantSection />
		</div>
	);
}