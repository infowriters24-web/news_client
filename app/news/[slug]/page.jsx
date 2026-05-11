import Image from "next/image";
import Link from "next/link";
import { base_url } from "@/config/config";
import ColumnCard from "@/components/ColomCard";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";

// ✅ Dynamic SEO metadata
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const res = await fetch(`${base_url}/api/news/news/${slug}`, {
      next: { revalidate: 5 },
    });

    if (!res.ok) return { title: "সংবাদ পাওয়া যায়নি" };

    const data = await res.json();
    const news = data.news || data;

    return {
      title: news?.title || "News Details",
      description: news?.description?.replace(/<[^>]*>/g, "").slice(0, 150),
      openGraph: { images: [news?.image] },
    };
  } catch {
    return { title: "সংবাদ পাওয়া যায়নি" };
  }
}

// ✅ স্লাগ অনুযায়ী সিঙ্গেল খবর আনার ফাংশন
async function getNews(slug) {
  try {
    const res = await fetch(`${base_url}/api/news/slug/${slug}`, {
      next: { revalidate: 5 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    // ডাটা যেই ফরম্যাটেই আসুক না কেনো, খবরের অংশটা বের করে নিচ্ছি
    return data.news || data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

// ✅ সাইডবারের জন্য সব খবর
async function getAllNews() {
  try {
    const res = await fetch(`${base_url}/api/all/news`, {
      next: { revalidate: 5 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    // হোম পেজের মতো করে ডাটা ফ্ল্যাট করা
    if (data.news && typeof data.news === "object") {
      return Object.values(data.news).flat();
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching all news:", error);
    return [];
  }
}

export default async function DetailsPage({ params }) {
  const { slug } = await params;

  const [news, allNews] = await Promise.all([getNews(slug), getAllNews()]);
  // খবর না পেলে error মেসেজ দেখানো
  if (!news) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-700">
          সংবাদ পাওয়া যায়নি
        </h1>
        <p className="text-gray-400 mt-2">
          এই সংবাদটি মুছে ফেলা হয়েছে বা বিদ্যমান নেই।
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-red-600 text-sm underline"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // সম্পর্কিত খবর ফিল্টার করা
  const relatedNews = allNews
    .filter((item) => item.category === news.category && item._id !== news._id)
    .slice(0, 5);

  // সর্বাধিক পঠিত খবর সাজানো
  const mostReadNews = [...allNews]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 5);

  // লেখকের নামের প্রথম অক্ষর
  const initials = news.writerName
    ? news.writerName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "NA";

  return (
    <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* বাম পাশে মূল কন্টেন্ট */}
        <div>
          <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 mb-6">
            {/* ক্যাটাগরি ব্যাজ */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-600 text-white text-xs px-2.5 py-0.5 rounded">
                {news.category || "অন্যান্য"}
              </span>
            </div>

            {/* টাইটেল */}
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed text-gray-900 mb-4">
              {news.title}
            </h1>

            {/* লেখক ও তারিখ */}
            <div className="flex items-start sm:items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    {news.writerName || "অজানা"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {news.date || new Date().toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
                  ফেসবুক
                </button>
              <CopyButton/>
              </div>
            </div>

            <hr className="border-gray-100 mb-4" />

            {/* ইমেজ */}
            {news.image && (
              <>
                <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    {" "}
                    {/* 16:9 aspect ratio */}
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mb-5">
                  ছবি: {news.sourceType}
                </p>
              </>
            )}
            {/* বিবরণ (ডিটেইলস) */}
            {news.description ? (
              <div
                className="text-sm leading-loose text-gray-800 break-words"
                dangerouslySetInnerHTML={{ __html: news.description }}
              />
            ) : (
              <p className="text-sm text-gray-500">
                বিস্তারিত তথ্য পাওয়া যাচ্ছে না।
              </p>
            )}

            <hr className="border-gray-100 my-4" />

            {/* কাউন্টার */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">
                পঠিত: <strong>{news.count || 0}</strong> বার
              </p>
             <ShareButton/>
            </div>
          </div>
        </div>

        {/* ডান পাশে সাইডবার */}
        <div className="flex flex-col gap-5">
          {/* সর্বাধিক পঠিত */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            {mostReadNews.length > 0 ? (
              <ColumnCard title="সর্বাধিক পঠিত" news={mostReadNews} />
            ) : (
              <p className="text-xs text-gray-400">কোনো সংবাদ নেই।</p>
            )}
          </div>

          {/* সম্পর্কিত সংবাদ */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            {relatedNews.length > 0 ? (
              <ColumnCard title="সম্পর্কিত সংবাদ" news={relatedNews} />
            ) : (
              <p className="text-xs text-gray-400">কোনো সম্পর্কিত সংবাদ নেই।</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
