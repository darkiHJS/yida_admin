import type { ReactNode } from "react"
import { Layout } from "antd"
import { Header, Content, Sider } from "@/components/layouts"
const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Layout>
			<Sider />
			<Layout>
				<Header />
				<Content>{children}</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout
