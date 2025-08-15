<template>
  <div class="">
    <el-form :inline="true" :model="searchParams" class="demo-form-inline" label-width="80px">
      <el-row  type="flex" class="row-bg" justify="center">

      <el-form-item label="部件ID">
        <el-input v-model="searchParams.cmpt_id" placeholder="请输入部件ID"></el-input>
      </el-form-item>

      <el-form-item label="部件名称">
        <el-input v-model="searchParams.cmpt_nm" placeholder="请输入部件名称"></el-input>
      </el-form-item>

      </el-row>
      <el-row   type="flex" class="row-bg" justify="center">
        <el-form-item label="部件分类" >
        <el-select v-model="searchParams.loan_cmpt_clasf" placeholder="部件分类">
          <el-option   v-for="(item, index) in cmpt_clasflist"
                       :key="index"
                       :label="item.dictName"
                       :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="部件状态">
          <el-select v-model="searchParams.loan_cmpt_ste" placeholder="请选择部件状态">
            <el-option   v-for="(item, index) in cmpt_stelist"
                         :key="index"
                         :label="item.dictName"
                         :value="item.dictId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <div  class="search-box">
        <el-button type="primary" @click="getTableData">查询</el-button>
        <el-button type="primary" @click="reSet">{{$i18ns('重置')}}</el-button>
      </div>

    </el-form>
    <el-table :data="tableData" border stripe highlight-current-row
              height="480px" @select="selectChange" ref="multipleTable" style="width: 100%;">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column label="部件ID" >
      <template slot-scope="scope">
        <span>{{scope.row.cmpt_id}}</span>
      </template>
    </el-table-column>
      <el-table-column label="部件名称" >
        <template slot-scope="scope">
          <span>{{scope.row.cmpt_nm}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部件描述"  >
        <template slot-scope="scope">
          <span>{{scope.row.cmpt_dsc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部件对象"  >
        <template slot-scope="scope">
          <span>{{getDictValue("cmpt_objlist",scope.row.cmpt_obj)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部件分类"  >
        <template slot-scope="scope">
          <span>{{getDictValue("cmpt_clasflist",scope.row.loan_cmpt_clasf)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="依赖部件ID"  >
        <template slot-scope="scope">
          <span>{{scope.row.depc_cmpt_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排斥部件ID"  >
        <template slot-scope="scope">
          <span>{{scope.row.excl_cmpt_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款币种规则"  >
        <template slot-scope="scope">
          <span>{{getDictValue("ccy_rulelist",scope.row.loan_ccy_rule)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="指定币种"  >
        <template slot-scope="scope">
          <span>{{getDictValue("asgn_ccylist",scope.row.asgn_ccy)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部件状态">
        <template slot-scope="scope">
          <span>{{getDictValue("cmpt_stelist",scope.row.loan_cmpt_ste)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.start"
        :page-size="searchParams.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <div  class="search-box">
      <el-button type="primary" @click="submit()">提交</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  name: "ProductPartChoose",
  data() {
    return {
      tableData: [], // 查询数据
      searchParams:{
        servicecode: "ln3250",
        outlistid: "lstKlnf_cmpt",
        cmpt_id:'',
        cmpt_nm:'',
        loan_cmpt_clasf:'',
        loan_cmpt_ste:'01',
        start:1,
        length:10
      },
      cmpt_objlist:[],//部件对象字典
      cmpt_clasflist:[],//部件分类字典
      ccy_rulelist:[],//币种规则字典
      asgn_ccylist:[],//币种字典
      cmpt_stelist:[],//部件状态字典
      totalCount:null,//总条数
      multipleSelection:[],//选中的数据
      selectAllIds:[],
      idKey:"cmpt_id",
      idstring:""//返回的字符串
    };
  },

  created() {
    this.getDict("LN_E_CMPT_OBJ","cmpt_objlist");
    this.getDict("LN_E_LOAN_CMPT_CLASF","cmpt_clasflist");
    this.getDict("LN_E_CCY_RULE","ccy_rulelist");
    this.getDict("LN_E_LOAN_CMPT_STE","cmpt_stelist");
    this. getDict("MS_CURRENCY","asgn_ccylist");
  },
  methods: {
    getDictValue(listkey,id){
            var dictList=this[listkey];
            for(var i=0;i<dictList.length;i++){
              if(dictList[i].dictId==id){
                return dictList[i].dictName;
              }
            }
    },
    getDict(type,listkey){
      let params = {
        dictType: type,
        dictKey: [type]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listkey]=res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getTableData(){
        var params = this.searchParams;
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
             this.tableData = res.data;
             this.totalCount=res.pageParam.total;
              setTimeout(()=>{
                this.setSelectRow();
              }, 200)
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
    //重置
    reSet(){
      this.searchParams.cmpt_id='',
      this.searchParams.cmpt_nm='',
      this.searchParams.loan_cmpt_clasf=''
      this.searchParams.loan_cmpt_ste='01'
    },
    //分页
    handleSizeChange(val) {
      this.searchParams.length=val;
      this.getTableData()

    },
    handleCurrentChange(val) {
      this.searchParams.start=val;
      this.getTableData()
    },
    //获取选中数据
    selectChange(val){
      this.multipleSelection = val;
    },
    //选中数据
    setSelectRow() {
      let that=this;
      if (!that.selectAllIds || that.selectAllIds.length <= 0) {
        return;
      }
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      this.$refs.table.clearSelection();
      for(var i = 0; i < this.tableData.length; i++) {
        if (that.selectAllIds.indexOf(this.tableData[i][idKey]) >= 0) {
          // 设置选中，记住table组件需要使用ref="table"
          this.$refs.table.toggleRowSelection(this.tableData[i], true);
        }
      }
    } ,
    // 记忆选择核心方法
    changePageCoreRecordData () {
      // 标识当前行的唯一键的名称
      let idKey = this.idKey;
      let that = this;
      // 如果总记忆中还没有选择的数据，那么就直接取当前页选中的数据，不需要后面一系列计算
      if (that.selectAllIds.length <= 0) {
        this.multipleSelection.forEach(row=>{
          that.selectAllIds.push(row[idKey]);
        })
        return;
      }
      // 总选择里面的key集合
      let selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row=>{
        selectIds.push(row[idKey]);
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (that.selectAllIds.indexOf(row[idKey]) < 0) {
            that.selectAllIds.push(row[idKey]);
        }
      })
      let noSelectIds = [];
      // 得到当前页没有选中的id
      this.tableData.forEach(row=>{
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey]);
        }
      })
      noSelectIds.forEach(id=>{
         var index=this.selectAllIds.findIndex(item=>{
           if(item.id==id){
             return true;
           }
         })
        that.selectAllIds.slice(index,1)
      })
      for(let i=0;i<that.selectAllIds.length;i++){
        if(i=0){
          that.idstring= that.selectAllIds[i]
        }else{
          that.idstring= that.idstring+","+that.selectAllIds[i];
        }


      }
      let data = this.$dataBus.getParentScope(this);
      data.form.depc_cmpt_id = this.idstring;
      this.$dataBus.updataCurrentScope(this,data);
      console.log(data,that.selectAllIds,that.idstring,99999);
    },
    submit(){
      this.changePageCoreRecordData();
    }
    }
};
</script>
<style lang="less" scoped>
.el-select{
  width: 180px;
}
.search-box{
  display: flex;
}
.el-form-item{
width: 30%;
}
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }
}
.formStyle {
  margin: 10px 0px 30px 100px;
  border: 1px solid #d8dde9;
  border-radius: 10px;
  // position: relative;

}
.title {
  width: 160px;
  line-height: 20px;
  text-align: center;
  font-size: 13px;
  color: #697b8c;
  position: absolute;
  top: 0px;
  z-index: 1000;
  left: 50%;
  background: #fff;

}
.caSeq-table {
  padding: 30px  10px 20px 10px ;
}
</style>
