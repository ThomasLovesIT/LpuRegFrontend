export default defineConfig({
  plugins: [react()],
  // Remove the build object or comment it out to use the default 'dist'
  // build: {
  //   outDir: 'build', 
  // },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})