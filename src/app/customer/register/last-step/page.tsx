"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-black font-space-grotesk">
                    Finalisation du profil
                </h1>
                <p className="text-gray-600 font-plus-jakarta">
                    Complétez vos informations personnelles
                </p>
            </div>
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
                        Enregistrer
                    </Button>
                </form>
        </div>
    );
}