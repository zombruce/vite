import { AxiosRequestConfig } from 'axios'
import { AxiosTransform } from './axiosTransform'

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
    // 请求参数拼接到url
    joinParamsToUrl?: boolean
    // 格式化请求参数时间
    formatDate?: boolean
    // 是否处理请求结果
    isTransformRequestResult?: boolean
    // 是否解析成JSON
    isParseToJson?: boolean
    // 是否提示自定义信息
    isShowMessage?: boolean
    // 成功的文本信息
    successMessageText?: string
    // 是否显示成功信息
    isShowSuccessMessage?: boolean
    // 是否显示失败信息
    isShowErrorMessage?: boolean
    // 错误的文本信息
    errorMessageText?: string
    // 是否加入url
    joinPrefix?: boolean
    // 接口地址， 不填则使用默认apiUrl
    apiUrl?: string
    isUrl?: boolean
    // 错误消息提示类型
    errorMessageMode?: ErrorMessageMode
    // 是否启用调试数据
    isDebug?: boolean
    // 是否加密,默认不加密
    isEncryption?: boolean
    // mock接口地址
    mockApiUrl?: string
    isWebSocket?: boolean
    websocketApiUrl?: string
    isInstallH5?: boolean
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
    prefixUrl?: string
    transform?: AxiosTransform
    requestOptions?: RequestOptions
}
export interface Result<T = any> {
    code: number
    type?: 'success' | 'error' | 'warning'
    message: string
    result?: T
    apiVersion?: string
    preUpgradeRule?: T
}

// multipart/form-data：上传文件
export interface UploadFileParams {
    // 其他参数
    data?: { [key: string]: any }
    // 文件参数的接口字段名
    name?: string
    // 文件
    file: File | Blob
    // 文件名
    filename?: string
    [key: string]: any
}
