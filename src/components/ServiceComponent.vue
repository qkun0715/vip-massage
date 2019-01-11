<template>
    <div>
        <van-row>
            <van-col span="8">
                <div class="service-image">
                    <img :src="serviceImage" width="100px" height="80px" :onerror="errorImg"/>
                </div>
            </van-col>
            <van-col span="16">
                <div class="service-item">
                    <div class="service-name">{{serviceName}}</div>
                    <div class="service-info">{{serviceInfo}}</div>
                    <div class="item-right-bottom" @click.stop>
                        <div class="service-price">NT${{servicePrice}}</div>
                        <div class="service-count">{{serviceCount}}分钟/次</div>
                        <van-button class="service-button"
                                    round
                                    type="danger"
                                    @click="onAppointment"
                                    size="small">预约</van-button>
                    </div>
                </div>

            </van-col>
        </van-row>
    </div>
</template>

<script>
export default {
  name: "ServiceComponent",
  components: {},
  props: [
    "serviceName",
    "serviceInfo",
    "serviceImage",
    "servicePrice",
    "serviceCount"
  ],
  data() {
    return {
      errorImg: 'this.src="' + require("@/common/images/errorimg.png") + '"'
    };
  },
  mounted() {},
  methods: {
    onAppointment() {
      this.$emit("onAppointment");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    .service-image
        display flex
        align-items center
        justify-content center

    .service-item
        display: flex
        flex-direction column
        justify-content: center
        height 80px

        .service-name
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            font-size: 16px
            color: black

        .service-info
            font-size: 14px
            color: #333333
            overflow hidden
            white-space nowrap
            text-overflow ellipsis

        .item-right-bottom
            display flex
            justify-content space-between
            align-items center

            .service-price
                font-size: 16px
                color: red

            .service-count
                font-size: 14px
                color: #333333

            .service-button
                margin-right: 16px
                text-align center


</style>
