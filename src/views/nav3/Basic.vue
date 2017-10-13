<template>
    <div class="wrap">
        <div class="name">
            <h4>站点名称</h4>
            <el-input v-model="name" placeholder=""></el-input>
            <p>站点的名称将显示在网页的标题处.</p>
        </div>

        <div class="dec">
            <h4>站点描述</h4>
            <el-input v-model="dec" placeholder=""></el-input>
            <p>站点描述将显示在网页代码的头部.有利于SEO</p>
        </div>

        <div class="keyword">
            <h4>站点关键词</h4>
            <el-input v-model="keyword" placeholder=""></el-input>
            <p>请以半角逗号 "," 分割多个关键字.有利于SEO</p>
        </div>

        <el-button type="primary" class="btn" id="submit" @click="submit()">保存设置</el-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name:'',
                dec:'',
                keyword:''
            }
        },
        methods:{
            submit(){
                this.$message.success("保存成功")
            }
        }
    }

</script>

<style lang="scss" scoped>
    .wrap{
        .name,.dec,.keyword{
            margin: 22px 30px;
        }
        p{
            color: #B1A5BF;
        }
        .btn{
            margin-left: 25px;
        }


    }

</style>