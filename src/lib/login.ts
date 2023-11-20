export function GetLogin() {
  return sessionStorage.getItem('login')
}

export function SetLogin(id: string) {
  sessionStorage.setItem('login', id)
}

export function RemoveLogin() {
  sessionStorage.removeItem('login')
}
