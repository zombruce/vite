<template>
    <!-- <Sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <<Menu class="SubMenu"></Menu>
        </Menu>
    </Sider> -->
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
            <a-menu-item key="1">
                <user-outlined />
                <span>nav 1</span>
            </a-menu-item>
            <a-menu-item key="2">
                <video-camera-outlined />
                <span>nav 2</span>
            </a-menu-item>
            <a-menu-item key="3">
                <upload-outlined />
                <span>nav 3</span>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script lang="ts" setup>
    import { ref, defineComponent } from 'vue'
    import { Layout, Menu } from 'ant-design-vue'
    defineComponent({
        Sider: Layout.Sider
    })
    const selectedKeys = ref<string[]>(['1'])
    const collapsed = ref<boolean>(false)
</script>
<style scoped lang="scss"></style>
