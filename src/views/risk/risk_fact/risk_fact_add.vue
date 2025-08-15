<template>
  <el-form :model="fact" ref="form" :rules="rules" label-width="130px">
    <el-row>
      <el-col span="12" label-width="150px">
        <el-form-item label="事实代码" prop="factCode">
          <!--   <el-select v-model="fact.factCode" filterable="true" allow-create="true" clearable placeholder="请选择" label="事实代码"
          @change="selectFactName(fact.factCode)" class="inputItem">
            <el-option v-for="item in options" :key="item.value" :label="item.value + '-' + item.label" :value="item.value" prop="factCode">
            </el-option>
          </el-select> -->

          <el-autocomplete class="inputItem" v-model="fact.factCode" :fetch-suggestions="querySearch"
            @select="handleFactCodeSelect" filterable="true" @keyup.native="checkout" allow-create="true" clearable
            placeholder="请输入事实代码"></el-autocomplete>



        </el-form-item>
      </el-col>
      <el-col span="12" label-width="150px">
        <el-form-item label="事实名称" prop="factName" allow-create="true">
          <el-input v-model="fact.factName" class="inputItem" placeholder="请输入事实名称" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="12" label-width="150px">
        <el-form-item label="事实属性代码" prop="fieldCode">
          <el-input v-model="fact.fieldCode" class="inputItem" placeholder="请输入事实属性代码" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col span="12" label-width="150px">
        <el-form-item label="事实属性名称" prop="fieldName">
          <el-input v-model="fact.fieldName" class="inputItem" placeholder="请输入事实属性名称" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="12" label-width="150px">
        <el-form-item label="事实属性类型" prop="fieldType">
          <el-select v-model="fact.fieldType" placeholder="请选择" class="inputItem" clearable>
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col span="12" label-width="150px">
        <el-form-item label="引用集合代码" prop="referenceCollectionCode">
          <el-select v-model="fact.referenceCollectionCode" placeholder="请选择" class="inputItem" clearable>
            <el-option v-for="item in options3" :key="item.value" :label="item.value + '-' + item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="24">
        <el-form-item label="备注" prop="description" clearable>
          <el-input v-model="fact.description" type="textarea" rows="5" show-word-limit maxlength="500"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item class="footForm">
          <div class="buttonGroup">
            <el-button type="primary" small @click="saveUpData">保存</el-button>
            <el-button small @click="reset">重置</el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
  import Api from "../utils/api";
  import {
    cloneJSON
  } from '@jsmini/clone';
  export default {
    data() {
      return {
        fact: {
          factCode: "", //事实代码
          factName: "", //事实名称
          fieldCode: "", //事实属性代码
          fieldName: "", //事实属性名称
          fieldType: "", //事实属性类型
          referenceCollectionCode: "", //引用集合代码
          description: "", //备注
          createUser: "" //创建人
        },
        //页面
        show: true,
        //事实代码
        options: [],
        //事实类型
        options2: [{
            value: "String",
            label: "String-字符串"
          },
          {
            value: "Int",
            label: "Int-整数"
          },
          {
            value: "Decimal",
            label: "Decimal-数值"
          },
          {
            value: "Boolean",
            label: "Boolean-布尔值"
          }
        ],
        //引用结合
        options3: [],

        rules: {
          factCode: [{
            required: true,
            message: "请输入事实代码",
            trigger: "blur"
          }],
          factName: [{
            required: true,
            message: "请输入事实名称",
            trigger: "blur"
          }],
          fieldCode: [{
            required: true,
            message: "请输入属性代码",
            trigger: "blur",
            pattern: "^[A-Za-z][A-Za-z\\d_]{0,59}$"
          }],
          fieldName: [{
            required: true,
            message: "请输入属性名称",
            trigger: "blur",
            max: 100
          }],
          fieldType: [{
            required: true,
            message: "请输入属性类型",
            trigger: "blur",
            max: 8
          }],
          description: [{
            max: 500,
            message: "最大长度为500"
          }]
        }
      };
    },
    mounted() {
      this.fact = {};
      this.initFactCode();
      this.initCollectionCode();
    },
    methods: {
      //查询factCode事实代码,下拉列表
      initFactCode() {
        this.$http
          .invokeAPI(
            "/API" +
            "/risk-management-service/combobox-select/fact-without-field",
            "POST"
          )
          .then(obj => {
            if (obj.code === "200") {
              this.options = obj.data;
            }
          })
          .catch(reg => {
            this.$message.warning("查询失败，请稍后尝试");
          });
      },

      //引用集合
      initCollectionCode() {
        this.$http
          .invokeAPI(
            "/API" + "/risk-management-service/combobox-select/rule_constant",
            "POST"
          )
          .then(obj => {
            if (obj.code === "200") {
              this.options3 = obj.data;
            }
          })
          .catch(reg => {
            this.$message.warning("查询失败，请稍后尝试");
          });
      },
      //联动查询faceName
      selectFactName(factCode) {
        if (factCode != null && factCode !== "") {
          for (let i in this.options) {
            const map = new Map(Object.entries(this.options[i]));
            if (map.get("value") === factCode) {
              // console.log(map.get("label"));
              this.fact.factName = map.get("label");
              break;
            }
          }
        }
      },
      //保存
      saveUpData() {
        //发送请求前，再次进行表单校验
        //先获取表单对象，然后执行校验方法
        //获取用户信息
        this.$refs.form.validate(valid => {
          //valid校验结果 true校验通过
          console.log(valid);
          if (valid) {
            //获取用户信息
            console.log(this.$store.getters.name.toString());
            this.fact.createUser = this.$store.getters.name.toString();
            //请求表格数据
            this.$http
              .invokeAPI("/API" + Api.ssgl_add, "POST", this.fact)
              .then(obj => {
                if (obj.code === "200") {
                  this.$message.success("保存成功");
                }
                this.fact = {};
                this.$dataBus.doCallBack(this, this.fact);
              })
              .catch(reg => {
                this.$message.warning("保存失败，请稍后尝试");
              });
          } else {
            this.$message.warning("校验失败，请填写好表单");
          }
        });
      },
      //重置
      reset() {
        this.fact = {};
        // this.$router.go(-1)
        // debugger
        // this.$router.push('/basicParameters/risk_fact')
      },
      //输入框主动输入筛选选择项
      querySearch(queryString, cb) {

        let restaurants = this.options;
        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        let cloneArray = cloneJSON(results)
        console.log('querySearch', results);
        for (const child of cloneArray) {
          child.value = `${child.value}-${child.label}`;
        }
        cb(cloneArray);
      },
      createStateFilter(queryString) {
        return (state) => {
          let array = state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          console.log('createStateFilter', array);
          return array;
        };
      },
      handleFactCodeSelect(item) {
        this.fact.factCode = item.value.toString().split("-")[0];
        this.fact.factName = item.label;
        console.log('handleFactCodeSelect', item);
      },
      checkout() {
        this.fact.factCode = this.fact.factCode
      }
    }
  };
</script>
<style lang="css" scoped>
  .inputItem {
    width: 100%;
  }

  .footForm {
    position: relative;
  }

  .buttonGroup {
    position: absolute;
    right: 0px;
    bottom: -25px;
  }
</style>
