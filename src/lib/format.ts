// One date format across every surface (the old list and post page disagreed).
export function formatDate(date: string): string {
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}
