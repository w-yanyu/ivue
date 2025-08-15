<template>
  <div>

    <div class="main-container">

      <el-tabs v-model="showNum" tab-position="left" @tab-click="handleClick">
        <el-tab-pane :label="$i18ns('基础信息')" name="0" :key="0" v-if="tranType === 'add'||tranType === 'modify'">
          <div>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="custom-common--form">
              <el-row>
                <el-col span="12">
                  <el-form-item :label="$i18ns('合作方名称')" prop="partner_name">
                    <el-input
                      :placeholder="$i18ns('请选择合作方')"
                      suffix-icon="el-input__icon el-icon-search"
                      v-model="ruleForm.partner_name"
                      @click.native="openDialog"
                      class="form-input"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('合作方编号')" prop="part_no" class="upload-item">
                    <el-input v-model="ruleForm.part_no"  disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('合作方式')" prop="part_method">
                    <el-select v-model="ruleForm.part_method" >
                      <el-option   v-for="(item, index) in part_methodList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议名称')" prop="protocol_name" class="upload-item">
                    <el-input v-model="ruleForm.protocol_name" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议有效状态')" prop="protocol_status">
                    <el-select v-model="ruleForm.protocol_status" >
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('生效日期')" prop="effect_date" class="upload-item">
                    <el-date-picker
                      v-model="ruleForm.effect_date"
                      type="date"
                      value-format="yyyyMMdd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('失效日期')" prop="expiry_date" class="upload-item">
                    <el-date-picker
                      v-model="ruleForm.expiry_date"
                      type="date"
                      value-format="yyyyMMdd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('续签提示提前天数')" prop="continued_day_advan" class="upload-item">
                    <el-input v-model="ruleForm.continued_day_advan" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('原协议编号')" prop="original_protocol_no" class="upload-item">
                    <el-input v-model="ruleForm.original_protocol_no" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否敞口管控')" prop="is_exposure_control">
                    <el-select v-model="ruleForm.is_exposure_control" >
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否有保证金')" prop="is_margin">
                    <el-select v-model="ruleForm.is_margin" >
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否分佣分润')" prop="is_commission">
                    <el-select v-model="ruleForm.is_commission">
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址1')" prop="protocol_addr1" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr1" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址2')" prop="protocol_addr2" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr2" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址3')" prop="protocol_addr3" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr3" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="custom-common--footer">
                <el-button v-if="tranType === 'add'" type="primary" size="small" @click="submitForm('ruleForm')" >{{$i18ns('保存')}}</el-button>
                <el-button v-if="tranType === 'modify'" type="primary" size="small" @click="submitForm('ruleForm')" >{{$i18ns('保存')}}</el-button>
                <el-button size="small" @click="resetForm('ruleForm')" v-if="tranType === 'add'">{{$i18ns('重置')}}</el-button>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$i18ns('基础信息')" name="0" :key="0" v-if="tranType === 'detail'">
          <div>
            <el-form ref="ruleForm" :model="ruleForm"  label-width="120px" class="custom-common--form">
              <el-row>
                <el-col span="12">
                  <el-form-item :label="$i18ns('合作方名称')" prop="partner_name">
                    <el-input
                      :placeholder="$i18ns('c')"
                      suffix-icon="el-input__icon el-icon-search"
                      v-model="ruleForm.partner_name"
                      disabled="true"
                      class="form-input"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('合作方编号')" prop="part_no" class="upload-item">
                    <el-input v-model="ruleForm.part_no"   disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('合作方式')" prop="part_method">
                    <el-select v-model="ruleForm.part_method" disabled="true">
                      <el-option   v-for="(item, index) in part_methodList"

                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议名称')" prop="protocol_name" class="upload-item">
                    <el-input v-model="ruleForm.protocol_name"  disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议有效状态')" prop="protocol_status">
                    <el-select v-model="ruleForm.protocol_status"  disabled="true">
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('生效日期')" prop="effect_date" class="upload-item">
                    <el-date-picker
                      v-model="ruleForm.effect_date"
                      type="date"
                      value-format="yyyyMMdd"
                      disabled="true"
                      :placeholder="$i18ns('选择日期')">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('失效日期')" prop="expiry_date" class="upload-item">
                    <el-date-picker
                      v-model="ruleForm.expiry_date"
                      type="date"
                      value-format="yyyyMMdd"
                      :placeholder="$i18ns('选择日期')"
                      disabled="true">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('续签提示提前天数')" prop="continued_day_advan" class="upload-item">
                    <el-input v-model="ruleForm.continued_day_advan"    disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('原协议编号')" prop="original_protocol_no" class="upload-item">
                    <el-input v-model="ruleForm.original_protocol_no"   disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否敞口管控')" prop="is_exposure_control">
                    <el-select v-model="ruleForm.is_exposure_control"   disabled="true" >
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否有保证金')" prop="is_margin">
                    <el-select v-model="ruleForm.is_margin"   disabled="true">
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('是否分佣分润')" prop="is_commission">
                    <el-select v-model="ruleForm.is_commission"   disabled="true">
                      <el-option   v-for="(item, index) in ysList"
                                   :key="index"
                                   :label="item.dictName"
                                   :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址1')" prop="protocol_addr1" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr1"    disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址2')" prop="protocol_addr2" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr2"    disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="$i18ns('协议地址3')" prop="protocol_addr3" class="upload-item">
                    <el-input v-model="ruleForm.protocol_addr3"    disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="custom-common--footer" v-if="tranType === 'add'||tranType === 'modify'">
                <el-button type="primary" size="small" @click="submitForm('ruleForm')"  plain>{{$i18ns('提交')}}</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">{{$i18ns('重置')}}</el-button>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="flag" v-for="(item, index) in partList" :key="index+1" :label="item.parts_name" :name="index+1">
          <to-json
            v-if="tranType === 'add'"
            :toUrl="item.add_url"
            :params="ruleForm">
          </to-json>
          <to-json
            v-if="tranType === 'modify'"
            :toUrl="item.update_url"
            :params="ruleForm">
          </to-json>
          <to-json
            v-if="tranType === 'detail'"
            :toUrl="item.info_url"
            :params="ruleForm">
          </to-json>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "agreeBaseInfoAdd",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },

  data() {
    return {
      ruleForm: {
        tranType: "",
        part_project_no:"",//项目编号
        project_template_no: "",//项目模版id
        protocol_template_no:"",//协议模版id
        part_protocol_no:"",
        partner_name:"",//合作方名称
        part_no:"",
        part_method:"",//合作方式
        protocol_name:"",//协议名称
        protocol_status:"",//协议有效状态
        expiry_date:"",
        effect_date:"",
        continued_day_advan:"",
        original_protocol_no:"",
        is_exposure_control:"",
        is_margin:"",
        is_commission:"",
        protocol_addr1:"",
        protocol_addr2:"",
        protocol_addr3:"",
        version:null
      },
      partList:[],
      part_methodList:[],
      ysList:[],
      tranType: "",
      show:false,
      showNum:0,
      flag:true,//tab页是否可点击
      rules: {
        partner_name: [
          { required: true, message: "请选择合作方" }
        ],
        protocol_name: [
          { required: true, message: "请输入协议名称" }
        ],
        part_method: [
          { required: true, message: "请选择合作方式" }
        ],
        effect_date: [
          { required: true, message: "请输入生效日期" }
        ],
        expiry_date: [
          { required: true, message: "请输入失效日期" }
        ]
      }
    }
  },
  computed: {
    partsListComputed: function () {
      let that = this;
      return that.partList.filter(function (item, index) {
        return that.showNum === index;
      })
    }
  },
  created() {
    this.tranType = this.cParentParams.tranType;
    this.ruleForm.project_template_no= this.cParentParams.project_template_no;
    this.ruleForm.protocol_template_no = this.cParentParams.parts_no;
    this.ruleForm.part_project_no = this.cParentParams.part_project_no;
    this.ruleForm.version = this.cParentParams.version;
    this.initData()
    this.getDict("PT_E_PART_METHOD","part_methodList");
    this.getDict("MS_E_YESORNO","ysList");
    console.log("version", this.version);
    //初始化字典
  },


  methods: {
    /**
     * 数据初始化
     */
    initData(){
      let params={
        servicecode:"pt0115",
        part_project_no:this.ruleForm.part_project_no,
        protocol_template_no:this.ruleForm.protocol_template_no,
        version:this.ruleForm.version,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.ruleForm.part_protocol_no=res.data.part_protocol_no;
          this.ruleForm.partner_name=res.data.partner_name;
          this.ruleForm.part_no=res.data.part_no;
          this.ruleForm.part_method=res.data.part_method;
          this.ruleForm.protocol_name=res.data.protocol_name;
          this.ruleForm.protocol_status=res.data.protocol_status;
          this.ruleForm.expiry_date=res.data.expiry_date;
          this.ruleForm.effect_date=res.data.effect_date;
          this.ruleForm.continued_day_advan=res.data.continued_day_advan;
          this.ruleForm.original_protocol_no=res.data.original_protocol_no;
          this.ruleForm.is_exposure_control=res.data.is_exposure_control;
          this.ruleForm.is_commission=res.data.is_commission;
          this.ruleForm.is_margin=res.data.is_margin;
          this.ruleForm.protocol_addr1=res.data.protocol_addr1;
          this.ruleForm.protocol_addr2=res.data.protocol_addr2;
          this.ruleForm.protocol_addr3=res.data.protocol_addr3;
          if(res.data.part_protocol_no!=''&&res.data.part_protocol_no!=null){
            this.flag=false;
          }
        }
        this.getPartsList();
      }).catch(err => {
        console.error(err);
      });
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
    /**
     * 获取协议部件列表
     */
    getPartsList(){
      let params={
        servicecode:"pt0319",
        protocol_template_no:this.ruleForm.protocol_template_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.partList=res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 打开弹窗
     */
    openDialog1(data) {
      let params = {
        project_template_no: this.ruleForm.project_template_no,
        protocol_template_no:this.protocol_template_no,
        part_protocol_no:data.part_protocol_no,
        part_project_no:this.ruleForm.part_project_no,
        tranType:this.tranType
      };

      console.log("d当前",params);
      this.$publicFn.openNavTab(
        '@agreePartMain',
        "",
        params,
        this
      );
    },
    /**
     * 打开弹窗
     */
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/pt/partnerProjrctManage/select_partner.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: "合作方选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      // this.resetForm('ruleForm');
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data = returnData;
      this.ruleForm.part_no = data["part_no"];
      this.ruleForm.partner_name = data["center_name"];
    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = this.ruleForm;
          params.servicecode = 'pt0002';
          // 协议模板版本添加
          params.protocol_template_version = that.cParentParams.protocol_template_version;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: "提交失败"
              });
            } else {
              //将生成产品返回数据传递
              this.$message({
                type: "success",
                message: "提交成功"
              });
              this.ruleForm.part_protocol_no = res.data.part_protocol_no;
              this.flag=false;

            }
          }).catch(err => {
            console.error(err);
          });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * tab点击事件
     */
    handleClick(tab, event) {
      console.log(tab, event);
      if(event.target.getAttrib("disabled")){
        this.$message({
          type: "warning",
          message: "请先输入基本信息"
        })
      }
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

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
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

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
