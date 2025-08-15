<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_report">
        <el-col :span="24" class="table_header" style="">{{$i18ns('经营历史及资本积累（时间轴）')}}
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col style="border:1px solid #5e6d82; border-radius: 0;padding: 10px;min-height: 300px">
          <div style="height: auto; width: 100%;" >
            <el-timeline>
              <el-timeline-item v-for="(item, i) in tableList"
                                :key="i"
                                :timestamp="item.year"
                                placement="top"
                                style="text-align: left">
                <el-card>
                  <h4>{{ item.busi_name }}</h4>
                  <p>{{$i18ns('资本积累')}}：<span style="color: #0a4db2">{{ item.capi_accu | formatMoney }}</span></p>
                  <p>{{ item.doc_desc }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbOpehAndCapaManageReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号

      tableList: []
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    //初始化表格
    this.initTableList();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams(){
      if (this.apply_no === null || this.apply_no === ""){
        return false;
      }
      if (this.cust_no === null || this.cust_no === ""){
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === ""){
        return false;
      }
      return true;
    },
    /**
     * 查询列表
     */
    initTableList() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let reqMap = {
        servicecode: "ar1848",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.tableList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }
}
</script>


<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   border-collapse: collapse;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}
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

.addButton {
  margin: 10px 0 5px 13px;
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

.box {
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  border: 0px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

img {
  width: 100%;
  height: 100%;
}

h4 {
  color: black;
}

p {
  color: black;
}
</style>
