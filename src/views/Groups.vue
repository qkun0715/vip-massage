<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="选择集团店铺"
                         left-text="返回"
                         left-arrow
                         @click-left="onBack"/>
        </div>

        <div>
            <van-row>
                <van-col span="8">
                    <div id="item-group">
                        <ul>
                            <li v-for="(item,index) in groupsList"
                                :key="index"
                                :class="{groupsActive:groupsIndex===index}"
                                @click="clickGroups(index,item)">
                                {{item.cnName}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="16">
                    <div id="item-subbranch">
                        <ul>
                            <li v-for="(item,index) in subbranchList"
                                :key="index"
                                :class="{subbranchActive :subbranchIndex===index}"
                                @click="clickSubbranch(index,item)">
                                {{item.subbranchName}}
                            </li>
                        </ul>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="group-button" @click="confirm">
            <van-button round type="primary" size="large">确定</van-button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import ApiService from "../common/ApiService";
    import {Toast} from "vant";
    import {mapMutations} from "vuex";

    export default {
        name: "Groups",
        components: {},
        data() {
            return {
                groupsList: [], //集团集合
                groupsIndex: 0, //默认选择
                groupId: "", //集团id
                subbranchList: [], //分店集合
                subbranchIndex: 0, //分店默认选择
                subbranchId: "", //分店id
                groupsSubbranch: {}, //将集团名字、集团id、分店名字、分店id 组成新的对象
                passed: false,//判断是否从集团返回到首页中
            };
        },

        created() {
            this.getGroupsList();
        },
        mounted() {
            //获取页面的高度 一半
            let winHeight = document.documentElement.clientHeight / 2;
            document.getElementById("item-group").style.height = winHeight + "px";
            document.getElementById("item-subbranch").style.height = winHeight + "px";
        },
        methods: {
            onBack() {
                this.$router.go(-1);
            },
            getGroupsList() {
                axios({
                    url: ApiService.getGroups,
                    method: "get"
                })
                    .then(res => {
                        if (res.data.code == 0 && res.data.rows) {
                            this.groupsList = res.data.rows.rows;
                            this.groupId = this.groupsList[0].id;
                            this.getSubbranchList();
                            console.log(this.groupsList);
                        } else {
                            Toast.fail("获取数据失败！！");
                        }
                    })
                    .catch(error => {
                        Toast.fail("服务器错误！获取数据失败");
                        console.log(error);
                    });
            },
            clickGroups(index, item) {
                this.groupsIndex = index;
                this.groupId = item.id;
                this.getSubbranchList();
            },
            getSubbranchList() {
                axios({
                    url: ApiService.getSubbranch,
                    method: "get",
                    params: {groupId: this.groupId}
                })
                    .then(res => {
                        if (res.data.code === 0 && res.data.rows) {
                            this.subbranchList = res.data.rows.rows;
                            console.log(this.subbranchList);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            clickSubbranch(index, item) {
                this.subbranchIndex = index;
                Toast(`分店名字:${item.subbranchName} 和分店id：${item.id}`);
            },
            confirm() {
                this.passed = true;
                this.groupsSubbranch = Object.assign({
                    groupsName: this.groupsList[this.groupsIndex].cnName,
                    groupId: this.groupId,
                    subbranchName: this.subbranchList[this.subbranchIndex].subbranchName,
                    subbranchId: this.subbranchList[this.subbranchIndex].id
                });
                this.setGroupsSubbranch(this.groupsSubbranch);
                // this.$router.go(-1);
                this.$router.push({name: 'Home', params: {passed: this.passed}})
            },
            ...mapMutations({
                setGroupsSubbranch: "setGroupsSubbranch"
            })
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    #item-group {
        background-color white
    }

    #item-group > ul > li
        line-height 2rem
        padding 3px
        font-size 0.8rem
        text-align center

    .groupsActive
        background-color #bfa273

    #item-subbranch {
        background-color white
    }

    #item-subbranch > ul > li
        line-height 2rem
        padding 3px
        font-size 0.8rem
        text-align center

    .subbranchActive
        background-color #fff

    .group-button {
        padding-top 2rem
        background-color white
        padding-left 2rem
        padding-right 2rem
    }

</style>
