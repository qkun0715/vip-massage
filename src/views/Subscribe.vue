<!--预约界面-->
<template>
    <div>
        <!--service info-->
        <div class="service-area">
            <van-row>
                <van-col span="8">
                    <div class="service-image">
                        <img class="image" :src="this.subscribe.serviceImg" :onerror="errorImg"/>
                    </div>
                </van-col>
                <van-col span="16">
                    <div class="service-item">
                        <div class="service-name">
                            <span class="name">{{this.subscribe.serviceName}}</span>
                            <span>0人选择</span>
                        </div>
                        <div class="service-info">
                            <span class="price">NT${{this.subscribe.servicePrice}}</span>
                            <span>{{this.subscribe.serviceDuration}}分钟/次</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="line-space"></div>
        <!--项目选项-->
        <div class="subscribe-option">
            <van-row class="booking-person">
                <van-col class="option" span="8">预约人</van-col>
                <van-col span="16">
                    <van-field v-model="name"  input-align="right" placeholder="请输入用户名" />
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">电话</van-col>
                <van-col span="16">
                    <van-field v-model="phone"  input-align="right" placeholder="请输入电话号码" />
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">店铺</van-col>
                <van-col span="16">span: 8</van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">选择师傅</van-col>
                <van-col span="16">span: 8</van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">预约时间</van-col>
                <van-col span="16">span: 8</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'Subscribe',
        data() {
            return {
                errorImg: 'this.src="' + require('@/common/images/errorimg.png') + '"',
                name:'',
                phone:''
            };
        },
        computed: {
            ...mapState([
                'subscribe',
            ]),
        },
    };
</script>

<style lang="stylus" scoped>
    .service-area
        padding-top 1rem
        padding-bottom 1rem

        .service-image
            display flex
            align-items center
            justify-content center
            height 6.25rem

            .image
                height 5rem
                width 5rem

        .service-item
            display flex
            height 6.25rem
            flex-direction column
            justify-content center
            padding-right 1rem
            font-size: 0.9rem
            color: #282828
            line-height 3.125rem

            .service-name
                display flex
                flex-direction row
                justify-content space-between

                .name
                    flex 1
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    padding-right 1rem

            .price
                font-size: 18px
                color: #d13a32
                padding-right 1rem


    .line-space
        width: 100%
        height: 0.5rem
        background: #f3f3f3
    .subscribe-option
        .booking-person
            padding 0 1rem 0 1rem
            border-bottom #f3f3f3 solid 1px
            .option
                height 44px
                line-height 44px
                color: #282828
                font-size 0.9rem

</style>
