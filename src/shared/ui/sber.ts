/**
 * sber.ts — точка входа для реальных компонентов из @sber-orm/ui-kit.
 *
 * STATUS: dormant. Реальный re-export пока отключён.
 *
 * Причина:
 *   - packages/ui-kit/src/index.ts начинается с `import './colors.scss'`
 *     и тянет за собой scss-модули в каждом компоненте.
 *   - В проекте не установлены: sass, classnames, simplebar-react,
 *     react-imask, react-i18next, и весь набор @v-uik/* (peer-зависимости kit).
 *   - package.json у @sber-orm/ui-kit объявляет react@18.3.1 как dependency,
 *     а в приложении установлен react@19 — есть риск duplicate React.
 *
 * Когда сборка ui-kit (dist) или peer-зависимости будут доступны, раскомментировать:
 *
 *     export * from "@sber-orm/ui-kit";
 *     // import "@sber-orm/ui-kit/index.css";
 *
 * Импорты из @sber-orm/ui-kit разрешены ТОЛЬКО в этом файле и в src/shared/ui/local.tsx.
 */

export {};