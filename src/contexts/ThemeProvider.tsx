import { useEffect, type ReactNode } from "react"
import { ConfigProvider, theme } from "antd"
import { useAppStore } from "@/stores/appStore"
import { useShallow } from "zustand/react/shallow"
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const { isDark } = useAppStore(
		useShallow((state) => ({
			isDark: state.isDark,
		}))
	)
	useEffect(() => {
		const root = window.document.documentElement
		if (isDark) {
			root.classList.add("dark")
		} else {
			root.classList.remove("dark")
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = (e: MediaQueryListEvent) => {
			useAppStore.getState().setTheme(e.matches)
		}
		mediaQuery.addEventListener("change", handleChange)

		return () => {
			mediaQuery.removeEventListener("change", handleChange)
		}
	}, [isDark])
	return (
		<ConfigProvider
			theme={{
				algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			{children}
		</ConfigProvider>
	)
}
