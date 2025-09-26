import { BuyersSection } from "./buyers-section";
import { SuppliersSection } from "./suppliers-section";

export function TargetAudienceSection() {
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
