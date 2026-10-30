import {
  Bot,
  Code,
  Combine,
  Eye,
  LayoutTemplate,
  Layers,
  Palette,
  Rocket,
  Wrench,
} from '@lucide/astro'

/** 依存スキル。`names` が複数のとき、`anyOf` なら「いずれか1つ」、なければ「すべて」 */
export interface Dep {
  names: string[]
  optional?: boolean
  anyOf?: boolean
}

const req = (...names: string[]): Dep => ({ names })
const opt = (...names: string[]): Dep => ({ names, optional: true })
const anyOf = (...names: string[]): Dep => ({ names, anyOf: true })

/** 無料版・機能限定版の配布先 */
interface Lite {
  url: string
  ja: string
  en: string
}

const figmaFree = (url: string): Lite => ({
  url,
  ja: '無料版をFigmaで直接インストール',
  en: 'Free version on Figma Community',
})
const figmaLimited = (url: string): Lite => ({
  url,
  ja: '機能限定版をFigmaで直接インストール',
  en: 'Limited version on Figma Community',
})
const githubLimited = (url: string): Lite => ({
  url,
  ja: '機能限定版をGitHubからダウンロード',
  en: 'Limited version on GitHub',
})

export interface SkillItem {
  name: string
  /** 日本語の説明 */
  desc: string
  /** 英語の説明（海外版LP・Gumroadの説明に準拠） */
  en: string
  deps?: Dep[]
  /** 依存関係の補足（日本語 / 英語） */
  depsNote?: string
  depsNoteEn?: string
  /** 廃止予定（パッケージには同梱されている） */
  deprecated?: boolean
  lite?: Lite
}

export interface Category {
  icon: typeof Palette
  product: 'claude' | 'figma'
  name: string
  nameEn: string
  tagline: string
  taglineEn: string
  note?: string
  noteEn?: string
  skills: SkillItem[]
}

