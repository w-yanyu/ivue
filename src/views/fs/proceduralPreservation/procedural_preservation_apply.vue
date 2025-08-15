<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
        <template slot="title">
          <span><em></em>基本信息</span>
        </template>
        <el-form  ref="basicForm" :model="basicForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="借据号" prop="lncfno" :rules="[{ required: true, message: '请输入借据号'}]">
                <el-input v-model="basicForm.lncfno" @blur="lncfnoBlur"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称">
                <el-input v-model="basicForm.acctNa" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码">
                <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="手机号码">
                <el-input v-model="basicForm.phoneNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称">
                <el-input v-model="basicForm.prodNa" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="区域中心">
                <el-input v-model="basicForm.areacenter" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="贷款形态">
                <el-input v-model="basicForm.clssst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账龄">
                <el-input v-model="basicForm.accountAge" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否联合贷">
                <el-input v-model="basicForm.unitedloan" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联合贷公司名称">
                <el-input v-model="basicForm.unitedloanCompany" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="当前委案机构">
                <el-input v-model="basicForm.commissionOrg" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="second">
        <template slot="title">
          <span><em></em>申请信息</span>
        </template>
        <el-form ref="debtForm" :model="debtForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="保全案号">
                <el-input v-model="debtForm.preservationNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行案号">
                <el-input v-model="debtForm.implementNo" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承办机构名称">
                <el-input v-model="debtForm.undertakeOrg" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="受理机构名称">
                <el-input v-model="debtForm.acceptanceOrg" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="保全阶段">
                <el-select v-model="debtForm.preservationStage"  placeholder=" ">
                  <el-option
                    v-for="(item, index) in preservationStageList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="third">
        <template slot="title">
          <span><em></em>保全信息</span>
        </template>


        <el-form ref="applyForm" :rules="applyRules" :model="applyForm" label-width="200px" class="custom-common--form">

          <el-row class="ticket-detail" v-for="(item, index) in applyForm.ticketList" :key="index">
            <el-row>
              <el-col :span="8">
                <el-form-item label="保全类型" :prop="`ticketList[${index}].saveType`">
                  <el-select v-model="applyForm.ticketList[index].procpreType" placeholder="请选择保全类型" @change="procpreTypeChange">
                    <el-option
                      v-for="(item, i) in procpreTypeListFilter"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <el-form-item label="保全结果" :prop="`ticketList[${index}].procpreresult`">
                <el-select v-model="applyForm.ticketList[index].procpreresult" placeholder="请选择保全结果" @change="remttpChange">
                  <el-option
                    v-for="(item, i) in remttpList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="附件" :prop="`ticketList[${index}].ticketAccessory`">
                  <el-upload
                    :on-change="(file, fileList) => { accessoryChange(file, fileList, index) }"
                    :on-remove="(file, fileList) => { accessoryRemove(file, fileList, index) }"
                    :limit="5"
                    :file-list="applyForm.ticketList[index].ticketAccessoryList"
                    :auto-upload="false"
                  >
                    <el-button type="primary" size="small" v-show="applyForm.ticketList[index].ticketAccessoryList.length < 5">{{$i18ns('选择')}}文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="applyForm.ticketList[index].procpreType === '0'">
                <el-form-item label="是否首封" :prop="`ticketList[${index}].isfirstoff`">
                  <el-select v-model="applyForm.ticketList[index].isfirstoff" placeholder="请选择是否首封">
                    <el-option
                      v-for="(item, i) in isfirstoffList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="applyForm.ticketList[index].procpreType === '0'">
                <el-form-item label="房产地址" :prop="`ticketList[${index}].homeAddr`">
                  <el-input v-model="applyForm.ticketList[index].homeAddr"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="applyForm.ticketList[index].procpreresult === '0'">
                <el-form-item label="保全期限" :prop="`ticketList[${index}].procpreqx`">
                  <el-date-picker
                    v-model="applyForm.ticketList[index].procpreqx"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>

            </el-row>
            <div class="ticket-option">
              <i class="el-icon-plus" v-show="index === applyForm.ticketList.length - 1 && applyForm.ticketList.length < procpreTypeList.length" @click="addTicketDetail(index)"></i>
              <i class="el-icon-minus" v-show="applyForm.ticketList.length > 1" @click="delTicketDetail(index)"></i>
            </div>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$i18ns('备注')">
                <el-input type="textarea" resize="none" :rows="4" v-model="applyForm.applyRemark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>
