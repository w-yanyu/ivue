<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">借款人投资生产企业情况</th>
        </tr>
        <tr>
          <!--          <th>房产<br>类别</th>-->
          <th>投资企业<br>名称</th>
          <th>注册<br>时间</th>
          <th>位置</th>
          <th>币种</th>
          <th>注册<br>资金</th>
          <th>股东<br>构成</th>
          <th>出资<br>份额</th>
          <th>股权<br>占比</th>
          <th>经营<br>范围</th>
          <th>主营<br>项目</th>
          <th>企业固定资产<br>投入情况</th>
          <th>固定资产投资<br>是否完成</th>
          <th>是否形成生产<br>条件</th>
          <th>企业雇工人员<br>数</th>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <!--          <td>{{ item.room_anal_no }}</td>-->
          <td>{{ item.invb_name }}</td>
          <td>{{ item.regist_time }}</td>
          <td>{{ item.position }}</td>
          <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
          <td>{{ number_format(item.reg_capital) }}</td>
          <td>{{ item.shar_form }}</td>
          <td>{{ number_format(item.cont_amt) }}</td>
          <td>{{ item.equi_ratio }}</td>
          <td>{{ item.business_area }}</td>
          <td>{{ item.main_project }}</td>
          <td>{{ item.busi_inve_fixa }}</td>
          <td>{{ getDictLabel('yesOrNOList', item.is_inve_fixa) }}</td>
          <td>{{ getDictLabel('yesOrNOList', item.is_form_proc) }}</td>
          <td>{{ item.busi_empl_number }}</td>
        </tr>
      </table>
      <el-row>
        &nbsp;
      </el-row>
      <table border="1" class="table_report">
        <tr>
          <!--          <th>房产<br>类别</th>-->
          <th>年生产<br>能力</th>
          <th>企业主<br>要产品<br>种类</th>
          <th>技术含<br>量或主<br>要用途</th>
          <th>成本价<br>格优劣<br>势</th>
          <th>上游供<br>应渠道</th>
          <th>下游供<br>应渠道</th>
          <th>主要合<br>作客户</th>
          <th>上下游<br>结算方<br>式</th>
          <th>采购、生产、销售、<br>结算共占用时<br>间的周期(月)</th>
          <th>企业管<br>理架构</th>
          <th>股东分<br>红情况</th>
          <th>股东合<br>作融洽<br>度</th>
          <th>经营管<br>理水平</th>
          <th>行业管或环<br>保部门的批复是<br>否已办>妥</th>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <!--          <td>{{ item.room_anal_no }}</td>-->
          <td>{{ item.year_prod_capa }}</td>
          <td>{{ item.busi_stap_type }}</td>
          <td>{{ item.tecc_or_maiu }}</td>
          <td>{{ item.cosp_adva_or_disa }}</td>
          <td>{{ item.upst_supc }}</td>
          <td>{{ item.down_supc }}</td>
          <td>{{ item.main_cooc }}</td>
          <td>{{ item.updo_seme }}</td>
          <td>{{ item.purc_prod_sale_sett_time}}</td>
          <td>{{ item.busi_mana }}</td>
          <td>{{ item.shar_divi }}</td>
          <td>{{ item.shac_hade }}</td>
          <td>{{ item.mana_level }}</td>
          <td>{{ getDictLabel('yesOrNOList', item.is_reply_done) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbBorrowerInveProeReport",
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

      tableDataList: [], // 表格数据

      ccyCodeList: [], //币种列表
      yesOrNOList: [], //是否列表
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getDictList("MS_CURRENCY", "ccyCodeList");
    this.getDictList("MS_E_YESORNO", "yesOrNOList");
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
        servicecode: "ar1852",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
            console.log("表格数据", that.tableDataList);
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
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
    number_format(number, decimals, dec_point, thousands_sep) {
      console.log("money:",number);
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function toFixedFix(n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.ceil(n * k) / k;
        };

      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      this.money = s.join(dec);
      console.log("===== 转换后===",s.join(dec));
      return s.join(dec);
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
  width: auto !important;
  text-align: center;
  background: #efefef;
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

td {
  width: auto;
  text-align: center;
}
</style>
