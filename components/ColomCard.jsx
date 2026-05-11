"use client";

import Image from "next/image";
import Link from "next/link";
import TitleReuse from "@/components/Titlereuse";

const ColumnCard = ({ variant = "default", title = "সর্বাধিক পঠিত", news = [] }) => {

  const isFull = variant === "full";
  if (!Array.isArray(news) || news.length === 0) {
    return null;
  }

  return (
    <div>
      {!isFull && <TitleReuse title={title} />}

      <div
        className={
          isFull
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            : "flex flex-col gap-2"
        }
      >
        {news.map((item) => (
          <Link href={`/news/${item.slug}`} key={item._id} className="group">

            <article className="flex gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:shadow-xl transition">
              <div className="relative w-24 h-20 sm:w-28 sm:h-20 overflow-hidden rounded flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 250px"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold line-clamp-2">
                  {item.title}
                </h3>
              </div>

            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ColumnCard;