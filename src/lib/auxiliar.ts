export function formatDate(date: Date): string {
  date = new Date(date)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  const hour = date.getHours().toString()
  const minutes = date.getMinutes().toString()

  return `${day}/${month}/${year} ${hour}:${minutes}`
}
