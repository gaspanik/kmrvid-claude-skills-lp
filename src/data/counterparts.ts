/**
 * Claude版とFigma版で、同名または対応関係にあるスキル。
 * 違いの基本: Claude版は Figma URL を渡して Figma MCP 経由で動作、
 * Figma版はキャンバス上の選択ノードに対して Plugin API で動作する。
 */
export interface Counterpart {
  claude: string
  figma: string
  /** 補足（日本語 / 英語）。基本の違い以外にあるものだけ */
  ja?: string
  en?: string
}

export const counterparts: Counterpart[] = [
  { claude: 'brief-me', figma: 'brief-me' },
  { claude: 'rewrite-me', figma: 'rewrite-me' },
  {
    claude: 'create-jp-lp',
    figma: 'create-jp-lp',
    ja: 'Claude Code版は見出しを画像に焼き込めません（ライブテキスト＋スクリムで代替）。文字入り見出し画像が必要な場合はFigma版を使います。',
    en: 'The Claude Code edition cannot bake headings into images; it uses live text with a scrim instead. Use the Figma edition when you need headings baked into an image.',
  },
  { claude: 'japanese-lp-seasoning', figma: 'japanese-lp-seasoning' },
  {
    claude: 'japanese-web-guideline',
    figma: 'figma-japanese-web-guideline',
    ja: 'Claude版は実装コードの補正、Figma版はデザイン生成・レビュー時の判断基準です。',
    en: 'The Claude edition corrects the implementation; the Figma edition is the reference while generating and reviewing designs.',
  },
  {
    claude: 'mobile-polish',
    figma: 'figma-mobile-convert',
    ja: 'Claude版は実装済みコードにモバイル対応を追加、Figma版はデスクトップ幅のフレームからモバイル版（390px）を生成します。',
    en: 'The Claude edition adds mobile support to implemented code; the Figma edition generates a 390px mobile frame from a desktop frame.',
  },
  {
    claude: 'polish-me',
    figma: 'hey-polish-me',
    ja: 'どちらも原本を編集せずに改善案を出します。Claude版は稼働中のページを測定、Figma版はフレームを分析します。',
    en: 'Both propose improvements without editing the original. The Claude edition measures the running page; the Figma edition analyzes the frame.',
  },
  { claude: 'create-multi-mockup', figma: 'create-multi-pattern' },
  {
    claude: 'cognitive-ui-design',
    figma: 'cognitive-ui-design',
    ja: '両版とも同じ内容です（SKILL.mdは英文のまま）。Figma版ではパターンログがファイルに残らないため、チャットに出力されます。',
    en: 'Both editions carry the same content (SKILL.md stays in English). On Figma the pattern log is printed in the chat, since no file can be kept.',
  },
  { claude: 'figma-audit', figma: 'figma-audit' },
  { claude: 'figma-component-audit', figma: 'figma-component-audit' },
  { claude: 'figma-contrast-check', figma: 'figma-contrast-check' },
  { claude: 'figma-layer-rename', figma: 'figma-layer-rename' },
  { claude: 'figma-tidy-up', figma: 'tidy-up' },
  { claude: 'figma-tokenize', figma: 'figma-tokenize' },
  { claude: 'figma-componentize', figma: 'figma-componentize' },
  { claude: 'figma-enhance', figma: 'figma-enhance' },
  { claude: 'figma-optimize', figma: 'hey-optimize-me' },
]
