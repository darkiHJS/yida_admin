import type { TableProps } from "antd"
import type { FormInstance } from "antd/es/form"
import type { Key } from "react"

export interface BasePageList<T> {
	total: number
	list: T[]
}

export interface BasePageParams {
	pageNum: number
	pageSize: number
}

export type ApiResponse<T> = BasePageList<T> | T[]

type UnwrapApiResponse<T> = T extends ApiResponse<infer U>
	? // 如果 T 是 ApiResponse 类型，继续判断 U 的类型
	  U extends BasePageList<infer V>
		? // 如果 U 是 BasePageList 类型，提取出其中的 V 类型
		  V
		: // 如果 U 不是 BasePageList 类型，继续判断 U 是否为数组类型
		U extends Array<infer V>
		? // 如果 U 是数组类型，提取出其中的 V 类型
		  V
		: // 如果 U 既不是 BasePageList 类型也不是数组类型，直接返回 U 类型
		  U
	: // 如果 T 不是 ApiResponse 类型，直接返回 T 类型
	  T

type InferredItem<T> = T extends (params: any) => Promise<infer U>
	? UnwrapApiResponse<U>
	: never

interface QueryState {
	params: Record<string, any>
	page: number
	pageSize: number
}

interface UseTableOptions<
	TApiFn extends (params: any) => Promise<ApiResponse<any>>
> {
	listApiFn: TApiFn
	deleteApiFn?: (id: number) => Promise<void>
	batchDeleteApiFn?: (ids: number[]) => Promise<void>
	key: string
	idKey?: string
	cacheEnabled?: boolean
}
