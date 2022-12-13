<template>
    <Header>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
            <a-menu-item key="1">nav 1</a-menu-item>
            <a-menu-item key="2">nav 2</a-menu-item>
            <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
    </Header>
</template>

<script lang="ts" setup>
    import { defineComponent, computed, unref, ref } from 'vue'
    import { Layout } from 'ant-design-vue'
    import { useDesign } from '@/hooks/Design/web/useDesign'

    const { prefixCls } = useDesign('layout-header')

    const selectedKeys = ref<string[]>(['2'])
    defineComponent({
        Header: Layout.Header
    })

    // const getHeaderClass = computed(() => {
    //     const theme = unref(getHeaderTheme)
    //     return [
    //         prefixCls
    //     ]
    // })
</script>

<style scoped lang="scss"></style>
