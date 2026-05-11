// components/TitleReuse.jsx
'use client'

const TitleReuse = ({ title, variant = "default" }) => {
  const isLarge = variant === "large";
  
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-red-600 rounded-full"></div>
        <h2 className={`
          font-bold text-gray-900
          ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}
        `}>
          {title}
        </h2>
      </div>
      <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-red-600 to-transparent"></div>
    </div>
  );
};

export default TitleReuse;