import { glob } from 'glob'
import fs from 'fs'
import { resolve } from 'path'

export const setEntry = () => {
    // 读取全部的main文件路径
    const allEntry = glob.sync('./src/pages/**/main.ts')

    // 读取html模版信息
    console.log(resolve(__dirname, './index.html'))
    const temp: any = fs.readFileSync(resolve(__dirname, './index.html'))
    const entryPage: any = {}
    let content = ''
    allEntry.forEach((entry) => {
        const mode = {
            title: entry.split('/')[3],
            src: entry
        }
        console.log('mode: ', mode)
        const writeHtmlPath = resolve(__dirname, `./src/${mode.title}/index.html`)
        entryPage[mode.title] = writeHtmlPath
    })

    console.log('entryPage: ', entryPage)
    return allEntry
}
