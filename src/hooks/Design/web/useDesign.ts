import { useAppProviderContext } from '@/components/Aplication'

export function useDesign(scope: string) {
    const values = useAppProviderContext()
    return {
        // prefixCls: computed(() => `${values.prefixCls}-${scope}`),
        prefixCls: `${values.prefixCls}-${scope}`,
        prefixVar: values.prefixCls
        // style,
    }
}
