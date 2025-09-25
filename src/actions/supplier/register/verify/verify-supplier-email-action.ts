"use server";

import { saveTokens } from "@/lib/cookies-storage";
import { SessionToken } from "@/lib/types/types";


export async function verifySupplierEmailAction(prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;
  
    if (!email || !otp || otp.length !== 6) {
      return {
        error: "Code de vérification invalide",
      };
    }
  
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/auth/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: parseInt(otp),
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
        message: "Email vérifié avec succès",
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        error: "Erreur de connexion au serveur",
      };
    }
  }