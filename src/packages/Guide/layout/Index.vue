<template>
    <div class="content">
        <div v-if="step <= 5">
            <div :class="{ active: step === 1, done: step > 1 }">
                <span>创建房型</span>
                <span>可从EBK中同步也可手动创建</span>
                <span>1</span>
            </div>
            <div :class="{ active: step === 2, done: step > 2 }">
                <span>创建房型</span>
                <span>创建房间并与房型关联</span>
                <span>2</span>
            </div>
            <div :class="{ active: step === 3, done: step > 3 }">
                <span>价格设置</span>
                <span>可从EBK中同步房型每日价格</span>
                <span>3</span>
            </div>
            <div :class="{ active: step === 4, done: step > 4 }">
                <span>自动搬单设置</span>
                <span>可自动同步EBK上的订单</span>
                <span>4</span>
            </div>
            <div :class="{ active: step === 5, done: step > 5 }">
                <span>在住人同步</span>
                <span>可将PSB中的在住人同步到系统中</span>
                <span>5</span>
            </div>
        </div>
        <div>
            <RouterView #="{ Component }">
                <component :is="Component" />
            </RouterView>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    const step = ref(4)
</script>

<style lang="scss" scoped>
    .content {
        width: 100%;
        height: 100%;
        background: url('/guide/common/common-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        padding: 68px 35px 32px 34px;
        box-sizing: border-box;
        background-color: #ffffff;
        & > div:first-child {
            width: 171px;
            height: 100%;
            padding-right: 38px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            & > div {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;
                & > :nth-child(1) {
                    font-size: 18px;
                    font-family: PingFang-SC-Bold, PingFang-SC;
                    font-weight: bold;
                    color: #ffffff;
                }
                & > :nth-child(2) {
                    margin-top: 5px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                }
                & > :nth-child(3) {
                    width: 64px;
                    height: 64px;
                    background: url('/guide/common/common-icon1.png') no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: 50%;
                    right: -38px;
                    transform: translate(50%, -50%);
                    z-index: 2;
                    font-size: 28px;
                    font-family: PingFang-SC-Heavy, PingFang-SC;
                    font-weight: 800;
                    color: #999999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                &.active {
                    & > :nth-child(1) {
                        color: #ffd78d;
                    }
                    & > :nth-child(2) {
                        color: #ffd78d;
                    }
                    & > :nth-child(3) {
                        color: #333333;
                        background: url('/guide/common/common-icon2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                &.done {
                    & > :nth-child(3) {
                        color: #ffffff;
                        &::after {
                            position: absolute;
                            z-index: 11;
                            content: '';
                            display: block;
                            width: 26px;
                            height: 20px;
                            background: url('/guide/common/common-icon3.png') no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }
        & > div:last-child {
            flex: 1;
            box-shadow: 0px 0px 4px 4px rgba(153, 153, 153, 0.15);
            border-radius: 2px;
            box-sizing: border-box;
            background: linear-gradient(311deg, #dffffd 0%, #ffffff 100%);
        }
    }
</style>
