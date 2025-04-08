import type { ReactNode } from "react"

interface BlankLayoutProps {
	children: ReactNode
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
	return (
		<div
			className="
      bg-theme-layout
      text-theme
      dark:bg-theme-layout-dark
      dark:text-theme-dark
    "
		>
			{children}
		</div>
	)
}

export default BlankLayout
