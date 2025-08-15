<template>
  <div>
    <div class="container-content">
      <div class="el-dialog-dev" >
        <div class="container-content">
          <div class="container-content--search">
            <el-button type="primary" @click="addLast()" plain>新增区域佣金规则</el-button>
          </div>
          <div class="container-centent--table">
            <el-table ref="modifyTable" :data="tableData" :border="true" stripe >
              <el-table-column label="产品大类" prop="prod_type"  align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-select v-model="scope.row.prod_type" v-if="scope.row.status"  placeholder="请选择产品大类">
                    <el-option  v-for="(item, index) in prodTypeList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                  </el-select>
                  <span v-else>{{scope.row.prodTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="账龄" prop="acct_duration" width="300" align="center">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.acct_duration_list" multiple v-if="scope.row.status"  placeholder="请选择账龄">
                    <el-option  v-for="(item, index) in acctDurationList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                  </el-select>
                  <span v-else>{{scope.row.acct_duration}}</span>
                </template>
              </el-table-column>
              <el-table-column label="最小回收率%(不包含)" prop="min_recovery_rate" width="170" align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.min_recovery_rate" :min="0" :max="100" label="最小回收率"  v-if="scope.row.status"></el-input-number>
                  <span v-else>{{scope.row.min_recovery_rate}}</span>
                </template>
              </el-table-column>
              <el-table-column label="最大回收率%(包含)" prop="max_recovery_rate" width="150" align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.max_recovery_rate" :min="0" :max="100" label="最大回收率"  v-if="scope.row.status"></el-input-number>
                  <span v-else>{{scope.row.max_recovery_rate}}</span>
                </template>
              </el-table-column>
              <el-table-column label="佣金比率%" prop="comm_rate" width="130" align="center">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.comm_rate" :min="0" :max="100" label="佣金比率"  v-if="scope.row.status"></el-input-number>
                  <span v-else>{{scope.row.comm_rate}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" @click="scope.row.status=true">修改</el-button>
                  <el-button type="text" icon="el-icon-check" @click="saveRow(scope.$index,scope.row)">{{$i18ns('保存')}}</el-button>
                  <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.$index,scope.row)">{{$i18ns('删除')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">{{$i18ns('取消')}}</el-button>
                <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
       </span>
  </div>
  </div>
</template>


<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import _ from "lodash";

  export default {
    name: "quarterManagement",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
      return{
        min_recovery_rate:0,
        max_recovery_rate:0,
        tableData:[], //总部委案所有列表数据
        tableModifyData:[], //策略修改后的数据
        strategyModelVisible:false, //修改界面
        branchIdList:[],//机构字典
        acctDurationList:[], //账龄字典
        prodTypeList:[],//产品大类字典
      }
    },
    created() {
      this.getDictList("E_STRATEGY_TYPE","branchIdList");  //机构字典
      this.getDictList("E_ACCT_DURATION","acctDurationList");  //账龄字典
      this.getDictList("E_PRODTYPE","prodTypeList");  //账龄字典
      this.queryHeadStrategy();
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
      /**
       * 查询生效策略
       */
      queryHeadStrategy(){
        let params2 = {
          servicecode: "RLMSPLTS1208_pl1208",
          applid:this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
          if (response && response.code === "200" ) {
            response.data.forEach(item=>{
              let strategy={};
              strategy.applid = item.applid;
              strategy.prodTypeName =this.getDictName(item.prod_type,this.prodTypeList);
              strategy.prod_type =  item.prod_type;
              strategy.regional_center_name =  item.regional_center_name;
              strategy.regional_center =  item.regional_center;
              strategy.acct_duration = item.acct_duration;
              strategy.acct_duration_list =  item.acct_duration.split(',');
              strategy.min_recovery_rate = item.min_recovery_rate;
              strategy.max_recovery_rate = item.max_recovery_rate;
              strategy.comm_rate = item.comm_rate;
              strategy.status = false;
              this.tableData.push(strategy);
            })
          }
        }).catch(err1 => {
          console.error(err1);
        })

      },

      /**
       * 取消修改策略
       */
      handleClose(){
        this.$confirm("是否取消未提交的修改申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableData = [];
          this.queryHeadStrategy();
        })
      },
      submit(){
        let existModify = false;
        this.tableData.forEach(item=>{
          if(item.status==true){
            existModify = true;
          }
        })
        if(existModify){
          this.$message({type: "warning", message: "存在未保存的规则修改，请保存后提交!"});
          return;
        }else{
          this.requestRlms();
        }

      },
      requestRlms(){
        let params2 = {
          servicecode: "RLMSPLTS1204_pl1204",
          regionalCommRulesList: this.tableData,
          applid:this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
          if (response && response.code === "200" ) {
            this.$message({type: "success",message: response.message});
          }
        }).catch(err1 => {
          console.error(err1);
        })
      },
      /**
       * 新增行数据
       */
      addLast(){
        let addData = {
          performance_attr:"",
          prod_type:"",
          acct_duration:[],
          min_recovery_rate:"",
          max_recovery_rate:"",
          comm_rate:"",
          status:true,
        };
        this.tableData.push(addData);
        this.$message({
          type: "success",
          message: "添加成功！"
        })
      },

      /**
       * 保存行数据
       */
      saveRow(index,row){
        if(!row.status){
          this.$message({type: "warning", message: "请先修改再保存！"});
          return;
        }
        if(!row.prod_type || row.prod_type.length===0){
          this.$message({type: "warning", message: "请选择产品大类！"});
          return;
        }
        if(!row.acct_duration_list || row.acct_duration_list.length===0){
          this.$message({type: "warning", message: "请选择账龄！"});
          return;
        }
        if(!row.max_recovery_rate || row.max_recovery_rate.length===0){
          this.$message({type: "warning", message: "请输最大回收率！"});
          return;
        }
        if(!row.comm_rate || row.comm_rate.length===0){
          this.$message({type: "warning", message: "请输入佣金比率！"});
          return;
        }
        row.prodTypeName =this.getDictName(row.prod_type,this.prodTypeList) ;
        row.acct_duration = row.acct_duration_list.join(',')
        this.tableData[index] = row;
        this.tableData[index].status = false;
        this.$message({
          type: "success",
          message: "保存成功！"
        })
      },
      /**
       * 删除行数据
       */
      deleteRow(index,row){
        this.tableData.splice(index,1);
        this.$message({
          type: "success",
          message: "删除成功！"
        })

      },
      /**
       * 获取字典名称
       */
      getDictName(dictId,dictList){
        let dictType = {};
        dictType = dictList.find(item=>{return item.dictId===dictId;})
        return dictType.dictName;
      },
    }
  }
</script>


<style lang="less" scoped>
  .container-content {
    .container-content--search {
      padding: 16px 40px 0 12px;
      border-bottom: 0px solid #e3e8f5;
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
      bottom:60px;
    }
  }
  .el-dialog-dev{
    max-height:60vh;
    overflow:auto;
  }

</style>
