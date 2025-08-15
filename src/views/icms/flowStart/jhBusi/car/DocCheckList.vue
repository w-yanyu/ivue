<template>
  <div>
    <el-table
      :data="docTableData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="doc_no"
        :label="资料编号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="doc_name"
        :label="资料描述"
      >
      </el-table-column>
      <el-table-column
        prop="is_must_name"
        :label="是否必须"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="upload_flag_name"
        :label="是否上传"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="filetype_name"
        :label="附件类型"
        align="center"
      >
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="is_access_info_name"-->
<!--        :label="是否获取GPS信息"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="is_check_ps_name"-->
<!--        label="是否对图片进行原图检查"-->
<!--        align="center"-->
<!--      >-->
<!--      </el-table-column>-->

      <el-table-column
        fixed="right"
        :label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="fileManageLookup(scope.row)" size="small">{{$i18ns('上传')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="文件上传" :visible.sync="fileManageVisible" v-if="fileManageVisible" width="70%"
               :before-close="handleClose" top="30vh"
               :append-to-body="true">
      <FileManage :cParentParams="fileInfo" @callBack="fileUploadCallBack"></FileManage>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
import FileManage from "@/views/icms/flowStart/lend/commUitl/fileManage.vue";


export default {
  name: "DocCheckList",
  components:{
    FileManage
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
          检查资料:this.$i18ns("检查资料"),
          资料编号:this.$i18ns("资料编号"),
          资料描述:this.$i18ns("资料描述"),
          是否必须:this.$i18ns("是否必须"),
          是否上传:this.$i18ns("是否上传"),
          附件类型:this.$i18ns("附件类型"),
          文件上传:this.$i18ns("文件上传"),
          操作:this.$i18ns("操作"),




      docTableData:[],//表格数据

      sale_prod_cd: "",// 可售产品编号
      apply_type: "",

      fileMap: new Map(),
      fileManageVisible: false, //显示查找文件对话框

      fileInfo: {
        doc_no: "",
        filetype: "",
        is_access_info: "",
        is_check_ps: "",
        fileList: []
      },
    };
  },
  created() {
    this.sale_prod_cd = this.cParentParams.sale_prod_cd;
    this.apply_type = this.cParentParams.apply_type;
    // this.sale_prod_cd = "00003201";
    this.initDocDetialList(this.sale_prod_cd);
  },
  methods: {
    //初始化产品下的检查资料信息
    async initDocDetialList(sale_prod_cd) {
      if (sale_prod_cd ==null || sale_prod_cd == '' || sale_prod_cd == undefined){
        this.docTableData = [];
        this.returnData(this.docTableData);
        return;
      }
      let that = this;
      let request_map = {
        sale_prod_cd,
        apply_type: this.apply_type,
        servicecode: "ar0165",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log("@@检查资料信息", response.data);
            that.docTableData = response.data;
            that.docTableData.forEach(fileDetail => {
              fileDetail.is_must_name = fileDetail.is_must == 1 ? this.$i18ns("是") : this.$i18ns("否");
              fileDetail.upload_flag_name = fileDetail.upload_flag == 1 ? this.$i18ns("是") : this.$i18ns("否");
              fileDetail.filetype_name = fileDetail.filetype == "image" ? this.$i18ns("图片类型") : this.$i18ns("所有类型");

              let fileInfo = {
                doc_no: fileDetail.doc_no,
                filetype: fileDetail.filetype,
                is_access_info: fileDetail.is_access_info,
                is_check_ps: fileDetail.is_check_ps,
                fileList: [],
              };
              that.fileMap.set(fileDetail.doc_no, fileInfo);
            });
            console.log("@@@检查资料初始化成功", that.fileMap);
            // 将初始化资料列表数据返回父组件
            that.returnData(this.docTableData);
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    //文件上传回调
    fileUploadCallBack(data) {
      let that = this;
      console.log("@@上传后未添加的fileMapthat", that.fileMap);
      that.fileMap.set(data.doc_no, data);
      //是否上传
      if (data.fileList.length == 0) {
        that.docTableData.forEach(oneData => {
          if (oneData.doc_no == data.doc_no) {
            oneData.upload_flag = 0;
            oneData.upload_flag_name = this.$i18ns("否");
            console.log("上传和删除后docTableData", that.docTableData)
          }
        })
      } else {
        that.docTableData.forEach(oneData => {
          if (oneData.doc_no == data.doc_no) {
            oneData.upload_flag = 1;
            oneData.upload_flag_name = this.$i18ns("是");
            console.log("上传和删除后docTableData", that.docTableData)
          }
        })
      }
      //刷新表格
      that.docTableData = that.docTableData.splice(0, that.docTableData.length);
      console.log("@@上传后的fileMapthat", that.fileMap);
    },
    fileManageLookup(rowData) {
      let that = this;
      this.fileInfo = this.fileMap.get(rowData.doc_no);
      that.fileManageVisible = true;
    },
    /**
     * 资料列表数据提交之前，要将其上传的文件信息放入对应的资料检查项中
     */
    getSubmitDocInfo() {
      let that = this;
      this.docTableData.forEach(data => {
        data.file_list = this.fileMap.get(data.doc_no).fileList;
        if (data.file_list.length > 0){
          data.upload_flag_name =  that.$i18ns("是")
        }
      });
    },
    /**
     * 检查资料上传后回调
     * @param data
     */
    returnData(data) {
      this.$emit("docListCallBack", data);
    },
    /**
     * 每次关闭文件上传窗口后，同步资料检查列表到父页面
     */
    handleClose(done){
      this.getSubmitDocInfo();
      this.returnData(this.docTableData);
      done();
    }
  }
};
</script>
