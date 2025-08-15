<template>
  <div>
    <div class="editTable" v-if="showTable">
      <el-button type="primary" v-if="showFlag" @click="handleAdd" style="margin-bottom: 10px; margin-left: 12px;">新增</el-button>
      <el-table ref="editTable" :data="commPersonList" border style="width: 100%">
        <el-table-column prop="comm_person_name" label="共有人名称"> </el-table-column>
        <el-table-column prop="comm_person_cert_type" label="共有人证件类型"> <template slot-scope="scope">
                        <span>{{formatDictData(scope.row.comm_person_cert_type,certTypeList)}}</span>
                    </template></el-table-column>
        <el-table-column prop="comm_person_cert_no" label="共有人证件号码"></el-table-column>
        <el-table-column prop="comm_person_phone" label="共有人手机号"></el-table-column>
        <el-table-column :label="$i18ns('操作')" width="200">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="text"
                v-if="showFlag"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                >{{ $i18ns("删除") }}</el-button
              >
            </el-row>
          </template>
        </el-table-column>
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </el-table>
      <!-- 新增对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="新增共有人" @close="handleCloseDialog" class="sun-dialog" append-to-body>
      <el-form :model="formData" ref="form" label-width="80px" :rules="inputRules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="comm_person_name">
              <el-input v-model="formData.comm_person_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件类型" prop="comm_person_cert_type">
              <el-select v-model="formData.comm_person_cert_type">
                <el-option
                  v-for="(item, i) in certTypeList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="comm_person_cert_no">
              <el-input v-model="formData.comm_person_cert_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" prop="comm_person_phone">
              <el-input v-model="formData.comm_person_phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div  slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
    </div>
    
  </div>
</template>

<script>
import Tools from "pte-ui/utils/Tools";
import Schema from "async-validator";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { formatDictData } from "@/util/commondeal.js";

export default {
  components: {
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    return {
      showTable: true,
      commPersonList: [],
      certTypeList:[],
      protocol: {},
      protocolTitle: "",
      protocolVisible: false, //显示协议对话框
      showFlag: true, //是否支持编辑
      previewUrl: "",
      showViewer: false, // 控制图片预览显示隐藏
      showpdf: false,
      pdfUrl: "",
      dialogVisible: false,
      formData: {
        comm_person_name: '',
        comm_person_cert_type: '',
        comm_person_cert_no: '',
        comm_person_phone: ''
      },
      inputRules: {
        comm_person_cert_type: [
          { required: true, message: "请选择证件类型",trigger: "blur" }
        ],
        comm_person_name: [
          { required: true, message: "请输入共有人姓名",trigger: "blur" }
        ],
        comm_person_cert_no: [
          { required: true, message: "请输入共有人证件号",trigger: "blur" }
        ],
        comm_person_phone: [
          { required: true, message: "请输入共有人手机号",trigger: "blur" }
        ],
      }
    };
  },
  created() {
    console.log ("parentFormModel===" , this.cParentScope.parentFormModel);
    if(this.cParentParams.initFlag){
      this.commPersonList = this.cParentScope.parentFormModel.comm_person_info;
    }
    this.showFlag = this.cParentParams.showFlag;
    this.getDictList("MS_E_CRET_TYPE","certTypeList");//获取数据字典
  },
  mounted() {
    // this.initTableData();//初始化数据字典
    this.getDictList("MS_E_CRET_TYPE","certTypeList");//获取数据字典
  },
  methods: {

    formatDictData,
    
    initTableData() {
      this.commPersonList = this.cParentScope.parentFormModel.comm_person_info;
      this.showFlag = this.cParentParams.showFlag;
    },
    // 删除
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      this.commPersonList.splice(index, 1);
    },
    handleAdd() {
      // 打开新增对话框
      this.dialogVisible = true;
    },
    handleCloseDialog() {
      // 关闭对话框
      this.dialogVisible = false;
      // 重置表单数据
      this.$refs.form.resetFields();
    },
    handleSubmit() {
      // 提交表单
      // 将表单数据添加到表格数据中
      this.$refs.form.validate(valid => {
        if (valid) {
          // 校验通过处理
          
          this.commPersonList.push({
            comm_person_name: this.formData.comm_person_name,
            comm_person_cert_type: this.formData.comm_person_cert_type,
            comm_person_phone: this.formData.comm_person_phone,
            comm_person_cert_no: this.formData.comm_person_cert_no,
          });
          // 关闭对话框
          this.dialogVisible = false;
          // 重置表单数据
          this.$refs.form.resetFields();
        }
        else {
          // 校验不通过处理
        }
      })

    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    refreshTable() {
      this.showTable = false;
      const that = this;
      this.$nextTick(() => {
        //隐藏文件列表
        if(that.$refs.uploadProp && that.$refs.uploadProp.$el) {
          let newDom = that.$refs.uploadProp.$el.getElementsByClassName(
            "el-upload-list"
          )[0].style;
          newDom.display = "none";
        }
        that.showTable = true;
      });
    },
    dataUrlToBlob(data, prefix) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: prefix });
    }
  }
};
</script>

<style lang="less" scoped>
.container-toolbar {
  padding: 0 !important;
  ::v-deep .el-button {
    i {
      margin-right: 5px !important;
    }
  }
}
.editTable {
  margin: 10px 0;
  ::v-deep .cell {
    display: flex;
  }
}
.footer {
  text-align: right;
}
</style>
