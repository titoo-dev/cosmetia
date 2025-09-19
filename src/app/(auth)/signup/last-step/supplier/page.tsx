"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building, Phone, User, Globe } from "lucide-react";
import { useState } from "react";

export default function LastStepSupplierPage() {
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
                                Inscription Fournisseur
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
                                        <Avatar className="w-20 h-20">
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
                                        Nom de société *
                                    </Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="fullName"
                                            type="text"
                                            placeholder="Entrez le nom de votre société"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* SIRET / Professional ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="siret">
                                        SIRET ou identifiant professionnel *
                                    </Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="siret"
                                            type="text"
                                            placeholder="123 456 789 00012"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="space-y-2">
                                    <Label htmlFor="company">
                                        Nom & prénom du contact *
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="company"
                                            type="text"
                                            placeholder="Prénom Nom"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        Numéro de téléphone
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

                                {/* Website */}
                                <div className="space-y-2">
                                    <Label htmlFor="website">
                                        Site web
                                    </Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            id="website"
                                            type="url"
                                            placeholder="https://www.exemple.com"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description de votre activité
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Décrivez votre activité et vos produits/services"
                                        className="min-h-[100px] resize-none"
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">
                                        Catégorie
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez votre catégorie" />
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
                                    S'enregistrer
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
