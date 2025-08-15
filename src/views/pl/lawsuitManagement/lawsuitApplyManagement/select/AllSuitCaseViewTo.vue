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
              <el-form-item label="立案受理结果" prop="caseResult" >
                <el-select v-model="selectForm.caseResult" placeholder="请选择立案受理结果" clearable >
                  <el-option
                    v-for="(item, index) in caseResultList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委案状态" prop="entrust_status">
                <el-select v-model="selectForm.entrust_status" placeholder="请选择委案状态" clearable>
                  <el-option
                    v-for="(item, index) in entruststusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否法诉" prop="islgfe">
                <el-select v-model="selectForm.islgfe" placeholder="请选择委案状态" clearable>
                  <el-option
                    v-for="(item, index) in paystatuList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="案件诉讼状态" prop="suit_status">
                <el-select v-model="selectForm.suit_status" placeholder="请选择案件诉讼状态" clearable>
                  <el-option
                    v-for="(item, index) in suit_statusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
       <el-col :span="6">
            <el-form-item label="网点名称" prop="brachName" clearable>
              <el-select v-model="selectForm.brachName" clearable>
                <el-option
                   v-for="(item, index) in city_noList"
                  :key="index"
                  :label="item.brachName"
                  :value="item.brachName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller" icon="el-icon-search">查询</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
              <el-button
                type="primary"
                size="small"
                @click="exportAllToExcel"
                plain
                class="export-button-style"
              >
                <i class="iconfont icon-daochu"></i>导出
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
          <el-table-column label="区域中心" prop="areaCenterName" align="center" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column label="借据号" prop="lncfno" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="客户名称" prop="acctna" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="证件号码" prop="idtfno" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="产品名称" prop="prodna" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="当前委案状态"
            prop="entrust_status"
            align="center"
            :formatter="formatEntrustusData"
            width="150px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="网点名称" prop="handcitynm" align="center" width="150px"  :formatter="formatNowvorgcity" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前委案机构" prop="nowvorgnm" align="center"  width="150px" :formatter="formatNowvorgData" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前委案时间" prop="nowvtime" align="center" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前委案金额" prop="nowvamt" align="center" width="150px"  show-overflow-tooltip></el-table-column>
          <el-table-column label="是否法诉" prop="islgfe" align="center" width="150px" :formatter="formatNowvorgDatas" show-overflow-tooltip></el-table-column>
          <el-table-column label="是否关闭" prop="isclosed" align="center" width="150px" :formatter="formatNowvorgDatass" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="当前案件诉讼状态"
            prop="suit_status"
            align="center"
            :formatter="formatSuitstusData"
            show-overflow-tooltip
            width="150px"
          ></el-table-column>
          <el-table-column label="当前委案费用模式" prop="clenmode" width="150px" align="center" :formatter="formatclenmodeData" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前立案受理时间" prop="nowacctime" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前案件受理机构" prop="nowaccorg" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前开庭时间" prop="nowopentime" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前审判类型" prop="nowtritype"  width="150px" align="center" :formatter="formatsuitypeData" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前审判案号" prop="nowtrino" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前立案受理结果" prop="nowaccreslt" width="150px" align="center" :formatter="formatsuitresultData" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前执行受理时间" prop="exeacceptime" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前执行受理案号" prop="execaseno" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前执行受理结果" prop="zxfiletype" width="150px" align="center" :formatter="formatzxfiletypeData" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前起诉金额" prop="opinion_arrears" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="当前欠款本金" prop="exeacceptime" align="center" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="当前诉讼耗时(天)" prop="litigationTime" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="当前执行耗时(天)" prop="executionTime" width="150px" align="center" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column label="当前回款金额" prop="exeacceptime" align="center" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="操作" prop="info" fixed="right" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
            <el-button type="text" @click="searchDetailInfo(scope.row)">{{$i18ns('详情')}}</el-button>
            </template>
          </el-table-column>
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
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="resultShow"
      :width="dialogWidth"
      :append-to-body="true"
    >
      <div class="el-dialog-dev">
        <pte-resolver
          v-if="resultShow"
          :c-parent-meta="c_$meta"
          :c-parent-scope="c_$scope"
          :c-parent-params="c_$params"
          :to-request="toRequest"
        ></pte-resolver>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
