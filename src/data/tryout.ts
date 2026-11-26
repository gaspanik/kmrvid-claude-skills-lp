/**
 * お試し版（KMRVID Tryout Skills）の販売情報。
 * フル版の商品（`products.ts`）とは別扱いで、スキル総数には含めない。
 * アップデートは提供しないため、更新履歴の対象外。
 */
export const tryout = {
  name: 'KMRVID Tryout Skills',
  /** 税込・買い切り（円） */
  price: 5500,
  priceUsd: 35,
  skills: 3,
  editions: 4,
  href: '/tryout/',
  hrefEn: '/en/tryout/',
  url: 'https://kmrvid.com/products/kmrvid-tryout-skills',
  urlEn: 'https://gaspanik.gumroad.com/l/kmrvid-tryoutskills',
  noticeUrl:
    'https://kmrvid.com/blogs/news/kmrvid-tryout-skills-release-20261126',
  /** 使い方の動画（日本語） */
  videoUrl: 'https://www.youtube.com/watch?v=723hlzuyNGg',
} as const

export const tryoutFiles = tryout.skills * tryout.editions
