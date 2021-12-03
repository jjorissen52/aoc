import { useState, useEffect } from "react";

const get = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  try {
    if (saved) return JSON.parse(saved);
  } catch {
    // pass
  }
  return defaultValue;
};

/*
 * Same interface as useState but with a key, e.g. [value, setValue] = useLocalStorage('path.of.key', defaultValue)
 * */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (v: T) => void] => {
  const [value, setValue] = useState<T>(() => get(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
