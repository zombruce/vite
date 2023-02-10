<template>
    <Layout.Header :class="getHeaderClass">
        <!-- menu start -->
        <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu">
            <LayoutMenu
                :isHorizontal="true"
                :theme="getHeaderTheme"
                :splitType="getSplitType"
                :menuMode="getMenuMode"
            />
        </div>
        <!-- menu-end -->
    </Layout.Header>
</template>

<script lang="ts" setup>
    import { computed, unref, ref } from 'vue'
    import { Layout } from 'ant-design-vue'
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import { useHeaderSetting } from '@/hooks/Design/setting/useHeaderSetting'
    import { useMenuSetting } from '@/hooks/Design/setting/useMenuSetting'
    import { MenuModeEnum, MenuSplitTyeEnum } from '@/enums/menuEnum'
    import LayoutMenu from '../menu/Index.vue'

    const {
        getHeaderTheme,
        getShowFullScreen,
        getShowNotice,
        getShowContent,
        getShowBread,
        getShowHeaderLogo,
        getShowHeader,
        getShowSearch
    } = useHeaderSetting()
    const { getShowTopMenu, getShowHeaderTrigger, getSplit, getIsMixMode, getMenuWidth, getIsMixSidebar } =
        useMenuSetting()

    const { prefixCls } = useDesign('layout-header')

    const props = defineProps({
        fixed: {
            type: Boolean
        }
    })
    const selectedKeys = ref<string[]>(['2'])

    const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme)
        return [
            prefixCls,
            {
                [`${prefixCls}--fixed`]: props.fixed,
                // [`${prefixCls}--mobile`]: unref(getIsMobile),
                [`${prefixCls}--${theme}`]: theme
            }
        ]
    })

    const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
    })
    const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
    })
</script>

<style scoped lang="scss"></style>
