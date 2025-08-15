<template>
  <div class="uploadFils">
    <el-table :data="newList" :row-class-name="tableRowClassName" border stripe style="width: 100%">

      <el-table-column   prop="doc_name" :label="$i18ns('附件类型')"></el-table-column>
      <el-table-column  prop="doc_no" :label="$i18ns('检查资料编号')" v-if="false"></el-table-column>
      <el-table-column   prop="original_file_name" :label="$i18ns('附件名称')">
      </el-table-column>
      <el-table-column  width="200px"  :label="$i18ns('附件查看')">
        <template slot-scope="scope">
          <el-button size="small" type="text" v-if="scope.row.file_path!=''&&scope.row.file_path!=null">
            <a @click="download(scope.row.file_path)">{{$i18ns('查看')}}</a>
          </el-button>
          <el-button size="small" type="text" @click="deleteButton(scope.$index)" v-if="scope.row.file_path!=''&&scope.row.file_path!=null">{{$i18ns('删除')}}</el-button>

        </template>
      </el-table-column>
      <el-table-column width="200px" :label="$i18ns('附件上传')">
        <template slot-scope="scope">
          <el-upload v-if="scope.row.file_path==''||scope.row.file_path==null"
                     class="upload-demo"
                     :on-change="(file) => {handleChange(file, scope.row)}"
                     :show-file-list="false"
                     :auto-upload="false">
            <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </el-table>
    <div class="container-center">
      <el-button type="primary" @click="submitForm('ruleForm')" class="form-button" v-if="tranType!='detail'">{{$i18ns('保存')}}</el-button>
    </div>
  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  name: "projfileUpload",

  data() {
    return {
      newList: [],
      isShowDel: true,
      part_project_no: "",
      data_list_no:"",
      tranType: "",
      version:0,
      fileList:[]
    };
  },
  methods: {
    //上传前判断
    beforeAvatarUpload(file) {
      //文件数量判断
      if (this.newList == null) {
        return;
      }
      const isLt5 = this.newList.length < 5;
      if (!isLt5) {
        this.$message.error('上传文件数量不能超过 5 个!');
      }
      //大小判断
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!');
      }
      return isLt5 && isLt10M;
    },
    //根据索引删除文件列表中的文件
    deleteButton(index) {
      this.newList[index].original_file_name='';
      this.newList[index].file_path='';
    },
    tableRowClassName ({row, rowIndex}) {
            //把每一行的索引放进row
      row.index = rowIndex;
          },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleChange(file, row) {
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData).then(res => {
        if (res && res.code === "200") {
          this.newList[row.index].original_file_name=res.data.oldName;
          this.newList[row.index].file_path=res.data.path;
          console.info( this.newList[row.index]);
        }
      }).catch(err => {
        console.error(err)
      })
    },
    download(url) {
      const type = url.split('.')[4]
      // 判断文件类型
      if (type === 'doc' || type === 'docx' || type === 'xlsx' || type === 'xls' || type === 'ppt' || type === 'pptx') {
        // 在当前浏览器直接下载
        document.location.href = url
      } else {
        // 图片在浏览器打开 新的页面展示
        window.open(url, '图片')
      }
    },
    initFileList(){
      let that=this;
      let params = {
        servicecode: "ar0161",
        doc_check_list_no: that.data_list_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200") {
            res.data.forEach(item => {
              var file = new Object();
              file.original_file_name ='';
              file.file_path ='';
              file.doc_no=item.doc_no;
              file.doc_name = item.doc_name;
              file.part_project_no=this.part_project_no;
              file.data_list_no=that.data_list_no;
              file.version=that.version
              that.newList.push(file);
            })
          }
        }).catch(err => {
        console.error(err);
      })

    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let that = this;
      let params = {
        list01:that.newList,
        servicecode:"pt0324"
      }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: "提交失败"
              });
            }else{
              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          }).catch(err => {
            console.error(err);
          });
    },
  },
  watch: {
    //监听文件列表
    newList: function (newVal, oldVal) {
      this.$emit('fun', {backData: this.newList});
    }
  },
  filters: {
    //时间过滤器
    formatDate: function (val) {
      let date = new Date(val);
      return appMain.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    }
  },
  computed: {},
  created() {
    this.part_project_no = this.cParentParams.part_project_no;
    this.tranType = this.cParentParams.tranType;
    this.data_list_no=this.cParentParams.data_list_no;
    this.project_template_no = this.cParentParams.project_template_no;
    this.version= this.cParentParams.version;
    this.initFileList();
  }
}
</script>

<style scoped>
.uploadFils {
  width: 100%;
  margin-top: 20px;
  padding: 4px;
  min-height: 100px;
  box-sizing: border-box;
}
.mt20 {
  margin-top: 20px;
}
.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}
.upload-demo {
  margin-left:13px;
}
.form-button {
  width: 80px;
  margin: 0 10px;
}
</style>
