import { getCurrentUserAction } from "@/actions/get-current-user-action";
import Link from "next/link";
import RenderWhen from "./render-when";
import { LoginDialog } from "./auth/login-dialog";
import { UserMenu } from "./user-menu";
import { NavigationLinks } from "./navigation-links";

export async function Navigation() {
	const currentUser = await getCurrentUserAction();

	const navigationLinks = [
		{ href: "/marketplace", label: "Marketplace" },
		{ href: "/suppliers", label: "Fournisseurs" },
		{ href: "/pricing", label: "Tarifs" }
	];

	const customerNavigationLinks = [
        { href: "/marketplace", label: "Marketplace" },
        { href: "/suppliers", label: "Fournisseurs" },
        { href: "/customer/orders", label: "Devis" },
        { href: "/customer/statistics", label: "Statistiques" },
    ];

	const currentNavigationLinks = currentUser ? customerNavigationLinks : navigationLinks;

	return (
		<nav className="hidden md:flex items-center space-x-8">
			<NavigationLinks links={currentNavigationLinks} />
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