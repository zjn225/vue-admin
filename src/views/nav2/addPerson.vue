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
            <!--作者-->
            <div class="author">
                <h3>专家名字</h3>
                <el-input class="right_input" v-model="name" placeholder=""></el-input>
            </div>

            <h3>职位</h3>
            <el-input class="right_input" v-model="position" placeholder=""></el-input>

            <h3>头像</h3>
            <el-upload
                    :action='avatarURL'
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" 
                    :before-upload='getAvatarID'
                    class="upl">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()" >提交</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { addPerson } from "../../api/xh_api";

export default {
  data() {
    return {
      avatarURL: `http:${process.env.API_ROOT}data/team/person/avatar`,
      name: "",
      position: "",
      content: "",
      dialogImageUrl: "",
      dialogVisible: false,
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
    tranrTobase(file) {
      return new Promise((resolve, reject) => {
          console.log('sdf')  
          
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let avatar = null;
        reader.onload = function() {
          resolve(this.result);
        };
      });
    },
    async getAvatarID(file) {
        
      this.avatar = await this.tranrTobase(file);
    },
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
      if (this.name && this.position && this.content) {
        console.log(this.name);
        console.log(this.content);
        this.$message.success("提交成功！");
      }
      this.content || this.$message("请不要发表内容为空的文章");
      this.name || this.$message("请输入该专家的名字");
      this.position || this.$message("请输入该专家的职位");

      let result = await addPerson({
        name: this.name,
        position: this.position,
        content: this.content,
        avatar: this.avatar
      });
      console.log(result);
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
      console.log(this.dialogImageUrl);
      this.dialogVisible = true;
    }
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
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