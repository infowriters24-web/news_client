"use client";

import { useState } from "react";

export default function ShareButton({ title }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title || document.title,
      text: title || "এই সংবাদটি দেখুন",
      url: window.location.href,
    };

    try {
      // Native share
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        // fallback: copy link
        await navigator.clipboard.writeText(window.location.href);
      }

      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (error) {
      console.log("share cancelled / failed", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
    >
      {shared ? "শেয়ার হয়েছে ✅" : "শেয়ার করুন"}
    </button>
  );
}