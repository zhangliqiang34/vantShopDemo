// export const getGoodsList = (params) => {
//     ajaxFun()
// }

import ajaxFun from "../untils/ajaxFun"

export const getGoodsList = (params) => {
    return ajaxFun({
        method: 'get',
        url: '/api/getGoodsList',
        params
    })
}