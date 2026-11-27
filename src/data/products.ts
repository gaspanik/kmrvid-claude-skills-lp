import { desktopSkillsCount } from './desktop'
import { museSkillsCount } from './muse'
import { claudeSkillsCount, figmaSkillsCount, totalSkills } from './skills'

export type ProductKey = 'bundle' | 'claude' | 'figma' | 'muse' | 'desktop'

/**
 * 期間限定の価格。`endsAt` を過ぎると、ブラウザ側で `product.price` の表示に切り替わる。
 * 切り替え後の整理として、該当の `campaign` を削除して再デプロイする。
 * - `launch`: 発売記念価格（終了後は通常価格）
 * - `increase`: 値上げ前の価格（終了後は改定後の価格。`product.price` が改定後）
 */
interface Campaign {
  kind: 'launch' | 'increase'
  /** 期間中の価格（税込・円） */
  price: number
  /** 終了日時（ISO 8601、JST）。新価格の開始時刻でもある */
  endsAt: string
  /** 表示用の終了日時 */
  endsAtLabel: string
  /** 表示用の終了日時（短縮形。バッジ用） */
  endsAtShort: string
}

/** 海外版（Gumroad・USD）の販売情報。動画は付属しない（スキルのみ） */
interface EnMarket {
  name: string
  /** このLP内のパス */
  href: string
  /** Gumroad の商品ページ */
  url: string
  /** 価格（USD）。`priceUsdBefore` があるときは、キャンペーン終了後の価格 */
  priceUsd: number
  /** キャンペーン終了前の価格（USD）。終了後は `priceUsd` に切り替わる */
  priceUsdBefore?: number
}

interface Product {
  name: string
  /** 環境（ヒーロー等のラベル用） */
  env: string
  /** このLP内のパス */
  href: string
  /** kmrvid.com の商品ページ */
  url: string
  /** 税込・買い切り（円） */
  price: number
  skills: number
  videos: number
  hours: number
  minutes: number
  campaign?: Campaign
  /** 海外版（Gumroad）の販売情報 */
  en: EnMarket
}

/** 動画本数・総再生時間の集計日 */
export const STATS_AS_OF = '2026年9月20日'

export const products: Record<ProductKey, Product> = {
  bundle: {
    name: 'KMRVID Skills - All-in-One Bundle',
    env: 'Claude Code + Figma Design Agent',
    href: '/bundle/',
    url: 'https://kmrvid.com/products/kmrvid-skills-bundle',
    price: 35200,
    skills: totalSkills,
    videos: 60,
    hours: 6,
    minutes: 5,
    en: {
      name: 'KMRVID Skills Bundle',
      href: '/en/bundle/',
      url: 'https://gaspanik.gumroad.com/l/kmrvid-bundle',
      priceUsd: 229,
    },
  },
  claude: {
    name: 'KMRVID Claude Skills',
    env: 'Claude Code',
    href: '/claude',
    url: 'https://kmrvid.com/products/kmrvid-claude-skills',
    price: 25300,
    skills: claudeSkillsCount,
    videos: 40,
    hours: 4,
    minutes: 10,
    en: {
      name: 'KMRVID Claude Skills',
      href: '/en/claude/',
      url: 'https://gaspanik.gumroad.com/l/kmrvid-claudeskills',
      priceUsd: 149,
    },
  },
  figma: {
    name: 'KMRVID Figma Skills',
    env: 'Figma Design Agent',
    href: '/figma',
    url: 'https://kmrvid.com/products/kmrvid-figma-skills',
    price: 19800,
    skills: figmaSkillsCount,
    videos: 20,
    hours: 1,
    minutes: 55,
    en: {
      name: 'KMRVID Figma Skills',
      href: '/en/figma/',
      url: 'https://gaspanik.gumroad.com/l/kmrvid-figmaskills',
      priceUsd: 129,
    },
  },
  // Claude版・Figma版・Bundle には特典として同梱。動画は付属しない（講座内の解説動画3本は YouTube でも公開）
  muse: {
    name: 'KMRVID Muse Skills',
    env: 'Muse',
    href: '/muse',
    url: 'https://kmrvid.com/products/kmrvid-muse-skills',
    price: 15400,
    skills: museSkillsCount,
    videos: 0,
    hours: 0,
    minutes: 0,
    en: {
      name: 'KMRVID Muse Skills',
      href: '/en/muse/',
      url: 'https://gaspanik.gumroad.com/l/kmrvid-museskills',
      priceUsd: 97,
    },
  },
  // Claude Desktop のチャット用。Muse版とほぼ同じスキルを、プラグイン形式（リファレンス同梱）で配布する
  desktop: {
    name: 'KMRVID CDC Skills',
    env: 'Claude Desktop',
    href: '/desktop/',
    url: 'https://kmrvid.com/products/kmrvid-cdc-skills',
    price: 15400,
    skills: desktopSkillsCount,
    videos: 0,
    hours: 0,
    minutes: 0,
    en: {
      name: 'KMRVID CDC Skills',
      href: '/en/desktop/',
      url: 'https://gaspanik.gumroad.com/l/kmrvid-cdcskills',
      priceUsd: 97,
    },
  },
}

