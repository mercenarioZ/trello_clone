import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  define: {
    "process.env": process.env,
  },

  build: {
    /** If you set esmExternals to true, this plugins assumes that 
      all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
  },

  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
