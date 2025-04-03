import type { FC } from "react"
import { Button } from "antd"
import { useAnimateTheme } from "@/hooks/useAnimateTheme"
import { Icon } from "@/components/icon"
const ThemeToggle: FC<{ animate?: boolean }> = ({ animate = true }) => {
	const { triggerRef, isDark, isLoading, toggleTheme, animateToggleTheme } =
		useAnimateTheme()

	const handleClick = () => {
		if (animate) {
			animateToggleTheme()
		} else {
			toggleTheme()
		}
	}

	return (
		<div className="w-10">
			<Button
				ref={triggerRef}
				type="text"
				onClick={handleClick}
				disabled={isLoading}
				block
				icon={
					<Icon
						icon={isDark ? "icon-park-outline:moon" : "icon-park-outline:sun"}
						className="text-base dark:text-theme-dark text-orange-300"
					/>
				}
			/>
		</div>
	)
}

export default ThemeToggle
