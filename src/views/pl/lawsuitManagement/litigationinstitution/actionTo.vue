<template>
  <div>
    <div>
	</div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="5">
          <template slot="title">
            <span><em></em>{{$i18ns('合作机构导入')}}</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
               <el-col :span="7">
                            <el-form-item class="require-asterisk" :label="$i18ns('引进模式')" prop="introductmode">
                                <el-select v-model="appForm.introductmode" placeholder="请选择引进模式">
                                    <el-option
                                    v-for="(item, index) in applyStatusList"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
              </el-col>
            </el-row>
        <el-row>
        <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('引进材料')" prop="cgcl">
                  <upload-file ref="cgclProp" :uploadFileList="appForm.cgcl" :uploadDisabled="false" @changeFile="cgclChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>

        </el-row>
         <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('机构批量导入')" prop="cgqd">
                   <upload-file  ref="cgqdProp" :uploadFileList="appForm.cgqd" :uploadDisabled="false" :limit="1" @changeFile="cgqdChange" :key="timer"> </upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button size="small"  class="container-centent" type="primary" @click="download">{{$i18ns('模板导出')}}</el-button>
              </el-col>
        </el-row>
        <el-row>
           <el-col :span="8">
                <el-form-item :label="$i18ns('其他附件')" prop="cgpstzs">
                  <upload-file ref="cgpstzsProp" :uploadFileList="appForm.cgpstzs" :uploadDisabled="false" @changeFile="cgpstzsChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
        </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('提交')}}</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
 // import ApplicationRetentUpload from "@/views/fs/components/ApplicationRetentUpload";
 // import UploadFile from "@/views/pl/components/UploadFile.vue";
 import UploadFile from "@/views/pl/lawsuitManagement/litigationinstitution/uploadButtonPl.vue"; //minio文件上传按钮
  export default {
    name: "ApplicationRetent",
    components: {
      UploadFile
    //  ApplicationRetentUpload,

    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        appForm:{
         introductmode:"0",//引进模式
          cgqd:"",//采购清单
          cgpstzs:[],//采购评审通知书
          cgcl:[],
          remark: "", // 备注
          review:"",//采购评审通知书编号
        },
        activeNames: ["5"],
        applyStatusList:[], //申请状态字典
      }

    },
    created() {
      this.getDictList("PL_E_INTROMODE","applyStatusList");
      this.initRule();
    },

    methods: {
       /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictType
       * @param listKey 列表对象key名称
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
    download(){
    // let  url= "C:\\Users\\65419\\AppData\\Local\\Temp\\123.xlsx";
    // let  url= "http://10.22.12.157:9000/repository-latest/2022-04-21/6a6f37a2-9f9b-4e22-851e-b7027c85e9b3.xlsx";
    let  url= "http://10.22.12.157:9000/repository-latest/2022-04-21/6a6f37a2-9f9b-4e22-851e-b7027c85e9b3%20.xlsx";
        document.location.href =url;
       // document.location.href ="C:\Users\65419\Desktop\资产保全\合作机构导入模板.xlsx";

          // if (res && res.code === "200") {
          //   let fileString = res.data[0].filebase64;
          //   //let URL = this.dataUrlToBlob(fileString, 'xlsx');
          //   let URL = "C:\\Users\\65419\\AppData\\Local\\Temp\\d96e0fcb-5c9c-40ee-8a84-b1bff64a4ee85437309033022817288.xlsx";
          //   var a = document.createElement("a");
          //   a.download = '合作机构导入模板.xlsx';
          //   a.style.display = "none";
          //   a.href = window.URL.createObjectURL(URL);
          //   document.body.appendChild(a);
          //   a.click();
          //   document.body.removeChild(a);
          // }


      },
       dataUrlToBlob(data, prefix) {
        var bstr = window.atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: prefix });
      },
      clearData(){
        this.appForm ={
          introductmode:"0",//引进模式
          cgqd:[],//采购清单
          cgpstzs:[],//采购评审通知书
          cgcl:[],
          remark: "", // 备注
          review:"",//采购评审通知书编号
        }
        this.$refs.cgclProp.clearFileList();
        this.$refs.cgqdProp.clearFileList();
        this.$refs.cgpstzsProp.clearFileList();
      },
      initRule(){
        this.appRules = {
           fileType: [{required: true,  message: "请选择类型"}],
            cgqd:[{ validator: this.cgqdValidate, trigger: 'change' }],
            cgcl:[{ validator: this.cgclValidate, trigger: 'change' }],
        }
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
                servicecode: "pl0564",
                cgpstzs:this.appForm.cgpstzs,//其他材料
                cgcl:this.appForm.cgcl,//引进材料
                cgqd:this.appForm.cgqd,//采购清单
               // remarks:this.appForm.remark,  //备注
                introductmode:this.appForm.introductmode,//引进模式
                //review:this.appForm.review,//采购评审通知书编号
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                  this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      cgqdChange(val){
        this.appForm.cgqd= val;
            console.log("cgqd",this.appForm.cgqd)
      },
      cgclChange(val){this.appForm.cgcl= val;},
      cgqdValidate(value, rule, callback) {if (this.appForm.cgqd.length === 0) {  return callback(new Error("请上传机构批量导入清单"));   }return callback();   },
      cgclValidate(value, rule, callback) {if (this.appForm.cgcl.length === 0) {  return callback(new Error("请上传引进材料"));   }return callback();   },
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
    .container-centent {
           background: #67C23A!important;
           border-color: #67C23A!important;
    }
</style>
