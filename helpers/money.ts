export function parseCurrency(text: string): number {
  // e.g. "$43.18" -> 43.18
  return Number(text.replace(/[^\d.]/g, ''));
}
