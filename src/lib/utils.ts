export function formatDate(date: Date): string {
  date = new Date(date)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  const hour = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  return `${day}/${month}/${year} às ${hour}:${minutes}`
}

export function validateEmail(value: string) {
  if (value.includes('@')) {
    const arroba = value.split('@')[1].split('.')[1]

    if (arroba) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export function validateUsername(value: string) {
  if (value.length < 4) return false
  else return true
}

export function validatePassword(value: string) {
  if (value.length === 0) return false
  else return true
}
