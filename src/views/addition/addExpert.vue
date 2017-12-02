<template>
    <div v-loading="loading" element-loading-text="正在新增中，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <quillEditor v-model="content"
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
                <h3>专家名字</h3>
                <el-input class="right_input" v-model="name" placeholder=""></el-input>
            </div>

            <h3>职位</h3>
            <el-input class="right_input" v-model="position" placeholder=""></el-input>

            <h3>头像</h3>
            <el-button type="primary" @click="toggleShow" class='setAvatar'>设置头像</el-button>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show"
                       :width="200"
                       :height="200"
                       :url="avatarURL"
                       img-format="png"></my-upload>

            <img :src="dialogImageUrl" alt="" class='avatar'>

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">提交</el-button>
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
    import CropImg from "../Upload/CropImg";
    import { quillEditor,uploadImg} from 'vue-quill-editor'

    import {addPerson} from "../../api/api";
    import myUpload from "vue-image-crop-upload";

    export default {
        data() {
            return {
                loading: false,
                avatarURL: `http:${process.env.API_ROOT}data/team/person/avatar`,
                canCrop:false,
                /*测试上传图片的接口，返回结构为{url:''}*/
                uploadUrl:`http:${process.env.API_ROOT}data/person/uploadImg`,
                name: "",
                position: "",
                content: "",
                /*显示裁切控件*/
                showCrop: false,
                show: false,
                avatar: "",
                dialogImageUrl: "",
                dialogVisible: false,
                editorOption: {
                    // 编辑器的配置
                    // something config
                }
            };
        },
        components: {
            CropImg,
            quillEditor,
            "my-upload": myUpload
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
                //                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                //                console.log('editor ready!', editor)
            },
            async onEditorChange() {
                if (!this.content) {
                    this.$message("请不要发表内容为空的文章");
                    return;
                }
                if (!this.name) {
                    this.$message("请输入该专家的名字");
                    return;
                }
                if (!this.position) {
                    this.$message("请输入该专家的职位");
                    return;
                }
                if (!this.dialogVisible) {
                    this.$message("头像未上传");
                    return;
                }

                this.loading=true;

                let result = await addPerson({
                    name: this.name,
                    position: this.position,
                    content: this.content,
                    avatar: this.avatar,
                    sort:'expert'
                });

                const {code, msg} = result.data;

                if (code === 200) {
                    this.loading=false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });

                    this.$router.push({path: "/expert"});
                } else {
                    this.loading=false;
                    this.$message({
                        message: msg,
                        type: "error"
                    });
                }
            },

            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field) {
                console.log("-------- crop success --------");
                this.dialogImageUrl = imgDataUrl;
                this.dialogVisible = true;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field) {
                console.log("-------- upload success --------");
                this.avatar = jsonData.path;
                this.show = !this.show;
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field) {
                console.log("-------- upload fail --------");
                console.log(status);
                console.log("field: " + field);

            },

            onUploadSuccess: function(path) {
                this.showCrop= false;
                this.editor.focus();
                this.editor.insertEmbed(this.editor.getSelection().index, "image", path);
            },
            onStopCrop(){
                this.showCrop= false;
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
                this.showCrop= true;
            },
        },

        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            }
        },
        mounted() {
            let self = this;
            var imgHandler =  function imgHandler(){

                let input = document.createElement("input");
                input.type = "file";
                input.name = self.fileName;
                input.accept = "image/jpeg,image/png,image/jpg,image/gif";
                input.onchange = self.onFileChange;
                input.click();
            }
            this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
        },
    };
</script>

<style lang="scss" scoped>
    div {
        width: 100%;
        .left {
            width: 77%;
            height: auto;

            .quill-editor {
                margin-top: 20px;
                height: 590px;
            }
        }

        .right {
            position: relative;
            bottom: 600px;
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
            width: 100px;
            position: relative;
            top: 50px;
            left: 63%;
        }

        .upl {
            margin: 10px 0px;
        }
    }

    .setAvatar {
        margin-top: 40px;
    }

    .avatar {
        margin-top: 40px;

        width: 280px;
    }
</style>