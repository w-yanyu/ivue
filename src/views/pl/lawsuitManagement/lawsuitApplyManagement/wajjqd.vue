<template>
<div>
   <div class="container-content">
        <div class="container-content--search">
            <el-button type="primary" @click="insertStrategy()">{{$i18ns('新增')}}</el-button>
        </div>
        <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
                <el-table-column :label="$i18ns('借据号')" prop="loan_no" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :label="$i18ns('客户姓名')" prop="cust_name" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :label="$i18ns('委案机构')" prop="entrorg_name" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :label="$i18ns('结费模式')" prop="clen_mode" width="120" align="center" :formatter="formatTypeData"></el-table-column>
                <el-table-column :label="$i18ns('委案金额')" prop="entr_amt" show-overflow-tooltip align="center"></el-table-column>
               <el-table-column :label="$i18ns('操作')" align="center" width="240">
                 <template slot-scope="scope">
                <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.$index,scope.row)">{{$i18ns('删除')}}</el-button>
              </template>
               </el-table-column>
            </el-table>
        </div>
         <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
                <el-col :span="12">
                <el-form-item  :label="$i18ns('交接清单类型')" :prop="filetypes">
                  <el-select v-model="appForm.filetypes" :placeholder="$i18ns('请选择交接清单类型')" @change="saveTypeChange">
                    <el-option
                      v-for="(item, i) in procpreTypeListFilter"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                    <el-form-item class="require-asterisk" :label="$i18ns('交接清单凭证')" prop="qdpz">
                        <upload-file ref="qdpzProp" :uploadFileList="appForm.qdpz" :uploadDisabled="false" @changeFile="qdpzChange" :key="timer"></upload-file>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
          <el-col :span="12">
            <el-form-item  :label="$i18ns('备注')" prop="remark">
              <el-input type="textarea" maxlength="200" v-model="appForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
    </div>
 <div class="button-footers">
            <!-- <el-button size="small" @click="handleClosess">取消</el-button> -->
            <el-button type="primary" size="small" @click="submit" plain >{{$i18ns('提交')}}</el-button>
    </div>
    <el-dialog title="法诉案件列表" :visible.sync="strategyModels" :show-close="true" width="900px" :close-on-click-modal="false" :append-to-body="true">
        <div class="el-dialog-dev">
            <div class="container-content">
                <div class="container-content--search">
                      <el-form :model="strategyForm" ref="strategyForm"  label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item :label="$i18ns('借据号')"  prop="loan_no" >
                                <el-input v-model="strategyForm.loan_no" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$i18ns('客户姓名')"  prop="cust_name" >
                                <el-input v-model="strategyForm.cust_name" ></el-input>
                            </el-form-item>
                        </el-col>



              </el-row>
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="searchTeller">{{$i18ns('查询')}}</el-button>
                            <el-button type="primary" @click="reset">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                   <el-button type="primary" @click="addSelected" plain>{{$i18ns('新增委案信息')}}</el-button>
                </div>
                <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableModifyData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="55">
                        </el-table-column>

                  <el-table-column :label="$i18ns('借据号')" prop="loan_no" width="120" align="center"></el-table-column>
                  <el-table-column :label="$i18ns('客户姓名')" prop="cust_name" width="120" align="center"></el-table-column>
                  <el-table-column :label="$i18ns('委案机构')" prop="entrorg_name" width="120" align="center"></el-table-column>
                  <el-table-column :label="$i18ns('结费模式')" prop="clen_mode" width="120" align="center" :formatter="formatTypeData"></el-table-column>
                  <!-- <el-table-column label="委案时间" prop="entrtime" width="120" align="center"></el-table-column> -->
                  <el-table-column :label="changeDate" prop="entr_time" width="120" align="center"></el-table-column>
                  <el-table-column :label="$i18ns('委案金额')" prop="entr_amt" width="120" align="center"></el-table-column>
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
    </el-dialog>
</div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
//import UploadFile from "@/views/pl/components/UploadFile.vue";
import _ from "lodash";
 import UploadFile from "@/views/pl/lawsuitManagement/litigationinstitution/uploadButtonPl.vue"; //minio文件上传按钮

