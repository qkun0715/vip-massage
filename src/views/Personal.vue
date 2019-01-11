<template>
    <div class="personal-wrapper">
        <!--user info area-->
        <div class="user-info-area">
            <van-row>
                <van-col span="8">
                    <div class="user-head">
                        <img class="head-img" :src="userInfo.headimgurl">
                    </div>
                </van-col>
                <van-col span="16">
                    <div class="user-info">
                        <div>昵称: {{userInfo.nickname}}</div>
                        <div>会员: {{memberName}}</div>
                        <div>编号: {{userInfo.number}}</div>
                        <div>积分: {{effective}}</div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <!--type area-->
        <div class="type-bar">
            <div v-for="(type,index) in typeList" :key="index" @click="onClick(index)">
                <img :src="type.image">
                <div>{{type.name}}</div>
            </div>
        </div>

        <!--other option-->
        <div class="other-option">
            <div v-for="(item,index) in otherList" :key="index" @click="onClickItem(index)">
                <img :src="item.image">
                <div>{{item.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "vant";
import axios from "axios";
import ApiService from "../common/ApiService";

export default {
  name: "Personal",
  components: {},
  data() {
    return {
      typeList: [
        {
          image: require("../common/images/icon_confirmed.png"),
          name: "待确定"
        },
        { image: require("../common/images/icon_payment.png"), name: "已确定" },
        {
          image: require("../common/images/icon_complete.png"),
          name: "已完成"
        },
        { image: require("../common/images/icon_evaluate.png"), name: "待评价" }
      ],
      otherList: [
        {
          image: require("../common/images/icon_integral.png"),
          text: "我的积分"
        },
        {
          image: require("../common/images/icon_member.png"),
          text: "会员权限"
        },
        { image: require("../common/images/icon_person.png"), text: "个人信息" }
      ],
      effective: "", //可用积分
      totalIntegral: "", //总分
      levelList: [], //等级集合
      one: "",
      two: "",
      three: "",
      four: "",
      lname_one: "",
      lname_two: "",
      lname_three: "",
      lname_four: ""
    };
  },
  created() {
    this.getEffectivePoint();
    this.getLevelData();
  },
  computed: {
    //根据当前积分来判断会员等级
    memberName() {
      let member = "";
      if (this.totalIntegral >= this.one && this.totalIntegral <= this.two) {
        member = this.lname_one;
      } else if (
        this.totalIntegral > this.two &&
        this.totalIntegral <= this.three
      ) {
        member = this.lname_two;
      } else if (
        this.totalIntegral > this.three &&
        this.totalIntegral <= this.four
      ) {
        member = this.lname_three;
      } else if (this.totalIntegral > this.four) {
        member = this.lname_four;
      }
      return member;
    },
    ...mapState(["userInfo"])
  },
  methods: {
    /*可用积分*/
    getEffectivePoint() {
      axios({
        url: ApiService.getEffectivePoint,
        method: "get",
        params: { cusId: this.userInfo.id }
      })
        .then(res => {
          if (res.data.code === 0 && res.data.rows) {
            this.effective = res.data.rows.efective;
            this.totalIntegral = res.data.rows.getTotal;
          } else {

            Toast.fail("服务器数据错误");
          }
        })
        .catch(error => {
          Toast.fail(error);
        });
    },
    /*等级规则*/
    getLevelData() {
      axios({
        url: ApiService.getLevel,
        method: "get"
      })
        .then(res => {
          if (res.data.code === 0 && res.data.rows) {
            this.levelList = res.data.rows;
            this.one = res.data.rows[3].minimum;
            this.lname_one = res.data.rows[3].lname;
            this.two = res.data.rows[2].minimum;
            this.lname_two = res.data.rows[2].lname;
            this.three = res.data.rows[1].minimum;
            this.lname_three = res.data.rows[1].lname;
            this.four = res.data.rows[0].minimum;
            this.lname_four = res.data.rows[0].lname;
          } else {
            Toast.fail("服务器数据错误");
          }
          console.log(res.data.rows);
        })
        .catch(error => {
          Toast.fail(error);
        });
    },
    onClick(index) {
      switch (index) {
        case 0:
          Toast("待确定");
          break;
        case 1:
          Toast("已确定");
          break;
        case 2:
          Toast("已完成");
          break;
        case 3:
          Toast("待评价");
          break;
      }
    },
    onClickItem(index) {
      switch (index) {
        case 0:
          Toast("我的积分");
          break;
        case 1:
          Toast("会员权限");
          break;
        case 2:
          Toast("个人信息");
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .user-info-area
        width: 100%
        height: 10rem
        background-color: #bfa173

        .user-head
            height: 10rem
            display flex
            align-items center
            justify-content center

            .head-img
                width 5rem
                height 5rem
                border-radius: 50%

        .user-info
            height 10rem
            display flex
            flex-direction column
            justify-content center

        .user-info > div
            color white
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            font-size 0.9rem

    .type-bar
        display flex
        flex-direction row
        flex-flow nowrap
        background-color #fff
        padding-top 0.9rem

    .type-bar > div
        flex 1
        text-align center
        font-size 0.875rem

    .other-option
        display flex
        flex-direction column
        background-color #fff
        padding-top 0.9rem
        padding-left 1rem

    .other-option > div
        padding-top 0.5rem
        padding-bottom 0.5rem
        display flex
        flex-direction row
        flex-flow nowrap
        align-items center
        font-size 0.875rem
        border-bottom 1px solid #f0f0f0

    .other-option > div > div
        margin-left 1rem

</style>
