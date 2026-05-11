export const CATEGORY_ROUTE_MAP = {
  national: "রাষ্ট্র ও নীতি",
  international: "ভূ-মণ্ডল",
  economy: "অর্থ-কড়ি",
  grassroots: "মেঠোপথ",
  sports: "স্কোরবোর্ড",
  education: "দীপ্তাঙ্গন",
  "spotlight-lifestyle": "শিল্প-শৈলী ও যত্ন",
  "information-technology": "যান্ত্রিক",
  religion: "উভয় জগত",
  canvas: "রাইটার্স-ক্যানভাস",
};
export const CATEGORY_NAV_ITEMS = Object.entries(CATEGORY_ROUTE_MAP).map(
  ([slug, label]) => ({
    slug,
    label,
  }),
);
export const getBanglaCategoryFromRoute = (routeCategory = "") => {
  const normalizedRoute = routeCategory.trim().toLowerCase();
  return CATEGORY_ROUTE_MAP[normalizedRoute] || routeCategory.trim();
};
