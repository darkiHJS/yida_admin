import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppStore {
	// layout
	headerHeight: number
	sidebarWidth: number
	sidebarCollapsedWidth: number
	sidebarCollapsed: boolean
	toggleSidebarCollapsed: () => void

	// theme
	isDark: boolean
	toggleTheme: () => void
	setTheme: (isDark: boolean) => void

	// Locale
	currentLocale: string
	setLocale: (locale: string) => void
}

function getSystemThemePreference(): boolean {
	if (typeof window !== "undefined") {
		return (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		)
	}
	return false
}

export const useAppStore = create<AppStore>()(
	persist(
		(set, _get) => ({
			// layout
			headerHeight: 64,
			sidebarWidth: 240,
			sidebarCollapsedWidth: 64,
			sidebarCollapsed: false,
			toggleSidebarCollapsed: () =>
				set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

			// theme
			isDark: getSystemThemePreference(),
			toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
			setTheme: (isDark: boolean) => set({ isDark }),

			// Locale
			currentLocale: "zh",
			setLocale: (locale: string) => set({ currentLocale: locale }),
		}),
		{
			name: "app-store",
			partialize: (state) => ({
				isDark: state.isDark,
				sidebarCollapsed: state.sidebarCollapsed,
				currentLocale: state.currentLocale,
			}),
		}
	)
)
