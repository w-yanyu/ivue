<template>
  <div class="content-box">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="auto"
      class="setting-form"
    >
      <!-- <el-row>
        <el-col :span="7">
          <el-form-item label="样式ID:" prop="template_id" class="upload-item">
            <el-input
              v-model="ruleForm.template_id"
              class="input-item"
              placeholder="两位字符"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row>
        <el-col :span="24">
          <el-form-item :label="$i18ns('login.styleName')" prop="module" class="upload-item">
            <el-input
              v-model="ruleForm.module"
              class="input-item"
              :placeholder="$i18ns('login.forExample')+' login_A'"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item class="upload-item" :label="$i18ns('login.screenshotUpload')" prop="card_img">
            <el-upload
              class="avatar-uploader"
              action
              :http-request="uploadFile"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="ruleForm.card_img"
                :src="ruleForm.card_img"
                class="avatar"
                fit="fit"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="7">
          <el-form-item label="">
            <el-button type="info" plain @click="closeDialog">{{
              $i18ns("关闭")
            }}</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="">
            <el-button type="primary" plain @click="submitModule">{{
              $i18ns("保存")
            }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {},
  data() {
    return {
      ruleForm: {
        // template_id: "", //模版id
        module: "", //引用名称
        card_img: "" //图片url
      },
      rules: {
        // template_id: [
        //   {
        //     required: true,
        //     message: "模版id",
        //     trigger: "blur"
        //   }
        // ],
        module: [
          {
            required: true,
            message: this.$i18ns("login.PleaseFillInTheStyleName"),
            trigger: "blur"
          }
        ],
        card_img: [
          {
            required: true,
            message: this.$i18ns("login.PleaseUploadPictures"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  created() {
    console.log("父类传过来的参数 cMeta", this.cMeta);
    console.log("父类传过来的参数 cParentParams", this.cParentParams);
    console.log("父类传过来的参数 cParentMeta", this.cParentMeta);
    console.log("父类传过来的参数 cParentScope", this.cParentScope);
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log("-------", file);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error(this.$i18ns('UploadProfilePicture'));
      }
      if (!isLt2M) {
        this.$message.error(this.$i18ns('UploadProfilePictureZize'));
      }
      return isJPG && isLt2M;
    },
    //上传图片接口，上传图片获得文件url
    uploadFile(item) {
      console.log("----item", item);
      //当前用户信息
      let userInfo = JSON.parse(localStorage.getItem("user_info"));
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("org_id", userInfo.org_id);
      MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData)
        .then(res => {
          if (res && res.code === "200") {
            console.log("上传回调----", res);
            this.ruleForm.card_img = res.data.path;
          } else {
            this.$message({
              type: "error",
              message: "上传失败！"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //上传保存登录模版
    submitModule() {
      let that = this;
      that.$refs.ruleForm.validate(valid => {
        if (valid) {
          let init_url = "/SUMP/call/RPCCall";
          let init_req = {
            servicecode: "ct2606",
            // template_id: that.ruleForm.template_id,
            card_img: that.ruleForm.card_img,
            module: that.ruleForm.module
          };
          that.$http.invokeAPI(init_url, "post", init_req).then(response => {
            if (response.code === "200") {
              console.log("请求 ct2606 回调----》", response.data);
              //将lookup结果带回前页面
              that.$dataBus.doCallBack(that, {});
              //关闭当前对话框
              that.$dialog.close();
            } else {
              that.$message({ message: response.message, type: "error" });
            }
          });
        }
      });
    },
    closeDialog(){
        this.$dialog.close(); 
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
.content-box{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 178px;
  display: block;
}
.input-item{
    width: 200px;
}
</style>
