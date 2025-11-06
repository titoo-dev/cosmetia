import { Search, List, Package, User, Send, Milk, Container, TestTube, LucideIcon } from "lucide-react";

export interface StepConfig {
  id: number;
  name: string;
  icon: LucideIcon;
}

export interface PackagingOption {
  id: string;
  name: string;
  icon: LucideIcon;
  bgColor: string;
  hoverColor: string;
}

export const PRODUCT_FAMILIES = [
  "Alimentation et nutrition animale",
  "Produit agrochimiques",
  "Chimie de base et intermédiaires",
  "CAS",
  "Ingrédient de nettoyage",
  "Matériaux composites",
  "Ingrédients cosmétiques",
  "Elastomères",
  "Fluide et lubrifiant",
  "Ingrédients alimentaires",
  "Pharmaceutique et nutraceutique",
  "Pigments et colorants",
  "Plastiques",
  "Produits prêt à l'emploi",
  "Autres"
];

export const TARGET_MARKETS = [
  "Cosmétique",
  "Pharmaceutique",
  "Alimentaire",
  "Industriel",
  "Agriculture",
  "Automobile",
  "Textile",
  "Autres"
];

export const MARKETING_ANGLES = [
  "Innovation",
  "Qualité",
  "Prix compétitif",
  "Durabilité",
  "Performance",
  "Sécurité",
  "Traçabilité",
  "Autres"
];

export const PACKAGING_OPTIONS: PackagingOption[] = [
  {
    id: "flacons",
    name: "Flacons",
    icon: Milk,
    bgColor: "bg-[#FFE4CC]",
    hoverColor: "hover:bg-[#FFD9B3]"
  },
  {
    id: "pots",
    name: "Pots",
    icon: Container,
    bgColor: "bg-[#C5F5F5]",
    hoverColor: "hover:bg-[#B0EDED]"
  },
  {
    id: "tubes",
    name: "Tubes",
    icon: TestTube,
    bgColor: "bg-[#FFCCFF]",
    hoverColor: "hover:bg-[#FFB3FF]"
  }
];

export const STEPS: StepConfig[] = [
  { id: 1, name: "Angle marketing", icon: Search },
  { id: 2, name: "Formulation", icon: List },
  { id: 3, name: "Matière première", icon: Package },
  { id: 4, name: "Emballage", icon: Package },
  { id: 5, name: "Prestataires", icon: User },
  { id: 6, name: "Commande", icon: Send },
];
