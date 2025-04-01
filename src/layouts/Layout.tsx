import { Outlet, useLocation } from "react-router-dom"
import { AuthGuard } from "@/components/auth-guard"
import { DefaultLayout } from "@/layouts"
export default function Layout() {
	// const location = useLocation()

	return (
		<AuthGuard>
			<DefaultLayout>
				<Outlet />
			</DefaultLayout>
		</AuthGuard>
	)
}
