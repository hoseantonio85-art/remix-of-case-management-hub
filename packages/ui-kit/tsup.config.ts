import { sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
  sourcemap: false,
  entry: ['src/index.ts'],
  dts: {
    resolve: true,
    only: true,
  },
  tsconfig: './tsconfig.json',
  outDir: './dist',
  format: 'esm',
  esbuildPlugins: [sassPlugin()],
});
