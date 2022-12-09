import { CONFIG_CENTER, OPERATION_CENTER, PSB_GATEWAY, NIGHTAUDIT_CENTER } from './constants'
import http from '@/http/service'
import { RequestEnum } from '@/enums/httpEnum'

enum Api {
    demo = '/demo',
    getHotelConfigValueByKey = '/no-token/getHotelConfigValueByKey'
}

/**
 * 查询自助入住邀请信息
 * @param params
 * @returns
 */
export function demo(params) {
    return http.request({
        url: `${OPERATION_CENTER}${Api.demo}`,
        method: RequestEnum.GET,
        params
    })
}

/**
 * @description: 获取hotelConfig值
 * @param {*} params
 * @return {*}
 */
export function getHotelConfigValueByKey(params) {
    return http.request({
        url: `${CONFIG_CENTER}${Api.getHotelConfigValueByKey}`,
        method: RequestEnum.GET,
        params
    })
}
