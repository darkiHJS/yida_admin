import { Layout } from "antd"
import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "@/stores/appStore"

import Logo from "./Logo"
import Menu from "./Menu"
const { Sider: AntdSider } = Layout
const Sider = () => {
	const {
		headerHeight,
		sidebarWidth,
		sidebarCollapsed,
		sidebarCollapsedWidth,
		toggleSidebarCollapsed,
	} = useAppStore(
		useShallow((state) => ({
			headerHeight: state.headerHeight,
			sidebarWidth: state.sidebarWidth,
			sidebarCollapsed: state.sidebarCollapsed,
			sidebarCollapsedWidth: state.sidebarCollapsedWidth,
			toggleSidebarCollapsed: state.toggleSidebarCollapsed,
		}))
	)

	function handleCollapse() {
		toggleSidebarCollapsed()
	}

	return (
		<AntdSider
			collapsed={sidebarCollapsed}
			className="z-1"
			collapsible
			width={sidebarWidth}
			collapsedWidth={sidebarCollapsedWidth}
			trigger={null}
			onCollapse={handleCollapse}
		>
			<div className="h-full select-none border-r border-r-light-200 border-r-solid bg-theme-layout shadow-md dark:border-r-dark-900 dark:bg-[#141414]">
				<Logo />
				<OverlayScrollbarsComponent
					options={{
						scrollbars: {
							autoHide: "scroll",
						},
					}}
					defer
					style={{
						height: `calc(100vh - ${headerHeight}px)`,
					}}
				>
					<Menu />
				</OverlayScrollbarsComponent>
			</div>
		</AntdSider>
	)
}

export default Sider
