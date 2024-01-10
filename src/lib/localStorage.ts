export function GetItem(key: string) {
  return localStorage.getItem(key)
}

export function RemoveItem(key: string) {
  localStorage.removeItem(key)
}

export function SetItem(key: string, value: string) {
  localStorage.setItem(key, value)
}
