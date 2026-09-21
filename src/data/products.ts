import { claudeSkillsCount, figmaSkillsCount, totalSkills } from './skills'

export type ProductKey = 'bundle' | 'claude' | 'figma'

/** 期間限定の特別価格。キャンペーン終了後は該当の `campaign` を削除すれば全ページが通常価格に戻る */
interface Campaign {
  /** 特別価格（税込・円） */
  price: number
  /** 終了日時（ISO 8601、JST） */
  endsAt: string
  /** 表示用の終了日時 */
  endsAtLabel: string
  /** 表示用の終了日時（短縮形。バッジ用） */
  endsAtShort: string
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
}

/** 動画本数・総再生時間の集計日 */
export const STATS_AS_OF = '2026年9月20日'

export const products: Record<ProductKey, Product> = {
  bundle: {
    name: 'KMRVID Skills - All-in-One Bundle',
    env: 'Claude Code + Figma Design Agent',
    href: '/',
    url: 'https://kmrvid.com/products/kmrvid-skills-bundle',
    price: 29800,
    skills: totalSkills,
    videos: 60,
    hours: 6,
    minutes: 5,
  },
  claude: {
    name: 'KMRVID Claude Skills',
    env: 'Claude Code',
    href: '/claude',
    url: 'https://kmrvid.com/products/kmrvid-claude-skills',
    price: 19800,
    skills: claudeSkillsCount,
    videos: 40,
    hours: 4,
    minutes: 10,
    // 発売記念価格キャンペーン（Claude版のみ）
    campaign: {
      price: 15400,
      endsAt: '2026-09-23T23:59:00+09:00',
      endsAtLabel: '2026年9月23日（水）23:59',
      endsAtShort: '9/23（水）23:59',
    },
  },
  figma: {
    name: 'KMRVID Figma Skills',
    env: 'Figma Design Agent',
    href: '/figma',
    url: 'https://kmrvid.com/products/kmrvid-figma-skills',
    price: 15400,
    skills: figmaSkillsCount,
    videos: 20,
    hours: 1,
    minutes: 55,
  },
}

/** 開催中のキャンペーンの終了日時（Layoutが終了後の表示切り替えに使う） */
export const campaignEndsAt = Object.values(products).find(
  (product) => product.campaign,
)?.campaign?.endsAt

export const formatYen = (price: number) => price.toLocaleString('ja-JP')

export const formatDuration = ({ hours, minutes }: Product) =>
  `約${hours}時間${minutes}分`

/** Claude版 + Figma版を個別に買う場合との差額 */
export const bundleSaving =
  products.claude.price + products.figma.price - products.bundle.price
