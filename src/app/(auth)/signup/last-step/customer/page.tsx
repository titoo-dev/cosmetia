"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Phone, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LastStepCustomerPage() {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/signup-bg.jpg')",
                        filter: "brightness(0.7)"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#166970]/20 to-[#166970]/40"></div>
                </div>
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

            {/* Right side - Signup Form */}
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

                    <Card className="shadow-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold text-black font-space-grotesk">
                                Inscription acheteur
                            </CardTitle>
                            <CardDescription className="text-gray-600 font-plus-jakarta">
                                Veuillez fournir vos informations
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-6">
                                {/* Profile Image */}
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <Avatar className="w-20 h-20" >
                                            <AvatarImage className="object-cover" src={profileImage || undefined} />
                                            <AvatarFallback className="bg-gray-200 text-gray-600">
                                                <User className="w-8 h-8" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <label
                                            htmlFor="profile-image"
                                            className="absolute -bottom-2 -right-2 bg-[#166970] text-white rounded-full p-2 cursor-pointer hover:bg-[#145a61] transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </label>
                                        <input
                                            id="profile-image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                {/* First Name & Last Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">
                                        Nom & prénom *
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="Prénom Nom"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="space-y-2">
                                    <Label htmlFor="company">
                                        Société
                                    </Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="company"
                                            type="text"
                                            placeholder="Nom de votre société"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Téléphone
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+33 6 12 34 56 78"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Object of Activity */}
                                <div className="space-y-2">
                                    <Label htmlFor="purchaseObjective">
                                        Objectif d'achat
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez votre objectif d'achat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="raw-materials">Matières premières</SelectItem>
                                            <SelectItem value="active-ingredients">Ingrédients actifs</SelectItem>
                                            <SelectItem value="packaging">Emballage</SelectItem>
                                            <SelectItem value="formulation">Formulation</SelectItem>
                                            <SelectItem value="equipment">Équipement</SelectItem>
                                            <SelectItem value="services">Services</SelectItem>
                                            <SelectItem value="other">Autre</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Signup Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#166970] hover:bg-[#145a61]"
                                    size="lg"
                                >
                                    S'inscrire
                                </Button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Ou</span>
                                    </div>
                                </div>

                                {/* LinkedIn Signup */}
                                <Button
                                    type="button"
                                    className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
                                    size="lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    S'inscrire avec LinkedIn
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="justify-center">
                            <span className="text-gray-600">Déjà un compte ? </span>
                            <Link
                                href="/login"
                                className="text-[#166970] hover:text-[#145a61] font-semibold transition-colors ml-1"
                            >
                                Se connecter
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}