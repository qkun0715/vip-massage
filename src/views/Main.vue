<template>
    <div>
        <div class="main-div">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </div>
        <!--通过变量来控制是否选中了哪一个-->
        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">{{$t('message.home')}}</van-tabbar-item>
            <van-tabbar-item icon="records">{{$t("message.order")}}</van-tabbar-item>
            <van-tabbar-item icon="contact">{{$t("message.personal")}}</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
import axios from "axios";
import serviceApi from "../common/ApiService";
import { Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      active: 0, //默认第一个
      openid: "oq2f-06SX6qZjFKvKHCBQLJ5y_tc",
      userInfo: {}, //个人信息对象
      show: true, //是否显示
      radio: "1"
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    //弹框试试
  },
  methods: {
    abc() {
      if (this.radio === "1") {
        this.$i18n.locale = "cn";
        this.$Local("cn");
      } else {
        this.$i18n.locale = "en";
        this.$Local("en");
      }
    },
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "Home" });
          break;
        case 1:
          this.$router.push({ name: "OrderForm" });
          break;
        case 2:
          this.$router.push({ name: "Personal" });
          break;
      }
    },

    //根据openid获取用户信息
    getUserInfo() {
      axios({
        url: serviceApi.getInfoByOpenid,
        method: "get",
        params: {
          openid: this.openid
        }
      })
        .then(res => {
          if (res.data.code === 0 && res.data.rows) {
            this.userInfo = res.data.rows;
            this.setUserInfo(this.userInfo);
          } else {
            Toast.fail("获取个人信息失败！请重新进入");
          }
        })
        .catch(error => {
          Toast.fail("获取个人信息失败！请重新进入");
          console.log(error);
        });
    },
    ...mapMutations({
      setUserInfo: "setUserInfo"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
