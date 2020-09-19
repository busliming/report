/*
 * @Desc: 
 * @Date: 2020-05-13 16:33:09
 * @LastEditors: Nice
 * @LastEditTime: 2020-05-14 16:25:19
 */
export default {
    // namespaced: true,
    state: {
        token: '',
    },
    getters: {
        get_token(state) {
            return state.token;
        }
    },
    actions: {
        set_token({ commit }, token) {
            commit("set_token", token)
        },
        clear_token({ commit }) {
            commit("clear_token")
        }
    },
    mutations: {
        set_token(state, token) {
            state.token = token
        },
        clear_token(state) {
            state.token = ''
        }

    }
}