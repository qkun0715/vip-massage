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
                            <span>{{selectedCount}}人选择</span>
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
                    <van-field class="input-area" v-model="consumer" input-align="right" placeholder="请输入用户名"/>
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">电话</van-col>
                <van-col span="16">
                    <van-field class="input-area" v-model="phone" type="number" input-align="right"
                               placeholder="请输入电话号码"/>
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">店铺</van-col>
                <van-col span="16">
                    <div class="group-subbranch">{{fullName}}</div>
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">选择师傅</van-col>
                <van-col span="16">
                    <div class="group-subbranch" @click="goTechnician">
                        <span>{{technicianName}}</span>
                        <van-icon name="arrow"/>
                    </div>
                </van-col>
            </van-row>

            <van-row class="booking-person">
                <van-col class="option" span="8">预约时间</van-col>
                <van-col span="16">
                    <div class="group-subbranch" @click="goSelectionTime">
                        <span></span>
                        <van-icon name="arrow"/>
                    </div>
                </van-col>
            </van-row>

            <van-row class="subscribe-remark">
                <van-col class="option" span="8">备注</van-col>
                <van-col span="16">
                    <van-field v-model="remark"
                               type="textarea"
                               input-align="right"
                               placeholder="如有特殊要求请留言"
                               rows="2"
                               autosize/>
                </van-col>
            </van-row>
        </div>

        <van-button class="subscribe-btn" size="large" type="primary" @click="onSubscribe">预约</van-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {Toast} from 'vant';
    import axios from 'axios';
    import ApiService from '../common/ApiService';

    export default {
        name: 'Subscribe',
        data() {
            return {
                errorImg: 'this.src="' + require('@/common/images/errorimg.png') + '"',
                consumer: '',//预约人
                phone: '', //电话
                remark: '',//备注
                selectedCount: '',//此项目预约人数
                technicianName:'随机'
            };
        },
        created() {
            /**获取从选择技师界面传递过来的Boolean值*/
            if (this.$route.params.isDefault){
                Toast("我是选择了技师的");
                this.technicianName = this.technicianInfo.name
            }
        },
        mounted() {
            /**从个人信息中获取预约人名字*/
            this.consumer = this.userInfo.realname;
            /**从个人信息中获取电话号码*/
            if (this.userInfo.mobile) {
                if (this.userInfo.mobile.startsWith('0086')) { //大陆
                    this.phone = this.userInfo.mobile.substring(4, this.userInfo.mobile.length);
                } else {
                    this.phone = this.userInfo.mobile.substring(5, this.userInfo.mobile.length);
                }
            } else {
                this.phone = '';
            }
            /**获取多少人预约了此项目 接口*/
            this.getSelectedCount();
        },
        computed: {
            fullName() {
                return this.groupsSubbranch.groupsName + '  ' + this.groupsSubbranch.subbranchName;
            },
            ...mapState([
                'subscribe',
                'userInfo',
                'groupsSubbranch',
                'technicianInfo'
            ]),
        },
        methods: {
            /**获取多少人预约了此项目 接口*/
            getSelectedCount() {
                axios({
                    url: ApiService.getSelectedCount,
                    method: 'get',
                    params: {
                        subbranchId: this.subscribe.subbranchId,
                        serviceId: this.subscribe.serviceId,
                    },
                }).then(res => {
                    if (res.data.code === 0) {
                        this.selectedCount = res.data.selectedCount;
                    } else {
                        Toast.fail('请求失败');
                    }
                }).catch(error => {
                    Toast.fail('请求失败' + error);
                });
            },
            /**进入选择技师页面*/
            goTechnician() {
                this.$router.push({name: 'Technician'});
            },
            /**进入选择预约时间页面*/
            goSelectionTime() {
                this.$router.push({name: 'SelectionTime'});
            },
            /**底部预约点击事件*/
            onSubscribe() {
                Toast('预约');
            },
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

            .service-name
                display flex
                flex-direction row
                flex-flow nowrap
                justify-content space-between

                .name
                    flex 1
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    padding-right 1rem
            .service-info
                margin-top 0.5rem
                padding-right 1rem
                .price
                    font-size: 18px
                    color: #d13a32

    .line-space
        width: 100%
        height: 0.5rem
        background: #f3f3f3

    .subscribe-option
        padding 0 1rem 0 1rem

        .booking-person
            height 2.5rem
            border-bottom #f3f3f3 solid 1px
            line-height 2.5rem

            .option
                height 2.5rem
                color: #282828
                font-size 0.9rem
                color: #282828

            .input-area
                height 2.5rem
                line-height 2.5rem
                padding 0
                overflow hidden

            .group-subbranch
                height 2.5rem
                display flex
                flex-direction row
                justify-content flex-end
                align-items center
                font-size: 16px
                color: #666666

        .subscribe-remark
            height 2.5rem
            line-height 2.5rem

            .option
                height 2.5rem
                color: #282828
                font-size 0.9rem
                color: #282828

    .subscribe-btn
        position fixed
        bottom 0
        right 0
        left 0
</style>
