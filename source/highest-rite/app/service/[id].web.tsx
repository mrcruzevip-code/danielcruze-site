import { PublicPage } from "@/components/public-site.web";
import { SERVICES } from "@/lib/content";
export function generateStaticParams() { return SERVICES.map(s => ({id: s.id})); }
export default function Screen() { return <PublicPage kind="boundary" />; }
