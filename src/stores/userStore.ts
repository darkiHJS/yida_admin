import { create } from "zustand"
// 用来做localStorage持久化
import { persist } from "zustand/middleware"
import type { Menu } from "@/types/menu"
import type { AuthTokens, LoginInfo, UserInfo } from "@/types/user"
interface UserStore {
	// 认证相关
	accessToken: string | null
	refreshToken: string | null
	isLogin: boolean
	setAllToken: (token: { accessToken: string; refreshToken: string }) => void
	clearAllToken: () => void
	setIsLogin: (isLogin: boolean) => void

	// 用户信息相关
	userInfo: UserInfo | null
	userMenus: Menu[]
	flatUserMenus: Omit<Menu, "children">[]
	menuPermissions: string[]
	featurePermissions: string[]

	// 操作方法
	fetchUserInfo: () => Promise<void>
	clearUserInfo: () => void
	login: (data: LoginInfo, redirectPath?: string) => Promise<AuthTokens>
	logout: (currentPath?: string) => void
}

export const useUserStore = create<UserStore>()(
	persist(
		(set, get) => ({
			accessToken: null,
			refreshToken: null,
			isLogin: false,

			setAllToken: ({ accessToken, refreshToken }) =>
				set({ accessToken, refreshToken }),
			clearAllToken: () => set({ accessToken: null, refreshToken: null }),
			setIsLogin: (isLogin: boolean) => set({ isLogin }),
			userInfo: null,

			userMenus: [],
			flatUserMenus: [],
			menuPermissions: [],
			featurePermissions: [],
			fetchUserInfo: async () => {
				try {
					// const userInfoRes = await getUserInfoApi()
					set({
						userInfo: null,
						userMenus: [],
						flatUserMenus: [],
						menuPermissions: [],
						featurePermissions: [],
					})
				} catch (error) {
					console.error("Failed to fetch user info:", error)
					throw error
				}
			},
			clearUserInfo: () => set({ userInfo: null }),
			login: async () => {
				try {
					// const loginRes = await loginApi(data)
					const loginRes = Promise.resolve({
						accessToken: "123",
						refreshToken: "234",
					})
					// 设置令牌
					get().setAllToken({ accessToken: "", refreshToken: "" })
					get().setIsLogin(true)

					return loginRes
				} catch (error) {
					console.error("Failed to login:", error)
					throw error
				}
			},
			logout: async () => {
				get().clearAllToken()
				get().clearUserInfo()
				get().setIsLogin(false)
			},
		}),
		{
			name: "user-storage",
			// 持久化字段
			partialize: (state) => ({
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
				isLogin: state.isLogin,
			}),
		}
	)
)
