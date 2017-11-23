<template>
    <div v-loading="loading" element-loading-text="正在修改中，请稍后"
         element-loading-spinner="el-icon-loading">
        <div class="left">
            <el-input class="title" v-model="article.title" placeholder="请输入标题"></el-input>
              <quillEditor v-model="article.content"
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
                <h3>作者</h3>
                <el-input class="right_input" v-model="article.author" placeholder="作者"></el-input>
            </div>
            <!--发布日期-->
            <div class="date">
                <h3>发布日期</h3>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="article.time"
                            type="date"
                            format="yyyy-MM-dd"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions0">
                    </el-date-picker>
                </div>
            </div>
            <!--类别-->
            <!-- <div class="block">
                <h3>分类</h3>
                <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                </el-cascader>
            </div> -->
            <!--分类-->
            <h3>文章来源</h3>
            <el-input class="source" v-model="article.source" placeholder="文章来源"></el-input>

            <h3>是否将该文章列为首页轮播图</h3>
            <el-switch
                    v-model="article.isbanner"
                    on-color="#13ce66"
                    on-text="是"
                    off-text="否"
                    :active-value='1'
                    :inactive-value='0'
                    @change="countPic()">
            </el-switch>
        
            <div v-if="article.isbanner"> 
                <el-radio-group v-model="indexbanner"  v-for="(item,index) in picNum" :key='index' class="sele">
                    <el-radio :label="index">图片{{index + 1}}</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="btn">
            <el-button type="primary" class="btn" id="submit" @click="onEditorChange()" icon="el-icon-upload">修改文章
            </el-button>
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
import { mapState, mapMutations } from "vuex";
import { editArticle,uploadImg } from "../../api/api";
import CropImg from "../Upload/CropImg";
import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
        editorOption: {
            // 编辑器的配置
            // something config
        },
      content:'',
      picNum: 0,
      indexbanner : this.$store.state.article.indexbanner,
      // selectedOptions : this.$store.state.article.selectedOptions,
      loading: false,
      showCrop: false,
      uploadUrl: `http:${process.env.API_ROOT}data/article/uploadImg`,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
     
      options: [
        {
          value: "information",
          label: "科研资讯",
          children: [
            {
              value: "1",
              label: "科研简讯"
            },
            {
              value: "2",
              label: "媒体报道"
            }
          ]
        },
        {
          value: "research",
          label: "科学研究",
          children: [
            {
              value: "1",
              label: "课题研究"
            },
            {
              value: "2",
              label: "调研考察"
            }
          ]
        },
        {
          value: "achievement",
          label: "科研成果",
          children: [
            {
              value: "1",
              label: "著作"
            },
            {
              value: "2",
              label: "学术论文"
            },
            {
              value: "3",
              label: "研究报告"
            }
          ]
        },
        {
          value: "exchange",
          label: "学术交流",
          children: [
            {
              value: "1",
              label: "学术学会"
            },
            {
              value: "2",
              label: "流通论坛"
            },
            {
              value: "3",
              label: "来访交流"
            }
          ]
        }
      ]
    };
  },
  components: {
    CropImg,
    quillEditor
  },
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    handleChange(value) {
      this.countPic();
    },
    onEditorBlur(editor) {
      this.countPic();
    },
    onEditorFocus(editor) {
      this.countPic();
    },
    onEditorReady(editor) {
      this.countPic();
    },
    // ...mapMutations(['SAVE_SELECTOPTION']),
 
    countPic() {
      var reg = /src/g;

      if (reg.test(this.article.content)) {
        let ss = this.article.content.match(reg);
        this.picNum = ss.length;
     
      }
    },
    hasImg() {
      var reg = /src/g;
      if (reg.test(this.article.content)) {
        //有图片
        this.hasPic = true;
        this.countPic();
      } else {
        //无图片
        this.hasPic = false;
      }
    },
    async onEditorChange() {
      this.hasImg();

      if (!this.article.content) {
        this.$message("请不要发表内容为空的文章");
        return;
      }
      if (!this.article.author) {
        this.$message("请标明作者");
        return;
      }
      if (!this.article.title) {
        this.$message("请输入标题");
        return;
      }
      if (!this.article.time) {
        this.$message("请选择发布日期");
        return;
      }
      if (this.article.selectedOptions.length === 0) {
        this.$message("请选择分类");
        return;
      }
      if (!this.article.source) {
        this.$message("请输入文章来源");
        return;
      }

      if (!this.hasPic && this.article.isbanner) {
        this.$message("内容没有图片，请不要设置为首页的轮播图");
        return;
      }

      this.loading = true;
      // this.article.selectedOptions = this.selectedOptions;
      this.article.indexbanner = this.indexbanner;
      const result = await editArticle(this.article);
      const { code, msg } = result.data;

      if (code === 200) {
        // this.SAVE_SELECTOPTION(this.selectedOptions);

        this.loading = false;
        this.$message({
          message: msg,
          type: "success"
        });
        this.$router.push({ path: "/article" });
      } else {
        this.loading = false;        
        this.$message({
          message: msg,
          type: "error"
        });
      }
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
  // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，
  // 实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
  computed: {
    ...mapState(["article"]),
    
     editor() {
       return this.$refs.myQuillEditor.quill;
     }
  },
  created:{

  },
  mounted() {
    let self = this;
    console.log(this.article)
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
    .title {
      margin-top: 20px;
    }
    .quill-editor {
      margin-top: 20px;
      height: 590px;
    }
    .source {
      position: relative;
      top: 90px;
    }
  }

  .right {
    position: relative;
    bottom: 662px;
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
    width: 120px;
    position: relative;
    top: 40px;
    left: 58%;
  }
  .sele {
    padding: 18px 5px 0;
  }
}
</style>