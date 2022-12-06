<template>
    <ConfigProvider :locale="zhCN" :getPopupContainer="getPopupContainer">
        <RouterView #="{ Component }">
            <component :is="Component" />
        </RouterView>
    </ConfigProvider>
</template>

<script setup lang="ts">
    import { ConfigProvider } from 'ant-design-vue'
    import zhCN from 'ant-design-vue/es/locale/zh_CN'


    const getPopupContainer = (el, dialogContext) => {
        if (dialogContext) {
            return dialogContext.getDialogWrap()
        }
        return document.getElementById('app')
    }
</script>
