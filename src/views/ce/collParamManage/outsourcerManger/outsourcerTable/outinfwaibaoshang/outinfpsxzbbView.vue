<template>
<div>
    <div class="container-content">
        <div class="container-centent--table">
            <el-table ref="modifyTable" :data="tableModifyData" :border="true" stripe>
              <el-table-column label="区域中心" prop="branch_name" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="用户id" prop="user_id" width="360" align="center"></el-table-column>
              <el-table-column label="姓名" prop="user_name" width="360" align="center"></el-table-column>
            </el-table>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="新增人员证明文件" prop="psxzba">
                  <upload-file ref="psxzbaProp" :uploadFileList="appForm.psxzba" :uploadDisabled="true" @changeFile="psxzbaChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark" disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
    </div>
</div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFile from "@/views/ce/components/UploadFile.vue";

export default {
    name: "outinfpsxzbbView",
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
            tableModifyData: [],
            currentPage: 1,
            tableSize: 10,
            tableTotal: 10,
        }
    },
    created() {
        this.getAppInfo();
    },

    methods: {

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
