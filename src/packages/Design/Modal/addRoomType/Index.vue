<template>
    <a-modal v-model:visible="visible" title="添加房型" :closable="false" :width="600" centered>
        <a-form ref="formRef" :model="formState" :rules="rules" :colon="false" labelAlign="right" class="form">
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="12">
                    <a-form-item label="房型" name="name">
                        <a-input v-model:value="formState.name" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="床型" name="roomType">
                        <a-select v-model:value="formState.roomType" placeholder="请选择">
                            <a-select-option key="1" value="2">1231</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="12">
                    <a-form-item label="简称" name="nameAbbr">
                        <a-input v-model:value="formState.nameAbbr" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="基础房价" name="roomPrice">
                        <a-input v-model:value="formState.roomPrice" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="12">
                    <a-form-item label="床位数" name="bedNum">
                        <a-input v-model:value="formState.bedNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="入住人数" name="conguestsNum">
                        <a-input v-model:value="formState.conguestsNum" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="12">
                    <a-form-item label="超订数" name="maxorderNum">
                        <a-input v-model:value="formState.maxorderNum" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="床宽" name="bedSize">
                        <a-select>
                            <a-select-option key="1" value="2">1231</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="12">
                    <a-form-item label="窗户" name="windowFlag">
                        <a-select>
                            <a-select-option key="1" value="2">1231</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="面积" name="acreage">
                        <a-input v-model:value="formState.acreage"></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 0]" justify="space-between">
                <a-col :span="24">
                    <a-form-item label="备注" name="remarks">
                        <a-textarea :autoSize="{ minRows: 2, maxRows: 2 }" placeholder="请输入"></a-textarea>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <template #footer>
            <a-button @click="cancel">取消</a-button>
            <a-button type="primary" @click="submit">确定</a-button>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
    import { PropType, reactive, ref, toRaw } from 'vue'
    import { RoomTypeInfo } from './interface'

    const props = defineProps({
        onOk: {
            type: Function
        },
        roomTypeInfo: {
            type: Object as PropType<RoomTypeInfo>,
            default: () => {
                return {}
            }
        }
    })
    const formRef = ref<any>(null)
    const visible = ref<Boolean>(true)
    const formState = reactive({
        // 显示名称
        name: props.roomTypeInfo.name || '',
        // 床型
        roomType: props.roomTypeInfo.roomType || '',
        // 简称
        nameAbbr: props.roomTypeInfo.nameAbbr || '',
        // 基础房价
        roomPrice: props.roomTypeInfo.roomPrice || '',
        //床位数
        bedNum: props.roomTypeInfo.bedNum || '',
        // 入住人数
        conguestsNum: props.roomTypeInfo.conguestsNum || '',
        //超订数
        maxorderNum: props.roomTypeInfo.maxorderNum || '',
        // 床宽
        bedSize: props.roomTypeInfo.bedSize || '',
        // 窗户
        windowFlag: props.roomTypeInfo.windowFlag || '',
        // 面积
        acreage: props.roomTypeInfo.acreage || '',
        // 备注
        remarks: props.roomTypeInfo.remarks || ''
    })

    // 简称校验
    const nameValidator = (name, max = 50) => {
        switch (true) {
            case !name:
                return Promise.reject('请输入房型名称')
            case name.length > max:
                return Promise.reject(`最多允许${max}个字符`)
            case !/^[\u4e00-\u9fa5_a-zA-Z]+$/.test(name):
                return Promise.reject('仅支持中文，英文字符')
            default:
                return Promise.resolve()
        }
    }

    // 基础价格
    const numValidator = (_num, max = 9999) => {
        switch (true) {
            case !/\d/.test(_num):
                return Promise.reject('仅支持输入数字')
            case !/^[1-9]\d*$/.test(_num):
                return Promise.reject('金额必须整数')
            case _num < 0:
                return Promise.reject('最小值0')
            case _num > max:
                return Promise.reject(`最大值${max}`)
            default:
                return Promise.resolve()
        }
    }

    const rules = reactive({
        // name: [
        //     {
        //         type: 'string',
        //         required: true,
        //         validator: (rule, value, callback) => {
        //             return nameValidator(value, 10)
        //         }
        //     }
        // ],
        // roomType: [
        //     {
        //         type: 'number',
        //         required: true,
        //         message: '床型不能为空'
        //     }
        // ],
        // nameAbbr: [
        //     {
        //         type: 'string',
        //         required: true,
        //         validator: (rule, value, callback) => {
        //             return nameValidator(value, 5)
        //         }
        //     }
        // ],
        // roomPrice: [
        //     {
        //         type: 'number',
        //         validator: (rule, value, callback) => {
        //             if (!value && value !== 0) {
        //                 return Promise.reject(new Error('基础房价不能为空'))
        //             } else {
        //                 return numValidator(value, 99999)
        //             }
        //         }
        //     }
        // ],
        // bedNum: [
        //     {
        //         required: true,
        //         type: 'number',
        //         validator: (_: unknown, value: number) => {
        //             const min = 1
        //             const max = 99
        //             const message = `最大值${max}`
        //             switch (true) {
        //                 case !value && value !== 0:
        //                     return Promise.reject(new Error('床位数为空'))
        //                 case !/\d/.test(value.toString()):
        //                     return Promise.reject(new Error('仅支持输入数字'))
        //                 case Number(value) < min:
        //                     return Promise.reject(new Error(`最小值${min}`))
        //                 case Number(value) > max:
        //                     return Promise.reject(message)
        //                 default:
        //                     return Promise.resolve()
        //             }
        //         }
        //     }
        // ],
        // conguestsNum: [
        //     {
        //         type: 'number',
        //         validator: (_: unknown, value: number) => {
        //             const min = 0
        //             const max = 99
        //             const message = `最大值${max}`
        //             switch (true) {
        //                 case !value && value !== 0:
        //                     return Promise.reject(new Error('入住人数为空'))
        //                 case !/\d/.test(value.toString()):
        //                     return Promise.reject(new Error('仅支持输入数字'))
        //                 case Number(value) < min:
        //                     return Promise.reject(new Error(`最小值${min}`))
        //                 case Number(value) > max:
        //                     return Promise.reject(message)
        //                 default:
        //                     return Promise.resolve()
        //             }
        //         }
        //     }
        // ]
    })

    const cancel = () => {
        visible.value = false
    }

    const submit = () => {
        console.log(props, 'props')
        formRef?.value?.validate().then(() => {
            cancel()
            props?.onOk?.(toRaw(formState))
        })
    }
</script>
<style scoped lang="scss">
    // :deep(.ant-modal-content) {
    //     .ant-modal-header {
    //         background: linear-gradient(90deg, #0bd2b4 0%, #0bbbd2 100%);
    //         .ant-modal-title {
    //             font-size: 18px;
    //             font-family: PingFangTC-Semibold, PingFangTC;
    //             font-weight: 600;
    //             color: #ffffff;
    //             line-height: 25px;
    //         }
    //     }
    //     .ant-modal-body {
    //         padding: 40px 36px 0px;
    //         box-sizing: border-box;
    //         .form {
    //             .ant-form-item-label {
    //                 width: 70px;
    //             }
    //         }
    //     }
    //     .ant-modal-footer {
    //         border: none;
    //         padding: 0px 32px 16px 0;
    //         box-sizing: border-box;
    //         .ant-btn {
    //             width: 120px;
    //             border-radius: 8px;
    //             border-color: #0bcdbb;
    //             background: #0bcdbb;
    //             margin-left: 0;
    //             &:first-child {
    //                 background: #ffffff;
    //                 color: #4ac3bb;
    //                 margin-right: 16px;
    //             }
    //         }
    //     }
    // }
</style>
