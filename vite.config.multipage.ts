import path from 'path'
import history from 'connect-history-api-fallback'
import glob from 'glob'

const multiPageConfig = {
    multiPage: {},
    pageEntry: {},
    getInput() {
        const allEntry = glob.sync('./src/packages/**/index.html')
        allEntry.forEach((entry: string) => {
            const pathArr = entry.split('/')
            const name = pathArr[pathArr.length - 2]
            multiPageConfig.multiPage[name] = {
                name,
                rootPage: `/src/packages/${name}/index.html`
            }
            multiPageConfig.pageEntry[name] = path.resolve(__dirname, `src/packages/${name}/index.html`)
        })
    },
    pathRewritePlugin() {
        const rules: any[] = []
        console.log(multiPageConfig.multiPage, 'multiPage')
        Reflect.ownKeys(multiPageConfig.multiPage).forEach((key) => {
            rules.push({
                from: `/${multiPageConfig.multiPage[key].name}`,
                to: `/${multiPageConfig.multiPage[key].rootPage}`
            })
        })
        return {
            name: 'path-rewrite-plugin',
            configureServer(server) {
                server.middlewares.use(
                    history({
                        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
                        disableDotRule: true,
                        rewrites: rules
                        // verbose: true // 查看日志打印
                    })
                )
            }
        }
    }
}

export { multiPageConfig as default }
