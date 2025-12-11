export enum ProductType {
  HERBICIDE = 'Herbicide',
  INSECTICIDE = 'Insecticide',
  FUNGICIDE = 'Fungicide',
  ORGANIC = 'Organic Alternative'
}

export enum Unit {
  GALLON = 'Gallon',
  QUART = 'Quart',
  POUND = 'Pound',
  OUNCE = 'Ounce'
}

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  type: ProductType;
  activeIngredient: string;
  crops: string[];
  price: number; // Price in USD
  packageSize: number; // Numerical amount
  packageUnit: Unit; // Unit of the package
  rateMin: number; // Application rate min
  rateMax: number; // Application rate max
  rateUnit: string; // e.g., "oz/acre"
  isOrganic: boolean;
}

export interface ResourceGuide {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export interface CalculatorResult {
  productCost: number;
  laborCost: number;
  totalCost: number;
  costPerAcre: number;
}