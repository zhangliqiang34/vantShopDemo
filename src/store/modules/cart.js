import { getCartGoodsList, pay } from '../../services/cart'
import { UPDATE_CART_GOODS_LIST } from '../mutations-type'
export default {
    namespaced: true,
    state: {
        cartGoodsList: [],
    },
    mutations: {
        [UPDATE_CART_GOODS_LIST](state, payload) {
            state.cartGoodsList = payload
        }
    },
    actions: {
        async getCartGoodsList({ state, commit }, payload) {
            const { data, code } = await getCartGoodsList(payload);

            if (code === 200) {
                commit(UPDATE_CART_GOODS_LIST, data)
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        },
        async pay({ state, commit }, payload) {
            const res = await pay(payload);

            if (res === true) {
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        },

    }
}