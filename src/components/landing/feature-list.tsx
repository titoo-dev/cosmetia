
export function FeatureList({ items }: { items: string[] }) {
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
