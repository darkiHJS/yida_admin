import { Form, type TableProps } from "antd"
import type { FormInstance } from "antd/es/form"
import { useEffect, useMemo, useState, type Key } from "react"
import { useLocation } from "react-router-dom"

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
	dataStaleTime?: number
	pagination?: boolean
	selectable?: boolean
	formInitialvalues?: Record<string, any>
	columns: TableProps<any>["columns"]
	scrollX?: string | number
	scrollY?: string | number
	pageCreatePath?: string
	pageEditPath?: string
}

function isPageResponse<T>(data: ApiResponse<T>): data is BasePageList<T> {
	return !Array.isArray(data) && "total" in data && "list" in data
}

export function useTable<
	TApiFn extends (params: any) => Promise<ApiResponse<any>>
>({
	listApiFn,
	deleteApiFn,
	batchDeleteApiFn,
	key,
	idKey = "id",
	cacheEnabled = true,
	dataStaleTime = 60000,
	pagination = true,
	selectable = false,
	formInitialvalues = {},
	columns,
	scrollX = "100%",
	scrollY,
	pageCreatePath,
	pageEditPath,
}: UseTableOptions<TApiFn>) {
	// const {} = usePageTransfer()

	const needsForm = Object.keys(formInitialvalues).length > 0

	// 创建form实例
	const [form] = needsForm ? Form.useForm() : [null]

	const location = useLocation()

	// --------- 状态 ------------
	// 分页
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)

	// 查询
	const [queryState, setQueryState] =
		useState<Record<string, any>>(formInitialvalues)

	// 选择状态
	const [selectedState, setSelectedState] = useState<number[]>([])
	const selectedCount = useMemo(() => selectedState.length, [selectedState])
	const selectedIsEmpty = useMemo(() => selectedCount === 0, [selectedCount])

	const listQueryKey = `${key}-list`
	const stateQueryKey = `${key}-list-state`

	// // 初始化 cache 状态
	// useEffect(() => {

	// }, [])

	// --------- query & data fetching -----------
	// const {} = useQuery({

	// })
	const isLoading = false
	const refetch = () => {}
	// ------- action -------
	const handleSearch = async () => {
		try {
			const values = await form?.validateFields()
		} catch (error) {
			console.error("查询失败：", error)
		}
	}
	// ------ Computed Properties ------
	const list: never[] = []
	const total = 0
	const handlePageChange = (page: number, pageSize: number) => {
		setPage(page)
		setPageSize(pageSize)
	}
	// ------ table props ------
	const tableProps = useMemo(
		() => ({
			rowKey: idKey,
			columns,
			dataSource: list,
			loading: isLoading,
			sticky: true,
			...(selectable
				? {
						rowSelection: {
							type: "checkbox" as const,
							selectedRowKeys: selectedState,
							onChange: (selectedRowKeys: Key[]) => {
								setSelectedState(selectedRowKeys.map((key) => Number(key)))
							},
						} as TableProps<any>["rowSelection"],
				  }
				: {}),
			scroll: {
				x: scrollX,
				y: scrollY,
			},
			pagination: pagination
				? {
						current: page,
						pageSize,
						total,
						onChange: handlePageChange,
				  }
				: (false as const),
		}),
		[
			idKey,
			columns,
			list,
			isLoading,
			selectable,
			selectedState,
			scrollX,
			scrollY,
			pagination,
			page,
			pageSize,
			total,
			refetch,
		]
	)

	return {
		form: form as FormInstance,

		// 表格
		tableProps,
	}
}
