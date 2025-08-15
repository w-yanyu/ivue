<template>
  <div class="menu-form">
    <div class="menu-form--title">{{$i18ns('装修贷硬装授信申请')}}</div>
    <div class="menu-form--container">
      <el-form ref="applyForm" :model="applyForm" :rules="rules" label-width="130px" class="custom-common--form">
        <div class="menu-form--title-min">{{$i18ns('授信申请信息')}}</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="产品名称" prop="sale_prod_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.sale_prod_name"></el-input>
                <el-button @click="productLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品编号" prop="sale_prod_cd" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.sale_prod_cd" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行卡号" prop="bind_card_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.bind_card_no"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信申请金额" prop="loan_amt" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.loan_amt" ></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="授信期限" prop="loan_term" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.loan_term" type="number"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-show="false" label="授信用途" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.loan_use" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="menu-form--title-min">{{$i18ns('身份信息')}}</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="cust_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.cust_name"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobile_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.mobile_no"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号" prop="cert_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.cert_no"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件生效日" prop="cert_day" label-width="195px">
              <el-date-picker :disabled="edit" class="int" v-model="applyForm.cert_day"
                              :picker-options="startDatePicker"
                              type="date" :placeholder="$i18ns('起始日期')" format="yyyyMMdd" value-format="yyyyMMdd"
                              style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件到期日" prop="card_end_day" label-width="195px">
              <el-date-picker :disabled="edit" class="int" v-model="applyForm.card_end_day"
                              :picker-options="endDatePicker"
                              type="date" :placeholder="$i18ns('结束日期')" format="yyyyMMdd" value-format="yyyyMMdd"
                              style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否有工作单位" prop="is_work" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.is_work" clearable :placeholder="$i18ns('请选择是否有工作单位')" @change="workEvent">
                  <el-option
                    v-for="(item,i) in yesOrNoOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('单位性质')" prop="unit_nature" v-if="workVisible" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.unit_nature" clearable :placeholder="$i18ns('请选择婚姻状况')">
                  <el-option
                    v-for="(item,i) in unitNatureOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('申请人年收入(元)')" prop="year_income" v-if="workVisible" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.year_income"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('年收入币种')" prop="busi_unit_income_ccy"  v-if="workVisible" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.busi_unit_income_ccy" disabled="true" clearable :placeholder="$i18ns('请选择年收入币种')" >
                  <el-option
                    v-for="(item,i) in ccyOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况" prop="marr_state"  label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.marr_state" clearable :placeholder="$i18ns('请选择婚姻状况')" @change="marriageEvent">
                  <el-option
                    v-for="(item,i) in marriageOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('配偶姓名')" prop="spouse_name" v-if="spouseVisible" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.spouse_name"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('配偶证件类型')" prop="spouse_cert_type" v-if="spouseVisible" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.spouse_cert_type" clearable :placeholder="$i18ns('请选择配偶证件类型')">
                  <el-option
                    v-for="(item,i) in certOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('配偶证件号码')" prop="spouse_cert_no" v-if="spouseVisible" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.spouse_cert_no"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('配偶工作单位名称')" prop="spouse_work_unit_name" v-if="spouseVisible" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.spouse_work_unit_name"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('配偶工作单位电话')" prop="spouse_work_phone" v-if="spouseVisible" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.spouse_work_phone"></el-input>
              </div>
            </el-form-item>
          </el-col>

        </el-row>

        <div class="menu-form--title-min">{{$i18ns('房屋信息')}}</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="楼盘名称" prop="house_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.house_name"></el-input>
                <el-button @click="buildingLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="装修公司" prop="partner_name" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.partner_name"></el-input>
                <el-button @click="partnerLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼盘编号" prop="house_id" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.house_id" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积信息" prop="area_msg" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.area_msg" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签发地址" prop="issuing_addr" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.issuing_addr" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼盘地址" prop="house_addr" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.house_addr" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房产证号码" prop="house_cert_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.house_cert_no"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否一手房" prop="is_first_hand" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.is_first_hand" clearable placeholder="请选择是否一手房">
                  <el-option
                    v-for="(item,i) in yesOrNoOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否翻新" prop="is_refur" label-width="195px">
              <div class="lookupDiv">
                <el-select v-model="applyForm.is_refur" clearable placeholder="请选择是否翻新">
                  <el-option
                    v-for="(item,i) in yesOrNoOptions"
                    :key="i" :label="item.dictName" :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="锁定房屋基准经纬度信息" prop="longitude" label-width="195px">
                  <GetPositionByImage @callBack="imagePositionCallBack"></GetPositionByImage>
                  <el-button size="small" type="primary" @click="positionLookup">{{$i18ns('打开地图锁定')}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基准经度" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.longitude" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="基准纬度" prop="latitude" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="applyForm.latitude" disabled="true"></el-input>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label=" " prop="checked" label-width="195px">
              <el-checkbox v-model="checked">
                {{$i18ns('我已阅读并同意')}}
                <el-button
                  type="text"
                  v-for="(item, index) in protocolOptions"
                  :key="index"
                  @click="protocolLookup(item)"
                  class="btn"
                >
                  《{{ item.protocol_name }}》
                </el-button>
              </el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="menu-form--title-min">
            <span class="required">*</span>{{$i18ns('检查资料')}}
          </div>
          <el-table
            :data="tableData"
            :key="itemKey"
            border
            style="width: 100%"
          >
            <el-table-column
              fixed
              prop="doc_no"
              label="资料编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="doc_name"
              label="资料描述"
            >
            </el-table-column>
            <el-table-column
              prop="is_must_name"
              label="是否必须"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="upload_flag_name"
              label="是否上传"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="filetype_name"
              label="附件类型"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="is_access_info_name"
              label="是否获取GPS信息"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="is_check_ps_name"
              label="是否对图片进行原图检查"
              align="center"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="fileManageLookup(scope.row)" size="small">{{$i18ns('图片上传')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="flowStart">{{$i18ns('流程启动')}}</el-button>
            <el-button type="primary" size="small" @click="resetPage">{{$i18ns('重置')}}</el-button>
<!--            <el-button type="primary" size="small" @click="oneAddImages">一键填充图片</el-button>-->
          </el-col>
        </el-row>

      </el-form>
      <el-dialog title="选择楼盘" :visible.sync="buildingVisible" v-if="buildingVisible" width="70%"
                 :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :params="projectInfo" :toUrl="buildingLookupURL" @jsonCallBack="buildingCallBack"></to-json>
      </el-dialog>
      <el-dialog title="选择产品" :visible.sync="productVisible" v-if="productVisible" width="70%"
                 :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :params="productQueryCondition" :toUrl="productLookupURL" @jsonCallBack="productCallBack"></to-json>
      </el-dialog>
      <el-dialog title="选择装修公司" :visible.sync="partnerVisible" v-if="partnerVisible" width="70%"
                 :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <to-json :params="applyForm" :toUrl="partnerLookupURL" @jsonCallBack="partnerCallBack"></to-json>
      </el-dialog>
      <el-dialog title="锁定经纬度信息" :visible.sync="positionVisible" v-if="positionVisible" width="1000px" height="500px"
                 :before-close="handleClose"
                 top="30vh"
                 :append-to-body="true">
        <get-position-by-map :cParentParams="applyForm" @callBack="positionCallBack"></get-position-by-map>
      </el-dialog>
      <el-dialog title="图片上传" :visible.sync="fileManageVisible" v-if="fileManageVisible" width="70%"
                 :before-close="handleClose" top="30vh"
                 :append-to-body="true">
        <FileManage :cParentParams="fileInfo" @callBack="fileUploadCallBack"></FileManage>
      </el-dialog>
      <el-dialog :title="protocolTitle" :visible.sync="protocolVisible" v-if="protocolVisible" width="70%"
                 :before-close="handleClose" top="30vh"
                 :append-to-body="true">
        <LookAgreement :cParentParams="protocol"></LookAgreement>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import MyMessage from "pte-ui/utils/MyMessage";
  import FileManage from "@/views/icms/flowStart/lend/commUitl/fileManage.vue";
  import LookAgreement from "@/views/pd/protocolManage/lookAgreement.vue";
  import MyAxios from "pte-ui/utils/MyAxios";
  import GetPositionByImage from "@/views/icms/flowStart/lend/commUitl/getPositionByImage.vue";
  import GetPositionByMap from "@/views/icms/flowStart/lend/commUitl/getPositionByMap.vue";

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
      GetPositionByImage,
      FileManage,
      LookAgreement,
      GetPositionByMap
    },
    data() {
      var checkMethod = (rule, value, callback) => {
        if (!this.hasAgreeProtocol()) {
          return callback(new Error('请勾选'));
        } else {
          return callback() // 一些同学的问题可能就出在这里
        }
      };
      return {
          装修贷硬装授信申请:this.$i18ns("装修贷硬装授信申请"),
          授信申请信息:this.$i18ns("授信申请信息"),
          产品名称:this.$i18ns("产品名称"),
          产品编号:this.$i18ns("产品编号"),
          银行卡号:this.$i18ns("银行卡号"),
          授信申请金额:this.$i18ns("授信申请金额"),
          授信期限:this.$i18ns("授信期限"),
          授信用途:this.$i18ns("授信用途"),
          身份信息:this.$i18ns("身份信息"),
          客户名称:this.$i18ns("客户名称"),
          手机号:this.$i18ns("手机号"),
          身份证号:this.$i18ns("身份证号"),
          证件生效日:this.$i18ns("证件生效日"),
          证件到期日:this.$i18ns("证件到期日"),
          是否有工作单位:this.$i18ns("是否有工作单位"),
          婚姻状况:this.$i18ns("婚姻状况"),
          房屋信息:this.$i18ns("房屋信息"),
          楼盘名称:this.$i18ns("楼盘名称"),
          装修公司:this.$i18ns("装修公司"),
          楼盘编号:this.$i18ns("楼盘编号"),
          建筑面积信息:this.$i18ns("建筑面积信息"),
          签发地址:this.$i18ns("签发地址"),
          楼盘地址:this.$i18ns("楼盘地址"),
          房产证号码:this.$i18ns("房产证号码"),
          是否一手房:this.$i18ns("是否一手房"),
          是否翻新:this.$i18ns("是否翻新"),
          锁定房屋基准经纬度信息:this.$i18ns("锁定房屋基准经纬度信息"),
          基准经度:this.$i18ns("基准经度"),
          基准纬度:this.$i18ns("基准纬度"),
          我已阅读并同意:this.$i18ns("我已阅读并同意"),
          检查资料:this.$i18ns("检查资料"),
          资料编号:this.$i18ns("资料编号"),
          资料描述:this.$i18ns("资料描述"),
          是否必须:this.$i18ns("是否必须"),
          是否上传:this.$i18ns("是否上传"),
          附件类型:this.$i18ns("附件类型"),
          是否获取GPS信息:this.$i18ns("是否获取GPS信息"),
          是否图片进行原图检查:this.$i18ns("是否图片进行原图检查"),
          上传图片锁定:this.$i18ns("上传图片锁定"),
          打开地图锁定:this.$i18ns("打开地图锁定"),
          操作:this.$i18ns("操作"),

        checked: false,
        tableData: [],
        itemKey: "",
        marriageOptions: [],
        yesOrNoOptions: [],
        protocolOptions: [],
        protocol: "",
        protocolTitle: "",
        partnerOptions: [],
        certOptions: [],
        unitNatureOptions:[],
        ccyOptions:[],
        fileInfo: {
          doc_no: "",
          filetype: "",
          is_access_info: "",
          is_check_ps: "",
          fileList: []
        },
        fileMap: new Map(),
        applyForm: {
          sale_prod_cd: "",//可售产品号
          sale_prod_name: "",//可售产品名称
          apply_type: "S",
          busi_type: "CL",
          loan_amt: "",//贷款金额
          bind_card_no: "",//银行卡号
          loan_term: "",//期限
          cust_type: "10",//客户类型：个人客户类型
          loan_use: "房屋装修",//授信用途

          cust_name: "",//客户名称
          cert_no: "",//证件号码
          cert_type: "101",//证件类型
          mobile_no: "",//手机号码
          cert_day: "",//证件生效日
          card_end_day: "",//证件到期日
          marr_state: "",//婚姻状态
          spouse_name: "",//配偶姓名
          spouse_cert_type: "",//配偶证件类型
          spouse_cert_no: "",//配偶证件号码
          spouse_work_unit_name: "",//配偶工作单位名称
          spouse_work_phone: "",//配偶工作单位电话
          is_work: "",//是否有工作单位
          unit_nature: "",//单位性质
          year_income: "",//年收入
          busi_unit_income_ccy: "156",//年收入币种

          house_id: "",//楼盘编号
          area_msg: "",//建筑面积信息
          house_name: "",//楼盘名称
          issuing_addr: "",//签发地址(省市区)
          is_first_hand: "",//是否一手房
          is_refur: "",//是否翻新
          house_addr: "",//楼盘地址
          house_cert_no: "",//房产证号码
          partner_no: "",//合作商编号
          partner_name: "",//合作商名
          lend_acct_no: "",//商户收款账号
          loan_acct_name: "",//商户收款户名
          open_acct_bank: "",//商户开户行
          longitude: "",//GPS信息：经度
          latitude: "",//GPS信息：纬度
        },
        projectInfo: {},
        rules: {
          checked: [
            {required: true, validator: checkMethod, trigger: 'blur'}
          ],
          sale_prod_name: [
            {required: true, message: '请选择产品', trigger: 'blur'}
          ],
          cust_name: [
            {required: true, message: '请输入客户名称', trigger: 'blur'}
          ],
          loan_amt: [
            {required: true, message: '请输入贷款申请金额', trigger: 'blur'}
          ],
          cert_day: [
            {required: true, message: '请输入证件生效日', trigger: 'blur'}
          ],
          card_end_day: [
            {required: true, message: '请输入证件到期日', trigger: 'blur'}
          ],
          mobile_no: [
            {required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          cert_no: [
            {required: true, message: '请输入证件号码', trigger: 'blur'}
          ],
          is_work: [
            {required: true, message: '请选择是否有工作单位', trigger: 'blur'}
          ],
          unit_nature: [
            {required: true, message: '请选择单位性质', trigger: 'blur'}
          ],
          year_income: [
            {required: true, message: '请输入年收入', trigger: 'blur'}
          ],
          marr_state: [
            {required: true, message: '请选择婚姻状态', trigger: 'blur'}
          ],
          spouse_name: [
            {required: true, message: '请输入配偶姓名', trigger: 'blur'}
          ],
          spouse_cert_type: [
            {required: true, message: '请输入配偶证件类型', trigger: 'blur'}
          ],
          spouse_cert_no: [
            {required: true, message: '请输入配偶证件号码', trigger: 'blur'}
          ],
          spouse_work_unit_name: [
            {required: false, message: '请输入配偶工作单位名称', trigger: 'blur'}
          ],
          spouse_work_phone: [
            {required: false, message: '请输入配偶工作单位电话', trigger: 'blur'}
          ],
          house_name: [
            {required: true, message: '请选择楼盘', trigger: 'blur'}
          ],
          partner_name: [
            {required: true, message: '请选择装修公司', trigger: 'blur'}
          ],
          loan_term: [
            {required: true, message: '请输入期限', trigger: 'blur'}
          ],
          bind_card_no: [
            {required: true, message: '请输入银行卡号', trigger: 'blur'}
          ],
          longitude: [
            {required: true, message: '请上传房屋中心图片锁定房屋基准经纬度信息', trigger: 'blur'}
          ],
        },
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        productQueryCondition: {
          cust_class_list: ""
        },
        productLookupURL: "/views/icms/flowStart/credit_sell_product_lookup.json",
        buildingLookupURL: "/views/icms/flowStart/lend/decorateCreditAppliyStart/buildingLookup.json",
        partnerLookupURL: "/views/icms/flowStart/lend/decorateCreditAppliyStart/partnerLookup.json",
        finalUrl: "views/icms/ar_workbench/into_pool/workbench_into_pool_view.json ",
        showForm: true,
        title: "",
        type: "",
        fileManageVisible: false, //显示查找对话框
        buildingVisible: false, //显示查找对话框
        productVisible: false, //显示查找对话框
        partnerVisible: false, //显示查找对话框
        positionVisible: false, //显示地图
        protocolVisible: false, //显示协议对话框
        spouseVisible:false,//配偶相关信息
        workVisible:false//收入相关信息
      };
    },
    created() {
      this.productQueryCondition.cust_class_list = this.cParentParams.cust_class_list;
      this.getDictList("MS_E_MARITA", "marriageOptions");
      this.getDictList("MS_E_YESORNO", "yesOrNoOptions");
      this.getDictList("MS_E_CRET_TYPE", "certOptions");
      this.getDictList("US_E_NUIT_NATURE", "unitNatureOptions");
      this.getDictList("MS_CURRENCY", "ccyOptions");

    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
    },
    methods: {

      buildingLookup() {
        let that = this;
        that.buildingVisible = true;
      },
      productLookup() {
        let that = this;
        that.productVisible = true;
      },
      partnerLookup() {
        let that = this;
        that.partnerVisible = true;
      },
      positionLookup() {
        let that = this;
        that.positionVisible = true;
      },
      protocolLookup(protocol) {
        let that = this;
        console.log("@@@协议信息", protocol);
        that.protocol = protocol;
        that.protocolTitle = protocol.protocol_name;
        that.protocolVisible = true;
      },
      fileManageLookup(rowData) {
        let that = this;
        console.log("rowData", rowData);
        this.fileInfo = this.fileMap.get(rowData.doc_no);
        console.log("fileInfo", this.fileInfo);
        that.fileManageVisible = true;
        console.log("fileManageVisible", that.fileManageVisible)
      },

      buildingCallBack(data) {
        let that = this;
        console.log(data, "楼盘页面传来的数据");
        that.buildingVisible = false;
        that.applyForm.house_id = data.house_id;
        that.applyForm.house_name = data.house_name;
        that.applyForm.area_msg = data.built_area;
        that.applyForm.issuing_addr = data.house_addr;
        that.applyForm.house_addr = data.house_addr;
      },
      productCallBack(data) {
        let that = this;
        console.log(data, "产品页面传来的数据");
        that.productVisible = false;
        that.applyForm.sale_prod_cd = data.sale_prod_cd;
        that.applyForm.sale_prod_name = data.sale_prod_name;
        console.log(that.applyForm, "选择产品后的表单数据");
        that.initDocDetialList(that.applyForm.sale_prod_cd);
        that.initProtocol(that.applyForm.sale_prod_cd);
        that.setCooperativeProject(that.applyForm.sale_prod_cd);
      },
      partnerCallBack(data) {
        let that = this;
        console.log(data, "合作商页面传来的数据");
        that.partnerVisible = false;
        that.applyForm.partner_no = data.partner_no;
        that.applyForm.partner_name = data.partner_name;
        that.applyForm.lend_acct_no = data.acct_num;
        that.applyForm.loan_acct_name = data.acct_nm;
        that.applyForm.open_acct_bank = data.open_acct_bank;
        console.log(that.applyForm, "选择合作商后的表单数据");
      },
      //文件上传回调
      fileUploadCallBack(data) {
        let that = this;
        console.log("@@上传后未添加的fileMapthat", that.fileMap);
        that.fileMap.set(data.doc_no, data);

        //是否上传
        if (data.fileList.length == 0) {
          that.tableData.forEach(oneData => {
            if (oneData.doc_no == data.doc_no) {
              oneData.upload_flag = 0;
              oneData.upload_flag_name = "否";
              console.log("上传和删除后tableData", that.tableData)
            }
          })
        } else {
          that.tableData.forEach(oneData => {
            if (oneData.doc_no == data.doc_no) {
              oneData.upload_flag = 1;
              oneData.upload_flag_name = "是";
              console.log("上传和删除后tableData", that.tableData)
            }
          })
        }
        //刷新表格
        this.itemKey = Math.random();
        console.log("@@上传后的fileMapthat", that.fileMap);
      },
      imagePositionCallBack(file){
        console.log("@@获取定位信息回调", file);
        this.applyForm.longitude=file.longitude;
        this.applyForm.latitude=file.latitude;
      },
      positionCallBack(position) {
        console.log("@@获取定位信息回调", position);
        this.applyForm.longitude = position.lng;
        this.applyForm.latitude = position.lat;
        this.positionVisible = false;
      },
      //初始化产品下的检查资料信息
      initDocDetialList(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          apply_type: "S",
          servicecode: "ar0165",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@检查资料信息", response.data);
              this.tableData = response.data;
              this.tableData.forEach(fileDetail => {
                fileDetail.is_must_name = fileDetail.is_must == 1 ? "是" : "否";
                fileDetail.upload_flag_name = fileDetail.upload_flag == 1 ? "是" : "否";
                fileDetail.filetype_name = fileDetail.filetype == "image" ? "图片类型" : "所有类型";
                if(fileDetail.is_access_info != null){
                  fileDetail.is_access_info_name = fileDetail.is_access_info == 1 ? "是" : "否";
                }
                if(fileDetail.is_check_ps != null ){
                  fileDetail.is_check_ps_name = fileDetail.is_check_ps == 1 ? "是" : "否";
                }
                let fileInfo = {
                  doc_no: fileDetail.doc_no,
                  filetype: fileDetail.filetype,
                  is_access_info: fileDetail.is_access_info,
                  is_check_ps: fileDetail.is_check_ps,
                  fileList: [],
                };
                this.fileMap.set(fileDetail.doc_no, fileInfo);
              });
              console.log("@@@检查资料初始化成功", this.fileMap);
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //初始化协议模板
      initProtocol(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          apply_type: "S",
          servicecode: "pd0250",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@协议模板信息", response.data);
              this.protocolOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //填入产品关联的项目属性
      setCooperativeProject(sale_prod_cd) {
        let request_map = {
          sale_prod_cd,
          servicecode: "pd0614",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("@@产品关联的项目属性", response.data);
              this.projectInfo = response.data[0];
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //是否上传必要文件
      hasUploadFile() {
        let that = this;
        let result = true;
        that.tableData.forEach(checkDocinfo => {
          if (checkDocinfo.is_must == 1 && checkDocinfo.upload_flag == 0) {
            result = false;
          }
        });
        return result;
      },
      //是否同意协议
      hasAgreeProtocol() {
        let that = this;
        console.log(that.protocolOptions, "协议集合");
        if (that.protocolOptions.length > 0) {
          return that.checked;
        }
        return true;
      },
      //流程启动
      flowStart() {
        let request_map = {};
        request_map["servicecode"] = "ar1010";
        let conditon = {};
        conditon.flowComType = this.applyForm;
        conditon.flowComType.loan_term.concat("M");
        this.getSubmitDocInfo();
        conditon.checkDocInfo = this.tableData;
        conditon.houseInfo = this.getHouseInfo();
        conditon.flowApplyerInfo = this.getFlowApplyerInfo();
        console.log("@@@tabalData", this.tableData);
        request_map["condition"] = conditon;
        console.log("request_map", request_map);
        this.$refs["applyForm"].validate((valid) => {
          if (valid) {
            //协议校验
            if (!this.hasAgreeProtocol()) {
              return;
            }
            //上传文件校验
            if (!this.hasUploadFile()) {
              MyMessage({
                message: "请上传必要的文件",
                type: "error",
              });
              return;
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
              .then((res) => {
                if (res.code === "200") {
                  MyMessage({
                    message: "流程启动成功",
                    type: "success",
                  });
                  // let params2 = res.data;
                  // params2["appId"] = "icmsOnl";
                  // params2["applid"] = params2.appl_id;
                  // params2["prod_cd"] = this.applyForm.sale_prod_cd;
                  // params2["frame_cd"] = params2.task_url1;
                  // params2["task_inst_id"] = res.data.cur_task_id;
                  this.resetPage();
                  this.$publicFn.openNavTab("/views/icms/ar_workbench/into_pool/workbench_into_pool_view.json", "进件池", this.cParentParams, this)
                } else {
                  MyMessage({
                    message: res.message,
                    type: "error",
                  });
                }
              });
          } else {
            MyMessage({
              message: "您还未输入必选项 ！！！",
              type: "error",
            });
            return false;
          }
        });
      },
      //清空页面数据
      resetPage() {
        this.$refs["applyForm"].resetFields();
        this.checked = false;
        this.resetCheckList();
      },
      //清空检查列表
      resetCheckList() {
        this.protocolOptions = [];
        this.tableData = [];
      },
      getHouseInfo() {
        let applyForm = this.applyForm;
        let houseInfo = {
          house_id: applyForm.house_id,
          area_msg: applyForm.area_msg,
          house_name: applyForm.house_name,
          issuing_addr: applyForm.issuing_addr,
          is_first_hand: applyForm.is_first_hand,
          is_refur: applyForm.is_refur,
          house_addr: applyForm.house_addr,
          partner_no: applyForm.partner_no,
          house_cert_no: applyForm.house_cert_no,
          lend_acct_no: applyForm.lend_acct_no,
          loan_acct_name: applyForm.loan_acct_name,
          open_acct_bank: applyForm.open_acct_bank,
          longitude: applyForm.longitude,
          latitude: applyForm.latitude,
        };
        console.log("房屋信息houseInfo", houseInfo);
        return houseInfo;
      },
      getFlowApplyerInfo() {
        let applyForm = this.applyForm;
        let flowApplyerInfo = {
          cert_day: applyForm.cert_day,
          card_end_day: applyForm.card_end_day,
          issuing_addr: applyForm.issuing_addr,
          marr_state: applyForm.marr_state,
          spouse_name: applyForm.spouse_name,
          spouse_cert_type: applyForm.spouse_cert_type,
          spouse_cert_no: applyForm.spouse_cert_no,
          spouse_work_unit_name: applyForm.spouse_work_unit_name,
          spouse_work_phone: applyForm.spouse_work_phone,
          is_work: applyForm.is_work,
          unit_nature: applyForm.unit_nature,
          year_income: applyForm.year_income,
          busi_unit_income_ccy: applyForm.busi_unit_income_ccy,

        };
        console.log("申请人信息flowApplyerInfo", flowApplyerInfo);
        return flowApplyerInfo;
      },
      getSubmitDocInfo() {
        this.tableData.forEach(data => {
          data.file_list = this.fileMap.get(data.doc_no).fileList;
        });
      },

      // 日期选择约束
      beginDate() {
        const that = this;
        return {
          disabledDate(time) {
            if (that.applyForm.card_end_day) {
              //如果结束时间不为空，则小于结束时间
              return new Date(that.applyForm.card_end_day).getTime() < time.getTime();
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          },
        };
      },
      processDate() {
        const that = this;
        return {
          disabledDate(time) {
            if (that.applyForm.cert_day) {
              //如果开始时间不为空，则结束时间大于开始时间
              return new Date(that.applyForm.cert_day).getTime() > time.getTime();
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          },
        };
      },
      marriageEvent(data){
        console.log("选中了婚姻状态",data);
        let that = this;
        if(data === '2'){
          that.spouseVisible = true;
        }else{
          that.spouseVisible = false;
        }

      },
      workEvent(data) {
        console.log("选中了工作情况", data);
        let that = this;
        if (data === '1') {
          that.workVisible = true;
        } else {
          that.workVisible = false;
        }
      },
      /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictTyp
       * @param listKey 列表对象key名称
       */
      getDictList(dictType, listKey) {
        let params = {
          dictType: dictType,
          dictKey: [dictType],
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
              console.log("下拉列表" + JSON.stringify(this[listKey]));
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
  };
</script>
<style lang="less" scoped>
  .menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .menu-form--title {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      position: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
        background: #727df1;
      }
    }

    .menu-form--title-min {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      position: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
        background: red;
      }
    }
  }

  .menu-footer {
    margin-top: 10px;
    text-align: center;
  }

  .lookupDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /deep/ .el-button--medium{
      padding: 7px 12px !important;
    }
  }


  .required {
    color: red;
  }
</style>
