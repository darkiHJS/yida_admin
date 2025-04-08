import { Outlet, useLocation } from "react-router-dom"
import { AuthGuard } from "@/components/auth-guard"
import { DefaultLayout, BlankLayout } from "@/layouts"
import { getRouteMeta } from "@/router/routeMeta"
import { useTransitionControl } from "@/contexts"
export default function Layout() {
	const location = useLocation()
	const routeMeta = getRouteMeta(location.pathname)

	const { isThemeSwiching } = useTransitionControl()

	if (!routeMeta?.layout || routeMeta.layout === "default") {
		return (
			<AuthGuard>
				<DefaultLayout>
					<div
						style={{ viewTransitionName: isThemeSwiching ? "none" : "page" }}
					>
						<Outlet />
					</div>
				</DefaultLayout>
			</AuthGuard>
		)
	}
	return (
		<AuthGuard>
			<BlankLayout>
				<Outlet />
			</BlankLayout>
		</AuthGuard>
	)
}
