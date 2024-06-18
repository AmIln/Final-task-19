export function useOneAddress(): boolean {
  const checkbox = document.getElementById("one-address") as HTMLInputElement;
  if (checkbox.checked) {
    return true;
  }
  return false;
}
