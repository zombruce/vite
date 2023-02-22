<template>
    <Layout :class="prefixCls">
        <!-- <LayoutFeatures />  -->
        <LayoutHeader fixed/>
        <Layout :class="[layoutClass]">
            <LayoutSideBar  />
            <Layout :class="`${prefixCls}-main`">
<!--                <LayoutMultipleHeader />-->
                <LayoutContent />
                <LayoutFooter />
            </Layout>
        </Layout>
    </Layout>
</template>

<script lang="ts" setup>
    import { computed, unref, ref } from 'vue'
    import { Layout } from 'ant-design-vue'
    import LayoutHeader from './header/Index.vue'
    import LayoutContent from './content/Index.vue'
    import LayoutFooter from './footer/Index.vue'
    import LayoutSideBar from './slider/Index.vue'
    import LayoutMultipleHeader from './header/MultipleHeader.vue'
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import { useMenuSetting } from '@/hooks/Design/setting/useMenuSetting'
    import { useAppInject } from '@/hooks/Design/web/useAppInject'
    import { useHeaderSetting } from '@/hooks/Design/setting/useHeaderSetting'
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined
    } from '@ant-design/icons-vue'

    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()
    const { getShowFullHeaderRef } = useHeaderSetting()
    const { getIsMobile } = useAppInject()

    const { prefixCls } = useDesign('default-layout')

    const selectedKeys = ref<string[]>(['1'])
    const collapsed = ref<boolean>(false)
    const layoutClass = computed(() => {
        const cls: string[] = ['ant-layout']
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
            cls.push('ant-layout-has-sider')
        }
        return cls
    })
</script>

<style lang="less">
    @prefix-cls: ~'@{namespace}-default-layout';

    .@{prefix-cls} {
        display: flex;
        width: 100%;
        min-height: 100%;
        background-color: @content-bg;
        flex-direction: column;

        > .ant-layout {
            min-height: 100%;
        }

        &-main {
            width: 100%;
            margin-left: 1px;
        }
    }
</style>
