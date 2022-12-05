<template>
    <div>
        <span>Guide</span>
        {{ counter.count }}
        <a-button type="primary" @click="doclick">点击</a-button>
        <a-button type="link" @click="showMessage">message</a-button>
    </div>
</template>
<script lang="ts" setup>
    import { storeToRefs } from 'pinia'
    import { message } from 'ant-design-vue'
    import { useCounterStore } from '@/stores/index'

    const showMessage = () => {
        message.warning('1231231231')
    }
    console.log(storeToRefs, storeToRefs(useCounterStore()))
    const { count } = storeToRefs(useCounterStore())
    const counter = useCounterStore()
    const doclick = () => {
        counter.increment()
    }
</script>
