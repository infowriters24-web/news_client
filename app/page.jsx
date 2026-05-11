import Card from "@/components/Card";
import ColumnCard from "@/components/ColomCard";
import HomeNewsPagination from "@/components/HomeNewsPagination";
import TitleReuse from "@/components/Titlereuse";
import { base_url } from "@/config/config";

export default async function Home() {

  let news_data = { news: {} };
  try {
    const res = await fetch(`${base_url}/api/all/news`, {
      next: { revalidate: 5 },
    });
    if (res.ok) {
      news_data = await res.json();
    }
  } catch {
    news_data = { news: {} };
  }
  // 🔥 সব news flatten (latest section এর জন্য)
  const allNews = Object.values(news_data.news || {}).flat();
  const mostReadNews = [...allNews]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 5);

  return (
    <main className="max-w-7xl mx-auto px-4 py-5 sm:py-8">

      {/* 🔥 Latest */}
      <section className="mb-12">
        <TitleReuse title="সর্বশেষ সংবাদ" />
        <div className="mt-5 sm:mt-6">
          <Card variant="large" data={allNews} />
        </div>
      </section>

      {/* 🔥 Most Read */}
      <section className="mb-12">
        <ColumnCard title="সর্বাধিক পঠিত" news={mostReadNews} />
      </section>

      {/* 🔥 Bottom */}
      <section>
        <TitleReuse title="আরও সংবাদ" />
        <HomeNewsPagination news={allNews} />
      </section>
    </main>
  );
}