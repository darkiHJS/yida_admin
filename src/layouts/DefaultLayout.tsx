import type { ReactNode } from "react"
import { Layout } from "antd"
import { Header, Content } from "@/components/layouts"
const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<Layout>
			<Layout>
				<Header />
				<Content>{children}</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout
