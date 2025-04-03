import type { MenuProps } from "antd"
import { App, Button, Dropdown } from "antd"
import { useNavigate } from "react-router-dom"
import { useShallow } from "zustand/react/shallow"

const UserDropdown = () => {
	const navigate = useNavigate()
	const { modal } = App.useApp()
	return (
		<Dropdown
			placement="bottomRight"
			overlayStyle={{
				minWidth: "100px",
				maxWidth: "200px",
			}}
			menu={{}}
		>
			<div>
				<Button type="primary" onClick={() => navigate("/user")}>
					用户
				</Button>
			</div>
		</Dropdown>
	)
}

export default UserDropdown
