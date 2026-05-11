import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { CATEGORY_NAV_ITEMS } from "@/lib/categoryRoutes";

const footerCategories = CATEGORY_NAV_ITEMS.map((item) => ({
  label: item.label,
  href: `/news/category/${item.slug}`,
}));

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Top red bar */}
      <div className="h-1 bg-red-600 w-full" />

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo + About */}
          <div>
            <div className="mb-4">
              <Image
                src={logo}
                alt="Writers Logo"
                width={100}
                height={40}
                className="object-contain brightness-200"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              সত্য, নিরপেক্ষ ও দায়িত্বশীল সাংবাদিকতার প্রতিশ্রুতি নিয়ে আমরা কাজ করি। পাঠকের আস্থাই আমাদের শক্তি।
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/writers24bd" aria-label="Facebook" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@writers24.net-bd" aria-label="YouTube" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              <a href="https://www.instagram.com/writers24.net.bd?igsh=MWwyaDV0a285enpsNQ==" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-sm border-l-2 border-red-600 pl-2 mb-4">
              বিভাগসমূহ
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {footerCategories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition flex items-center gap-1"
                  >
                    <span className="text-red-600">›</span> {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          {/* <div>
            <h3 className="text-white font-bold text-sm border-l-2 border-red-600 pl-2 mb-4">
              প্রতিষ্ঠান
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "আমাদের সম্পর্কে", href: "/about" },
                { label: "যোগাযোগ", href: "/contact" },
                { label: "বিজ্ঞাপন", href: "/advertise" },
                { label: "গোপনীয়তা নীতি", href: "/privacy" },
                { label: "ব্যবহারের শর্তাবলী", href: "/terms" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-red-400 transition flex items-center gap-1"
                  >
                    <span className="text-red-600">›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Writers. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="text-xs text-gray-600">
            Developed by Biswas
          </p>
        </div>
      </div>
    </footer>
  );
}