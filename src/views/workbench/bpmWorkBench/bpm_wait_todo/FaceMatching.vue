<template>
  <el-collapse v-model="activeNames" class="data-check--collapse">
    <el-collapse-item name="1">
      <template slot="title">
        <span>
          <em></em>人脸对比信息
        </span>
      </template>
        <el-form label-width="160px" class="custom-common--form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户姓名">
                <el-input v-model="faseMatchingInfo.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-input v-model="faseMatchingInfo.gender" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族">
                <el-input v-model="faseMatchingInfo.nation" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <el-input v-model="faseMatchingInfo.birthday" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="地址">
                <el-input v-model="faseMatchingInfo.address" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号">
                <el-input v-model="faseMatchingInfo.certNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签发机构">
                <el-input v-model="faseMatchingInfo.issuingAgency" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效开始日">
                <el-input v-model="faseMatchingInfo.startDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效截止日">
                <el-input v-model="faseMatchingInfo.endDate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <div class="face-match--title">身份证照片</div>
              <el-row class="face-match--pdf" v-show="imageInfo && imageInfo.fileTypeCode === '3'">
                <iframe :src="certImageUrl" frameborder="0"></iframe>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div class="face-match--title">申请人照片</div>
              <el-row class="face-match--pdf" v-show="imageInfo && imageInfo.fileTypeCode === '3'">
                <iframe :src="applicantImageUrl" frameborder="0"></iframe>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-form-item label="读取时间">
                <el-input v-model="faseMatchingInfo.readTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机比结果">
                <el-input v-model="faseMatchingInfo.faceResult" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机比分数">
                <el-input v-model="faseMatchingInfo.faceScore" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="机比时间">
                <el-input v-model="faseMatchingInfo.faceCheckTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="人工判定结果">
                <el-input v-model="faseMatchingInfo.manualFaceResult" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="人工判定时间">
                <el-input v-model="faseMatchingInfo.manualFaceCheckTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "FaceMatching",
  props: {
    applyNo: String, // 业务订单号
    applid:String,
  },
  data() {
    return {
      activeNames: ["1"],
      faseMatchingInfo: {
        name:"",
        gender:"",
        nation:"",
        birthday:"",
        address:"",
        certNo:"",
        issuingAgency:"",
        startDate:"",
        endDate:"",
        bucket:"",
        certBuctetKey:"",
        applicantBuctetKey:"",
        readTime:"",
        faceResult:"",
        faceScore:"",
        faceCheckTime:"",
        manualFaceResult:"",
        manualFaceCheckTime:"",
      },
      certImageUrl:"",
      applicantImageUrl:"",
    }
  },
  created() {
    this.getFaceData(); // 初始化学历学籍信息
  },
  methods: {
    /**
     * 获取文件base64地址
     * @param bucket 桶名
     * @param buctetKey 对象存储地址
     */
    getBase64Url(bucket, buctetKey, urlItem) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: buctetKey,
        bucket: bucket,
      };
      this.$http.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const suffix = buctetKey.split(".").splice(-1, 1)[0];
            switch (suffix) {
              case "jpg":
              case "jpeg":
                urlItem = "data:image/jpeg;base64," + res.data.filebase64Str;
                break;
              case "png":
                urlItem = "data:image/png;base64," + res.data.filebase64Str;
                break;
              case "pdf":
                urlItem = "data:application/pdf;base64," + res.data.filebase64Str;
                break;
              default:
                urlItem = "";
                break;
            }
          }
        })
    },
    /**
     * 获取认领信息
     */
    getFaceData() {
      let params = {
        servicecode: "faceCheckResultQuery",
        applyNo: this.applyNo,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.faseMatchingInfo = res.data;
            if(this.faseMatchingInfo.bucket){
              if(this.faseMatchingInfo.certBuctetKey){
                this.getBase64Url(this.faseMatchingInfo.bucket,this.faseMatchingInfo.certBuctetKey,this.certImageUrl);
              }
              if(this.faseMatchingInfo.applicantBuctetKey){
                this.getBase64Url(this.faseMatchingInfo.bucket,this.faseMatchingInfo.applicantBuctetKey,this.applicantImageUrl);
              }
            }
            
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
  }
}
</script>
<style lang="less" scoped>
  .face-match--title {
    width: calc(100% - 118px);
    float: left;
    line-height: 50px;
    text-indent: 10px;
  }
  .face-match--pdf {
    height: calc(100% - 60px);
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>