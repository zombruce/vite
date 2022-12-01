<template>
    <div>
        <span>Guide</span>
        {{ counter.count }}
        <a-button type="primary" @click="doclick">点击</a-button>

        <a-row>
            {{ count }}
        </a-row>
    </div>
</template>
<script lang="ts" setup>
    import { storeToRefs } from 'pinia'
    import { useCounterStore } from '@/stores/index'

    console.log(storeToRefs, storeToRefs(useCounterStore()))
    const { count } = storeToRefs(useCounterStore())
    const counter = useCounterStore()
    const doclick = () => {
        counter.increment()
    }
</script>
