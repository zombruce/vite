<template>
    <Layout :class="prefixCls">
        <Header />
        <div>index</div>
    </Layout>
</template>

<script lang="ts" setup>
    import { useDesign } from '@/hooks/Design/web/useDesign'
    import Header from './header/Index.vue'

    const { prefixCls } = useDesign('default-layout')
</script>

<style scoped lang="scss"></style>
