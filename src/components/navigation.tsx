import { getCurrentUserAction } from "@/actions/get-current-user-action";
import Link from "next/link";
import RenderWhen from "./render-when";
import { LoginDialog } from "./auth/login-dialog";


export async function Navigation() {
	const currentUser = await getCurrentUserAction();
	return (
		<nav className="hidden md:flex items-center space-x-8">
			<Link
				href="/customer/marketplace"
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
			<RenderWhen condition={!currentUser}>
				<LoginDialog />
			</RenderWhen>
			<Link
				href="/customer/register"
				className="bg-[#166970] text-white px-6 py-2 rounded-lg hover:bg-[#145a61] transition-colors inline-block"
			>
				Créer un compte
			</Link>
		</nav>
	);
}