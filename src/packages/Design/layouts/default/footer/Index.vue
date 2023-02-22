<template>
    <Layout.Footer :class="prefixCls"  ref="footerRef">
        <div :class="`${prefixCls}__links`">
            <a @click="openWindow(SITE_URL)">在线预览</a>

            <GithubFilled @click="openWindow(GITHUB_URL)" :class="`${prefixCls}__github`" />

            <a @click="openWindow(DOC_URL)">在线文档</a>
        </div>
        <div>Copyright &copy;2020 Vben Admin</div>
    </Layout.Footer>
</template>

<script lang="ts" setup>
    import { computed, unref, ref } from 'vue'
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import { Layout } from 'ant-design-vue'
    import { useRootSetting } from '@/hooks/Design/setting/useRootSetting'
    import { useRouter } from 'vue-router'
    import { useLayoutHeight } from '../hooks/useContentViewHeight'
    import { DOC_URL, GITHUB_URL, SITE_URL } from '@/settings/siteSetting'
    import { openWindow } from '@/utils'

    const { setFooterHeight } = useLayoutHeight()
    const { currentRoute } = useRouter()
    const { getShowFooter } = useRootSetting()
    const footerRef = ref<ComponentRef>(null)
    const { prefixCls } = useDesign('layout-footer')
    const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
            const footerEl = unref(footerRef)?.$el
            setFooterHeight(footerEl?.offsetHeight || 0)
        } else {
            setFooterHeight(0)
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
    })
</script>
<style scoped lang="scss"></style>
