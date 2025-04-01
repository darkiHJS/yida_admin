import { Button } from "antd"

const SiderToggle = () => {
	function handleClick() {
		console.log("click")
	}

	return (
		<div className="w-10">
			<Button type="text" block onClick={handleClick}>
				关！
			</Button>
		</div>
	)
}

export default SiderToggle
