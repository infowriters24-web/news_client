"use client";

import { useMemo, useState } from "react";
import ColumnCard from "@/components/ColomCard";

const ITEMS_PER_PAGE = 20;

export default function HomeNewsPagination({ news = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(news.length / ITEMS_PER_PAGE));

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return news.slice(start, start + ITEMS_PER_PAGE);
  }, [news, currentPage]);

  if (!news.length) {
    return <p className="text-sm text-gray-500">এই মুহূর্তে কোনো সংবাদ নেই।</p>;
  }

  return (
    <div>
      <ColumnCard variant="full" news={paginatedNews} />

      {news.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← আগে
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 text-sm border rounded-md transition ${
                currentPage === page
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            পরে →
          </button>
        </div>
      )}
    </div>
  );
}
