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
                    <span>上次登录时间：</span>
                    <span class="loginTime" v-once>{{loginTime}}</span>
                </div>
                <div class="time">
                    <span>上次登录地点：</span>
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
                loginTime:'2017'
            };
        },
        computed: {
            // loginSite() {
            //     return  returnCitySN["cname"]
            // }
        },
        mounted() {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://pv.sohu.com/cityjson?ie=utf-8'; //引用搜狐接口
            document.body.appendChild(s);
            //返回值 var returnCitySN =
            // {"cip": "183.6.137.86", "cid": "440100", "cname": "广东省广州市"};
        },

    }
</script>

<style lang="scss" scoped>
    div {
        .box-card {
            margin: 20px;
            height: 236px;
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
                .add, .time {
                    span {
                        margin: 10px;
                        font-size: 16px;
                        color: #6E7987;
                    }
                }
                .add {
                    margin: 15px 0;
                }
            }

        }

    }
</style>