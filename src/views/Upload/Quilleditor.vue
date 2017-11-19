<template>
    <div>
        <quill-editor v-model="content"
                     ref="myTextEditor"
                     :options="editorOption"
                     @change="onChange"
                     v-loading="loading"
                     element-loading-text="上传图片中"
        >
            <div id="toolbar" slot="toolbar">
                <span class="ql-formats"><button type="button" class="ql-bold"></button></span>
                <span class="ql-formats"><button type="button" class="ql-italic"></button></span>
                <span class="ql-formats"><button type="button" class="ql-underline"></button></span>
                <span class="ql-formats"><button type="button" class="ql-strike"></button></span>
                <span class="ql-formats"><button type="button" class="ql-blockquote"></button></span>
                <span class="ql-formats"><button type="button" class="ql-code-block"></button></span>
                <span class="ql-formats"><button type="button" class="ql-header" value="1"></button></span>
                <span class="ql-formats"><button type="button" class="ql-header" value="2"></button></span>
                <span class="ql-formats"><button type="button" class="ql-list" value="ordered"></button></span>
                <span class="ql-formats"><button type="button" class="ql-list" value="bullet"></button></span>
                <span class="ql-formats"><button type="button" class="ql-script" value="sub"></button></span>
                <span class="ql-formats"><button type="button" class="ql-script" value="super"></button></span>
                <span class="ql-formats"><button type="button" class="ql-indent" value="-1"></button></span>
                <span class="ql-formats"><button type="button" class="ql-indent" value="+1"></button></span>
                <span class="ql-formats"> <button type="button" class="ql-direction" value="rtl"></button></span>

      <span class="ql-formats"><select class="ql-size">
        <option value="small"></option>
        <option selected></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected="selected"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-color">
        <option selected="selected"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option value="#ffffff"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
     <span class="ql-formats"> <select class="ql-background">
        <option value="#000000"></option>
        <option value="#e60000"></option>
        <option value="#ff9900"></option>
        <option value="#ffff00"></option>
        <option value="#008a00"></option>
        <option value="#0066cc"></option>
        <option value="#9933ff"></option>
        <option selected="selected"></option>
        <option value="#facccc"></option>
        <option value="#ffebcc"></option>
        <option value="#ffffcc"></option>
        <option value="#cce8cc"></option>
        <option value="#cce0f5"></option>
        <option value="#ebd6ff"></option>
        <option value="#bbbbbb"></option>
        <option value="#f06666"></option>
        <option value="#ffc266"></option>
        <option value="#ffff66"></option>
        <option value="#66b966"></option>
        <option value="#66a3e0"></option>
        <option value="#c285ff"></option>
        <option value="#888888"></option>
        <option value="#a10000"></option>
        <option value="#b26b00"></option>
        <option value="#b2b200"></option>
        <option value="#006100"></option>
        <option value="#0047b2"></option>
        <option value="#6b24b2"></option>
        <option value="#444444"></option>
        <option value="#5c0000"></option>
        <option value="#663d00"></option>
        <option value="#666600"></option>
        <option value="#003700"></option>
        <option value="#002966"></option>
        <option value="#3d1466"></option>
      </select></span>
      <span class="ql-formats"><select class="ql-font">
        <option selected="selected"></option>
        <option value="serif"></option>
        <option value="monospace"></option>
      </select></span>
      <span class="ql-formats">
        <select class="ql-align">
        <option selected="selected"></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      </span>
      <span class="ql-formats">
          <button type="button" class="ql-clean"></button>
      </span>
      <span class="ql-formats">
          <button type="button" class="ql-link"></button>
      </span>
      <span class="ql-formats">
          <button type="button" @click="imgClick">
            <svg viewBox="0 0 18 18">
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
            </svg>
          </button>
      </span>
       <span class="ql-formats">
           <button type="button" class="ql-video"></button>
       </span>
     </div>
        </quill-editor>
        <CropImg
                   v-if="showCrop"                  
                   :uploadUrl="uploadUrl"
                   @onUploadSuccess="onUploadSuccess"
                   @onStopCrop="onStopCrop"
                   ></CropImg>        
    </div>
</template>
<script>
import CropImg from "./CropImg";
import { quillEditor } from "vue-quill-editor";
import { uploadImg } from "../../api/api";

export default {
  
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: "#toolbar"
        }
      },
      loading: false,
      /*显示裁切控件*/
      showCrop: false,
      uploadUrl:'',
    };
  },
  methods: {   
  
    /*裁切上传成功 res根据上传接口值获取*/
    onUploadSuccess: function(path) {
      this.showCrop= false;    
      this.editor.focus();
      this.editor.insertEmbed(this.editor.getSelection().index, "image", path);
    },
    onStopCrop(){
      this.showCrop= false;      
    },
    onChange() {
      this.$emit("input", this.content);
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
    /*点击上传图片按钮*/
    imgClick() {
    let input = document.createElement("input");
      input.type = "file";
      input.name = this.fileName;
      input.accept = "image/jpeg,image/png,image/jpg,image/gif";
      input.onchange = this.onFileChange;
      input.click();
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },
  components: {
    quillEditor,
    CropImg
  
  },
  mounted() {
    this.content = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal;
        }
      }
    }
  }
};
</script>
<style>
.quill-editor {
  padding-bottom: 80px;
  margin-top: 20px;
  height: 590px;
}

</style>