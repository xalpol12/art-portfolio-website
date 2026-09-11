/**
 * Removes HTML tags from a string (e.g. titles authored as `<i>Continuum</i>`)
 * so the result is safe to use in `<title>`, meta tags, and JSON-LD.
 */
export function stripHtml(value: string | undefined | null): string {
  if (!value) {
    return '';
  }
  return value.replace(/<[^>]*>/g, '').trim();
}
