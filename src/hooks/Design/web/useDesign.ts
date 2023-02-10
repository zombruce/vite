import { useAppProviderContext } from '@/components/Application'

export function useDesign(scope: string) {
    const values = useAppProviderContext()
    console.log('useDesign=====', values)
    return {
        // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
        prefixCls: `${values.prefixCls}-${scope}`,
        prefixVar: values.prefixCls
        // style,
    }
}
