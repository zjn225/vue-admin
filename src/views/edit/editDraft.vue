<template>
    <div v-loading="loading" element-loading-text="正在发表，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <el-input class="title" v-model="draft.title" placeholder="请输入标题"></el-input>


            <quillEditor v-model="draft.content"
                         ref="myQuillEditor"
                         :options="editorOption"
                         @blur="onEditorBlur($event)"
                         @focus="onEditorFocus($event)"
                         @ready="onEditorReady($event)">
            </quillEditor>

        </div>
        <div class="right">
            <!--作者-->
            <div class="author">
                <h3>作者</h3>
                <el-input class="right_input" v-model="draft.author" placeholder="作者"></el-input>
            </div>
            <!--发布日期-->
            <div class="date">
                <h3>发布日期</h3>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="draft.time"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
            </div>
            <!-- 类别 -->
            <div class="block">
                <h3>分类</h3>
                <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </div> 
            <h3>文章来源</h3>
            <el-input class="source" v-model="draft.source" placeholder="文章来源"></el-input>
           
         
            <h3>是否将该文章列为首页轮播图</h3>
            <el-switch
                    v-model="isBanner"
                    on-color="#13ce66"
                    active-text="是"
                    inactive-text="否"
                    :active-value='1'
                    :inactive-value='0'
                    @change="countPic(true)"
            >
            </el-switch>
            <div class="block" v-if="picNum && isBanner">
                <h3>选择轮播图</h3>

                <el-radio-group v-model="indexbanner" v-for="(item,index) in picNum" :key="index" class="sele">
                    <el-radio :label="index">图片{{index + 1}}</el-radio>
                </el-radio-group>
            </div>
             <el-table
                :data="draft.draftTime"
            style="width: 220px">
            <el-table-column
                prop="draftTime"
            label="历史修改时间"
            width="220">
            </el-table-column>
            
            </el-table>
        </div>
        <div class="btn">
            <el-button type="success" class="btn2" size='medium' id="submit2" @click="renewDraft()" icon="el-icon-upload2">
                更新草稿
            </el-button>
         
            <el-button type="primary" class="btn1" size='medium' id="submit" @click="onEditorChange()"
                       icon="el-icon-upload">发表文章
            </el-button>
        </div>
        <CropImg
                v-if="showCrop"
                :uploadUrl="uploadUrl"
                @onUploadSuccess="onUploadSuccess"
                @onStopCrop="onStopCrop"
        ></CropImg>
    </div>
</template>

