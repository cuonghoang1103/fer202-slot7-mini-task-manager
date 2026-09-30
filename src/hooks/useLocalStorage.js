import { useEffect, useState } from "react";

// Custom hook: giong useState nhung tu luu vao localStorage
// => tai lai trang (F5) van con du lieu
export function useLocalStorage(key, initialValue) {
  // ham truyen vao useState chi chay 1 lan luc dau
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // moi khi value doi thi ghi lai vao localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
