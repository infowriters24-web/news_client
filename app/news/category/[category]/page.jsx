import CategoryClient from "./CategoryClient";
import { base_url } from "@/config/config";
import { getBanglaCategoryFromRoute } from "@/lib/categoryRoutes";

async function getCategoryNews(category) {
  try {
    const res = await fetch(
      `${base_url}/api/news/category/${encodeURIComponent(category)}`,
      { next: { revalidate: 5 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.news || [];
  } catch {
    return [];
  }
}

export default async function CategoryPage({ params }) {
  
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category).trim();
  const resolvedCategory = getBanglaCategoryFromRoute(decodedCategory);
  const news = await getCategoryNews(resolvedCategory);

  return <CategoryClient news={news} category={resolvedCategory} />;
}