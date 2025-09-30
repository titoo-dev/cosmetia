"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useActionState } from "react";
import { updateProviderInfoAction } from "@/actions/provider/register/last-step/update-provider-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LastStepProviderPage() {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(updateProviderInfoAction, {
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
            router.push("/provider");
        }
    }, [state.errors, state.success, state.message, router]);

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

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-black font-space-grotesk">
                    Inscription préstataire
                </h1>
                <p className="text-gray-600 font-plus-jakarta">
                    Veuillez fournir vos informations
                </p>
            </div>

            <form ref={formRef} action={formAction} className="space-y-6">
                <div className="flex justify-center">
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

                <input type="hidden" id="picture" name="picture" />

                <div className="space-y-2">
                    <Label htmlFor="name">
                        Nom & prénom
                    </Label>
                    <div className="relative">
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Entrez votre nom et prénom"
                            className={state.errors?.name ? "border-red-500" : ""}
                            disabled={isPending}
                        />
                    </div>
                    {state.errors?.name && (
                        <p className="text-sm text-red-600">{state.errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">
                        Numéro de téléphone
                    </Label>
                    <div className="relative">
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            className={state.errors?.phoneNumber ? "border-red-500" : ""}
                            disabled={isPending}
                        />
                    </div>
                    {state.errors?.phoneNumber && (
                        <p className="text-sm text-red-600">{state.errors.phoneNumber}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description de votre activité
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Décrivez votre activité et vos services"
                        className={`min-h-[100px] resize-none ${state.errors?.description ? "border-red-500" : ""}`}
                        disabled={isPending}
                    />
                    {state.errors?.description && (
                        <p className="text-sm text-red-600">{state.errors.description}</p>
                    )}
                </div>

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
