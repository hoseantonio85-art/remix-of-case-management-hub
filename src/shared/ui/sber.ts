/**
 * sber.ts — точка входа для реальных компонентов из @sber-orm/ui-kit.
 *
 * STATUS: active. Пакет подключён как prebuilt npm-tarball 0.283.0
 * (см. packages/ui-kit/dist + alias в vite.config.ts / tsconfig.json).
 *
 * dist самодостаточен: внешние зависимости — только react / react-dom,
 * CSS бандл живёт в @sber-orm/ui-kit/index.css.
 *
 * Импорты из @sber-orm/ui-kit разрешены ТОЛЬКО в этом файле
 * и в src/shared/ui/local.tsx.
 */

import "@sber-orm/ui-kit/index.css";

export * from "@sber-orm/ui-kit";