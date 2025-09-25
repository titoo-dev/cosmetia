import { ReactNode } from "react";
import Image from "next/image";

interface SupplierRegisterLayoutProps {
    children: ReactNode;
}

export default function SupplierRegisterLayout({ children }: SupplierRegisterLayoutProps) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="/images/hero_image_register_supplier.png"
                    alt="Supplier registration hero image"
                    fill
                    className="object-cover brightness-75"
                />
                <div className="absolute top-8 left-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xl font-bold text-white font-space-grotesk">
                            Cosmetia
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F7F4EF] overflow-y-auto">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
                        <div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xl font-bold text-[#166970] font-space-grotesk">
                            Cosmetia
                        </span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
