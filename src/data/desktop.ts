import { museCategories } from './muse'
import type { Category } from './skills'

/**
 * KMRVID CDC Skills（Claude Desktop チャット用・プラグイン形式）の収録スキル。
 * Muse版とほぼ同じ構成なので、Muse版から Muse 専用のものだけ除いて派生させる。
 * Muse版にあって CDC に無いスキルを足したときは、ここに追加する。
 * マスター: ~/Documents/projects/kmrvid/kmrvid-cdc-skills-en
 */
const MUSE_ONLY = new Set(['space-guideline'])

export const desktopCategories: Category[] = museCategories
  .map((category) => ({
    ...category,
    product: 'desktop' as const,
    skills: category.skills
      .filter((skill) => !MUSE_ONLY.has(skill.name))
      .map((skill) => {
        // Muse 向けの注記と無料配布リンクは CDC には当てはまらない
        const { lite: _lite, ...rest } = skill
        return {
          ...rest,
          desc: rest.desc.replace('（Muse版専用）', ''),
          en: rest.en.replace(' (Muse edition only)', ''),
        }
      }),
  }))
  .filter((category) => category.skills.length > 0)

export const desktopSkills = desktopCategories.flatMap(
  (category) => category.skills,
)

export const desktopSkillsCount = desktopSkills.length

/** 実機（Claude Desktop チャット）での動作確認日 */
export const DESKTOP_VERIFIED_ON = {
  ja: '2026年11月18日',
  en: 'November 18, 2026',
}