export const categories: Category[] = [
  // ============ Figma版（Figma Design Agent 専用） ============
  {
    icon: Palette,
    product: 'figma',
    name: 'デザイン生成・企画系',
    nameEn: 'Plan and design',
    tagline: '要件を固め、ページやセクションを生成する',
    taglineEn: 'Pin down requirements and generate pages and sections',
    skills: [
      {
        name: 'brief-me',
        desc: 'デザイン着手前のビジネス要件ヒアリング。create-multi-pattern の実行前の詳細な要件定義に。結果の BRIEF はチャットに出力。ファイルとして保存して再利用可能',
        en: 'A business-requirements interview before design work begins. The BRIEF is output in the chat.',
      },
      {
        name: 'design-brief-me',
        desc: 'デザイン着手前の設定ヒアリング。結果のDESIGN_BRIEFを`brief-me`のBRIEFと一緒に貼り付けると、後続スキルの質問がすべて省略され完全無人実行が可能に',
        en: 'A design-settings interview (page type, type scale, base size). Paste its DESIGN_BRIEF with the BRIEF to skip every downstream question.',
      },
      {
        name: 'hey-brief-me',
        desc: 'brief-me と design-brief-me のどちらを実行するか複数選択で選び、選ばれたものだけを固定順（brief-me → design-brief-me）で実行するピッカー。複数回呼び出すのが面倒なときに',
        en: 'A picker that runs either or both interviews in a fixed order.',
        deps: [req('brief-me', 'design-brief-me')],
      },
      {
        name: 'figma-typescale',
        desc: 'ベースサイズと比率を聞き、タイプスケールを生成。命名規則を「オリジナル」と「Tailwind」から選択可能。オリジナルはText Styleも作成、Tailwindは変数のみ',
        en: 'Generates a type scale (Original 8-step, or Tailwind 13-step) from a base size and ratio.',
      },
      {
        name: 'create-single-page',
        desc: '`create-multi-pattern`の無質問版。全て決定的なルールで自動確定し、単一ページを一発生成。質問を一切出さないため、連続プロンプトに繋げて無人実行できる',
        en: 'A no-questions page generator driven by a pasted BRIEF. Chain it for unattended runs.',
        deps: [opt('brief-me', 'design-brief-me', 'figma-typescale')],
      },
      {
        name: 'create-multi-pattern',
        desc: '複数レイアウトパターンを一括生成・比較。BRIEF を渡すことでより精緻な画面を生成可能。cognitive-ui-design と連携したトポロジーモデル割当（5点宣言・狙い文）にも対応し、パターンログをチャットへ出力できる',
        en: 'Generates several structurally different layouts to compare. A BRIEF makes the screens more refined.',
        deps: [opt('cognitive-ui-design', 'figma-japanese-web-guideline')],
      },
      {
        name: 'create-jp-lp',
        desc: '日本の商業LPに特有の画像運用・配色コンベンションに特化した単一ページ生成スキル。BRIEFから訴求ジャンルと業種を自動判定し、実例調査に基づくパレット・セクション構成を適用',
        en: 'A Japanese commercial landing-page frame, using industry and appeal-genre conventions. Its rule text stays in Japanese.',
        deps: [opt('cognitive-ui-design', 'figma-japanese-web-guideline')],
      },
      {
        name: 'rewrite-me',
        desc: '選択したフレーム/セクション内のテキストを要件に合わせて書き直す。文章のボリューム調整、LP限定の行動経済学的説得軸にも対応。レイアウト・色・構造は一切変更しない',
        en: 'Rewrites text nodes to match a BRIEF without touching layout, color or structure.',
        deps: [opt('figma-layer-rename')],
      },
      {
        name: 'hey-polish-me',
        desc: '既存のデザイン済みフレーム全体またはセクション単位を分析し、原本を残したまま改善案を作成する。コンパニオンスキル対応。出力はレポート・アノテーション・両方から選択可能',
        en: 'Analyzes a finished frame and writes an improvement proposal, leaving the original untouched.',
        deps: [
          opt(
            'cognitive-ui-design',
            'create-multi-pattern',
            'rewrite-me',
            'create-jp-lp',
          ),
        ],
        lite: figmaFree('https://www.figma.com/community/skill/109967'),
      },
      {
        name: 'japanese-lp-seasoning',
        desc: 'フルブリード演出・カルーセル/バナースライダー・縦書きを、静的フレームでの見た目として選択・提案（スクロール連動アニメーションは対象外）、簡易実装処理まで',
        en: 'Full-bleed, carousels, banner sliders and vertical text, as static looks.',
      },
      {
        name: 'cognitive-ui-design',
        desc: '視線誘導トポロジーと認知バイアス対策で、定番レイアウト・無難な配色への安易な依存を崩すガイドライン。複数パターンでは5点宣言と狙い文を付け、パターンログはチャットに出力。Claude版と同じ内容（英文）',
        en: 'Breaks generic layout and color defaults using eye-tracking patterns. Same content as the Claude edition.',
      },
      {
        name: 'figma-japanese-web-guideline',
        desc: '日本語サイトのデザインを Figma で作成・編集する際に、AIが陥りやすいデフォルト（中央揃えの折り返し崩れ、行間の広げすぎ、不自然な配色など）を補正するガイドライン',
        en: 'Corrects the defaults AI falls into on Japanese typography. Its rule text stays in Japanese.',
      },
      {
        name: 'figma-mobile-convert',
        desc: 'デスクトップサイズのフレームからモバイル版を生成。レイアウトやフォントサイズを自動調整し、必要に応じてタッチターゲットのサイズも調整',
        en: 'Generates a 390px mobile frame from a desktop frame.',
        deps: [opt('figma-systematize')],
        depsNote:
          '整備状況が不十分な場合は、先に figma-systematize を勧められます',
        depsNoteEn:
          'If the frame is not yet organized, it recommends running figma-systematize first.',
      },
      {
        name: 'figma-i18n-translator',
        desc: '実装前のレイアウト確認用（本番の多言語実装・翻訳はコード側で行う想定）。選択したフレーム/セクションを言語ごとに複製し、INSTANCE内も含めて全テキストノードを翻訳',
        en: 'Duplicates a frame per language to catch layout breaks early.',
        lite: figmaFree('https://www.figma.com/community/skill/92859'),
      },
      {
        name: 'slot-table-maker',
        desc: 'スロットテーブルを自動生成する。列数・行数をヒアリングし、固定ヘッダー＋可変データ行のテーブルコンポーネントシステムを生成する',
        en: 'A table component system with a variable-rows slot.',
        lite: figmaFree('https://www.figma.com/community/skill/102425'),
      },
    ],
  },
  {
    icon: Combine,
    product: 'figma',
    name: '整理・構造化系',
    nameEn: 'Clean up and systematize',
    tagline: 'レイヤー・変数・コンポーネントを整える',
    taglineEn: 'Tidy layers, variables and components',
    skills: [
      {
        name: 'tidy-up',
        desc: '選択したフレームまたはコンポーネント（複数選択可）を、オートレイアウト／整理されたレイヤー名／正規化されたスペーシングで再構築する',
        en: 'Restructures a frame into an auto-layout hierarchy with clean names and 4px-grid spacing.',
        deps: [opt('figma-tokenize')],
        lite: figmaFree('https://www.figma.com/community/skill/104998'),
      },
      {
        name: 'figma-layer-rename',
        desc: '自動生成レイヤー名を検出し、確認のうえセマンティックな名前にリネーム。Sectionなどレイヤーの兄弟間で重複している名前も、オプションで差別化リネームの対象に',
        en: 'Replaces auto-generated names such as Frame 12 with semantic ones, after confirmation.',
        lite: githubLimited(
          'https://github.com/gaspanik/figma-layer-rename-lite-skill/releases/tag/v2026.8.8',
        ),
      },
      {
        name: 'figma-tokenize',
        desc: '変数を使わずに値を直接ハードコードしている色・フォントサイズ・スペーシングを変数（トークン）化してバインド。テキストのスタイル化にも対応',
        en: 'Turns hardcoded colors, sizes and spacing into bound variables.',
        deps: [opt('figma-layer-rename')],
      },
      {
        name: 'figma-componentize',
        desc: '選択フレーム内の繰り返しパターン（ボタン・カード等）を検出してコンポーネント化を提案。バリアント生成、バリアントの変数化までを対話的に実行',
        en: 'Finds repeated patterns and builds components and variants, with your confirmation at each step.',
        deps: [opt('figma-tokenize')],
      },
      {
        name: 'figma-systematize',
        desc: '選択フレームを「レイヤー名整理 → トークン化 → コンポーネント化」の3段パイプラインで一括処理。実行モード（自動／各ステップ確認あり）選択可',
        en: 'Layer names → tokens → components in a single pass.',
      },
      {
        name: 'figma-enhance',
        desc: 'すでにトークン化・コンポーネント化済みのファイルをページ全体で監査し、さらなる改善点を検出・提案・実装まで自動で実行',
        en: 'Audits an already structured file for further improvements and applies what you approve.',
      },
      {
        name: 'hey-optimize-me',
        desc: 'tidy-up / figma-layer-rename / figma-tokenize / figma-componentize / figma-enhance の中から実行したいタスクを複数選択で選び、選ばれたものだけを固定順で実行するピッカー',
        en: 'A picker for the five clean-up skills, run in a fixed order.',
        deps: [
          req(
            'tidy-up',
            'figma-layer-rename',
            'figma-tokenize',
            'figma-componentize',
            'figma-enhance',
          ),
        ],
        depsNote: '選んだタスクに応じて呼び出されます',
        depsNoteEn: 'Calls only the tasks you select.',
      },
    ],
  },
  {
    icon: Eye,
    product: 'figma',
    name: '監査・アクセシビリティ系',
    nameEn: 'Audit and accessibility',
    tagline: 'AI実装精度とアクセシビリティをチェックする',
    taglineEn: 'Check AI-implementation readiness and accessibility',
    skills: [
      {
        name: 'figma-audit',
        desc: 'MCPを介したエージェントによるコーディング結果はフレームの構造に依存。選択フレームのAI実装精度を4観点で採点し、コンパクトなレポートを出力（詳細は追加要求で表示）',
        en: 'Scores AI-implementation readiness across 4 dimensions and outputs a compact report.',
        lite: figmaFree('https://www.figma.com/community/skill/89814'),
      },
      {
        name: 'figma-component-audit',
        desc: '選択したコンポーネント/コンポーネントセット単体を、バリアント定義・コンポーネントプロパティ・レイヤー命名・Auto-layout・カラー/タイポグラフィトークンの5観点で採点',
        en: 'Scores a component on 5 dimensions (variants, properties, naming, auto-layout, tokens).',
      },
      {
        name: 'figma-contrast-check',
        desc: '選択フレーム内のテキストのWCAGコントラスト比（AA/AAA）を判定し、コンパクトなレポートを出力（詳細表示可）。自動修正にも対応',
        en: 'WCAG AA/AAA contrast per text node, with confirmation-gated auto-fix.',
        deps: [opt('figma-layer-rename')],
      },
      {
        name: 'figma-alt-suggest',
        desc: '選択したフレーム/セクション内の IMAGE fill を持つノードをすべて検出し、実際にレンダリング結果を見た上で具体的な ALT テキスト案を提案',
        en: 'Looks at each image and proposes alt text as Dev Mode annotations.',
        lite: figmaLimited('https://www.figma.com/community/skill/92022'),
      },
      {
        name: 'figma-annotate',
        desc: 'Figma 純正のDevモード注釈（プリセットカテゴリ）を選択範囲に書き込み、コーディングエージェントへ構造だけでは伝わらない実装意図を渡す',
        en: 'Writes native Dev Mode annotations that carry implementation intent.',
      },
    ],
  },
  {
    icon: Code,
    product: 'figma',
    name: 'コード引き渡し系',
    nameEn: 'Hand off to code',
    tagline: '完成したデザインを実装エージェントへ渡す',
    taglineEn: 'Pass a finished design to a coding agent',
    skills: [
      {
        name: 'coding-prompter',
        desc: 'デザインが完成した選択フレームを、コーディングエージェントに実装してもらうための実装プロンプトを生成する。使用したい技術スタックに合わせて細かな指示も可能',
        en: 'Builds an implementation prompt for a coding agent from a finished frame.',
        lite: figmaFree('https://www.figma.com/community/skill/98255'),
      },
      {
        name: 'figma-design-md',
        desc: 'DESIGN.mdとFigmaの変数・Text Style・コンポーネントを双方向に同期するスキル。Import/Exportどちらのモードでもプレビューページをオプションで生成',
        en: 'Two-way sync between a Figma file and a DESIGN.md (Google design.md spec).',
        lite: figmaFree('https://www.figma.com/community/skill/93189'),
      },
      {
        name: 'motion-composer',
        desc: '選択したフレームのモーションを、1ターン1問のウィザード形式で設計。Web実装の方針・プリセット・開始条件などを確認し、最終承認後に適用して、Web実装用の仕様をDev Mode注釈として書き込む',
        en: 'Designs motion for a selected frame one question at a time, applies it after final approval, and writes the web implementation spec as Dev Mode annotations.',
      },
    ],
  },
  {
    icon: Bot,
    product: 'figma',
    name: 'エージェント運用系',
    nameEn: 'Working with the agent',
    tagline: 'エージェント自身の作業を安定させる',
    taglineEn: 'Keep the agent’s own work steady',
    skills: [
      {
        name: 'agent-handoff',
        desc: '会話全体の履歴を確認したうえでハンドオフドキュメントを1つのフェンス付きコードブロックで出力。新しいチャットセッションの最初のメッセージとして貼り付けて作業を継続可',
        en: 'Summarizes the whole conversation so you can continue in a fresh chat.',
        lite: figmaFree('https://www.figma.com/community/skill/102459'),
      },
      {
        name: 'hey-be-careful',
        desc: 'キャンバスではなくエージェント自身の振る舞いを対象とするガイドライン。新しいチャットの開始時や、より丁寧で入念な作業をさせたいときに',
        en: 'A set of working rules for the agent: ask when unclear, verify, report specifically.',
        lite: figmaFree('https://www.figma.com/community/skill/115227'),
      },
    ],
  },

  // ============ Claude版（Claude Code 向け） ============
  {
    icon: Rocket,
    product: 'claude',
    name: 'セットアップ系',
    nameEn: 'Setup and pipelines',
    tagline: '新規プロジェクトを立ち上げる',
    taglineEn: 'Start a new project',
    skills: [
      {
        name: 'setup-astro',
        desc: 'Astro v7 + Tailwind v4 の新規プロジェクトをセットアップ',
        en: 'Start a new Astro v7 project with Tailwind v4.',
      },
      {
        name: 'setup-html',
        desc: 'Vite + TypeScript + Tailwind のバニラHTMLプロジェクトをセットアップ',
        en: 'Start a vanilla HTML project (Vite + TypeScript) with Tailwind v4.',
      },
      {
        name: 'setup-react',
        desc: 'Vite + React + TanStack Router の新規プロジェクトをセットアップ',
        en: 'Start a React (Vite + TanStack Router) project with Tailwind v4.',
      },
      {
        name: 'mockup-pipeline',
        desc: 'セットアップ → DESIGN.md → タイプスケール → モックアップまで一括実行',
        en: 'Setup → DESIGN.md → type scale → mockup, end to end.',
        deps: [
          anyOf('setup-astro', 'setup-html', 'setup-react'),
          req('create-design-md', 'tailwind-typescale'),
          anyOf('create-mockup', 'create-multi-mockup'),
          opt('japanese-web-guideline', 'cognitive-ui-design'),
        ],
      },
      {
        name: 'full-pipeline',
        desc: 'mockup-pipelineに続けてmobile-polish → tailwind-review →（Astroなら）astro-doctor → DESIGN.md再生成まで自動実行する統合パイプライン',
        en: 'mockup-pipeline, then mobile-polish, tailwind-review, astro-doctor (Astro projects) and a fresh DESIGN.md.',
        deps: [
          req(
            'mockup-pipeline',
            'mobile-polish',
            'tailwind-review',
            'create-design-md',
          ),
          opt('astro-doctor', 'code-to-figma'),
        ],
        depsNote: 'mockup-pipeline の依存スキルもあわせて必要です',
        depsNoteEn: 'Also needs everything mockup-pipeline depends on.',
      },
      {
        name: 'lp-pipeline',
        desc: 'ランディングページ（LP）に特化した一気通貫パイプライン。目的・ターゲットに合わせてセクションを事前選択し、create-mockup → tailwind-review → mobile-polishまで自動実行',
        en: 'A landing-page pipeline that pre-selects sections from your purpose and target.',
        deps: [
          anyOf('setup-astro', 'setup-html', 'setup-react'),
          req('create-mockup', 'tailwind-review', 'mobile-polish'),
          opt('japanese-web-guideline', 'cognitive-ui-design', 'code-to-figma'),
        ],
      },
    ],
  },
  {
    icon: LayoutTemplate,
    product: 'claude',
    name: 'モックアップ作成系',
    nameEn: 'Mockup creation',
    tagline: 'コードからUIを組み上げる',
    taglineEn: 'Build UI from code',
    note: 'create-mockup / create-multi-mockupは、cognitive-ui-design（定番レイアウトからの脱却）やjapanese-web-guideline（日本語サイトの実装補正）と組み合わせることで、AIにありがちな凡庸な仕上がりを避けられます。',
    noteEn:
      'Combine create-mockup / create-multi-mockup with cognitive-ui-design (breaks generic layouts) and japanese-web-guideline (corrections for Japanese sites) to avoid the generic look AI tends to produce.',
    skills: [
      {
        name: 'brief-me',
        desc: 'モックアップ作成の前段として、ビジネス要件をヒアリングして BRIEF.md を生成する',
        en: 'A business-requirements interview that writes BRIEF.md.',
      },
      {
        name: 'create-mockup',
        desc: 'FigmaなしでUIをゼロから構築。サイトの種類・デザインスタイル・ページ種別をヒアリングしてから実装を',
        en: 'Builds a UI from scratch, no Figma needed.',
        deps: [
          opt(
            'brief-me',
            'code-to-figma',
            'japanese-web-guideline',
            'cognitive-ui-design',
            'japanese-lp-seasoning',
          ),
        ],
      },
      {
        name: 'create-multi-mockup',
        desc: '1回のリクエストで複数レイアウトパターンのモックアップをまとめて生成する',
        en: 'Several structurally different layouts side by side.',
        deps: [
          opt(
            'create-mockup',
            'brief-me',
            'japanese-web-guideline',
            'cognitive-ui-design',
            'japanese-lp-seasoning',
          ),
        ],
      },
      {
        name: 'create-jp-lp',
        desc: '日本の商業LPに特化した判断ロジックのスキル。Figma版 create-jp-lp の姉妹スキル',
        en: 'For Japanese commercial landing pages. Its SKILL.md is in Japanese.',
        deps: [
          req('create-mockup'),
          opt(
            'brief-me',
            'japanese-web-guideline',
            'cognitive-ui-design',
            'japanese-lp-seasoning',
          ),
        ],
      },
      {
        name: 'mobile-polish',
        desc: '既存モックアップにモバイル対応・ナビゲーションを追加',
        en: 'Mobile navigation, small-screen type and touch targets.',
      },
      {
        name: 'create-design-md',
        desc: 'Google仕様の `DESIGN.md` をプロジェクトルートに生成',
        en: 'Generates a DESIGN.md in Google’s design.md format.',
      },
      {
        name: 'export-design-md',
        desc: 'DESIGN.mdをビジュアルHTML / Astroページに変換',
        en: 'Turns DESIGN.md into a visual HTML or Astro page.',
      },
      {
        name: 'rewrite-me',
        desc: '実装済みページの目に見える文言をビジネス要件 BRIEF.md に合わせて書き直す',
        en: 'Rewrites page copy to match BRIEF.md.',
        deps: [req('brief-me'), opt('japanese-web-guideline')],
        depsNote:
          'プロジェクトに BRIEF.md があれば、brief-me は未インストールでも動作します',
        depsNoteEn:
          'If BRIEF.md already exists in the project, brief-me does not need to be installed.',
      },
    ],
  },
  {
    icon: Layers,
    product: 'claude',
    name: 'Figma連携系',
    nameEn: 'Figma integration',
    tagline: 'Claude Code から Figma を読み書きする（Tailwindベース）',
    taglineEn:
      'Read and write Figma from Claude Code through the Figma MCP (Tailwind-based)',
    note: 'Figmaのフレーム構造は、そのままコードの構造に反映されます。先にfigma-auditでAI実装精度を診断し、スコアが低い箇所をFigma側で直してから実装に進むと、修正が少なく済みます。同名・対応するスキルがFigma Design Agent版（KMRVID Figma Skills）にもあります。',
    noteEn:
      'A Figma frame’s structure carries straight into the code. Run figma-audit first, fix low-scoring spots in Figma, then implement, and you will need fewer corrections. Many of these have a counterpart in the Figma Design Agent edition (KMRVID Figma Skills).',
    skills: [
      {
        name: 'figma-audit',
        desc: 'フレームのAI実装精度を4観点で検査してレポート出力。改善点を修正してAIレディなFigmaに',
        en: 'Scores how well AI can implement a frame (4 dimensions) and writes a report.',
      },
      {
        name: 'figma-component-audit',
        desc: 'コンポーネント単位でのチェックはこちら。コンポーネント構造・バリアントを5観点で監査',
        en: 'Audits component structure and variants.',
      },
      {
        name: 'figma-weather',
        desc: '実装品質を天気形式（☀️〜🌀）でスコアリング（figma-auditと中身は同じ）',
        en: 'The figma-audit score, delivered as a weather forecast.',
      },
      {
        name: 'figma-layer-rename',
        desc: 'Figmaのフレーム/セクション全体を走査し、自動生成されたレイヤー名を意味のある名前にリネーム',
        en: 'Replaces auto-generated layer names with semantic ones, after confirmation.',
      },
      {
        name: 'figma-tidy-up',
        desc: 'オートレイアウト未適用のフレームを、意味のあるレイヤー名・正規化したスペーシング・適切なネスト構造に再構築',
        en: 'Rebuilds a frame with no auto layout into a clean auto-layout hierarchy.',
        deps: [opt('figma-tokenize')],
      },
      {
        name: 'figma-tokenize',
        desc: 'Figmaのフレーム/セクション全体を走査し、直接指定された色・フォントサイズなどをトークン化して変数バインド',
        en: 'Turns hardcoded colors, font sizes and spacing into bound variables.',
        deps: [opt('figma-layer-rename')],
      },
      {
        name: 'figma-componentize',
        desc: '繰り返し要素・ヘッダー/フッター等を検出し、コンポーネント化＋バリアントセット生成をユーザー確認を挟みながら実施',
        en: 'Finds repeated patterns and builds components and variants, with your confirmation.',
        deps: [opt('figma-tokenize')],
      },
      {
        name: 'figma-enhance',
        desc: '変数化・コンポーネント化済みのファイルをさらに監査（バリアント統合・プロパティ追加・バインド漏れ等）して実装',
        en: 'Audits an already structured file for further improvements and applies what you approve.',
      },
      {
        name: 'figma-optimize',
        desc: 'tidy-up / layer-rename / tokenize / componentize / enhance の5タスクから実行するものを選択し依存順に自動実行',
        en: 'Pick which of the five clean-up tasks to run; they run in dependency order.',
        deps: [
          req(
            'figma-tidy-up',
            'figma-layer-rename',
            'figma-tokenize',
            'figma-componentize',
            'figma-enhance',
          ),
        ],
        depsNote:
          '選んだタスクに応じて呼び出されます。すべて同じ場所にインストールしてください',
        depsNoteEn:
          'Calls only the tasks you select. Install them all in the same place.',
      },
      {
        name: 'figma-contrast-check',
        desc: 'Figmaのフレーム/セクション全体を走査し、コントラスト比をチェックしてレポート出力。自動修正まで',
        en: 'WCAG AA/AAA contrast per text node, with confirmation-gated auto-fix.',
      },
      {
        name: 'figma-to-tailwind',
        desc: 'Figma VariablesをTailwind CSS v4の @themeトークンとして書き出し',
        en: 'Figma Variables → Tailwind @theme tokens.',
      },
      {
        name: 'tailwind-to-figma',
        desc: 'Tailwind CSS v4の @themeトークンを指定されたFigmaへ変数として書き出し',
        en: 'Tailwind @theme tokens → Figma Variables.',
      },
      {
        name: 'figma-workflow',
        desc: 'Figma → 実装 → レビュー → 最適化をサブエージェントで逐次実行。作業環境が既にある場合に',
        en: 'Figma to working code via sub-agents (implement, review, optimize).',
        deps: [opt('tailwind-review', 'figma-update-checker')],
        depsNote:
          'tailwind-review が未導入のときは、Tailwind レビューのフェーズを省略して続行します',
        depsNoteEn:
          'If tailwind-review is not installed, the Tailwind review phase is skipped and the run continues.',
      },
      {
        name: 'figma-pipeline',
        desc: 'figma-weather → セットアップ → 変数同期 → 実装まで一気通貫',
        en: 'Figma to a running page: starter, variable sync and implementation in one go.',
        deps: [
          req('figma-workflow', 'figma-to-tailwind', 'create-design-md'),
          opt('figma-audit', 'tailwind-to-figma'),
        ],
        depsNote:
          'figma-workflow の依存スキルもあわせて必要です。figma-to-tailwind・tailwind-to-figma・create-design-md は、スターターに同梱のものも使われます',
        depsNoteEn:
          'Also needs everything figma-workflow depends on. figma-to-tailwind, tailwind-to-figma and create-design-md are also bundled with the starter it clones.',
      },
      {
        name: 'figma-update-checker',
        desc: 'Figmaノードが前回チェック時から変更されたかを検知し、.figma-cache.json に記録',
        en: 'Detects whether a Figma node changed since the last check.',
        deps: [opt('figma-workflow', 'figma-pipeline', 'figma-update-patch')],
      },
      {
        name: 'figma-update-patch',
        desc: 'figma-update-checker での変更検知後、ページ全体を作り直さず変更箇所だけをピンポイント修正',
        en: 'Patches only the part that changed instead of rebuilding the page.',
        deps: [req('figma-update-checker')],
      },
      {
        name: 'create-figma-page',
        desc: 'Figma版の create-single-page と create-multi-pattern の機能をまとめて、Claude Code から実行できるスキル。コードもモックアップも挟まず、BRIEF から Figma のキャンバスへ直接ページを生成。接続済みライブラリも利用でき、構造の異なる複数パターンや1セクションの複数案も作れる',
        en: 'Runs the Figma edition’s create-single-page and create-multi-pattern from Claude Code. Builds a page directly on the Figma canvas from a BRIEF, with no code or mockup step, reusing connected libraries, in one layout or several side by side.',
        deps: [
          opt('brief-me', 'cognitive-ui-design', 'japanese-web-guideline'),
        ],
        depsNote: 'Figma MCPサーバーとの接続が必要です。',
        depsNoteEn: 'Requires a connection to the Figma MCP server.',
      },
      {
        name: 'code-to-figma',
        desc: '実装済みコードをFigmaに書き出し（キャプチャ〜コンポーネント生成まで4段階）。自動でエクスポート設定も',
        en: 'Sends implemented code back to Figma, from a quick capture to full components.',
      },
      {
        name: 'figma-node-check',
        desc: 'use_figma実行前に読み込む必須チェックルール。各スキルの references/known-pitfalls.md に統合済みのため、単体スキルとしては廃止予定',
        en: 'Deprecated — folded into each skill that used it, as references/known-pitfalls.md.',
        deprecated: true,
      },
    ],
  },
  {
    icon: Palette,
    product: 'claude',
    name: 'Tailwind系',
    nameEn: 'Tailwind',
    tagline: 'スタイリングを整える',
    taglineEn: 'Clean up styling',
    skills: [
      {
        name: 'css-to-tailwind',
        desc: 'オリジナルのプレーンなCSS / Sass・SCSS のコードベースから Tailwind CSS v4 への初回移行を支援。',
        en: 'A fast first pass from plain CSS or Sass to Tailwind v4, with a list of what still needs manual work.',
        deps: [opt('tailwind-review')],
      },
      {
        name: 'tailwind-review',
        desc: 'コードレビュー・v3→v4移行・アクセシビリティ構造の検証・レポート提出後、自動修正の適用まで',
        en: 'Review, v3 → v4 migration and accessibility structure checks (code already on Tailwind).',
      },
      {
        name: 'tailwind-typescale',
        desc: 'Tailwind標準の書体サイズを変更する。ベースサイズとスケール比率を選んで@themeに適用',
        en: 'Apply a base size and a named ratio to @theme.',
      },
    ],
  },
  {
    icon: Wrench,
    product: 'claude',
    name: '仕上げ・改善系',
    nameEn: 'Finishing and quality',
    tagline: '実装時、実装後の品質を上げる',
    taglineEn: 'Raise quality during and after implementation',
    skills: [
      {
        name: 'astro-i18n',
        desc: 'Astro プロジェクトに国際化（i18n）対応を追加。ロケールルーティング・翻訳辞書化・スイッチャーまで一括対応',
        en: 'Locale routing, translation dictionary and language switcher for an existing Astro project.',
      },
      {
        name: 'html-to-astro',
        desc: 'HTMLプロジェクトを新規Astro v7 + Tailwind CSS v4へ移行。コンポーネント抽出・画像最適化まで一括対応',
        en: 'Migrate a plain-HTML project into Astro v7 with Tailwind v4.',
        deps: [req('setup-astro'), opt('astro-doctor', 'css-to-tailwind')],
        depsNote:
          '移行元が Tailwind を使っていない場合は、先に css-to-tailwind を実行します',
        depsNoteEn:
          'If the source does not use Tailwind yet, run css-to-tailwind first.',
      },
      {
        name: 'astro-doctor',
        desc: 'Astroコードを最新仕様に照合しコンポーネント粒度を最適化',
        en: 'Astro spec compliance and component granularity.',
      },
      {
        name: 'japanese-web-guideline',
        desc: '日本語Webサイト・ページの実装時に、AIが陥りやすいデフォルト設定を補正するガイドラインスキル',
        en: 'Implementation rules for Japanese-language sites.',
      },
      {
        name: 'cognitive-ui-design',
        desc: '視線誘導トポロジーと認知バイアス対策で、定番レイアウト・無難な配色への安易な依存を崩すガイドライン。複数パターンでは5点宣言と狙い文を付け、読ませるセクションにはゲストのマイクロパターンも使える',
        en: 'Breaks generic layout and color defaults using eye-tracking patterns.',
      },
      {
        name: 'japanese-lp-seasoning',
        desc: '日本の商業LPで使われるフルブリード・カルーセル・スクロール連動アニメ等を、密度確認を挟んで選択・実装',
        en: 'Carousels, full-bleed, scroll animation and vertical text for landing pages.',
      },
      {
        name: 'click-to-fix',
        desc: 'コードに不慣れな方でもブラウザ上をクリックして修正指示をそのまま実装。レスポンシブ対応',
        en: 'Click in the browser to give a visual fix instruction.',
      },
      {
        name: 'visual-polish',
        desc: 'AIが自らスクリーンショットを撮りながら最大5回ループでコードを自律修正。作業監視エージェント付き',
        en: 'Screenshot-based self-correction, up to 5 rounds.',
        deps: [opt('japanese-web-guideline')],
      },
      {
        name: 'polish-me',
        desc: '実装済みのページやセクションをレビューし、根拠のある改善提案をレポートするスキル。Figma版 hey-polish-me の姉妹スキル',
        en: 'Report-only design review: measures the running page (desktop + mobile) and pins numbered, evidence-based findings onto it. Edits no source files.',
        deps: [
          opt('cognitive-ui-design', 'rewrite-me', 'create-jp-lp', 'brief-me'),
        ],
      },
      {
        name: 'finish-me',
        desc: '既存モックアップに対して、最適化処理を対話形式で順番に実行する仕上げパイプライン',
        en: 'A step-by-step finishing pass over an existing mockup.',
        deps: [
          req('rewrite-me', 'mobile-polish', 'click-to-fix', 'tailwind-review'),
          opt('astro-doctor'),
        ],
        depsNote: 'rewrite-me の依存スキルもあわせて必要です',
        depsNoteEn: 'Also needs everything rewrite-me depends on.',
      },
      {
        name: 'a11y-review',
        desc: 'コード内の画像の alt テキストを実際に画像を読んで生成、構造的アクセシビリティもチェック・修正（環境不問）',
        en: 'Writes alt text by looking at the actual image, and fixes structural accessibility issues.',
      },
    ],
  },
  {
    icon: Wrench,
    product: 'claude',
    name: 'パイプライン設計支援系',
    nameEn: 'Pipeline design',
    tagline: '自分のパイプラインを設計したいときに',
    taglineEn: 'For designing your own pipelines',
    skills: [
      {
        name: 'pipeline-thinking',
        desc: '自分のインストール済みスキルを題材にパイプライン設計の考え方を対話形式で学ぶ教育スキル',
        en: 'A Socratic guide to how skills combine into pipelines.',
      },
      {
        name: 'pipeline-composer',
        desc: '選んだスキルを並べて依存関係・受け渡し情報を PIPELINE.md として出力',
        en: 'Scans your installed skills and writes a PIPELINE.md proposal.',
      },
    ],
  },
]

const flatten = (product: 'claude' | 'figma') =>
  categories
    .filter((category) => category.product === product)
    .flatMap((category) => category.skills)

export const figmaSkills: SkillItem[] = flatten('figma')

export const claudeSkills: SkillItem[] = flatten('claude')

export const totalSkills = categories.reduce(
  (sum, cat) => sum + cat.skills.length,
  0,
)

export const figmaSkillsCount = figmaSkills.length

export const claudeSkillsCount = claudeSkills.length

export const claudeCategories = categories.filter(
  (cat) => cat.product === 'claude',
)

export const figmaCategories = categories.filter(
  (cat) => cat.product === 'figma',
)
