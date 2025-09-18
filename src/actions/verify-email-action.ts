"use server";


export async function verifyEmailAction(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;
  
    if (!email || !otp || otp.length !== 6) {
      return {
        error: "Code de vérification invalide",
      };
    }
  
    try {
      const response = await fetch("https://cos-api-dev.nouralalaam.com/auth/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: parseInt(otp),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return {
          error: errorData.message || "Erreur lors de la vérification",
        };
      }
  
      return {
        success: true,
        message: "Email vérifié avec succès",
      };
    } catch (error) {
      return {
        error: "Erreur de connexion au serveur",
      };
    }
  }