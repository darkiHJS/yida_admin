import { App as AntdApp } from "antd"
import { ThemeProvider, TransitionProvider } from "@/contexts"
import Router from "./router"
function App() {
	return (
		<AntdApp>
			<ThemeProvider>
				<TransitionProvider>
					<Router />
				</TransitionProvider>
			</ThemeProvider>
		</AntdApp>
	)
}

export default App
