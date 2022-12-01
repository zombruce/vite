/*
 * @Author: Yu Yang
 * @Date: 2021-03-20 15:59:41
 * @Description:
 * @LastEditTime: 2022-09-06 13:53:51
 * @LastEditors: Blake He
 */
import { isObject } from 'lodash'

const baseDivisor = 100

const conversionFileds = [
    'pmsAnnualFee',
    'billingAnnualFee',
    'roomCurrentPrice',
    'totalPay',
    'todayPrice',
    'totalConsumption',
    'balance',
    'avgPrice',
    'roomTotalPrice',
    'price',
    'marketPrice',
    'originalRoomPrice',
    'roomOrderPrice',
    'oldPrices',
    'orderPrice',
    'roomPrice',
    'priceList',
    'newPrice',
    'oldPrice',
    'roomorderPrice',
    'totalAccounts',
    'totalPrice',
    'retailPrice',
    'averagePrice',
    'amount',
    'subscriptionAmount',
    'subscription',
    'financeTotal',
    'paymentTotal',
    'consumptionTotal',
    'preLicensing',
    'depositTotal',
    'subscriptionTotal',
    'roomPreLicensing',
    'sum',
    'itemTotal',
    'historyNotOver',
    'todayOver',
    'todayHappened',
    'todayNotOver',
    'costPrice',
    'damagePrice',
    'chargeAmount',
    'revenue',
    'avgRoomprice',
    'roomIncome',
    'smallwareIncome',
    'serviceIncome',
    'compensate',
    'adjuestAmount',
    'totalAmount',
    'quickInvoice',
    'quickInvoiceBefDiscount',
    'calendaPrice',
    'priceData',
    'totalAmountBeg',
    'totalAmountEnd',
    'roomTypePrice',
    'consumptionAmount',
    'preauthorizationAmount',
    'payAmount',
    'uintPrice',
    'totalDeposit',
    'authorizedAmount',
    'allConsumptionTotal',
    'daysPrice',
    'todayRegain',
    'todayBalance',
    'yesterdayBalance',
    'lender',
    'guestAccount',
    'borrower',
    'monthTotal',
    'yearTotal',
    'totalConsumptionPrice',
    'totalPaymentPrice',
    'totalRoomPrice',
    'preAuthorPrice',
    'consumptionPrice',
    'deposit',
    'paymentPrice',
    'differencePrice',
    'consumeAmount',
    'teamPay',
    'PRICE',
    'ITEM_AMOUNT',
    'AMOUNTRECEIVED',
    'ORDERAMOUNT',
    'DEPOSIT',
    'ARREARS',
    'accountChargeSumAmount',
    'accountCollSumAmount',
    'accountConsumeSumAmount',
    'chargeSumAmount',
    'todayYjAmount',
    'otherSumAmount',
    'payableSumAmount',
    'qtSumBalance',
    'todayQtBalance',
    'collAmount',
    'djAmount',
    'sumAmount',
    'yjAmount',
    'accountPayableSumAmount',
    'accountQtBalance',
    'depositAmount',
    'payableTodayAmount',
    'todayFrontStageAmount',
    'classesChargeSumAmount',
    'classesCollSumAmount',
    'classesConsumeSumAmount',
    'classesPayableSumAmount',
    'classesQtBalance',
    'itemBalance',
    'itemChargeSumAmount',
    'itemCollectionSumAmount',
    'itemConsumptionSumAmount',
    'itemOtherCollectionSumAmount',
    'itemPayableSumAmount',
    'waitingBillAmount',
    'oweBillQuota',
    'markPrice',
    'trailPrice',
    'trailMarkPrice'
]

export function digitalConversion(data: any, url: string | undefined, isSend: boolean, arrayKey = '') {
    if (url && url.indexOf('/configcenter/no-token/getHotelConfigList') > -1) {
        if (data && data.configs && isObject(data.configs)) {
            for (const key in data.configs) {
                if (
                    conversionFileds.indexOf(key) > -1 &&
                    /^([-+])?\d+(\.[0-9]{1,2})?$/.test(data.configs[key].confValue)
                ) {
                    data.configs[key].confValue = _toYuan(parseFloat(data.configs[key].confValue), isSend).toString()
                }
            }
        }
    } else if (Array.isArray(data)) {
        data.forEach((item: any, index: number) => {
            if (Array.isArray(item) || isObject(item)) {
                digitalConversion(item, url, isSend)
            } else if (
                /^([-+])?\d+(\.[0-9]{1,2})?$/.test(item) &&
                arrayKey &&
                conversionFileds.indexOf(arrayKey) > -1
            ) {
                data[index] = _toYuan(parseFloat(item), isSend)
            }
        })
    } else if (isObject(data)) {
        for (const key in data) {
            if (Array.isArray(data[key])) {
                digitalConversion(data[key], url, isSend, key)
            } else if (isObject(data[key])) {
                digitalConversion(data[key], url, isSend)
            } else if (/^([-+])?\d+(\.[0-9]{1,2})?$/.test(data[key])) {
                if (conversionFileds.indexOf(key) > -1) {
                    data[key] = _toYuan(parseFloat(data[key]), isSend)
                }
            }
        }
    }
}

function _toYuan(num: number, isSend: boolean) {
    let tempNum: any = 0
    if (isSend) {
        tempNum = (num * baseDivisor).toFixed(0)
    } else {
        tempNum = (num / baseDivisor).toFixed(2)
    }
    if (/^([-+])?\d+(\.[0-9]{1,2})?$/.test(tempNum)) {
        return (tempNum * baseDivisor) / baseDivisor
    }
    return num
}