export default {
    name: "wajjqd",
     components: {
      UploadFile,
    },
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data() {
        return {
            appForm: {
                qdpz: [], //新增人员证明文件
                remark:"",
                filetypes:"",
            },
             strategyForm:{
                lncfno:"",
                acctna:"",
                noworg:"",
                entrtime:"",
            },
             timer: "",
            multipleSelection: [],
            tableData: [], //总部委案所有列表数据
            tableAllData: [], //总部委案所有列表数据
            tableAllDatas: [],
            tableModifyData: [],
            strategyModels: false, //新增界面
            branchIdList: [], //机构字典
            acctDurationList: [], //账龄字典
            deadlineTypeList: [], //委外期限字典
            procpreTypeListFilter:[],
            addAisabled: false,
            isShowPage:false,
            currentPage: 1,
            tableSize: 10,
            tableTotal: 10,
            secondBranchList:[],
            changeDate: "", //变更时间
        }
    },
    created() {
        //  if (this.appForm.filetypes === "" || this.appForm.filetypes === null) {
        //   this.$message({
        //         type: "warning",
        //         message: "请选择申请类型！",
        //         });
        // }
        this.getDictList("E_STRATEGY_TYPE", "branchIdList"); //机构字典
        this.getDictList("E_ACCT_DURATION", "acctDurationList"); //账龄字典
        this.getDictList("E_DEADLINE_TYPE", "deadlineTypeList"); //委外期限字典
        this.getDictList("PL_E_FILE_TYPES", "procpreTypeListFilter"); //申请类型
        this.getDictList("PL_E_CLENMODE", "secondBranchList"); //申请类型
         this.getEntrorgList();
        this.initRule();
    },

    methods: {
       /**
     *获取委案机构字典列表
     *
     */

       clearData(){
        this.tableData= [];
        this.appForm ={
           qdpz:[],//新增人员证明文件
           remark:"",
           filetypes:"",
        }
        this.$refs.qdpzProp.clearFileList();
      },

       initRule() {
            this.appRules = {
                //qdpz: [{validator: this.psxzbaValidate,trigger: 'change'}],
                filetypes: [{required: true,  message: "请选择申请类型"}],
            }
        },

      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.searchTeller();
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
        this.currentPage = 1;
        this.getTableData();
      },

      /**
       * 查询列表
       */
      getTableData() {
        let exculdeUserId = "";
        if(this.tableData && this.tableData.length > 0){
          for (let i = 0; i < this.tableData.length; i++) {
            exculdeUserId = i == 0 ? this.tableData[i].lncfno : (exculdeUserId + "," + this.tableData[i].lncfno);
          }
        }

       let params2 = {
                servicecode: "pl0555",
                 filetypes:this.appForm.filetypes,
                 loan_no : this.strategyForm.loan_no,
                 cust_name : this.strategyForm.cust_name,
                 nowv_org : this.strategyForm.nowv_org,

                 start: this.currentPage,
                 length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" && response.data ) {
                   this.tableModifyData=response.data;
                   this.isShowPage = true;
                   this.tableTotal = response.pageParam ? response.pageParam.total : 0;

                }
            }).catch(err1 => {
                console.error(err1);
            })

        },

        handleSelectionChange(val) {
          this.multipleSelection = [];
          if(val && val.length > 0){
            for (let i = 0; i < val.length; i++) {
              this.multipleSelection.push(val[i]);
            }
          }
        },
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
         * 人员修改
         */
        modifyStrategy() {
            this.tableModifyData= _.cloneDeep(this.tableModifyData);
            this.strategyModels = true;
        },
        /**
         * 人员维护
         */
        insertStrategy() {
           if (this.appForm.filetypes === "" || this.appForm.filetypes === null) {
          this.$message({
                type: "warning",
                message: "请选择申请类型！",

                });
                this.strategyModels = false;
        }else{
       this.tableModifyData = [];
            this.strategyModels = true;
            this.multipleSelection = [];
            this.getTableData();
        }
        },
        /**
         * 取消修改策略
         */
        handleClosess() {
            this.$confirm("是否取消新增人员信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {

                this.strategyModels = false;

            })
        },
        /**
         * 取消修改策略
         */
        handleClose() {
            this.$confirm("是否取消未提交的修改申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.tableModifyData = [];
                this.strategyModels = false;
            })
        },
      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                 servicecode: "pl0557",
                //qdpz:this.appForm.qdpz,
                remark:this.appForm.remark,  //备注
                reViewTe:this.tableData,
                filetypes:this.appForm.filetypes,
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                //    if (this.appForm.filetypes !== "" || this.appForm.filetypes !== null) {
                //     this.$message({
                // type: "warning",
                // message: "请选择申请类型！",
                // });
                //   }
                  this.timer = new Date().getTime();//更新timer，重新加载子组件
                  this.strategyModels = false;
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
       reset(){
        console.log(this.strategyForm,"this.selectForm")
      Object.keys(this.strategyForm).forEach(key => {
            this.strategyForm[key]='';
        })
      // this.$refs.strategyForm.resetFields();

      },
        /**
         * 新选择要审批的数据
         */
 addSelected() {
          console.log("this.multipleSelection",this.multipleSelection)
          if(this.multipleSelection.length == 0){
            this.$message({
              type: "warning",
              message: "请选择要审批的数据！"
            });
          }else{
                let map = {};
                this.tableData.forEach(item => {
                  map[item.loan_no] = true;
                });
                this.multipleSelection.forEach(item => {
                  if (!map[item.loan_no]) {
                    this.tableData.push(item);
                  }
                });
                  this.multipleSelection = [];
                  this.strategyModels = false;
                  this.strategyForm.lncfno="";
                  this.strategyForm.acctna="";
                  this.strategyForm.noworg="";
                  this.strategyForm.entrtime="";
                  this.$message({
                    type: "success",
                    message: "添加成功！"
                  });
                }
         },

        /**
         * 删除行数据
         */
        deleteRow(index, row) {
            this.tableData.splice(index, 1);
            this.$message({
                type: "success",
                message: "删除成功！"
            })

        },
        /**
         * 获取字典名称
         */
         /**
        * 获取字典名称
        */
        getDictName(dictId,dictList){
            let dictType = {};
            dictType = dictList.find(item=>{return item.dictId===dictId;})
            return dictType.dictName;
        },
        getAcctDurationName(acctDuration){
            let that = this;
            let acctDurationName = [];
            acctDuration.forEach(item=>{
                let dictType = {};
                dictType = this.acctDurationList.find(item1=>{return item1.dictId===item});
                acctDurationName.push(dictType.dictName);
            })
            return acctDurationName.join();
        },



        /**
         * 添加文件回调
         * @param file 当前添加文件对象
         * @param fileList 已添加文件
         */
        qdpzChange(val) {
            this.appForm.qdpz = val;
        },
        psxzbaValidate(value, rule, callback) {
            if (this.appForm.qdpz.length === 0) {
                return callback(new Error("请上传新增清单凭证文件"));
            }
            return callback();
        },
        /**
         * 触发申请类型
         */
        saveTypeChange() {
          this.tableData = [];
          if (this.appForm.filetypes == "" || this.appForm.filetypes == null) {
           this.$message({
                type: "warning",
                message: "请选择申请类型！",
                });
         }
        if (this.appForm.filetypes === '1') {
          this.changeDate = "委案时间";
        }else if (this.appForm.filetypes === '2') {
          this.changeDate = "收案时间";

        }
        },
         formatTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.secondBranchList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
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

    .container-content--toolbar {
        padding: 10px;
    }

    .container-content--pagination {
        float: right;
        padding: 10px;
    }
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

    .container-centent--table {
        margin-top: 10px;
        bottom: 60px;
    }
}

.el-dialog-dev {
    max-height: 60vh;
    overflow: auto;
}
.button-footers {
 text-align: center;

}
</style>
