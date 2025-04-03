import type { ReactNode } from "react"
import { createContext, use, useState } from "react"

interface TransitionContext {
	isThemeSwiching: boolean
	disableRouteTransitions: () => void
	enableRouteTransitions: () => void
}

const TransitionContext = createContext<TransitionContext>({
	isThemeSwiching: false,
	disableRouteTransitions: () => {},
	enableRouteTransitions: () => {},
})

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
	const [isThemeSwiching, setIsThemeSwiching] = useState(false)
	const disableRouteTransitions = () => {
		setIsThemeSwiching(true)
	}
	const enableRouteTransitions = () => {
		setIsThemeSwiching(false)
	}
	return (
		<TransitionContext
			value={{
				isThemeSwiching,
				disableRouteTransitions,
				enableRouteTransitions,
			}}
		>
			{children}
		</TransitionContext>
	)
}

export const useTransitionControl = () => use(TransitionContext)
