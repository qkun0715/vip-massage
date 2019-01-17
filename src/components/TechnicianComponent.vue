<template>
    <div class="technician" @click="onClick">
        <van-row>
            <van-col span="8">
                <div class="technician-image">
                    <img v-if="technicianName" class="icon" :src="technicianImage" :onerror="errorImg"/>
                    <img v-else class="icon" src="../assets/default.png"/>
                </div>
            </van-col>
            <van-col span="16">
                <div class="technician-item" v-if="technicianName">
                    <div class="technician-info">
                        <span>{{technicianNumber}}</span>
                        <span>{{technicianName}}</span>
                        <span class="technician-gender">{{technicianGender}}</span>
                    </div>
                    <div class="technician-specialty">{{technicianSpecialty}}</div>
                </div>
                <div v-else>
                    随机选择师傅
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    export default {
        name: 'TechnicianComponent',
        props: ['technicianImage', 'technicianNumber', 'technicianName', 'technicianGender', 'technicianSpecialty'],
        data() {
            return {
                errorImg: 'this.src="' + require('@/common/images/errorimg.png') + '"',
            };
        },
        methods: {
            onClick() {
                this.$emit('onClickItem');
            },
        },
    };
</script>

<style lang="stylus" scoped>
    .technician
        padding: 1.1rem 1px 1.1rem 1rem
        background: white
        border-radius: 10px
        box-shadow: -3px 0px 10px rgba(0, 0, 0, .01), 0px -3px 10px rgba(0, 0, 0, .01), 3px 0px 10px rgba(0, 0, 0, .01), 0px 3px 10px rgba(0, 0, 0, .01)

        .technician-image
            height 4.25rem
            text-align center

            .icon
                height 4.25rem

        .technician-item
            height 4.25rem
            display flex
            flex-direction column
            justify-content center

            .technician-info
                padding-right 3rem
                display flex
                justify-content space-between
                color: #bea462
                font-size: 16px

                .technician-gender
                    color: #666666

            .technician-specialty
                margin-top: 8px
                color: #666666
                font-size: 14px

</style>