//import { validateHandle } from "../fscommonComponets/fsCheckComponents";
import _ from "lodash";
export const selectFormRules = {};
export default {
  name: "AllSuitCaseView",
  data() {
    return {
      nowvorgList:[],
      city_noList: [], //网点列表
      tableData: [], //表格数据
      selectForm: {
        handcitynm:"",
        cities: [], // 所属城市
        city:"",
        brachName:"",
        branchNo:"",
        city_no:"",
        area_no:"",
        attn_name:"",
        areaCenter: "",
        areaCenterName:"",
        nowvorgnm:"",
        applid: "",
        lncfno: "",
        acctna: "",
        idtfno: "",
        handleorg: "",
        nowvorg: "",
        caseResult: "",
        exestus: "",
        prodna: "",
        suit_status: "",
        entrust_status: "",
        islgfe:""
      },
      currentPage: 1,
      tableTotal: -1,
      tempselectForm: [], //查询
      tableSize: 10,
      selectFormRules,
      resultShow: false, //是否展示详情
      dialogWidth: "80%", //弹框宽度
      dialogTitle: "详情",
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        lncfno: ""
      },
      toRequest: {
        url: "@SuitCaseInfo",
        method: "POST"
      },
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
      suitypeList:[],
      suitresultList:[],
      zxfiletypeList:[],
      clenmodeList:[],
    };
  },
  created() {
    //this.getEntrorgList();
    // this.isdefault = JSON.parse(localStorage.getItem("user_info")).branch_id;
  },
   mounted(){
    this.getDictList("E_SUITRESULT", "caseResultList"); //诉讼结果字典
    this.getDictList("E_ENTRUSTSTUS", "entruststusList"); //委案状态字典
    this.getDictList("E_SUITSTUS", "suit_statusList"); //案件诉讼状态字典
    this.getDictList("E_ORGTYPES", "entrorgtypeList"); //机构类型
    this.getDictList("E_YES___", "paystatuList"); //是否法诉
    this.getDictList("E_YES___", "paystatuLists"); //是否法诉

    this.getDictList("E_SUITYPE", "suitypeList"); //当前审判类型字典
    this.getDictList("E_SUITRESULT", "suitresultList"); //当前立案受理结果
    this.getDictList("E_ZXFILETYPE", "zxfiletypeList"); //当前执行受理结果
    this.getDictList("E_CLENMODE", "clenmodeList"); //当前委案费用模式

    this.getOrgList();
    this.saveTypeChange();
    //this.getCityNoInfos();

  },

  methods: {

   area_noBlur() {
      if (this.selectForm.area_no === "") {
        return false;
      } else {
        this.areaCenter = this.selectForm.area_no; // 记录区域中心
        console.log(this.selectForm.name)
        this.clearHistory();
        this.getCityNoInfos();
      }
    },
    clearHistory() {
      this.selectForm.city_no = "";
    },

      //选择区域中心触发承办机构查询
         saveTypeChange() {

         if (this.selectForm.areaCenter == "" || this.selectForm.areaCenter == null) {
           this.$refs.selectForm.resetFields();
           this.temarea = JSON.parse(localStorage.getItem("user_info")).branch_id;
          //
           this.getEntrorgList();
           this.getCityNoInfos();
        }
        else{
          this.$refs.selectForm.resetFields();
          this.temarea = this.selectForm.areaCenter;
          this.getEntrorgList();
          this.getCityNoInfos();
        }
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

       getCityNoInfos() {

        let params = {
          servicecode: "RLMSPLTS1124",

          branchNo:this.temarea,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
             this.city_noList = res.data.infos;
              // if(list != null){
              //   let temp = [];
              //   for (let i = 0; i < list.length; i++) {
              //     if(list != null && list[i].city != null && list[i].city.length > 0){
              //       let city = {dictName : list[i].city, dictId : list[i].city};
              //       if(temp.indexOf(list[i].city) == -1){
              //         temp.push(list[i].city);
              //         this.city_noList.push(city);
              //       }
              //     }
              //   }
              // }
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

    formatsuitypeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.suitypeList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatsuitresultData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.suitresultList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatzxfiletypeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.zxfiletypeList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatclenmodeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.clenmodeList.forEach(function(item, index) {
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
    /**
     *详情
     */
    searchDetailInfo(row) {
      if (row.sjplhk == "1") {
        this.$message({
          type: "warning",
          message: "该记录无还款申请详情！"
        });
      } else {
        this.c_$params.lncfno = row.lncfno;
        this.resultShow = true;
      }
    },
    reset() {

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
              // this.getEntrorgList(res.data);
              // this.getCityNoInfos(res.data);

            }
          })
          .catch(err => {
            console.error(err);
          });
      },
    /**
     * 获取列表数据
     */
    getTableData() {
      this.validateList1 = [];
      const formList = ["selectForm"];
      formList.forEach(item => {
        this.validateList1.push(validateHandle(item, this));
      });
      Promise.all(this.validateList1)
        .then(res => {
          let reqMap = {
            areaCenter: this.selectForm.areaCenter,
            applid: this.selectForm.applid,
            lncfno: this.selectForm.lncfno,
            acctna: this.selectForm.acctna,
            idtfno: this.selectForm.idtfno,
            // handleorg: this.selectForm.handleorg,
            nowvorg: this.selectForm.nowvorg,
            caseResult: this.selectForm.caseResult,
            entrust_status: this.selectForm.entrust_status,
            suit_status: this.selectForm.suit_status,
            islgfe:this.selectForm.islgfe,
            area_no: this.selectForm.area_no,
            handcitynm: this.selectForm.brachName,
            branchNo: this.selectForm.branchNo,
            attn_name: this.selectForm.attn_name,
            city_no: this.selectForm.city_no,
            servicecode: "RLMSPLTS1233",
            start: this.currentPage,
            length: this.tableSize
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
            .then(res => {
              if (res && res.code === "200") {
                this.tableData = res.data;
            //    this.tableTotal = res.pageParam.total;
                this.tableTotal = res.pageParam ? res.pageParam.total : 0;
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "校验不通过"
          });
        });
    },
     exportAllToExcel(){
            let reqMap = {
                servicecode: "RLMSPLTS1127",
                  areaCenter: this.selectForm.areaCenter,
         applid: this.selectForm.applid,
        lncfno: this.selectForm.lncfno,
         acctna: this.selectForm.acctna,
         idtfno: this.selectForm.idtfno,
         nowvorg: this.selectForm.nowvorg,
        caseResult: this.selectForm.caseResult,
         entrust_status: this.selectForm.entrust_status,
         suit_status: this.selectForm.suit_status,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = this.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    a.download = '诉讼案件一览表.xlsx';
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a)
                }
                reader.onloadend=function(e){
                    this.$dialog.close();
                }

            });
        },
        dataUrlToBlob(data){
            var bstr = atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: 'xlsx' });
        },
  },

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
