/** ハンズオンセッション（日本語・Zoom）の告知。`endsAt` を過ぎたらLPの告知帯を自動で隠す */
export interface HandsOn {
  /** 告知記事（kmrvid.com） */
  url: string
  dateLabel: string
  capacity: number
  /** 終了時刻（JST） */
  endsAt: string
}

/** Figma版のハンズオンセッション。Muse版は `muse.ts` の `MUSE_HANDSON` */
export const FIGMA_HANDSON: HandsOn = {
  url: 'https://kmrvid.com/blogs/news/figma-skill-handson-session-20261119',
  dateLabel: '11月19日(木) 20:00〜22:00',
  capacity: 10,
  endsAt: '2026-11-19T22:00:00+09:00',
}
