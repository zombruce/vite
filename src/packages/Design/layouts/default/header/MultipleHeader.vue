<template>
    <div :style="getPlaceholderDomStyle" v-if="getIsShowPlaceholderDom"></div>
    <div :style="getWrapStyle" :class="getClass">
        <LayoutHeader v-if="getShowInsetHeaderRef" />
        <!-- <MultipleTabs v-if="getShowTabs" /> -->
    </div>
</template>
<script lang="ts" setup>
    import { defineComponent, unref, computed, CSSProperties } from 'vue'

    import LayoutHeader from './index.vue'
    // import MultipleTabs from '../tabs/index.vue'
    import { useLayoutHeight } from '../hooks/useContentViewHeight'
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import { useMenuSetting } from '@/hooks/Design/setting/useMenuSetting'
    import { useHeaderSetting } from '@/hooks/Design/setting/useHeaderSetting'
    import { useFullContent } from '@/hooks/Design/web/useFullContent'
    import { useMultipleTabSetting } from '@/hooks/Design/setting/useMultipleTabSetting'
    import { useAppInject } from '@/hooks/Design/web/useAppInject'

    const HEADER_HEIGHT = 48

    const TABS_HEIGHT = 32

    const { setHeaderHeight } = useLayoutHeight()
    const { prefixCls } = useDesign('layout-multiple-header')

    const { getCalcContentWidth, getSplit } = useMenuSetting()
    const { getFixed, getShowInsetHeaderRef, getShowFullHeaderRef, getHeaderTheme, getShowHeader } = useHeaderSetting()
    const { getFullContent } = useFullContent()
    const { getShowMultipleTab } = useMultipleTabSetting()
    const { getIsMobile } = useAppInject()

    const getShowTabs = computed(() => {
        return unref(getShowMultipleTab) && !unref(getFullContent)
    })

    const getIsShowPlaceholderDom = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef)
    })

    const getWrapStyle = computed((): CSSProperties => {
        const style: CSSProperties = {}
        if (unref(getFixed)) {
            style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth)
        }
        if (unref(getShowFullHeaderRef)) {
            style.top = `${HEADER_HEIGHT}px`
        }
        return style
    })

    const getIsFixed = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef)
    })

    const getPlaceholderDomStyle = computed((): CSSProperties => {
        let height = 0
        if ((unref(getShowFullHeaderRef) || !unref(getSplit)) && unref(getShowHeader) && !unref(getFullContent)) {
            height += HEADER_HEIGHT
        }
        if (unref(getShowMultipleTab) && !unref(getFullContent)) {
            height += TABS_HEIGHT
        }
        setHeaderHeight(height)
        return {
            height: `${height}px`
        }
    })

    const getClass = computed(() => {
        return [prefixCls, `${prefixCls}--${unref(getHeaderTheme)}`, { [`${prefixCls}--fixed`]: unref(getIsFixed) }]
    })
</script>
<style lang="scss" scoped>
    // @prefix-cls: ~'@{namespace}-layout-multiple-header';

    // .@{prefix-cls} {
    //     transition: width 0.2s;
    //     flex: 0 0 auto;

    //     &--dark {
    //         margin-left: -1px;
    //     }

    //     &--fixed {
    //         position: fixed;
    //         top: 0;
    //         z-index: @multiple-tab-fixed-z-index;
    //         width: 100%;
    //     }
    // }
</style>
