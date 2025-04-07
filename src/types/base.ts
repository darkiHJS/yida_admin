export interface BasePageList<T> {
	total: number
	data: T[]
}

export interface BasePageParams {
	page: number
	pageSize: number
}

export type ApiResponse<T> = BasePageList<T> | T[]
