<template>
  <div>
    <el-form ref="ruleForm" :model="Applys" :rules="rules" class="custom-common--form" label-width="190px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="upload-item" label="调整申请号" prop="appl_no">
              <el-input v-model="Applys.appl_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" :label="$i18ns('申请人')" prop="appt">
              <el-input v-model="Applys.appt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" :label="$i18ns('申请时间')" prop="appl_time">
              <el-input v-model="Applys.appl_time" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="调整状态" prop="adjust_status">
              <el-select v-model="Applys.adjust_status" :disabled="true">
                <el-option v-for="item in adj_statusList" :key="item.dictId" :label="item.dictName"
                           :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="客户编号" prop="cust_no">
              <el-input v-model="Applys.cust_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="客户名称" prop="cust_name">
              <el-input v-model="Applys.cust_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="调整类型" prop="adj_type">
              <el-select v-model="Applys.adj_type" :disabled="true">
                <el-option v-for="item in adj_typeList" :key="item.dictId" :label="item.dictName"
                           :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="组合编号" prop="temp_no">
              <el-input v-model="Applys.temp_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="upload-item" label="组合名称" prop="temp_name">
              <el-input v-model="Applys.temp_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <template>
            <div class="g-container">
            <component
                v-for="(item, number) in formItemList"
                :key="item.field_name"
                :is="item.form_type"
                :item="item"
                :number="number"
                @changeComponent="changeComponentHandle"
            ></component>
            </div>
            </template>
        </el-row>
      </el-form>
  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";
import * as itemElements from './template'
import { List } from 'gojs';
export default {
    components: itemElements,
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    data() {
        return {
            adj_typeList: [],//调整类型字典
            adj_statusList: [],//调整类型字典
            formItemList:[],
            Applys: {
                appl_no:"",
                appt: "",
                appl_time:"",
                adjust_status:"",
                cust_no: "",
                cust_name: "",
                adj_type: "",
                temp_no: "",
                temp_name: "",
                detail: []
            },
            map:'',
            detailData:[],
        }
    },
    created() {
        this.initFormData();//初始化查询申请信息
        this.getDictList("US_E_ADJ_TYPE", "adj_typeList");//初始化字典
        this.getDictList("US_E_ADJUST_STATUS", "adj_statusList");//初始化字典
        this.map = new Map();
        // this.getTabInfo(true);
    },
    methods: {

        mainApprRejectSubmit(){

            console.log(this.map,'mapmap集合');
            for(let [key, value] of this.map.entries()){
                this.detailData.push({appl_no:this.Applys.appl_no, order_seq:key, newval:value});
            }
            console.log(this.detailData,'detailData集合');
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              let that = this;
              let request_map = {
                servicecode: "us0423",
                appl_no: that.Applys.appl_no,
                apprfg: "0"
              };
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
                .then(res => {
                  console.log("mainApplySubmit", res);
                  if (res.code === "200") {
                    this.submitLoading = false;
                    this.$message({
                      type: "success",
                      message: res.message,
                    });
                    // this.jumpUrl("/views/us/specialManage/application/special_adjust_appl_manager.json");
                  } else {
                    MyMessage({
                      message: res.message,
                      type: "error",
                    });
                  }
                });
            }else {
              this.$message({
                type: "warning",
                message: "校验不通过",
              });
            }
          });
        },
        mainApprAllowSubmit(){

            console.log(this.map,'mapmap集合');
            for(let [key, value] of this.map.entries()){
                this.detailData.push({appl_no:this.Applys.appl_no, order_seq:key, newval:value});
            }
            console.log(this.detailData,'detailData集合');
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              let that = this;
              let request_map = {
                servicecode: "us0424",
                appl_no: that.Applys.appl_no,
                apprfg: "1"
                // detail: this.detailData
              };
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
                .then(res => {
                  console.log("mainApplySubmit", res);
                  if (res.code === "200") {
                    this.submitLoading = false;
                    this.$message({
                      type: "success",
                      message: res.message,
                    });
                    // this.jumpUrl("/views/us/specialManage/application/special_adjust_appl_manager.json");
                  } else {
                    MyMessage({
                      message: res.message,
                      type: "error",
                    });
                  }
                });
            }else {
              this.$message({
                type: "warning",
                message: "校验不通过",
              });
            }
          });
        },


        initFormData() {
            let that = this;
            let request_map = {
                servicecode: "us0422",
                appl_no: that.cParentParams.appl_no

            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
                .then(res => {
                console.log("initFormData", res);
                if (res.code === "200") {
                    console.log("===LLL==" + res.data[0].appl_no);
                    that.Applys.appl_no = res.data[0].appl_no;
                    that.Applys.appt = res.data[0].appt;
                    that.Applys.appl_time = res.data[0].appl_time;
                    that.Applys.adjust_status = res.data[0].adjust_status;
                    that.Applys.cust_no = res.data[0].cust_no;
                    that.Applys.cust_name = res.data[0].cust_name;
                    that.Applys.adj_type = res.data[0].adj_type;
                    that.Applys.temp_no = res.data[0].temp_no;
                    that.Applys.temp_name = res.data[0].temp_name;
                    that.Applys.detail = res.data[0].detail;
                    that.formItemList = new List();
                    that.formItemList = res.data[0].detail;
                    console.log(res.data[0].detail);
                    console.log(that.formItemList);
                    console.log("formItemList====");

                } else {
                    MyMessage({
                    message: res.message,
                    type: "error",
                    });
                }
                });

        },
        changeComponentHandle(changeValue){
            // this.res = changeValue.value
            console.log("order_seq====----"+changeValue.order_seq);
            console.log("value====----"+changeValue.newval);
            this.map.set(changeValue.order_seq,changeValue.newval)
            console.log(this.map,'map集合')
        },
        /**
         * 获取数据字典列表
         * @param dictType  数据字典 dictType
         * @param listKey 列表对象key名称
         */
        getDictList(dictType, listKey) {
            let params = {
                dictType: dictType,
                dictKey: [dictType]
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
        }
}
</script>
