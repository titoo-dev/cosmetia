"use server";

import { saveTokens } from "@/lib/cookies-storage";
import { SessionToken } from "@/lib/types/types";
import { z } from "zod";

const signinSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export async function signinAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = signinSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erreur de validation des champs.",
    };
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      }),
    });

    const data: SessionToken = await response.json();

    if (data.access_token && data.refresh_token) {
      await saveTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    }

    return {
      success: true,
      message: "Connexion réussie",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
