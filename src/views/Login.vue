<template>
    <div class="wrap" id="wrap">
        <el-form :model="ruleForm1" :rules="rules2" ref="ruleForm1" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h2 class="title">广财流通所后台管理系统</h2>
            <div class="line"></div>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm1.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm1.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:30%;" @click.native.prevent="handleSubmit" :loading="logining">
                    登录
                </el-button>
                <el-button type="info" style="width:30%;"  @click="dialogTableVisible = true" :loading="logining">
                    忘记密码
                </el-button>
            </el-form-item>
        </el-form>
      

<!-- Form -->


<el-dialog title="忘记密码" :visible.sync="dialogTableVisible" width="500px">
  <el-form :model="ruleForm2" ref="ruleForm2">
     <el-form-item prop="email" label="账户绑定邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ]"
  >
    <el-input v-model="ruleForm2.email" width='50%'></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitEmail" :loading="loginingEmail">确 定</el-button>
    <el-button @click="dialogTableVisible = false">取 消</el-button>
  </div>
</el-dialog>

<el-dialog title="重置密码" :visible.sync="dialogTableVisible1" width="500px">
 <el-form :model="ruleForm3" ref="ruleForm3">
     <el-form-item prop="pass" label="重置密码"
    :rules="[
       {required: true, message: '请输入密码', trigger: 'blur'},
       {min: 5, message: '密码长度在5个字符以上', trigger: 'blur'}
    ]"
  >
    <el-input v-model="ruleForm3.pass" width='50%'></el-input>
  </el-form-item>
   
      <el-form-item prop="VerCode" label="验证码">
    <el-input v-model="ruleForm3.VerCode" width='50%'></el-input>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submitPass">确 定</el-button>
    <el-button @click="dialogTableVisible1 = false">取 消</el-button>
  </div>
</el-dialog>
    </div>

</template>

<script>
    import {requestLogin,requestVerCode,restPass} from '../api/api';
    import moment from 'moment';

    export default {
        data() {
            var validateAccount = (rule, value, callback) => {

            };
            var validatePass = (rule, value, callback) => {

            };
            return {
                loginSite: '',
                loginTime: '',
                loginCip: '',
                logining: false,
                loginingEmail: false,
                ruleForm1: {
                    account: 'admin',
                    checkPass: 'admin'
                },
                ruleForm2:{
                    email:'xiaorock@126.com'
                },
                ruleForm3:{
                    pass:'',
                    VerCode:''
                },
                dialogTableVisible:false,
                dialogTableVisible1:false,
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
            handleSubmit(ev) {
                var _this = this;
                this.$refs.ruleForm1.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                       

                        const loginTime = this.getTime();

                        /*登录时间，加入localStorage防止刷新的时候无法正常显示*/
                        this.loginTime = loginTime;
                        this.loginSite = returnCitySN['cname'];
                        var loginParams = {
                            account: this.ruleForm1.account,
                            password: this.ruleForm1.checkPass,
                            loginTime: this.loginTime,
                            loginSite: this.loginSite
                        };
                        requestLogin(loginParams).then(data => {
                            let {code, msg, loginTime, loginSite} = data;
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
                                this.logining = false;

                                this.$store.state.loginTime = loginTime;
                                localStorage.loginTime = loginTime;
                                this.$store.state.loginSite = loginSite;
                                localStorage.loginSite = loginSite

                                sessionStorage.setItem('status', 1);
                                this.$router.push({path: '/Main'});
                            }
                        }, (e) => {
                            this.$message({
                                message: "服务器错误",
                                type: "error"
                            });
                            this.logining = false;
                        })
                    } else {
                        return false;
                    }
                });
                /*登录地点*/
                this.loginSite = returnCitySN['cname']
                this.$store.state.loginSite = this.loginSite;
                localStorage.loginSite = this.loginSite
            },
            submitEmail() {
                this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    const email = this.ruleForm2.email;
                    this.loginingEmail = true;
                    requestVerCode({email}).then(data=>{
                        this.loginingEmail = false;
                        let {msg,code} = data;
                        if(code == 200){
                             this.$message({
                                message: msg,
                                type: "success"
                        });
                        this.dialogTableVisible = false;
                        this.dialogTableVisible1 = true;
                        }
                       
                    },()=>{
                        this.loginingEmail = false;
                        this.$message({
                                message: "服务器错误",
                                type: "error"
                        });
                    })       
                } else {
                    return false;
                }
                });
            },
            submitPass() {
                this.$refs.ruleForm3.validate((valid) => {
                if (valid) {
                    const pass = this.ruleForm3.pass;
                    const VerCode = this.ruleForm3.VerCode;
                    const loginTime = this.getTime();

                    /*登录时间，加入localStorage防止刷新的时候无法正常显示*/
                    this.loginTime = loginTime;
                    this.loginSite = returnCitySN['cname'];
                   
                    restPass({pass,VerCode,loginTime: this.loginTime,loginSite: this.loginSite}).then(data=>{
                     
                        let {msg,code,loginTime,loginSite} = data;
                        if(code == 200){
                             this.$message({
                                message: msg,
                                type: "success"
                            });
                             this.dialogTableVisible1 = false;
                        }else{
                            this.$message({
                                message: msg,
                                type: "error"
                            });
                        }
                         

                        this.$store.state.loginTime = loginTime;
                        localStorage.loginTime = loginTime;
                        this.$store.state.loginSite = loginSite;
                        localStorage.loginSite = loginSite

                        sessionStorage.setItem('status', 1);
                        this.$router.push({path: '/Main'});
                        
                    },()=>{
                   
                        this.$message({
                                message: "服务器错误",
                                type: "error"
                        });
                    })       
                } else {
                    
                    return false;
                }
                });
            },
            /*随机更换图片*/
            randomImg() {
                var wrap = document.getElementById('wrap');
                var body = document.getElementsByTagName('body')[0];
                var rand = Math.ceil(Math.random() * 5);
                var url = "http://o835i1293.bkt.clouddn.com/lts" + rand + ".jpg"
                var value = "url(" + "'" + url + "'" + ")"
                this.setCss(wrap, 'background-image', value)
                this.setCss(wrap, 'background-size', "cover")
                this.setCss(wrap, 'background-position', "center")
                this.setCss(wrap, 'position', "relative")
            },
            setCss: function (curEle, attr, value) {
                if (attr === "float") {
                    curEle["style"]["cssFloat"] = value;
                    curEle["style"]["styleFloat"] = value;
                    return;
                }
                if (attr === "opacity") {
                    curEle["style"]["opacity"] = value;
                    curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
                    return;
                }
                var reg = null;
                reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
                if (reg.test(attr)) {
                    if (!isNaN(value)) { //是有效数字，即是不带单位的
                        value += "px";
                    }
                }
                curEle["style"][attr] = value;
            },
            getTime(){
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
                        return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds;
            }
        },
        mounted() {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://pv.sohu.com/cityjson?ie=utf-8'; //引用搜狐接口
            document.body.appendChild(s);
            this.randomImg();
            //返回值 var returnCitySN =
            // {"cip": "183.6.137.86", "cid": "440100", "cname": "广东省广州市"};
        }
    }

</script>

<style lang="scss" scoped>
    .wrap {
        width: 100%;
        height: 100%;
        /* background-color: #2D3A4B;
         background-image: url('../assets/bg2.jpg');
          background-size: cover;
          background-position: center;
          position: relative;*/
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