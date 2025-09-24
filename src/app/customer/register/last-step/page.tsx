"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Phone, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { updateCustomerInfoAction } from "@/actions/customer/register/last-step/update-customer-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LastStepCustomerPage() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(updateCustomerInfoAction, {
        errors: {},
        message: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.errors && Object.keys(state.errors).length > 0) {
            toast.error(state.message || "Erreur de validation");
        }

        if (state.success) {
            toast.success(state.message);
            router.push("/customer");
        }
    }, [state.errors, state.success, state.message, router]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setProfileImage(result);
                // Update the hidden input with the base64 image
                const pictureInput = document.getElementById('picture') as HTMLInputElement;
                if (pictureInput) {
                    pictureInput.value = result;
                }
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

                <form ref={formRef} action={formAction} className="space-y-6">
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

                    {/* Hidden input for picture */}
                    <input type="hidden" id="picture" name="picture" />

                    {/* First Name & Last Name */}
                    <div className="space-y-2">
                        <Label htmlFor="nameOfContact">
                            Nom & prénom *
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="nameOfContact"
                                name="nameOfContact"
                                type="text"
                                placeholder="Prénom Nom"
                                className={`pl-10 ${state.errors?.nameOfContact ? "border-red-500" : ""}`}
                                disabled={isPending}
                                required
                            />
                        </div>
                        {state.errors?.nameOfContact && (
                            <p className="text-sm text-red-600">{state.errors.nameOfContact}</p>
                        )}
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                        <Label htmlFor="companyName">
                            Société
                        </Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="companyName"
                                name="companyName"
                                type="text"
                                placeholder="Nom de votre société"
                                className={`pl-10 ${state.errors?.companyName ? "border-red-500" : ""}`}
                                disabled={isPending}
                            />
                        </div>
                        {state.errors?.companyName && (
                            <p className="text-sm text-red-600">{state.errors.companyName}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">
                            Téléphone *
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+33 6 12 34 56 78"
                                className={`pl-10 ${state.errors?.phoneNumber ? "border-red-500" : ""}`}
                                disabled={isPending}
                                required
                            />
                        </div>
                        {state.errors?.phoneNumber && (
                            <p className="text-sm text-red-600">{state.errors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Object of Activity */}
                    <div className="space-y-2">
                        <Label htmlFor="purchaseObjective">
                            Objectif d'achat *
                        </Label>
                        <Select name="purchaseObjective" required disabled={isPending}>
                            <SelectTrigger className={`w-full ${state.errors?.purchaseObjective ? "border-red-500" : ""}`}>
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
                        {state.errors?.purchaseObjective && (
                            <p className="text-sm text-red-600">{state.errors.purchaseObjective}</p>
                        )}
                    </div>

                    {/* Signup Button */}
                    <Button
                        type="submit"
                        className="w-full bg-[#166970] hover:bg-[#145a61]"
                        size="lg"
                        disabled={isPending}
                    >
                        {isPending ? "Enregistrement en cours..." : "Enregistrer"}
                    </Button>
                </form>
        </div>
    );
}