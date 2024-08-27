import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), manualChunksPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
      '@layouts': resolve(__dirname, './src/layouts'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    port: 8000, // 项目启动时的端口号
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. 优先级最高：将 antd 相关的代码打包到 antd-chunk
          if (id.includes('/antd/')) {
            return 'antd-chunk';
          }
          // 2. 次高优先级：将 react-dom 相关的代码打包到 reactDom
          if (id.includes('/react-dom/')) {
            return 'reactDom';
          }
          // 3. 最低优先级：将所有其他 node_modules 相关的代码打包到 vendors-chunk
          if (id.includes('/node_modules/')) {
            return 'vendors-chunk';
          }
        },
      },
    },
  },
});
