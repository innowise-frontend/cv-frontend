export function displayBreadcrumbLabel(label: string) {
  const trimmed = label.trim();

  if (!trimmed) {
    return label;
  }

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
