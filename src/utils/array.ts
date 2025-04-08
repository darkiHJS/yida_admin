/**
 * 遍历树结构并对每个节点应用转换函数
 * @param treeData 原始树结构数据
 * @param mapper 节点转换函数，接收节点返回新节点
 * @param childrenKey 子节点的键名，默认为'children'
 * @returns 转换后的新树结构
 */
export function mapTree<T, R = T>(
	treeData: T[],
	mapper: (node: T) => R,
	childrenKey: string = "children"
): R[] {
	return treeData.map((node) => {
		// 获取当前节点的子节点（如果有）
		const children = node[childrenKey as keyof T]

		// 应用转换函数创建新节点
		const newNode = mapper(node)

		// 处理子节点（如果有）
		if (children && Array.isArray(children)) {
			// 递归处理子节点
			;(newNode as any)[childrenKey] = mapTree(children, mapper, childrenKey)
		}

		return newNode
	})
}

/**
 * 扁平化树结构
 * @param items 树结构数据
 * @returns 扁平化后的数据
 */
export function flattenTree<
	T,
	K extends keyof T = "children" extends keyof T ? "children" : keyof T
>(items: T[], childrenKey: K = "children" as K): Omit<T, K>[] {
	const flatList: Omit<T, K>[] = []

	items.forEach((item) => {
		const { [childrenKey]: children, ...rest } = item

		flatList.push(rest as Omit<T, K>)

		if (children && Array.isArray(children) && children.length > 0) {
			flatList.push(...flattenTree(children as T[], childrenKey))
		}
	})

	return flatList
}
