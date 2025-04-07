import type { MenuProps } from "antd"

import { Menu as AntdMenu } from "antd"
import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useShallow } from "zustand/react/shallow"

import { Icon } from "@/components/icon"
import { useUserStore } from "@/stores/userStore"
import useAuthNavigation from "@/hooks/useAuthNavigation"
import { mapTree } from "@/utils/array"
import styles from "./Menu.module.less"
const Menu = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { userMenus, flatUserMenus } = useUserStore(
		useShallow((state) => ({
			userMenus: state.userMenus,
			flatUserMenus: state.flatUserMenus,
		}))
	)

	const { matchedMenuPath } = useAuthNavigation()

	const selectedKeys = useMemo(() => {
		const selectedItem = flatUserMenus.find(
			(item) => item.path === matchedMenuPath
		)
		return selectedItem ? [selectedItem.id.toString()] : []
	}, [flatUserMenus, matchedMenuPath])

	const defaultOpenKeys = useMemo(() => {
		const selectedItem = flatUserMenus.find(
			(item) => item.path === matchedMenuPath
		)
		return selectedItem?.parentId ? [selectedItem.parentId.toString()] : []
	}, [flatUserMenus, matchedMenuPath])

	const items = useMemo(() => {
		return mapTree(userMenus, (item) => {
			const title = item.title
			return {
				key: item.id.toString(),
				label: <span className="text-sm">{title}</span>,
				icon: item.icon && <Icon className="!text-xl" icon={item.icon} />,
				...(item.parentId ? { title } : {}),
			}
		})
	}, [userMenus])

	const handleClick: MenuProps["onClick"] = ({ key }) => {
		const selectedItem = flatUserMenus.find(
			(item) => item.id.toString() === key
		)
		if (selectedItem?.path && selectedItem.path !== location.pathname) {
			navigate(selectedItem.path, { viewTransition: true })
		}
	}

	return (
		<AntdMenu
			items={items}
			defaultOpenKeys={defaultOpenKeys}
			selectedKeys={selectedKeys}
			mode="inline"
			onClick={handleClick}
			className={`${styles.menuWrapper} !border-r-0`}
		/>
	)
}

export default Menu
