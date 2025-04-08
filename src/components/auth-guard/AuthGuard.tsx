import { useUserStore } from "@/stores/userStore"
import { useEffect, useState, type ReactNode } from "react"
import { useShallow } from "zustand/shallow"
import { getRouteMeta } from "@/router/routeMeta"
import { Navigate, useLocation } from "react-router-dom"

interface AuthGuardProps {
	children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	const [hydrated, setHydrated] = useState(false)

	// 首次加载时执行
	useEffect(() => {
		const initialize = async () => {
			if (!useUserStore.persist.hasHydrated()) {
				await useUserStore.persist.rehydrate()
			}
			setHydrated(true)
		}
		initialize()
	}, [])

	const { isLogin, fetchUserInfo, userInfo, menuPermissions } = useUserStore(
		useShallow((state) => ({
			isLogin: state.isLogin,
			fetchUserInfo: state.fetchUserInfo,
			userInfo: state.userInfo,
			menuPermissions: state.menuPermissions,
		}))
	)
	const location = useLocation()
	// const { hasPermission } = usePermission()
	const routeMeta = getRouteMeta(location.pathname)

	useEffect(() => {
		if (isLogin && !userInfo) {
			fetchUserInfo()
		}
	}, [isLogin, userInfo, fetchUserInfo])

	// if (!hydrated) {
	// 	return null
	// }
	// 放行公共路由
	if (routeMeta?.public) {
		return children
	}

	// 未登录
	if (!isLogin) {
		return (
			<Navigate
				to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
				replace
			/>
		)
	}

	// if (!userInfo) {
	// 	return null
	// }

	// 权限检查
	if (routeMeta?.permission) {
		return <Navigate to="/exception/403" replace />
	}

	return children
}

export default AuthGuard
