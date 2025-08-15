<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form :model="checkForm" ref="checkForm" label-width="150px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="申请编号"  prop="applid" v-show="isShow">
                <el-input v-model="checkForm.applid" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借据号"  prop="lncfno" >
                <el-input v-model="checkForm.lncfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务类型" prop="type" v-show="isShow">
                <el-select v-model="checkForm.type" placeholder="请选择业务类型">
                  <el-option
                    v-for="(item, index) in typeList"
                    :key="index"
                    :label="item.dictId+'-'+item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller">查询</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
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
            label="申请编号"
            prop="applid"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="借据号"
            prop="lncfno"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="停催类型"
            prop="type"
            align="center"
            :formatter="formatTypeData"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="校验结果"
            prop="result"
            align="center"
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
    name: "batchDataCheckList",
    props: {
      applId: "",
      applyType: "",
      hiddenFlag : false,
    },
    data(){
      return{
        tableData: [], //表格数据
        isShowPage:false,
        checkForm:{
          applid: this.applId,
          type: this.applyType,
          lncfno: "",
        },
        isShow : !this.hiddenFlag,
        currentPage: 1,
        tableTotal: 10,
        tempForm: [],  //查询
        typeList:[],  //停催类型字典
        tableSize: 10,
      }
    },
    created() {
      this.getDictList("E_BATCH_APPLY_TYPE","typeList");
      if(this.applId){
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
      reset() {
        this.$refs.checkForm.resetFields();
      },
      /**
       * 获取列表数据
       */
      getTableData() {
        let reqMap = {
          applid: this.checkForm.applid,
          lncfno: this.checkForm.lncfno,
          type: this.checkForm.type,
          servicecode: "RLMSPLTS1040",
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
