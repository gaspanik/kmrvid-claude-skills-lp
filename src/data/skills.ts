import { LayoutTemplate, Layers, Palette, Rocket, Wrench } from '@lucide/astro'

interface SkillItem {
  name: string
  desc: string
  liteUrl?: string
  liteLabel?: string
}

export const figmaSkills: SkillItem[] = [
  {
    name: 'figma-layer-rename',
    desc: '自動生成レイヤー名を検出し、確認のうえセマンティックな名前にリネーム。レイヤーの兄弟間で重複している名前も、オプションで差別化リネームの対象に',
    liteUrl: 'https://github.com/gaspanik/figma-layer-rename-lite-skill',
    liteLabel: '無料の機能限定版で先に動作を試す',
  },
  {
    name: 'figma-audit',
    desc: '選択フレームのAI実装精度を4観点で採点し、コンパクトなレポートを出力（詳細は追加要求で表示）',
  },
  {
    name: 'figma-component-audit',
    desc: '選択したコンポーネント/コンポーネントセット単体を、バリアント定義・コンポーネントプロパティ・レイヤー命名・Auto-layout・カラー/タイポグラフィトークンの5観点で採点',
  },
  {
    name: 'brief-me',
    desc: 'デザイン着手前のビジネス要件ヒアリング。create-multi-pattern の実行前の詳細な要件定義に。結果の BRIEF はチャットに出力',
  },
  {
    name: 'design-brief-me',
    desc: 'デザイン着手前の設定ヒアリング。結果のDESIGN_BRIEFを`brief-me`のBRIEFと一緒に貼り付けると、後続スキルの質問がすべて省略され完全無人実行が可能に',
  },
  {
    name: 'rewrite-me',
    desc: '選択したフレーム/セクション内のテキストを要件に合わせて書き直す。文章のボリューム調整、LP限定の行動経済学的説得軸にも対応。レイアウト・色・構造は一切変更しない',
  },
  {
    name: 'create-multi-pattern',
    desc: '複数レイアウトパターンを一括生成・比較。BRIEF を渡すことでより精緻な画面を生成可能。cognitive-ui-design と連携したトポロジーモデル割当にも対応',
  },
  {
    name: 'create-single-page',
    desc: '`create-multi-pattern`の無質問版。全て決定的なルールで自動確定し、単一ページを一発生成。質問を一切出さないため、連続プロンプトに繋げて無人実行できる',
  },
  {
    name: 'japanese-lp-seasoning',
    desc: 'フルブリード演出・カルーセル/バナースライダー・縦書きを、静的フレームでの見た目として選択・提案（スクロール連動アニメーションは対象外）、簡易実装処理まで',
  },
  {
    name: 'figma-typescale',
    desc: 'ベースサイズと比率を聞き、タイプスケールを生成。命名規則を「オリジナル」と「Tailwind」から選択可能。オリジナルはText Styleも作成、Tailwindは変数のみ',
  },
  {
    name: 'figma-tokenize',
    desc: '変数を使わずに値を直接ハードコードしている色・フォントサイズ・スペーシングを変数（トークン）化してバインド。テキストのスタイル化にも対応',
  },
  {
    name: 'figma-componentize',
    desc: '選択フレーム内の繰り返しパターン（ボタン・カード等）を検出してコンポーネント化を提案。バリアント生成、バリアントの変数化までを対話的に実行',
  },
  {
    name: 'figma-systematize',
    desc: '選択フレームを「レイヤー名整理 → トークン化 → コンポーネント化」の3段パイプラインで一括処理。冒頭で実行モード（自動／各ステップ確認あり）を1回だけ確認',
  },
  {
    name: 'figma-enhance',
    desc: 'すでにトークン化・コンポーネント化済みのファイルをページ全体で監査し、さらなる改善点を検出・提案・実装まで自動で実行',
  },
  {
    name: 'figma-contrast-check',
    desc: '選択フレーム内のテキストのWCAGコントラスト比（AA/AAA）を判定し、コンパクトなレポートを出力（詳細表示可）。自動修正にも対応',
  },
  {
    name: 'figma-design-md',
    desc: 'DESIGN.mdとFigmaの変数・Text Style・コンポーネントを双方向に同期するスキル。Import/Exportどちらのモードでもプレビューページをオプションで生成',
  },
]

interface Category {
  icon: typeof Palette
  name: string
  tagline: string
  note?: string
  ctaHref?: string
  ctaLabel?: string
  skills: SkillItem[]
}

