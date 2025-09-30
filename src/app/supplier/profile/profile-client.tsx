"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Phone, User, Globe, Mail, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { updateSupplierInfoAction } from "@/actions/supplier/register/last-step/update-suppplier-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SupplierUserEntity } from "@/lib/types/types";

interface SupplierProfileClientProps {
    supplierData: SupplierUserEntity;
}

export default function SupplierProfileClient({ supplierData }: SupplierProfileClientProps) {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string>(supplierData?.pictureUrl || "");
    const [coverPhoto, setCoverPhoto] = useState<string>(supplierData?.coverPhotoUrl || "");
    const [state, formAction, isPending] = useActionState(updateSupplierInfoAction, {
        errors: {} as Record<string, string[]>,
        message: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.errors && Object.keys(state.errors).length > 0) {
            toast.error(state.message || "Erreur de validation");
        }

        if (state.success) {
            toast.success(state.message);
            router.refresh();
        }

        if (state.error) {
            toast.error(state.error);
        }
    }, [state.errors, state.success, state.message, state.error, router]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
        }
    };

    const handleCoverPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCoverPhoto(url);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <form ref={formRef} action={formAction} className="space-y-6">
                        {/* Cover Photo */}
                        <div className="relative h-48 bg-gradient-to-r from-[#166970] to-[#1a7a82] overflow-hidden">
                            {coverPhoto && (
                                <img 
                                    src={coverPhoto} 
                                    alt="Cover" 
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <label
                                htmlFor="coverPhoto"
                                className="absolute top-4 right-4 bg-white text-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-100 transition-colors shadow-md"
                            >
                                <Camera className="w-5 h-5" />
                            </label>
                            <input
                                id="coverPhoto"
                                name="coverPhoto"
                                type="file"
                                accept="image/*"
                                onChange={handleCoverPhotoUpload}
                                className="hidden"
                                disabled={isPending}
                            />
                        </div>

                        {/* Profile Section */}
                        <div className="px-6 -mt-16 relative">
                            <div className="flex flex-col items-center">
                                {/* Profile Image */}
                                <div className="relative mb-4">
                                    <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                        <AvatarImage className="object-cover" src={profileImage || undefined} />
                                        <AvatarFallback className="bg-gray-200 text-gray-600">
                                            <User className="w-14 h-14" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <label
                                        htmlFor="picture"
                                        className="absolute -bottom-2 -right-2 bg-[#166970] text-white rounded-full p-2 cursor-pointer hover:bg-[#145a61] transition-colors shadow-md"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </label>
                                    <input
                                        id="picture"
                                        name="picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        disabled={isPending}
                                    />
                                </div>

                                <div className="text-center mb-6">
                                    <h1 className="text-2xl font-bold text-black font-space-grotesk">
                                        Mon Profil Fournisseur
                                    </h1>
                                    <p className="text-gray-600 font-plus-jakarta">
                                        Gérez vos informations professionnelles
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pb-6 space-y-6">

                        {/* Email (read-only) */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={supplierData?.user?.email || ""}
                                    className="pl-10 bg-gray-50"
                                    disabled
                                />
                            </div>
                            <p className="text-sm text-gray-500">L'email ne peut pas être modifié</p>
                        </div>

                        {/* Company Name */}
                        <div className="space-y-2">
                            <Label htmlFor="companyName">
                                Nom de société
                            </Label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    placeholder="Entrez le nom de votre société"
                                    defaultValue={supplierData?.companyName || ""}
                                    className={`pl-10 ${state.errors?.companyName?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                />
                            </div>
                            {state.errors?.companyName?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.companyName[0]}</p>
                            )}
                        </div>

                        {/* SIRET / Professional ID */}
                        <div className="space-y-2">
                            <Label htmlFor="siretNumber">
                                SIRET ou identifiant professionnel *
                            </Label>
                            <div className="relative">
                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="siretNumber"
                                    name="siretNumber"
                                    type="text"
                                    placeholder="123 456 789 00012"
                                    defaultValue={supplierData?.siretNumber || ""}
                                    className={`pl-10 ${state.errors?.siretNumber?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            {state.errors?.siretNumber?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.siretNumber[0]}</p>
                            )}
                        </div>

                        {/* Contact Name */}
                        <div className="space-y-2">
                            <Label htmlFor="nameOfContact">
                                Nom & prénom du contact *
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="nameOfContact"
                                    name="nameOfContact"
                                    type="text"
                                    placeholder="Prénom Nom"
                                    defaultValue={supplierData?.nameOfContact || ""}
                                    className={`pl-10 ${state.errors?.nameOfContact?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            {state.errors?.nameOfContact?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.nameOfContact[0]}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">
                                Numéro de téléphone *
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="+33 6 12 34 56 78"
                                    defaultValue={supplierData?.phoneNumber || ""}
                                    className={`pl-10 ${state.errors?.phoneNumber?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            {state.errors?.phoneNumber?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.phoneNumber[0]}</p>
                            )}
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
                                    name="website"
                                    type="url"
                                    placeholder="https://www.exemple.com"
                                    defaultValue={supplierData?.website || ""}
                                    className={`pl-10 ${state.errors?.website?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                />
                            </div>
                            {state.errors?.website?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.website[0]}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="activityDescription">
                                Description de votre activité *
                            </Label>
                            <Textarea
                                id="activityDescription"
                                name="activityDescription"
                                placeholder="Décrivez votre activité et vos produits/services"
                                defaultValue={supplierData?.activityDescription || ""}
                                className={`min-h-[100px] resize-none ${state.errors?.activityDescription?.[0] ? "border-red-500" : ""}`}
                                disabled={isPending}
                                required
                            />
                            {state.errors?.activityDescription?.[0] && (
                                <p className="text-sm text-red-600">{state.errors.activityDescription[0]}</p>
                            )}
                        </div>

                        {/* General Error Display */}
                        {state.error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{state.error}</p>
                            </div>
                        )}

                        {/* Update Button */}
                        <Button
                            type="submit"
                            className="w-full bg-[#166970] hover:bg-[#145a61]"
                            size="lg"
                            disabled={isPending}
                        >
                            {isPending ? "Mise à jour en cours..." : "Mettre à jour le profil"}
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
