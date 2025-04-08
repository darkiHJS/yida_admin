import { flattenTree } from "@/utils/array"

interface RouteMeta {
	layout?: "blank" | "default"
	public?: boolean
	[key: string]: unknown
}

interface Route {
	name: string
	path?: string
	meta?: RouteMeta
	children?: Route[]
}

const routeMetaConfig: Route[] = [
	{
		name: "登录",
		path: "/login",
		meta: {
			layout: "blank",
			public: true,
		},
	},
]

const flatMetaRoutes = flattenTree(routeMetaConfig)

export function getRouteMeta(path: string) {
	const routeItem = flatMetaRoutes.find((item) => item.path === path)

	if (routeItem && routeItem.meta) {
		return routeItem.meta
	}
	return null
}
