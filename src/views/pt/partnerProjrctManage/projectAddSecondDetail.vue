<template>
  <div>
    <projRelaDetail
      :pageList="pageList"
      :pageParams="pageParams"
      @callback="sendMessage">
    </projRelaDetail>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import projRelaDetail from "@/views/pt/partnerProjrctManage/projRelaDetail.vue";
import MyMessage from "pte-ui/utils/MyMessage";
export default {
  components: {
    projRelaDetail
  },
  name: "projectAddSecondDetail",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        tranType: "",
        part_project_no: "",
        project_template_no: "",
        isLastTab: false,
        data_list_no: "",
        project_template_version: "",
        version: ""
      },
      pageList: [],
      tabName: "",
    }
  },
  created() {
    this.pageParams.part_project_no = this.cParentParams.part_project_no;
    this.pageParams.tranType = this.cParentParams.tranType;
    this.pageParams.version = this.cParentParams.version;
    this.pageParams.data_list_no = this.cParentParams.data_list_no;
    this.pageParams.project_template_no = this.cParentParams.project_template_no;
    this.pageParams.project_template_version = this.cParentParams.project_template_version;
    console.log("zhelidhgkd", this.pageParams);
    this.getTabs(this.cParentParams.data_list_no);
  },
  methods: {
    /**
     * 表单提交
     */
    getTabs(data_list_no) {
      let params = {
        servicecode: "pt0305",
        project_template_no: this.pageParams.project_template_no,
        project_template_version: this.pageParams.project_template_version
      };
      let that = this;
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.pageList = res.data.partslist;
          res.data.agrelist.forEach((item1, index1) => {
            //将协议加入步骤条
            this.pageList.push({
              parts_name: item1.mould_name,
              parts_no: item1.protocol_template_no,
              info_url: "@agreeBaseInfoAdd",
              add_url: "@agreeBaseInfoAdd",
              update_url: "@agreeBaseInfoAdd"
            })

          })
          if (data_list_no != '' && data_list_no != null && data_list_no != undefined) {
            //加入文件上传部件
            this.pageList.push({
              parts_name: that.$i18ns("附件上传"),
              parts_no: "999",
              info_url: "@projfileModify",
              add_url: "@projfileUpload",
              update_url: "@projfileModify"
            })
          }
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 获取下拉字典
     */
    getDict() {
      let request_map = {}
      request_map["dictType"] = "PD_E_APPLY_TYPE";
      request_map["dictKey"] = "PD_E_APPLY_TYPE";
      this.$http.invokeAPI("/SUMP/rest/dict", "post", request_map).then(response => {
        if (response.code === "200") {
          this.applyTypeList = response.data;
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
    },
    /**
     * 返回可售产品相关信息
     */
    sendMessage(pageParams) {
      this.pageParams.sale_prod_cd = pageParams.sale_prod_cd;
      this.pageParams.sale_prod_name = pageParams.sale_prod_name;
      this.pageParams.prod_version = pageParams.prod_version;
      this.pageParams.busi_seq = pageParams.busi_seq;
      this.pageParams.template_id = pageParams.template_id;
      this.pageParams.template_id = pageParams.template_id;
    }
  }
}
</script>


<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.text-edit {
  padding: 0;
  margin: 0;
  color: #697b8c;
  line-height: 36px;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}

.divider {
  border: 1px solid #DCDFE6;
  padding: 10px;
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
</style>
