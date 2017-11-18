<template>
    <div class="wrapper" v-loading="loading" element-loading-text="正在新增中，请稍后"
         element-loading-spinner="el-icon-loading">
        <h3>网站名称</h3>
        <el-input class=" " v-model="name" placeholder=""></el-input>
        <h3>网站链接</h3>
        <el-input class=" " v-model="link" placeholder=""></el-input>
        <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">提交</el-button>
    </div>
</template>

<script>
import {addLink} from "../../api/api";

    export default {
        data() {
            return {
                loading:false,
                name: '',
                link: ''
            };
        },
        components: {},
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            async onEditorChange() {
              if (!this.link){
                  this.$message("请输入网站链接");
                  return;
              }
              if (!this.name){
                  this.$message("请输入网站名称");
                  return;
              }

              this.loading=true
                let result = await addLink({
                    name: this.name,
                    link: this.link,
                });
                const {code, msg} = result.data;

                if (code === 200) {
                    this.loading=false
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$router.push({ path: "/friendLink" });

                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .btn{
        margin: 20px 0px;
    }
</style>