// export const getGoodsList = (params) => {
//     ajaxFun()
// }

import ajaxFun from "../untils/ajaxFun"

export const getGoodsDetail = (id) => {
    return ajaxFun({
        method: 'get',
        url: '/api/getGoodsDetail',
        params: {
            id
        }
    })
}
export const getGoodsSku = (id) => {
    return ajaxFun({
        method: 'get',
        url: '/api/getGoodsSku',
        params: {
            id
        }
    })
}

export const addToCart = (params) => {
    return ajaxFun({
        method: 'post',
        url: '/api/addToCart',
        params
    })
}