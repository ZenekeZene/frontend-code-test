export default {
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
    include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
};