<script>
  import {  applyRules,validateHandle } from "../../other/loanPostManager/loanPostConstant/loanPostConstant";
  import MyAxios from "pte-ui/utils/MyAxios";
  export default {
    name: "procedural_preservation_apply",
    data() {
      return {
        activeNasmes: ["first", "second", "third"],
        basicForm: {
          lncfno: "",
          acctNa: "",
          idtfno: "",
          phoneNo:"",
          prodNa: "",
          areacenter:"",
          clssst: "",
          accountAge:"",
          unitedloan:"",
          unitedloanCompany:"",
          commissionOrg:""

        },
        applyRules,
        debtForm: {
          preservationNo: "",
          implementNo: "",
          undertakeOrg: "",
          acceptanceOrg: "",
          preservationStage: "",
          saveStage:""
        },
        compareLncfno: "", // 借据号对比字段
        clssstList: [], // 贷款状态下拉
        applyForm: {
          ticketList:[],
          applyRemark: "",
        },
        preservationStageList:[],//保全阶段LIST
        procpreTypeList:[],//保全类型list
        isfirstoffList: [], // 是否首封
        remttpList:[],//保全结果
        fileList: [], // 身份证附件文件列表
        urgentRule: [], // 是否获得管理层审批表单校验
        khjmsqsjOptions: {}, // 客户申请减免时间有效期控件配置
        pickerOptions: {}, // 预约减免有效期控件配置
        isLookShow: false, // 弹出框显示/隐藏控制 减免历史
        showCreditInfo: false, // 弹出框显示/隐藏控制人行征信
        lncfnoObj:{
          lncfno:"",
        }

      }
    },

    activated(){
      // 路由传参进入页面刷新页面
      if(this.$route.query.lncfno){
        this.basicForm.lncfno=this.$route.query.lncfno;
        this.lncfnoBlur();
      }
    },
    computed: {
      procpreTypeListFilter() {
        let procpreTypeList = _.cloneDeep(this.procpreTypeList);
        for (let i = 0;i < this.applyForm.ticketList.length;i++) {
          for (let j = 0;j < procpreTypeList.length;j++) {
            if (this.applyForm.ticketList[i].procpreType === procpreTypeList[j].dictId) {
              procpreTypeList[j].disabled = true;
            }
          }
        }
        return procpreTypeList;
      }
    },
    created() {
      this.addTicketDetail(); // 初始化添加保全信息组件
      this.getDictList("E_PROOCPRE_TYPE", "procpreTypeList"); //
      this.getDictList("E_YES___", "isfirstoffList"); // 是否首封下拉
      this.getDictList("E_PRERES", "remttpList");//保全结果下拉
      this.getDictList("E_PRESTAGE", "preservationStageList");//保全阶段下拉
      // 个人批量扣款路由传参进入页面则直接调接口初始化页面
      if(this.$route.query.lncfno){
        this.basicForm.lncfno=this.$route.query.lncfno;
        this.lncfnoBlur();
      }
    },
    methods: {

      /**
       * 借据号失焦回调
       */
      lncfnoBlur() {
        if (this.compareLncfno === this.basicForm.lncfno) {
          return false;
        }
        this.compareLncfno = this.basicForm.lncfno;
        if (!this.basicForm.lncfno) {
          return false;
        }
        let params = {
          servicecode: "RLMSPLTS1308_querysuitresult",
          lncfno: this.basicForm.lncfno,
        }
        this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
          .then(response => {
            if (response && response.code === "200" && response.data && response.data.resultMesg) {
              let cus = response.data.resultMesg;
              this.basicForm.acctNa = cus.acctna;
              this.basicForm.idtfno = cus.idtfno;
              this.basicForm.phoneNo = cus.phonno;
              this.basicForm.prodNa = cus.prodna;
              this.basicForm.areacenter = cus.areaCenter;
              this.basicForm.clssst = cus.clssst;
              this.basicForm.accountAge = cus.accoutage;
              this.basicForm.unitedloan = cus.isunitln;
              this.basicForm.unitedloanCompany = cus.unitname;
              this.basicForm.commissionOrg = cus.noworg;
              this.debtForm.preservationNo = cus.caseno;
              this.debtForm.implementNo = cus.case_no;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        console.log("basicForm", this.basicForm)
        console.log("applyForm", this.applyForm)
        console.log("debtForm", this.debtForm)
        this.validateList = [];


          let params = {
            servicecode: "RLMSPLTS1309_saveperserinfo",
            // 基础信息
            lncfno: this.basicForm.lncfno,
            acctNa: this.basicForm.acctNa,
            idtfno: this.basicForm.idtfno,
            phoneNo: this.basicForm.phoneNo,
            prodNa: this.basicForm.prodNa,
            areacenter: this.basicForm.areacenter,
            clssst: this.basicForm.clssst,
            accountAge: this.basicForm.accountAge,
            unitedloanCompany: this.basicForm.unitedloanCompany,
            commissionOrg: this.basicForm.commissionOrg,

            // 申请信息
            preservationNo: this.debtForm.preservationNo,
            implementNo: this.debtForm.implementNo,
            undertakeOrg: this.debtForm.undertakeOrg,
            acceptanceOrg: this.debtForm.acceptanceOrg,
            preservationStage: this.debtForm.preservationStage,
            propermesg:[],
            applyRemark: this.applyForm.applyRemark,
          }
          this.applyForm.ticketList.forEach(item => {
            let map = {
              procpreType: item.procpreType,
              procpreresult: item.procpreresult,
              ticketList: item.ticketAccessory,
              isfirstoff: item.isfirstoff,
              homeAddr: item.homeAddr,
              prostartDate: item.procpreqx[0],
              proendDate: item.procpreqx[1],
            }
            params.propermesg.push(map);
          });
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message
                })
                this.basicForm.lncfno = "";
                this.basicForm.acctNa = "";
                this.basicForm.idtfno = "";
                this.basicForm.phoneNo = "";
                this.basicForm.prodNa = "";
                this.basicForm.areacenter ="";
                this.basicForm.clssst = "";
                this.basicForm.accountAge = "";
                this.basicForm.unitedloan = "";
                this.basicForm.unitedloanCompany = "";
                this.basicForm.commissionOrg = "";
                this.debtForm.preservationNo = "";
                this.debtForm.implementNo = "";
                this.debtForm.preservationNo = "",
                this.debtForm.implementNo = "",
                this.debtForm.undertakeOrg = "",
                this.debtForm.acceptanceOrg = "",
                this.debtForm.preservationStage = "",
                this.applyForm.applyRemark = ""
                this.applyForm.procpreType = ""
                this.applyForm.procpreresult = ""
                this.applyForm.ticketList = [],
                this.procpreTypeList = [],
                this.isfirstoffList = [],
                this.applyForm.procpreqx = [],
                this.remttpList = [],
                this.preservationStageList = []
              }
            })
            .catch(err => {
              console.error(err);
            })
      },


      /**
       * 文件清单change回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       * @param index 当前附件下标
       */
      accessoryChange(file, fileList, index) {
        console.log(file, fileList, "accessoryChange")
        this.applyForm.ticketList[index].ticketAccessoryList = fileList;
        const isLt8M = file.size / 1024 / 1024 < 20;
        if (!isLt8M) {
          this.applyForm.ticketList[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
          this.$message({
            type: "warning",
            message: "凭证文件大于20M"
          })
        } else {
          let formData = new FormData();
          formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
          formData.append("path", "PD");
          MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
            .then(res => {
              if (res && res.code === "200" && res.data && res.data.path) {
                file.status = "success";
                this.applyForm.ticketList[index].ticketAccessory.push({"path":res.data.path,"file_name":file.name});
                if (fileList.length === 1) {
                  this.$refs.applyForm.validateField(`ticketList[${index}].ticketAccessory`);
                }
              } else {
                this.applyForm.ticketList[index].ticketAccessoryList.splice(fileList.indexOf(file), 1);
                this.$message({
                  type: 'error',
                  message: '上传失败！'
                })
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      },

      /**
       * 文件清单移除回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       * @param index 当前附件下标
       */
      accessoryRemove(file, fileList, index) {
        this.applyForm.ticketList[index].ticketAccessoryList.forEach((item, key) => {
          if (item.uid === file.uid) {
            this.applyForm.ticketList[index].ticketAccessory.splice(key, 1);
            this.applyForm.ticketList[index].ticketAccessoryList.splice(key, 1);
          }
        });
        if (fileList.length === 0) {
          this.$refs.applyForm.validateField(`ticketList[${index}].ticketAccessory`);
        }
      },

      /**
       * 添加保全信息组件
       */
      addTicketDetail() {
        const item = {
          procpreType: "", // 保全类型
          procpreresult: "", // 保全结果
          isfirstoff: "", // 是否首封
          homeAddr: "", //房屋地址
          procpreqx:"",//保全期限
          ticketAccessory:[],// 附件 路径集合
          ticketAccessoryList:[]//附件文件集合
        }
        this.applyForm.ticketList.push(item);
       // this.ticketValidHandle();
      },

      /**
       * 删除保全信息
       * @param index 保全信息下标
       */
      delTicketDetail(index) {
        this.applyForm.ticketList.splice(index, 1);
        //this.ticketValidHandle();
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
        this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
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
  .purpose-basic,.purpose-detail {
    padding: 16px 40px 0 12px;
  }
  .purpose-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .ticket-detail {
    margin-bottom: 16px;
    padding: 16px 0 10px 0;
    position: relative;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    .ticket-option {
      width: 50px;
      height: 32px;
      position: absolute;
      top: calc(50% - 16px);
      right: -60px;
      i {
        width: 20px;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .ticket-tips {
    padding-left: 20px;
    line-height: 34px;
    color: #0066ff;
  }
  .credential-upload {
    margin-bottom: 20px;
  }
</style>
