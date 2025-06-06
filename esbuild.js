import { context, build } from 'esbuild';
import { rmSync } from 'fs';

const isWatch = process.argv.includes('--watch');
const isProduction = process.argv.includes('--production');

rmSync('dist', { recursive: true, force: true });

const buildOptions = {
  entryPoints: ['./src/extension.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  sourcemap: !isProduction,
  outfile: './dist/extension.js',
  external: ['vscode'],
};

if (isWatch) {
  const ctx = await context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await build(buildOptions);
  console.log('Build complete');
}
