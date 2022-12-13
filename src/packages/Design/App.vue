<template>
    <a-config-provider :locale="zhCN" :getPopupContainer="getPopupContainer">
        <RouterView #="{ Component }">
            <component :is="Component" />
        </RouterView>
    </a-config-provider>
</template>

<script setup lang="ts">
    import { ConfigProvider } from 'ant-design-vue'
    import zhCN from 'ant-design-vue/es/locale/zh_CN'
    import { reactive } from 'vue'

    const getPopupContainer = (el, dialogContext) => {
        if (dialogContext) {
            return dialogContext.getDialogWrap()
        }
        return document.getElementById('app')
    }

    const colorState = reactive({
        primaryColor: 'red',
        errorColor: '#ff4d4f',
        warningColor: '#faad14',
        successColor: '#52c41a',
        infoColor: '#1890ff'
    })
    ConfigProvider.config({
        theme: colorState
    })
</script>
