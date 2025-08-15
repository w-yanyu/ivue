<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="selectForm"
          :rules="selectFormRules"
          ref="selectForm"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
             <el-col :span="6">
                <el-form-item  label="区域中心" prop="branchNo">
                  <el-select v-model="selectForm.areaCenter" @change="saveTypeChange" clearable>
                    <el-option v-for="(item, index) in orgList"
                     :default="isdefault" 
                    :key="index" :label="item.brachName"
                               :value="item.branchNo">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span="6">
              <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="selectForm.lncfno"  class="input" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户姓名" prop="acctna">
                <el-input v-model="selectForm.acctna" class="input" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="证件号码" prop="idtfno">
                <el-input v-model="selectForm.idtfno" class="input" clearable></el-input>
              </el-form-item>
            </el-col>
              <el-col :span="6">
              <el-form-item label="当前委案机构" prop="nowvorg">
                <el-select v-model="selectForm.nowvorg" placeholder="请选择当前委案机构" clearable>
                  <el-option
                    v-for="(item, index) in nowvorgList"
                    :key="index"
                    :label="item.entrorgnm"
                    :value="item.entrorg"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item :label="$i18ns('申请时间')" :prop="gmt_create">
                  <el-date-picker
                    v-model="selectForm.gmt_create"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller" icon="el-icon-search">查询</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
          <el-table-column label="区域中心" prop="areaCenterName" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请单编号" prop="applid" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="客户名称" prop="acctna" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="证件号码" prop="idtfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="借据号" prop="lncfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="委案时间" prop="entrtime" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="委案金额" prop="entramt" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('申请人')" prop="tranus" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('申请时间')" prop="gmt_create" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="案件承办机构" prop="entrorgnm" align="center"  :formatter="formatNowvorgData" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
        <el-pagination
          v-if="tableData.length>0"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20]"
          :page-size="tableSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
export const selectFormRules = {};
export default {
  name: "Weianqindanhistory",
  data() {
    return {
      nowvorgList:[],
      city_noList: [], //网点列表
      tableData: [], //表格数据
      selectForm: {
        areaCenter: "",
        areaCenterName:"",
        applid: "",
        lncfno: "",
        nowvorg:"",
        acctna: "",
        idtfno: "",
        branchNo:"",
        entrorg: "",
        gmt_create:"",
        starts_date:"",
        ends_date:"",
      },
      currentPage: 1,
      tableTotal: -1,
      tempselectForm: [], //查询
      tableSize: 10,
      selectFormRules,
      resultShow: false, //是否展示详情
      //----------------下拉框字典---------//
      area_noLocal: "",
      orgList:[],//区域中心
      caseResultList: [], //诉讼结果字典
      areaCenterList: [],
      entruststusList: [],
      suit_statusList: [],
      entrorgtypeList: [],
      paystatuList:[],
      paystatuLists:[],
      entrorgList:[],
      entrorgcity:[],
      isdefault: "",
      temarea: "", //临时区域中心
    };
  },
  created() { 
    
  },
   mounted(){
    this.getDictList("E_SUITRESULT", "caseResultList"); //诉讼结果字典
    this.getDictList("E_ENTRUSTSTUS", "entruststusList"); //委案状态字典
    this.getDictList("E_SUITSTUS", "suit_statusList"); //案件诉讼状态字典
    this.getDictList("E_ORGTYPES", "entrorgtypeList"); //机构类型
    this.getDictList("E_YES___", "paystatuList"); //是否法诉
    this.getDictList("E_YES___", "paystatuLists"); //是否法诉
    this.getOrgList();
    this.saveTypeChange();
  },
  methods: {
  
      //选择区域中心触发承办机构查询
          saveTypeChange() {
           
           if (this.selectForm.areaCenter == "" || this.selectForm.areaCenter == null) {
            this.$refs.selectForm.resetFields();
           this.temarea = JSON.parse(localStorage.getItem("user_info")).branch_id;
          // 
           this.getEntrorgList();
        }
        else{
          this.$refs.selectForm.resetFields();
          this.temarea = this.selectForm.areaCenter;
          this.getEntrorgList()
        }
         },
     /**
       * 查询列表
       */
      getTableData() {
       let params2 = {
                servicecode: "pl0524",
                areaCenter:this.selectForm.areaCenter,
                 lncfno : this.selectForm.lncfno,
                 acctna : this.selectForm.acctna,
                 entrorg : this.selectForm.nowvorg,
                 starts_date:this.selectForm.gmt_create[0],
                 ends_date:this.selectForm.gmt_create[1],
                 idtfno:this.selectForm.idtfno,
                  isbacked:"1",
                 start: this.currentPage,
                 length: this.tableSize,
            }
             MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" && response.data ) {
                   this.tableData=response.data;
                   this.isShowPage = true;
                   this.tableTotal = response.pageParam ? response.pageParam.total : 0;

                }
            }).catch(err1 => {
                console.error(err1);
            })

        },

        /**
     *获取委案机构字典列表
     *
     */
    getEntrorgList() {
        let params = {
          servicecode: "RLMSPLTS1121", 
           areaCenter: this.temarea,        
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              console.log(res.data,"data")
              this.nowvorgList = res.data;
              
            }
          })
          .catch(err => {
            console.error(err);
          });
      },

 /**
     *
     * 列表值转换
     */
    transformValue(list, val) {
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
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
    formatNowvorgData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.entrorgList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
      formatNowvorgcity(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.entrorgcity.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    
     formatNowvorgDatas(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.paystatuList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },

     formatNowvorgDatass(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.paystatuLists.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatEntrustusData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.entruststusList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatSuitstusData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.suit_statusList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
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
      this.$refs.selectForm.validate(valid => {
        if (valid) {
          this.tempselectForm = _.cloneDeep(this.selectForm);
          this.currentPage = 1;
          this.getTableData();
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          });
        }
      });
    },
 reset(){
        console.log(this.selectForm,"this.selectForm")
      Object.keys(this.selectForm).forEach(key => {
            this.selectForm[key]='';
        }) 
        this.$refs.selectForm.resetFields();
        this.saveTypeChange();
 },
 getOrgList() {
        let params = {
          servicecode: "RLMSPLTS1068", 
               
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.orgList = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
  }
};
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
  text-align: right;
  padding: 0 0 10px 0;
}
.el-dialog-dev {
  max-height: 70vh;
  overflow: auto;
}
.export-button-style {
  background: #6ac044 !important;
  border-color: #6ac044 !important;
}
</style>