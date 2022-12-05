<template>
    <div>
        AI
        <a-button type="primary">button</a-button>
        <a-button type="link" @click="showMessage">message</a-button>
    </div>
</template>
<script lang="ts" setup>
    import { message } from 'ant-design-vue'

    const showMessage = () => {
        message.warning('1231231231')
    }
</script>
