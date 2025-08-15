<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form :model="queryForm" ref="queryForm" label-width="150px" class="custom-common--form">
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          stripe
        >
          <el-table-column
            label="变更项"
            prop="change_item"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="变更前"
            prop="change_before"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="变更后"
            prop="change_after"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="变更情况说明"
            prop="remark"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="$i18ns('申请人')"
            prop="appl_user"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="$i18ns('申请时间')"
            prop="appl_date"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="申请状态"
            prop="appl_status"
            align="center"
            :formatter="formatTypeData"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
        <el-pagination v-show="isShowPage"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,15,20]"
                       :page-size="tableSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableTotal">
        </el-pagination>
      </div>
    </div>

  </div>
</template>


<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import _ from "lodash";

  export default {
    name: "changeHisList",
    props: {
      oaOrgId: "",
      applyType: "",
    },
    data(){
      return{
        tableData: [], //表格数据
        isShowPage:false,
        queryForm:{
          oa_org_id: this.oaOrgId,
          type: this.applyType,
        },
        currentPage: 1,
        tableTotal: 10,
        typeList:[],  //停催类型字典
        tableSize: 10,
      }
    },
    created() {
      this.getDictList("E_APLSTUS","typeList");
      if(this.queryForm.oa_org_id){
        this.getTableData();
      }
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

      formatTypeData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.typeList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.getTableData();
      },
      /**
       * 分页currentChange回调
       */
      currentChange(val) {
        this.currentPage = val;
        this.getTableData();
      },
      /**
       * 查询
       */
      searchTeller() {
        this.getTableData();
      },
      /**
       * 获取列表数据
       */
      getTableData() {
        let reqMap = {
          oa_org_id: this.queryForm.oa_org_id,
          type: this.queryForm.type,
          servicecode: "RLMSPLTS1213",
          start: this.currentPage,
          length: this.tableSize,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.isShowPage = true;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;

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
    .container-content--toolbar{
      padding: 10px;
    }
    .container-content--pagination{
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
