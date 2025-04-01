import { createHashRouter, RouterProvider } from "react-router-dom"
import { Layout } from "@/layouts"
// @ts-expect-error 我也不知道这么处理这个类型缺失
import routes from "~react-pages"

console.log(routes)
const rootRoutes = [{ path: "/", element: <Layout />, children: [...routes] }]

export default function Router() {
	const router = createHashRouter(rootRoutes)
	return <RouterProvider router={router} />
}
