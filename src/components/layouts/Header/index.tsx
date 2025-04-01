import { Layout } from "antd"
import { SiderToggle } from "./components"
const { Header: AntdHeader } = Layout
export default function Header() {
	return (
		<AntdHeader>
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
				</div>
				<div className="flex items-center justify-end"></div>
			</div>
		</AntdHeader>
	)
}
