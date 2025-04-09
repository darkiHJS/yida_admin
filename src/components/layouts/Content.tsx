import type { ReactNode } from "react"
import { Layout } from "antd"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { themeScrollbarsConfig } from "@/contexts"
import { useAppStore } from "@/stores/appStore"
import { useShallow } from "zustand/shallow"
const { Content: AntdContent } = Layout

const Content = ({ children }: { children: ReactNode }) => {
	const { headerHeight } = useAppStore(
		useShallow((state) => ({
			headerHeight: state.headerHeight,
		}))
	)
	return (
		<AntdContent
			style={{ height: `calc(100vh - ${headerHeight}px)` }}
			className="bg-theme-content dark:bg-theme-content-dark"
		>
			<OverlayScrollbarsComponent
				options={themeScrollbarsConfig()}
				defer
				className="h-full bg-theme-content dark:bg-theme-content-dark"
			>
				{children}
			</OverlayScrollbarsComponent>
		</AntdContent>
	)
}

export default Content
