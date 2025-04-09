import { useAppStore } from "@/stores/appStore"
import { useShallow } from "zustand/react/shallow"

export const themeScrollbarsConfig = () => {
	const { isDark } = useAppStore(
		useShallow((state) => ({
			isDark: state.isDark,
		}))
	)

	return {
		scrollbars: {
			autoHide: "scroll",
			theme: isDark ? "os-theme-light" : "os-theme-dark",
		},
	} as const
}
