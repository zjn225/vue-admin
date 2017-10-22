<template>
 <div>
  <div class="left">
   <quill-editor ref="myTextEditor"
                 v-model="userInfo.content"
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
    <el-input class="right_input" v-model="userInfo.name" placeholder=""></el-input>

    <h3>性别</h3>
       <el-radio class="radio" v-model="userInfo.sex" label="1">男</el-radio>
       <el-radio class="radio" v-model="userInfo.sex" label="2">女</el-radio>
   </div>

      <h3>年龄</h3>
      <el-input class="right_input" v-model="userInfo.age" placeholder=""></el-input>

      <h3>地址</h3>
      <el-input class="right_input" v-model="userInfo.addr" placeholder=""></el-input>

  </div>
  <div class="btn">
   <el-button type="primary" class="btn" id="submit" @click="onEditorChange()">更新数据</el-button>
  </div>
 </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import store from '../../vuex/store'
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
                console.log("来自writeperson页面："+this.$store.state.age)
                console.log("来自writeperson页面："+this.age);
                console.log(this.$store.state.userInfo);
            }
        },

        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor
            },

            ...mapState([
                'userInfo'
            ])
            // name:{
            //     get: function () {
            //         return this.$store.state.name
            //     },
            //     // setter
            //     set: function (newValue) {
            //         return this.$store.state.name
            //     }
            // } ,
            // sex:{
            //     get: function () {
            //         return this.$store.state.sex
            //     },
            //     // setter
            //     set: function (newValue) {
            //         this.sex = newValue;
            //     }
            // },
            // age:{
            //     get: function () {
            //         return this.$store.state.age
            //     },
            //     // setter
            //     set: function (newValue) {
            //        console.log(this.age)//正常
            //        console.log(newValue)//正常
            //         this.age= newValue;
            //     }
            // },
            // addr:{
            //     get: function () {
            //         return this.$store.state.addr
            //     },
            //     // setter
            //     set: function (newValue) {
            //         this.addr= newValue;
            //     }
            // },
            // content:{
            //     get: function () {
            //         return this.$store.state.content
            //     },
            //     // setter
            //     set: function (newValue) {
            //         this.content= newValue;
            //     }
            // }

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