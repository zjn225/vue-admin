<template>
    <div>
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

           

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()" >更新数据</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { editPerson } from "../../api/xh_api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      avatarURL: `http:${process.env.API_ROOT}/data/avatar`,
      dialogImageUrl: "",
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
      let result = await editPerson({
        name: this.person.name,
        id: this.person.id,
        position: this.person.position,
        content: this.person.content
      });

      const { code, msg } = result.data;

      if (code === 200) {
        this.$message({
          message: msg,
          type: "success"
        });

        this.$router.push({ path: "/user" });
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
      return this.$refs.myTextEditor.quillEditor;
    },

    ...mapState(["person"])
  },
  mounted() {}
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
</style>