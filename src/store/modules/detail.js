import { getGoodsDetail, getGoodsSku, addToCart } from '../../services/detail'
import { UPDATE_GOODS_DETAIL, UPDATE_GOODS_SKU } from '../mutations-type'
export default {
    namespaced: true,
    state: {
        goodsDetail: {},
        goodsSku: {}
    },
    getters: {
        goodsInfo(state) {
            return {
                title: state.goodsDetail.title,
                picture: state.goodsDetail.picture
            }
        }
    },
    mutations: {
        [UPDATE_GOODS_DETAIL](state, payload) {
            state.goodsDetail = payload
        },
        [UPDATE_GOODS_SKU](state, payload) {
            state.goodsSku = payload
        }
    },
    actions: {
        async getGoodsDetail({ state, commit }, payload) {
            const { data, code } = await getGoodsDetail(payload);
            alert('123')
            if (code === 200) {
                commit(UPDATE_GOODS_DETAIL, data)
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        },
        async getGoodsSku({ state, commit }, payload) {
            const { data, code } = await getGoodsSku(payload);

            if (code === 200) {
                commit(UPDATE_GOODS_SKU, data)
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        },
        async addToCart({ state, commit }, payload) {
            const res = await addToCart(payload);

            if (res === true) {

                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        },

    }
}