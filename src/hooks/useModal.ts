import { App, createVNode, render, VNode, VNodeTypes } from 'vue'
import { v4 as uuid } from 'uuid'
let app: App | null = null
export default {
    install(a: App) {
        app = a
    }
}
export const useModal = (
    Modal: VNodeTypes,
    props?: Record<string, unknown>,
    onOk?: (data?) => void,
    onClose?: (data?) => void
) => {
    const root: HTMLDivElement | null = document.createElement('div')
    const body = document.body
    console.log(app, '123')
    body.appendChild(root)

    const list: Array<VNode> = []

    const getIstance = (params) => {
        let instance: VNode
        if (list.length > 0) {
            instance = list.shift() as VNode
        } else {
            const div = document.createElement('div')

            root.appendChild(div)
            // com 为自己写的组件,  SoltChild 可以是自己的子组件 ，也可以不传
            const vm = createVNode(Modal, {
                ...props,
                onOk,
                onClose
            })
            vm.appContext = app!._context // 这句很关键，关联起了数据
            render(vm, div)
            instance = vm
        }

        const vvm = instance.component as any
        new Promise((resolve) => {
            vvm.proxy.open && vvm.proxy.open({ ...params, onclose: resolve })
        }).then(() => {
            // 关闭了弹窗，就回收
            list.push(instance)
        })

        return {
            destroy() {
                vvm.proxy.destroy && vvm.proxy.destroy()
            },
            ok(...a: Array<any>) {
                vvm.proxy.ok && vvm.proxy.ok(...a)
            },
            cancel(...a: Array<any>) {
                vvm.proxy.cancel && vvm.proxy.cancel(...a)
            }
        }
    }
}
