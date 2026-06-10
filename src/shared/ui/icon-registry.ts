import type { ComponentType, SVGProps } from "react";

/**
 * Имя иконки из @sber-orm/ui-kit (keyof typeof EIconName).
 * До установки пакета используем строковый алиас + локальный реестр.
 * Контракт: ALL_COMPONENTS.md → EIconName.
 */
export type IconName = string;

const registry: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  // TODO: маппинг sber-имён иконок на lucide / SVG-компоненты по мере появления нужд.
};

export function resolveIcon(name: IconName): ComponentType<SVGProps<SVGSVGElement>> | null {
  return registry[name] ?? null;
}