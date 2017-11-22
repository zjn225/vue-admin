<template>
    <div>
        <div class="left">
            <quill-editor ref="myTextEditor"
                          v-model="content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="right">
            <div class="author">
                <h3>著作名称</h3>
                <el-input class="right_input" v-model="name" placeholder=""></el-input>
            </div>

            <h3>发布日期</h3>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="time"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                </el-date-picker>
            </div>

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'

    export default {
        data() {
            return {
                name:'',
                content:'',
                time: '', //发表时间
                dialogImageUrl: '',
                dialogVisible: false,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                editorOption: {                  // 编辑器的配置
                    // something config
                },

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
//                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
//                console.log('editor ready!', editor)
            },
            async onEditorChange() {
                if (
                    this.name  &&
                    this.time &&
                    this.content
                ) {
                    console.log(this.name);
                    console.log(this.time);
                    console.log(this.content);
                    this.$message.success("提交成功！");
                }
                this.content || this.$message("请不要发表内容为空的文章");
                this.time || this.$message("请选择发布日期");
                this.name || this.$message("请输入著作的名字");
                result = await addBook({
                    name:this.name,
                    time: this.time,
                    content: this.content,
                });
                const { code, msg } = result.data;

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

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },

        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },

        },
        mounted() {

        }
    }
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

            .el-date-editor, .el-cascader {
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


</style>