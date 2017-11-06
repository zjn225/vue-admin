<template>
    <div class="wrap">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h2 class="title">广财流通所后台管理系统</h2>
            <div class="line"></div>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import {requestLogin} from '../api/api';
    import moment from 'moment';

    export default {
        data() {
            var validateAccount = (rule, value, callback) => {

            };
            var validatePass = (rule, value, callback) => {

            };
            return {
                logining: false,
                ruleForm2: {
                    account: 'admin',
                    checkPass: 'admin'
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 3, message: '账号长度在3个字符以上', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 5, message: '密码长度在5个字符以上', trigger: 'blur'}
                    ]
                },
            };
        },
        methods: {
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    console.log(this.$refs)//{ruleForm2: VueComponent}
                    if (valid) {
                        this.logining = true;
                        let date = new Date(),
                            year = date.getFullYear(),
                            month = (date.getMonth() + 1),
                            day = date.getDate(),
                            hours = date.getHours(),
                            minutes = date.getMinutes(),
                            seconds = date.getSeconds();

                        if (hours < 10) {
                            hours = '0' + hours
                        }

                        if (minutes < 10) {
                            minutes = '0' + minutes
                        }

                        if (seconds < 10) {
                            seconds = '0' + seconds
                        }

                        const time = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds;
                        this.$store.state.loginTime = time;
                        console.log(time)
                        var loginParams = {account: this.ruleForm2.account, password: this.ruleForm2.checkPass, time};
                        requestLogin(loginParams).then(data => {
                            let {code, msg, time} = data;
                            if (code !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                                this.logining = false;

                            } else {
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                sessionStorage.setItem('status', 1);
                                this.$router.push({path: '/Main'});
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted(){
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://pv.sohu.com/cityjson?ie=utf-8'; //引用搜狐接口
            document.body.appendChild(s);
            console.log(returnCitySN['cname'])
            //返回值 var returnCitySN =
            // {"cip": "183.6.137.86", "cid": "440100", "cname": "广东省广州市"};
        }
    }

</script>

<style lang="scss" scoped>
    .wrap {
        width: 100%;
        height: 100%;
        /*background-color: #2D3A4B;*/
        background-image: url('../assets/bg2.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
    }

    .login-container {
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background: #fff;
        padding: 23px 31px 0px 34px;
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        height: 280px;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
    }
</style>