<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">基本信息</th>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">客户名称</td>
          <td colspan="8">{{ page.cust_name }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">客户编号</td>
          <td colspan="3">{{ page.cust_no }}</td>
          <td colspan="2" class="table_desc">集团性质</td>
          <td colspan="3">
            <el-checkbox label="虚拟" name="is_virtual" :value="is_virtual1" disabled></el-checkbox>
            <el-checkbox label="实体" name="is_virtual" :value="is_virtual2" disabled></el-checkbox>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">证件类型</td>
          <td colspan="3">{{ getDictLabel('certTypeDictList', page.cert_type) }}</td>
          <td colspan="2" class="table_desc">证件编号</td>
          <td colspan="3">{{ page.cert_no }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">注册地址</td>
          <td colspan="8">{{ page.issuing_addr }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">备注</td>
          <td colspan="8">{{ page.remark }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "baseInfoReport",
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
        cust_name: "", //客户名称
        cust_no: "", //客户编号
        is_virtual: "", //是否虚拟
        cert_type: "", // 证件类型
        cert_no: "", // 证件编号
        issuing_addr: "", // 注册地址
        remark: "" // 期限(月)
      },
      is_virtual1: "",
      is_virtual2: "",
      certTypeDictList: [], //证件类型字典列表
    }
  },
  watch: {
    "page.is_virtual": {
      handler(value) {
        if (value === 0) {
          this.getEntCustData();
        }
        this.transIsVirtual(value);
      },
      immediate: true
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {


  },
  mounted() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    // this.due_item_no = "custDTA1";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000013665";
    //初始化数据字典
    this.getDictList("MS_E_CRET_TYPE", "certTypeDictList");
    this.getGroupCustData();
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
     * 获取集团客户数据
     */
    getGroupCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0606",
        cust_no: that.cust_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page.cust_name = res.data.cust_name;//客户名称
            that.page.cust_no = res.data.cust_no; //客户编号
            that.page.is_virtual = res.data.is_virtual; //是否虚拟
            that.page.remark = res.data.remark; // 期限(月)
            this.getEntCustData();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取对公客户数据
     */
    getEntCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0215",
        cust_no: that.cust_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page.issuing_addr = res.data.issuing_addr; // 注册地址
            that.page.cert_type = res.data.cert_type; // 证件类型
            that.page.cert_no = res.data.cert_no; // 证件编号
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
    },
    transIsVirtual(param) {
      if (param === "0") {
        this.is_virtual1 = false;
        this.is_virtual2 = true;
      } else if (param === "1") {
        this.is_virtual1 = true;
        this.is_virtual2 = false;
      } else {
        this.is_virtual1 = false;
        this.is_virtual2 = false;
      }
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
  table-layout: fixed;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
  height: auto ;
  height: 20px;
  min-height: 20px !important;
}

.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
