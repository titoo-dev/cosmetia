"use server";

interface SupplierDetailProduct {
  id: string;
  id_seq: number;
  tradeName: string;
  description: string;
  pictureUrl: string;
  inciName: string;
  certificate: string;
  pricePerQuantity: string;
  deliveryTime: string;
  regulationScore: number;
  minimumOrderQuantity: number;
  owner: {
    id: string;
    companyName: string;
    email: string;
    picture: string;
  };
  documents: any[];
  categories: any[];
  functions: any[];
  countries: any[];
}

interface SupplierDetailDocument {
  id: string;
  name: string;
  technicalSheet: string;
  description: string;
  fileUrl: string;
  owner: {
    id: string;
    companyName: string;
    email: string;
    picture: string;
  };
}

export interface SupplierDetailEntity {
  id: string;
  companyName: string;
  pictureUrl?: string;
  coverPhotoUrl?: string;
  siretNumber: string;
  nameOfContact: string;
  phoneNumber: string;
  website?: string;
  activityDescription: string;
  products: SupplierDetailProduct[];
  documents?: SupplierDetailDocument[];
}

export async function getSupplierDetail(id: string): Promise<SupplierDetailEntity | null> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/supplier/customer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Error fetching supplier detail: ${response.statusText}`);
      return null;
    }

    const supplier = await response.json();
    return supplier;
  } catch (error) {
    console.error(`Error fetching supplier detail ${id}:`, error);
    return null;
  }
}
