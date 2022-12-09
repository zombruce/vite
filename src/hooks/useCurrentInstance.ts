import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
    // useCurrentInstance(props?: string | string[]) {
    const {
        appContext: {
            config: { globalProperties }
        }
    } = getCurrentInstance() as ComponentInternalInstance
    const auth = globalProperties.$tcb.auth()
    // const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance
    // const globalProperties = appContext?.config?.globalProperties
    return {
        globalProperties
    }
}
