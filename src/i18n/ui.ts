export type Lang = 'ja' | 'en'

/**
 * 現在のパスから、もう一方の言語の同等ページのパスを返す。
 * 本番は末尾スラッシュなしを 307 で /xxx/ に寄せるため、末尾スラッシュ付きで返す。
 */
export const altPath = (pathname: string): string => {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/en') return '/'
  if (path.startsWith('/en/')) return `${path.slice(3)}/`
  return path === '' ? '/en/' : `/en${path}/`
}

export const langOf = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ja'

/** 複数のコンポーネントで共有する短いラベル */
export const ui = {
  ja: {
    required: '必須',
    optional: 'オプション',
    anyOf: 'いずれか',
    deprecated: '廃止予定',
    otherPackage: (name: string) => `${name}に収録`,
    skillsUnit: 'スキル',
    includedIn: '収録パッケージ',
    changelog: '更新履歴',
    kind: { new: '新規', update: '更新', fix: '修正' },
  },
  en: {
    required: 'Required',
    optional: 'Optional',
    anyOf: 'One of',
    deprecated: 'Deprecated',
    otherPackage: (name: string) => `In ${name}`,
    skillsUnit: 'skills',
    includedIn: 'Included in',
    changelog: 'Changelog',
    kind: { new: 'New', update: 'Updated', fix: 'Fixed' },
  },
} as const
