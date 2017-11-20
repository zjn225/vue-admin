<template>
    <div v-loading="loading" element-loading-text="正在修改中，请稍后"
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
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="updateContent()">保存</el-button>
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
import { quillEditor } from "vue-quill-editor";
import { getIntro, updateIntro , uploadImg } from "../../api/api";
import CropImg from "../Upload/CropImg";

export default {
  data() {
    return {
      loading: false,
      showCrop: false,
      content:'',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      editorOption: {}
    };
  },
  components: {
    quillEditor,
    CropImg
  },
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    handleChange(value) {},
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},

    getContent() {
      getIntro().then(data => {
        let { code, msg, content } = data;

        if (code === 200) {
          this.content = content;
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
    updateContent() {
      if (!this.content) {
        this.$message("简介不能为空");
        return;
      }

      this.loading = true;
      updateIntro({ content: this.content }).then(data => {
        let { code, msg } = data;
        this.loading = false;

        if (code === 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        } else {
          this.$message({
            message: msg,
            type: "error"
          });
        }
      });
    },
     onUploadSuccess: function(path) {
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

      if (window.createObjectURL != undefined) {
        // basic
        this.uploadUrl = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        this.uploadUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        this.uploadUrl = window.webkitURL.createObjectURL(file);
      }

      this.editor.focus();
      this.showCrop = true;
    }
  },

   computed: {
     editor() {
       return this.$refs.myQuillEditor.quill;
     }
  },
  mounted() {
    this.getContent();
    let self = this;
    var imgHandler = function imgHandler() {
      let input = document.createElement("input");
      input.type = "file";
      input.name = self.fileName;
      input.accept = "image/jpeg,image/png,image/jpg,image/gif";
      input.onchange = self.onFileChange;
      input.click();
    };
    this.$refs.myQuillEditor.quill.getModule("toolbar").addHandler("image", imgHandler);
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  .left {
    width: 100%;
    height: auto;
    .title {
      margin-top: 20px;
    }
    .quill-editor {
      margin-top: 20px;
      height: 450px;
    }
    .source {
      position: relative;
      top: 90px;
    }
  }

  .btn {
    width: 100px;
    position: relative;
    top: 40px;
    left: 1px;
  }
}
</style>