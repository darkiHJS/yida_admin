import { useState } from "react"

type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>
type SyncFunction<T extends any[], R> = (...args: T) => R

export const useLoading = () => {
	const [loading, setLoading] = useState(false)
	const start = (): void => setLoading(true)
	const end = (): void => setLoading(false)

	/**
	 * 包装函数以添加异步函数的状态控制
	 * @template T - 异步函数的参数类型
	 * @template R - 异步函数的返回类型
	 * @param fn - 要包装的异步函数
	 * @returns - 包装后的异步函数
	 */
	const wrapper = <T extends any[], R>(
		fn: AsyncFunction<T, R> | SyncFunction<T, R> = () =>
			Promise.resolve() as any
	): AsyncFunction<T, R> => {
		return async (...args: T) => {
			start()
			try {
				const result = await fn(...args)
				return result
			} finally {
				end()
			}
		}
	}
	return {
		loading,
		loadingStart: start,
		loadingEnd: end,
		loadingFnWrapper: wrapper,
	}
}
