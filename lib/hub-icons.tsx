import {
  FileText,
  BookOpen,
  LayoutGrid,
  BarChart3,
  CreditCard,
  GraduationCap,
  Globe,
  Truck,
  CalendarDays,
  Users,
  ClipboardCheck,
  MessageCircle,
  Circle,
  Layers,
  Building2,
  Briefcase,
  ShieldCheck,
  Heart,
  Scale,
  Home,
  Leaf,
  ShoppingBag,
  Zap,
  MoreHorizontal,
  Camera,
  type LucideProps,
} from "lucide-react";
import { cn } from "./utils";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  document: FileText,
  book: BookOpen,
  grid: LayoutGrid,
  chart: BarChart3,
  creditcard: CreditCard,
  graduation: GraduationCap,
  globe: Globe,
  truck: Truck,
  calendar: CalendarDays,
  users: Users,
  clipboard: ClipboardCheck,
  message: MessageCircle,
  circle: Circle,
  all: Layers,
  building: Building2,
  briefcase: Briefcase,
  shield: ShieldCheck,
  heart: Heart,
  scale: Scale,
  home: Home,
  leaf: Leaf,
  shopping: ShoppingBag,
  zap: Zap,
  more: MoreHorizontal,
  camera: Camera,
};

export function HubIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Icon = iconMap[name] || Circle;
  return <Icon className={cn("h-5 w-5", className)} style={style} />;
}
