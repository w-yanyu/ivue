<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>机构信息</span>
          </template>
          <el-form ref="basicForm" :model="basicForm" label-width="250px"
                   class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="机构名称" prop="acceptance_name">
                  <el-input v-model="basicForm.acceptance_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="机构类型: " prop="case_acceptance_name">
                  <el-input v-model="basicForm.case_acceptance_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域中心: " prop="area_center_name">
                  <el-input v-model="basicForm.area_center_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="磋商编号: " prop="consultations_id">
                  <el-input v-model="basicForm.consultations_id" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>合作机构资料</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="签约日期" prop="signDate">
                  <el-date-picker
                    v-model="appForm.signDate"
                    align="right"
                    style="width:200px"
                    type="date"
                    placeholder="请选择签约日期"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="合作起止时间" prop="coopDate">
                  <el-date-picker
                    v-model="appForm.coopDate"
                    align="right"
                    style="width:400px"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="合作起始时间"
                    end-placeholder="合作终止时间"
                    value-format="yyyyMMdd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="执业许可证（正副本）/营业执照" prop="yyzz">
                  <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="false"
                      @changeFile="yyzzChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="律师证" prop="zzcblsz">
                  <upload-file ref="zzcblszProp" :uploadFileList="appForm.zzcblsz" :uploadDisabled="false"
                      @changeFile="zzcblszChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="外包诉讼协议" prop="wbssxy">
                  <upload-file ref="wbssxyProp" :uploadFileList="appForm.wbssxy" :uploadDisabled="false"
                      @changeFile="wbssxyChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="法律意见审定表" prop="flyjsdd">
                  <upload-file ref="flyjsddProp" :uploadFileList="appForm.flyjsdd" :uploadDisabled="false"
                      @changeFile="flyjsddChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="廉洁合作承诺书" prop="ljhzcns">
                  <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="false"
                      @changeFile="ljhzcnsChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公场所照片" prop="bgcszp">
                  <upload-file ref="bgcszpProp" :uploadFileList="appForm.bgcszp" :uploadDisabled="false"
                      @changeFile="bgcszpChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark" autosize="true" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
      <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import SuitUtils from "@/views/pl/lawsuitManagement/fscommonComponets/SuitUtils";
  import UploadFile from "@/views/fs/components/UploadFile.vue";

  export default {
    name: "HandleLegalOrgConfirm",
    components: {
      UploadFile,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        isHandleChange:false, //经办岗页面是否有改动
        unWatch:[], //监听对象
        basicForm: { // 基础信息表单对象
          consultations_id: "",//磋商编号
          area_center: "",     //区域中心
          area_center_name: "",//区域中心名称
          case_acceptance: "", //机构类型
          case_acceptance_name: "", //机构类型名称
          acceptance_name: "", //机构名称
          oa_org_id: "", //法诉机构编号
        },
        appForm: {
          signDate: "",//签约日期
          coopDate: "",//合作起止时间
          yyzz: [],//执业许可证（正副本）/营业执照
          zzcblsz: [],//律师证
          wbssxy: [],//外包诉讼协议
          flyjsdd: [],//法律意见审定表
          ljhzcns: [],//廉洁合作承诺书
          bgcszp: [],//办公场所照片
          remark: "", // 备注
        },
        appRules : {
          signDate: [{required: true, message: "请输入签约日期"}],
          coopDate: [{required: true, message: "请输入合作起止时间"}],
          yyzz: [{validator: this.yyzzValidate, trigger: 'change'}],
          wbssxy: [{validator: this.wbssxyValidate, trigger: 'change'}],
          flyjsdd: [{validator: this.flyjsddValidate, trigger: 'change'}],
          ljhzcns: [{validator: this.ljhzcnsValidate, trigger: 'change'}],
        },
        orgTypeList: [],
        activeNames: ["1", "2"],
      }
    },
    created() {
    // 清除上次遗留监听事件
      this.unWatch.forEach(item => {
        item();
      });
      SuitUtils.$off("resave");
      let self = this;
    // 经办岗接受工作台提交时的传参，并向工作台传入页面改动与否的参数
      SuitUtils.$on("resave", msg => {
        if(msg == self.$options.name){
          if(self.isHandleChange){
            SuitUtils.$emit("toWorkbench","change");
          }else{
            SuitUtils.$emit("toWorkbench","nochange");
          }
        }
      });
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
      this.getOutInfo();
    },

    methods: {
      /**
       * 申请监听
       */
      addWatch(){
        this.unWatch.push(this.$watch("appForm",function(){this.isHandleChange = true;},{deep:true}));
      },
      initRule() {
        if (this.basicForm.case_acceptance == 0) {
          this.appRules.zzcblsz = [{validator: this.zzcblszValidate, trigger: 'change'}];
        };
      },
      /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictType
       * @param listKey 列表对象key名称
       */
      getDictList(dictType, listKey) {
        let params = {
          dictType: dictType,
          dictKey: [dictType]
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
      /**
       * 机构类型名称
       */
      formatTypeData(data,list){
        let name = data;
        list.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictName;
          }
        })
        return name;
      },
      getOutInfo() {
        let params = {
          servicecode: "RLMSPLTS1323",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.plbLitiOrgChangeaniz;
              this.basicForm.consultations_id = response.consultations_id;
              this.basicForm.area_center = response.area_center;
              this.basicForm.area_center_name = response.area_center_name;
              this.basicForm.case_acceptance = response.case_acceptance;
              this.basicForm.case_acceptance_name = response.acceptance_name;
              this.basicForm.acceptance_name = response.acceptance_name;
              this.basicForm.oa_org_id = response.oa_org_id;
              this.appForm.signDate = response.sign_date;
              this.appForm.coopDate = [response.start_date,response.end_date];
              this.appForm.remark = response.remark;
              res.data.yyzz.forEach((element) => {
              this.appForm.yyzz.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              res.data.zzcblsz.forEach((element) => {
              this.appForm.zzcblsz.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              res.data.wbssxy.forEach((element) => {
              this.appForm.wbssxy.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              res.data.flyjsdd.forEach((element) => {
              this.appForm.flyjsdd.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              res.data.ljhzcns.forEach((element) => {
              this.appForm.ljhzcns.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              res.data.bgcszp.forEach((element) => {
              this.appForm.bgcszp.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              this.timer = new Date().getTime(); //更新timer，重新加载子组件
              this.initRule();
              this.addWatch();
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交保存?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1322",
                applid: this.cParentParams.applid,                  //申请编号
                oa_org_id: this.basicForm.oa_org_id,                //法诉机构编号
                consultations_id: this.basicForm.consultations_id,  //磋商编号
                area_center: this.basicForm.area_center,            //区域中心
                area_center_name: this.basicForm.area_center_name,  //区域中心名称
                case_acceptance: this.basicForm.case_acceptance,    //机构类型
                acceptance_name: this.basicForm.acceptance_name,    //机构名称
                sign_date : this.appForm.signDate,                   //签约日期
                start_date:this.appForm.coopDate[0],                //合作起始时间
                end_date:this.appForm.coopDate[1],                  //合作截止时间
                yyzz : this.appForm.yyzz,                           //营业执照
                zzcblsz : this.appForm.zzcblsz,                     //主执承办律师律师证
                wbssxy : this.appForm.wbssxy,                       //外包诉讼协议
                flyjsdd : this.appForm.flyjsdd,                     //法律意见审定单
                ljhzcns : this.appForm.ljhzcns,                     //廉洁合作
                bgcszp : this.appForm.bgcszp,                       //办公场所照片
                remark : this.appForm.remark,                       //备注
              };
              let startyear = params.sign_date.substr(0,4);
              let endyear = params.end_date.substr(0,4);
              if(params.end_date > params.sign_date){
                if(startyear != endyear){
                    this.$message({type: "warning", message: "签约日期至合作终止日期不可以跨年！"});
                    return;
                };
              }else{
                this.$message({type: "warning", message: "合作终止时间必须大于签约日期！"});
                return;
              };
              if(params.case_acceptance == 0){
                if(params.zzcblsz.length < 2){
                  this.$message({type: "warning", message: "请上传至少两份律师证材料！"});
                  return;
                };
              };
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.isHandleChange = false; //提交后，变回初始值
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      clearData() {
        this.appForm.yyzz = [];
        this.$refs.yyzzProp.clearFileList();//营业执照
        this.appForm.zzcblsz = [];
        this.$refs.zzcblszProp.clearFileList();//主执承办律师律师证
        this.appForm.wbssxy = [];
        this.$refs.wbssxyProp.clearFileList();//外包诉讼协议
        this.appForm.flyjsdd = [];
        this.$refs.flyjsddProp.clearFileList();//法律意见审定单
        this.appForm.ljhzcns = [];
        this.$refs.ljhzcnsProp.clearFileList();//廉洁合作承诺书
        this.appForm.bgcszp = [];
        this.$refs.bgcszpProp.clearFileList();//办公场所照片
      },
      reset() {
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.getOutInfo();
        })
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      yyzzChange(val) {//营业执照
        this.appForm.yyzz = val;
      },
      zzcblszChange(val) {//主执承办律师律师证
        this.appForm.zzcblsz = val;
      },
      wbssxyChange(val) {//外包诉讼协议
        this.appForm.wbssxy = val;
      },
      flyjsddChange(val) {//法律意见审定单
        this.appForm.flyjsdd = val;
      },
      ljhzcnsChange(val) {//廉洁合作承诺书
        this.appForm.ljhzcns = val;
      },
      bgcszpChange(val) {//办公场所照片
        this.appForm.bgcszp = val;
      },
      yyzzValidate(value, rule, callback) {
        if (this.appForm.yyzz.length === 0 ) {
          return callback(new Error("请上传营业执照"));
        }
        return callback();
      },
      zzcblszValidate(value, rule, callback) {
        if (this.appForm.zzcblsz.length === 0 ) {
          return callback(new Error("请上传主执承办律师律师证"));
        }
        return callback();
      },
      wbssxyValidate(value, rule, callback) {
        if (this.appForm.wbssxy.length === 0 ) {
          return callback(new Error("请上传外包诉讼协议"));
        }
        return callback();
      },
      flyjsddValidate(value, rule, callback) {
        if (this.appForm.flyjsdd.length === 0 ) {
          return callback(new Error("请上传法律意见审定表"));
        }
        return callback();
      },
      ljhzcnsValidate(value, rule, callback) {
        if (this.appForm.ljhzcns.length === 0 ) {
          return callback(new Error("请上传廉洁合作承诺书"));
        }
        return callback();
      },
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
  .line-change .el-form-item__label {
    text-align-last: center;
    line-height: 15px;
  }
</style>