<template>
    <div >

        <div class="order-form">
            <van-list>
                <van-row> <!--gutter 间隔-->
                    <van-col span="24"
                             class="time-bucket"
                             v-for="(item,index) in timeBucket"
                             :key="index">
                        <span>{{item.name}}</span>
                    </van-col>
                </van-row>
            </van-list>
        </div>

        <van-button size="large" square type="primary">预约</van-button>

    </div>

</template>

<script>
    import {Toast} from 'vant';

    export default {
        name: 'OrderForm',
        components: {},
        data() {
            return {
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
                dateList: ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
                    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
                    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
                    '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'],
                isActive: 0,
                gamemuiscs: '',
            };
        },
        mounted() {
        },
        methods: {


        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>


</style>
