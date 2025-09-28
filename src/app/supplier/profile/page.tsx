"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Phone, User, Globe, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { updateSupplierInfoAction } from "@/actions/supplier/register/last-step/update-suppplier-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentUserAction } from "@/actions/get-current-user-action";
import { SupplierUserEntity } from "@/lib/types/types";

export default function SupplierProfilePage() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [supplierData, setSupplierData] = useState<SupplierUserEntity | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [state, formAction, isPending] = useActionState(updateSupplierInfoAction, {
        errors: {} as any,
        message: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const fetchSupplierData = async () => {
            try {
                const user = await getCurrentUserAction();
                if (user?.supplier) {
                    setSupplierData(user.supplier);
                    if (user.supplier.pictureUrl) {
                        setProfileImage(user.supplier.pictureUrl);
                    }
                }
            } catch (error) {
                console.error("Error fetching supplier data:", error);
                toast.error("Erreur lors du chargement des données");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSupplierData();
    }, []);

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
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setProfileImage(result);
                const pictureInput = document.getElementById('picture') as HTMLInputElement;
                if (pictureInput) {
                    pictureInput.value = result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#166970] mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement des données...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-black font-space-grotesk">
                    Mon Profil Fournisseur
                </h1>
                <p className="text-gray-600 font-plus-jakarta">
                    Gérez vos informations professionnelles
                </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage className="object-cover" src={profileImage || undefined} />
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                                <User className="w-10 h-10" />
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
                            className={`pl-10 ${(state.errors as any)?.companyName?.[0] ? "border-red-500" : ""}`}
                            disabled={isPending}
                        />
                    </div>
                    {(state.errors as any)?.companyName?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).companyName[0]}</p>
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
                            className={`pl-10 ${(state.errors as any)?.siretNumber?.[0] ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {(state.errors as any)?.siretNumber?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).siretNumber[0]}</p>
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
                            className={`pl-10 ${(state.errors as any)?.nameOfContact?.[0] ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {(state.errors as any)?.nameOfContact?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).nameOfContact[0]}</p>
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
                            className={`pl-10 ${(state.errors as any)?.phoneNumber?.[0] ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {(state.errors as any)?.phoneNumber?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).phoneNumber[0]}</p>
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
                            className={`pl-10 ${(state.errors as any)?.website?.[0] ? "border-red-500" : ""}`}
                            disabled={isPending}
                        />
                    </div>
                    {(state.errors as any)?.website?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).website[0]}</p>
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
                        className={`min-h-[100px] resize-none ${(state.errors as any)?.activityDescription?.[0] ? "border-red-500" : ""}`}
                        disabled={isPending}
                        required
                    />
                    {(state.errors as any)?.activityDescription?.[0] && (
                        <p className="text-sm text-red-600">{(state.errors as any).activityDescription[0]}</p>
                    )}
                </div>

                {/* General Error Display */}
                {(state.errors as any)?.general?.[0] && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{(state.errors as any).general[0]}</p>
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
            </form>
        </div>
    );
}
