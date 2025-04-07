import { useMemo } from "react"
import { useLocation, useNavigate, useMatches } from "react-router-dom"
import { useShallow } from "zustand/react/shallow"

import type { LoginInfo } from "@/types/user"

import { useUserStore } from "@/stores/userStore"

const useAuthNavigation = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const matches = useMatches()

	const {
		login: storeLogin,
		logout: storeLogout,
		flatUserMenus,
	} = useUserStore(
		useShallow((state) => ({
			login: state.login,
			logout: state.logout,
			flatUserMenus: state.flatUserMenus,
		}))
	)

	const matchedMenuPath = useMemo(() => {
		const possiblePaths = [...matches].map((item) => item.pathname).reverse()
		const menuPathMap = new Set(flatUserMenus.map((item) => item.path))
		const matchedPath = possiblePaths.find((item) => menuPathMap.has(item))

		if (!matchedPath) {
			return ""
		}
		if (matchedPath === "/" && location.pathname !== "/") {
			return ""
		}

		return matchedPath
	}, [flatUserMenus, location.pathname, matches])

	async function login(data: LoginInfo, redirectPath?: string) {
		try {
			const targetPath = redirectPath || "/"

			await storeLogin(data)
			navigate(targetPath)
		} catch (error) {
			console.error(error)
			throw error
		}
	}
	function logout(redirectPath?: string) {
		const currentPath = redirectPath || location.pathname
		storeLogout()
		navigate(
			redirectPath !== "/" && redirectPath !== "/login"
				? `/login?redirect=${encodeURIComponent(currentPath)}`
				: `/login`
		)
	}

	return {
		login,
		logout,
		matchedMenuPath,
	}
}

export default useAuthNavigation
