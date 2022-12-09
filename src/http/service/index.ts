// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { createVNode, render } from 'vue'
import { Modal, message as Message } from 'ant-design-vue'
import { VAxios } from './Axios'
import { AxiosTransform } from './axiosTransform'
import { checkStatus } from './checkStatus'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { isString } from '@/utils/is/index'
import { setObjToUrlParams } from '@/utils/urlUtil'
import { CreateAxiosOptions, RequestOptions, Result } from './types'
import { errorResult } from './const'
// import router from '@/router/index'
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum'
import { digitalConversion } from '@/utils/digitalConversion'
import { AxiosCanceler } from './axiosCancel'
import { createStorage } from '@/utils/cache/index'

const axiosCanceler = new AxiosCanceler()
const storage = createStorage()
declare const wx: any
const isLocal = import.meta.env.VITE_NODE_ENV === 'localhost'

type LocalCreateAxiosOptions = Record<string, any> & CreateAxiosOptions
/**
 * @description: 数据处理，方便区分多种处理方式
 * axios封装使用了https://github.com/anncwb/vue-vben-admin/tree/main/src/utils/http/axios
 */
const transform: AxiosTransform = {
    /**
     * @description: 处理请求数据
     */
    transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
        const {
            isTransformRequestResult,
            isShowMessage = true,
            isShowErrorMessage,
            isShowSuccessMessage,
            successMessageText,
            errorMessageText
        } = options
        const reject = Promise.reject

        const { data, config } = res
        // 这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
        const { code, result, message, apiVersion, preUpgradeRule } = data
        // 动态金额处理（分->元，元-分）
        digitalConversion(result, config.url, false)
        // 请求成功
        const hasSuccess = data && Reflect.has(data, 'code') && (code === ResultEnum.SUCCESS || code.toString() === '0')
        // 接口错误判断
        const showErrorModal = (option: { message: string; confirmButtonText?: string }) => {
            // if (router.currentRoute.value.name === 'login') {
            //     return
            // }
            // 到登录页
            const timeoutMsg = '登录超时,请重新登录!'
            Modal.destroyAll()
            Modal.warning({
                title: '提示',
                content: message,
                okText: '知道了',
                onOk: () => {
                    // router.replace({
                    //     name: 'login',
                    //     query: {
                    //         redirect: router.currentRoute.value.fullPath
                    //     }
                    // })
                    // localStorage.removeItem(TABS_ROUTES)
                    sessionStorage.removeItem('HOTEL_CONFIGS')
                    window.location.reload()
                    storage.clear()
                    Modal.destroyAll()
                }
            })
            axiosCanceler!.removeAllPending() // 取消无效请求
            return Promise.reject(new Error(timeoutMsg))
        }

        const checkAPI = () => {
            if (!hasSuccess) {
                Message.destroy()
                if (isShowErrorMessage) {
                    Message.error(message || errorMessageText || '操作失败！')
                }
                return Promise.reject(message)
            }
            return true
        }

        // 不进行任何处理，直接返回
        // 用于页面代码可能需要直接获取code，data，message这些信息时开启
        if (isTransformRequestResult) {
            if (res.config.url && res.config.url?.indexOf('/no-token/login') > -1) {
                return data
            }
            if (isShowMessage) {
                const check = checkAPI()
                if (check) {
                    return data
                }
            } else {
                return data
            }
        }
        // 是否显示提示信息
        if (isShowMessage) {
            if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
                // 是否显示自定义信息提示
                Message.success(successMessageText || message || '操作成功！', 1)
            } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
                // 是否显示自定义信息提示
                checkAPI()
            } else if (!hasSuccess && options.errorMessageMode === 'modal') {
                // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
                Modal.confirm({ title: '错误提示', content: message })
                return
            } else {
                // Message.error(message || errorMessageText || '操作失败！')
            }
        }

        // 错误的时候返回
        // const errorResult = undefined;
        if (!data || code !== 0) {
            // return '[HTTP] Request has no return value';
            // return errorResult;
            return Promise.reject(data)
        }

        // 接口请求成功，直接返回结果
        if (code === ResultEnum.SUCCESS) {
            return result
        }
        // 接口请求错误，统一提示错误信息
        if (code === ResultEnum.ERROR) {
            if (message) {
                Message.error(data.message)
                Promise.reject(new Error(message))
            } else {
                const msg = '操作失败,系统异常!'
                Message.error(msg)
                Promise.reject(new Error(msg))
            }
            return errorResult
        }

        return data
    },

    // 请求之前处理config
    beforeRequestHook: (config, options: LocalCreateAxiosOptions) => {
        const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, isParseToJson, isUrl } = options
        if (isUrl) {
            config.url = `${config.url}`
        } else {
            // 多环境通过代理方便调试
            config.url =
                import.meta.env.VITE_NODE_ENV === 'development' ? `/api${config.url}` : `${apiUrl || ''}${config.url}`
        }

        if (config.method?.toUpperCase() === RequestEnum.GET) {
            const now = new Date().getTime()
            if (!isString(config.params)) {
                if (config.params && config.params?.isIgnoreParamsPending) {
                    config.data = {
                        params: Object.assign(config.params || {}, {})
                    }
                } else {
                    config.data = {
                        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
                        params: Object.assign(config.params || {}, {
                            _t: now
                        })
                    }
                }
            } else {
                // 兼容restful风格
                config.url = `${config.url + config.params}?_t=${now}`
                config.params = {}
            }
        } else {
            if (!isString(config.params)) {
                config.data = config.params
                config.params = {}
                if (joinParamsToUrl) {
                    config.url = setObjToUrlParams(config.url as string, config.data)
                }
            } else {
                // 兼容restful风格
                config.url += config.params
                config.params = {}
            }
            // 'a[]=b&a[]=c'
            if (!isParseToJson) {
                config.params = qs.stringify(config.params, { arrayFormat: 'brackets' })
                config.data = qs.stringify(config.data, { arrayFormat: 'brackets' })
            }
        }
        return config
    },

    /**
     * @description: 请求拦截器处理
     */
    requestInterceptors: (config: any, options: RequestOptions) => {
        // 请求之前处理config
        const token = storage.get(ACCESS_TOKEN_KEY)
        if (token) {
            // jwt token
            // 后台cookie处理token，暂不传
            config.headers.token = token
        }
        return config
    },

    /**
     * @description: 响应错误处理
     */
    responseInterceptorsCatch: (error: any) => {
        const { response, code, message } = error || {}
        const msg: string = response && response.data && response.data.error ? response.data.error.message : ''
        const err: string = error.toString()
        try {
            if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
                Message.error('接口请求超时,请刷新页面重试!')
                return
            }
            if (err && err.includes('Network Error')) {
                Modal.destroyAll()
                Modal.warning({
                    width: 450,
                    title: '网络异常或PSB连接异常',
                    content: createVNode('ul', {}, [
                        createVNode('li', {}, '1.请关闭电脑杀毒软件（如腾讯管家、360安全卫士等）'),
                        createVNode('li', {}, '2.请点击桌面PSB修复工具-修复PSB核心服务'),
                        createVNode('li', {}, '3.请检查网络连接是否正常')
                    ]),
                    okText: '确定'
                })
                return
            }
        } catch (error: any) {
            throw new Error(error)
        }
        // 请求是否被取消
        // const isCancel = (error as any).__CANCEL__
        const isCancel = axios.isCancel(error)
        if (!isCancel) {
            checkStatus(error.response && error.response.status, msg)
        } else {
            console.log(error, '请求被取消！')
        }
        return Promise.reject(error)
    }
}

const Axios = new VAxios({
    timeout: 300 * 1000,
    // 基础接口地址
    // baseURL: globSetting.apiUrl,
    // 接口可能会有通用的地址部分，可以统一抽取出来
    // prefixUrl: prefix,
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    // 数据处理方式
    transform,
    // transformRequest: [(data) => {
    //     data = JSON.stringify(data)
    //     return data
    // }],
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
        // 默认将prefix 添加到url
        joinPrefix: true,
        // 需要对返回数据进行处理
        isTransformRequestResult: false,
        // post请求的时候添加参数到url
        joinParamsToUrl: false,
        // 格式化提交参数时间
        formatDate: true,
        // 成功消息
        successMessageText: '',
        // 消息提示类型
        errorMessageMode: 'none',
        // 是否显示失败信息
        isShowErrorMessage: true,
        // 接口地址
        apiUrl: import.meta.env.VITE_APP_API_HOST,
        isUrl: false,
        //
        isParseToJson: true
    },
    withCredentials: false
} as LocalCreateAxiosOptions)

export default Axios
