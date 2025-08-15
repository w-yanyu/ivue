<template>
  <div class="page_content">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-row>
        <el-col span="12">
          <el-form-item label="字典代码 " prop="dictCode" label-width="100px">
            <el-input v-model="ruleForm.dictCode" ></el-input>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item label="字典名称 " prop="dictName" label-width="100px">
            <el-input v-model="ruleForm.dictName" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="12">
          <el-form-item label="数据类型 " prop="dataTypeShow" label-width="100px">
            <el-select style="width:100%" v-model="ruleForm.dataTypeShow" :label-in-value="true" clearable
              @change="dataTpyeChange">
              <el-option v-for="item in dataTypeOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item label="状态 " prop="status" label-width="100px">
            <el-radio-group v-model="ruleForm.status" @change="statusChange">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">未启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="枚举值 " prop="description" label-width="100px">
            <el-button type="primary" size="small" @click="addTable" :disabled="ruleForm.dataTypeShow==''">新增
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-form class="table_content">
      <el-table :data="riskDictValueList" border max-height="450">
        <el-table-column prop="value" label="枚举值">
          <template slot-scope="scope">

            <el-input size="mini" v-if="scope.row.isRulesSet && ruleForm.dataTypeShow!='Boolean'"
              v-model="scope.row.value" @input="inputValueEven($event,scope.row)" clearable
              :placeholder="placeholderText">
            </el-input>

            <el-select v-if="scope.row.isRulesSet && ruleForm.dataTypeShow=='Boolean'" v-model="scope.row.value"
              :label-in-value="true" clearable placeholder="请选择布尔值">
              <el-option v-for="item in booleanOption" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>

            <span v-if="!scope.row.isRulesSet ">{{ scope.row.value }}</span>
          </template>
        </el-table-column>

        <el-table-column prop=" label" label="描述">
          <template slot-scope="scope">
            <el-input size="mini" v-if="scope.row.isRulesSet" v-model="scope.row.label" clearable placeholder="请输入描述">
            </el-input>
            <span v-else>{{ scope.row.label }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="规则操作">
          <template slot-scope="scope">
            <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;"
              @click="changeTable(scope.row, scope.$index, true)">
              {{ scope.row.isRulesSet ? "保存" : "修改" }}
            </span>
            <span v-if="!scope.row.isRulesSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"
              @click="deleteTable(scope.$index, scope.row)">
              删除
            </span>

            <!--     <span v-if="scope.row.isRulesSet" class="el-tag  el-tag--mini" style="cursor: pointer;"
              @click="cancelRulesTable(scope.row, scope.$index, false)">
              取消
            </span> -->
          </template>
        </el-table-column>

      </el-table>

      <el-row class="menu-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="clickConfirm" :disabled="riskDictValueList.length==0">提交
          </el-button>
          <el-button size="small" @click="clickCancel">返回</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import Api from "../utils/api";
  import dataTypeDictdata from "@/views/risk/dictdata/dataType"; //导入操作符正常值选项
  import booleanDictdata from "@/views/risk/dictdata/operatorSymbolBoolean"; //导入操作符正常值选项

  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object //父页面每块区域业务数据
    },
    components: {
      // editTableItem
    },
    data() {
      return {
        addCount: 1,
        ruleForm: {
          dataType: "", //数据类型
          dataTypeShow: "", //数据类型显示
          dictCode: "", //字典代码
          dictName: "", //字典名称
          status: "1", //状态
        },
        rules: {
          dictCode: [{
            required: true,
            message: "该控件必填",
            trigger: "blur"
          }],
          dictName: [{
            required: true,
            message: "该控件必填",
            trigger: "blur"
          }],
          dataTypeShow: [{
            required: true,
            message: "请填写数据类型",
            trigger: "blur",
          }],
          status: [{

          }]
        },
        isShowSaveBtn: false, //是否显示保存按钮
        editUrl: "/views/risk/risk_score_card/risk_score_card_edit.json",
        cParams: this.cParentParams,
        dataList: "",
        dataTypeOption: [],
        booleanOption: [],
        riskDictValueList: [],
        placeholderText: '',
        currentPage: 1, //当前页码
        pageSize: 100, //每页条目数
        totalSize: '', //总和条目数

      };
    },
    mounted() {
      console.log('父类传过来的数据 ', this.cParentParams);
      if (this.cParentParams.dictName) {
        this.ruleForm.dataType = this.cParentParams.dataType; //数据类型
        this.ruleForm.dataTypeShow = this.cParentParams.dataType; //数据类型
        this.ruleForm.dictCode = this.cParentParams.dictCode; //字典代码
        this.ruleForm.dictName = this.cParentParams.dictName; //字典名称
        this.ruleForm.status = this.cParentParams.status; //状态
        this.riskDictValueList = this.cParentParams.riskDictValueList; //枚举值列表
      }
      this.dataTypeOption = dataTypeDictdata.data;
      this.booleanOption = booleanDictdata.data;
      this.setPlaceholder(this.ruleForm.dataType);
    },
    methods: {
      inputValueEven(e, row) {
        let value = e;
        console.log("输入值==" + e, "类型值===" + this.ruleForm.dataType);
        if (this.ruleForm.dataType === 'Int') {
          //一般情况下只能输入整数
          row.value = value.replace(/\D/g, '')
        }

        if (this.ruleForm.dataType === 'Decimal') {
          //只能输入数字不能输入小数点
          row.value = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/,
            '$1$2.$3');
        }

        // this.itemData.leftValue = this.normalInput.constantInputValue;
      },

      addTable() {
        console.log("", "新增枚举");
        console.log(this.riskDictValueList);
        //新增的时候判断是否有已经保存
        if (this.riskDictValueList.length > 0) {
          for (let i of this.riskDictValueList) {
            if (i.isRulesSet) {
              this.$message.warning("请先保存当前编辑项");
              return;
            }
          }
        }

        let sortNo = this.riskDictValueList.length === 0 ? '1' : parseInt(this.riskDictValueList[this.riskDictValueList
          .length - 1].sortNo) + 1 + "";
        let row = {
          createTime: '',
          createUser: '',
          isRulesSet: 'false',
          label: '',
          sortNo: sortNo,
          updateTime: '',
          updateUser: '',
          value: '',
        }
        this.riskDictValueList.push(row);
      },
      //修改
      changeTable(row, index, cg) {
        console.log("修改按钮输出", row, index, cg);

        //点击修改 判断是否已经保存所有操作
        for (let i of this.riskDictValueList) {
          if (i.isRulesSet && i.sortNo !== row.sortNo) {
            this.$message.warning("请先保存当前编辑项");
            return;
          }
        }

        if (row.label === "" || row.value === "") {
          this.$message.warning("表格内容不能为空");
          return;
        }


        //保存提交
        if (row.isRulesSet) {
          //枚举值重复检查
          let filter = this.riskDictValueList.filter(obj => obj.value === row.value)
          if (filter.length > 1) {
            this.$message.warning("枚举值重复，请检查！");
            return;
          }
          row.isRulesSet = false;
        } else { //修改
          row.isRulesSet = true;
        }
        this.riskDictValueList = Object.assign([], this.riskDictValueList); //主动刷新表格数据
      },
      deleteTable(index, row, cg) {
        console.log("删除行输出", row, index, cg);
        this.riskDictValueList.splice(index, 1);
      },
      CancelTable(row, index, cg) {

      },

      //数据类型修改
      dataTpyeChange(e) {
        console.log('数据类型修改', e);
        if (this.riskDictValueList.length > 0) {
          this.$confirm('修改数据类型会清空枚举值列表，是否继续操作', '提示', {
            confirmButtonText: '确定删除',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.ruleForm.dataType = e; //数据类型
            this.ruleForm.dataTypeShow = e; //数据类型
            this.riskDictValueList = []
          }).catch(() => {
            this.ruleForm.dataTypeShow = this.ruleForm.dataType; //数据类型
          });
        } else {
          this.ruleForm.dataType = e; //数据类型
          this.ruleForm.dataTypeShow = e; //数据类型
        }
        this.setPlaceholder(this.ruleForm.dataType);
      },
      //状态单选按钮选择
      statusChange(e) {
        console.log('状态改变', e);
      },
      setPlaceholder(dataType) {
        switch (dataType) {
          case 'String':
            this.placeholderText = '请输入字符串类型值';
            break;
          case 'Int':
            this.placeholderText = '请输入整数类型值';
            break;
          case 'Decimal':
            this.placeholderText = '请输入数值类型值';
            break;
        }
        console.log(this.placeholderText);
      },
      //提交按钮
      clickConfirm() {
        for (let i of this.riskDictValueList) {
          if (i.isRulesSet) {
            this.$message.warning("请先保存当前编辑项");
            return;
          }
        }
        let userInfo = JSON.parse(localStorage.getItem('user_info'));
        //根据实际情况，自己改下啊
        this.riskDictValueList.map(i => { //i表示一行数据
          i.updateUser = userInfo.userCode;
          i.dataType = this.ruleForm.dataType;
          i.dictCode = this.ruleForm.dictCode;
          i.dictName = this.ruleForm.dictName;
          i.status = this.ruleForm.status;
          return i;
        });

        this.$http
          .invokeAPI("/API" + Api.risk_dict_add_list, "POST", this.riskDictValueList)
          .then(obj => {
            if (obj.code === "200") {
              this.$message.success("成功");
              this.$emit("closeEditDialog", this.ruleForm);
              this.$dataBus.doCallBack(this, obj);
            } else {
              this.$message.warning("失败");
            }
          })
          .catch(reg => {});
      },
      //返回按钮
      clickCancel() {
          this.$dataBus.doCallBack(this, {});
      },

    }
  };
</script>

<style lang="css" scoped>
  .page_content {
    margin-bottom: 20px;
  }

  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
    margin-bottom: 20px;
  }

  .addBtn {
    margin-bottom: 10px;
  }

  .table_content {
    padding: 3px;
    margin-bottom: 10px;
  }

  .divBtn {
    width: 99%;
    text-align: right;
    padding-bottom: 5px;

  }

  .menu-footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
