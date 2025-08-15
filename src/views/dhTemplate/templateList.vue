<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form :model="templateForm" ref="templateForm" :rules="rules" label-width="150px" class="custom-common--form">
          <el-row>
            <el-col :span="8">
              <el-form-item class="require-asterisk" label="模板类型: " prop="type" >
                <el-select v-model="templateForm.type" placeholder="请选择模板类型">
                  <el-option v-for="item in templateTypeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTemplate">查询</el-button>
<!--              <el-button @click="reset">{{$i18ns('重置')}}</el-button>-->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-toolbar">
        <el-button type="primary" size="mini" @click="addTemplate">新增模板</el-button>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" :before-close="cooperationDialogCancle" :append-to-body="true">
        <div class="dialog_content">
          <el-form ref="dialogForm" :rules="dialogRules" :inline="true" :label-position="right" :model="dialogForm">
            <el-row>
              <el-form-item class="require-asterisk" label="模板类型: " prop="type">
                <el-select v-model="dialogForm.type" placeholder="请选择模板类型" @change="changeTypeValue" :disabled="isUpadate" >
                  <el-option v-for="item in templateTypeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="require-asterisk" label="模板文件" prop="fileList">
                <el-upload
                  class="credential-upload"
                  :on-change="fileChange"
                  :on-remove="fileRemove"
                  :limit="1"
                  :file-list="fileList"
                  :auto-upload="false"
                >
                  <el-button size="small">{{$i18ns('选择')}}文件</el-button>
                </el-upload>
              </el-form-item>
            </el-row>
            <el-row class="button-footer">

              <el-button type="primary" size="small" @click="submit">提交</el-button>
              <el-button @click="clickCancel">{{$i18ns('取消')}}</el-button>
            </el-row>
          </el-form>
        </div>
      </el-dialog>
      <div class="container-centent--table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          stripe
        >
          <el-table-column
          label="模板类型"
          prop="type"
          align="center"
          :formatter="formatTypeData"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="updateItem(scope)">修改</el-button>
              <el-button type="text" @click="downloadItem(scope)">{{$i18ns('下载')}}</el-button>
              <el-button type="text" @click="deleteItem(scope)">{{$i18ns('删除')}}</el-button>
            </template>
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
</template>


