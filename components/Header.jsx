"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { CATEGORY_NAV_ITEMS } from "@/lib/categoryRoutes";
const navItems = [
  { label: "হোম", href: "/" },
  ...CATEGORY_NAV_ITEMS.map((item) => ({
    label: item.label,
    href: `/news/category/${item.slug}`,
  })),
];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentTime(now.toLocaleDateString("bn-BD", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchText.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 px-4 flex items-center justify-between border-b border-gray-700">
        <span className="font-noto-bengali truncate max-w-[70vw] sm:max-w-none">
          {currentTime}
        </span>
        <div className="flex items-center gap-3">
          {/* Social Icons */}
          <a
            href="https://www.facebook.com/writers24bd"
            aria-label="Facebook"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@writers24.net-bd"
            aria-label="YouTube"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
              <polygon
                fill="white"
                points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/writers24.net.bd?igsh=MWwyaDV0a285enpsNQ=="
            aria-label="Instagram"
            className="hover:text-white transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      {/* ===== LOGO BAR ===== */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Hamburger (mobile) */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-px bg-gray-700 mb-1.5"></div>
            <div className="w-5 h-px bg-gray-700 mb-1.5"></div>
            <div className="w-5 h-px bg-gray-700"></div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 select-none">
            <span className="text-3xl font-black tracking-tight leading-none">
              <Image
                src={logo}
                alt=" Logo"
                width={50}
                height={44}
                className="object-contain"
              />
            </span>
          </Link>

          {/* Right actions */}
         
        </div>
      </header>

      {/* ===== STICKY NAV ===== */}
      <nav
        className={`bg-white border border-b sticky top-0 z-50 transition-shadow ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        {/* Desktop nav */}
        <div className="max-w-screen-xl mx-auto px-4 hidden lg:flex items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-3.5 text-sm font-noto-bengali text-gray-900 hover:text-white hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>

              {/* Dropdown */}
              {item.submenu && activeDropdown === item.label && (
                <div className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-red-600 min-w-40 z-50 py-1">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 font-noto-bengali transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Spacer + search in nav */}
          <form onSubmit={handleSearchSubmit} className="ml-auto py-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="সংবাদ খুঁজুন..."
                className="w-52 xl:w-64 h-9 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="h-9 px-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                aria-label="Search news"
              >
                খুঁজুন
              </button>
              <button
                type="submit"
                className="h-9 w-9 rounded-md border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 transition-colors flex items-center justify-center"
                aria-label="Search icon button"
              >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-900 border-t border-gray-700 max-h-[calc(100vh-130px)] overflow-y-auto">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="সংবাদ খুঁজুন..."
                  className="flex-1 h-10 rounded-md border border-gray-700 bg-gray-800 text-gray-100 px-3 text-sm outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="h-10 px-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  খুঁজুন
                </button>
              </div>
            </form>
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-5 py-3 text-sm font-noto-bengali text-gray-200 hover:bg-red-600 hover:text-white border-b border-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="bg-gray-800">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={`/news/${sub.href}`}
                        className="block pl-10 pr-5 py-2.5 text-xs text-gray-400 hover:text-white font-noto-bengali border-b border-gray-700 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        ↳ {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Ticker animation keyframe — inject via style tag */}
      <style>{`
        @keyframes slideInTicker {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .font-noto-bengali {
          font-family: 'Noto Serif Bengali', 'SolaimanLipi', serif;
        }
      `}</style>
    </>
  );
}
