/**
 * 組み合わせ例（Bundle のトップ用）。日本語・英語で同じ流れを持つ。
 * `chain` はスキル名（Claude版・Figma版の両方にまたがる）。
 */
export interface Flow {
  /** どちらのパッケージ（環境）で動かす流れか */
  edition: 'figma' | 'claude'
  goal: string
  goalEn: string
  chain: string[]
  desc: string
  descEn: string
}

export const bundleFlows: Flow[] = [
  {
    edition: 'figma',
    goal: '要件からFigmaでレイアウトを作る',
    goalEn: 'From requirements to a Figma layout',
    chain: ['brief-me', 'create-multi-pattern'],
    desc: '要件をヒアリングしてBRIEFを作り、構造の異なる複数のレイアウト案を生成して比較します。1案でよければ create-single-page（質問なしの一発生成）に差し替えられます。',
    descEn:
      'Interview for a BRIEF, then generate several structurally different layouts to compare. Use create-single-page for a no-questions, one-pass run.',
  },
  {
    edition: 'figma',
    goal: '乱雑なFigmaフレームを一度に整える',
    goalEn: 'Clean up a messy Figma frame in one go',
    chain: ['figma-systematize', 'figma-enhance'],
    desc: 'レイヤー名・トークン・コンポーネントを一括で整理し、ページ全体をさらに監査します。工程を選びたいときは hey-optimize-me を使います。',
    descEn:
      'Layer names, tokens and components in a single pass, then a further audit of the whole page. Or pick the steps yourself with hey-optimize-me.',
  },
  {
    edition: 'figma',
    goal: 'コードに渡す前にデザインの品質を確認する',
    goalEn: 'Check a design before handing it to code',
    chain: ['figma-audit', 'figma-contrast-check', 'coding-prompter'],
    desc: 'AIが実装しやすい構造かを採点し、コントラストを確認してから、コーディングエージェント向けの実装プロンプトを生成します。',
    descEn:
      'Score how well AI can implement the frame, check contrast, then generate the implementation prompt for your coding agent.',
  },
  {
    edition: 'figma',
    goal: 'Figmaエージェントの動きを矯正する',
    goalEn: 'Keep the Figma agent on track',
    chain: ['hey-be-careful', 'figma-systematize'],
    desc: '先に hey-be-careful を呼び出すと、そのチャットの間は「不明点は確認する・手順を省略しない・結果を検証する」など6つのルールが守られます。指示を聞かなくなったときは、これを実行してから他のスキルを呼び出します。',
    descEn:
      'Run hey-be-careful first and the agent follows six working rules for the rest of the chat: ask when unclear, follow skill steps in order, verify results and more. If the agent stops following instructions, run it, then call other skills such as figma-systematize.',
  },
  {
    edition: 'claude',
    goal: 'コードでUIを組み上げて仕上げる',
    goalEn: 'Build a UI in code and polish it',
    chain: ['create-mockup', 'mobile-polish', 'visual-polish', 'click-to-fix'],
    desc: 'Figmaなしで組み上げ、モバイル対応を足し、スクリーンショットで自律修正してから、細部はブラウザ上のクリックで直します。',
    descEn:
      'Build from scratch without Figma, add mobile navigation, let the agent self-correct from screenshots, then fix details by clicking in the browser.',
  },
  {
    edition: 'claude',
    goal: 'Figmaのデザインをコードにする',
    goalEn: 'Turn a Figma design into working code',
    chain: ['figma-audit', 'figma-workflow'],
    desc: '先に診断し、Figma側でスコアの低い箇所を直してから、実装・レビュー・最適化をサブエージェントで進めます。',
    descEn:
      'Audit first, fix low-scoring spots in Figma, then implement, review and optimize through sub-agents.',
  },
  {
    edition: 'claude',
    goal: 'コードとFigmaのトークンを同期する',
    goalEn: 'Keep code and Figma tokens in sync',
    chain: ['tailwind-to-figma', 'figma-to-tailwind'],
    desc: 'どちらを正にするかで起点を変え、Tailwind の @theme と Figma Variables を双方向に同期します。',
    descEn:
      'Push Tailwind @theme tokens into Figma Variables, or pull Figma Variables back into @theme, depending on which side is the master.',
  },
  {
    edition: 'claude',
    goal: '実装後のコード品質を上げる',
    goalEn: 'Raise code quality after implementation',
    chain: ['tailwind-review', 'astro-doctor'],
    desc: 'Tailwind のクラス整理とアクセシビリティ構造の確認を済ませてから、コンポーネントの粒度を最適化します。どちらか一方だけでも使えます。',
    descEn:
      'Tidy Tailwind classes and accessibility structure, then optimize component granularity. Either one works on its own.',
  },
]
