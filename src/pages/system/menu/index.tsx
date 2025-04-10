import { useTable } from "@/hooks/useTable"
import { Divider, Form, Table, Tag } from "antd"

const Menu = () => {
	const { tableProps } = useTable({
		key: "menu",
		pagination: false,
		listApiFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
		},
		deleteApiFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
		},
		scrollY: 300,
		columns: [
			{ title: "菜单名称", dataIndex: "name", key: "name" },
			{ title: "菜单路径", dataIndex: "path", key: "path" },
			{ title: "菜单类型", dataIndex: "type", key: "type" },
		],
	})
	return (
		<div>
			Menu
			<Table {...tableProps} />
		</div>
	)
}

export default Menu
