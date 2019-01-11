import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state: {
    userInfo: {}, //用户信息对象
    groupsSubbranch: {} //其他页面需要集团的数据
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setGroupsSubbranch(state, groupsSubbranch) {
      state.groupsSubbranch = groupsSubbranch;
    }
  },
  actions: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
