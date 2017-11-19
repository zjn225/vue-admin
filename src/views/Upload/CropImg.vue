<template>
	
  <div  class='vueCropper-mask' > 
    <vueCropper
	ref="cropper"
	:img="uploadUrl"
	:outputSize="CropImg.outputSize"
	:outputType="CropImg.outputType"
	:info="CropImg.info"
	:canScale="CropImg.canScale"
	:autoCrop="CropImg.autoCrop"
	:autoCropWidth="CropImg.width"
	:autoCropHeight="CropImg.height"
	:fixed="CropImg.fixed"
  class='vueCropper'
></vueCropper>
	<el-button @click="cropSuccess" class="btn1" type="primary">裁剪</el-button>
	<el-button @click="cropStop" class="btn2" type="primary">返回</el-button>
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
      fullscreenLoading :true,
      CropImg: {
     
        info: true,
        outputType: "jpeg",
        canScale: true,
        autoCrop: true,
        outputSize:0.7
      }
    };
  },
  components: {
    vueCropper
  },
  methods: {
    cropStop(){
      this.$refs.cropper.stopCrop();
      this.$emit("onStopCrop");  
    },
    cropSuccess() {   
      this.$refs.cropper.getCropBlob(data => {
				let formData = new FormData();
				formData.append("img", data, name);
        uploadImg(formData).then(data => {             
          this.$emit("onUploadSuccess", data.path);         
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
.btn1{
  width: 120px;
  height: 50px;

  position: absolute;
  left: 57%;
  top: 85%;
}
.btn2{
  width: 120px;
  height: 50px;

  position: absolute;
  left: 64%;
  top: 85%;
}
</style>
