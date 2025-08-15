<template>
  <div>
    <div class="container-content">
      <div>
        <el-form :model="form" ref="form" v-show="false">
          <el-form-item label="交易码:" prop="servicecode">
            <el-input type="textarea" v-model="form.servicecode"></el-input>
          </el-form-item>
        </el-form>

        <el-row class="button-bar" style="margin-left: 12px; margin-top: 12px">
          <el-col :span="6">
            <el-button type="success" @click="upRow(tableData, tableRadio)" icon="el-icon-top"></el-button>
            <el-button type="success" @click="downRow(tableData, tableRadio)" icon="el-icon-bottom"></el-button>
<!--            <el-button type="primary" @click="submit" icon="el-icon-folder-add">{{$i18ns('保存')}}</el-button>-->
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
          <el-table-column :label="选择" width="55">
            <template slot-scope="scope">
              <el-radio v-model="tableRadio" :label="scope.row"><i></i></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            :label="序号">

          </el-table-column>
          <el-table-column
            :label="页面编号"
            prop="page_template_no"
            align="center">
          </el-table-column>
          <el-table-column
            :label="页面名称"
            prop="page_template_name"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="申请类型"
            prop="apply_type_name"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="产品类型"
            prop="prod_type_name"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="是否必须"
            prop="must_flag"
            align="center"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <!--              <el-radio  v-model="tableRadio" :label="scope.row"><i></i></el-radio>-->
              <span>{{dictFormat(yesOrNoList, scope.row.must_flag)}}</span>
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
  name: "templatePageSort",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {

      选择:this.$i18ns("选择"),
      序号:this.$i18ns("序号"),
      页面编号:this.$i18ns("页面编号"),
      页面名称:this.$i18ns("页面名称"),
      申请类型:this.$i18ns("申请类型"),
      产品类型:this.$i18ns("产品类型"),
      是否必须:this.$i18ns("是否必须"),

      tableData: [], //表格数据
      tableRadio: {}, //选中行数据
      form: {
        servicecode: ""
      },
      prodTypeList: [],  //产品类型字典
      applyTypeList: [], //申请类型字典
      yesOrNoList: [], //申请类型字典
    }
  },
  created() {
    this.getDictList("MS_E_YESORNO", "yesOrNoList");
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

    // getProdcdList() {
    //   let params = {
    //     servicecode: "AS_ICMS_PD_QRPDLS",
    //     length: 100,
    //   }
    //   MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
    //     if (res && res.code === "200") {
    //       this.prodcdList = res.data;
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },

    /**
     * 获取列表数据
     */
    getTableData() {
      let reqMap = {
        apply_type: this.cParentParams.apply_type,
        prod_type: this.cParentParams.prod_type,
        template_id: this.cParentParams.template_id,
        prod_version: this.cParentParams.prod_version,
        servicecode: "pd0159"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          this.tableData = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
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
    // 上移行数据
    upRow(tableData, rowData) {
      let index;
      for (let i = 0; i < tableData.length; i++) {
        if (rowData.page_template_no === tableData[i].page_template_no && i >= 1) {
          let temp = tableData[i - 1];
          tableData.splice(i - 1, 1, tableData[i]);
          tableData.splice(i, 1, temp);

          //排序完成后提交排序队列
          this.submit();
          return;
        }
      }
    },
    // 下移行数据
    downRow(tableData, rowData) {
      let index;
      for (let i = 0; i < tableData.length; i++) {
        if (rowData.page_template_no === tableData[i].page_template_no && i < tableData.length - 1) {
          let temp = tableData[i];
          tableData.splice(i, 1, tableData[i + 1]);
          tableData.splice(i + 1, 1, temp);

          //排序完成后提交排序队列
          this.submit();
          return;
        }
      }
    },
    /**
     * 保存列表数据
     */
    submit() {
      // let sort = 0;
      // this.tableData.forEach(function (temp) {
      //   temp.sort_no = sort;
      //   sort++;
      // })
      let reqMap = {
        trans_type: 'UPDATE',
        template_id: this.cParentParams.template_id,
        prod_version: this.cParentParams.prod_version,
        selectedList: this.tableData,
        servicecode: "pd0158"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          // MyMessage({
          //   message: "保存成功",
          //   type: "success",
          // });
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
