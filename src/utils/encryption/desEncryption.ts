/*
 * @Author: Blake He
 * @Date: 2021-01-29 13:58:46
 * @Description:
 * @LastEditTime: 2021-01-29 16:27:39
 * @LastEditors: xxx
 */
import CryptoJS from 'crypto-js'

const VERSION = '3_1'
const YOUKEY = 'GekL3HPLGux/EGhe95RhPuoxlF12iv25'
const TPK = 'rSNFkWFG4D0leYOFSZJDYviMdtPfrRZK'

type WordArray = CryptoJS.lib.WordArray

export class Encryption {
    private youKeyBytes: WordArray

    private firstString: string

    constructor(youKey: string = YOUKEY, tpk: string = TPK) {
        this.youKeyBytes = CryptoJS.enc.Base64.parse(youKey)
        const tpkBytes = CryptoJS.enc.Base64.parse(tpk)
        // 第一段密码
        this.firstString = this.encryptBy3DES(this.youKeyBytes, tpkBytes)
    }

    get getOpt() {
        return {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
    }

    // 加密
    encryptBy3DES(message: WordArray | string, key: WordArray | string) {
        return CryptoJS.TripleDES.encrypt(message, key, this.getOpt).toString()
    }

    // 生成约定的字符串
    generateString(data: Record<string, unknown> | string) {
        const message = CryptoJS.enc.Utf8.parse(typeof data === 'string' ? data : JSON.stringify(data))
        return `${VERSION}|${this.firstString}|${this.encryptBy3DES(message, this.youKeyBytes)}`
    }
}
export default Encryption
