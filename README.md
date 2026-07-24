# KMRVID Claude Skills LP

Claude Code向けオリジナルスキル講座「[KMRVID Claude Skills](https://kmrvid.com/products/kmrvid-claude-skills)」の販促用ランディングページ。**Astro 7**、**Tailwind CSS v4**、**Lucide icons**、**Biome** を使った静的サイトで、Cloudflare Pages/Workers（wrangler）にデプロイします。

## ページ構成

| パス | 内容 |
|---|---|
| `/` | メインLP(Hero / 課題提起 / 講座内容 / スキルハイライト / 講師紹介 / 料金 / FAQ / 最終CTA) |
| `/skills` | 全36スキルをカテゴリ別に一覧表示するスキル紹介ページ |

## スタック

| ツール | バージョン | 役割 |
|---|---|---|
| [Astro](https://astro.build) | ^7 | フレームワーク / SSG |
| [Tailwind CSS](https://tailwindcss.com) | ^4 | スタイリング(Vite プラグイン経由) |
| [@lucide/astro](https://lucide.dev) | ^1 | ツリーシェイク対応の SVG アイコン |
| [Biome](https://biomejs.dev) | 2.x(固定) | Lint + Format |
| TypeScript | ^6 | 型安全性(strict モード) |
| [wrangler](https://developers.cloudflare.com/workers/wrangler/) | ^4 | Cloudflareへのデプロイ |

## プロジェクト構成

```text
/
├── .github/
│   ├── copilot-instructions.md  # GitHub Copilot 向けガイドライン
│   └── prompts/                 # 再利用可能なプロンプトテンプレート(例: new-page)
├── .vscode/
│   ├── extensions.json          # 推奨拡張機能
│   └── launch.json              # デバッグ設定
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── assets/images/   # Vite が処理するアセット(import で参照)
│   ├── components/
│   │   ├── Header.astro       # グローバルヘッダー(モバイルメニュー付き)
│   │   ├── Footer.astro       # グローバルフッター
│   │   ├── FeatureCard.astro  # 「講座の中身」セクション用カード
│   │   ├── FaqItem.astro      # FAQの <details> アコーディオン項目
│   │   ├── Callout.astro      # Puzzleアイコン付き注記ボックス
│   │   └── ImageLightbox.astro # サムネイル→拡大表示ライトボックス(vanilla JS)
│   ├── layouts/
│   │   └── Layout.astro # ルートの HTML シェル — グローバル CSS はここで import
│   ├── pages/
│   │   ├── index.astro   # メインLP
│   │   └── skills.astro  # スキル一覧ページ
│   └── styles/
│       └── global.css   # @import "tailwindcss" + @theme トークン
├── AGENTS.md            # AI エージェント向けガイドライン(OpenAI Codex / 汎用)
├── BRIEF.md             # ビジネス要件(サイト種別・ターゲット・訴求ポイントなど)
├── CLAUDE.md            # Claude Code 向けガイドライン
├── GEMINI.md            # Gemini CLI 向けガイドライン
├── astro.config.mjs
├── biome.json
├── wrangler.jsonc       # Cloudflareデプロイ設定
└── package.json
```

## コマンド

`<pm>` は使用しているパッケージマネージャー(`npm`、`yarn`、`pnpm` など)に置き換えてください。

```sh
<pm> install           # 依存パッケージをインストール
<pm> run dev           # localhost:4321 で開発サーバーを起動
<pm> run build         # 本番用サイトを ./dist/ にビルド
<pm> run preview       # 本番ビルドをローカルでプレビュー(wrangler dev)
<pm> run astro check   # .astro ファイルの型チェック
<pm> run lint          # Biome lint --write
<pm> run format        # Biome format --write
<pm> run check         # Biome check --write(lint + format をまとめて実行)
<pm> run deploy        # ビルド後、Cloudflareへデプロイ(wrangler deploy)
```

## Tailwind v4 の設定

`tailwind.config.js` はありません。テーマのカスタマイズはすべて `src/styles/global.css` に集約されています。

```css
@import "tailwindcss";

@theme {
  /* モノクロ + シングルアクセント(cognitive-ui-design §5.3) */
  --color-ink: #17140f;
  --color-canvas: #ffffff;
  --color-accent: #d3401f;

  /* Major Third(1.250)タイプスケール、base 16px */
  --text-base: 1rem;
  --text-4xl: 3.052rem;
}
```

プロジェクト固有の色は、生の Tailwind スケールユーティリティを使うのではなく `@theme` トークン(例: `--color-ink-soft`、`--tracking-loose`)として定義しています。

## アイコン

[Lucide](https://lucide.dev/icons/) のアイコンは `@lucide/astro` から名前で import して使えます。

```astro
---
import { Camera } from '@lucide/astro'
---

<Camera size={24} class="text-muted" />
```

## コードスタイル

ESLint や Prettier は使用しません。JS/TS/JSON/CSS は **Biome** が管理します。`.astro` ファイルは Biome の対象外なので、型チェックには `<pm> run astro check` を使ってください。

- シングルクォート、セミコロンは `asNeeded`、末尾カンマあり。JSX の属性はダブルクォート
- 80 文字の行幅、2 スペースインデント、LF 改行(`.editorconfig`)
- コード変更を完了する前に、必ず `<pm> run astro check` と `<pm> run check` の両方を実行する

## セキュリティ

`.npmrc` で `min-release-age=1` を設定し、公開から 1 日未満のパッケージのインストールをブロックしています。
`pnpm-workspace.yaml` では `minimumReleaseAge: 1440` を設定し、公開から 24 時間未満のパッケージをブロックしています。これにより悪意のあるパッケージの誤インストールを防ぎます。

ビルドスクリプトの実行権限は `pnpm-workspace.yaml` の `allowBuilds` と `package.json` の `allowScripts` で管理されています。明示的にリストされたパッケージ(例: `esbuild`、`sharp`、`fsevents`)のみがインストールスクリプトを実行できます。

## 参考: モックアップ初回生成の記録

このLPはClaude Code スキル(`create-mockup` / `brief-me` 等)を使って構築されました。`git init` から最初のLPモックアップが形になるまでのコミット履歴は以下の通りです(スキルによる自動生成〜手直しの所要時間の参考データとして記録)。

| # | コミット | 日時 | 前回からの経過 | 内容 |
|---|---------|------|----------------|------|
| 1 | `3df8055` | 2026-07-18 13:30:43 | — (起点) | Init |
| 2 | `88522b6` | 2026-07-18 13:47:35 | +16分52秒 | Add KMRVID Claude Skills LP mockup with BRIEF.md and type scale |
| 3 | `2df16b2` | 2026-07-18 14:00:37 | +13分02秒 | Flesh out author-credibility section with real profile |
| 4 | `d436f4b` | 2026-07-18 15:07:37 | +1時間07分 | Polish LP: hamburger nav, mobile heading wraps, tailwind-review fixes, FeatureCard extraction |

`Init` から最初のポリッシュ済みモックアップ(#4)まで、**約1時間37分**。

## Astro v7 の主な変更点

v6 からアップグレードする場合は、以下の破壊的変更に注意してください。

- **HTML の厳格な検証** — Rust 製コンパイラは不正な HTML を自動修正しなくなりました。閉じタグ忘れはエラーになります。
- **空白の扱い** — デフォルトが JSX スタイル(`compressHTML: 'jsx'`)に変更され、インライン要素間の空白は圧縮されます。必要な箇所には明示的にスペースを追加するか、`astro.config.mjs` で `compressHTML: true` を設定して以前の挙動に戻してください。
- **`src/fetch.ts` は予約済み** — Astro の高度なルーティングで使用されます。このパスにファイルがある場合はリネームし、設定で `fetchFile` を指定してください。
- **Vite 8** — `package.json` に Vite を `^8` に固定する `overrides` エントリが含まれています。
- **Sätteri markdown** — 新しいデフォルトの Markdown プロセッサ(Rust 製)。remark/rehype プラグインを使い続ける場合は `@astrojs/markdown-remark` を再インストールし、明示的に設定してください。
- **バックグラウンド開発サーバー** — `astro dev --background` はターミナルから切り離された状態でサーバーを起動します。`astro dev stop` / `astro dev status` / `astro dev logs` で管理してください。
