/**
 * @description 接口通用返回值
 * @return code 状态码
 * @return message 返回消息
 * @return success 返回状态
 * @return result 返回内容
 */
export interface Result<T> {
    msg: string
    code: number
    data?: T
}

export interface Pagination<T> {
    current: number
    pageSize: number
    total: number
    data: T
}