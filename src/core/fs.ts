import fs from 'node:fs';
import path from 'node:path';

export function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

export function writeJson(filePath: string, value: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

export function ensureDir(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function copyDir(src: string, dest: string): void {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

export function walkFiles(dir: string): string[] {
  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walkFiles(full));
    else result.push(full);
  }
  return result;
}

export function replaceInFile(filePath: string, replacements: Record<string, string>): void {
  const ext = path.extname(filePath).toLowerCase();
  const textLike = new Set(['.md', '.txt', '.json', '.example', '.yml', '.yaml']);
  const base = path.basename(filePath);
  if (!textLike.has(ext) && !base.includes('.json') && !base.endsWith('.md')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of Object.entries(replacements)) {
    content = content.split(from).join(to);
  }
  fs.writeFileSync(filePath, content);
}

export function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function removeIfExists(filePath: string): void {
  if (fs.existsSync(filePath)) fs.rmSync(filePath, { recursive: true, force: true });
}
