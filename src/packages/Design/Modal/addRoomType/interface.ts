export interface RoomTypeInfo {
    // 显示名称
    name: string
    // 床型
    roomType: number
    // 简称
    nameAbbr: string
    // 基础房价
    roomPrice: number
    //床位数
    bedNum: number
    // 入住人数
    conguestsNum: number
    //超订数
    maxorderNum: number
    // 床宽
    bedSize: number | string
    // 窗户
    windowFlag: number | string
    // 面积
    acreage: string
    // 备注
    remarks: string
}
