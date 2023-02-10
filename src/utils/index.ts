import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Plugin } from 'vue'
import { cloneDeep } from 'lodash-es'
import { isObject } from './is'

export const noop = () => {}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string
    const res: any = cloneDeep(src)
    for (key in target) {
        res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key])
    }
    return res
}

// 打开浏览器
export function openWindow(
    url: string,
    opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
    const feature: string[] = []

    noopener && feature.push('noopener=yes')
    noreferrer && feature.push('noreferrer=yes')

    window.open(url, target, feature.join(','))
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) {
        return route
    }
    const { matched, ...opt } = route
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                  meta: item.meta,
                  name: item.name,
                  path: item.path
              }))
            : undefined) as RouteRecordNormalized[]
    }
}

export const withInstall = <T>(component: any, alias?: string) => {
    const comp = component as any
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component)
        if (alias) {
            app.config.globalProperties[alias] = component
        }
    }
    return component
}
