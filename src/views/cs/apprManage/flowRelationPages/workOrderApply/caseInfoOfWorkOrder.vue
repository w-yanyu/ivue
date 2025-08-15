<template>
  <div>
    <to-json
      :toUrl="url"
      :params="this.pageParams"
      v-if="isLoad"
    ></to-json>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import { List } from 'gojs';

export default {
  name: "caseInfoOfWorkOrder",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      url:"/views/cs/assistManage/caseDetail/base_info.json",
      pageParams:{

      },
      isLoad: false
    };
  },
  created() {
    this.initParentParams();
    this.getWorkOrderApplyInfo();
  },
  methods: {
    /**
     * 获取产品中申请类型
     */
    async getWorkOrderApplyInfo() {
      let that = this;
      let params = {
        apply_no: this.cParentParams.appl_id,
        servicecode: "cb2100"
      };
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.pageParams.case_id = res.data.case_id;
            that.pageParams.case_no = res.data.case_no;
            that.pageParams.oa_org_id = res.data.oa_org_id;
            that.pageParams.org_id = res.data.org_id;
            that.isLoad = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 头部初始化
     */
    initParentParams() {
      this.pageParams.appl_id = this.cParentParams.appl_id;
      this.pageParams.cust_name = this.cParentParams.cust_name;
      this.pageParams.cust_id = this.cParentParams.cust_id;
      this.pageParams.appl_state = this.cParentParams.appl_state;
      this.pageParams.appl_date = this.cParentParams.appl_date;
      this.pageParams.brch_cd = this.cParentParams.brch_cd;
      this.pageParams.wf_inst_id = this.cParentParams.wf_inst_id;
      this.pageParams.task_inst_id = this.cParentParams.task_inst_id;
    }
  },
};
</script>
<style lang="less" scoped>
.container_wrap{
  height: 100%;
}
.todo-top {
  border-bottom: 1px solid #e3e8f5;
  height: 100%;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
.collapse-item {
  border: 0.996px;
  padding: 10px 10px 0 10px;
}
.collapse-item-bottom {
  height: 100%;
}
</style>
