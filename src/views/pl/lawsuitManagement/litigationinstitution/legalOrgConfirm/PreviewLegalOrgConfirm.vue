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
          <el-form ref="appForm" :model="appForm" label-width="250px" class="custom-common--form">
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
                    disabled="true"
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
                    value-format="yyyyMMdd"
                    disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="执业许可证（正副本）/营业执照" prop="yyzz">
                  <upload-file ref="yyzzProp" :uploadFileList="appForm.yyzz" :uploadDisabled="true"
                      @changeFile="yyzzChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="律师证" prop="zzcblsz">
                  <upload-file ref="zzcblszProp" :uploadFileList="appForm.zzcblsz" :uploadDisabled="true"
                      @changeFile="zzcblszChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="外包诉讼协议" prop="wbssxy">
                  <upload-file ref="wbssxyProp" :uploadFileList="appForm.wbssxy" :uploadDisabled="true"
                      @changeFile="wbssxyChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="法律意见审定表" prop="flyjsdd">
                  <upload-file ref="flyjsddProp" :uploadFileList="appForm.flyjsdd" :uploadDisabled="true"
                      @changeFile="flyjsddChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="廉洁合作承诺书" prop="ljhzcns">
                  <upload-file ref="ljhzcnsProp" :uploadFileList="appForm.ljhzcns" :uploadDisabled="true"
                      @changeFile="ljhzcnsChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办公场所照片" prop="bgcszp">
                  <upload-file ref="bgcszpProp" :uploadFileList="appForm.bgcszp" :uploadDisabled="true"
                      @changeFile="bgcszpChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" resize="none" v-model="appForm.remark" autosize="true" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";

  export default {
    name: "PreviewLegalOrgConfirm",
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
        basicForm: { // 基础信息表单对象
          consultations_id: "",//磋商编号
          area_center: "",     //区域中心
          area_center_name: "",//区域中心名称
          case_acceptance: "", //机构类型
          case_acceptance_name: "", //机构类型名称
          acceptance_name: "", //机构名称
        },
        appForm: {
          signDate: "",//签约日期
          coopDate: [],//合作起止时间
          yyzz: [],//执业许可证（正副本）/营业执照
          zzcblsz: [],//律师证
          wbssxy: [],//外包诉讼协议
          flyjsdd: [],//法律意见审定表
          ljhzcns: [],//廉洁合作承诺书
          bgcszp: [],//办公场所照片
          remark: "", // 备注
        },
        orgTypeList: [],
        activeNames: ["1", "2"],
      }
    },
    created() {
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
      this.getOutInfo();
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
            }
          })
          .catch(err => {
            console.error(err);
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
