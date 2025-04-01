import type { ReactNode } from "react"
import { Layout } from "antd"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
const { Content: AntdContent } = Layout

const Content = ({ children }: { children: ReactNode }) => {
	return (
		<AntdContent className="bg-theme-content dark:bg-theme-content-dark">
			<OverlayScrollbarsComponent
				options={{
					scrollbars: {
						autoHide: "scroll",
					},
				}}
				defer
				className="h-full bg-theme-content dark:bg-theme-content-dark"
			>
				{children}
			</OverlayScrollbarsComponent>
		</AntdContent>
	)
}

export default Content
