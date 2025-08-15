<template>
  <div>
    <div>
      <el-form 
        label-width="120px" 
        ref="ruleForm" 
        :model="ruleForm">
        <el-row>
        <el-col :span="20">
          <el-form-item 
            label="授权账号" 
            prop="userid" 
            :rules="{ required: true, message: '请输入授权账号', trigger: 'blur'}">
            <el-input 
              v-model="ruleForm.userid" 
              maxlength="12"
              style="width:200px">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="falgBlur">
        <el-col :span="20">
        <el-form-item 
          label="授权密码" 
          prop="passwd"  
          :rules="{ required: true, message: '请输入授权密码', trigger: 'blur'}">
          <pte-password
            v-model="ruleForm.passwd"
            name="passwd"
            type="password"
            encryptionType="SHA"
            :min="1"
            autocomplete="on"
            placeholder="请输入密码"
            style="width:200px">
          </pte-password>
        </el-form-item>
      </el-col>
    </el-row>
      </el-form>
    </div>
    <div class="container-center" v-if="falgBlur">
      <el-button type="primary" @click="submit" class="form-button">授权</el-button>
      <el-button @click="cancel" class="form-button">取消</el-button>
    </div>

    <div class="pop_container" v-show="isPopShow" >
        <div class="pop_container_content">
          <div class="header_content">{{ popTitle }}</div>
          <div class="message">
            <!-- <img :src="popImgSrc"/> -->
            <div class="message_content">{{ popMessagecontent }}</div>
          </div>
        </div>
      </div>

  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios"; 
//import {fingerInit} from "views/login/fingerprint.js"
export default {
  name: "empower",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      vendor:"",
      featureText:"",
  isPopShow:false,
  popTitle: "登陆提示", // 指纹弹窗标题
      popImgSrc: "", // 指纹弹窗提示图片
      popMessagecontent: "请输入指纹", // 指纹弹窗文本
  loginForm: {
     
      },
      loginType:"",
      ruleForm: {
        cur_user_id:JSON.parse(localStorage.user_info).userCode,
        vendor:"",
        userid: "",
        passwd: "",
        jsonParams: {},
        loading: false,
        brchno: "",
        corpno: "",
        verify_code: "",
        ui_language: "",
        login_type:"",
      },
      falgBlur: true
    }
  },
  created() {
    this.jsonParams = this.cParentParams.pageParams;
  },
  mounted() {
    this.ruleForm.userid = "";
    this.ruleForm.passwd = "";
  },
  watch: {
    "ruleForm.password": function () {
      if (this.ruleForm.password === "") {
        this.newPwdReadOnly = true;
        this.newPwdFocus(null);
      }
    },
    "ruleForm.userid": function (newvalue) {
    if (newvalue) {
      this.isPopShow=false
    }
  },
  },
  methods: {
    newPwdFocus(evt, isNew = true) {
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }
      setTimeout(() => {
        if (isNew) {
          this.newPwdReadOnly = false;
        } else {
          this.rePwdReadOnly = false;
        }
      }, 100);
    },
    newPwdBlur(evt, isNew = true) {
      if (evt) {
        evt.stopPropagation();
      }
      if (isNew) {
        this.newPwdReadOnly = true;
      } else {
        this.rePwdReadOnly = true;
      }
    },
    handBlur() {
      if (   this.ruleForm.userid != "") {
      //this.checkUserId();
      }
},
    /**
    * 表单提交
    */
    submit() {
      console.log("mm",this.ruleForm.passwd)
      if(this.ruleForm.passwd == "da39a3ee5e6b4b0d3255bfef95601890afd80709"){
        this.ruleForm.passwd = ""
      }
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
           MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", {
            servicecode:"ew3165" 
            })
            .then(res => {
              if (res && res.code === "200") {
               this.$dataBus.doCallBack(this, { state: 1 }); // state授权状态 1=成功
              } else {
                 console.log(res.message);
              }
            })
            .catch(err => {
              console.error(err);
            });

          // this.$http.core(
          //   (res) => {
          //       if (res.code === "200") {
          //         that.$dataBus.doCallBack(that, { state: 1 }); // state授权状态 1=成功
          //       } else {
          //         console.log(res.message);
          //       }
          //   },
          //   (err) => {
          //     console.log(err);
          //   },
          //   "/SUMP/rest/auth/login1",
          //   "post",
          //   {
          //     brchno: this.ruleForm.brchno,
          //     corpno: this.ruleForm.corpno,
          //     userid: this.ruleForm.userid,
          //     passwd:this.ruleForm.passwd,
          //     ui_language: "zh",  
          //   }
          // );
        }
      })  
    },
    /**
     * 取消授权
     */
    cancel() {
      this.$dialog.close();
    }
  }
}
</script>
<style lang="less" scoped>
.container-center{
  text-align: center;
  margin-top: 70px;
}
.pop_container {
  z-index: 11;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(8, 8, 8, 0.5);
  .pop_container_content {
    width: 400px;
    height: 150px;
    box-sizing: border-box;
    background-color: blue;
    border-radius: 6px;

    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .header_content {
      min-height: 30px;
      width: 100%;
      color: white;
      font-size: 24px;
    }
    .message {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
      .message_content {
        color: white;
        font-size: 24px;
        padding-left: 20px;
      }
    }
  }
}
</style>
