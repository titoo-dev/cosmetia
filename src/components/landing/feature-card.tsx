

export function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="text-center p-8 rounded-2xl bg-[#F7F4EF] hover:bg-gray-50 transition-colors">
            <div className="w-16 h-16 bg-[#GFFBBF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-4 font-space-grotesk">
                {title}
            </h3>
            <p className="text-gray-600 font-plus-jakarta">
                {description}
            </p>
        </div>
    );
}
