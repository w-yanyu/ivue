<template>
  <div>
    <el-form ref="ruleForm" :model="Applys" :rules="rules" class="custom-common--form" label-width="190px">
      <el-row>
        <el-col :span="8">
          <el-form-item class="upload-item" :label="$i18ns('申请人')" prop="appt">
            <el-input v-model="Applys.appt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="upload-item" label="客户编号" prop="cust_no">
            <el-input v-model="Applys.cust_no" :disabled="true"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="7">
          <el-form-item label="客户名称" prop="cust_name" class="upload-item">
            <div
              class=""
              style="height: 32px;white-space: nowrap;"
            >
              <input
                type="text"
                v-model="Applys.cust_name"
                autocomplete="off"
                placeholder=""
                name="cust_name"
                :disabled="true"
                class="el-input__inner lookup-edit el-input"
              />
              <button
                type="button"
                class="el-button el-button--primary el-button--mini"
                @click="openDialog"
                style="margin-left: 5px"
              >
                <!----><i class="el-icon-more"></i
              ><!---->
              </button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="upload-item" label="调整类型" prop="adj_type">
            <el-select v-model="Applys.adj_type">
              <el-option v-for="item in adj_typeList" :key="item.dictId" :label="item.dictName"
                         :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="组合名称" prop="cust_name" class="upload-item">
            <div
              class=""
              style="height: 32px;white-space: nowrap;"
            >
              <input
                type="text"
                v-model="Applys.temp_name"
                autocomplete="off"
                placeholder=""
                name="temp_name"
                class="el-input__inner lookup-edit el-input"
              />
              <button
                type="button"
                class="el-button el-button--primary el-button--mini"
                @click="openTemplateDialog"
                style="margin-left: 5px"
              >
                <!----><i class="el-icon-more"></i
              ><!---->
              </button>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="upload-item" label="组合编号" prop="temp_no">
            <el-input v-model="Applys.temp_no" @change="getformItemList('123')"></el-input>
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
      <el-row class="custom-common--footer">
        <el-button :disabled="submitLoading" size="small" type="primary" @click="mainApplySubmit">提交申请</el-button>
      </el-row>
    </el-form>

  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";
import * as itemElements from '../template/'

