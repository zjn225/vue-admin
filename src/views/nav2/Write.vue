<template>
    <div>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <el-button type="primary" class="btn" native-type="submit">发表</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content: '<h2>I am Example</h2>',
                editorOption: {
                    // something config
                }
            }
        },
        // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
        methods: {
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            onEditorChange({editor, html, text}) {
                // console.log('editor change!', editor, html, text)
                this.content = html
            }
        },
        // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
        // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            // you can use current editor object to do something(editor methods)
            console.log('this is my editor', this.editor)
            // this.editor to do something...
        }
    }
</script>

<style lang="scss" scoped>
    div{
        display: flex;
        flex-direction:column;

        .quill-editor {
            margin-top: 20px;
            height: 685px;
        }
        .btn{
            width: 100px;
            margin-top: 80px;
            align-self: flex-end;
        }
    }
</style>