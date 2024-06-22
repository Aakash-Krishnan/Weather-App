export function useLocalStorage(data) {
  if (data) {
    localStorage.set("weather", JSON.stringify(data));
  } else {
    return JSON.parse(localStorage.get("weather"));
  }
}
