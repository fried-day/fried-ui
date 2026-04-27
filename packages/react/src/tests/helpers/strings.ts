function camelToKebab(value: string): string {
  return value.replaceAll(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).replace(/^-/, "");
}

function escapeRegex(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export { camelToKebab, escapeRegex };
