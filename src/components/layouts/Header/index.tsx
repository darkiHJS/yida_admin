import type { CSSProperties } from "react"
import { Layout } from "antd"
import { useShallow } from "zustand/react/shallow"
import { useAppStore } from "@/stores/appStore"

import { SiderToggle, BreadcrumbNav } from "./components"
const { Header: AntdHeader } = Layout
export default function Header() {
	// 从appStore获取header高度
	const { headerHeight } = useAppStore(
		useShallow((state) => ({
			headerHeight: state.headerHeight,
		}))
	)

	const style: CSSProperties = {
		height: `${headerHeight}px`,
		lineHeight: `${headerHeight}px`,
		paddingInline: 0,
	}
	return (
		<AntdHeader style={style}>
			<div
				className="
      h-full
      flex 
      items-center
      justify-between
      border-b-solid
      border-light-500
      bg-theme-layout
      dark:bg-theme-layout-dark
      dark:border-dark-700
      px-3
    "
			>
				<div className="flex items-center gap-2">
					<SiderToggle />
					<BreadcrumbNav />
				</div>
				<div className="flex items-center justify-end"></div>
			</div>
		</AntdHeader>
	)
}
