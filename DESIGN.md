---
version: alpha
name: KMRVID Claude Skills
description: Claude Code向けオリジナルスキル講座「KMRVID Claude Skills」の販促LP
colors:
  primary: "#d3401f"
  secondary: "#a92e14"
  tertiary: "#f7e2d9"
  surface: "#ffffff"
  surface-alt: "#f4f2ec"
  ink: "#17140f"
  muted: "#4a453d"
  border: "#e3ded2"
typography:
  h1:
    fontFamily: Gen Interface JP Display
    fontSize: 49px
    fontWeight: 400
    lineHeight: 1.1
  h2:
    fontFamily: Gen Interface JP Display
    fontSize: 39px
    fontWeight: 400
    lineHeight: 1.1
  h3:
    fontFamily: Gen Interface JP Display
    fontSize: 31px
    fontWeight: 400
    lineHeight: 1.1
  body-md:
    fontFamily: Gen Interface JP
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Gen Interface JP
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: Gen Interface JP
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.15em
rounded:
  sm: 12px
  md: 16px
  lg: 24px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: 14px
  button-primary-hover:
    backgroundColor: "#e84622"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
    padding: 14px
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: 24px
  badge:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: 8px
  callout:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: 16px
  caption-text:
    textColor: "{colors.muted}"
  section-alt:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink}"
---

## Overview

実務歴の長いWeb制作者が講師を務める、Claude Code向けスキル講座の販促LP。誇張のない落ち着いた説得トーンで、実績と網羅性（36スキル・31本の動画）を静かに裏付けとして提示する。ターゲットはFigma・コーディングを日常的に行うWeb制作者/フリーランスと、AI導入を検討する制作会社の意思決定者で、双方に「実務でそのまま使える」信頼感を与える必要がある。装飾は最小限にとどめ、単色（モノクローム）の地に一色のアクセントだけを効かせるエディトリアルな雰囲気とする。

## Colors

モノクローム＋単一アクセントの構成。背景・本文は白と墨色に絞り、赤みのテラコッタ系アクセントをCTAとハイライトにのみ使うことで、誇大な印象を避けつつ視線を導く。

- **Primary (#d3401f):** CTAボタン、リンクホバー、価格訴求などの主要アクセント。
- **Secondary (#a92e14):** Primaryのより濃いトーン。バッジ・コールアウトの文字色として使用。
- **Tertiary (#f7e2d9):** Primaryの淡いトーン。バッジ・コールアウトの背景に使用。
- **Surface (#ffffff):** ページの基本背景色（canvas）。
- **Surface Alt (#f4f2ec):** セクションの背景を交互に切り替える際の淡いグレー。
- **Ink (#17140f):** 本文・見出しの基本文字色。
- **Muted (#4a453d):** 補足文・キャプションなど、優先度の低いテキストの文字色。
- **Border (#e3ded2):** カードやセクション区切りの罫線色。

## Typography

見出しは「Gen Interface JP Display」、本文は「Gen Interface JP」を使用し、両者を明確に書き分ける。見出しは行間を詰めて（line-height 1.1）力強さを出し、本文は読みやすさを優先して1.6程度のゆったりした行間を確保する。日本語の可読性を優先し、本文・説明文は`text-justify`（両端揃え）で整える。

## Layout

`max-w-5xl`〜`max-w-6xl`を基準としたセンター寄せの単一カラムレイアウト。セクション間の余白は`py-20`〜`py-28`（spacing.xl相当）と大きめに取り、情報の塊ごとに白背景とSurface Alt背景を交互に切り替えて視覚的な区切りを作る。カード群は`grid`でsm:2列/lg:3列に展開し、`gap-6`前後で統一する。

## Elevation & Depth

シャドウはほぼ使用せず、`shadow-xs`をCTAボタンにごく薄くかける程度に留める。階層表現は主に背景色の切り替え（surface / surface-alt / ink反転セクション）と、カードの`border`線で表現し、過度な浮き上がり表現は避ける。

## Shapes

角丸は用途に応じて3段階＋フルラウンドを使い分ける。ボタン・バッジ・ピルは常に`rounded-full`（完全な丸み）とし、カードや画像枠は`rounded-md`（16px）、CTAパネルなど大きな面は`rounded-lg`（24px）を使う。

## Components

- **button-primary:** Primary背景・白文字のピル型ボタン。`hover:brightness-110`でわずかに明るくなる程度の控えめなインタラクション。
- **button-outline:** Surface背景・Border罫線のセカンダリボタン。Primaryボタンと並置する場面（ヒーローの2ボタン構成など）で使用。
- **card:** Surface背景・Border罫線・rounded-mdのカード。特徴紹介やスキル紹介のグリッドで使用。
- **badge / callout:** Tertiary背景・Secondary文字色の小さなラベル/注意書き。強調しすぎずに補足情報を伝える。
- **section-alt:** Surface Alt背景のセクション。白背景セクションと交互に配置し、ページ全体のリズムを作る。

## Do's and Don'ts

- Do: カラーは必ずDESIGN.mdのトークン（primary/secondary/ink/mutedなど）経由で使う。
- Do: 本文・説明文は`text-justify`、見出しは`text-left`で統一する。
- Do: 大文字表記が必要な場合は`uppercase`クラスで表現し、テキスト自体は先頭大文字＋残り小文字で記述する。
- Don't: Tailwindの生カラー（`gray-*`、`neutral-*`など）をプロジェクトのパレットとして使わない。
- Don't: ボタンやバッジの角丸を`rounded-full`以外に変えない（統一感が崩れる）。
- Don't: 誇大な演出（強いドロップシャドウ、過剰なグラデーション）を追加しない。落ち着いた実績訴求のトーンを崩す。
