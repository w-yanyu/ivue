<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">四、评级信息</th>
        </tr>
        <tr>
          <th colspan="10" class="table_desc"><b>外部评级:</b></th>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">评级机构</th>
          <th colspan="2" class="table_desc">评级等级</th>
          <th colspan="2" class="table_desc">评级日期</th>
          <th colspan="4" class="table_desc">评级详细说明</th>
        </tr>
        <template v-if="externalRatingList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="4"></td>
          </tr>
        </template>
        <template v-for="(item,index) in externalRatingList">
          <tr :key="index + 'step1'">
            <td colspan="2">{{item.grade_branch_no}}</td>
            <td colspan="2">{{item.grade_rank}}</td>
            <td colspan="2">{{item.grade_date}}</td>
            <td colspan="4">{{item.grade_remark}}</td>
          </tr>
        </template>
        <tr>
          <th colspan="10" class="table_desc"><b>监管评级:</b></th>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">监管认证机构</th>
          <th colspan="2" class="table_desc">监管评级结果</th>
          <th colspan="2" class="table_desc">评级日期</th>
          <th colspan="4" class="table_desc">评级详细说明</th>
        </tr>
        <template v-if="regulatoryRatingList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="4"></td>
          </tr>
        </template>
        <template v-for="(item,index) in regulatoryRatingList">
          <tr :key="index + 'step2'">
            <td colspan="2">{{item.supervis_approve_org}}</td>
            <td colspan="2">{{item.supervis_grade_result}}</td>
            <td colspan="2">{{item.input_date}}</td>
            <td colspan="4">{{item.supervis_grade_remark}}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "RatingInformationReport",
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

      externalRatingList: [], //外部评级结果
      regulatoryRatingList: [], //监管评级结果
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
    // this.due_item_no = "custDTA1";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000014301";
    this.getExternalRatingData();
    this.getRegulatoryRatingData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取外部评级结果
     */
    async getExternalRatingData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us1000",
        cust_no: that.cust_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.externalRatingList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取监管评级结果
     */
    async getRegulatoryRatingData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us1003",
        cust_no: that.cust_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.regulatoryRatingList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictLabel(listName, value) {
      let that = this;
      let tempValue = value;
      for (const item of that[listName]) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    async getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that[listKey] = res.data;
          }
        })
        .catch(err => {
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

.table_desc {
  text-align: left;
  padding-left: 10px;
  background: #f3f4f5;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

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

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
  height: 20px;
}

.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