export default {
  components: itemElements,
  name: "GroupMainApply",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      show: false,
      //数据的type值要与组件的名字对应
      formItemList: [],
      formData: {},
      map: '',
      Applys: {
        appt: "",
        cust_no: "",
        cust_name: "",
        adj_type: "",
        temp_no: "",
        temp_name: "",
        key_info: ""
      },
      key_info: '',
      cateForm: {
        appl_id: "",
        cust_no: "",
        class_cd: "",
        group_ccy_cd: "",
        appv_tnr: "",
        group_amt: "",
        group_desc: ""
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        appl_id: "",
        procinstid: "",
        cust_no: "",
        group_no: "",
        class_cd: ""
      },
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "A1",

      toGroupCateUrl: "/views/us/usManager/creditApply/subCredit/cate/group_creditCate_add.json",
      toCreditAllocationUrl: "/views/us/usManager/creditApply/subCredit/sub_creditAllocation_list.json",
      toRequest: "/views/us/usManager/creditApply/group_customer_main_apply.json",
      adj_typeList: [],//调整类型字典
      optionList: [], //分类类型字典
      tabList: [], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    // this.initGroupCompanyApply();//初始化查询集团授信主申请信息
    this.getDictList("US_E_ADJ_TYPE", "adj_typeList");//初始化字典
    this.map = new Map();

    // this.getTabInfo(true);
  },
  methods: {
    changeComponentHandle(changeValue) {
      // this.res = changeValue.value
      console.log("key====----" + changeValue.key);
      console.log("value====----" + changeValue.value);
      this.map.set(changeValue.key, changeValue.value);
      console.log(this.map, 'map集合');
    },
    _strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k, v] of strMap) {
        obj[k] = v;
      }
      return obj;
    },
    /*获取字典组合列表*/
    openTemplateDialog() {
      const option = {
        toRequest: {
          url: "/views/us/specialManage/application/special_adjust_template_lookup.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: "查询模板名称",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringTemplateBack, option);
      this.$dialog.open(option);
    },
    bringTemplateBack(formItem, returnData) {
      let data = returnData;
      console.log("选择的tempid为：" + data["temp_no"]);
      this.Applys.temp_name = data["temp_name"];
      this.Applys.temp_no = data["temp_no"];
      this.$emit("input", this.value);
      let temp_no = data["temp_no"];
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let request_map = {
            servicecode: "us0414",
            temp_no: temp_no
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
            .then(res => {
              console.log("mainApplySubmit", res);
              if (res.code === "200") {
                // this.submitLoading = false;
                // this.$message({
                //   type: "success",
                //   message: res.message,
                // });
                // this.jumpUrl("/views/us/specialManage/application/special_adjust_appl_manager.json");
                this.formItemList = res.data;
                console.log("formItemList", res.data);
                // this.formItemList = res.data;
                // this.formItemList.splice(0, 1, this.formItemList[0]);
              } else {
                MyMessage({
                  message: res.message,
                  type: "error",
                });
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    },
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/us/cust_lookup.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: "查询客户名称",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data =  returnData;
      this.Applys.cust_name = data["cust_name"];
      this.Applys.appt = data["cust_name"];
      this.Applys.cust_no = data["cust_no"];
      this.$emit("input", this.value);
    },
    /**
     *map转换为json
     */
    _mapToJson(map) {
      return JSON.stringify(this._strMapToObj(map));
    },
    mainApplySubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let that = this;
          let keyinfo = this._mapToJson(that.map);
          let request_map = {
            servicecode: "us0425",
            appt: that.Applys.appt,
            cust_no: that.Applys.cust_no,
            cust_name: that.Applys.cust_name,
            adj_type: that.Applys.adj_type,
            temp_no: that.Applys.temp_no,
            temp_name: that.Applys.temp_name,
            key_info: keyinfo
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
                this.$dialog.close();
              } else {
                MyMessage({
                  message: res.message,
                  type: "error",
                });
              }
            });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    },
    jumpUrl(url) {
      const option = {
        toRequest: {
          url: url,
          method: "get",
          params: {
            appl_id: this.cParentParams.applid, // appid参数传递
            cust_no: this.cParentParams.cust_no // cust_no参数传递
          }
        },
        width: "65%",
        title: "新增",
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.jumpCallBack, option)
      this.$dialog.open(option);
    },
    jsonCallBack(res) {
      console.log("jsonCallBack:" + JSON.stringify(res))
      const data = res.data;
      this.initGroupCompanyApply(false);
      if (data.gtrantp !== "UPDATE") {
        this.show = false;
        this.getTabInfo(false);
      }
    },
    jumpCallBack() {
      this.initGroupCompanyApply(false);
      this.show = false;
      this.getTabInfo(false);
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
    cateClose() {
      this.dialogVisible = false;
    },
    /**
     * 获取table信息
     */
    getTabInfo(first) {
      let params = {
        appl_id: this.cParentParams.applid,
        cust_no: this.cParentParams.cust_no,
        servicecode: "ic1132",//交易码
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.tabList = res.data;
          this.tabList.forEach((item) => {
            item.toRequest = this.toRequest;
            item.params = {}
            item.params.group_no = item.group_no;
            item.params.class_cd = item.class_cd;
            item.params.applid = this.cParentParams.applid;
            item.params.cust_no = this.cParentParams.cust_no;
            if (item.class_cd == 'A1') {
              item.title = "公司客户综合授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A2') {
              item.title = "公司客户专项授信额度 " + item.group_no;
            }
            if (item.class_cd == 'A3') {
              item.title = "公司客户低风险授信额度 " + item.group_no;
            }
            item.idField = item.group_no;
          })
          if (this.tabList.length > 0) {
            if (first) {
              this.activeName = this.tabList[0].idField;
            } else {
              const last = this.tabList.length - 1;
              this.activeName = this.tabList[last].idField;
            }
            this.show = true;
          }
          console.log("tableList列表" + JSON.stringify(this.tabList));
        }
      }).catch(err => {
        console.error(err);
      })
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    }
  },
};
</script>


<style lang="less" scoped>
.custom-common--form {
  padding: 0;

  .el-row .el-col {
    padding-right: 4px;
  }
}

.custom-common--footer {
  text-align: center;
}

.group_apply_card {
  margin-top: 8px;
}

</style>
