export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MiB`;

  return `${(bytes / 1024 ** 3).toFixed(2)} GiB`;
}

export function joinPath(basePath: string, itemName: string) {
  return [basePath, itemName].filter(Boolean).join('/');
}

export function parentPath(path: string) {
  return path.split('/').slice(0, -1).join('/');
}
