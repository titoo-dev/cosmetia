"use server";

import { getAccessToken } from "@/lib/cookies-storage";
import { z } from "zod";

const updateCustomerInfoSchema = z.object({
    companyName: z.string().optional(),
    nameOfContact: z.string().min(1, "Le nom de contact est requis"),
    phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
    purchaseObjective: z.string().min(1, "L'objectif d'achat est requis"),
    picture: z.string().optional(),
});

export async function updateCustomerInfoAction(prevState: unknown, formData: FormData) {
    const companyName = formData.get("companyName") as string;
    const nameOfContact = formData.get("nameOfContact") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const purchaseObjective = formData.get("purchaseObjective") as string;
    const picture = formData.get("picture") as string;

    const validatedFields = updateCustomerInfoSchema.safeParse({
        companyName,
        nameOfContact,
        phoneNumber,
        purchaseObjective,
        picture,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Erreur de validation des champs.",
        };
    }

    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return {
                error: "Token d'accès non trouvé",
            };
        }

        const formDataToSend = new FormData();
        if (validatedFields.data.companyName && validatedFields.data.companyName.trim() !== "") {
            formDataToSend.append("companyName", validatedFields.data.companyName);
        }
        formDataToSend.append("nameOfContact", validatedFields.data.nameOfContact);
        formDataToSend.append("phoneNumber", validatedFields.data.phoneNumber);
        formDataToSend.append("purchaseObjective", validatedFields.data.purchaseObjective);
        if (validatedFields.data.picture && validatedFields.data.picture.trim() !== "") {
            formDataToSend.append("picture", validatedFields.data.picture);
        }

        const response = await fetch(`${process.env.API_BASE_URL}/customer/customer`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            body: formDataToSend,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('API Error:', data);
            return {
                error: data.message || `Erreur ${response.status}: ${response.statusText}`,
            };
        }

        console.log('USER INFO UPDATED', data);

        return {
            success: true,
            message: "Informations mises à jour avec succès",
            data,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Erreur de connexion au serveur",
        };
    }
}
