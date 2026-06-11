# HOOKS_API

## React Хуки

Библиотека предоставляет **14 кастомных React-хуков** для повторного использования логики.

### Список хуков

| Хук | Файл | Описание |
|-----|------|----------|
| `useComponentDidMount` | `useComponentDidMount.ts` | Аналог `componentDidMount` для классовых компонентов |
| `useComponentVisible` | `useComponentVisible.ts` | Отслеживает клики вне компонента (для dropdown/popover) |
| `useCopyToClipboard` | `useCopyToClipboard.ts` | Копирование текста в буфер обмена |
| `useDebounce` | `useDebounce.ts` | Отложенное обновление значения |
| `useEventCallback` | `useEventCallback.ts` | Хук для стабилизации callback-функций |
| `useEventListener` | `useEventListener.ts` | Универсальный хук для добавления event listeners |
| `useForkRef` | `useForkRef.ts` | Объединение нескольких ref-ов |
| `useIsOverflowing` | `useIsOverflowing.ts` | Проверка на переполнение (overflow) |
| `useKeeper` | `useKeeper.ts` | Сохранение состояния при размонтировании |
| `useLegacyEffect` | `useLegacyEffect.ts` | React useEffect с совместимостью |
| `useMoneyFormatter` | `useMoneyFormatter.ts` | Форматирование денежных сумм |
| `useMutation` | `useMutation.ts` | Отслеживание изменений DOM (MutationObserver) |
| `useResizeHook` | `useResizeHook.ts` | Отслеживание изменения размеров элемента |
| `useStorageData` | `useStorageData.ts` | Работа с localStorage/sessionStorage |
| `useThrottle` | `useThrottle.ts` | Ограничение частоты вызова функции |

---

## Детальное описание хуков

### `useDebounce`

```typescript
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

**Использование:**
```typescript
const [searchValue, setSearchValue] = useState('');
const debouncedSearch = useDebounce(searchValue, 500);

// debouncedSearch обновляется через 500ms после последнего изменения searchValue
```

---

### `useThrottle`

```typescript
// useThrottle.ts
// Ограничение частоты вызова функции
```

**Использование:**
```typescript
const throttledHandler = useThrottle(handler, 1000);
// handler вызывается не чаще 1 раза в секунду
```

---

### `useCopyToClipboard`

```typescript
// useCopyToClipboard.ts
// Копирование текста в буфер обмена
```

**Использование:**
```typescript
const [copied, copyToClipboard] = useCopyToClipboard();

copyToClipboard('Текст для копирования');
```

---

### `useEventListener`

```typescript
// useEventListener.ts
// Универсальный хук для event listeners
```

**Использование:**
```typescript
useEventListener('resize', handleResize, window);
useEventListener('keydown', handleKeyDown, document);
```

---

### `useComponentVisible`

```typescript
// useComponentVisible.ts
// Отслеживает клики вне компонента
```

**Использование:**
```typescript
const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

return (
  <div ref={ref}>
    <button onClick={() => setIsComponentVisible(!isComponentVisible)}>Open</button>
    {isComponentVisible && <Dropdown />}
  </div>
);
```

---

### `useKeeper`

```typescript
// useKeeper.ts
// Сохраняет состояние при размонтировании компонента
```

**Использование:**
```typescript
const keeper = useKeeper(initialValue);
// Значение сохраняется при unmount и восстанавливается при mount
```

---

### `useStorageData`

```typescript
// useStorageData.ts
// Работа с localStorage/sessionStorage
```

**Использование:**
```typescript
const [value, setValue] = useStorageData('localStorageKey', initialValue);
// Автоматическое сохранение в localStorage
```

---

### `useResizeHook`

```typescript
// useResizeHook.ts
// Отслеживает изменения размеров элемента
```

**Использование:**
```typescript
const ref = useRef<HTMLDivElement>(null);
useResizeHook(ref, (entry) => {
  console.log('New size:', entry.contentRect);
});
```

---

### `useMutation`

```typescript
// useMutation.ts
// MutationObserver для отслеживания изменений DOM
```

**Использование:**
```typescript
const ref = useRef<HTMLDivElement>(null);
useMutation(ref, (mutations) => {
  console.log('DOM changed:', mutations);
});
```

---

### `useForkRef`

```typescript
// useForkRef.ts
// Объединение нескольких ref-ов
```

**Использование:**
```typescript
const ref = useForkRef(internalRef, externalRef);
return <div ref={ref} />;
```

---

### `useIsOverflowing`

```typescript
// useIsOverflowing.ts
// Проверка на переполнение элемента
```

**Использование:**
```typescript
const ref = useRef<HTMLDivElement>(null);
const isOverflowing = useIsOverflowing(ref);

{isOverflowing && <Tooltip title={text} />}
```

---

### `useMoneyFormatter`

```typescript
// useMoneyFormatter.ts
// Форматирование денежных сумм
```

**Использование:**
```typescript
const formatted = useMoneyFormatter(1234567.89);
// Форматирует число в денежный формат (например: 1 234 567,89 ₽)
```

---

### `useLegacyEffect`

```typescript
// useLegacyEffect.ts
// useEffect с совместимостью для legacy режимов
```

---

### `useEventCallback`

```typescript
// useEventCallback.ts
// Хук для стабилизации callback-функций
```

---

### `useComponentDidMount`

```typescript
// useComponentDidMount.ts
// Аналог componentDidMount
```

**Использование:**
```typescript
useComponentDidMount(() => {
  // Выполняется один раз после монтирования
});
```

---

## Экспорт хуков

Все хуки экспортируются из `src/hooks/index.ts`:

```typescript
export * from './useEventCallback';
export * from './useForkRef';
export * from './useKeeper';
export * from './useMutation';
export * from './useResizeHook';
export * from './useThrottle';
export * from './useComponentDidMount';
export * from './useDebounce';
export * from './useLegacyEffect';
export * from './useCopyToClipboard';
export * from './useStorageData';
export * from './useMoneyFormatter';
export * from './useComponentVisible';
export * from './useEventListener';
export * from './useIsOverflowing';
```

Использование:
```typescript
import { 
  useDebounce, 
  useThrottle, 
  useCopyToClipboard,
  useEventListener 
} from '@sber-orm/ui-kit';
```

---

## Типы хуков

Все хуки написаны на **TypeScript** с полной типизацией:

- Generic-типы для `useDebounce<T>` и `useKeeper<T>`
- Правильные типы для ref-ов (`MutableRefObject`, `ForwardedRef`)
- Учет `useEffect` cleanup-функций
- Proper type narrowing для useState
