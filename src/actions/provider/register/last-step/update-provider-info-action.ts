"use server";

import z from "zod";
import { getAccessToken } from "@/lib/cookies-storage";

const updateProviderInfoSchema = z.object({
    name: z.string().min(1, "Le nom et prénom sont requis"),
    phoneNumber: z.string().min(1, "Le numéro de téléphone est requis"),
    description: z.string().min(1, "La description de l'activité est requise"),
    picture: z.string().optional(),
});

export async function updateProviderInfoAction(prevState: unknown, formData: FormData) {
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const description = formData.get("description") as string;
    const picture = formData.get("picture") as string;

    const validatedFields = updateProviderInfoSchema.safeParse({
        name,
        phoneNumber,
        description,
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
        formDataToSend.append("name", validatedFields.data.name);
        formDataToSend.append("phoneNumber", validatedFields.data.phoneNumber);
        formDataToSend.append("description", validatedFields.data.description);
        if (validatedFields.data.picture) {
            formDataToSend.append("picture", validatedFields.data.picture);
        }

        const response = await fetch(`${process.env.API_BASE_URL}/provider/provider`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            body: formDataToSend,
        });

        const data = await response.json();

        console.log('PROVIDER INFO UPDATED', data);

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
