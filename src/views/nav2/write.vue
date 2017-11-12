<template>
    <div v-loading="loading" element-loading-text="正在发表，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <el-input class="title" v-model="title" placeholder="请输入标题"></el-input>
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="right">
            <!--作者-->
            <div class="author">
                <h3>作者</h3>
                <el-input class="right_input" v-model="author" placeholder="作者"></el-input>
            </div>
            <!--发布日期-->
            <div class="date">
                <h3>发布日期</h3>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="time"
                            type="date"
                            format="yyyy/MM/dd"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
            </div>
            <!--类别-->
            <div class="block">
                <h3>分类</h3>
                <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </div>
            <!--分类-->
            <h3>文章来源</h3>
            <el-input class="source" v-model="source" placeholder="文章来源"></el-input>

            <h3>是否将该文章列为首页轮播图</h3>
            <el-switch
                    v-model="isBanner"
                    on-color="#13ce66"
                    active-text="是"
                    inactive-text="否"
                    @change="hasImg"
                    :active-value='1'
                    :inactive-value='0'

            >
            </el-switch>
        </div>
        <div class="btn">
            <el-button type="primary" class="btn" size='medium' id="submit" @click="onEditorChange()" icon="el-icon-upload">发表文章</el-button>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    import {postArticle} from "../../api/xh_api";
    import {mapMutations} from "vuex";

    export default {
        data() {
            return {
                loading: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                hasPic: true,//默认没动开关时是关闭状态，如果设为false，那么不动开关也无法发表
                time: "", //发表时间
                title: "默认标题", //标题
                author: "admin", //作者
                source: "baidu.com", //文章来源
                content: "I am Example", // 编辑器的内容
                selectedOptions: [], //级联选择器
                isBanner: false, //是否列为首页banner
                editorOption: {
                    // 编辑器的配置
                    // something config
                },
                options: [
                    {
                        value: "information",
                        label: "科研资讯",
                        children: [
                            {
                                value: "1",
                                label: "科研简讯"
                            },
                            {
                                value: "2",
                                label: "媒体报道"
                            }
                        ]
                    },
                    {
                        value: "research",
                        label: "科学研究",
                        children: [
                            {
                                value: "1",
                                label: "课题研究"
                            },
                            {
                                value: "2",
                                label: "调研考察"
                            },
                        ]
                    },
                    {
                        value: "achievement",
                        label: "科研成果",
                        children: [
                            {
                                value: "1",
                                label: "著作"
                            },
                            {
                                value: "2",
                                label: "学术论文"
                            },
                            {
                                value: "3",
                                label: "研究报告"
                            }
                        ]
                    },
                    {
                        value: "exchange",
                        label: "学术交流",
                        children: [
                            {
                                value: "1",
                                label: "学术年会"
                            },
                            {
                                value: "2",
                                label: "流通论坛"
                            },
                            {
                                value: "3",
                                label: "来访交流"
                            },
                        ]
                    }
                ]
            };
        },
        components: {
            quillEditor
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {

            handleChange(value) {
                //                console.log(value);
            },
            onEditorBlur(editor) {
                //                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                this.hasImg();
                //                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                //                console.log('editor ready!', editor)
            },
            hasImg() {
                var reg = /<img src=/;
                if (reg.test(this.content)) {  //有图片
                    this.hasPic = true;
                } else {                      //无图片
                    this.hasPic = false;
                }
            },

            async onEditorChange() {
                this.hasImg();
                if (!this.content) {
                    this.$message("请不要发表内容为空的文章");
                    return;
                }
                if (!this.author) {
                    this.$message("请标明作者")
                    return;
                }
                if (!this.title) {
                    this.$message("请输入标题");
                    return;
                }
                if (!this.time) {
                    this.$message("请选择发布日期");
                    return;
                }
                if (this.selectedOptions.length === 0) {
                    this.$message("请选择分类");
                    return;
                }
                if (!this.source) {
                    this.$message("请输入文章来源");
                    return;
                }
                if (!this.hasPic && this.isBanner == 1) {
                    this.$message("内容没有图片，请不要设置为首页的轮播图");
                    return;
                }

                this.loading = true;

                let result = await postArticle({
                    title: this.title,
                    author: this.author,
                    content: this.content,
                    source: this.source,
                    time: this.time,
                    selectedOptions: this.selectedOptions,
                    isbanner: this.isBanner
                });


                const {code, msg} = result.data;

                if (code === 200) {
                    this.loading = false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });

                    this.$router.push({path: '/article'});

                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },
            ...mapMutations(["SAVE_ARTICLEINFO"]),

        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
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
            .quill-editor {
                margin-top: 20px;
                height: 590px;
            }
            .source {
                position: relative;
                top: 90px;
            }
        }

        .right {
            position: relative;
            bottom: 662px;
            width: 20%;
            float: right;

            .el-date-editor,
            .el-cascader {
                width: 100%;
            }

            h3 {
                font-size: 15px;
                color: #444444;
                font-weight: 600;
            }
        }

        .btn {
            width: 120px;
            position: relative;
            top: 50px;
            left: 63%;
        }
    }
</style>