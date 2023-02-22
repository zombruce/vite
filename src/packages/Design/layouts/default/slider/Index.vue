<template>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <span>nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <span>nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <span>nav 3</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts" setup>
    import { ref, defineComponent } from 'vue'
    import { Layout, Menu } from 'ant-design-vue'
    const selectedKeys = ref<string[]>(['1'])
    const collapsed = ref<boolean>(false)
</script>
<style scoped lang="scss">
:deep(.ant-menu-item) {
  margin: 0 !important;
}
</style>
