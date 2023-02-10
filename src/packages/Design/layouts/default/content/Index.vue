<template>
    <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
        <PageLayout />
    </div>
</template>
<script lang="ts" setup>
    import { useRootSetting } from '@/hooks/Design/setting/useRootSetting'
    import { useTransitionSetting } from '@/hooks/Design/setting/useTransitionSetting'
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import { useContentViewHeight } from '../hooks/useContentViewHeight'
    import PageLayout from '@/packages/Design/layouts/page/index.vue'

    const { prefixCls } = useDesign('layout-content')
    const { getOpenPageLoading } = useTransitionSetting()
    const { getLayoutContentMode, getPageLoading } = useRootSetting()

    useContentViewHeight()
</script>
<style lang="scss" scoped></style>