export const categories: Category[] = [
  {
    icon: Palette,
    name: 'Figma Design Agent 専用',
    tagline: '【新登場】Figma の中で使えるカスタムスキル',
    note: 'Figma内で動くAIエージェントに最適化されたカスタムスキル。フレーム構造を解析してAI実装精度を診断、変数化されていない値を変数化して紐付けるなど、Figma内での作業効率を大幅に向上させます。カスタムスキルのみが含まれた「KMRVID Figma Skills」も単体販売開始。',
    ctaHref: '/figma',
    ctaLabel: 'KMRVID Figma Skills の詳細を見る',
    skills: figmaSkills,
  },
  {
    icon: Rocket,
    name: 'セットアップ系',
    tagline: '新規プロジェクトを立ち上げる',
    skills: [
      {
        name: 'setup-astro',
        desc: 'Astro v7 + Tailwind v4 の新規プロジェクトをセットアップ',
      },
      {
        name: 'setup-html',
        desc: 'Vite + TypeScript + Tailwind のバニラHTMLプロジェクトをセットアップ',
      },
      {
        name: 'setup-react',
        desc: 'Vite + React + TanStack Router の新規プロジェクトをセットアップ',
      },
      {
        name: 'mockup-pipeline',
        desc: 'セットアップ → DESIGN.md → タイプスケール → モックアップまで一括実行',
      },
      {
        name: 'full-pipeline',
        desc: 'mockup-pipelineに続けてmobile-polish → tailwind-review →（Astroなら）astro-doctor → DESIGN.md再生成まで自動実行する統合パイプライン',
      },
      {
        name: 'lp-pipeline',
        desc: 'ランディングページ（LP）に特化した一気通貫パイプライン。目的・ターゲットに合わせてセクションを事前選択し、create-mockup → tailwind-review → mobile-polishまで自動実行',
      },
    ],
  },
  {
    icon: LayoutTemplate,
    name: 'モックアップ作成系',
    tagline: 'コードからUIを組み上げる',
    note: 'create-mockup / create-multi-mockupは、cognitive-ui-design（定番レイアウトからの脱却）やjapanese-web-guideline（日本語サイトの実装補正）と組み合わせることで、AIにありがちな凡庸な仕上がりを避けられます。',
    skills: [
      {
        name: 'brief-me',
        desc: 'モックアップ作成の前段として、ビジネス要件をヒアリングして BRIEF.md を生成する',
      },
      {
        name: 'create-mockup',
        desc: 'FigmaなしでUIをゼロから構築。サイトの種類・デザインスタイル・ページ種別をヒアリングしてから実装を',
      },
      {
        name: 'create-multi-mockup',
        desc: '1回のリクエストで複数レイアウトパターンのモックアップをまとめて生成する',
      },
      {
        name: 'mobile-polish',
        desc: '既存モックアップにモバイル対応・ナビゲーションを追加',
      },
      {
        name: 'create-design-md',
        desc: 'Google仕様の `DESIGN.md` をプロジェクトルートに生成',
      },
      {
        name: 'export-design-md',
        desc: 'DESIGN.mdをビジュアルHTML / Astroページに変換',
      },
      {
        name: 'rewrite-me',
        desc: '実装済みページの目に見える文言をビジネス要件 BRIEF.md に合わせて書き直す',
      },
    ],
  },
  {
    icon: Layers,
    name: 'Figma系',
    tagline: 'Figmaと連携する（Tailwindベース）',
    note: 'Figmaのフレーム構造は、そのままコードの構造に反映されます。先にfigma-auditでAI実装精度を診断し、スコアが低い箇所をFigma側で直してから実装に進むと、修正が少なく済みます。',
    skills: [
      {
        name: 'figma-audit',
        desc: 'フレームのAI実装精度を4観点で検査してレポート出力。改善点を修正してAIレディなFigmaに',
      },
      {
        name: 'figma-component-audit',
        desc: 'コンポーネント単位でのチェックはこちら。コンポーネント構造・バリアントを5観点で監査',
      },
      {
        name: 'figma-weather',
        desc: '実装品質を天気形式（☀️〜🌀）でスコアリング（figma-auditと中身は同じ）',
      },
      {
        name: 'figma-layer-rename',
        desc: 'Figmaのフレーム/セクション全体を走査し、自動生成されたレイヤー名を意味のある名前にリネーム',
      },
      {
        name: 'figma-tokenize',
        desc: 'Figmaのフレーム/セクション全体を走査し、直接指定された色・フォントサイズなどをトークン化して変数バインド',
      },
      {
        name: 'figma-contrast-check',
        desc: 'Figmaのフレーム/セクション全体を走査し、コントラスト比をチェックしてレポート出力。自動修正まで',
      },
      {
        name: 'figma-node-check',
        desc: 'use_figma実行前に読み込む必須チェックルール。「code-to-figma」の裏でも使われる最重要スキル',
      },
      {
        name: 'figma-workflow',
        desc: 'Figma → 実装 → レビュー → 最適化をサブエージェントで逐次実行。作業環境が既にある場合に',
      },
      {
        name: 'figma-pipeline',
        desc: 'figma-weather → セットアップ → 変数同期 → 実装まで一気通貫',
      },
      {
        name: 'figma-to-tailwind',
        desc: 'Figma VariablesをTailwind CSS v4の @themeトークンとして書き出し',
      },
      {
        name: 'tailwind-to-figma',
        desc: 'Tailwind CSS v4の @themeトークンを指定されたFigmaへ変数として書き出し',
      },
      {
        name: 'code-to-figma',
        desc: '実装済みコードをFigmaに書き出し（キャプチャ〜コンポーネント生成まで4段階）。自動でエクスポート設定も',
      },
    ],
  },
  {
    icon: Palette,
    name: 'Tailwind系',
    tagline: 'スタイリングを整える',
    skills: [
      {
        name: 'css-to-tailwind',
        desc: 'オリジナルのプレーンなCSS / Sass・SCSS のコードベースから Tailwind CSS v4 への初回移行を支援。',
      },
      {
        name: 'tailwind-review',
        desc: 'コードレビュー・v3→v4移行・アクセシビリティ構造の検証・レポート提出後、自動修正の適用まで',
      },
      {
        name: 'tailwind-typescale',
        desc: 'Tailwind標準の書体サイズを変更する。ベースサイズとスケール比率を選んで@themeに適用',
      },
    ],
  },
  {
    icon: Wrench,
    name: '仕上げ・改善系',
    tagline: '実装時、実装後の品質を上げる',
    skills: [
      {
        name: 'astro-i18n',
        desc: 'Astro プロジェクトに国際化（i18n）対応を追加。ロケールルーティング・翻訳辞書化・スイッチャーまで一括対応',
      },
      {
        name: 'html-to-astro',
        desc: 'HTMLプロジェクトを新規Astro v7 + Tailwind CSS v4へ移行。コンポーネント抽出・画像最適化まで一括対応',
      },
      {
        name: 'astro-doctor',
        desc: 'Astroコードを最新仕様に照合しコンポーネント粒度を最適化',
      },
      {
        name: 'japanese-web-guideline',
        desc: '日本語Webサイト・ページの実装時に、AIが陥りやすいデフォルト設定を補正するガイドラインスキル',
      },
      {
        name: 'cognitive-ui-design',
        desc: '視線誘導トポロジーと認知バイアス対策で、定番レイアウト・無難な配色への安易な依存を崩すガイドライン',
      },
      {
        name: 'japanese-lp-seasoning',
        desc: '日本の商業LPで使われるフルブリード・カルーセル・スクロール連動アニメ等を、密度確認を挟んで選択・実装',
      },
      {
        name: 'click-to-fix',
        desc: 'コードに不慣れな方でもブラウザ上をクリックして修正指示をそのまま実装。レスポンシブ対応',
      },
      {
        name: 'visual-polish',
        desc: 'AIが自らスクリーンショットを撮りながら最大5回ループでコードを自律修正。作業監視エージェント付き',
      },
      {
        name: 'finish-me',
        desc: '既存モックアップに対して、最適化処理を対話形式で順番に実行する仕上げパイプライン',
      },
    ],
  },
  {
    icon: Wrench,
    name: 'パイプライン設計支援系',
    tagline: '自分のパイプラインを設計したいときに',
    skills: [
      {
        name: 'pipeline-thinking',
        desc: '自分のインストール済みスキルを題材にパイプライン設計の考え方を対話形式で学ぶ教育スキル',
      },
      {
        name: 'pipeline-composer',
        desc: '選んだスキルを並べて依存関係・受け渡し情報を PIPELINE.md として出力',
      },
    ],
  },
]

export const totalSkills = categories.reduce(
  (sum, cat) => sum + cat.skills.length,
  0,
)

export const figmaSkillsCount = figmaSkills.length
