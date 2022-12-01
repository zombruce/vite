/*
 * @Author: Blake He
 * @Date: 2020-11-23 16:17:13
 * @Description:
 */

const toString = Object.prototype.toString

/**
 * @description: 判断值是否为某个类型
 * @param {unknown} val
 * @param {string} type
 * @return {*}
 */
export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

/**
 * @description: 是否为函数
 * @param {unknown} val
 * @return {*}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, 'Function')
}

/**
 * @description: 是否已定义
 * @param {*} T
 * @return {*}
 */
export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}

/**
 * @description: 是否未定义
 * @param {*} T
 * @return {*}
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
    return !isDef(val)
}

/**
 * @description: 是否为对象
 * @param {any} val
 * @param {*} any
 * @return {*}
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}

/**
 * @description: 是否为日期
 * @param {unknown} val
 * @return {*}
 */
export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

/**
 * @description: 是否为数值
 * @param {unknown} val
 * @return {*}
 */
export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'AsyncFunction')
}
/**
 * @description: 是否为promise
 * @param {unknown} val
 * @return {*}
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @description: 是否为字符串
 * @param {unknown} val
 * @return {*}
 */
export function isString(val: unknown): val is string {
    return is(val, 'String')
}

/**
 * @description: 是否为boolean类型
 * @param {unknown} val
 * @return {*}
 */
export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

/**
 * @description: 是否为错误对象
 * @param {any} val
 * @param {*} any
 * @return {*}
 */
export const isErrorObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Error')
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
    return typeof window !== 'undefined'
}

/**
 * @description: 是否为浏览器
 */
export const isWindow = (val: any): val is Window => {
    return typeof window !== 'undefined' && is(val, 'Window')
}

export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
    return is(val, 'Map')
}

export function isUrl(path: string): boolean {
    const reg =
        /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    return reg.test(path)
}

export const isServer = typeof window === 'undefined'

// 是否为图片节点
export function isImageDom(o: Element) {
    return o && ['IMAGE', 'IMG'].includes(o.tagName)
}

// 是否是 xp 系统
export const isXPSystem = navigator.userAgent.indexOf('Windows NT 5.1') !== -1

/**
 * @description:  是否为JSON对象
 */
export function isJsonObj(obj: any) {
    const isJson =
        typeof obj === 'object' &&
        Object.prototype.toString.call(obj).toLowerCase() === '[object object]' &&
        !obj.length
    return isJson
}

/**
 * @description: 判断是否是JSON格式
 * @param {*} str
 * @return {*}
 */
export function isJSON(str) {
    if (typeof str === 'string') {
        try {
            const obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            }
            return false
        } catch (e) {
            console.log(`error：${str}!!!${e}`)
            return false
        }
    }
    console.log('It is not a string!')
    return false
}
