/*
 * @Author: Blake He
 * @Date: 2021-01-19 13:14:15
 * @Description:
 * @LastEditTime: 2022-11-29 14:29:34
 * @LastEditors: Blake He
 */
// import { getStorageShortName } from '@/utils/helper/envHelper';
import { createStorage as create } from './storage'
import { enableStorageEncryption } from '@/settings/encryptionSetting'

const createOptions = (storage?: Storage, hasEncrypt?: boolean) => {
    return {
        // No encryption in debug mode
        hasEncrypt,
        storage
        // prefixKey: getStorageShortName(),
    }
}

export const Storage = create(createOptions())

export const createStorage = (storage: Storage = localStorage, hasEncrypt: boolean = enableStorageEncryption) => {
    return create(createOptions(storage, hasEncrypt))!
}

export default Storage
