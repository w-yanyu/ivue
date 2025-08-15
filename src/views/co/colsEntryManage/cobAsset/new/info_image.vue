<template>
  <!-- 数据权限名称配置 -->
  <div>
    <div class="container-toolbar">
      <upload-file-view
        v-if="showFlag"
        ref="uploadProp"
        :uploadFileList="fileList"
        :uploadDisabled="false"
        @changeFile="changeUploadFile"
      ></upload-file-view>
    </div>
    <div class="editTable" v-if="showTable">
      <el-table ref="editTable" :data="fileList" border style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="orig_file_nm" label="文件名"> </el-table-column>
        <el-table-column prop="file_size" label="文件大小(Byte)">
        </el-table-column>
        <el-table-column :label="$i18ns('操作')" width="200">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="text"
                v-if="showFlag"
                @click="deleteRow(scope.$index, scope.row)"
                >{{ $i18ns("删除") }}</el-button
              >
              <el-button
                type="text"
                @click="downloadRow(scope.$index, scope.row)"
                >{{ $i18ns("下载") }}</el-button
              >
              <el-button
                type="text"
                @click="previewRow(scope.$index, scope.row)"
                >{{ $i18ns("预览") }}</el-button
              >
            </el-row>
          </template>
        </el-table-column>
        <!-- 缺省图配置 -->
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </el-table>
    </div>
    <div class="view-box">
      <image-preview :preview-url="previewUrl" @close="closeImg" v-if="showViewer" />
      <pdf-view-for-vue :pdfUrl="pdfUrl" @close="closePdf" v-if="showpdf" />
    </div>
    
  </div>
</template>

<script>
import Tools from "pte-ui/utils/Tools";
import Schema from "async-validator";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import UploadFileView from "@/views/pl/LevelFiveClasf/UploadFileView.vue";
import ImagePreview from "COM/ImagePreview";
import PdfViewForVue from "COM/PdfViewForVue";

export default {
  components: {
    UploadFileView,
    ImagePreview,
    PdfViewForVue
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
      fileList: [],
      protocol: {},
      protocolTitle: "",
      protocolVisible: false, //显示协议对话框
      showFlag: true, //是否支持编辑
      previewUrl: "",
      showViewer: false, // 控制图片预览显示隐藏
      showpdf: false,
      pdfUrl: ""
    };
  },
  created() {
    this.constFileList(this.cParentScope.parentFormModel.list04);
    this.showFlag = this.cParentParams.showFlag;
    if (this.fileList && this.fileList.length > 0) {
      this.refreshTable();
      this.cParentScope.parentFormModel.list04 = JSON.stringify(this.fileList);
    }
    
  },
  mounted() {
    // this.initTableData();
  },
  methods: {
    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    changeUploadFile(val) {
      this.fileList = val; //附件列表
      this.refreshTable();
      this.cParentScope.parentFormModel.list04 = JSON.stringify(this.fileList);
    },
    initTableData() {
      this.constFileList(this.cParentScope.parentFormModel.list04);
      this.showFlag = this.cParentParams.showFlag;
    },
    constFileList(list) {
      // 使用Array.map进行转换
      this.fileList = list.map(item => {
        // 创建新的对象结构
        const newObj = {
          orig_file_nm: item.file_name,
          file_path: item.file_path,
          file_size: item.file_size,
          url: item.url,
          uid: item.uid
        };

        return newObj;
      });
    },
    // 删除
    deleteRow(index, rows) {
      this.$bus.emit("deleteRowUpload", rows);
    },
    // 下载
    downloadRow(index, rows) {
      var vm = this;
      var params = {
        path: rows.file_path,
        fileName: rows.orig_file_nm
      };
      if (params.path === "") {
        vm.$message({
          type: "warning",
          message: "该附件未上传"
        });
        return;
      }
      MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          var orig_file_nm = rows.orig_file_nm;
          let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
          var a = document.createElement("a");
          a.download = orig_file_nm;
          a.style.display = "none";
          a.href = window.URL.createObjectURL(URL);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 预览
    previewRow(index, rows) {
      var vm = this;
      var params = {};
      params.path = rows.file_path;
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
          rows.url = window.URL.createObjectURL(URL);
          if (
            res.data.prefix === "png" ||
            res.data.prefix === "jpg" ||
            res.data.prefix === "jpeg"
          ) {
            this.showViewer = true;
            this.previewUrl =
              "data:image/" +
              res.data.prefix +
              ";base64," +
              res.data.fileString;
          } else if (res.data.prefix === "pdf") {
            this.showpdf = true;
            this.pdfUrl = "data:application/pdf;base64," + res.data.fileString;
          } else {
            this.$message({
              type: "warning",
              message: "暂不支持预览该格式文件"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
      

      // this.$bus.emit("previewRowUpload", rows);
    },
     /**
     * 关闭图片预览
     */
    closeImg() {
      this.showViewer = false;
    },
    /**
     * 关闭pdf预览
     */
    closePdf() {
      this.showpdf = false;
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
