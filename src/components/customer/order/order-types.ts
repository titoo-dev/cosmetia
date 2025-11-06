export interface OrderFormData {
  finalResultFamily: string;
  finalResultName: string;
  finalResultQuantity: number;
  targetMarket: string;
  marketingAngle: string;
  formula: string;
  packagingType: string;
  estimatedTotalCost: number;
  providerId: string;
  orderItems: Array<{
    productId: string;
    quantity: number;
  }>;
}
