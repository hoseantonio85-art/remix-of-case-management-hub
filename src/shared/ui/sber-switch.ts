/**
 * Sber-switch — точка будущего перехода на пакет.
 *
 * После установки внутреннего registry и пакета @sber-orm/ui-kit
 * в `src/shared/ui/index.tsx` достаточно будет добавить:
 *
 *   export * from "@sber-orm/ui-kit";
 *
 * Все продуктовые компоненты используют только импорт из "@/shared/ui",
 * поэтому переключатель не затронет доменный код.
 *
 * Сейчас пакет недоступен в реестре, поэтому экспортируется локальный
 * adapter-layer с API, максимально совместимым с ALL_COMPONENTS.md
 * (см. MIGRATION_REPORT.md → Component compatibility).
 */

// export * from "@sber-orm/ui-kit";
export {};