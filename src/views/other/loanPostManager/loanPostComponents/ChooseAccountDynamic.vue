<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="185px" class="custom-common--form">
      <el-row>
        <el-col :span="8">
          <el-form-item label="选择公账账号">
            <el-button type="primary" @click="showLookup = true" size="small">{{$i18ns('选择')}}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="caSeq-table">

        <el-table
         :data="tableData"
         style="width: 100%">
          <el-table-column label="是否锁定" align="center">
            <template slot-scope="scope">
              {{dattypTranslate(scope.row.isLock)}}
            </template>
          </el-table-column>
          <el-table-column label="公账序号" align="center" prop="caSeq"></el-table-column>
          <el-table-column label="还款/宕帐日期" align="center" prop="caRepayOrDebtDate"></el-table-column>
          <el-table-column label="付款人" align="center" prop="caPayer"></el-table-column>
          <el-table-column label="金额" align="center" prop="caAmt"></el-table-column>
          <el-table-column label="摘要" align="center" prop="caAbstract"></el-table-column>
          <el-table-column label="剩余金额" align="center" prop="caRestAmt"></el-table-column>
          <el-table-column :label="$i18ns('备注')" align="center" prop="caRemark"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteItem(scope)">{{$i18ns('删除')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="文件上传" prop="upload">
            <el-upload
             class="upload-demo"
             :on-change="handleChange"
             list-type="picture-card"
             :on-remove="handleRemove"
             multiple
             :limit="5"
             :file-list="fileList"
             :auto-upload="false">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row> -->
      <choose-account-lookup
       :show-dialog="showLookup"
       @select="lookSelect"
       @close="lookClose"
       v-if="showLookup"/>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ChooseAccountLookup from "./ChooseAccountLookup";

export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  name: "ChooseAccountDynamic",
  components: {
    ChooseAccountLookup
  },
  data() {
    return {
      ruleForm: {
        caSeq: ""
      },
      rules: {
        caSeq: [
          { required: true, message: "请选择公账账号" }
        ]
        // upload: [
        //   { validator: this.uploadValidate, trigger: 'change' }
        // ]
      },
      showLookup: false,
      //fileList: [], // 上传文件列表
      tableData: [], // 选择带回列表数据
      dattypList: [], // 是否锁定数据字典
      //formKey: "" // 需要赋值的外部表单key

    }
  },
  // created() {
  //   this.formKey = this.cParentScope.item.toRequest.params.formKey;
  //   console.log("this.cParentScope.parentFormModel  :"+this.cParentScope.parentFormModel  )
  // },
  created() {
    this.cParentScope.parentFormModel.pbacctsq = [];
     this.cParentScope.parentFormModel.rpamount="";
  },
  methods: {
    lookClose() {
      this.showLookup = false;
    },
    /**
     * 选择带回回调
     */
    lookSelect(tableList, dattypList) {
      let rpamountChild = 0;
      this.dattypList = dattypList;
      let map = {};
      this.tableData.forEach(item => {
        map[item.caSeq] = true;
      });
      tableList.forEach(item => {
        if(!map[item.caSeq]) {
          this.tableData.push(item);
        }
      });
      this.cParentScope.parentFormModel.pbacctsq = [];
      this.tableData.forEach(item => {
        this.cParentScope.parentFormModel.pbacctsq.push(item.caSeq);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.cParentScope.parentFormModel.rpamount = rpamountChild;
      this.lookClose();
    },
    /**
     * 是否锁定转换
     */
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 删除列表数据
     */
    deleteItem(item) {
      let rpamountChild=0;
      let index = 0;
      this.tableData.forEach((ele, i) => {
        if (ele === item.row) index = i;
        });
      this.tableData.splice(index, 1);
      this.cParentScope.parentFormModel.pbacctsq = [];
      this.tableData.forEach(item => {
        this.cParentScope.parentFormModel.pbacctsq.push(item.caSeq);
        rpamountChild+=parseFloat(item.caRestAmt);

      });
      this.cParentScope.parentFormModel.rpamount=rpamountChild;
    },
    /**
      * 文件change回调
      * @param file 当前文件对象
      * @param fileList 文件清单
      */
    // handleChange(file, fileList) {
    //   let formData = new FormData();
    //   formData.append("file", file.raw);
    //   formData.append("org_id", userInfo.org_id);
    //   formData.append("path", "PD");
    //   MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData).then(res => {
    //     if (res && res.code === "200") {
    //       file.status = "success";
    //       this.fileList.push(file);
    //       this.$refs.ruleForm.validateField("upload");
    //     }
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },
    /**
     * 文件移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    // handleRemove(file, fileList) {
    //   this.fileList.forEach((item, index) => {
    //     if (item.uid === file.uid) {
    //       this.fileList.splice(index, 1);
    //     }
    //   });
    //   this.$refs.ruleForm.validateField("upload");
    // },
    /**
     * 文件上传自定义校验事件
     */
    // uploadValidate(rule, value, callback) {
    //   if (this.fileList.length === 0) {
    //     return callback(new Error("请上传文件清单"));
    //   }
    //   return callback();
    // },
  }
}
</script>
<style lang="less" scoped>
  .custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
    }
  }
  .caSeq-table {
    padding: 10px 0;
  }
</style>
