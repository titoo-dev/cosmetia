import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#166970] text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <span className="text-[#166970] font-bold text-sm">
                                    C
                                </span>
                            </div>
                            <span className="text-xl font-bold font-space-grotesk">
                                Cosmetia
                            </span>
                        </div>
                        <p className="text-gray-300 font-plus-jakarta">
                            La marketplace B2B de référence pour l'industrie
                            cosmétique.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 font-space-grotesk">
                            S'inscrire
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link
                                    href="/register/buyer"
                                    className="hover:text-white transition-colors"
                                >
                                    Acheteurs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register/supplier"
                                    className="hover:text-white transition-colors"
                                >
                                    Fournisseurs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 font-space-grotesk">
                            Compagnie
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 font-space-grotesk">
                            Support
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link
                                    href="/help"
                                    className="hover:text-white transition-colors"
                                >
                                    Centre d'aide
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-white transition-colors"
                                >
                                    Politique de confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-white transition-colors"
                                >
                                    Conditions d'utilisation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 Cosmetia. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}