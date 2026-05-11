"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ITEMS_PER_PAGE = 20;

export default function CategoryClient({ news, category }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="bg-white border border-gray-100 rounded-xl p-5">

        {/* Title */}
        <h1 className="text-lg sm:text-xl font-bold border-l-4 border-red-600 pl-3 mb-6">
          {category}
        </h1>

        {news.length > 0 ? (
          <>
            {/* News Grid — Column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
              {currentNews.map((item) => (
                <Link
                  href={`/news/${item.slug}`}
                  key={item._id}
                  className="group"
                >
                  <article className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 border border-gray-100 rounded-xl hover:shadow-md transition bg-white">
                    {/* Image */}
                    <div className="relative w-full sm:w-32 h-48 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 128px"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-xs text-white bg-red-600 px-2 py-0.5 rounded mb-2 inline-block">
                          {item.category}
                        </span>
                        <h2 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{item.writerName}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← আগে
                </button>

                {/* Page numbers */}
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

                {/* Next */}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  পরে →
                </button>
              </div>
            )}

            {/* Page info */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-400 mt-3">
                পৃষ্ঠা {currentPage} / {totalPages} — মোট {news.length}টি সংবাদ
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-400 text-sm">এই বিভাগে কোনো সংবাদ নেই।</p>
        )}
      </div>
    </div>
  );
}