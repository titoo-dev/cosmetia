"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationLink {
	href: string;
	label: string;
}

interface NavigationLinksProps {
	links: NavigationLink[];
}

export function NavigationLinks({ links }: NavigationLinksProps) {
	const pathname = usePathname();

	const isActiveLink = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href);
	};

	return (
		<>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						"text-gray-600 hover:text-[#166970] transition-colors font-medium",
						isActiveLink(link.href) && "text-[#166970] border-b-2 border-[#166970]"
					)}
				>
					{link.label}
				</Link>
			))}
		</>
	);
}
