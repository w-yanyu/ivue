<template>
  <div class="box" :key="mainKey">
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item" name="1">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('经销商客户信息')}}
        </template>
        <to-json
          toUrl="/views/icms/flowStart/jhBusi/car/base_info.json"
          :params="this.pageParams"
          @jsonCallBack="baseInfoCallBack"
          :key="baseInfoKey"
        ></to-json>
      </el-collapse-item>
      <el-collapse-item
        class="collapse-item"
        name="2">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('检查资料')}}
        </template>
        <DocCheckList
          :c-parent-params="pageParams"
          @docListCallBack="docListCallBack"
          :key="docKey">

        </DocCheckList>
      </el-collapse-item>
      <el-collapse-item
        class="collapse-item"
        name="3">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('订单信息')}}
        </template>
        <OrderDetailList
          ref="orderInfo"
          :c-parent-params="pageParams"
          :key="orderKey"
          @orderInfoCallBack="orderInfoCallBack">

        </OrderDetailList>
      </el-collapse-item>
    </el-collapse>
    <div style="width: 100%; text-align: center">
      <el-button type="primary" @click="flowStart">{{$i18ns('订单信息')}}</el-button>
    </div>
  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
import DocCheckList from "@/views/icms/flowStart/jhBusi/car/DocCheckList.vue";
import OrderDetailList from "@/views/icms/flowStart/jhBusi/car/OrderDetailList.vue";
import userUtil from "pte-ui/utils/userUtil";

export default {
  name: "PublicDealerCarFlowStart",
  components: {
    DocCheckList,
    OrderDetailList
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        cust_no: "",
        sale_prod_cd: "",
        apply_type: "N"
      },
      mainKey:"0000",
      docKey: "0001",//表格刷新参数
      orderKey: "0002",//表格刷新参数
      baseInfoKey: "0003",//表格刷新参数
      docTableDataList: [],//资料检查列表
      orderDetailInfo: {},//订单明细信息
      baseInfo: {},
      activeNames: ['1', '2', '3', '4'],
      applyForm: {}
    }
  },
  created() {
    this.$dataBus.bindCallBackMethod(this, this.baseInfoCallBack, {});
  },
  methods: {

    docListCallBack(data) {
      console.log("返回资料数据", data);
      this.docTableDataList = data;
      console.log("资料列表", this.docTableDataList);
    },
    orderInfoCallBack(data) {
      console.log("返回订单", data);
      this.orderDetailInfo = data;
    },
    baseInfoCallBack(params, config) {
      console.log("查询客户返回数据", params);
      console.log("查询客户返回数据Config", config);
      this.pageParams.sale_prod_cd = config.prod_code;
      this.docKey = Math.random();
      this.orderKey = Math.random();
    },
    //流程启动
    flowStart() {
      //返回订单信息数据,将金额中千分位去除
      this.$refs.orderInfo.returnData();
      let that = this;
      let baseInfo = this.$dataBus.getCurrentFormData(this).baseInfo;
      let request_map = {};
      request_map["servicecode"] = "ar0034";
      let conditon = {};
      conditon.flowComType = baseInfo;
      const userInfo = userUtil.get();
      //协办调查人
      conditon.flowComType.teller_name = userInfo.userName;
      conditon.flowComType.trxn_teller = userInfo.userCode;
      conditon.checkDocInfo = this.docTableDataList;
      conditon.carOrderInfo = this.orderDetailInfo;
      // 对各个对象中的参数进行补全
      conditon.carOrderInfo.cust_no = conditon.flowComType.cust_no;
      conditon.carOrderInfo.repay_acct = conditon.flowComType.repay_acct;
      conditon.flowComType.repay_type = conditon.carOrderInfo.repay_type;
      conditon.flowComType.loan_amt = conditon.carOrderInfo.purch_total_amount;
      conditon.flowComType.loan_term = conditon.carOrderInfo.term;
      request_map["condition"] = conditon;
      this.$dataBus.doAllValidator(this).then((valid) => {
        //上传文件校验
        if (!this.hasUploadFile()) {
          MyMessage({
            message: "请上传必要的文件",
            type: "error",
          });
          return;
        }
        if (valid) {
          //校验子组件中表单的结果
          let flag = this.$refs.orderInfo.justify();
          if (!flag){
            MyMessage({
              message: "校验不通过",
              type: "warning",
            });
            return;
          }
          //申请金额判断
          if (!that.compareAmount(request_map["condition"].flowComType.loan_amt, request_map["condition"].flowComType.avail_amt)) {
            return;
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
            .then((response) => {
              if (response.code === "200") {
                // this.resetPage();
                //刷新页面
                that.resetPage();
                MyMessage({
                  message: "流程启动成功",
                  type: "success",
                });
                this.resetPage();
                this.$publicFn.openNavTab("/views/icms/ar_workbench/into_pool/workbench_into_pool_view.json", "进件池", this.cParentParams, this);
              } else {
                MyMessage({
                  message: response.message,
                  type: "error",
                });
              }
            });
        }
      });
    },
    //是否上传必要文件
    hasUploadFile() {
      let that = this;
      let result = true;
      that.docTableDataList.forEach(checkDocinfo => {
        if (checkDocinfo.is_must == 1 && checkDocinfo.upload_flag == 0) {
          result = false;
        }
      });
      return result;
    },
    /**
     * 比较申请金额与可用额度大小
     * @param apply_amt
     * @param avail_amt
     */
    compareAmount(apply_amt, avail_amt) {
      if (Number(apply_amt) > Number(avail_amt)) {
        MyMessage({
          message: "当前订单总金额超出可用额度，请核对信息",
          type: 'error'
        });
        return false;
      }
      return true;
    },
    /**
     * 启动成功后刷新页面
     */
    resetPage() {
      //清除页面参数
      Object.keys(this.pageParams).forEach(key => this.pageParams[key]= '');
      //刷新页面
      this.docKey = Math.random();
      this.orderKey = Math.random();
      // this.baseInfoKey = Math.random();
      // this.mainKey = Math.random();
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
</style>
