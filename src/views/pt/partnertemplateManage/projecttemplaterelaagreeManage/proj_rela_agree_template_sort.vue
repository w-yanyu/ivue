<template>
  <div>
    <div class="container-content">
      <div>
        <el-row class="button-bar" style="margin-left: 12px; margin-top: 12px">
          <el-col :span="6">
            <el-button type="success" @click="upRow(tableData, tableRadio)" icon="el-icon-top"></el-button>
            <el-button type="success" @click="downRow(tableData, tableRadio)" icon="el-icon-bottom"></el-button>
            <el-button type="primary" @click="submit" icon="el-icon-folder-add">{{$i18ns('保存')}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="container-centent--table">
        <el-table
          ref="sortedTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          stripe
        >
          <el-table-column :label="$i18ns('选择')" width="55">
            <template slot-scope="scope">
              <el-radio v-model="tableRadio" :label="scope.row"><i></i></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号">

          </el-table-column>
          <el-table-column
            label="项目模版编号"
            prop="project_template_no"
            v-show="false"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="项目模版名称"
            prop="project_mould_name"
            v-show="false"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="协议模版编号"
            prop="protocol_template_no"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="协议模版名称"
            prop="mould_name"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="协议类型"
            prop="agree_type"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <!--              <el-radio  v-model="tableRadio" :label="scope.row"><i></i></el-radio>-->
              <span>{{dictFormat(agreeTypeList, scope.row.agree_type)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from 'pte-ui/utils/MyMessage'

export default {
  name: "projSAgreeTemplatePageSort",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      tableData: [], //表格数据
      tableRadio: {}, //选中行数据
      agreeTypeList: [], //申请类型字典

      servicecode: "" ,// 父页面传来的查询关联关系交易码
      project_template_no:"",
      protocol_template_no: "",
      protocol_template_version: "",
      version:""
    }
  },
  created() {
    this.servicecode = this.cParentParams.servicecode;
    this.project_template_no = this.cParentParams.project_template_no;
    this.version = this.cParentParams.version;

    this.getDictList("PT_E_AGREE_TYPE", "agreeTypeList");
    this.getTableData();
  },
  methods: {
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    dictFormat(dictList, value) {
      console.log("list", dictList);
      console.log("value", value);
      let name = "";
      dictList.forEach(function (temp) {
        if (temp.dictId === value) {
          name = temp.dictName;
          return;
        }
      })
      return name;
    },

    /**
     * 获取列表数据
     */
    getTableData() {
      let reqMap = {
        project_template_no: this.project_template_no,
        version: this.version,
        servicecode: this.servicecode
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          this.tableData = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    // 上移行数据
    upRow(tableData, rowData) {
      let index;
      for (let i = 0; i < tableData.length; i++) {
        if (rowData.protocol_template_no === tableData[i].protocol_template_no && i >= 1) {
          let temp = tableData[i - 1];
          tableData.splice(i - 1, 1, tableData[i]);
          tableData.splice(i, 1, temp);
          return;
        }
      }
    },
    // 下移行数据
    downRow(tableData, rowData) {
      let index;
      for (let i = 0; i < tableData.length; i++) {
        if (rowData.protocol_template_no === tableData[i].protocol_template_no && i < tableData.length - 1) {
          let temp = tableData[i];
          tableData.splice(i, 1, tableData[i + 1]);
          tableData.splice(i + 1, 1, temp);
          return;
        }
      }
    },
    /**
     * 保存列表数据
     */
    submit() {
      let submitCode = "";
      if(this.servicecode == 'pt0144'){
        submitCode = "pt0146"
      }else{
        submitCode = "pt0145"
      }
      // 设置序号
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].sort_no = i;
      }
      let reqMap = {
        selectedList: this.tableData,
        servicecode: submitCode
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          MyMessage({
            message: "保存成功",
            type: "success",
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
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
    margin-right: 25px;
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
</style>
