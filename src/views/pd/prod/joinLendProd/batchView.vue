<template>
  <div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.trans"
              style="width: 100%"
              label-position="left"
              border
              class="demo-table-expand">
              <el-table-column
                label="批量交易码  "
                prop="tran_code">
              </el-table-column>
              <el-table-column
                label="批量交易中文名称"
                prop="tran_chinese_name">
              </el-table-column>
              <el-table-column
                label="执行标识"
                prop="execution_code"
                :formatter="formatTypeData">
              </el-table-column>
              <el-table-column
                label="是否文件批量"
                prop="is_batch_file"
                :formatter="formatTypeData">
              </el-table-column>
              <el-table-column
                label="步骤号"
                prop="step_id"
                :formatter="formatTypeData">
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="批量交易组ID"
          prop="tran_group_id">
        </el-table-column>
        <el-table-column
          label="交易组别中文描述"
          prop="tran_group_desc">
        </el-table-column>
        <el-table-column
          label="批量任务运行许可条件"
          prop="task_run_conditions">
        </el-table-column>
        <el-table-column
          label="批量任务运行回调服务"
          prop="task_run_callback_service">
        </el-table-column>
      </el-table>
    </div>
    <!--    <div>-->
    <!--      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" :inline="true">-->
    <!--        <el-form-item label="产品类型" prop="prod_type_name" span="12">-->
    <!--          <el-input-->
    <!--            placeholder=""-->
    <!--            v-model="ruleForm.prod_type_name"-->
    <!--            disabled="true"-->
    <!--            class="form-input">-->
    <!--          </el-input>-->
    <!--        </el-form-item>-->
    <!--      </el-form>-->
    <!--    </div>-->
    <div class="container-center">
      <el-button type="primary" @click="submitForm" class="form-button">提交同步</el-button>
    </div>
  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductAddFirst",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      sale_prod_cd: "",
      ruleForm: {
        template_name: "",
        template_id: "",
        template_version: "",
        prod_type: "",
        prod_type_name: "",
        cust_class: ""
      },
      tableData: [],
      isYESORNOList: []
    }
  },
  created() {
    this.sale_prod_cd = this.cParentParams.sale_prod_cd;
    //初始化字典
    this.getDictList("MS_E_YESORNO", "isYESORNOList");//获取数据字典MS_E_YESORNO
    this.initTableData();
  },
  methods: {
    /**
     * 表单提交
     */
    initTableData() {
      let that = this;
      let params = {
        servicecode: 'pd1585',
        sale_prod_cd: this.sale_prod_cd
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.tableData = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
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
    formatTypeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.isYESORNOList.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
    },

    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let trans = [];
      this.tableData.forEach(item => {
        trans = trans.concat(item.trans);
      })
      let params = {
        servicecode: 'pa0010',
        groups: this.tableData,
        trans: trans
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code == "200") {
          this.$message({
            type: "success",
            message: res.message
          })
          this.$dialog.close();
        }
      }).catch(err => {
        console.error(err);
      });
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

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
