import { useCallback, useEffect, useState } from "react";

/** Use local storage return type. */
export type UseLocalStorageReturnType<T=unknown> = {
  value: T;
  setItem: (value: T) => void;
}

/**
 * Hook to manage local storage.
 * @param { string } key - The key of the value.
 * @param { T } initialValue - The initial value.
 * @returns { UseLocalStorageReturnType<T> }
 */
export function useLocalStorage<T=unknown>(key: string, initialValue: T): UseLocalStorageReturnType<T> {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);

    if (item) {     
      try {
        setValue(item ? JSON.parse(item) : null);
      } catch (e) {
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

	/**
	 * Set the local storage item.
	 * @param { T } value - The value to set.
	 * @returns { void }
	 */
  const setItem = useCallback((value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  }, [key]);

  return { value, setItem };
}
