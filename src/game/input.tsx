export function attachKeyboard(keys: Set<string>) {
  const down = (e: KeyboardEvent) => keys.add(e.key.toLowerCase());
  const up = (e: KeyboardEvent) => keys.delete(e.key.toLowerCase());
  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);
  return () => {
    window.removeEventListener("keydown", down);
    window.removeEventListener("keyup", up);
  };
}
