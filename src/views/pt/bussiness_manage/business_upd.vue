<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="custom-common--form">
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户名称')" prop="partner_name"  >
            <el-input v-model="ruleForm.partner_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户类型')" prop="business_tp">
            <el-select v-model="ruleForm.business_tp" :placeholder="$i18ns('商户类型')">
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
            <el-select v-model="ruleForm.good_if" :placeholder="$i18ns('部件分类')">
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
            <el-select v-model="ruleForm.province_code" :placeholder="$i18ns('请选择省份（直辖市）')" @change="renderCity" clearable>
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
            <el-select v-model="ruleForm.city_code" :placeholder="$i18ns('请选择城市')" @change="renderDistrict" clearable>
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
            <el-select v-model="ruleForm.district_code" :placeholder="$i18ns('请选择镇区')" @change="renderSelf" clearable>
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
          <el-form-item :label="$i18ns('法定代表人')" prop="partner_corp_name" >
            <el-input v-model="ruleForm.partner_corp_name" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('联系方式')" prop="contact_info" >
            <el-input v-model="ruleForm.contact_info" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('社会信用代码')" prop="business_license_no" >
            <el-input v-model="ruleForm.business_license_no" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('注册时间')" prop="regist_time" >
            <el-date-picker
              v-model="ruleForm.regist_time"
              type="date"
              value-format="yyyyMMdd"
              :placeholder="$i18ns('选择日期')">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('注册资本')" prop="reg_capital" >
            <el-input v-model="ruleForm.reg_capital" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('年营业额')" prop="turnover_year" >
            <el-input v-model="ruleForm.turnover_year" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('员工人数')" prop="staff_number" >
            <el-input v-model="ruleForm.staff_number" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户地址')" prop="address" >
            <el-input v-model="ruleForm.address" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户收款户名')" prop="acct_nm" >
            <el-input v-model="ruleForm.acct_nm" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('商户收款账号')" prop="acct_num" >
            <el-input v-model="ruleForm.acct_num" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('开户行')" prop="open_acct_bank" >
            <el-input v-model="ruleForm.open_acct_bank" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('固定电话')" prop="partner_phone">
            <el-input v-model="ruleForm.partner_phone" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="$i18ns('营业执照')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 1)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst01"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
          <el-form-item :label="$i18ns('同意收款确认书')"  class="upload-item">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 2)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst02"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('法人代理证明材料')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 3)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst03"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('装修资质证明')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 4)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst04"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('法人有效A类储蓄卡副本')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 5)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst05"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('员工是上门照片')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 6)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst06"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item span="12" :label="$i18ns('法人名片')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 7)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst07"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('商户店内实景')"  class="upload-item">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 8)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst08"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('其它')"  class="upload-item ">
            <el-upload
              class="upload-demo"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-change="(file, fileList) => {handleChange(file, fileList, 9)}"
              :on-remove="handleRemove"
              :limit="5"
              :file-list="filelst09"
              :auto-upload="false">
              <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit"  plain>{{$i18ns('保存')}}</el-button>
        <el-button size="small" @click="cancel">{{$i18ns('取消')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  name: "BusinessUpd",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  created() {
    this.ruleForm.seq_no=this.cParentParams.seq_no;
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
        partner_no:"",
        seq_no:"",
        fileList: [], // 文件清单
        servicecode:"pt0907"
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
      filelst10:[],
      rules: {
        partner_name: [
          { required: true, message: "请输入商户名称" }
        ],
        business_tp: [
          { required: true, message: "请选择商户类型" }
        ],
        good_if: [
          {required: true, message: "请选择是否优质" }
        ],
        province_code: [
          {required: true, message: "请选择省份" }
        ],
        city_code: [
          {required: true, message: "请选择市区" }
        ],
        partner_corp_name: [
          {required: true, message: "请输入法定代表人" }
        ],
        contact_info: [
          {required: true, message: "请输入联系方式" }
        ],
        business_license_no: [
          {required: true, message: "请输入统一社会信用代码" }
        ],
        regist_time: [
          {required: true, message: "请输入注册时间" }
        ],
        acct_nm: [
          {required: true, message: "请输入收款账户名" }
        ],
        acct_num: [
          {required: true, message: "请输入收款账号" }
        ],
        open_acct_bank: [
          {required: true, message: "请输入开户行" }
        ],
        address: [
          {required: true, message: "请输入地址" }
        ],
      },
      fileList: [], // 文件对象
    }
  },
  methods: {
    /**
     * 文件清单初始化
     */
    dataInit() {
      let params = {
        seq_no: this.cParentParams.seq_no,
        servicecode: "pt0904",
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
      that.ruleForm.fileList.fileList=[];
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.ruleForm.partner_name=res.data.baseinfo.partner_name;
          that.ruleForm.business_tp=res.data.baseinfo.business_tp;
          that.ruleForm.good_if=res.data.baseinfo.good_if;
          that.ruleForm.contact_info=res.data.baseinfo.contact_info;
          that.ruleForm.province_code=res.data.baseinfo.province_code;
          that.ruleForm.province_name=res.data.baseinfo.province_name;
          that.ruleForm.city_code=res.data.baseinfo.city_code;
          that.ruleForm.city_name=res.data.baseinfo.city_name;
          that.ruleForm.district_code=res.data.baseinfo.district_code;
          that.ruleForm.district_name=res.data.baseinfo.district_name;
          that.ruleForm.partner_corp_name=res.data.baseinfo.partner_corp_name;
          that.ruleForm.business_license_no=res.data.baseinfo.business_license_no;
          that.ruleForm.regist_time=res.data.baseinfo.regist_time;
          that.ruleForm.reg_capital=res.data.baseinfo.reg_capital;
          that.ruleForm.acct_nm=res.data.baseinfo.acct_nm;
          that.ruleForm.acct_num=res.data.baseinfo.acct_num;
          that.ruleForm.partner_phone=res.data.baseinfo.partner_phone;
          that.ruleForm.open_acct_bank=res.data.baseinfo.open_acct_bank;
          that.ruleForm.turnover_year=res.data.baseinfo.turnover_year;
          that.ruleForm.staff_number=res.data.baseinfo.staff_number;
          that.ruleForm.address=res.data.baseinfo.address;
          that.getArea(this.ruleForm.province_code,"C");
          that.getArea(this.ruleForm.city_code,"D");
          res.data.filelist.forEach(item => {
            that.ruleForm.fileList.push({ file_name: item.file_name, file_path: item.file_path, original_file_name: item.original_file_name,file_id:item.file_id});
            switch (item.file_id){
              case "1":
                that.filelst01.push({ name: item.file_name, url: item.file_path});
                break;
              case "2":
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
      this.ruleForm.fileList.forEach((item, index) => {
        if (item.file_path === file.url) {
          this.ruleForm.fileList.splice(index, 1);
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
      let obj = {};
      obj = this.provinceListAll.find((item) => {
        return item.code === value;
      });
      console.info(obj);
      this.ruleForm.province_name = obj.name;
      if(value!=null||value!=""||value!=undefined){
        this.getArea(value,"C")
      }
    },
    /**
     * 获取区中文名
     */
    renderSelf(value){
      let obj = {};
      obj = this.districtListAll.find((item) => {
        return item.code === value;
      });
      this.ruleForm.district_name = obj.name;
      console.info("111111"+this.ruleForm.district_name);
    },
    /**
     *
     * 获取县区列表
     */
    renderDistrict(value){
      let obj = {};
      obj = this.cityListAll.find((item) => {
        return item.code === value;
      });
      this.ruleForm.city_name = obj.name;
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
          this.ruleForm.partner_no= this.cParentParams.partner_no;
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

</style>
