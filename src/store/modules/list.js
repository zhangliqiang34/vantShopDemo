import { getGoodsList } from '../../services/list'
import { UPDATE_GOODS_LIST, UPDATE_PAGE_NUM } from '../mutations-type'
export default {
    namespaced: true,
    state: {
        goodsList: [],
        pageNum: 1
    },
    mutations: {
        [UPDATE_GOODS_LIST](state, payload) {
            state.goodsList = [...state.goodsList, ...payload]
        },
        [UPDATE_PAGE_NUM](state, payload) {
            state.pageNum = payload || 1
        }
    },
    actions: {
        async getGoodsList({ state, commit }, payload) {
            const { data, isLast, code } = await getGoodsList({ pageNum: state.pageNum });

            if (code === 200) {
                commit(UPDATE_GOODS_LIST, data)
                commit(UPDATE_PAGE_NUM, state.pageNum + 1)
                return Promise.resolve(isLast)
            } else {
                commit(UPDATE_PAGE_NUM, state.pageNum)
                return Promise.reject()
            }
        }
    }
}