/** 開催中のキャンペーンの終了日時（Layoutが終了後の表示切り替えに使う） */
export const campaignEndsAt = Object.values(products).find(
  (product) => product.campaign,
)?.campaign?.endsAt

/** Figma Community の著者プロフィール（無料版・機能限定版のスキルを公開している） */
export const FIGMA_COMMUNITY_URL = 'https://www.figma.com/@masaakikomori'

/** Claude Code版の一部スキルを単体販売しているクリエイターページ（Figma版は掲載なし） */
export const AGENSI_URL = 'https://www.agensi.io/creators/masaaki-komori'

/** kmrvid.com のお問い合わせフォーム */
export const CONTACT_URL = 'https://kmrvid.com/pages/contact'

export const BUNDLE_LICENSE_PACK = {
  url: 'https://kmrvid.com/products/kmrvid-all-in-one-bundle-5%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9%E3%83%91%E3%83%83%E3%82%AF',
  noticeUrl: 'https://kmrvid.com/blogs/news/kmrvid-license-pack-20261120',
}

/** 価格改定・キャンペーン終了の翌日（新価格の開始日）の表示 */
export const NEW_PRICE_FROM = '11/28（土）'
export const NEW_PRICE_FROM_EN = 'November 28, 2026 (JST)'

export const formatYen = (price: number) => price.toLocaleString('ja-JP')

export const formatDuration = ({ hours, minutes }: Product) =>
  `約${hours}時間${minutes}分`

/** Claude版 + Figma版を個別に買う場合との差額（改定後の価格ベース） */
export const bundleSaving =
  products.claude.price + products.figma.price - products.bundle.price

/** 同・改定前の価格ベース（2026-11-28 0:00 JST まで。`campaign.price` が旧価格） */
export const bundleSavingBefore =
  (products.claude.campaign?.price ?? products.claude.price) +
  (products.figma.campaign?.price ?? products.figma.price) -
  (products.bundle.campaign?.price ?? products.bundle.price)

export const formatUsd = (price: number) => `$${price}`

/** 海外版で Claude版 + Figma版を個別に買う場合の合計（USD、改定後） */
export const individualTotalUsd =
  products.claude.en.priceUsd + products.figma.en.priceUsd

/** 同・改定前の価格ベース（`priceUsdBefore` が旧価格） */
export const individualTotalUsdBefore =
  (products.claude.en.priceUsdBefore ?? products.claude.en.priceUsd) +
  (products.figma.en.priceUsdBefore ?? products.figma.en.priceUsd)

/** 海外版で Claude版 + Figma版を個別に買う場合との差額（USD、改定後） */
export const bundleSavingUsd = individualTotalUsd - products.bundle.en.priceUsd

/** 同・改定前の価格ベース */
export const bundleSavingUsdBefore =
  individualTotalUsdBefore -
  (products.bundle.en.priceUsdBefore ?? products.bundle.en.priceUsd)
