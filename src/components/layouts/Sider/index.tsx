import { Layout } from "antd"
import "overlayscrollbars/overlayscrollbars.css"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "@/stores/appStore"

const { Sider: AntdSider } = Layout
const Sider = () => {
	const {} = useAppStore(
		useShallow((state) => ({
			headerHeight: state.headerHeight,
			sidebarWidth: state.sidebarWidth,
			sidebarCollapsed: state.sidebarCollapsed,
			sidebarCollapsedWidth: state.sidebarCollapsedWidth,
		}))
	)
	return <AntdSider></AntdSider>
}

export default Sider
