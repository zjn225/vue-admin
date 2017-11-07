<template>
    <div>
        <el-card class="box-card">
            <div class="top">
                <div class="head">
                    <img src="../../assets/head.jpg" height="252" width="252"/>
                </div>
                <div class="user">
                    <span class="admin">Admin</span>
                    <span class="name">超级管理员</span>
                </div>
            </div>
            <div class="line"></div>
            <div class="bottom">
                <div class="add">
                    <span>登录时间：</span>
                    <span class="loginTime" v-once>{{loginTime}}</span>
                </div>
                <div class="cip">
                    <span>登录IP：</span>
                    <span class="loginCip">{{loginCip}}</span>
                </div>
                <div class="time">
                    <span>登录地点：</span>
                    <span class="loginSite">{{loginSite}}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                content: '您好，欢迎访问广财流通所管理系统',

            };
        },
        computed: {
            loginTime() {
                return this.$store.state.loginTime || localStorage.loginTime || '暂无数据';
            },
            loginSite() {
                return this.$store.state.loginSite || localStorage.loginSite || "暂无数据"
            },
            loginCip() {
                return this.$store.state.loginCip || localStorage.loginCip || "暂无数据"
            }
        },
        mounted() {

        },

    }
</script>

<style lang="scss" scoped>
    div {
        .box-card {
            margin: 20px;
            height: 276px;
            width: 600px;
            .top {
                display: block;
                height: 30px;
                .user {
                    .admin {
                        margin: 20px;
                        display: block;
                        color: #2D8CF0;
                        font-size: 30px;
                    }
                    .name {
                        margin: 20px;
                        display: block;
                        color: #9AA1AB;
                        font-size: 20px;
                    }
                }
                img {
                    float: left;
                    width: 120px;
                    height: 120px;
                }
                .user {
                    float: left;
                }
            }
            .line {
                display: block;
                width: 570px;
                height: 2px;
                background: #DCDCDC;
                margin: 100px auto;
            }
            .bottom {
                display: block;
                margin: -87px auto;
                .add, .time, .cip {
                    span {
                        margin: 10px;
                        font-size: 16px;
                        color: #6E7987;
                    }
                }
                .add, .time {
                    margin: 15px 0;
                }
            }
            .loginCip {
                padding-left: 16px;
            }
        }

    }
</style>