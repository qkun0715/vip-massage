import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import { Locals } from "./common/vantLocal.js";
Vue.prototype.$Local = Locals;
Vue.use(VueI18n);
const i18n = new VueI18n({
  //定义默认语言
  locale: "cn",
  messages: {
    en: require("./common/en.js"),
    cn: require("./common/cn.js")
  }
});

import {
  Button,
  Col,
  Icon,
  Lazyload,
  NavBar,
  Row,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  List,
  Popup,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Dialog
} from "vant";

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Row)
  .use(Col)
  .use(Icon)
  .use(NavBar)
  .use(Button)
  .use(List)
  .use(Popup)
  .use(RadioGroup)
  .use(Radio)
  .use(CellGroup)
  .use(Cell)
  .use(Dialog);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
