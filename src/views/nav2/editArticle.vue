<template>
    <div v-loading="loading" element-loading-text="正在修改中，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <el-input class="title" v-model="article.title" placeholder="请输入标题"></el-input>
            <quill-editor ref="myTextEditor"
                          v-model="article.content"
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
                <el-input class="right_input" v-model="article.author" placeholder="作者"></el-input>
            </div>
            <!--发布日期-->
            <div class="date">
                <h3>发布日期</h3>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="article.time"
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
                        v-model="article.selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </div>
            <!--分类-->
            <h3>文章来源</h3>
            <el-input class="source" v-model="article.source" placeholder="文章来源"></el-input>

            <h3>是否将该文章列为首页轮播图</h3>
            <el-switch
                    v-model="article.isbanner"
                    on-color="#13ce66"
                    on-text="是"
                    off-text="否"
                    :active-value='1'
                    :inactive-value='0'
                    @change="countPic()">
            </el-switch>

            <el-radio-group v-model="indexBanner" v-if="article.isbanner" v-for="(item,index) in picNum" class="sele">
                <el-radio :label="index">图片{{index + 1}}</el-radio>
            </el-radio-group>

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()" icon="el-icon-upload">修改文章
            </el-button>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    import {mapState} from "vuex";
    import {editArticle} from "../../api/xh_api";

    export default {
        data() {
            return {
                picNum: 0,
                indexBanner: 0, //注意是从0开始的，但是在页面是有+1的
                loading: false,
//                hasPic: true,
//                isBanner: 0,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
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
                                label: "学术学会"
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
                this.countPic();
            },
            onEditorBlur(editor) {
                this.countPic();
            },
            onEditorFocus(editor) {
                this.countPic();
            },
            onEditorReady(editor) {
                this.countPic();
            },

            countPic() {
                console.log(this.article.content)
                var reg = /src/g;
//                console.log(reg.test(this.article.content))
                if (reg.test(this.article.content)) {
                    let ss = this.article.content.match(reg)
                    this.picNum = ss.length;
                    console.log("图片数量：" + this.picNum)
                }
            },
            hasImg() {
                var reg = /src/g;
                if (reg.test(this.article.content)) {  //有图片
                    this.hasPic = true;
                    this.countPic();
                } else {                      //无图片
                    this.hasPic = false;
                }
            },
            async onEditorChange() {
                this.hasImg();
             
                if (!this.article.content) {
                    this.$message("请不要发表内容为空的文章");
                    return;
                }
                if (!this.article.author) {
                    this.$message("请标明作者")
                    return;
                }
                if (!this.article.title) {
                    this.$message("请输入标题");
                    return;
                }
                if (!this.article.time) {
                    this.$message("请选择发布日期");
                    return;
                }
                if (this.article.selectedOptions.length === 0) {
                    this.$message("请选择分类");
                    return;
                }
                if (!this.article.source) {
                    this.$message("请输入文章来源");
                    return;
                }
                console.log(this.hasPic)
                if (!this.hasPic && this.article.isbanner) {
                    this.$message("内容没有图片，请不要设置为首页的轮播图");
                    return;
                }

                this.loading = true;
             
                const result = await editArticle({
                    title: this.article.title,
                    id: this.article.id,
                    author: this.article.author,
                    content: this.article.content,
                    source: this.article.source,
                    time: this.article.time,
                    selectedOptions: this.article.selectedOptions,
                    isbanner: this.article.isbanner,
                    indexBanner: this.indexBanner
                });
                const {code, msg} = result.data;

                if (code === 200) {
                    this.loading = false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$router.push({path: "/article"});
                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            }
        },
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
        // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            },
            ...mapState(["article"])
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
            left: 58%;
        }
        .sele {
            padding: 18px 5px 0;
        }
    }
</style>