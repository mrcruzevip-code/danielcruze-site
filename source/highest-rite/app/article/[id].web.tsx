import { PublicPage, PUBLIC_ARTICLES } from "@/components/public-site.web";
export function generateStaticParams() { return PUBLIC_ARTICLES.map(a => ({id: a.id})); }
export default function Screen() { return <PublicPage kind="article" />; }
