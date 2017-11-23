<template>
	
  <div  class='vueCropper-mask' > 
    <vueCropper
	ref="cropper"
	:img="uploadUrl"
	:outputSize="CropImg.outputSize"
	:outputType="CropImg.outputType"
	:info="CropImg.info"
	:autoCrop="CropImg.autoCrop"
	:fixed="CropImg.fixed"
  class='vueCropper'
></vueCropper>
<el-row :gutter="10" class='btn-box'>
    
   <el-button @click="startCrop" v-if="!crap" class="btn btn1" type="primary" round>开始截图</el-button>
   <el-button @click="stopCrop" v-else class="btn " type="danger" round>结束截图</el-button>
  <el-button @click="changeScale(1)" class="btn" type="primary" round>放大</el-button>
  <el-button @click="changeScale(-1)" class="btn" type="primary" round>缩小</el-button>
  <el-button @click="rotateLeft" class="btn" type="primary" round>左转</el-button>
	<el-button @click="rotateRight" class="btn" type="primary" round>右转</el-button>
</el-row>
<el-row :gutter="2" class='submit-box'>
  
  <el-button @click="cropSuccess" class="btn" type="success" :loading="logining">确认</el-button>
  <el-button @click="cropStop" class="btn" type="info">返回</el-button>
</el-row>
	
	
 
	
	
	
  </div>
</template>
<script>
import vueCropper from "vue-cropper";
import { uploadImg } from "../../api/api";

export default {
	 props: {
    uploadUrl: {
      type: String
    },    
  },
  data() {
    return {
      crap: false,
      logining: false,

      fullscreenLoading :true,
      CropImg: {
     
        info: true,
        outputType: "jpeg",
        outputSize:0.9,
      }
    };
  },
  components: {
    vueCropper
  },
  methods: {
    rotateLeft () {
			this.$refs.cropper.rotateLeft()
		},
		rotateRight () {
			this.$refs.cropper.rotateRight()
		},
    startCrop () {
			// start
			this.crap = true
			this.$refs.cropper.startCrop()
		},
		stopCrop () {
			//  stop
			this.crap = false
			this.$refs.cropper.stopCrop()
		},
    changeScale (num) {
			num = num || 1
			this.$refs.cropper.changeScale(num)
		},
    cropStop(){
      this.$refs.cropper.stopCrop();
      this.$emit("onStopCrop");  
    },
    cropSuccess() {
      this.logining = true;
   
      this.$refs.cropper.getCropBlob(data => {
				let formData = new FormData();
				formData.append("img", data, name);
        uploadImg(formData).then(data => {
        this.logining = false;
                       
          this.$emit("onUploadSuccess", data.path);         
        }).catch(()=>{
          this.logining = false;
          this.$message({
              message: '上传失败',
              type: "error"
          });
        });
      });
    }
  }
};
</script>
<style scoped>
.vueCropper-mask{
    position: absolute;
    z-index: 10000;
    background-color: hsla(0,0%,100%,.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
        background-color: rgba(0, 0, 0, 0.8);
}
.vueCropper-mask .vueCropper {
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
}
.btn{
  width: 100px;
  height: 50px;
}
.btn1{
  margin-left: 10px;
}
.btn-box{
  width: 120px;
  position: absolute;
  left: 72%;
  top: 30%;
}
.btn-box .btn{
  margin-top: 20px;
}
.submit-box{
  width: 300px;
  position: absolute;
  left: 60%;
  top: 87%;
}

</style>
