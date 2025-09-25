import Link from "next/link";

export function Logo() {
	return (
		<Link href="/" className="flex items-center space-x-2">
			<div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
				<span className="text-white font-bold text-sm">
					C
				</span>
			</div>
			<span className="text-xl font-bold text-[#166970] font-space-grotesk">
				Cosmetia
			</span>
		</Link>
	);
}
