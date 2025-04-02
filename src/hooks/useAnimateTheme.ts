import { useCallback, useEffect, useRef, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "@/stores/appStore"
import { useTransitionContext } from "@/contexts/TransitionContext"
const isBrowser = typeof window !== "undefined"

function injectBaseStyle() {
	if (!isBrowser) return

	const styleId = "theme-switch-base-style"
	if (document.getElementById(styleId)) return

	const style = document.createElement("style")
	style.id = styleId
	style.textContent = `
    html.stop-transition * {
      transition: none !important;
    }
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ::view-transition-old(root),
    .dark::view-transition-new(root) {
      z-index: 1;
    }
    ::view-transition-new(root),
      .dark::view-transition-old(root) {
      z-index: 9999;
    }   
  `
	document.head.appendChild(style)
}

export interface UseAnimateThemeOptions {
	duration?: number
	easing?: string
}

export function useAnimateTheme(options?: UseAnimateThemeOptions = {}) {
	const { duration = 800, easing = "ease-in-out" } = options

	const { isDark, toggleTheme } = useAppStore(
		useShallow((state) => ({
			isDark: state.isDark,
			toggleTheme: state.toggleTheme,
		}))
	)

	const { disableRouteTransitions, enableRouteTransitions } =
		useTransitionContext()

	const [isLoading, setIsLoading] = useState(false)
	const triggerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		injectBaseStyle()
	}, [])

	const animateToggleTheme = useCallback(async () => {
		if (isLoading) return
		setIsLoading(true)
		if (
			!triggerRef.current ||
			!document.startViewTransition ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			toggleTheme()
			setIsLoading(false)
			return
		}
	})
}
