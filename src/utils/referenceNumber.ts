export function generateTemporaryReferenceNumber(): string {
  // Format: FR-YYYY-XXXXX
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `FR-${year}-${randomNum}`;
}
