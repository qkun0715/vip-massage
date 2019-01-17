<template>
    <div class="home-wrapper">
        <!--swipe area-->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner,index) in swipeList" :key="index">
                    <img :src="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>

        <!--店铺 集团 显示 与 选择-->
        <div class="group-store-area" @click="selectGroupStore">
            <van-row>
                <van-col span="20">
                    <div>
                        {{groupSubbranchName}}
                    </div>
                </van-col>
                <van-col span="4">
                    <van-icon name="arrow" size="20px"/>
                </van-col>
            </van-row>
        </div>

        <div class="service-area">
            <van-list>
                <div v-for="(item,index) in subbranchServiceList" :key="index" @click="onItemClick(item)">
                    <service-component
                            :serviceName="item.serviceEntity.serviceName"
                            :serviceInfo="item.serviceEntity.serviceInfo"
                            :serviceImage="item.serviceEntity.serviceImg"
                            :servicePrice="item.serviceEntity.servicePrice"
                            :serviceCount="item.serviceEntity.serviceDuration"
                            @onAppointment="goSubscribe(item)">
                    </service-component>
                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import axios from 'axios';
    import ApiService from '../common/ApiService';
    import {Toast} from 'vant';
    import ServiceComponent from '../components/ServiceComponent';

    export default {
        name: 'Home',
        components: {
            ServiceComponent,
        },
        data() {
            return {
                swipeList: [
                    {image: require('@/common/images/icon_1.jpg')},
                    {image: require('@/common/images/icon_2.jpg')},
                    {image: require('@/common/images/icon_3.jpg')},
                ],
                subbranchServiceList: [], //分店服务项目集合
                groupsList: [], //集团集合
                groupId: '', //集团id
                groupName: '', //当前选择集团的名字
                subbranchId: '', //分店id
                subbranchName: '', //分店名字
                subscribe: {}, //订阅对象需要的数据
                groupsSubbranchBean: {}, //集团店铺对象（如果groupsSubbranch有值直接拷贝，没有值自己创建对象）
            };
        },
        computed: {
            groupSubbranchName() {
                return this.groupName + '　' + this.subbranchName;
            },
            ...mapState(['userInfo', 'groupsSubbranch']),
        },
        /**
         *1.在首页中 获取userInfo对象数据 同时也要判断合适获取集团信息的对象
         *
         *
         */
        created() {
            /*获取从集团页面来时传递过来的数据*/
            let passed = this.$route.params.passed;
            if (passed) {
                //进入这个判断中，一定是改动了集团分店信息，需要重新请求
                this.groupId = this.groupsSubbranch.groupId;
                this.groupName = this.groupsSubbranch.groupsName;
                this.subbranchId = this.groupsSubbranch.subbranchId;
                this.subbranchName = this.groupsSubbranch.subbranchName;
                this.getSubbranchServiceList();
                Toast('更改集团分店');
            } else {
                if (this.userInfo && this.userInfo.presetGroupName) {
                    this.groupId = this.userInfo.presetGroupId;
                    this.groupName = this.userInfo.presetGroupName;
                    this.subbranchId = this.userInfo.presetSubbranchId;
                    this.subbranchName = this.userInfo.presetSubbranchName;
                    this.getSubbranchServiceList();
                    Toast('预约集团分店');
                } else {
                    this.getGroupsList();
                    Toast('默认集团分店');
                }
            }

        },
        methods: {
            /**获取集团数据 如果是扫描进来(即个人信息中有集团和分店的信息)**/
            getGroupsList() {
                axios({
                    url: ApiService.getGroups,
                    method: 'get',
                })
                    .then(res => {
                        if (res.data.code === 0 && res.data.rows) {
                            this.groupsList = res.data.rows.rows;
                            this.groupId = this.groupsList[0].id;
                            this.groupName = this.groupsList[0].cnName;
                            //根据groupId获取分店集合数据 TODO
                            this.getSubbranchList();
                            // console.log(this.groupsList);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /**根据集团id 获取分店列表数据**/
            getSubbranchList() {
                axios({
                    url: ApiService.getSubbranch,
                    method: 'get',
                    params: {groupId: this.groupId},
                })
                    .then(res => {
                        if (res.data.code === 0 && res.data.rows) {
                            this.subbranchId = res.data.rows.rows[0].id;
                            this.subbranchName = res.data.rows.rows[0].subbranchName;
                            // console.log(res.data.rows.rows);
                            this.getSubbranchServiceList();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            /**跳转到选择集团分店页面**/
            selectGroupStore() {
                this.$router.push({name: 'Groups'});
            },
            /**根据分店id获取分店服务项目列表**/
            getSubbranchServiceList() {
                axios({
                    url: ApiService.getSubbranchService,
                    method: 'get',
                    params: {subbranchId: this.subbranchId},
                })
                    .then(res => {
                        if (res.data.code === 0 && res.data.rows) {
                            this.subbranchServiceList = res.data.rows.rows;
                            // console.log(this.subbranchServiceList);
                        } else {
                            Toast.fail('请求失败！');
                        }
                    })
                    .catch(error => {
                        Toast.fail(`请求失败！${error}`);
                    });
            },
            /** 点击预约按钮事件**/
            goSubscribe(item) {
                /**预约必须要实名认证*/
                // if (this.userInfo.isVerify != 1) {
                //     // this.$router.push('/certification');
                //     Toast('请实名认证！');
                //     return;
                // }
                /** 将预约需要的数据封装到subscribe对象中*/
                let price = item.serviceSalePrice ? item.serviceSalePrice : item.serviceEntity.servicePrice;
                this.subscribe = Object.assign({
                    serviceName: item.serviceEntity.serviceName,
                    serviceInfo: item.serviceEntity.serviceInfo,
                    serviceImg: item.serviceEntity.serviceImg,
                    servicePrice: price,
                    serviceDuration: item.serviceEntity.serviceDuration,
                    serviceId: item.serviceId,
                    subbranchId: item.subbranchId,
                });
                this.setSubscribe(this.subscribe);
                /** 将集团店铺信息保存起来*/
                if (this.groupsSubbranch.subbranchName) {
                    this.setGroupsSubbranch(this.groupsSubbranch);
                } else {
                    this.groupsSubbranchBean = Object.assign({
                        groupId: this.groupId,
                        groupsName: this.groupName,
                        subbranchId: this.subbranchId,
                        subbranchName: this.subbranchName,
                    });
                    this.setGroupsSubbranch(this.groupsSubbranchBean);
                }
                this.$router.push({name: 'Subscribe'});
            },
            /**点击条目事件**/
            onItemClick() {
                Toast('点击条目事件');
            },
            ...mapMutations({
                setSubscribe: 'setSubscribe',
                setGroupsSubbranch: 'setGroupsSubbranch',
            }),
        },
    };
</script>

<style lang="stylus" scoped>
    .home-wrapper
        position relative
        bottom 50px
        width: 100%
        overflow hidden

        .swipe-area
            clear: both
            width: 20rem
            overflow hidden

        .group-store-area
            line-height: 2rem;
            height: 2rem
            font-size: 18px

        .group-store-area > div
            padding-left .5rem

        .service-area
            background-color #fff


</style>
