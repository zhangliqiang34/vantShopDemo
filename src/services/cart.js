// export const getGoodsList = (params) => {
//     ajaxFun()
// }

import ajaxFun from "../untils/ajaxFun"

export const getCartGoodsList = (id) => {
    return ajaxFun({
        method: 'get',
        url: '/api/getCartGoodsList',
        params: {
            id
        }
    })
}
export const pay = (params) => {
    return ajaxFun({
        method: 'post',
        url: '/api/pay',
        params
    })
}