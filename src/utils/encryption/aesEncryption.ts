import CryptoJS from 'crypto-js'

export interface EncryptionParams {
    key: string
    iv: string
}
export class Encryption {
    private key

    private iv

    constructor(opt: EncryptionParams) {
        const { key, iv } = opt
        this.key = CryptoJS.enc.Utf8.parse(key)
        this.iv = CryptoJS.enc.Utf8.parse(iv)
    }

    get getOpt() {
        return {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: this.iv
        }
    }

    // 加密
    encryptByAES(str: string) {
        const encrypted = CryptoJS.AES.encrypt(str, this.key, this.getOpt)
        return encrypted.toString()
    }

    // 解密
    decryptByAES(str: string) {
        const decrypted = CryptoJS.AES.decrypt(str, this.key, this.getOpt)
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}
export default Encryption
