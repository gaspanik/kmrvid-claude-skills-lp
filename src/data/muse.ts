import { Compass, Eye, FileText, Layers } from '@lucide/astro'
import type { Category } from './skills'

/**
 * KMRVID Muse Skills（単体販売）の収録スキル。
 * Claude版・Figma版・Bundle には特典として同梱されているため、`skills.ts` の集計（全スキル数）には含めない。
 */
export const museCategories: Category[] = [
  {
    icon: Layers,
    product: 'muse',
    name: '最適化パイプライン',
    nameEn: 'Optimization pipeline',
    tagline: 'ファイルの構造を、依存順に整える',
    taglineEn: 'Structure a file, in dependency order',
    skills: [
      {
        name: 'figma-tidy-up',
        desc: 'フレームをオートレイアウト化し、構造を整える',
        en: 'Converts frames to auto layout and structures the tree.',
      },
      {
        name: 'figma-layer-rename',
        desc: '自動生成レイヤー名を、コード化しやすい命名（ケバブケース等）に書き換える',
        en: 'Rewrites auto-generated layer names into code-friendly conventions (kebab-case, etc.).',
      },
      {
        name: 'figma-tokenize',
        desc: '色・文字サイズ・余白を変数化し、テキストスタイルを生成する',
        en: 'Turns colors, font sizes and spacing into variables; generates text styles.',
      },
      {
        name: 'figma-componentize',
        desc: '繰り返し要素をコンポーネント/バリアント化する',
        en: 'Converts repeated elements into components and variants.',
      },
      {
        name: 'figma-enhance',
        desc: '構造化済みファイルの追加改善（プロパティ追加、束縛漏れ等）を監査・実装する',
        en: 'Audits an already structured file for further improvements (missing properties, unbound values) and applies them.',
      },
      {
        name: 'figma-optimize',
        desc: '上記を依存順に実行する統合スキル（実行する工程は選択式）',
        en: 'Runs the pipeline above in dependency order; you choose which steps to run.',
      },
    ],
  },
  {
    icon: Eye,
    product: 'muse',
    name: '単独スキル',
    nameEn: 'Standalone skills',
    tagline: '監査・翻訳・ページ生成・コピーの書き直し',
    taglineEn: 'Audit, translate, generate pages and rewrite copy',
    skills: [
      {
        name: 'figma-audit',
        desc: 'デザインを4観点で採点する読み取り専用の監査',
        en: 'A read-only audit that scores a design across 4 dimensions.',
      },
      {
        name: 'figma-contrast-check',
        desc: 'WCAG基準のコントラストチェック',
        en: 'WCAG contrast checks.',
      },
      {
        name: 'figma-alt-suggest',
        desc: 'フレーム内の画像を実際に見て代替テキストの要否を判定し、提案をAccessibility注釈として書き込む',
        en: 'Looks at each image in a frame, judges whether it needs alt text, and writes proposals as Accessibility annotations.',
      },
      {
        name: 'figma-i18n-translator',
        desc: 'フレームを複製し、テキストを指定した言語に翻訳した多言語版を作る（原本は無変更）',
        en: 'Duplicates a frame and translates its texts into the language you specify (the original is left untouched).',
      },
      {
        name: 'create-figma-page',
        desc: 'ブリーフからページを新規作成する（Figma AIクレジット不使用）。単一ページにも、構造の異なる複数パターンにも対応',
        en: 'Creates a new page from a brief, single or several structurally different patterns. No Figma AI credits used.',
      },
      {
        name: 'rewrite-me',
        desc: 'BRIEFに沿ってFigmaフレーム内のコピー（見出し・本文・CTA）を書き換える',
        en: 'Rewrites the copy (headings, body, CTAs) inside a Figma frame to match a BRIEF.',
      },
    ],
  },
  {
    icon: Compass,
    product: 'muse',
    name: '補助ガイドライン',
    nameEn: 'Guidelines',
    tagline: '他のスキルが参照する、設計と日本語組版の指針',
    taglineEn: 'Design and typography guidance other skills draw on',
    skills: [
      {
        name: 'cognitive-ui-design',
        desc: '視線誘導・認知バイアス対策などのUI/UX設計指針。複数パターンの生成では、各案の切り口を5点で宣言して作り分ける',
        en: 'UI/UX design guidance: reading patterns and cognitive-bias countermeasures. In multi-pattern runs each candidate is declared on five points so they do not converge.',
      },
      {
        name: 'figma-japanese-web-guideline',
        desc: '日本語Webのタイポグラフィ/レイアウト指針（Figma版）',
        en: 'Japanese web typography and layout guidance (Figma edition).',
      },
    ],
  },
  {
    icon: FileText,
    product: 'muse',
    name: 'テキスト系',
    nameEn: 'Text only',
    tagline: 'Figmaへの書き込みなし',
    taglineEn: 'No Figma writes',
    skills: [
      {
        name: 'brief-me',
        desc: '制作前の要件ヒアリングを行い、BRIEF.mdを作成する',
        en: 'A requirements interview that produces a BRIEF.md before production starts.',
      },
    ],
  },
]

export const museSkills = museCategories.flatMap((category) => category.skills)

export const museSkillsCount = museSkills.length

/** 実機（Muse + Figma コネクタ）での動作確認日 */
export const MUSE_VERIFIED_ON = { ja: '2026年10月29日', en: 'October 29, 2026' }

/** 使い方の紹介動画（2026-10-28 公開）と、YouTube の解説プレイリスト */
export const MUSE_DEMO_URL = 'https://youtu.be/JPPOy0U4qL4'
export const MUSE_PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLJ_bPOBVpGbI'
