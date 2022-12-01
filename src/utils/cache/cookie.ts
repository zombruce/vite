/*
 * @Author: Blake He
 * @Date: 2021-01-19 13:13:56
 * @Description:
 * @LastEditTime: 2022-11-29 14:29:49
 * @LastEditors: Blake He
 */
// 默认缓存期限为7天
import { DEFAULT_CACHE_TIME, cacheCipher } from '@/settings/encryptionSetting'
import Encryption from '@/utils/encryption/aesEncryption'

export default class WebCookie {
    private encryption: Encryption

    private hasEncrypt: boolean

    private prefixKey?: string = ''

    constructor(hasEncrypt = true, key = cacheCipher.key, iv = cacheCipher.iv) {
        const encryption = new Encryption({ key, iv })
        this.encryption = encryption
        this.hasEncrypt = hasEncrypt
    }

    private getKey(key: string) {
        return `${this.prefixKey}${key}`.toUpperCase()
    }

    /**
     * 设置cookie
     * @param {string} name cookie 名称
     * @param {*} value cookie 值
     * @param {number=} expire 过期时间
     * 如果过期时间为设置，默认关闭浏览器自动删除
     * @example
     */
    setCookie(name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
        value = this.hasEncrypt ? this.encryption.encryptByAES(JSON.stringify(value)) : value
        document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`
    }

    /**
     * 根据名字获取cookie值
     * @param name
     */
    getCookie(name: string): string {
        const cookieArr = document.cookie.split('; ')
        for (let i = 0, length = cookieArr.length; i < length; i++) {
            const kv = cookieArr[i].split('=')
            if (kv[0] === this.getKey(name)) {
                let message: any = null
                const str = kv[1]
                if (this.hasEncrypt && str) {
                    message = this.encryption.decryptByAES(str)
                    try {
                        return JSON.parse(message)
                    } catch (e) {
                        return str
                    }
                }
                return str
            }
        }
        return ''
    }

    /**
     * 根据名字删除指定的cookie
     * @param {string} key
     */
    removeCookie(key: string) {
        this.setCookie(key, 1, -1)
    }

    /**
     * 清空cookie，使所有cookie失效
     */
    clearCookie(): void {
        const keys = document.cookie.match(/[^ =;]+(?==)/g)
        if (keys) {
            // eslint-disable-next-line prettier/prettier
            for (let i = keys.length; i--;) {
                document.cookie = `${keys[i]}=0;expire=${new Date(0).toUTCString()}`
            }
        }
    }
}
