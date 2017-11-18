<template>
    <div v-loading="loading" element-loading-text="正在修改中，请稍后"
         element-loading-spinner="el-icon-loading">
        <h3>网站名称</h3>
        <el-input class=" " v-model="friendLink.name" placeholder=""></el-input>
        <h3>网站链接</h3>
        <el-input class=" " v-model="friendLink.link" placeholder=""></el-input>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">更新链接</el-button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {editLink} from "../../api/api";

    export default {
        data() {
            return {
                loading:false,
            };
        },

        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            async onEditorChange() {
                console.log(this.friendLink.link)
                if (!this.friendLink.link) {
                    this.$message("请输入网站链接");
                    return;
                }
                if (!this.friendLink.name) {
                    this.$message("请输入网站名称");
                    return;
                }
                this.loading=true;
                const result = await editLink({
                    name: this.friendLink.name,
                    id: this.friendLink.id,
                    link: this.friendLink.link,
                });
                const {code, msg} = result.data;
                if (code === 200) {
                    this.loading=false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$router.push({path: "/friendLink"});
                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            }
        },
        computed: {
            ...mapState(["friendLink"])
        },
        mounted() {

        }
    };
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        .left {
            width: 77%;
            height: auto;
            .title {
                margin-top: 20px;
            }
            .source {
                position: relative;
                top: 90px;
            }
        }

        h3 {
            font-size: 15px;
            color: #444444;
            font-weight: 600;
        }

        .btn {
            width: 100px;
            position: relative;
            top: 50px;
            left: 63%;
        }
    }
</style>