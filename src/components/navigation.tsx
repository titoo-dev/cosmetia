import { getCurrentUserAction } from "@/actions/get-current-user-action";
import Link from "next/link";
import RenderWhen from "./render-when";
import { LoginDialog } from "./auth/login-dialog";

import { UserMenu } from "./user-menu";

export async function Navigation() {
	const currentUser = await getCurrentUserAction();

	console.log('currentUser', currentUser);
	
	const navigationLinks = [
		{ href: "/customer/marketplace", label: "Marketplace" },
		{ href: "/suppliers", label: "Fournisseurs" },
		{ href: "/pricing", label: "Tarifs" }
	];

	const customerNavigationLinks = [
        { href: "/customer/marketplace", label: "Marketplace" },
        { href: "/customer/suppliers", label: "Fournisseurs" },
        { href: "/customer/orders", label: "Devis" },
        { href: "/customer/statistics", label: "Statistiques" },
    ];

	const currentNavigationLinks = currentUser ? customerNavigationLinks : navigationLinks;

	return (
		<nav className="hidden md:flex items-center space-x-8">
			{currentNavigationLinks.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="text-gray-600 hover:text-[#166970] transition-colors"
				>
					{link.label}
				</Link>
			))}
			<RenderWhen condition={!currentUser}>
				<LoginDialog />
			</RenderWhen>
			<RenderWhen condition={!currentUser}>
				<Link
					href="/customer/register"
					className="bg-[#166970] text-white px-6 py-2 rounded-lg hover:bg-[#145a61] transition-colors inline-block"
				>
					Créer un compte
				</Link>
			</RenderWhen>
			<RenderWhen condition={!!currentUser}>
				<UserMenu user={currentUser} />
			</RenderWhen>
		</nav>
	);
}