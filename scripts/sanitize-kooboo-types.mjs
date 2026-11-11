import { readFile, writeFile } from 'node:fs/promises';

const typesFile = new URL('../kooboo.d.ts', import.meta.url);
const placeholders = {
  accessKeyId: '<YOUR_AWS_ACCESS_KEY_ID>',
  secretAccessKey: '<YOUR_AWS_SECRET_ACCESS_KEY>',
};

try {
  const source = await readFile(typesFile, 'utf8');
  let replacements = 0;

  // Only redact example values in comments; preserve the API declarations.
  const sanitized = source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(
      /((['"]?)(accessKeyId|secretAccessKey)\2\s*:\s*)(['"`])[^'"`\r\n]*\4/g,
      (match, prefix, _keyQuote, key, quote) => {
        const replacement = `${prefix}${quote}${placeholders[key]}${quote}`;
        if (replacement !== match) replacements += 1;
        return replacement;
      },
    ),
  );

  if (sanitized !== source) await writeFile(typesFile, sanitized, 'utf8');
  console.log(`kooboo.d.ts: sanitized ${replacements} AWS credential values.`);
} catch {
  // Never print source snippets or credential values on failure.
  console.error('Unable to sanitize kooboo.d.ts. Check that the file exists and is writable.');
  process.exitCode = 1;
}
