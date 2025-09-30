"use server";

import z from "zod";
import { getAccessToken } from "@/lib/cookies-storage";

const updateSupplierInfoSchema = z.object({
    companyName: z.string().optional(),
    siretNumber: z.string().min(1, "Le numéro de SIRET est requis"),
    nameOfContact: z.string().min(1, "Le nom de contact est requis"),
    phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
    website: z.string().optional(),
    activityDescription: z.string().min(1, "La description de l'activité est requise"),
});

export async function updateSupplierInfoAction(prevState: unknown, formData: FormData) {
    const companyName = formData.get("companyName") as string;
    const siretNumber = formData.get("siretNumber") as string;
    const nameOfContact = formData.get("nameOfContact") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const website = formData.get("website") as string;
    const activityDescription = formData.get("activityDescription") as string;
    const picture = formData.get("picture") as File | null;
    const coverPhoto = formData.get("coverPhoto") as File | null;

    const validatedFields = updateSupplierInfoSchema.safeParse({
        companyName,
        siretNumber,
        nameOfContact,
        phoneNumber,
        website,
        activityDescription,
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
        if (validatedFields.data.companyName) {
            formDataToSend.append("companyName", validatedFields.data.companyName);
        }
        formDataToSend.append("siretNumber", validatedFields.data.siretNumber);
        formDataToSend.append("nameOfContact", validatedFields.data.nameOfContact);
        formDataToSend.append("phoneNumber", validatedFields.data.phoneNumber);
        if (validatedFields.data.website) {
            formDataToSend.append("website", validatedFields.data.website);
        }
        formDataToSend.append("activityDescription", validatedFields.data.activityDescription);
        if (picture && picture.size > 0) {
            formDataToSend.append("picture", picture);
        }
        if (coverPhoto && coverPhoto.size > 0) {
            formDataToSend.append("coverPhoto", coverPhoto);
        }

        const response = await fetch(`${process.env.API_BASE_URL}/supplier/supplier`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            body: formDataToSend,
        });

        const data = await response.json();

        console.log('SUPPLIER INFO UPDATED', data);

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
