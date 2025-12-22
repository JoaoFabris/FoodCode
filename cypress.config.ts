import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    setupNodeEvents(on, config) {
      // implemente node event listeners aqui
    },
  },
});
