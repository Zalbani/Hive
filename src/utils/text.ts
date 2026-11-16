export function toPhoneHref(phone: string): string {
  return `tel:${phone.replaceAll(' ', '')}`
}
