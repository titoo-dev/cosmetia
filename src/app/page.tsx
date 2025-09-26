import { Header } from "@/components/header";
import { AIAssistantSection } from "@/components/landing/ai-assistant-section";
import { FeaturesSection } from "@/components/landing/feature-section";
import { HeroSection } from "@/components/landing/hero-section";
import { TargetAudienceSection } from "@/components/landing/target-audience-section";

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