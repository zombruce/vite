import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { cloneDeep, indexOf } from 'lodash-es'
import { AxiosCanceler } from './axiosCancel'
import { isFunction, isString, isArray, isObject } from '@/utils/is'

import type { RequestOptions, CreateAxiosOptions, Result, UploadFileParams } from './types'
import { ContentTypeEnum } from '@/enums/httpEnum'
// import { requestInterceptorOfEncrypt, requestInterceptorOfEncryptWithProd } from './encryptInterceptors'
import { digitalConversion } from '@/utils/digitalConversion'

export * from './axiosTransform'

/**
 * @description:  axios模块
 */
export class VAxios {
    private axiosInstance: AxiosInstance

    private readonly options: CreateAxiosOptions

    constructor(options: CreateAxiosOptions) {
        this.options = options
        this.axiosInstance = axios.create(options)
        this.setupInterceptors()
    }

    /**
     * @description:创建axios实例
     */
    private createAxios(config: CreateAxiosOptions): void {
        const baseURL = process.env.VITE_APP_API_HOST
        this.axiosInstance = axios.create(config)
    }

    private getTransform() {
        const { transform } = this.options
        return transform
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance
    }

    /**
     * @description: 重新配置axios
     */
    configAxios(config: CreateAxiosOptions) {
        if (!this.axiosInstance) {
            return
        }
        this.createAxios(config)
    }

    /**
     * @description: 设置通用header
     */
    setHeader(headers: any): void {
        if (!this.axiosInstance) {
            return
        }
        Object.assign(this.axiosInstance.defaults.headers, headers)
    }

    /**
     * @description: 拦截器配置
     */
    private setupInterceptors() {
        const transform = this.getTransform()
        if (!transform) {
            return
        }
        const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
            transform
        const axiosCanceler = new AxiosCanceler()

        // 加密 暂时不用
        // eslint-disable-next-line max-len
        // this.axiosInstance.interceptors.request.use(isProd ? requestInterceptorOfEncryptWithProd : requestInterceptorOfEncrypt, error => {
        //     return Promise.reject(error);
        // });

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config
            !ignoreCancelToken && axiosCanceler.addPending(config)
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config, this.options.requestOptions || {})
            }
            return config
        }, undefined)

        // 请求拦截器错误捕获
        requestInterceptorsCatch &&
            isFunction(requestInterceptorsCatch) &&
            this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config)
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res)
            }
            return res
        }, undefined)

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
            isFunction(responseInterceptorsCatch) &&
            this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
    }

    /**
     * @description:  文件上传
     */
    uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams, options?: RequestOptions): Promise<T> {
        const formData = new window.FormData()
        let conf: AxiosRequestConfig = cloneDeep(config)
        const { requestOptions } = this.options
        const opt: RequestOptions = { ...requestOptions, ...options }

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                if (!params.data) {
                    return
                }
                const value = params.data[key]
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item)
                    })
                    return
                }

                formData.append(key, params.data[key])
            })
        }

        formData.append(params.name || 'file', params.file, params.filename)

        const { beforeRequestHook, transformRequestData, requestCatch } = this.getTransform() || {}
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt)
        }

        return this.axiosInstance
            .request({
                ...conf,
                method: 'POST',
                data: formData,
                headers: {
                    'Content-type': ContentTypeEnum.FORM_DATA,
                    ignoreCancelToken: true
                }
            })
            .then((res) => {
                if (transformRequestData && isFunction(transformRequestData)) {
                    return transformRequestData(res, opt)
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return res as unknown as Promise<T>
            })
            .catch((e: Error) => {
                if (requestCatch && isFunction(requestCatch)) {
                    throw requestCatch(e)
                }
                throw e
            })
    }

    /**
     * @description:请求方法
     */
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig = cloneDeep(config)
        const transform = this.getTransform()
        const { requestOptions } = this.options
        const opt: RequestOptions = { ...requestOptions, ...options }

        if (!Array.isArray(config.params)) {
            // 统一处理请求参数 首尾空格
            const paramsObj = { ...config.params }
            for (const key in paramsObj) {
                if (isString(paramsObj[key])) {
                    paramsObj[key] = paramsObj[key].trim()
                }
                if (isArray(paramsObj[key]) && paramsObj[key].length) {
                    paramsObj[key].forEach((item) => {
                        if (isObject(item)) {
                            for (const _key in item) {
                                if (item[_key] && isString(item[_key])) {
                                    item[_key] = item[_key].trim()
                                }
                            }
                        }
                    })
                }
            }
            conf.params = paramsObj
        }

        const tempParams = cloneDeep(conf.params)
        digitalConversion(tempParams, conf.url, true)
        conf.params = tempParams

        const { beforeRequestHook, requestCatch, transformRequestData } = transform || {}
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt)
        }

        return new Promise((resolve, reject) => {
            const axiosInstanceReq = () => {
                this.axiosInstance
                    .request<any, AxiosResponse<Result>>(conf)
                    .then((res: AxiosResponse<Result>) => {
                        // 请求是否被取消
                        // const isCancel = (res as any).__CANCEL__
                        const isCancel = axios.isCancel(res)
                        // if (isCancel) {
                        //     config.cancelToken?.promise.then((reason) => {
                        //         reject(reason);
                        //     })
                        // }
                        if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
                            const ret = transformRequestData(res, opt)
                            // ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
                            return resolve(ret)
                        }
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject(res as unknown as Promise<T>)
                    })
                    .catch((e: Error) => {
                        if (requestCatch && isFunction(requestCatch)) {
                            reject(requestCatch(e))
                            return
                        }
                        reject(e)
                    })
            }
            axiosInstanceReq()
        })
    }
}
