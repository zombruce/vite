import axios, { AxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'
import { isFunction } from '@/utils/is/index'
import { RequestEnum } from '@/enums/httpEnum'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
    [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')

export const getIgnoreParamsPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
    /**
     * 添加请求
     * @param {Object} config
     */
    addPending(config: AxiosRequestConfig) {
        this.removePending(config)
        let isIgnoreParamsPending = false
        if (config.method?.toUpperCase() === RequestEnum.GET) {
            isIgnoreParamsPending = config.params?.isIgnoreParamsPending
        } else {
            isIgnoreParamsPending = config.data?.isIgnoreParamsPending
        }
        try {
            const url = isIgnoreParamsPending ? getIgnoreParamsPendingUrl(config) : getPendingUrl(config)
            config.cancelToken =
                config.cancelToken ||
                new axios.CancelToken((cancel) => {
                    if (!pendingMap.has(url)) {
                        // 如果 pending 中不存在当前请求，则添加进去
                        pendingMap.set(url, cancel)
                    }
                })
        } catch (error) {
            console.log(error, 'error')
        }
    }

    /**
     * @description: 清空所有pending
     */
    removeAllPending() {
        pendingMap.forEach((cancel) => {
            cancel && isFunction(cancel) && cancel()
        })
        pendingMap.clear()
    }

    /**
     * 移除请求
     * @param {Object} config
     */
    removePending(config: AxiosRequestConfig) {
        const isIgnoreParamsPending =
            config.params?.isIgnoreParamsPending || config.data?.isIgnoreParamsPending || false
        const url = isIgnoreParamsPending ? getIgnoreParamsPendingUrl(config) : getPendingUrl(config)
        if (pendingMap.has(url)) {
            // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
            const cancel = pendingMap.get(url)
            cancel && cancel(url)
            pendingMap.delete(url)
        }
    }

    /**
     * @description: 重置
     */
    reset(): void {
        pendingMap = new Map<string, Canceler>()
    }
}
