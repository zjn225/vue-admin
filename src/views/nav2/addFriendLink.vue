<template>
    <div class="wrapper">
        <h3>网站名称</h3>
        <el-input class=" " v-model="name" placeholder=""></el-input>
        <h3>网站链接</h3>
        <el-input class=" " v-model="link" placeholder=""></el-input>
        <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">提交</el-button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                name: '',
                link: ''
            };
        },
        components: {},
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            async onEditorChange() {
                if (
                    this.name &&
                    this.link
                ) {
                    console.log(this.name);
                    console.log(this.link);
                    this.$message.success("提交成功！");
                }
                this.link || this.$message("请输入网站链接");
                this.name || this.$message("请输入网站名称");
                result = await addLink({
                    name: this.name,
                    link: this.link,
                });
                const {code, msg} = result.data;

                if (code === 200) {
                    this.$message({
                        message: msg,
                        type: "success"
                    });
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