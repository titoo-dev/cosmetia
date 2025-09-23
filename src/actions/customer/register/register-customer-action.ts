"use server";

import { ServerMessage } from "@/lib/types/types";
import { z } from "zod";

const registerCustomerSchema = z.object({
  email: z.email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export async function registerCustomerAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ["Les mots de passe ne correspondent pas"],
      },
      message: "Les mots de passe ne correspondent pas",
    };
  }

  const validatedFields = registerCustomerSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erreur de validation des champs.",
    };
  }

  try {
    const response = await fetch("https://cos-api-dev.nouralalaam.com/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        role: "CUSTOMER",
      }),
    });

    const data: ServerMessage = await response.json();
    
    return {
      success: true,
      message: data.message,
      data: {
        email: validatedFields.data.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Erreur de connexion au serveur",
    };
  }
}
