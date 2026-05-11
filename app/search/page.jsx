import Image from "next/image";
import Link from "next/link";
import { base_url } from "@/config/config";

const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

async function getAllNews() {
  try {
    const res = await fetch(`${base_url}/api/all/news`, {
      next: { revalidate: 5 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    if (data.news && typeof data.news === "object") {
      return Object.values(data.news).flat();
    }

    return Array.isArray(data.news) ? data.news : [];
  } catch {
    return [];
  }
}

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const query = String(q).trim();
  const allNews = query ? await getAllNews() : [];

  const normalizedQuery = query.toLowerCase();
  const results = query
    ? allNews.filter((item) => {
        const searchableText = [
          item?.title || "",
          item?.writerName || "",
          item?.category || "",
          stripHtml(item?.description || ""),
        ]
          .join(" ")
          .toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
    : [];

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-6 sm:py-8">
      <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
          সংবাদ অনুসন্ধান
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {query
            ? `“${query}” এর জন্য ${results.length}টি ফলাফল পাওয়া গেছে`
            : "কিছু খুঁজতে উপরের search bar-এ লিখে Enter চাপুন।"}
        </p>

        {query && results.length === 0 && (
          <div className="py-8 text-center text-gray-500 text-sm">
            কোনো মিল পাওয়া যায়নি।
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.slug}`}
                className="group block"
              >
                <article className="h-full flex flex-col sm:flex-row gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-lg transition">
                  <div className="relative w-full sm:w-36 h-48 sm:h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-red-600 mb-1">{item.category}</p>
                    <h2 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {stripHtml(item.description || "")}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
