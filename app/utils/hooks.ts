import { useState, useEffect } from "react";

const get = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch {
    // pass
  }
  return defaultValue;
};

/*
 * Same interface as useState but with a key, e.g. [value, setValue] = useLocalStorage('path.of.key', defaultValue)
 * */
export const useLocalStorage = <T extends JSONValue>(
  key: string,
  defaultValue: T
): [T, (v: T) => void] => {
  const [value, setValue] = useState<T>(() => get(key, defaultValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      //pass
    }
  }, [key, value]);

  return [value, setValue];
};
