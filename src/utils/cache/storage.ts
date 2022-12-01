/*
 * @Author: Blake He
 * @Date: 2022-11-29 14:10:35
 * @Description: 本地缓存
 * @LastEditTime: 2022-11-29 14:21:34
 * @LastEditors: Blake He
 */

// 默认缓存期限为7天
import { DEFAULT_CACHE_TIME, cacheCipher } from '@/settings/encryptionSetting'
import Encryption, { EncryptionParams } from '@/utils/encryption/aesEncryption'

export interface CreateStorageParams extends EncryptionParams {
    storage: Storage
    hasEncrypt: boolean
}

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = ({
    prefixKey = '',
    storage = localStorage,
    key = cacheCipher.key,
    iv = cacheCipher.iv,
    hasEncrypt = true
} = {}) => {
    if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
        throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
    }
    const encryption = new Encryption({ key, iv })

    /**
     * 本地缓存类
     * @class Storage
     */
    const Storage = class {
        private storage = storage
        private prefixKey?: string = prefixKey
        private encryption: Encryption
        private hasEncrypt: boolean

        /**
         *
         * @param {*} storage
         */
        constructor() {
            this.storage = storage
            this.prefixKey = prefixKey
            this.encryption = encryption
            this.hasEncrypt = hasEncrypt
        }

        private getKey(key: string) {
            return `${this.prefixKey}${key}`.toUpperCase()
        }

        /**
         * @description 设置缓存
         * @param {string} key 缓存键
         * @param {*} value 缓存值
         * @param expire
         */
        set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
            const stringData = JSON.stringify({
                value,
                expire: expire !== null ? new Date().getTime() + expire * 1000 : null
            })
            const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
            this.storage.setItem(this.getKey(key), stringifyValue)
        }

        /**
         * 读取缓存
         * @param {string} key 缓存键
         * @param {*=} def 默认值
         */
        get<T = any>(key: string, def: any = null) {
            const item = this.storage.getItem(this.getKey(key))
            if (item) {
                try {
                    const decItem = this.hasEncrypt ? this.encryption.decryptByAES(item) : item
                    const data = JSON.parse(decItem)
                    const { value, expire } = data
                    // 在有效期内直接返回
                    if (expire === null || expire >= new Date().getTime()) {
                        return value
                    }
                    this.remove(this.getKey(key))
                } catch (e) {
                    return def
                }
            }
            return def
        }

        /**
         * 从缓存删除某项
         * @param {string} key
         */
        remove(key: string) {
            console.log(key, '缓存删除')
            this.storage.removeItem(this.getKey(key))
        }

        /**
         * 清空所有缓存
         * @memberOf Cache
         */
        clear(): void {
            this.storage.clear()
        }
    }
    return new Storage()
}
