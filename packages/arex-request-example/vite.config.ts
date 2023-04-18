import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/arex-request-runtime/lib/index.js',
          dest: '',
          rename: 'arex-request-runtime.js',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      // 'arex-request-core': path.resolve('../arex-request-core/src'),
    },
  },
  base: 'arex-request',
});
