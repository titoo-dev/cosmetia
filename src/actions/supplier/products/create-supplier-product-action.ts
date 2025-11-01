"use server";

import { getTokens } from "@/lib/cookies-storage";
import { revalidatePath } from "next/cache";

export interface CreateProductInput {
  tradeName: string;
  description: string;
  inciName: string;
  certificate: string;
  pricePerQuantity: string;
  deliveryTime: string;
  minimumOrderQuantity: string;
  picture?: File;
  documentsToAdd?: string[];
  categoriesToAdd: string[];
  functionsToAdd: string[];
  countriesToAdd: string[];
}

export interface CreateProductResponse {
  success: boolean;
  message?: string;
  productId?: string;
}

export async function createSupplierProductAction(
  formData: FormData
): Promise<CreateProductResponse> {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return {
        success: false,
        message: "Non authentifié",
      };
    }

    // Create a new FormData with the correct field names for the backend
    const backendFormData = new FormData();

    // Add required string fields
    backendFormData.append("tradeName", formData.get("tradeName") as string);
    backendFormData.append("description", formData.get("description") as string);
    backendFormData.append("inciName", formData.get("inciName") as string);
    backendFormData.append("certificate", formData.get("certificate") as string);
    backendFormData.append("pricePerQuantity", formData.get("pricePerQuantity") as string);
    backendFormData.append("deliveryTime", formData.get("deliveryTime") as string);
    backendFormData.append("minimumOrderQuantity", formData.get("minimumOrderQuantity") as string);

    // Add array fields - parse from JSON strings
    const categoriesToAdd = JSON.parse(formData.get("categoriesToAdd") as string);
    categoriesToAdd.forEach((id: string) => {
      backendFormData.append("categoriesToAdd", id);
    });

    const functionsToAdd = JSON.parse(formData.get("functionsToAdd") as string);
    functionsToAdd.forEach((id: string) => {
      backendFormData.append("functionsToAdd", id);
    });

    const countriesToAdd = JSON.parse(formData.get("countriesToAdd") as string);
    countriesToAdd.forEach((id: string) => {
      backendFormData.append("countriesToAdd", id);
    });

    // Add optional picture
    const picture = formData.get("picture") as File | null;
    if (picture && picture.size > 0) {
      backendFormData.append("picture", picture);
    }

    // Add optional documents if provided
    const documentsToAdd = formData.get("documentsToAdd");
    if (documentsToAdd) {
      const documents = JSON.parse(documentsToAdd as string);
      documents.forEach((id: string) => {
        backendFormData.append("documentsToAdd", id);
      });
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/product/supplier`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: backendFormData,
      }
    );

    if (response.status !== 200) {
      const error = await response.text();
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "Erreur lors de la création du produit",
      };
    }

    const createdProduct = await response.json();

    return {
      success: true,
      message: "Produit créé avec succès",
      productId: createdProduct.id,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Une erreur est survenue",
    };
  } finally {
    revalidatePath("/supplier/products");
  }
}
