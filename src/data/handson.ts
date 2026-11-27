/** ハンズオンセッション（日本語・Zoom）の告知。`endsAt` を過ぎたらLPの告知帯を自動で隠す */
export interface HandsOn {
  /** 告知記事（kmrvid.com） */
  url: string
  dateLabel: string
  capacity: number
  /** 終了時刻（JST） */
  endsAt: string
}
