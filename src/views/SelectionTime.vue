<!--选择预约时间-->
<template>
    <div>
        <div id="scroll-content">
            <!--technician info area-->

                <technician-component
                        :technicianImage="this.technicianInfo.photoUrl"
                        :technicianNumber="this.technicianInfo.number"
                        :technicianName="this.technicianInfo.name"
                        :technicianGender="isGender(this.technicianInfo.gender)"
                        :technicianSpecialty="this.technicianInfo.specialty">
                </technician-component>


            <!--week data area-->
            <div class="item-week">
                <div class="tab-item" v-for="(item,index) in weekList" :class="isActive==index ? 'active': 'tab-item'"
                     @click="checkWeekItem(index)" :key="index">
                    <span class="item-date-option">{{item.date}}</span>
                    <span class="item-week-option">{{item.week}}</span>
                </div>
            </div>

            <div class="time-bucket-area">
                <van-list>
                    <van-row gutter="10"> <!--gutter 间隔-->
                        <van-col span="4"
                                 class="time-bucket"
                                 v-for="(item,index) in timeBucket"
                                 :key="index"
                                 :class="isActiveBucket===index ? 'time-bucket-active': 'time-bucket'">
                            <span @click="checkTimeBucket(item)">{{item.name}}</span>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
        <div>
            <van-button size="large" square type="primary">预约</van-button>
        </div>

    </div>
</template>


<script>
    import TechnicianComponent from '../components/TechnicianComponent';
    import {mapState} from 'vuex';
    import {Toast} from 'vant'
    import axios from 'axios'
    import ApiService from '../common/ApiService'

    export default {
        name: 'SelectionTime',
        components: {
            TechnicianComponent,
        },
        data() {
            return {
                weekList: [],//存储日期和星期的对象的集合
                isActive: 0,//默认选中第一个 即为今天
                timeBucket: [
                    {name: '00:00', index: 0}, {name: '00:30', index: 1}, {name: '01:00', index: 2}, {
                        name: '01:30',
                        index: 3,
                    },
                    {name: '02:00', index: 4}, {name: '02:30', index: 5}, {name: '03:00', index: 6}, {
                        name: '03:30',
                        index: 7,
                    },
                    {name: '04:00', index: 8}, {name: '04:30', index: 9}, {name: '05:00', index: 10}, {
                        name: '05:30',
                        index: 11,
                    },
                    {name: '06:00', index: 12}, {name: '06:30', index: 13}, {name: '07:00', index: 14}, {
                        name: '07:30',
                        index: 15,
                    },
                    {name: '08:00', index: 16}, {name: '08:30', index: 17}, {name: '09:00', index: 18}, {
                        name: '09:30',
                        index: 19,
                    },
                    {name: '10:00', index: 20}, {name: '10:30', index: 21}, {name: '11:00', index: 22}, {
                        name: '11:30',
                        index: 23,
                    },
                    {name: '12:00', index: 24}, {name: '12:30', index: 25}, {name: '13:00', index: 26}, {
                        name: '13:30',
                        index: 27,
                    },
                    {name: '14:00', index: 28}, {name: '14:30', index: 29}, {name: '15:00', index: 30}, {
                        name: '15:30',
                        index: 31,
                    },
                    {name: '16:00', index: 32}, {name: '16:30', index: 33}, {name: '17:00', index: 34}, {
                        name: '17:30',
                        index: 35,
                    },
                    {name: '18:00', index: 36}, {name: '18:30', index: 37}, {name: '19:00', index: 38}, {
                        name: '19:30',
                        index: 39,
                    },
                    {name: '20:00', index: 40}, {name: '20:30', index: 41}, {name: '21:00', index: 42}, {
                        name: '21:30',
                        index: 43,
                    },
                    {name: '22:00', index: 44}, {name: '22:30', index: 45}, {name: '23:00', index: 46}, {
                        name: '23:30',
                        index: 47,
                    },
                ],
                isActiveBucket:-1,//时间段角标
            };
        },
        computed: {
            ...mapState([
                'technicianInfo',
            ]),
        },
        created() {
            /**获取7天的数据 日期和星期*/
            this.getSevenDays();
        },
        mounted() {
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('scroll-content').style.height = winHeight - 50 + 'px';
            /** 根据技师和选中日期获取已预约的时间段*/
            if (this.technicianInfo.name) {
                this.getListByDateAndMaster()
            };
        },
        methods: {
            isGender(value) {
                if (value === 0) {
                    return '女';
                } else if (value === 1) {
                    return '男';
                }
            },
            /**获取7天的数据 日期和星期*/
            getSevenDays() {
                for (let i = 0; i < 7; i++) {
                    let dd = new Date();
                    dd.setDate(dd.getDate() + i);
                    let y = dd.getFullYear();
                    let m = dd.getMonth() + 1;
                    if (m < 10) {
                        m = '0' + m;
                    }
                    let d = dd.getDate();
                    if (d < 10) {
                        d = '0' + d;
                    }
                    let weekStr = '周一';
                    let day = dd.getDay();
                    switch (day) {
                        case 0:
                            weekStr = '日';
                            break;
                        case 1:
                            weekStr = '一';
                            break;
                        case 2:
                            weekStr = '二';
                            break;
                        case 3:
                            weekStr = '三';
                            break;
                        case 4:
                            weekStr = '四';
                            break;
                        case 5:
                            weekStr = '五';
                            break;
                        case 6:
                            weekStr = '六';
                            break;
                    }
                    this.weekList.push({date: m + '-' + d, week: weekStr, fullDate: y + '-' + m + '-' + d});
                }
            },
            /** 切换日期*/
            checkWeekItem(index) {
                this.isActive = index;
            },
            /** 选择时间段*/
            checkTimeBucket(item){
                Toast(`点击了${item.name},position=${item.index}`);
                this.isActiveBucket =item.index;
            },
            /**根据技师和选中日期获取已预约的时间段*/
            getListByDateAndMaster(){
                axios({
                    url:ApiService.getTimeBucket,
                    method:'get',
                    params:{
                        masterId: this.technicianInfo.id,
                        date: this.weekList[this.isActive].fullDate,
                    }
                }).then(res=>{

                    if (res.data.rows==='null') {
                       Toast('没有数据')
                    }else {
                        Toast('操作起来')
                    };

                }).catch(error=>{
                    console.log(error)
                    Toast.fail("请求失败"+error)
                })
            }
        },
    };
</script>

<style lang="stylus" scoped>
    #scroll-content
        overflow scroll
        .item-week
            display: flex
            height: 55px
            background: #fffaf1
            flex-direction row

            .tab-item
                flex: 1
                text-align: center
                color: #888888
                font-size: 13px
                line-height: 25px
                display flex
                flex-direction column

            .active
                flex: 1
                text-align: center
                color: #bfa273
                font-size: 13px
                line-height: 25px
                border-bottom: 2px solid red
                display flex
                flex-direction column
        .time-bucket-area
            margin-top 1rem
            padding-right 1rem
            padding-left 1rem
            .time-bucket
                text-align center
                padding-top 4px
                padding-bottom 4px
                border: 0.5px solid #ddd9cd
                border-radius: 2px
                background-color: #fff
                color: #5f5f5f
                font-size: 14px
            .time-bucket-active
                text-align center
                padding-top 4px
                padding-bottom 4px
                border: 0.5px solid #bfa273
                border-radius: 2px
                background-color: #bfa273
                font-size: 14px
                background: #bfa273
</style>
