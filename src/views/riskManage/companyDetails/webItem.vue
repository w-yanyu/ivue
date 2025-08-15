<template>
   <div id="content-view">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="查询公司名称" prop="keyword" label-width="195px">
              <div class="lookupDiv">
                <el-input class="table_content_input" v-model="ruleForm.keyword" width="300px"></el-input>
                <el-button class="searchbtn" type="primary" size="small" @click="psotCompanyNum"
                  :disabled="ruleForm.keyword.length==0">查询</el-button>
              </div>
            </el-form-item>

          </div>
        </el-col>
      </el-row>
    </el-form>

    <iframe id="show-iframe" scrolling="auto" v-bind:src="framesrc">
    </iframe>
  </div>
</template>
<script>
  import MyMessage from 'pte-ui/utils/MyMessage'
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据
      pageType: {
        type: String,
        default: "basicInformation"
      }

    },
    data() {
      return {
        ruleForm: {
          keyword: "小米科技有限责任公司",
        },
        iframeState: true,
        // pageType: "basicInformation",
        token: ' ',
        companyNum: "",
        framesrc: ' ',
        rules: {
          keyword: [{
            required: true,
            message: "请输入公司名称",
            trigger: "blur",
          }]
        },
      }
    },

    mounted() {

    },
    methods: {
      psotCompanyNum() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/rest/qxb/fetchEnterpriseId";
        request_map["keyword"] = that.ruleForm.keyword;
        that.$http.invokeAPI(request_url, "get", request_map).then(response => {
          console.log("fetchEnterpriseId", response);
          if (response.code === "200") {
            const oIframe = document.getElementById('show-iframe');
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            console.log("deviceWidth" + this.pageType, deviceWidth);
            console.log("deviceHeight" + this.pageType, deviceHeight);
            oIframe.style.width = deviceWidth + 'px';
            oIframe.style.height = deviceHeight + 'px';
            that.companyNum = response.id;
            that.intPage();
          } else {
            MyMessage({
              message: "查不到对应的公司",
              type: 'error'
            });
          }
        });
      },


      intPage() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/rest/qxb/fetchtoken";
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("/SUMP/rest/qxb/fetchtoken", response);
          if (response.code === "200") {
            console.log(response);
            that.token = response.token;
            console.log(that.token);
            // that.token = `a07240110e7147fc9279605d63e63937`
            that.framesrc = that.chooseUrl(that.token);
            console.log("framesrc", that.framesrc);
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      chooseUrl(token) {
        let that = this;
        let url = '';
        switch (this.pageType) {
          //基本信息
          case "basicInformation":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/info?eid=${that.companyNum}`;
            break;
            //经营风险
          case "businessRisks":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/risk?eid=${that.companyNum}`;
            break;
            //司法风险
          case "legalRisk":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/lawsuit?eid=${that.companyNum}`;
            break;
            //知识产权
          case "intellectualProperty":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/ability?eid=${that.companyNum}`;
            break;
            //经营信息
          case "businessInformation":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/operation?eid=${that.companyNum}`;
            break;
            //新闻舆情
          case "newsOpinion":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/news?eid=${that.companyNum}`;
            break;
            //上市信息
          case "litigationRelationInquiry":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/publicly?eid=${that.companyNum}`;
            break;
            //新三板信息
          case "newThirdBoard":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/xsb?eid=${that.companyNum}`;
            break;
            //项目信息
          case "projectInformation":
            url =
              `https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token=${token}&returnUrl=/standalone-company/business?eid=${that.companyNum}`;
            break;
        }
        return url;
      },
    },
    created() {

    },
    setType() {
      let that = this;
      that.pageType = name
    },
  };
</script>
<style lang="less" scoped>
  .menu-form {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  #show-iframe {
    width: 100%;
    height: 100%;
  }

  .lookupDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .searchbtn {
    margin-left: 20px;
  }

 .table_content_input {
    width: 80%;
  }
  #content-view{
    width: 100%;
    height: 100%;
  }
</style>
