'use client'

import { useState } from "react";

function CopyButton() {
const [copied, setCopied] = useState(false);
const handCopy =async ()=>{
const url = window.location.href;
try {
  
   if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
   } else {
    const textArea = document.createElement("textArea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    
   }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
} catch (error) {
    console.log("copy failed", error)
}
}
  return (
    <div>
      <button
      onClick={handCopy}
      className="text-xs px-3 py-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50"
    >
      {copied ? "কপি হয়েছে ✅" : "কপি লিংক"}
    </button>
    </div>
  )
}

export default CopyButton
