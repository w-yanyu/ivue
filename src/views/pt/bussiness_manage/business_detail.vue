<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="custom-common--form">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户名称')" prop="partner_name" class="upload-item" >
            <el-input v-model="ruleForm.partner_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户类型')" prop="business_tp">
            <el-select v-model="ruleForm.business_tp" disabled :placeholder="$i18ns('商户类型')">
              <el-option   v-for="(item, index) in busi_typelist"
                           :key="index"
                           :label="item.dictName"
                           :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('是否优质')"  prop="good_if">
            <el-select v-model="ruleForm.good_if" disabled :placeholder="$i18ns('部件分类')">
              <el-option   v-for="(item, index) in good_iflist"
                           :key="index"
                           :label="item.dictName"
                           :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('省份')" prop="province_code">
            <el-select v-model="ruleForm.province_code" disabled :placeholder="$i18ns('请选择省份（直辖市）')" @change="renderCity" clearable>
              <el-option
                v-for="item in provinceListAll"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('城市')" prop="city_code">
            <el-select v-model="ruleForm.city_code" disabled :placeholder="$i18ns('请选择城市')" @change="renderDistrict" clearable>
              <el-option
                v-for="item in cityListAll"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('镇区')" prop="district_code">
            <el-select v-model="ruleForm.district_code" disabled :placeholder="$i18ns('请选择镇区')"  clearable>
              <el-option
                v-for="item in districtListAll"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('法定代表人')" prop="partner_corp_name" class="upload-item">
            <el-input v-model="ruleForm.partner_corp_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('联系方式')" prop="contact_info" class="upload-item">
            <el-input v-model="ruleForm.contact_info" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('社会信用代码')" prop="business_license_no" class="upload-item">
            <el-input v-model="ruleForm.business_license_no" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('注册时间')" prop="regist_time" class="upload-item">
            <el-input v-model="ruleForm.regist_time" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('注册资本')" prop="reg_capital" class="upload-item">
            <el-input v-model="ruleForm.reg_capital" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('年营业额')" prop="turnover_year" class="upload-item">
            <el-input v-model="ruleForm.turnover_year" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('员工人数')" prop="staff_number" class="upload-item">
            <el-input v-model="ruleForm.staff_number" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户地址')" prop="address" class="upload-item">
            <el-input v-model="ruleForm.address" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户收款户名')" prop="acct_nm" class="upload-item">
            <el-input v-model="ruleForm.acct_nm" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户收款账号')" prop="acct_num" class="upload-item">
            <el-input v-model="ruleForm.acct_num" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('开户行')" prop="open_acct_bank" class="upload-item">
            <el-input v-model="ruleForm.open_acct_bank" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('固定电话')" prop="partner_phone" class="upload-item">
            <el-input v-model="ruleForm.partner_phone" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('营业执照')"  class="img-item">
            <el-image v-for="(ls,index) in filelst01" :key="index"
              style="width: 100px; height: 100px"
              :src="ls.url"
              :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst01.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('同意收款确认书')"  class="img-item">
            <el-image v-for="(ls,index) in filelst02" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst02.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('法人代理证明材料')"  class="img-item">
            <el-image v-for="(ls,index) in filelst03" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst03.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('装修资质证明')"  class="img-item">
            <el-image v-for="(ls,index) in filelst04" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst04.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('法人有效A类储蓄卡副本')"  class="img-item">
            <el-image v-for="(ls,index) in filelst05" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst05.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('员工是上门照片')"  class="img-item">
            <el-image v-for="(ls,index) in filelst06" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst06.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('法人名片')"  class="img-item">
            <el-image v-for="(ls,index) in filelst07" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst07.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('商户店内实景')" >
            <el-image v-for="(ls,index) in filelst08" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"   class="img-item"></el-image>
            <el-image v-if="filelst08.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('其它')"  class="img-item">
            <el-image v-for="(ls,index) in filelst09" :key="index"
                      style="width: 100px; height: 100px"
                      :src="ls.url"
                      :fit="fit"  class="img-item"></el-image>
            <el-image v-if="filelst09.length==0"
                      style="width: 100px; height: 100px"
                      src="src/assets/icon/pic/default.jpg"
                      :fit="fit"  class="img-item"></el-image>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  name: "BusinessAdd",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  created() {
    this.dataInit();
    this.getArea("0","P");
    this.getDict("PT_E_BUSINESS_TYPE","busi_typelist");
    this.getDict("MS_E_YESORNO","good_iflist");
  },
  data() {
    return {
      ruleForm: {
        partner_name: "", // 商户名称
        business_tp: "", // 商户类型
        good_if:"",//是否优质
        contact_info:"",//联系方式
        province_code:"",//省份
        province_name:"",
        city_code:"",//市区
        city_name:"",
        district_code:"",//镇区
        district_name:"",
        partner_corp_name:"",//法人
        business_license_no:"",//信用证代码
        reg_capital:"",//注册资本
        regist_time:"",//注册时间
        acct_nm:"",//收款账户名
        acct_num:"",//收款账号
        partner_phone:"",//固定电话
        open_acct_bank:"",//开户行
        turnover_year:"",//年营业额
        staff_number:"",//员工人数
        address:"",//地址
        fileList: [], // 文件清单
        servicecode:"pt0902"
      },
      busi_typelist:[],//商户类型
      good_iflist:[],//是否优质
      provinceListAll:[],//
      cityListAll:[],//
      districtListAll:[],//
      filelst01:[],
      filelst02:[],
      filelst03:[],
      filelst04:[],
      filelst05:[],
      filelst06:[],
      filelst07:[],
      filelst08:[],
      filelst09:[],
      fileList: [], // 文件对象
    }
  },
  methods: {
    /**
     * 文件清单初始化
     */
    dataInit() {
      let params = {
        partner_no: this.cParentParams.partner_no,
        servicecode: "pt0906",
      }
      let  that = this;
      that.filelst01=[];
      that.filelst02=[];
      that.filelst03=[];
      that.filelst04=[];
      that.filelst05=[];
      that.filelst06=[];
      that.filelst07=[];
      that.filelst08=[];
      that.filelst09=[];
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.ruleForm=res.data.baseinfo;
          that.getArea(this.ruleForm.province_code,"C");
          that.getArea(this.ruleForm.city_code,"D");
          res.data.filelist.forEach(item => {
            switch (item.file_id){
               case "1":
                that.filelst01.push({ name: item.file_name, url: item.file_path});
                break;
              case "2":
                console.info("2222")
                that.filelst02.push({ name: item.file_name, url: item.file_path});
                break;
              case "3":
                that.filelst03.push({ name: item.file_name, url: item.file_path});
                break;
              case "4":
                that.filelst04.push({ name: item.file_name, url: item.file_path});
                break;
              case "5":
                that.filelst05.push({ name: item.file_name, url: item.file_path});
                break;
              case "6":
                that.filelst06.push({ name: item.file_name, url: item.file_path});
                break;
              case "7":
                that.filelst07.push({ name: item.file_name, url: item.file_path});
                break;
              case "8":
                that.filelst08.push({ name: item.file_name, url: item.file_path});
                break;
              case "9":
                that.filelst09.push({ name: item.file_name, url: item.file_path});
                break;
            }
          });

        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 文件上传自定义校验事件
     */
    fileListValidate(rule, value, callback) {
      if (this.fileList.length === 0) {
        return callback(new Error("请上传文件清单"));
      }
      return callback();
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleChange(file, fileList,id) {
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData).then(res => {
        if (res && res.code === "200") {
          file.status = "success";
          this.fileList.push(file);
          this.ruleForm.fileList.push({ file_name: res.data.filename, file_path: res.data.path, original_file_name: res.data.oldName,file_id:id});
          this.$refs.ruleForm.validateField("fileList");
        }
      }).catch(err => {
        console.error(err)
      })
    },

    /**
     *
     * 图片预览
     */
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

    },
    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleRemove(file, fileList) {
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.ruleForm.fileList.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      });
      this.$refs.ruleForm.validateField("fileList");
    },
    /**
     * 获取省份数据
     *
     */
    getArea(code,type){
      let that=this
      let param ={
        servicecode: "ct2200",
        parent_code: code
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", param)
        .then(res => {
          if (res && res.code === "200") {
            if(type=="P"){
              that.provinceListAll=res.data;
            }else if(type=="C"){
              that.cityListAll=res.data;
            }else{
              that.districtListAll=res.data;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取城市列表
     */
    renderCity(value){
      if(value!=null||value!=""||value!=undefined){
        this.getArea(value,"C")
      }
    },
    /**
     *
     * 获取县区列表
     */
    renderDistrict(value){
      if(value!=null||value!=""||value!=undefined){
        this.getArea(value,"D")
      }
    },
    /**
     * 表单提交
     */
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = this.ruleForm;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$message({
                type: "success",
                message: "操作成功"
              })
              this.$emit("update", {});
            }
            this.$dataBus.doCallBack(this, {});
          }).catch(err => {
            console.error(err)
          })
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    cancel() {
      this.$dataBus.doCallBack(this, {});
    },
    /**
     * 获取字典
     */
    getDict(type,listkey){
      let params = {
        dictType: type,
        dictKey: [type]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listkey]=res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
  }
}
</script>
<style lang="less" scoped>
/deep/.custom-common--form {
  .upload-item {
    .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
}
/deep/ .el-upload--picture-card{
  width: 100px;
  height: 100px;
}
/deep/ .el-upload{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail{
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .avatar{
  width: 100px;
  height: 100px;
}
.img-item{
  padding: 10px;
}
</style>
