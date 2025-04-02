import { useMemo } from "react"
import { Breadcrumb } from "antd"
import { useLocation, Link } from "react-router-dom"
const BreadcrumbNav = () => {
	const location = useLocation()

	return <Breadcrumb items={[]} />
}

export default BreadcrumbNav
