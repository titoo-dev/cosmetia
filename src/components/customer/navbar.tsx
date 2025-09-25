"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function CustomerNavbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/customer/marketplace", label: "Marketplace" },
        { href: "/customer/suppliers", label: "Fournisseurs" },
        { href: "/customer/orders", label: "Devis" },
        { href: "/customer/statistics", label: "Statistiques" },
    ];

    return (
        <nav className="w-full bg-[#FAF9F6] border-b border-gray-100 px-6 py-2">
            <div className="container max-w-7xl flex items-center justify-between mx-auto">
                <div className="flex items-center space-x-2">
                    <Link href="/customer/marketplace" className="flex items-center space-x-2">
                        <div className="relative h-12 w-24">
                            <Image
                                src="/logo.png"
                                fill
                                alt="Cosmetia Logo"
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </div>
                <div className="flex-1 flex items-center justify-end">
                    <div className="hidden md:flex items-center space-x-5 mr-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-xs font-semibold transition-colors ${
                                        isActive
                                            ? "text-primary"
                                            : link.href === "/customer/marketplace"
                                            ? "text-gray-900"
                                            : "text-gray-700"
                                        } hover:text-primary`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Bell className="w-5 h-5 text-gray-700" />
                            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold border-2 border-white">
                                2
                            </span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-primary transition">
                            <User className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
