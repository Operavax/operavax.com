export interface Product {
  id: string;
  name: string;
  tagline: string;
  color: string;
  bg: string;
  url: string;
  badge: string | null;
  visible: boolean;
  needsSector: boolean;
  icon: string;
}

export interface Sector {
  id: string;
  name: string;
  color: string;
  group: string;
}

export interface Category {
  id: string | undefined;
  label: string;
  color: string;
  icon: string;
}

export interface FavouriteItem {
  url: string;
  name: string;
  productId: string;
  sectorId: string | null;
  productName: string;
  productColor: string;
  productBg: string;
  productIcon: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "docs",
    name: "Operavax Docs",
    tagline: "Guides, references & documentation for every product.",
    color: "#0F9D58",
    bg: "#E6F4EA",
    url: "docs.operavax.com",
    badge: null,
    visible: true,
    needsSector: false,
    icon: "book",
  },
  {
    id: "report",
    name: "Operavax Report",
    tagline: "Camera-first reporting automatically routed to the right authority or department.",
    color: "#DB4437",
    bg: "#FDE8E7",
    url: "report.operavax.com",
    badge: null,
    visible: true,
    needsSector: true,
    icon: "camera",
  },
];

export const SECTORS: Sector[] = [
  { id: "government", name: "Government", color: "#4285F4", group: "public" },
  { id: "municipal", name: "Municipal", color: "#F4B400", group: "public" },
  { id: "tax", name: "Tax & Revenue", color: "#0F9D58", group: "public" },
  { id: "legal", name: "Legal", color: "#DB4437", group: "public" },
  { id: "compliance", name: "Compliance", color: "#F4B400", group: "public" },
  { id: "immigration", name: "Immigration", color: "#0F9D58", group: "public" },
  { id: "registration_licensing", name: "Registration & Licensing", color: "#DB4437", group: "public" },
  { id: "defence", name: "Defence & Security", color: "#4285F4", group: "public" },
  { id: "finance", name: "Finance", color: "#F4B400", group: "finance" },
  { id: "banking", name: "Banking", color: "#4285F4", group: "finance" },
  { id: "insurance", name: "Insurance", color: "#0F9D58", group: "finance" },
  { id: "tenders", name: "Tenders & Procurement", color: "#4285F4", group: "finance" },
  { id: "retail_commerce", name: "Retail & Commerce", color: "#F4B400", group: "industry" },
  { id: "construction", name: "Construction", color: "#F4B400", group: "industry" },
  { id: "manufacturing", name: "Manufacturing", color: "#4285F4", group: "industry" },
  { id: "mining", name: "Mining & Energy", color: "#F4B400", group: "industry" },
  { id: "agriculture", name: "Agriculture", color: "#0F9D58", group: "industry" },
  { id: "maritime", name: "Maritime & Ports", color: "#4285F4", group: "industry" },
  { id: "healthcare", name: "Healthcare", color: "#DB4437", group: "services" },
  { id: "education", name: "Education", color: "#4285F4", group: "services" },
  { id: "employment", name: "Employment & HR", color: "#4285F4", group: "services" },
  { id: "business_services", name: "Business Services", color: "#4285F4", group: "services" },
  { id: "social_membership", name: "Social, NGO & Membership", color: "#DB4437", group: "services" },
  { id: "travel_hospitality", name: "Travel & Hospitality", color: "#4285F4", group: "services" },
  { id: "media", name: "Media & Entertainment", color: "#DB4437", group: "services" },
  { id: "real_estate", name: "Housing & Real Estate", color: "#4285F4", group: "infra" },
  { id: "utilities_telecom", name: "Utilities & Telecom", color: "#F4B400", group: "infra" },
  { id: "transport", name: "Transport & Logistics", color: "#0F9D58", group: "infra" },
  { id: "telecom", name: "Telecommunications", color: "#0F9D58", group: "infra" },
  { id: "tech", name: "Technology & IT", color: "#0F9D58", group: "infra" },
  { id: "environmental", name: "Environmental", color: "#0F9D58", group: "infra" },
];

// Categories bar — matches the original operavax sectors exactly
export const CATEGORIES: Category[] = [
  { id: undefined, label: "All Products", color: "#4285F4", icon: "all" },
  { id: "government", label: "Government", color: "#4285F4", icon: "building" },
  { id: "finance", label: "Finance", color: "#F4B400", icon: "briefcase" },
  { id: "insurance", label: "Insurance", color: "#0F9D58", icon: "shield" },
  { id: "healthcare", label: "Healthcare", color: "#DB4437", icon: "heart" },
  { id: "tax", label: "Tax & Revenue", color: "#0F9D58", icon: "document" },
  { id: "municipal", label: "Municipal", color: "#F4B400", icon: "building" },
  { id: "legal", label: "Legal", color: "#DB4437", icon: "scale" },
  { id: "compliance", label: "Compliance", color: "#F4B400", icon: "scale" },
  { id: "tenders", label: "Tenders & Procurement", color: "#4285F4", icon: "briefcase" },
  { id: "business_services", label: "Business Services", color: "#4285F4", icon: "briefcase" },
  { id: "real_estate", label: "Housing & Real Estate", color: "#4285F4", icon: "home" },
  { id: "utilities_telecom", label: "Utilities & Telecom", color: "#F4B400", icon: "zap" },
  { id: "transport", label: "Transport & Logistics", color: "#0F9D58", icon: "truck" },
  { id: "immigration", label: "Immigration", color: "#0F9D58", icon: "globe" },
  { id: "employment", label: "Employment & HR", color: "#4285F4", icon: "briefcase" },
  { id: "education", label: "Education", color: "#4285F4", icon: "graduation" },
  { id: "registration_licensing", label: "Registration & Licensing", color: "#DB4437", icon: "document" },
  { id: "retail_commerce", label: "Retail & Commerce", color: "#F4B400", icon: "shopping" },
  { id: "construction", label: "Construction", color: "#F4B400", icon: "building" },
  { id: "manufacturing", label: "Manufacturing", color: "#4285F4", icon: "all" },
  { id: "agriculture", label: "Agriculture", color: "#0F9D58", icon: "leaf" },
  { id: "social_membership", label: "Social, NGO & Membership", color: "#DB4437", icon: "users" },
  { id: "travel_hospitality", label: "Travel & Hospitality", color: "#4285F4", icon: "globe" },
  { id: "environmental", label: "Environmental", color: "#0F9D58", icon: "leaf" },
];
