<!--选择技师-->
<template>
    <div>
        <div class="top-btn">
            <van-button size="normal" block round type="danger" @click="defaultSelect">默认指派</van-button>
        </div>
        <div class="list-area">
            <van-list>
                <div v-for="(item,index) in technicianList" :key="index">
                    <technician-component
                            :technicianImage="item.photoUrl"
                            :technicianNumber="item.number"
                            :technicianName="item.name"
                            :technicianGender="isGender(item.gender)"
                            :technicianSpecialty="item.specialty"
                            @onClickItem="onBack(item)">
                    </technician-component>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ApiService from '../common/ApiService';
    import {Toast} from 'vant';
    import {mapState, mapMutations} from 'vuex';
    import TechnicianComponent from '../components/TechnicianComponent';

    export default {
        name: 'Technician',
        components: {
            TechnicianComponent,
        },
        data() {
            return {
                technicianList: [],//技师列表
                technicianInfo: {},//用来保存技师对象的 存在vuex中
            };
        },
        created() {
            /**获取技师列表*/
            this.getTechnicianList();
        },
        computed: {
            ...mapState([
                'subscribe',
            ]),
        },
        methods: {
            /**获取技师列表*/
            getTechnicianList() {
                axios({
                    url: ApiService.getTechnicianList,
                    method: 'get',
                    params: {subbranchId: this.subscribe.subbranchId},
                }).then(res => {
                    if (res.data.code === 0 && res.data.rows) {
                        this.technicianList = res.data.rows;
                    } else {
                        Toast.fail('请求失败');
                    }
                }).catch(error => {
                    Toast.fail('请求失败' + error);
                });
            },
            isGender(value) {
                if (value === 0) {
                    return '女';
                } else if (value === 1) {
                    return '男';
                }
            },
            /** 获取技师信息返回到预约界面 isBack 是否点击了条目  没有 为true 点了为false*/
            onBack(item) {
                Toast(item.name);
                //并加技师对象保存传递过去
                this.technicianInfo = Object.assign({
                    id: item.id,
                    photoUrl: item.photoUrl,
                    number: item.number,
                    name: item.name,
                    gender: item.gender,
                    specialty: item.specialty
                });
                this.setTechnicianInfo(this.technicianInfo);
                this.$router.push({name: 'Subscribe', params: {isDefault: true}});
            },
            /**默认指派 即是 随机*/
            defaultSelect() {
                this.$router.push({name: 'Subscribe', params: {isDefault: false}});
            },
            ...mapMutations({
                setTechnicianInfo: 'setTechnicianInfo',
            }),
        },

    };
</script>

<style lang="stylus" scoped>
    .top-btn
        margin-top 1rem
        padding-right 1rem
        padding-left 1rem
</style>
