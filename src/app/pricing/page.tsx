
export const dynamic = 'force-dynamic'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 font-space-grotesk">
                            Plans tarifaires
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-plus-jakarta">
                            Lancez-vous sans frais. <br />
                            Payez uniquement quand vous en avez besoin.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Starter Plan */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
                            <p className="text-sm text-gray-600 mb-4">10 leads qualifiés</p>
                            <div className="text-2xl font-bold text-gray-900">Gratuit</div>
                        </div>
                        <button className="w-full bg-[#166970] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#145a61] transition-colors">
                            Commencer
                        </button>
                    </div>

                    {/* Standard Plan */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Standard</h3>
                            <p className="text-sm text-gray-600 mb-4">Pay-Per-Lead</p>
                            <div className="text-2xl font-bold text-gray-900">3 € / lead</div>
                        </div>
                        <button className="w-full bg-[#166970] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#145a61] transition-colors">
                            Commencer
                        </button>
                    </div>

                    {/* Growth Plan */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
                            <p className="text-sm text-gray-600 mb-4">Abonnement mensuel</p>
                            <div className="text-2xl font-bold text-gray-900">200 € / mois</div>
                        </div>
                        <button className="w-full bg-[#166970] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#145a61] transition-colors">
                            Commencer
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Tarifs sur quota & SLA <br />
                                Contacter le service <br />
                                commercial
                            </p>
                        </div>
                        <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                            Nous contacter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