<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  export default {
    name: "templateList",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
      return{
        tableData: [], //表格数据
        isShowPage:false,
        templateForm:{
          type: ""
        },
        rules: {
          type: [
            {
              required: true,
              message: "请选择模板类型"
            }
          ]
        },
        currentPage: 1,
        tableTotal: 10,
        temptemplateForm: [],  //查询
        templateTypeOptions:[],  //贷款账户状态字典
        tableSize: 10,

        isUpadate:false,
        fileList: [], // 文件清单
        servicecode: "",
        dialogVisible: false,
        dialogTitle: "",
        dialogForm: {
          type: '', //模板类型,
          fileName: '',
          fileType: '',
          filebase64: ''
        },
        templateTypeOptions: [],
        dialogRules: {
          type: [
            {
              required: true,
              message: "请选择模板类型"
            }
          ],
          fileList: [
            { validator: this.fileListValidate, trigger: 'change' }
          ]
        }
      }
    },
    created() {
      this.getDictList("E_TEMPLATETP","templateTypeOptions");
    },
    methods: {
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

      formatTypeData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.templateTypeOptions.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictName;
          }
        })
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
      searchTemplate() {
        this.$refs.templateForm.validate(valid => {
          if (valid) {
            this.temptemplateForm = _.cloneDeep(this.templateForm);
            this.currentPage = 1;
            this.getTableData();
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过",
            })
          }
        })
      },
      reset() {
        this.templateForm.type="";
      },
      /**
       * 获取列表数据
       */
      getTableData() {
        let reqMap = {
          type: this.templateForm.type,
          servicecode: "PLMSKGTS0081",
          start: this.currentPage,
          length: this.tableSize,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.isShowPage = true;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;

          }
        }).catch(err => {
          console.error(err);
        });
      },

      /**
       * 新增模板
       */
      addTemplate() {
        this.dialogTitle="新增模板";
        this.dialogVisible=true;
        this.addOrUpdate="PLMSKGTS0082";
        this.dialogForm={
          type: '', //模板类型,
          fileName: '',
          fileType: '',
          filebase64: '',
          fileList: []
        };
        this.fileList=[];
        this.isUpadate=false;
      },
      //选择文件
      fileChange(file, fileList) {
        const isLt8M = file.size / 1024 / 1024 < 8;
        if (!isLt8M) {
          this.ticketUploadList.splice(fileList.indexOf(file), 1);
          this.$message({
            type: "warning",
            message: `${this.applyTypeLabel}文件大于8M`
          })
        }
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = () => {
          console.log('file 转 base64结果：' + reader.result.substring(reader.result.indexOf(',')+1));
          this.dialogForm.fileName = file.name.split(".")[0];
          this.dialogForm.fileType = file.name.split(".")[1];
          this.dialogForm.filebase64 = reader.result.substring(reader.result.indexOf(',')+1);
        }
        this.fileList.push(file);
        this.$refs.dialogForm.validateField("fileList");
      },

      /**
       * 文件清单移除回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      fileRemove(file, fileList) {
        this.fileList.forEach((item, index) => {
          if (item.uid === file.uid) {
            this.fileList.splice(index, 1);
          }
        });
        this.$refs.dialogForm.validateField("fileList");
      },

      fileListValidate(rule, value, callback) {
        if (this.fileList.length === 0) {
          return callback(new Error("请上传文件"));
        }
        return callback();
      },
      updateItem(item){
        this.dialogTitle="修改模板";
        this.dialogVisible=true;
        this.addOrUpdate="PLMSKGTS0083";
        this.dialogForm.type=item.row.type;
        this.dialogForm.fileName=item.row.fileName;
        this.dialogForm.fileType=item.row.fileType;
        this.dialogForm.filebase64=item.row.filebase64;
        this.dialogForm.fileList = [];
        this.fileList=[];
        this.isUpadate=true;
      },
      downloadItem(item) {
        let filebase64=item.row.filebase64;
        let URL = this.dataUrlToBlob(filebase64);
        var reader = new FileReader();
        reader.readAsDataURL(URL);
        reader.onload = function (e) {
          const a = document.createElement('a');
          // a.download = '高危客户一览表.xls';
          a.download = item.row.fileName + "." + item.row.fileType;
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a)
        }
      },
      dataUrlToBlob(data){
        var bstr = atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: 'xls' });
      },
      /**
       * 表单提交
       */
      submit() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            let params = {
              servicecode: this.addOrUpdate,
              type:this.dialogForm.type,
              fileName:this.dialogForm.fileName,
              fileType:this.dialogForm.fileType,
              filebase64:this.dialogForm.filebase64,

            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if (res && res.code === "200") {
                this.dialogVisible=false;
                this.dialogForm={
                  type: '', //模板类型,
                  fileName: '',
                  fileType: '',
                  filebase64: '',
                  fileList: []
                };
                this.fileList=[];
                this.addOrUpdate="";
                this.searchTemplate();
                this.$message({
                  type: "success",
                  message: "操作成功"
                })
              }
            }).catch(err => {
              console.error(err);
            });
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过",
            })
          }
        })
      },
      /**
       * 删除
       */
      deleteItem(item) {
        this.$confirm("此操作将删除模板, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let reqMap = {
            type: item.row.type,
            servicecode: "PLMSKGTS0084"
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
            if (res && res.code === "200") {
              this.searchTemplate();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(err => {
            console.error(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      },
      /*
    * 取消
    */
      clickCancel() {
        this.dialogVisible=false;
        this.dialogForm={
          type: '', //模板类型,
          fileName: '',
          fileType: '',
          filebase64: '',
          fileList: []
        };
        this.addOrUpdate="";
        this.fileList=[];
      }

    }
  }
</script>


<style lang="less" scoped>
  .container-content {
    .container-content--search {
      padding: 16px 40px 0 12px;
      border-bottom: 1px solid #e3e8f5;
    }
    .container-content--toolbar{
      padding: 10px;
    }
    .container-content--pagination{
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
    text-align: center;
    padding: 0 0 10px 0;
  }
  .container-toolbar {
    margin: 10px 0;
  }
  .dialog_content {
    width: 100%;
  }
  .title_tag {
    font-family: "PingFang SC";
    font-size: 18px;
    font-weight: bold;
    margin: 18px;
  }
  .button-footer {
    text-align: center;
    padding: 0 0 10px 0;
  }
</style>
