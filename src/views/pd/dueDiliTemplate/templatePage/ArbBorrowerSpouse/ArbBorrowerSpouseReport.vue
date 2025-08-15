<template>
  <div class="table_container">
    <div class="table_center">
      <tr>
        <th colspan="10" class="table_header">2、借款人配偶基本情况</th>
      </tr>
      <table border="1" class="table_report">
        <tr>
          <th rowspan="2">个人信息</th>
          <td>借款人配偶姓名</td>
          <td colspan="2">{{ page.borrower_name }}</td>
          <td>年龄</td>
          <td colspan="2">{{ page.age }}</td>
          <td>家庭住址</td>
          <td colspan="2">{{ page.home_address }}</td>
        </tr>
        <tr>
          <td>工作单位</td>
          <td colspan="6">{{ page.job_corp }}</td>
          <td>职务</td>
          <td colspan="2">{{ page.job }}</td>
        </tr>
        <tr>
          <td colspan="2">有无社会不良行为</td>
          <td colspan="3">
            <input type="checkbox" disabled name="is_social_bad_behavior" v-model="page.is_social_bad_behavior"
                   value="1">有
            <input type="checkbox" disabled name="is_social_bad_behavior" v-model="page.is_social_bad_behavior"
                   value="0">无
          </td>
          <td colspan="2">有无对外经济纠纷</td>
          <td colspan="3">
            <input type="checkbox" disabled name="is_fore_ecod" v-model="page.is_fore_ecod"
                   value="1">有
            <input type="checkbox" disabled name="is_fore_ecod" v-model="page.is_fore_ecod"
                   value="0">无
          </td>
        </tr>
        <tr>
          <td class="td_desc_left">从业经历</td>
          <td colspan="9" class="td_desc_right">
            <ol>
              <li>
                {{ page.work_experience }}
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="td_desc_left">品行描述</td>
          <td colspan="9" class="td_desc_right">
            <ol>
              <li>
                {{ page.cond_desc }}
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="td_desc_left">声誉描述</td>
          <td colspan="9" class="td_desc_right">
            <ol>
              <li>
                {{ page.fame_desc }}
              </li>
            </ol>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbBorrowerSpouseReport",
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

      page: {
        borrower_name: "", //借款人姓名
        age: "", //年龄
        home_address: "", // 家庭住址
        job_corp: "", // 工作单位
        job: "", // 职务
        work_experience: "", // 从业经历
        cond_desc: "", // 品行描述
        fame_desc: "", // 声誉描述
        is_social_bad_behavior: [], // 有无社会不良行为
        is_fore_ecod: [] // 有无对外经济纠纷
      }
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getCustData();
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
     * 获取当前客户数据
     */
    getCustData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1724",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            console.log("page", that.page)
            that.checkboxDataTransform(res.data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 转换复选框中的数据
     * @param data
     */
    checkboxDataTransform(data) {
      this.page.is_social_bad_behavior = data.is_social_bad_behavior.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_fore_ecod = data.is_fore_ecod.replaceAll(" ", "").split(",").filter((item) => item !== '');
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
}

.th_desc {
  min-height: 100px !important;
}

.td_desc_left {
  height: 100px !important;
}
.td_desc_right {
  text-align: left;
  height: 100px !important;
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
</style>
