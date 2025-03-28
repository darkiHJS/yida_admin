import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"
import Pages from "vite-plugin-pages"
import UnoCSS from "unocss/vite"
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Pages({
			exclude: ["**/component{,s}/**"],
		}),
		UnoCSS(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
})
