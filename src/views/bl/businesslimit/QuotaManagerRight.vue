<template>
  <div class="quota-form" v-show="showForm">
    <div class="quota-form--title">{{title}}</div>
    <div class="branch-form--container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
        class="custom-common--form"
      >
        <el-row v-if="type === 'rootEdit'">
          <el-col :span="12">
            <el-form-item label="额度产品号" prop="cl_prod_cd">
              <el-input v-model="ruleForm.cl_prod_cd" placeholder="请输入额度产品号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度产品名称" prop="cl_prod_name">
              <el-input v-model="ruleForm.cl_prod_name" placeholder="请输入额度产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生效日期" prop="effect_date">
              <el-date-picker
                v-model="ruleForm.effect_date"
                align="right"
                type="date"
                placeholder="请选择生效日期"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="失效日期" prop="expiry_date">
              <el-date-picker
                v-model="ruleForm.expiry_date"
                type="date"
                placeholder="请选择失效日期"
                value-format="yyyyMMdd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度状态" prop="cl_prod_status">
              <el-select v-model="ruleForm.cl_prod_status" placeholder="请选择额度状态">
                <el-option
                  v-for="(item, i) in clprstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="type === 'customEdit'">
          <el-col :span="12">
            <el-form-item label="业务种类编号" prop="busi_cd">
              <el-select v-model="ruleForm.busi_cd" placeholder="请选择业务种类编号" >
                <el-option
                  v-for="(item, i) in busicdList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度产品号" prop="cl_prod_cd">
              <el-input v-model="ruleForm.cl_prod_cd" placeholder="请输入额度产品号" disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度类型编号" prop="cl_type_cd">
              <el-input v-model="ruleForm.cl_type_cd" placeholder="请输入额度类型编号" v-bind:disabled="disab"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度类型名称" prop="cl_type_name">
              <el-input v-model="ruleForm.cl_type_name" placeholder="请输入额度类型名称" v-bind:disabled="disab"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级额度类型编号" prop="parent_cl_type_cd">
              <el-input v-model="ruleForm.parent_cl_type_cd" placeholder="上级额度类型编号" disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度级别" prop="cl_level">
              <el-select v-model="ruleForm.cl_level" placeholder="请选择额度级别">
                <el-option
                  v-for="(item, i) in cllevlList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度计算方式" prop="cl_cal_way">
              <el-select v-model="ruleForm.cl_cal_way" placeholder="请选择额度计算方式">
                <el-option
                  v-for="(item, i) in qucamdList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度计算值" prop="cl_cal_val">
              <el-input v-model="ruleForm.cl_cal_val" placeholder="请输入额度计算值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可设区间(最大值)" prop="limit_max">
              <el-input v-model="ruleForm.limit_max" placeholder="可设区间(最大值)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可设区间(最小值)" prop="limit_min">
              <el-input v-model="ruleForm.limit_min" placeholder="请输入可设区间(最小值)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="循环标志" prop="cycle_flag">
              <el-select v-model="ruleForm.cycle_flag" placeholder="请选择循环标志">
                <el-option
                  v-for="(item, i) in isYESORNOList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度使用类型" prop="cl_use_type">
              <el-select v-model="ruleForm.cl_use_type" placeholder="请输入额度使用类型">
                <el-option
                  v-for="(item, i) in quustpList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="释放额度" prop="freeze">
              <el-select v-model="ruleForm.freeze" placeholder="请选择释放额度">
                <el-option
                  v-for="(item, i) in freezeList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否允许超过额度到期日" prop="term_relation">
              <el-select v-model="ruleForm.term_relation" placeholder="请选择是否允许超过额度到期日">
                <el-option
                  v-for="(item, i) in isYESORNOList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否临时生效" prop="is_temp_effect">
              <el-select v-model="ruleForm.is_temp_effect" placeholder="请选择是否临时生效" @change="isvaliChange">
                <el-option
                  v-for="(item, i) in isYESORNOList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="临时生效天数" prop="temp_effect_day">
              <el-input v-model="ruleForm.temp_effect_day" placeholder="临时生效天数" v-bind:disabled="validyDisab"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否向上递归" prop="is_up_recurse">
              <el-select v-model="ruleForm.is_up_recurse" placeholder="请选择是否向上递归">
                <el-option
                  v-for="(item, i) in isYESORNOList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否超出额度金额" prop="is_exceeded">
              <el-select v-model="ruleForm.is_exceeded" placeholder="请选择是否超出额度金额">
                <el-option
                  v-for="(item, i) in isYESORNOList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="额度状态" prop="cl_prod_status">
              <el-select v-model="ruleForm.cl_prod_status" placeholder="请选择额度状态">
                <el-option
                  v-for="(item, i) in clprstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="quota-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="submit('ruleForm')">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { EventBus } from "./Bus";

