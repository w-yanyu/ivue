<template>
  <div>
    <div class="el-dialog-dev">
      <div class="container-content">
        <div class="container-content--search">
          <el-button type="primary" @click="insertStrategy()" plain>新增人员</el-button>
        </div>
        <div class="container-centent--table">
          <el-table ref="modifyTable" :data="tableModifyData" :border="true" stripe>
            <el-table-column label="区域中心" prop="branch_name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户id" prop="user_id" width="360" align="center"></el-table-column>
            <el-table-column label="姓名" prop="user_name" width="360" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="240">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.$index,scope.row)">{{$i18ns('删除')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
          <el-row>
            <el-col :span="12">
              <el-form-item class="require-asterisk" label="新增人员证明文件" prop="psxzba">
                <upload-file ref="psxzbaProp" :uploadFileList="appForm.psxzba" :uploadDisabled="false" @changeFile="psxzbaChange" :key="timer"></upload-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item  :label="$i18ns('备注:')" prop="remark">
                <el-input type="textarea" v-model="appForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="custom-common--footer">
          <el-button size="small" @click="handleClosess">{{$i18ns('取消')}}</el-button>
          <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
        </div>
      </div>
    </div>


    <el-dialog title="人员新增" :visible.sync="strategyModels" :show-close="true" width="1200px" :close-on-click-modal="false" :append-to-body="true">
      <div class="el-dialog-dev">
        <div class="container-content">
          <div class="container-content--search">
            <div class="container-content--search">
              <el-form :model="strategyForm" ref="strategyForm"  label-width="150px" class="custom-common--form">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="用户id"  prop="user_id" >
                      <el-input v-model="strategyForm.user_id" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户名称"  prop="user_name" >
                      <el-input v-model="strategyForm.user_name" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="button-footer">
                  <el-col :span="24">
                    <el-button type="primary" @click="searchTeller">查询</el-button>
                    <el-button type="primary" @click="reset">{{$i18ns('重置')}}</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-button type="primary" @click="addSelected" plain>新增选择用户</el-button>
          </div>
          <div class="container-centent--table">

            <el-table ref="multipleTable" :data="tableModifyDatas" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="区域中心" prop="branch_name" align="center">
              </el-table-column>
              <el-table-column label="用户id" prop="user_id" width="360" align="center">
              </el-table-column>
              <el-table-column label="用户名称" prop="user_name" align="center">
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
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  import _ from "lodash";

  export default {
    name: "outinfpsxzbbUpdate",
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
          psxzba: [], //新增人员证明文件
          remark:"",
        },
        strategyForm:{
          user_id:"",
          user_name:"",
          branch_name:"",
        },
        multipleSelection: [],
        tableData: [], //总部委案所有列表数据
        tableAllData: [], //总部委案所有列表数据
        tableAllDatas: [],
        tableModifyData: [],
        tableModifyDatas: [], //策略修改后的数据
        strategyModelVisible: false, //修改界面
        strategyModels: false, //新增界面
        branchIdList: [], //机构字典
        acctDurationList: [], //账龄字典
        deadlineTypeList: [], //委外期限字典
        isShowPage:false,
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
      }
    },
    created() {
      this.initRule();
      this.getAppInfo();
    },

    methods: {
      initRule() {
        this.appRules = {
          psxzba: [{validator: this.psxzbaValidate,trigger: 'change'}],
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
        if(this.tableModifyData && this.tableModifyData.length > 0){
          for (let i = 0; i < this.tableModifyData.length; i++) {
            exculdeUserId = i == 0 ? this.tableModifyData[i].user_id : (exculdeUserId + "," + this.tableModifyData[i].user_id);
          }
        }

        let params = {
          servicecode: "RLMSPLTS1214",
          exculdeUserId : exculdeUserId,
          userId : this.strategyForm.user_id,
          userName : this.strategyForm.user_name,
          start: this.currentPage,
          length: this.tableSize,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.tableModifyDatas = res.data;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
            this.isShowPage = true;
          }
        }).catch(err => {
          console.error(err);
        });
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
       * 查询报备人员首页
       */
      getAppInfo() {
        let params2 = {
          servicecode: "RLMSPLTS1215",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
          if (response && response.code === "200" ) {
            this.appForm.psxzba=response.data.psbbxz;
            this.appForm.remark=response.data.applyInfos.remark;
            this.tableModifyData = response.data.review;
            this.timer = new Date().getTime();//更新timer，重新加载子组件
          }
        }).catch(err1 => {
          console.error(err1);
        })

      },
      /**
       * 查询当前区域中心所有人员
       */
      queryHeadStrategys() {
        let params2 = {
          servicecode: "RLMSPLTS1054",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
          if (response && response.code === "200") {
            response.data.review.forEach(item => {
              let strategys = {};
              strategys.branch = item.branch;
              strategy.branch_id=item.branch_id;
              strategys.post = item.post;
              strategys.user_name = item.user_name;
              strategys.status = false;
              this.tableModifyData.push(strategys);
            })
          }
        }).catch(err1 => {
          console.error(err1);
        })

      },
      /**
       * 人员修改
       */
      modifyStrategy() {
        this.tableModifyData = _.cloneDeep(this.tableData);
        this.strategyModelVisible = true;
      },
      /**
       * 人员维护
       */
      insertStrategy() {
        this.tableModifyDatas = [];
        this.strategyModels = true;
        this.multipleSelection = [];
        this.getTableData();
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
          this.tableModifyDatas = [];
          this.strategyModelVisible = false;

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
                servicecode: "RLMSPLTS1055",
                applid: this.cParentParams.applid,
                psxzba:this.appForm.psxzba,
                remark:this.appForm.remark,  //备注
                reViewTe:this.tableModifyData
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  });
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.strategyForm ={
          user_id:"",
            user_name:"",
            branch_name:"",
        };
      },
      /**
       * 新增行数据
       */
      addSelected() {
        if(this.multipleSelection.length == 0){
          this.$message({
            type: "warning",
            message: "请选择用户！"
          });
        }else{
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let user = this.multipleSelection[i];
            let addData = {
              user_id: user.user_id,
              user_name: user.user_name,
              branch_id : user.branch_id,
              branch_name : user.branch_name,
            };
            this.tableModifyData.push(addData);
          }

          this.multipleSelection = [];
          this.strategyModels = false;
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
        this.tableModifyData.splice(index, 1);
        this.$message({
          type: "success",
          message: "删除成功！"
        })

      },

      clearData(){
        this.appForm ={
          psxzba:[],//新增人员证明文件
          remark:"",
        }
        this.$refs.psxzbaProp.clearFileList();
      },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      psxzbaChange(val) {
        this.appForm.psxzba = val;
      },
      psxzbaValidate(value, rule, callback) {
        if (this.appForm.psxzba.length === 0) {
          return callback(new Error("请上传新增人员证明文件"));
        }
        return callback();
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
</style>
