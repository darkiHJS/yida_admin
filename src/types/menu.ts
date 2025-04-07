enum MENU_TYPE {
	DIRECTORY = "DIRECTORY",
	MENU = "MENU",
	FEATURE = "FEATURE",
}

export interface Menu {
	id: string
	parentId: number | null
	title: string
	code?: string
	icon: string
	type: MENU_TYPE
	path?: string
	children?: Menu[]
}

export type MenuTree = Menu[]

export type FlatMenu = Omit<Menu, "children">
