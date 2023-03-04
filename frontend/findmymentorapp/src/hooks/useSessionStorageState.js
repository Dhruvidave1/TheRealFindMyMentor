import { useState, useEffect } from "react";

// This function will intercept the 'key' and sync it to sessionstorage anytime 'value' is changed
function useSessionStorageState(key, defaultValue) {
  // Set initial 'value' to what we retrieve from session storage @key, or use 'defaultValue' if nothing there
  const [value, setValue] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.sessionStorage.getItem(key) || String(defaultValue)
      );
    } catch (e) {
      value = defaultValue;
    }
    return value;
  });

  // update session storage anytime the 'value' changes
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export { useSessionStorageState };