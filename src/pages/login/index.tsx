import { ThemeToggle } from "@/components/common"
import { Icon } from "@/components/icon"
import useAuthNavigation from "@/hooks/useAuthNavigation"
import { useLoading } from "@/hooks/useLoading"
import { LoginInfo } from "@/types/user"
import { Button, Checkbox, CheckboxProps, Form, Input, Typography } from "antd"
import { useEffect, useState } from "react"
import { deCode, enCode } from "@/utils/string"

const Page = () => {
	const [form] = Form.useForm()
	const { login } = useAuthNavigation()
	const { loading, loadingFnWrapper } = useLoading()

	/**
	 * 记住我
	 */
	const [isRemember, setIsRemember] = useState(false)
	const rememberKey = enCode("LOGIN_REMEMBER")
	const rememberValueTrue = enCode("LOGIN_REMEMBER_TRUE")
	const rememberUsernameKey = enCode("LOGIN_REMEMBER_USERNAME")
	const rememberPasswordKey = enCode("LOGIN_REMEMBER_PASSWORD")

	useEffect(() => {
		if (localStorage.getItem(rememberKey) === rememberValueTrue) {
			setRemember()
		}
	}, [])

	const onRememberChange: CheckboxProps["onChange"] = (e) => {
		if (!e.target.checked) {
			clearRemember()
		} else {
			setIsRemember(true)
		}
	}

	function onForgot() {
		// 跳转到忘记密码页面
	}

	async function handleLogin(data: LoginInfo) {
		await login(data)
		if (isRemember) {
			saveRemember(data)
		}
	}
	function onFinish(data: LoginInfo) {
		handleLogin(data)
	}

	function setRemember() {
		const remember = localStorage.getItem(rememberKey)
		if (remember === rememberValueTrue) {
			const username = deCode(localStorage.getItem(rememberUsernameKey) || "")
			const password = deCode(localStorage.getItem(rememberPasswordKey) || "")
			form.setFieldsValue({
				username,
				password,
			})
			setIsRemember(true)
		}
	}

	function saveRemember({ username, password }: LoginInfo) {
		localStorage.setItem(rememberKey, rememberValueTrue)
		localStorage.setItem(rememberUsernameKey, enCode(username))
		localStorage.setItem(rememberPasswordKey, enCode(password))
	}

	function clearRemember() {
		localStorage.removeItem(rememberKey)
		localStorage.removeItem(rememberUsernameKey)
		localStorage.removeItem(rememberPasswordKey)
	}
	return (
		<div className="relative bg-login dark:bg-login-dark">
			<div className="min-h-[80vh] w-screen flex flex-col items-center justify-center py-10">
				<div className="space-y-4">
					<div className="flex items-center justify-center gap-4 text-center text-white/88 dark:text-black/85">
						<Icon
							icon="material-symbols:counter-9-outline-rounded"
							className="block text-5xl"
						/>
						<div className="text-3xl font-bold">
							{import.meta.env.VITE_APP_TITLE}
						</div>
					</div>
					<div className="w-80 border rounded-xl bg-white/80 p-4 shadow transition-all dark:bg-black/80 hover:shadow-2xl">
						<Form
							form={form}
							initialValues={{
								username: "admin",
								password: "123456",
							}}
							size="large"
							validateTrigger={["onChange", "onBlur"]}
							onFinish={onFinish}
						>
							<Form.Item
								name="username"
								rules={[
									{
										required: true,
										message: "请输入用户名",
									},
								]}
							>
								<Input
									disabled={loading}
									size="large"
									allowClear
									placeholder="请输入用户名"
									prefix={<Icon icon="tabler:user" />}
								/>
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: "请输入密码",
									},
								]}
							>
								<Input.Password
									disabled={loading}
									size="large"
									allowClear
									placeholder={"请输入密码"}
									prefix={<Icon icon="tabler:lock" />}
								/>
							</Form.Item>
							<div className="mb-4 flex flex-row justify-between">
								<Checkbox
									checked={isRemember}
									disabled={loading}
									className="cursor-pointer select-none"
									onChange={onRememberChange}
								>
									记住我
								</Checkbox>
								<Typography.Link
									className="cursor-pointer select-none"
									onClick={onForgot}
								>
									忘记密码
								</Typography.Link>
							</div>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									size="large"
									block
									color="default"
								>
									{loading ? "登录中..." : "登录"}
								</Button>
							</Form.Item>
						</Form>
						<div className="flex justify-end">
							<ThemeToggle animate={false} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
