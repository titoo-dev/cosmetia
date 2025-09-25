"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Phone, User, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { updateSupplierInfoAction } from "@/actions/supplier/register/last-step/update-suppplier-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LastStepSupplierPage() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(updateSupplierInfoAction, {
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
            router.push("/supplier");
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
                    Complétez vos informations fournisseur
                </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-6">
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

                {/* Hidden input for picture */}
                <input type="hidden" id="picture" name="picture" />

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
                            className={`pl-10 ${state.errors?.companyName ? "border-red-500" : ""}`}
                            disabled={isPending}
                        />
                    </div>
                    {state.errors?.companyName && (
                        <p className="text-sm text-red-600">{state.errors.companyName}</p>
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
                            className={`pl-10 ${state.errors?.siretNumber ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {state.errors?.siretNumber && (
                        <p className="text-sm text-red-600">{state.errors.siretNumber}</p>
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
                            className={`pl-10 ${state.errors?.nameOfContact ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {state.errors?.nameOfContact && (
                        <p className="text-sm text-red-600">{state.errors.nameOfContact}</p>
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
                            className={`pl-10 ${state.errors?.phoneNumber ? "border-red-500" : ""}`}
                            disabled={isPending}
                            required
                        />
                    </div>
                    {state.errors?.phoneNumber && (
                        <p className="text-sm text-red-600">{state.errors.phoneNumber}</p>
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
                            className={`pl-10 ${state.errors?.website ? "border-red-500" : ""}`}
                            disabled={isPending}
                        />
                    </div>
                    {state.errors?.website && (
                        <p className="text-sm text-red-600">{state.errors.website}</p>
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
                        className={`min-h-[100px] resize-none ${state.errors?.activityDescription ? "border-red-500" : ""}`}
                        disabled={isPending}
                        required
                    />
                    {state.errors?.activityDescription && (
                        <p className="text-sm text-red-600">{state.errors.activityDescription}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-[#166970] hover:bg-[#145a61]"
                    size="lg"
                    disabled={isPending}
                >
                    {isPending ? "Enregistrement en cours..." : "S'enregistrer"}
                </Button>
            </form>
        </div>
    );
}
