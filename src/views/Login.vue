<template>
    <div class="wrap">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h2 class="title">广财流通所后台管理系统</h2>
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
    import {requestLogin} from '../api/xh_api';
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
                        {required: true,  message: '请输入账号', trigger: 'blur'},
                        { min: 3, message: '账号长度在3个字符以上', trigger: 'blur' }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 5, message: '密码长度在5个字符以上', trigger: 'blur' }
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
                        const date = new Date();
                        const time = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日 ${date.getHours()}:${date.getMinutes()}`;

                        console.log(time)
                        var loginParams = {account: this.ruleForm2.account, password: this.ruleForm2.checkPass,time};
                        requestLogin(loginParams).then(data => {
                            let {code, msg,time} = data;
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
        }
    }

</script>

<style lang="scss" scoped>
    .wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        /*background-color: #2D3A4B;*/
        background-image: url('../assets/bg2.jpg');
        background-size: cover;
    }

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 5px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
    }
</style>