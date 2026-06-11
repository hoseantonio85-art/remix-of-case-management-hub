import { createRequire } from 'node:module';

const requireFromConfig = createRequire(import.meta.url);

const reactAliases = [
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
    find: /^react-dom\/server$/,
    replacement: requireFromConfig.resolve('react-dom/server.browser'),
  },
];

export default {
  stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-controls'],
  framework: {
    name: '@storybook/react-vite',

    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  typescript: {
    reactDocgen: true,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  staticDirs: ['../static'],
  async viteFinal(config) {
    const aliases = Array.isArray(config.resolve?.alias)
      ? config.resolve.alias
      : Object.entries(config.resolve?.alias ?? {}).map(
          ([find, replacement]) => ({
            find,
            replacement,
          }),
        );

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [...reactAliases, ...aliases],
        dedupe: Array.from(
          new Set([...(config.resolve?.dedupe ?? []), 'react', 'react-dom']),
        ),
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        include: Array.from(
          new Set([
            ...(config.optimizeDeps?.include ?? []),
            'react',
            'react-dom',
            'react/jsx-runtime',
            'react/jsx-dev-runtime',
          ]),
        ),
      },
    };
  },
};