<script>
    import {postArticle, postDraft,updateDraft,deleteDraft,uploadImg} from "../../api/api";
    import {mapMutations,mapState} from "vuex";
    import CropImg from "../Upload/CropImg";
    import {quillEditor} from 'vue-quill-editor'

    export default {
        data() {
            return {
                picNum: 0,
                show: false,
                canCrop: false,
                /*测试上传图片的接口，返回结构为{url:''}*/
                uploadUrl: `http:${process.env.API_ROOT}data/article/uploadImg`,
                selectedOptions: this.$store.state.selectedOptions,
                activeNames:['1'],
                indexbanner: 0, //注意是从0开始的，但是在页面是有+1的
                loading: false,
                /*显示裁切控件*/
                showCrop: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                hasPic: true, //默认没动开关时是关闭状态，如果设为false，那么不动开关也无法发表
      
                isBanner: 0, //是否列为首页banner
                editorOption: {
                    // 编辑器的配置
                    // something config
                },
              
                options:  [
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
                            }
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
                                label: "学术会议"
                            },
                            {
                                value: "2",
                                label: "流通论坛"
                            },
                            {
                                value: "3",
                                label: "来访交流"
                            }
                        ]
                    },
                    {
                        value:"advisory",
                        label:"咨询服务",
                        children:[
                            {
                                value:"1",
                                label:"政府咨询"
                            },
                            {
                                value:"2",
                                label:"企业咨询"
                            },
                            {
                                value:"3",
                                label:"培训课程"
                            }
                        ]
                    },
                    {
                        value:"dynamic",
                        label:"智库专家",
                        children:[
                            {
                                value:"1",
                                label:"专家动态"
                            },
                        ]
                    }
                ],
            };
        },
        components: {
            CropImg,
            quillEditor
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            ...mapMutations(["SAVE_ARTICLEINFO"]),
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
            
            /**
            * @description 不能在开关的change方法加入hasImg，否则先打开开关再加入图片就出现bug了.
            * @param {*} flag flag用于el-switch轮播图设置交互提醒
            */
            countPic(flag = false) {
                var reg = /<img src=/g;
                if (reg.test(this.draft.content)) {
                    let imgNum = this.draft.content.match(reg);
                    this.picNum = imgNum.length;
                    
                } else {
                    this.picNum = 0;
                    if(flag){
                        this.$notify({
                            title: '警告',
                            message: '文章中没有图片，不能设置为轮播图',
                            type: 'warning'
                        });
                        this.isBanner='0';
                    }
                    
                }
                
            },
            hasImg() {
                var reg = /<img src=/g;
                if (reg.test(this.draft.content)) {
                    //有图片
                    this.hasPic = true;
                    this.countPic();
                } else {
                    //无图片
                    this.hasPic = false;
                }
            },
            /*更新草稿 */
            async renewDraft() {
              
                if (this.draft.content.length === 0) {
                    this.$message({message:"请不要发表内容为空的文章",type: 'warning'});
                    return;
                }
                if (this.draft.author.length === 0) {
                    this.$message({message:"请标明作者",type: 'warning'});
                    return;
                }
                if (this.draft.title.length === 0) {
                    this.$message({message:"请输入标题",type: 'warning'});
                    return;
                }
                if (!this.draft.time) {
                    this.$message({message:"请选择发布日期",type: 'warning'});
                    return;
                }
               
                if (this.draft.source.length === 0) {
                    this.$message({message:"请输入文章来源",type: 'warning'});
                    return;
                }
               
                this.loading = true;
                let result = await updateDraft({
                    id: this.draft.id,
                    title: this.draft.title,
                    author: this.draft.author,
                    content: this.draft.content,
                    source: this.draft.source,
                    time: this.draft.time,
                    sort : this.selectedOptions[0],
                    type : this.selectedOptions[1]
                });
                const {code, msg} = result;
                if (code === 200) {
                    this.loading = false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$store.state.selectedOptions = this.selectedOptions;
                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },
            async onEditorChange() {
              
                this.hasImg();
                if (this.draft.content.length === 0) {
                    this.$message({message:"请不要发表内容为空的文章",type: 'warning'});
                    return;
                }
                if (this.draft.author.length === 0) {
                    this.$message({message:"请标明作者",type: 'warning'});
                    return;
                }
                if (this.draft.title.length === 0) {
                    this.$message({message:"请输入标题",type: 'warning'});
                    return;
                }
                if (!this.draft.time) {
                    this.$message({message:"请选择发布日期",type: 'warning'});
                    return;
                }
               
                if (this.draft.source.length === 0) {
                    this.$message({message:"请输入文章来源",type: 'warning'});
                    return;
                }
                if (!this.hasPic && this.isBanner == 1) {
                    this.$message({message:"内容没有图片，请不要设置为首页的轮播图",type: 'warning'});
                    return;
                }
                this.loading = true;
                                
                let result = await postArticle({
                    title: this.draft.title,
                    author: this.draft.author,
                    content: this.draft.content,
                    source: this.draft.source,
                    time: this.draft.time,
                    selectedOptions : this.selectedOptions,
                    isbanner: this.isBanner,
                    indexbanner: this.indexbanner
                });
                const {code, msg} = result;
                if (code === 200) {

                    //成功发布草稿后，发送请求删除该草稿
                    let article = [{
                        id: this.draft.id
                    }];
                    deleteDraft({article});
                    this.loading = false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$store.state.selectedOptions = this.selectedOptions;
                    this.$router.push({path: "/article"});
                } else {
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },
            onUploadSuccess: function (path) {
                this.showCrop = false;
                this.editor.focus();
                this.editor.insertEmbed(this.editor.getSelection().index, "image", path);
            },
            onStopCrop() {
                this.showCrop = false;
            },
            onFileChange(e) {
                let fileInput = e.target;
                let file = fileInput.files[0];
                if (fileInput.files.length == 0) {
                    return;
                }
                if (window.createObjectURL != undefined) { // basic
                    this.uploadUrl = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    this.uploadUrl = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    this.uploadUrl = window.webkitURL.createObjectURL(file);
                }
                this.editor.focus();
                this.showCrop = true;
            },
        },
        mounted() {
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
            const loginTime = year + '/' + month + '/' + day;
            this.time = loginTime;
            let self = this;
            var imgHandler = function imgHandler() {
                let input = document.createElement("input");
                input.type = "file";
                input.name = self.fileName;
                input.accept = "image/jpeg,image/png,image/jpg,image/gif";
                input.onchange = self.onFileChange;
                input.click();
            }
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
        },
        computed: {
            ...mapState(["draft"]),

            editor() {
                return this.$refs.myQuillEditor.quill;
            },

        },
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
            margin-top: 80px;
            .btn1, .btn2{
                width: 120px;
            }
            .btn1 {
                margin-right: 100px;
                float: right;
            }
        }
        .sele {
            padding: 18px 5px 0;
        }
    }
    
</style>