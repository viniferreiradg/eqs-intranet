import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../../componentes/**/*.mdx',
    '../../componentes/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.base = '/storybook-ui/';
    // Componentes vivem fora do root do vite (../componentes) — liberar no dev server
    config.server = {
      ...config.server,
      fs: { ...config.server?.fs, allow: ['..'] },
    };
    return config;
  },
};
export default config;