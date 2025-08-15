<template>
  <div>
    <el-form ref="orderForm" :rules="rules" :model="orderForm" label-width="200px" class="custom-common--form">
      <el-row>
        <el-col :span="8" v-if="false">
          <el-form-item class="require-asterisk" :label="供应商编号" prop="supplier_no">
            <el-input type="text" v-model="orderForm.supplier_no">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="false">
          <el-form-item class="require-asterisk" :label="车型编号" prop="car_model_no">
            <el-input type="text" v-model="orderForm.car_model_no">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="false">
          <el-form-item class="require-asterisk" :label="品牌编号" prop="brand_no">
            <el-input type="text" v-model="orderForm.brand_no" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="false">
          <el-form-item class="require-asterisk" :label="车系编号" prop="car_kind_no">
            <el-input type="text" v-model="orderForm.car_kind_no" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="供应商名称" prop="supplier_name">
            <el-input type="text" v-model="orderForm.supplier_name" readonly="readonly">
              <el-button slot="append" icon="el-icon-search" @click="qryPartnerList"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="受托支付账号" prop="payee_acct_no">
            <el-input type="text" v-model="orderForm.payee_acct_no" readonly="readonly">
              <el-button slot="append" icon="el-icon-search" @click="qryAcctlList"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="车型名称" prop="car_model_name">
            <el-input type="text" v-model="orderForm.car_model_name" readonly="readonly">
              <el-button slot="append" icon="el-icon-search" @click="qryCarModelList"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="厂商指导价" prop="price">
            <el-input type="text" v-model="orderForm.price" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="品牌名称" prop="brand_name">
            <el-input type="text" v-model="orderForm.brand_name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="车系名称" prop="car_kind_name">
            <el-input type="text" v-model="orderForm.car_kind_name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="车身结构" prop="sizetype">
            <el-input type="text" v-model="orderForm.sizetype" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="排量" prop="displacement2">
            <el-input type="text" v-model="orderForm.displacement2" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="变速箱类型" prop="geartype">
            <el-input type="text" v-model="orderForm.geartype" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="车身颜色" prop="color">
            <el-input type="text" v-model="orderForm.color">
              <el-button slot="append" icon="el-icon-search" @click="qryColorList"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="采购数量" prop="purch_volume">
            <el-input type="text" v-model="orderForm.purch_volume"
            @input="handleVolumeChange"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="采购单价" prop="purch_amount">
            <el-input type="text" v-model="orderForm.purch_amount"
                      @blur="handleDecimalForPurchAmount"
                      @focus="delDecimalFormat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="require-asterisk" :label="采购总价" prop="purch_total_amount">
            <el-input type="text" v-model="orderForm.purch_total_amount" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center">
          <el-button type="primary" @click="submit">>{{$i18ns('保存')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :title="$i18ns('查询供应商')" :visible.sync="partnerVisible" v-if="partnerVisible" width="70%"
               :before-close="handleClose"
               top="30vh"
               v-dialogDrag
               :append-to-body="true">
      <to-json
        :toUrl="partnerQryUrl"
        :params="this.params"
        @jsonCallBack="partnerCallback"
      ></to-json>
    </el-dialog>
    <el-dialog :title="查询车型信息" :visible.sync="carModelVisible" v-if="carModelVisible" width="70%"
               :before-close="handleClose"
               top="30vh"
               v-dialogDrag
               :append-to-body="true">
      <to-json
        :toUrl="carModelQryUrl"
        :params="this.params"
        @jsonCallBack="carModelCallback"
      ></to-json>
    </el-dialog>
    <el-dialog :title="颜色选择器" :visible.sync="colorSelectorVisible" v-if="colorSelectorVisible" width="20%"
               :before-close="handleClose"
               top="30vh"
               v-dialogDrag
               :append-to-body="true">
      <ColorSelector
        @colorCallback="colorCallback"
        :cParentParams="orderForm">

      </ColorSelector>
    </el-dialog>
    <el-dialog :title="选择受托支付账号" :visible.sync="acctVisible" v-if="acctVisible" width="70%"
               :before-close="handleClose"
               top="30vh"
               v-dialogDrag
               :append-to-body="true">
      <to-json
        :toUrl="acctQryUrl"
        :params="this.params"
        @jsonCallBack="acctCallback"
      ></to-json>
    </el-dialog>
  </div>
</template>

<script>
import ColorSelector from "@/views/icms/flowStart/jhBusi/car/ColorSelector.vue"
import MyMessage from "pte-ui/utils/MyMessage";
//交行poc经销商购车车型颜色选择器

export default {
  name: "OrderDetailAdd",
  components: {
    ColorSelector
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  watch: {
    // 'orderForm.purch_volume': {
    //   handler(val, oldval) {
    //     let that = this;
    //     let purch_amount = that.orderForm.purch_amount.replaceAll(",", "");
    //     let purch_volume = that.orderForm.purch_volume;
    //     that.orderForm.purch_total_amount = that.handleDecimal(Math.ceil(parseFloat(purch_amount * 100 * purch_volume)) / 100);
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // 'orderForm.purch_amount': {
    //   handler(val, oldval) {
    //     let that = this;
    //     let purch_amount = that.orderForm.purch_amount.replaceAll(",", "");
    //     let purch_volume = that.orderForm.purch_volume;
    //     // that.orderForm.purch_volume = this.handleDecimal(that.orderForm.purch_volume);
    //     that.orderForm.purch_total_amount = that.handleDecimal(Math.ceil(parseFloat(purch_amount * 100 * purch_volume)) / 100);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  data() {
    var validateDecimal = (rule, value, callback) => {
      let reg = /^[-+]?\d{1,3}(,\d{3})*(\.(\d*))?$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确金额'));
      } else {
        callback();
      }
    };
    var validateNumber = (rule, value, callback) => {
      let reg = /^\d+$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确数量'));
      } else {
        callback();
      }
    };
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
          受托支付账号:this.$i18ns("受托支付账号"),
          颜色选择器:this.$i18ns("颜色选择器"),
          选择受托支付账号:this.$i18ns("选择受托支付账号"),
          查询车型信息:this.$i18ns("查询车型信息"),
params: {
        part_no: "",
        sale_prod_cd: ""
      },
      orderModifyVisible: false,
      partnerVisible: false,
      carModelVisible: false,
      colorSelectorVisible: false,
      acctVisible: false,
      orderForm: {
        supplier_no: "",//供应商编号
        supplier_name: "",//供应商名称
        payee_acct_no: "",//受托支付账号
        brand_no: "",//品牌编号
        brand_name: "",//品牌名称
        car_kind_no: "",//车系编号
        car_kind_name: "",//车系名称
        car_model_no: "",//车型编号
        car_model_name: "",//车型名称
        price: "",//厂商指导价
        sizetype: "",//车身结构
        displacementml: "",//排量(mL)
        displacement2: "",//排量(mL)
        geartype: "",//变速箱类型
        color: "",//车身颜色
        colorTemp: "",//车身颜色
        purch_volume: "",//采购数量
        purch_amount: "",//采购单价
        purch_total_amount: ""//采购总价
      },

      partnerQryUrl: "/views/icms/flowStart/jhBusi/car/ptPartner_list_lookup.json",
      carModelQryUrl: "/views/icms/flowStart/jhBusi/car/car_tree_manage.json",
      acctQryUrl: "/views/icms/flowStart/jhBusi/car/partnerAcct_detail_lookup.json",
      rules: {
        supplier_no: [
          {required: true, message: this.$i18ns("供应商编号"), trigger: 'blur'}
        ],
        supplier_name: [
          {required: true, message: this.$i18ns("供应商名称"), trigger: 'blur'}
        ],
        payee_acct_no: [
          {required: true, message: this.$i18ns("受托支付账号"), trigger: 'blur'}
        ],
        brand_no: [
          {required: true, message: this.$i18ns("品牌编号"), trigger: 'blur'}
        ],
        brand_name: [
          {required: true, message: this.$i18ns("品牌名称"), trigger: 'blur'}
        ],
        car_kind_no: [
          {required: true, message: this.$i18ns("车系编号"), trigger: 'blur'}
        ],
        car_kind_name: [
          {required: true, message: this.$i18ns("车系名称"), trigger: 'blur'}
        ],
        car_model_no: [
          {required: true, message: this.$i18ns("车型编号"), trigger: 'blur'}
        ],
        car_model_name: [
          {required: true, message: this.$i18ns("车型名称"), trigger: 'blur'}
        ],
        price: [
          {required: true, message: this.$i18ns("厂商指导价"), trigger: 'blur'}
        ],
        sizetype: [
          {required: true, message: this.$i18ns("车身结构"), trigger: 'blur'}
        ],
        // displacement2: [
        //   {required: true, message: '排量', trigger: 'blur'}
        // ],
        geartype: [
          {required: true, message: this.$i18ns("变速箱类型"), trigger: 'blur'}
        ],
        color: [
          {required: true, message: this.$i18ns("车身颜色"), trigger: 'blur'}
        ],
        purch_volume: [
          {required: true, message: this.$i18ns("采购数量"), trigger: 'blur'},
          {validator: validateNumber, message: this.$i18ns("请输入正确数量"), trigger: 'blur'}
        ],
        purch_amount: [
          {required: false, message: this.$i18ns("采购单价"), trigger: 'blur'},
          {validator: validateDecimal, message: this.$i18ns("请输入正确金额"), trigger: 'blur'}
        ],
        purch_total_amount: [
          {required: false, message: this.$i18ns("采购总价"), trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.$dataBus.bindCallBackMethod(this, this.acctCallback, {});
    this.params.sale_prod_cd = this.cParentParams.sale_prod_cd;
  },
  provide() {
    return {
      carModelCallback: this.carModelCallback,
    };
  },
  methods: {
    getRequest(url) {
      let obj = {};
      obj.url = url;
      return obj;
    },
    qryPartnerList() {
      this.partnerVisible = true;
    },
    qryCarModelList() {
      this.carModelVisible = true;
    },
    qryColorList() {
      console.log("选择颜色前", this.orderForm);
      if (this.orderForm.car_model_no === "") {
        MyMessage({
          message: "请先选择车型信息",
          type: 'error'
        });
        return;
      }
      if (this.orderForm.colorTemp === "" || this.orderForm.colorTemp === undefined) {
        MyMessage({
          message: "该车型无颜色可选",
          type: 'error'
        });
        return;
      }
      this.colorSelectorVisible = true;
    },
    qryAcctlList() {
      this.params.part_no = this.orderForm.supplier_no;
      if (this.params.part_no === "") {
        MyMessage({
          message: "请先选择供应商信息",
          type: 'error'
        });
        return;
      }
      this.acctVisible = true;
    },
    partnerCallback(data) {
      console.log("查询伙伴回调数据", data)
      this.orderForm.supplier_no = data.part_no;
      this.orderForm.supplier_name = data.center_name;
      this.partnerVisible = false;
    },
    carModelCallback(data) {
      console.log("此车型回调", data);
      this.orderForm.brand_no = data.brand_no;//品牌编号
      this.orderForm.brand_name = data.brand_name;//品牌名称
      this.orderForm.car_kind_no = data.car_kind_no;//车系编号
      this.orderForm.car_kind_name = data.car_kind_name;//车系名称
      this.orderForm.car_model_no = data.car_model_no;//车型编号
      this.orderForm.car_model_name = data.car_model_name;//车型名称
      this.orderForm.price = data.price;//厂商指导价
      this.orderForm.sizetype = data.sizetype;//车身结构
      this.orderForm.displacementml = data.displacementml;//排量(mL)
      this.orderForm.displacement2 = data.displacement2;//排量(mL)
      this.orderForm.geartype = data.geartype;//变速箱类型
      this.orderForm.colorTemp = data.color;//车身颜色
      this.carModelVisible = false;
    },
    colorCallback(data) {
      this.orderForm.color = data;
      this.colorSelectorVisible = false;
    },
    acctCallback(data) {
      this.orderForm.payee_acct_no = data.part_center_no;
      this.acctVisible = false;
    },
    submit() {
      let that = this;
      console.log("当前新增页面传入数据前",this.orderForm);
      that.$refs.orderForm.validate(valid => {
        if (valid) {
          console.log("当前新增页面传入数据",this.orderForm);
          that.$emit("addCarModelCallBack", this.orderForm);
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
    // 删除金额千分位格式
    delDecimalFormat(){
      if (this.orderForm.purch_amount !== ""){
        //
        this.orderForm.purch_amount= this.orderForm.purch_amount.replaceAll(",", "");
      }
    },
    //表单金额格式化
    handleDecimal(data){
      return this.number_format(data, 2);
    },
    //表格金额格式化
    handleDecimalForPurchAmount(data){
      let purch_amount = this.orderForm.purch_amount.replaceAll(",","");
      this.orderForm.purch_amount =  this.number_format(purch_amount, 2);
      this.orderForm.purch_total_amount = this.handleDecimal(Math.ceil(parseFloat(purch_amount * 100 * this.orderForm.purch_volume)) / 100);
      console.log("查看当前更改后的金额格式",this.orderForm)
    },
    //车型数量改变
    handleVolumeChange(data){
      let purch_amount = this.orderForm.purch_amount.replaceAll(",", "");
      this.orderForm.purch_total_amount = this.handleDecimal(Math.ceil(parseFloat(purch_amount * 100 * data)) / 100);
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
