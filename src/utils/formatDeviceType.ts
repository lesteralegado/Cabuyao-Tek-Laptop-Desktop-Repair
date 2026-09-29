export function formatDeviceType(value: string): string {
  const normalized = value.trim().toLowerCase();
  return normalized ? normalized[0].toUpperCase() + normalized.slice(1) : '';
}