export default {
  name: "QuotaManagerRight",
  data() {
    return {
      title: "",
      type: "",
      showForm: false,
      disab: false,
      validyDisab:false,
      ruleForm: {
        cl_prod_cd: "", // 额度产品号
        cl_prod_name: "", // 额度产品名称
        effect_date: "", // 生效日期
        expiry_date: "", // 失效日期
        parent_cl_type_cd: "", // 上级额度类型编号
        cl_prod_status: "", // 额度产品状态
        busi_cd: "", // 业务种类编号
        cl_type_cd: "", // 额度类型编号
        cl_type_name: "", // 额度类型名称
        cl_level: "", // 额度级别
        cl_cal_way: "", // 额度计算方式
        cl_cal_val: "", // 额度计算值
        limit_max: "", // 可设区间(最大值)
        limit_min: "", // 可设区间(最小值)
        cycle_flag: "", // 循环标志
        cl_use_type: "", // 额度使用类型
        freeze: "", // 释放额度
        term_relation: "", // 期限间关系
        is_temp_effect: "", // 是否临时生效
        temp_effect_day: "", // 临时生效天数
        is_up_recurse: "", // 是否向上递归
        is_exceeded: "" // 是否超出额度金额
      },
      rules: {
        busi_cd: [
          { required: false, message: "请输入业务种类编码" }
        ],
        cl_prod_cd: [
          { required: true, message: "请输入额度产品号" }
        ],
        effect_date: [
          { required: true, message: "请输入生效日期" }
        ],
        expiry_date: [
          { required: true, message: "请输入失效日期" }
        ],
        cl_prod_name: [
          { required: true, message: "请输入额度产品名称" }
        ],
        cycle_flag: [
          { required: true, message: "请输入循环标志" }
        ],
        cl_type_cd: [
          { required: true, message: "请输入额度类型编号" }
        ],
        cl_level: [
          { required: true, message: "请输入额度级别" }
        ],
        cl_cal_way: [
          { required: true, message: "请输入额度计算方式" }
        ],
        cl_use_type: [
          { required: true, message: "请输入额度使用类型" }
        ],
        freeze: [
          { required: true, message: "请输入释放额度" }
        ],
        is_up_recurse: [
          { required: true, message: "请输入是否向上递归" }
        ],
        cl_prod_status: [
          { required: true, message: "请输入额度状态" }
        ],
        cl_cal_val: [
          {
            pattern: "^\\d+(\\.{0,1}[\\d]{2}){0,1}$",
            message: "请输入大于或等于零的数值",
            trigger: "blur"
          }
        ],
        limit_max: [
          {
            pattern: "^\\d+(\\.{0,1}[\\d]{2}){0,1}$",
            message: "请输入大于或等于零的数值",
            trigger: "blur"
          }
        ],
        limit_min: [
          {
            pattern: "^\\d+(\\.{0,1}[\\d]{2}){0,1}$",
            message: "请输入大于或等于零的数值",
            trigger: "blur"
          }
        ]
      },
      isYESORNOList: [], // 额度产品状态数据字典
      busicdList: [], // 业务种类编号数据字典
      cllevlList: [], // 额度级别数据字典
      qucamdList: [], // 额度计算方式数据字典
      flagList: [], // 是否数据字典
      freezeList: [], // 释放额度数据字典
      clmodeList: [], // 额度模式数据字典
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("MS_E_YESORNO","isYESORNOList");//获取数据字典MS_E_YESORNO
    this.getDictList("CL_E_CL_PROD_STATUS", "clprstList"); // 初始化额度产品状态数据字典
    this.getDictList("CL_E_FREEZE", "freezeList"); // 初始化释放额度数据字典
    this.getDictList("CL_E_CL_MODE", "clmodeList"); // 初始化额度模式数据字典
    this.getDictList("CL_E_BUSI_CD", "busicdList"); // 初始化业务种类编号数据字典
    this.getDictList("CL_E_CL_LEVEL", "cllevlList"); // 初始化额度级别数据字典
    this.getDictList("CL_E_CAL_WAY", "qucamdList"); // 初始化额度计算方式数据字典
    this.getDictList("CL_E_CL_USE_TYPE", "quustpList"); // 初始化额度使用类型数据字典

    EventBus.$on("addMainQuota", () => {
      this.title = "额度结构根节点信息新增";
      this.type = "rootEdit";
      this.showForm = true;
      this.ruleForm = {
        cl_prod_cd: "", // 额度产品号
        cl_prod_name: "", // 额度产品名称
        effect_date: "", // 生效日期
        expiry_date: "", // 失效日期
        cl_prod_status: "" // 额度产品状态
      };
    });
    EventBus.$on("addQuota", data => {
      this.title = "额度结构信息新增";
      this.type = "customEdit";
      this.disab = false;
      this.validyDisab=true;
      this.showForm = true;
      this.ruleForm = {
        cl_prod_cd: data.cl_prod_cd, // 额度产品号
        parent_cl_type_cd: data.id, // 上级额度类型编号
        cl_prod_status: "1", // 额度产品状态
        busi_cd: "L", // 业务种类编号
        cl_type_cd: "", // 额度类型编号
        cl_type_name: "", // 额度类型名称
        cl_level: "", // 额度级别
        cl_cal_way: "", // 额度计算方式
        cl_cal_val: "", // 额度计算值
        limit_max: "", // 可设区间(最大值)
        limit_min: "", // 可设区间(最小值)
        cycle_flag: "", // 循环标志
        cl_use_type: "", // 额度使用类型
        freeze: "", // 释放额度
        term_relation: "1", // 期限间关系
        is_temp_effect: "0", // 是否临时生效
        temp_effect_day: "", // 临时生效天数
        is_up_recurse: "1", // 是否向上递归
        is_exceeded: "0" // 是否超出额度金额
      };
    });
    EventBus.$on("modifyQuota", data => {
      this.showForm = true;
      if (data.isRoot) {
        this.title = "额度结构根节点信息维护";
        this.type = "rootEdit";
        let params = {
          servicecode: "cl0002",
          cl_prod_cd: data.cl_prod_cd
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.ruleForm.cl_prod_cd = res.data.cl_prod_cd;
              this.ruleForm.cl_prod_name = res.data.cl_prod_name;
              this.ruleForm.effect_date = res.data.effect_date;
              this.ruleForm.expiry_date = res.data.expiry_date;
              this.ruleForm.cl_prod_status = res.data.cl_prod_status;
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.title = "额度结构信息维护";
        this.type = "customEdit";
        this.disab = true;
        let params = {
          servicecode: "cl0012",
          cl_prod_cd: data.cl_prod_cd,
          cl_type_cd: data.id
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.ruleForm.cl_prod_cd = res.data.cl_prod_cd;
              this.ruleForm.parent_cl_type_cd = res.data.parent_cl_type_cd;
              this.ruleForm.cl_prod_status = res.data.cl_prod_status;
              this.ruleForm.busi_cd = res.data.busi_cd;
              this.ruleForm.cl_type_cd = res.data.cl_type_cd;
              this.ruleForm.cl_type_name = res.data.cl_type_name;
              this.ruleForm.cl_level = res.data.cl_level;
              this.ruleForm.cl_cal_way = res.data.cl_cal_way;
              this.ruleForm.cl_cal_val = res.data.cl_cal_val;
              this.ruleForm.limit_max = res.data.limit_max;
              this.ruleForm.limit_min = res.data.limit_min;
              this.ruleForm.cycle_flag = res.data.cycle_flag;
              this.ruleForm.cl_use_type = res.data.cl_use_type;
              this.ruleForm.freeze = res.data.freeze;
              this.ruleForm.term_relation = res.data.term_relation;
              this.ruleForm.is_temp_effect = res.data.is_temp_effect;
              this.ruleForm.temp_effect_day = res.data.temp_effect_day;
              this.ruleForm.is_up_recurse = res.data.is_up_recurse;
              this.ruleForm.is_exceeded = res.data.is_exceeded;
              //初始化临时生效天数
              this.isvaliChange();
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  },
  methods: {
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
    //判断是否临时生效
    isvaliChange(val){
       if(val == "N"){
         this.validyDisab = true;
         this.ruleForm.temp_effect_day= "";
       }else{
         this.validyDisab=false;
       }
    },
    submit(formName) {
      let that = this;
      if (this.type == "rootEdit") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = this.ruleForm;
            params.servicecode = 'cl0001'
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
              response => {
                console.debug("rootEdit 请求回调", JSON.stringify(response));
                if (response.code === "200") {
                  that.$emit("refresh");
                  this.$message({
                    type: "success",
                    message: "操作成功"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "操作失败"
                  });
                }
              }
            );
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过"
            });
          }
        });
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let params = this.ruleForm;
            params.servicecode = 'cl0011'
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
              response => {
                if (response.code === "200") {
                  that.$emit("refresh");
                  this.$message({
                    type: "success",
                    message: "操作成功"
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: "操作失败"
                  });
                }
              }
            );
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过"
            });
          }
        });
      }
    },
    resetForm(formName) {
        switch (this.type) {
          case "rootEdit":
            this.ruleForm.prodcd = ""; // 额度产品号
            break;
          case "customEdit":
            if (!this.disab) {
              this.ruleForm.cltpcd = "";
            }
            break;
        }
        this.ruleForm.prodna = "", // 额度产品名称
        this.ruleForm.efctdt = "", // 生效日期
        this.ruleForm.faildt = "", // 失效日期
        this.ruleForm.clprst = "", // 额度产品状态
        //this.ruleForm.prodcd = "", // 额度产品号
        //this.ruleForm.busicd = "", // 业务种类编号
        //this.ruleForm.cltpcd = "", // 额度类型编号
        //this.ruleForm.ptclcd = "", // 上级额度类型编号
        this.ruleForm.cllevl = "", // 额度级别
        this.ruleForm.qucamd = "", // 额度计算方式
        this.ruleForm.qucava = "", // 额度计算值
        this.ruleForm.lmtmax = "", // 可设区间(最大值)
        this.ruleForm.lmtmin = "", // 可设区间(最小值)
        this.ruleForm.cyclfg = "", // 循环标志
        this.ruleForm.quustp = "", // 额度使用类型
        this.ruleForm.freeze = "", // 释放额度
        this.ruleForm.termre = "", // 期限间关系
        this.ruleForm.isvali = "", // 是否临时生效
        this.ruleForm.validy = "", // 临时生效天数
        //this.ruleForm.updtfg = "", // 是否向上递归
        this.ruleForm.isbdam = ""; // 是否超出额度金额
        //this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.quota-form {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .quota-form--title {
    width: 100%;
    height: 40px;
    padding-left: 10px;
    position: relative;
    line-height: 40px;
    &::before {
      content: "";
      width: 3px;
      height: 22px;
      display: block;
      position: absolute;
      left: 0;
      top: 8px;
      background: #727df8;
    }
  }
}
.quota-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
