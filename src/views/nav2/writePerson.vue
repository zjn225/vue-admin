<template>
    <div v-loading="loading" element-loading-text="正在修改中，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <quill-editor ref="myTextEditor"
                          v-model="person.content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="right">
            <!--作者-->
            <div class="author">
                <h3>专家名字</h3>
                <el-input class="right_input" v-model="person.name" placeholder=""></el-input>
            </div>

            <h3>职位</h3>
            <el-input class="right_input" v-model="person.position" placeholder=""></el-input>
            <el-button type="primary" @click="toggleShow" class='setAvatar'>设置头像</el-button>
            <my-upload field="img"
                       @crop-success="cropSuccess"
                       @crop-upload-success="cropUploadSuccess"
                       @crop-upload-fail="cropUploadFail"
                       v-model="show"
                       :width="300"
                       :height="300"
                       :url="avatarURL"
                       :params="params"
                       :headers="headers"
                       img-format="png"></my-upload>
            <img class='avatar' :src='person.avatar' alt="">


        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">更新数据</el-button>
        </div>

    </div>
</template>

<script>
    import {quillEditor} from "vue-quill-editor";
    import {editPerson} from "../../api/xh_api";
    import {mapState} from "vuex";
    import myUpload from "vue-image-crop-upload";

    export default {
        data() {
            return {
                loading: false,
                avatarURL: `http:${process.env.API_ROOT}data/team/person/avatar`,
                show: false,
                avatarID: false,
                dialogVisible: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                editorOption: {
                    // 编辑器的配置
                    // something config
                }
            };
        },
        components: {
            quillEditor,
            "my-upload": myUpload
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {

            async onEditorChange() {
                this.loading=true;
                let result = await editPerson({
                    name: this.person.name,
                    id: this.person.id,
                    position: this.person.position,
                    content: this.person.content,
                    avatar: this.person.avatar
                });

                const {code, msg} = result.data;

                if (code === 200) {
                    this.loading=false;
                    this.$message({
                        message: msg,
                        type: "success"
                    });
                    this.$router.push({path: "/user"});
                } else {
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
                console.log(imgDataUrl, field);
                console.log("-------- crop success --------");
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field) {
                console.log("-------- upload success --------");
                this.person.avatar = jsonData.path;

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

            }
        },

        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            },

            ...mapState(["person"])
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