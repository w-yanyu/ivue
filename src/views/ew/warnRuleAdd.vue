<template>
  <el-form :model="form" label-width="100px" ref="form">
    <el-row>
      <el-col :span="18">
        <el-form-item label="规则名称" prop="ruleName" required :rules="ruleNameRules">
          <el-input v-model="form.ruleName" placeholder="请输入规则名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="false">
      <el-col :span="18">
        <el-form-item label="规则条件" prop="ruleCondition" required :rules="ruleCondition">
          <el-input v-model="form.ruleCondition" placeholder="请输入规则条件"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="配置规则" prop="configRule" required :rules="configRule">
          <el-input v-model="form.configRule" :disabled="true"></el-input>
          <el-button type="primary" style="margin-top: 20px;" @click="lookUp">选择配置</el-button>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row v-for="(item, index) in cnArry" :key="index">
      <el-col v-if="form.configRule" :span="2">
        <el-form-item :label="item + ':'" prop="configRule">
         
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事实名称" prop="bm">
          <!-- <el-input v-model="form.biaoming[index]"></el-input> -->
          <el-select v-model="form.biaoming[index]" placeholder="请选择"> 
         <el-option
        v-for="item in bmSel"
        :key="item.value"
        :label="item.table_name_ch"
        :value="item.table_name"
      ></el-option>
    </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="属性名称" prop="zdm">
          <!-- <el-input v-model="form.zdming[index]"></el-input> -->
        <el-select v-model="form.zdming[index]" @click.native="tableNameSel(index)" placeholder="请选择">
        <el-option
        v-for="item in zdList"
        :key="item.field_name"
        :label="item.field_desc"
        :value="item.field_name"
      ></el-option>
    </el-select>
        </el-form-item>
      </el-col>

    </el-row>

    <el-row>
      <el-col :span="18">
        <el-form-item label="预警频率" prop="alertFrequency" required :rules="alertFrequency">
          <el-select class="full-width" v-model="form.alertFrequency" placeholder="请选择预警频率">
            <el-option v-for="(item, i) in early_warning_frequency" :key="i" :label="item.dictName"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="预警级别" prop="alertLevel" required :rules="alertLevel">
          <el-select class="full-width" v-model="form.alertLevel" placeholder="请选择预警级别">
            <el-option v-for="(item, i) in early_warning_level" :key="i" :label="item.dictName"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="预警处理模板" prop="template_id">
          <el-select class="full-width" v-model="form.template_id" multiple placeholder="请选择预警处理模板"> 
              <el-option
              v-for="item in dealTemList"
              :key="item.value"
              :label="item.template_name"
              :value="item.template_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item label="启用状态" prop="enabled" required :rules="enabled">
          <el-select class="full-width" v-model="form.enabled" placeholder="请选择启用状态">
            <el-option v-for="(item, i) in effective_status" :key="i" :label="item.dictName"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align: center">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  data() {
    return {
      zdList:[],
      bmSel:[],
      dealTemList:[],
      early_warning_frequency: [],
      early_warning_level: [],
      effective_status: [],
      cnArry: [],
      enLabel:"",
      enArry: [],
      form: {
        ruleName: '',
        ruleCondition: '',
        configRule: '',
        alertFrequency: '',
        alertLevel: '',
        remark: '',
        enabled: '',
        biaoming: [],
        zdming: [],
        template_id: []
      },
      ruleNameRules: [
        { required: true, message: '请输入规则名称', trigger: 'blur' }
      ],
      alertFrequency: [
        { required: true, message: '请选择预警频率', trigger: 'change' }
      ],
      alertLevel: [
        { required: true, message: '请选择预警级别', trigger: 'change' }
      ],
      ruleCondition: [
        { required: true, message: '请输入规则条件', trigger: 'blur' }
      ],
      configRule: [
        { required: true, message: '请输入配置规则', trigger: 'blur' }
      ],
      // bm: [
      //   { required: true, message: '请输入', trigger: 'blur' }
      // ],
      // zdm: [
      //   { required: true, message: '请输入', trigger: 'blur' }
      // ],
      enabled: [
        { required: true, message: '请选择启用状态', trigger: 'change' }
      ]
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("early_warning_frequency", "early_warning_frequency");//获取数据字典MS_E_YESORNO
    this.getDictList("early_warning_level", "early_warning_level"); // 初始化额度产品状态数据字典
    this.getDictList("effective_status", "effective_status"); // 初始化释放额度数据字典
    console.log("sad", JSON.parse(localStorage.user_info),)
    this.search()
  },

  methods: {
    tableNameSel(index){
      this.zdList = []
      console.log("168",this.form.biaoming[index])
      let params = {
       servicecode: "ew3185",

       table_name:this.form.biaoming[index]
      
     }
     MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
       if (res && res.code === "200" && res.data) {
        console.log("ew3185",res.data)
        this.zdList = res.data
       
       }
     }).catch(err => {
       console.error(err);
     })
    },
 
    search(item) {
     
     let params = {
       servicecode: "ew3184",
     }
     MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
       if (res && res.code === "200" && res.data) {
        console.log("ew3184",res.data)
        this.bmSel = res.data
       }
     }).catch(err => {
       console.error(err);
     })

      let params3190 = {
       servicecode: "ew3190",
     }
     MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params3190).then(res => {
       if (res && res.code === "200" && res.data) {
        this.dealTemList = res.data
       }
     }).catch(err => {
       console.error(err);
     })

   },

 
    lookUp() {

      this.$dataBus.bindCallBackMethod(this, this.chooseViewCallBack, {});
      this.$dialog.open({
        that: this,
        title: "配置规则",
        toRequest: {
          url: "/views/ew/warnRuleLookup.json",
          method: "get",
          params: {

          },
        },
        width: "60%",
      });
    },

    chooseViewCallBack(btnConfig, response) {
      this.form.configRule = response.ruleCode
      console.log("daihui", response)
      let reqMap = {
        servicecode: "risk-management-service/risk-rule-comm/selectRuleByCode",
        appId: "risk-management-service",
        ruleStatus: 'Y',
        isList: true,
        rule_code: response.ruleCode,
        org_id: JSON.parse(localStorage.user_info).org_id
      };
      MyAxios.invokeAPI("/SUMP/riskController/riskCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {

            console.log("156", res.data)
            const chineseArray = [];
            const englishArray = [];
            const keys = Object.keys(res.data);
            const vals = Object.values(res.data);
            console.log("196",keys)
            const secondKeyValue = vals[1]
            console.log("197", secondKeyValue)
            let jm = ""
            for (const item of keys) {
              if (item != "actions" && item != "ruleType") {
                jm = item
              }
            }
            // 遍历对象的键和值
            for (const key in res.data[jm]) {
              if (res.data[jm].hasOwnProperty(key)) {
                const keyValue = key.split('-');  
                if (keyValue.length === 2) {
                  chineseArray.push(keyValue[1]);  
                  englishArray.push(jm + '.' + keyValue[0]);  
                }
              }
            }
            console.log("163", chineseArray);
            console.log("164", englishArray);
            this.cnArry = chineseArray
            this.enArry = englishArray
          }
        })
    },


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

    submitForm() {
      let ruleParam = []

      for (let i = 0; i < this.cnArry.length; i++) {
        let j = {}
        j.rule_param_en = this.enArry[i]
        j.rule_param_ch = this.cnArry[i]
        j.rule_code = this.enArry[i]
        j.table_name = this.form.biaoming[i]
        j.field_name = this.form.zdming[i]
        ruleParam.push(j)
      }
      console.log("249", ruleParam)

      this.$refs.form.validate(valid => {
        if (valid) {

          console.log("提交")
          let params = {
            servicecode: "ew3166",
            early_warning_frequency: this.form.alertFrequency,
            early_warning_level: this.form.alertLevel,
            effective_status: this.form.enabled,
            ruleParam: ruleParam,
            remark: this.form.remark,
            rule_condition: this.form.ruleCondition,
            rule_name: this.form.ruleName,
            rule_code:this.form.configRule,
            template_id:this.form.template_id
            

          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200" && res.data) {
              // this.$dialog.close();
              this.$dataBus.doCallBack(this, res);

            }
          }).catch(err => {
            console.error(err);
          })


        } else {
          // 表单验证不通过
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>