"use client";

import Image from "next/image";
import Link from "next/link";

const Card = ({ variant = "large", data = [] }) => {
  const isLarge = variant === "large";
  const items = (isLarge ? [data?.[0]] : data?.slice(0, 3)).filter(Boolean);

  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <Link
          key={item._id}
          href={`/news/${item.slug}`}
          className="block group"
        >
          <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition">
            <div
              className={`relative w-full ${
                isLarge ? "aspect-[16/9] bg-gray-100" : "h-44 sm:h-52"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={isLarge ? "object-contain" : "object-cover"}
                sizes={
                  isLarge
                    ? "(max-width: 1024px) 100vw, 1200px"
                    : "(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                }
                loading={isLarge ? "eager" : "lazy"}
              />
            </div>
            <div className="p-3 sm:p-4">
              <h3
                className={`font-bold line-clamp-2 ${isLarge ? "text-lg sm:text-xl" : "text-sm sm:text-base"}`}
              >
                {item.title}
              </h3>
            </div>
          </article>
        </Link>
      ))}
    </>
  );
};

export default Card;
