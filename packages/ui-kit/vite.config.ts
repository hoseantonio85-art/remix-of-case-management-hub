import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, type UserConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import svgr from 'vite-plugin-svgr';

const requireFromConfig = createRequire(import.meta.url);

const getComponentList = () => {
  const componentsDir = path.resolve(__dirname, 'src/components');
  if (!fs.existsSync(componentsDir)) {
    return [];
  }

  const components = fs
    .readdirSync(componentsDir)
    .filter((item) => {
      const itemPath = path.join(componentsDir, item);
      return (
        fs.statSync(itemPath).isDirectory() &&
        fs.existsSync(path.join(itemPath, 'index.ts'))
      );
    })
    .sort();

  return components;
};

const componentList = getComponentList();

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    entry: path.resolve(__dirname, 'src/index.ts'),
    build: {
      copyPublicDir: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          /^react(\/.*)?$/,
          /^react-dom(\/.*)?$/,
          /^react-dom(\/.*)?$/,
          /^react-dom\/(server|client)(\/.*)?$/,
          /^react-dom\/server-legacy(\/.*)?$/,
          'react-dom/server',
          'react-dom/server.browser',
          'react-dom/server-legacy',
          'react-dom/server-legacy.browser',
        ],
        input: {
          index: path.resolve(__dirname, 'src/index.ts'),
          ...Object.fromEntries(
            componentList.map((component) => [
              `components/${component}/index`,
              path.resolve(__dirname, `src/components/${component}/index.ts`),
            ]),
          ),
          hooks: path.resolve(__dirname, 'src/hooks/index.ts'),
          icons: path.resolve(__dirname, 'src/icons/index.ts'),
          types: path.resolve(__dirname, 'src/types/index.ts'),
        },
        output: {
          hoistTransitiveImports: false,
          preserveModules: false,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'index.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return null;
              }
              if (id.includes('dayjs')) return 'vendor-dayjs';
              if (id.includes('classnames')) return 'vendor-utils';
              if (id.includes('react-imask')) return 'vendor-imask';
              if (id.includes('simplebar-react')) return 'vendor-scroll';
              return 'vendor-other';
            }
            if (id.includes('src/utils/')) return 'shared-utils';
            if (id.includes('src/constants/')) return 'shared-constants';
          },
        },
      },
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'ui-kit',
        formats: ['es'],
      },
      target: 'es2020',
      outDir: 'dist',
      sourcemap: isProduction,
      minify: isProduction ? 'esbuild' : false,
      reportCompressedSize: true,
      emptyOutDir: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
        sass: {
          api: 'modern',
        },
      },
    },
    server: {
      port: 6006,
    },
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      createSvgSpritePlugin({
        exportType: 'vanilla',
        include: path.resolve(__dirname, 'src/icons/**/*.svg'),
        symbolId: 'ui-kit-icon-[name]-[hash]',
      }),
      svgr({
        exportAsDefault: true,
        svgrOptions: {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: /^react$/,
          replacement: requireFromConfig.resolve('react'),
        },
        {
          find: /^react\/jsx-runtime$/,
          replacement: requireFromConfig.resolve('react/jsx-runtime'),
        },
        {
          find: /^react\/jsx-dev-runtime$/,
          replacement: requireFromConfig.resolve('react/jsx-dev-runtime'),
        },
        {
          find: /^react-dom$/,
          replacement: requireFromConfig.resolve('react-dom'),
        },
        {
          find: /^react-dom\/client$/,
          replacement: requireFromConfig.resolve('react-dom/client'),
        },
        {
          find: '@',
          replacement: fileURLToPath(new URL('src', import.meta.url)),
        },
      ],
      dedupe: ['react', 'react-dom'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    esbuild: {
      treeShaking: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    test: {
      environment: 'happy-dom',
      server: {
        deps: {
          inline: [
            /react-aria/,
            /react-stately/,
            /@react-aria/,
            /@react-stately/,
          ],
        },
      },
      deps: {
        optimizer: {
          web: {
            enabled: true,
            include: [
              'imask',
              'react-aria',
              'react-aria-components',
              'react-imask',
              'react-stately',
            ],
          },
        },
      },
      coverage: {
        enabled: true,
        provider: 'istanbul',
        extension: ['.ts'],
      },
    },
  } as UserConfig;
});
