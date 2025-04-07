import { defineConfig } from "vite"
import { fileURLToPath, URL } from "node:url"
import react from "@vitejs/plugin-react"
import Pages from "vite-plugin-pages"
import UnoCSS from "unocss/vite"

/**
 * mock server
 */
import { viteMockServe } from "vite-plugin-mock"

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [
		react(),
		Pages({
			exclude: ["**/component{,s}/**"],
		}),
		UnoCSS(),
		viteMockServe({
			mockPath: "mock",
			watchFiles: true,
			enable: command === "serve",
			logger: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
}))
