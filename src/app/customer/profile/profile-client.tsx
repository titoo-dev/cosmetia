"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Phone, User, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useTransition } from "react";
import { updateCustomerInfoAction } from "@/actions/customer/register/last-step/update-customer-info-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CustomerUserEntity, UserEntity } from "@/lib/types/types";

interface CustomerProfileClientProps {
    customerData: CustomerUserEntity;
    currentUser: UserEntity;
}

export default function CustomerProfileClient({ customerData, currentUser }: CustomerProfileClientProps) {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState<string>(customerData?.pictureUrl || "");
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setErrors({});
            
            try {
                const result = await updateCustomerInfoAction(null, formData);
                
                if (result.errors) {
                    setErrors(result.errors);
                    toast.error(result.message || "Erreur de validation");
                } else if (result.success) {
                    toast.success(result.message || "Profil mis à jour avec succès");
                    router.refresh();
                } else if (result.error) {
                    toast.error(result.error);
                }
            } catch (error) {
                toast.error("Une erreur est survenue lors de la mise à jour");
                console.error(error);
            }
        });
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-black font-space-grotesk">
                            Mon Profil
                        </h1>
                        <p className="text-gray-600 font-plus-jakarta">
                            Gérez vos informations personnelles
                        </p>
                    </div>

                    <form ref={formRef} action={handleSubmit} className="space-y-6">
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
                                    htmlFor="picture"
                                    className="absolute -bottom-2 -right-2 bg-[#166970] text-white rounded-full p-2 cursor-pointer hover:bg-[#145a61] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
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
                        </div>

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
                                    value={currentUser?.email || ""}
                                    className="pl-10 bg-gray-50"
                                    disabled
                                />
                            </div>
                            <p className="text-sm text-gray-500">L'email ne peut pas être modifié</p>
                        </div>

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
                                    defaultValue={customerData?.nameOfContact || ""}
                                    className={`pl-10 ${errors?.nameOfContact?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            {errors?.nameOfContact?.[0] && (
                                <p className="text-sm text-red-600">{errors.nameOfContact[0]}</p>
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
                                    defaultValue={customerData?.companyName || ""}
                                    className={`pl-10 ${errors?.companyName?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                />
                            </div>
                            {errors?.companyName?.[0] && (
                                <p className="text-sm text-red-600">{errors.companyName[0]}</p>
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
                                    defaultValue={customerData?.phoneNumber || ""}
                                    className={`pl-10 ${errors?.phoneNumber?.[0] ? "border-red-500" : ""}`}
                                    disabled={isPending}
                                    required
                                />
                            </div>
                            {errors?.phoneNumber?.[0] && (
                                <p className="text-sm text-red-600">{errors.phoneNumber[0]}</p>
                            )}
                        </div>

                        {/* Object of Activity */}
                        <div className="space-y-2">
                            <Label htmlFor="purchaseObjective">
                                Objectif d'achat *
                            </Label>
                            <Select name="purchaseObjective" required disabled={isPending} defaultValue={customerData?.purchaseObjective || ""}>
                                <SelectTrigger className={`w-full ${errors?.purchaseObjective?.[0] ? "border-red-500" : ""}`}>
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
                            {errors?.purchaseObjective?.[0] && (
                                <p className="text-sm text-red-600">{errors.purchaseObjective[0]}</p>
                            )}
                        </div>

                        {/* General Error Display */}
                        {errors['general']?.[0] && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">{errors['general'][0]}</p>
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
            </div>
        </div>
    );
}
