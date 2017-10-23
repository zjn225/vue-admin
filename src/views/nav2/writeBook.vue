<template>
    <div>
        <div class="left">
            <quill-editor ref="myTextEditor"
                          v-model="bookInfo.content"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @ready="onEditorReady($event)">
            </quill-editor>
        </div>
        <div class="right">
            <!--作者-->
            <div class="author">
                <h3>著作名称</h3>
                <el-input class="right_input" v-model="bookInfo.name" placeholder=""></el-input>
            </div>

            <h3>职称</h3>
            <el-input class="right_input" v-model="bookInfo.job" placeholder=""></el-input>

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">更新数据</el-button>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
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
            onEditorChange() {
                console.log(this.$store.state.bookInfo);
            }
        },

        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },

            ...mapState([
                'bookInfo'
            ])
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

    }


</style>