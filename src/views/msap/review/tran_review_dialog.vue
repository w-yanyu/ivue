<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="reviewDialog" :model="reviewDialog" :rules="rules" label-width="100px" class="custom-common--form" >
        <el-row align="right">
          <el-col :span="12">
            <el-form-item label="复核用户号" prop="review_user_id" label-width="100px">
              <el-input class="input_el" v-model="reviewDialog.review_user_id" type="text">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="review_user_passwd" label-width="100px">
              <el-input class="input_el" v-model="reviewDialog.review_user_passwd" type="text"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="menu-footer" align="right">
          <el-col :span="12" align="right">
            <el-button type="primary" size="small" @click="submit">提交</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
  const isEmpty = (str) => {
    if (str === '' || str === undefined || str === null) {
      return true
    }
    return false
  }
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {},
    data() {
      return {
        maxLength: 500,
        reviewDialog: {
          review_user_id: '',
          review_user_passwd: ""
        },
        rules: {
          review_user_id: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],
          review_user_passwd: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],

        },
      }
    },
    computed: {
      // 计算当前文本框中内容的字数
      valueLength() {
        let that = this;
        if (isEmpty(that.reviewDialog.description)) {
          return 0
        }
        return that.reviewDialog.description.length
      }
    },
    watch: {
      // 监听value的变化
      value: {
        handler(val, oldVal) {
          let that = this;
          that.reviewDialog.description = val
        },
        immediate: true
      }
    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
    },
    methods: {


      descriptionInput(event) {
        let that = this;
        console.log(event);
        let value = event;
        if (String(value).length > 32) {
          that.$message.error("字数超限，请重新输入");
        }
        that.reviewDialog.description = that.reviewDialog.description.substring(0, this.maxLength)
      },

      //提交
      submit() {
        let that = this;
        this.$refs.reviewDialog.validate(valid => {
          if (valid) {
            let request_map = that.cParentParams.reqData;
            request_map.review_flag = "1";
            request_map.review_user_id = that.reviewDialog.review_user_id;
            request_map.review_user_passwd = that.reviewDialog.review_user_passwd;
            let request_url = "/SUMP/icmcall/icmRPCCall";
            console.log("findl request",request_map);

            this.$http.invokeAPI(request_url, "POST", request_map).then((response) => {
              if (response.code === "200") {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                that.$dataBus.doCallBack(that, response);
                // this.$dataBus.doParentCallBack(this, "");
                // this.$dialog.close();
              } else {
                this.$message({
                  message: response.message,
                  type: "error"
                });
              }
            })
          } else {
            this.$message.warning("校验失败，请填写好表单");
          }
        })
      },
    },

  }
</script>
