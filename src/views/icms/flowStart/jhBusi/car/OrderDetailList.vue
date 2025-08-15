<template>
  <div>
    <div class="table_toolbar">
      <el-button @click="addOrderInfo" type="primary">{{$i18ns('新增')}}</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="supplier_no"
        label="供应商编号"
        align="center"
        v-if="false"
      ></el-table-column>
      <el-table-column
        prop="supplier_name"
        :label="供应商名称"
      >
      </el-table-column>
      <el-table-column
        prop="brand_no"
        label="品牌编号"
        align="center"
        v-if="false"
      >
      </el-table-column>
      <el-table-column
        prop="brand_name"
        :label="品牌名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="car_kind_no"
        label="车系编号"
        align="center"
        v-if="false"
      >
      </el-table-column>
      <el-table-column
        prop="car_kind_name"
        :label="车系名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="car_model_no"
        label="车型编号"
        align="center"
        v-if="false"
      >
      </el-table-column>
      <el-table-column
        prop="car_model_name"
        :label="车型名称"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        :label="厂商指导价"
        align="center"
        :formatter="tableFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="sizetype"
        :label="车身结构"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="displacement2"
        :label="排量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="geartype"
        :label="变速箱类型"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="color"
        :label="车身颜色"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="purch_volume"
        :label="采购数量"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="purch_amount"
        :label="采购单价"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ handleDecimalInput(scope.row.purch_amount) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="purch_total_amount"
        :label="采购总价"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ handleDecimalInput(scope.row.purch_total_amount) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        :label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="modifyOrderInfo(scope.$index,scope.row)" size="small">{{$i18ns('维护')}}</el-button>
          <el-button type="text" @click.native.prevent="delOrderInfo(scope.$index, tableData)" size="small">{{$i18ns('删除')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form ref="orderTotalForm" name="orderTotalForm" :rules="rules" :model="orderTotalForm" label-width="200px"
             class="custom-common--form">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="总采购车数量" prop="purch_total_volume">
            <el-input type="text" v-model="orderTotalForm.purch_total_volume" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="车辆采购总价" prop="purch_total_amount">
            <el-input type="text" v-model="orderTotalForm.purch_total_amount" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="融资还款方式" prop="repay_type">
            <el-select v-model="orderTotalForm.repay_type">
              <el-option
                v-for="item in repayTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="融资起始日期" prop="start_date">
            <el-input type="text" v-model="orderTotalForm.start_date" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="融资期限" prop="term">
            <!--            <el-input type="text" v-model="orderTotalForm.term">-->
            <!--            </el-input>-->
            <el-select v-model="orderTotalForm.term">
              <el-option
                v-for="item in repayTermList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :title="新增订单信息" :visible.sync="orderAddVisible" v-if="orderAddVisible" width="70%"
               :before-close="handleClose"
               top="20vh"
               v-dialogDrag
               :append-to-body="true">
      <OrderDetailAdd
        @addCarModelCallBack="addCarModelCallBack"
        :cParentParams="params"
      ></OrderDetailAdd>
    </el-dialog>
    <el-dialog :title="维护订单信息" :visible.sync="orderModifyVisible" v-if="orderModifyVisible" width="70%"
               :before-close="handleClose"
               top="20vh"
               :cParentParams="params"
               v-dialogDrag
               :append-to-body="true">
      <OrderDetailModify
        @modifyCarModelCallBack="modifyCarModelCallBack"
        :cParentParams="tempRowData"></OrderDetailModify>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import OrderDetailAdd from "@/views/icms/flowStart/jhBusi/car/OrderDetailAdd.vue"; //交行poc经销商购车订单明细列表
import OrderDetailModify from "@/views/icms/flowStart/jhBusi/car/OrderDetailModify.vue"
import MyMessage from "pte-ui/utils/MyMessage";
import userUtil from "pte-ui/utils/userUtil";
//交行poc经销商购车订单明细列表

export default {
  name: "OrderDetailList",
  components: {
    OrderDetailAdd,
    OrderDetailModify
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
        供应商名称:this.$i18ns("供应商名称"),
        品牌名称:this.$i18ns("品牌名称"),
        车系名称:this.$i18ns("车系名称"),
        车型名称:this.$i18ns("车型名称"),
        厂商指导价:this.$i18ns("厂商指导价"),
        车身结构:this.$i18ns("车身结构"),
        排量:this.$i18ns("排量"),
        变速箱类型:this.$i18ns("变速箱类型"),
        车身颜色:this.$i18ns("车身颜色"),
        采购数量:this.$i18ns("采购数量"),
        采购单价:this.$i18ns("采购单价"),
        采购总价:this.$i18ns("采购总价"),
        操作:this.$i18ns("操作"),
        总采购车数量:this.$i18ns("总采购车数量"),
        车辆采购总价:this.$i18ns("车辆采购总价"),
        融资还款方式:this.$i18ns("融资还款方式"),
        融资起始日期:this.$i18ns("融资起始日期"),
        融资期限:this.$i18ns("融资期限"),
        新增订单信息:this.$i18ns("新增订单信息"),
        维护订单信息:this.$i18ns("维护订单信息"),
      params: {sale_prod_cd: ""},
      orderTotalForm: {
        purch_total_volume: "",//采购总数
        purch_total_amount: "",//采购总价
        repay_type: "",//还款方式
        term: "",// 期限
        start_date: this.getDate(),// 融资起始日期
        cust_no: "",//客户号
      },
      tableData: [],//表格数据
      orderModifyVisible: false,
      orderAddVisible: false,
      tempRowData: {},
      repayTypeList: [],//还款方式列表
      repayTermList: [],//还款期限列表
      rules: {
        purch_total_volume: [
          {required: true, message: this.$i18ns("采购总数"), trigger: 'blur'}
        ],
        purch_total_amount: [
          {required: true, message: this.$i18ns("采购总价"), trigger: 'blur'}
        ],
        repay_type: [
          {required: true, message: this.$i18ns("融资还款方式"), trigger: 'blur'}
        ],
        term: [
          {required: true, message: this.$i18ns("融资期限"), trigger: 'blur'}
        ],
        start_date: [
          {required: true, message: this.$i18ns("融资起始日期"), trigger: 'blur'}
        ]
      },
    };
  },
  watch: {
    'tableData': {
      handler(val, oldval) {
        let that = this;
        let total_amt = 0;
        let total_volume = 0;
        this.tableData.forEach(item => {
          total_amt = Math.ceil(parseFloat(total_amt) * 100 + parseFloat(item.purch_total_amount.replaceAll(",", "")) * 100) / 100;
          total_volume = parseInt(total_volume) + parseInt(item.purch_volume);
          item.displacementml = item.displacement2;
        })
        that.orderTotalForm.purch_total_amount = that.handleDecimalInput(total_amt);
        that.orderTotalForm.purch_total_volume = total_volume;
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.params.sale_prod_cd = this.cParentParams.sale_prod_cd;
    this.getDictList("MS_E_REPAY_WAY", "repayTypeList");
    this.getDictList("PD_E_PERIODS", "repayTermList");
    this.initRepayTypeList();
  },
  methods: {
    getRequest(url) {
      let obj = {};
      obj.url = url;
      return obj;
    },
    /**
     * 订单信息填充后回调
     * @param data
     */
    returnData() {
      let obj = {};
      obj.purch_total_volume = this.orderTotalForm.purch_total_volume;
      obj.purch_total_amount = this.orderTotalForm.purch_total_amount;
      obj.repay_type = this.orderTotalForm.repay_type;
      obj.term = this.orderTotalForm.term;
      obj.start_date = this.orderTotalForm.start_date;
      obj.cust_no = this.orderTotalForm.cust_no;
      obj.orderDetailList = this.tableData;
      // 去除订单列表中额千分位
      obj.orderDetailList.forEach(item =>{
        item.purch_amount = item.purch_amount.replaceAll(",", "");
        item.purch_total_amount = item.purch_total_amount.replaceAll(",", "");
      })
      if(obj.purch_total_amount!=''&&obj.purch_total_amount!=null&&obj.purch_total_amount!=undefined){
        obj.purch_total_amount = obj.purch_total_amount.replaceAll(",", "");
      }

      this.$emit("orderInfoCallBack", obj);
    },
    addOrderInfo() {
      this.orderAddVisible = true;
    },
    modifyOrderInfo(index, data) {
      data.index = index;
      this.tempRowData = data;
      this.orderModifyVisible = true;
    },
    addCarModelCallBack(data) {
      this.tableData.push(data);
      this.orderAddVisible = false;
      this.returnData();
    },
    modifyCarModelCallBack(data) {
      this.tableData.splice(data.index, 1, data);
      this.orderModifyVisible = false;
      this.returnData();
      this.tempRowData = {};
    },
    delOrderInfo(index, data) {
      console.log("数据", data);
      console.log("索引", index);
      this.tableData.splice(index, 1);
      this.returnData();
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    async getDictList(dictType, listKey) {
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
    /**
     * 获取当前产品对应还款方式列表
     */
    initRepayTypeList() {
      let that = this;
      let request_map = {
        sale_prod_cd: this.params.sale_prod_cd,
        servicecode: "pd0223",
      };
      if (request_map.sale_prod_cd === "") {
        return;
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log("还款方式列表", response.data.info.repay_type_list);
            let tempRepayTypeList = [];
            response.data.info.repay_type_list.forEach(item1 => {
              that.repayTypeList.forEach(item2 => {
                if (item2.dictId == item1) {
                  let obj = item2;
                  tempRepayTypeList.push(obj);
                }
              })
            })
            that.repayTypeList = tempRepayTypeList;

            let tempRepayTermList = [];
            response.data.info.support_installment.forEach(item1 => {
              that.repayTermList.forEach(item2 => {
                if (item2.dictId == item1) {
                  let obj = item2;
                  tempRepayTermList.push(obj);
                }
              })
            })
            that.repayTermList = tempRepayTermList;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    getDate() {
      const userInfo = userUtil.get();
      console.log("用户信息", userInfo);
      return userInfo.format_date;
    },
    justify() {
      let that = this;
      let flag = true;
      this.$refs.orderTotalForm.validate((valid) => {
        console.log("子页面表单",that.orderTotalForm);
        console.log("valid",valid);
        flag = valid;
      })
      return flag;
    },
    //表单金额格式化
    handleDecimalInput(data){
      console.log("表单数据",data)
      return this.number_format(data, 2);
      console.log("改变后的金额",this.orderTotalForm.purch_total_amount);
    },
    //表格金额格式化
    tableFormatter(row,column, cellData, index){
      console.log("row",row);
      console.log("column",column);
      console.log("cellData",cellData);
      console.log("index",index);
      return this.number_format(cellData, 2)
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
    },
  }
};
</script>
<style>
.table_toolbar {
  margin: 0px 12px 8px 12px;
}
</style>
