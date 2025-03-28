import type { ReactNode } from "react"

interface AuthGuardProps {
	children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	/**
	 * TODO: Implement auth guard logic here.
	 */

	return children
}

export default AuthGuard
