/** Homepage category cover images (CDN-verified batch). */
export const HOME_CATEGORY_COVERS = {
  shoes: "img/products/7728857610.webp", // Travis Scott Dunk
  "t-shirts": "img/products/7727507379.webp", // Stussy tee
  hoodies: "img/products/7873717976.webp", // Bape Shark hoodie
  jackets: "img/products/7830221911.webp", // Supreme bomber
  pants: "img/products/7730149222.webp", // Chrome Hearts jeans
  headwear: "img/products/7726676779.webp", // Polo Ralph Lauren cap
  sets: "img/products/7870724027.webp", // Nike Tech Fleece set
  underwear: "img/products/7869936072.webp", // Chanel swimsuit
  jersey: "img/products/7726049915.webp", // Brazil jersey
  accessories: "img/products/7800286789.webp", // Coach Tabby bag
  other: "img/products/7869701612.webp", // AirPods Max
  all: "img/products/7758909715.webp", // Essentials set collection
};

/** Fallback demo catalog when kakobuysheetlink scripts are not loaded. */
export const FALLBACK_CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "shoes", label: "Shoes" },
  { slug: "hoodies", label: "Hoodies / Sweaters" },
  { slug: "t-shirts", label: "T-Shirts" },
  { slug: "pants", label: "Pants/Shorts" },
  { slug: "jackets", label: "Jackets" },
  { slug: "headwear", label: "Headwear" },
  { slug: "accessories", label: "Accessories" },
];

export const FALLBACK_PRODUCTS = [];

export const IMG_CDN = "https://cdn.jsdelivr.net/gh/qjy0126/kakobuysheetlink@main/";
export const IMG_LOCAL = "/kakobuysheetlink/";
export const OOPBUY_INVITE = "1W4CISK9G";
export const OOPBUY_REGISTER = `https://oopbuy.com/register?inviteCode=${OOPBUY_INVITE}`;

export function productImage(path, { prefer = "local" } = {}) {
  const s = String(path || "");
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  const clean = s.replace(/^\.\//, "").replace(/^\//, "");
  if (prefer === "cdn") return IMG_CDN + clean;
  return IMG_LOCAL + clean;
}

export function productImageCdn(path) {
  return productImage(path, { prefer: "cdn" });
}

/** Local first, fall back to CDN if the file is missing locally. */
export function productImageAttrs(path) {
  const local = productImage(path, { prefer: "local" });
  const cdn = productImage(path, { prefer: "cdn" });
  if (!local) return { src: "", onerror: "" };
  if (local === cdn || /^https?:\/\//i.test(String(path || ""))) {
    return { src: local, onerror: "" };
  }
  return {
    src: local,
    onerror: `this.onerror=null;this.src='${cdn.replace(/'/g, "\\'")}'`,
  };
}

export function getCategories() {
  const KF = window.KF;
  if (KF?.nav) {
    const seen = new Set();
    const list = [{ slug: "all", label: "All" }];
    [...(KF.nav.apparel || []), ...(KF.nav.lifestyle || [])].forEach((item) => {
      if (!item?.slug || seen.has(item.slug)) return;
      seen.add(item.slug);
      list.push({ slug: item.slug, label: item.label || item.slug });
    });
    return list;
  }
  return FALLBACK_CATEGORIES;
}

export function getProducts() {
  const KF = window.KF;
  if (KF?.products?.length) {
    if (typeof KF.applyExtraCategories === "function") KF.applyExtraCategories();
    return KF.products;
  }
  return FALLBACK_PRODUCTS;
}

export function buyUrl(product) {
  const KF = window.KF;
  if (KF?.invite) KF.invite.oopbuy = OOPBUY_INVITE;
  if (KF?.agentUrl && product?.sourceUrl) {
    return KF.agentUrl("oopbuy", product.sourceUrl);
  }
  return product?.sourceUrl || OOPBUY_REGISTER;
}

export function productDetailUrl(product) {
  const id = encodeURIComponent(String(product?.id || ""));
  return id ? `/product.html?id=${id}` : "/spreadsheet.html";
}

export function inCategory(product, slug) {
  if (!slug || slug === "all") return true;
  const KF = window.KF;
  if (typeof KF?.inCategory === "function") return KF.inCategory(product, slug);
  const cats = [product.category].concat(product.categories || []).filter(Boolean);
  return cats.includes(slug);
}

export function categoryLabel(slug, categories) {
  const match = categories.find((c) => c.slug === slug);
  return match?.label || slug;
}

export function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
