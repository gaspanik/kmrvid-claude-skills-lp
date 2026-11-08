import { Compass, Eye, FileText, Layers } from '@lucide/astro'
import { type Category, githubFree, opt, req } from './skills'

/** figma-tidy-up の無料版（機能制限なし）の公開先 */
export const MUSE_TIDY_UP_FREE_URL =
  'https://github.com/gaspanik/muse-tidy-up-skill'

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
        deps: [opt('figma-tokenize')],
        lite: githubFree(MUSE_TIDY_UP_FREE_URL),
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
        deps: [opt('figma-layer-rename')],
      },
      {
        name: 'figma-componentize',
        desc: '繰り返し要素をコンポーネント/バリアント化する',
        en: 'Converts repeated elements into components and variants.',
        deps: [opt('figma-tokenize')],
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
        deps: [
          req(
            'figma-tidy-up',
            'figma-layer-rename',
            'figma-tokenize',
            'figma-componentize',
            'figma-enhance',
          ),
        ],
        depsNote: '選んだ工程に応じて呼び出されます',
        depsNoteEn: 'Calls only the steps you select.',
      },
      {
        name: 'figma-night-cruise',
        desc: 'figma-optimize を無人・予約実行する。質問は事前に一括で済ませ、夜間などに自動実行して完了レポートを返す（Muse版専用）',
        en: 'Runs figma-optimize unattended on a schedule. All questions are settled up front; it runs overnight and returns a completion report (Muse edition only).',
        deps: [req('figma-optimize')],
      },
      {
        name: 'figma-typescale',
        desc: 'DESIGN_BRIEF（基準サイズと比率）をもとに、タイプスケール（フォントサイズ変数）と余白スケールを生成する',
        en: 'Generates a type scale (font-size variables) and a spacing scale from a base size and ratio in a DESIGN_BRIEF.',
        deps: [opt('design-brief-me')],
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
        deps: [
          opt(
            'brief-me',
            'cognitive-ui-design',
            'figma-japanese-web-guideline',
          ),
        ],
      },
      {
        name: 'create-figma-pages',
        desc: 'create-figma-page を束ね、1つのFigmaファイルに複数ページ（レイアウト違い／ページ種別違い）を並列で作成する。基盤と決定事項は共有',
        en: 'Orchestrates create-figma-page: builds several pages (layout patterns or different page types) in one Figma file in parallel on shared foundations.',
        deps: [req('create-figma-page')],
      },
      {
        name: 'create-jp-lp',
        desc: '日本の商業LPを、ジャンル判定（世界観訴求型／直販型）と業種別の配色設計から Figma に新規作成する',
        en: 'Builds a Japanese commercial landing page in Figma, from genre judgment (brand-world vs. direct-sales) and industry-specific palette design.',
        deps: [opt('cognitive-ui-design', 'figma-japanese-web-guideline')],
      },
      {
        name: 'figma-mobile-convert',
        desc: 'デスクトップ版フレームから 390px のモバイル版を生成する。ナビは種別と項目数から判定',
        en: 'Generates a 390px mobile version from a desktop frame; the nav pattern is chosen from site type and item count.',
        deps: [opt('figma-optimize')],
        depsNote:
          '整備状況が不十分な場合は、先に figma-optimize を勧められます',
        depsNoteEn:
          'If the frame is not yet organized, it recommends running figma-optimize first.',
      },
      {
        name: 'hey-polish-me',
        desc: 'フレームを複製し、コピーを磨いた提案版を、変更理由の注釈つきで横に並べる（原本は無変更）',
        en: 'Duplicates a frame and builds a polished-copy proposal beside it, each change annotated with its reason (the original is untouched).',
        deps: [
          opt(
            'cognitive-ui-design',
            'create-figma-page',
            'rewrite-me',
            'create-jp-lp',
          ),
        ],
      },
      {
        name: 'rewrite-me',
        desc: 'BRIEFに沿ってFigmaフレーム内のコピー（見出し・本文・CTA）を書き換える',
        en: 'Rewrites the copy (headings, body, CTAs) inside a Figma frame to match a BRIEF.',
        deps: [opt('brief-me', 'figma-layer-rename')],
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
      {
        name: 'design-brief-me',
        desc: '制作前にデザイン設定（タイポグラフィ等）のヒアリングを行い、DESIGN_BRIEF を作成する',
        en: 'A design-settings interview (typography and more) that produces a DESIGN_BRIEF before design work begins.',
      },
      {
        name: 'hey-brief-me',
        desc: 'brief-me と design-brief-me の入口。必要な方（両方も可）を選んで実行する',
        en: 'An entry point for brief-me and design-brief-me: pick one or both to run.',
        deps: [req('brief-me', 'design-brief-me')],
      },
    ],
  },
]

export const museSkills = museCategories.flatMap((category) => category.skills)

export const museSkillsCount = museSkills.length

/** 実機（Muse + Figma コネクタ）での動作確認日 */
export const MUSE_VERIFIED_ON = { ja: '2026年10月29日', en: 'October 29, 2026' }

/** 使い方の紹介動画（2026-10-28 公開）と、YouTube の解説プレイリスト（Figma Skills 用。実行内容は共通、呼び出し方だけ Muse と異なる） */
export const MUSE_DEMO_URL = 'https://youtu.be/JPPOy0U4qL4'
export const MUSE_PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLJ_bPOBVpGbI'

/** 解説動画（講座内と YouTube で公開。動画は日本語、英語は字幕） */
export const MUSE_VIDEOS = [
  {
    url: 'https://youtu.be/kDwd1b0H5rw',
    ja: 'Museスキルの紹介とインストール',
    en: 'Introduction to the Muse skills and how to install them',
  },
  {
    url: 'https://youtu.be/fOyvw9n6Aws',
    ja: 'スキルの使い方。figma-tidy-up を実行してみよう',
    en: 'How to use a skill: running figma-tidy-up',
  },
  {
    url: 'https://youtu.be/cjVb3EDQW88',
    ja: '複数スキルの連続実行。5ページを並列で生成する',
    en: 'Running several skills in a row: generating 5 pages in parallel',
  },
]
