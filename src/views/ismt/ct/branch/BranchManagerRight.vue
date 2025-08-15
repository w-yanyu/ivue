<template>
  <div class="branch-form" v-show="showForm">
    <div class="branch-form--title">{{title}}</div>
    <el-button type="primary" @click="openBranchRoleDialog"  v-show="false">机构关联角色查询</el-button>
    <el-button type="primary" @click="openBranchRoleRoleDialog" v-show="false" >管理员角色关联查询</el-button>
    <el-button type="primary" @click="openBranchRoleBranchDialog" v-show="false">管理员机构关联查询</el-button>
    <div class="branch-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户id" prop="user_id" v-show="false">
              <el-input v-model="ruleForm.user_id" placeholder="请输入userid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="机构编号" prop="branch_id">
              <el-input v-model="ruleForm.branch_id" placeholder="请输入机构编号" :disabled="type==='edit'"  maxlength=10></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构关系" prop="brch_relation_code" >
              <el-select v-model="ruleForm.brch_relation_code" placeholder="请选择机构关系" :disabled="type==='edit'" >
                <el-option
                  v-for="(item, i) in branchRelationList"
                  :key="brch_relation_code"
                  :label="item.brch_relation_desc"
                  :value="item.brch_relation_code">
                  <span>{{ item.brch_relation_code }}-{{ item.brch_relation_desc}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" prop="branch_name">
              <el-input v-model="ruleForm.branch_name" placeholder="请输入机构名称" maxlength=100 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币种" prop="ccy_code"  v-show="type!=='edit'">
              <el-select v-model="ruleForm.ccy_code" placeholder="请选择币种" >
                <el-option
                  v-for="(item, i) in ccyCodeList"
                  :key="dict_id"
                  :label="item.dict_name"
                  :value="item.dict_id">
                  <span>{{ item.dict_id }}-{{ item.dict_name}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构级别" prop="branch_level" >
              <el-select v-model="ruleForm.branch_level" placeholder="请选择机构级别" :disabled="true">
                <el-option
                  v-for="(item, i) in branchLevelList"
                  :key="dict_id"
                  :label="item.dict_name"
                  :value="item.dict_id">
                  <span>{{ item.dict_id }}-{{ item.dict_name}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="上级机构号" prop="parent_brch_id">
              <el-input v-model="ruleForm.parent_brch_id" :disabled="true" maxlength=10 ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="机构层级码" prop="parent_brch_id">
              <el-input v-model="ruleForm.branch_level_code" :disabled="true" maxlength=10 ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人电话" prop="contacts_phone">
              <el-input v-model="ruleForm.contacts_phone" placeholder="请输入联系人电话" maxlength=32 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮编" prop="postcode">
              <el-input v-model="ruleForm.postcode" placeholder="请输入邮编" maxlength=10 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人姓名" prop="contacts_name">
              <el-input v-model="ruleForm.contacts_name" placeholder="请输入联系人姓名" maxlength=100 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构状态" prop="branch_stus">
              <el-select v-model="ruleForm.branch_stus" placeholder="请输入机构状态" :disabled="type==='edit'">
                <el-option
                  v-for="(item, i) in branchStatusList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                  <span>{{ item.dictId }}-{{ item.dictName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型" prop="branch_type">
              <el-select v-model="ruleForm.branch_type" placeholder="请选择机构类型" :disabled="type==='edit'">
                <el-option
                  v-for="(item, i) in branchTypeList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                  <span>{{ item.dictId }}-{{ item.dictName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实体机构标志" prop="real_branch_ind">
              <el-select v-model="ruleForm.real_branch_ind" placeholder="请选择实体机构标志" :disabled="type==='edit'">
                <el-option
                  v-for="(item, i) in realBranchList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                  <span>{{ item.dictId }}-{{ item.dictName}}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="swift编号" prop="swift_no" v-show="false">
              <el-input v-model="ruleForm.swift_no" placeholder="请输入swift编号" maxlength=32 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构作用类型" prop="branch_function_class">
              <el-input v-model="ruleForm.branch_function_class" placeholder="请输入机构作用类型" maxlength=8 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构邮箱" prop="branch_mail">
              <el-input v-model="ruleForm.branch_mail" placeholder="请输入机构邮箱" maxlength=80 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="节假日代码" prop="holiday_code" >
              <el-input v-model="ruleForm.holiday_code" placeholder="请输入节假日代码" maxlength=8 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人邮箱" prop="contacts_mail">
              <el-input v-model="ruleForm.contacts_mail" placeholder="请输入联系人邮箱" maxlength=80 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分行号" prop="branch_city_no">
              <el-input v-model="ruleForm.branch_city_no" placeholder="请输入分行号" maxlength=10 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="机构地址" prop="branch_address">
              <el-input v-model="ruleForm.branch_address" placeholder="请输入机构地址" maxlength=200 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同签署地" prop="agree_sign">
              <el-input v-model="ruleForm.agree_sign" placeholder="请输入合同签署地" maxlength=100 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否展业城市" prop="iscity">
              <el-select v-model="ruleForm.iscity" placeholder="是否展业城市" class="filter-item" clearable :disabled="type==='edit'">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="展业城市" prop="p123" >
              <div class="linkage">
                <div>
                  <el-select v-model="ruleForm.province" placeholder="省" @change="changeShowProvince($event)" clearable :disabled="type==='edit'">
<!--                    <el-option v-for="(item,index) in provinceList" :key="item.code"-->
<!--                               :label="item.name" :value="item.code" />-->
                  </el-select>
                </div>
                <div>
                  <el-select v-model="ruleForm.city"  clearable collapse-tags placeholder="市" @change="changeShowCity($event)" :disabled="type==='edit'">
<!--                    <el-option v-for="(item,index) in cityNoList" :key="item.code"-->
<!--                               :label="item.name" :value="item.code" />-->
                  </el-select>
                </div>
                <div>
                  <el-select v-model="ruleForm.area"  clearable collapse-tags placeholder="区" :disabled="type==='edit'">
<!--                    <el-option v-for="(item,index) in egionNoList" :key="item.code"-->
<!--                               :label="item.name" :value="item.code" />-->
                  </el-select>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入详细地址" maxlength=200 :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="branch-footer">
          <el-col :span="24" v-show = "type==='add'">
            <el-button type="primary" size="small" @click="submit('ruleForm')">提交</el-button>
            <!-- <el-button size="small" @click="resetForm('ruleForm')">{{$i18ns('重置')}}</el-button> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import * as _ from "lodash";
  import { EventBus } from "./Bus";
  import { showList, rules } from "./constant";

  export default {
    name: "BranchManagerRight",
    data() {
      return {

        机构编号:this.$i18ns("机构编号"),
        机构关系:this.$i18ns("机构关系"),
        机构名称:this.$i18ns("机构名称"),
        机构级别:this.$i18ns("机构级别"),
        上级机构号:this.$i18ns("上级机构号"),
        机构层级码:this.$i18ns("机构层级码"),
        联系人电话:this.$i18ns("联系人电话"),
        邮编:this.$i18ns("邮编"),
        联系人姓名:this.$i18ns("联系人姓名"),
        机构状态:this.$i18ns("机构状态"),
        机构类型:this.$i18ns("机构类型"),
        实体机构标志:this.$i18ns("实体机构标志"),
        机构作用类型:this.$i18ns("机构作用类型"),
        机构邮箱:this.$i18ns("机构邮箱"),
        节假日代码:this.$i18ns("节假日代码"),
        联系人邮箱:this.$i18ns("联系人邮箱"),
        分行号:this.$i18ns("分行号"),
        机构地址:this.$i18ns("机构地址"),
        合同签署地:this.$i18ns("合同签署地"),
        是否展业城市:this.$i18ns("是否展业城市"),
        展业城市:this.$i18ns("展业城市"),
        详细地址:this.$i18ns("详细地址"),

        ruleForm: {
          user_id : "",
          branch_id: "", // 机构编号
          branch_name: "", // 机构名称
          branch_level: "", // 机构级别
          brch_relation_code: "",//机构关系代码
          ccy_code: "",//币种
          real_branch_ind: "", // 实体机构标志
          branch_address: "", // 机构地址
          postcode: "", // 邮编
          contacts_name: "", // 联系人姓名
          contacts_phone: "", // 联系人电话
          branch_function_class: "", // 机构作用类型
          swift_no: "0", // swift 编号
          holiday_code: "", // 节假日代码
          branch_mail: "", // 机构邮箱
          contacts_mail: "", // 联系人邮箱
          parent_brch_id: "", // 上级机构编号
          branch_level_code:"",
          branch_type: "", // 机构类型
          branch_city_no: "", // 分行号
          branch_stus: "", // 机构状态
          iscity:"",//是否展业城市
          province:"",//省
          city:"",//市
          area:"",//区
          address:"",//详细地址
          agree_sign:"",//合同签署地
          show_province:"",//展业城市省
          show_city:"",//展业城市市
          show_area:"",//展业城市区
          showcityList:[],//展业城市市集合
          showregionList:[],//展业城市省集合
        },
        showForm: false,
        title: "",
        rules: rules,
        showList: showList,
        branchLvList: [], // 机构级别数据字典
        realBranchList: [], // 实体机构标志数据字典
        branchTypeList: [], // 机构类型数据字典
        branchStatusList:[],// 机构状态数据字典
        branchLevelList:[], // 机构级别字典
        branchRelationList:[], // 机构关系描述字典
        ccyCodeList:[], // 币种描述字典
        cityList: [],//市集合
        regionList: [],//省集合
        provinceList: {//区集合
          reginName: "",
          regionNo: ""
        },
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        cityNoList:[],//
        egionNoList:[],//
        addRoles:[],
        role_id: "" // 用户角色id
      }

    },
    created() {
      this.getDictList("E_BRANCH_LEVEL", "branchLvList"); // 初始化机构级别数据字典
      this.getDictList("MS_E_YESORNO", "realBranchList"); // 初始化实体机构标志数据字典
      this.getDictList("CT_E_BRCHTP", "branchTypeList"); // 初始化机构类型数据字典
      this.getDictList("CT_E_BRCHSTUS", "branchStatusList"); // 初始化机构状态数据字典
      this.getAreaList("0","provinceList");
      this.getBranchLevel();
      this.getBranchRelation();
      this.getCcyCode();
      this.getRoleId();
    },
    mounted() {
      EventBus.$on("modifyBranch", (branchInfo) => {
        this.ruleForm.org_id = branchInfo.org_id;
        this.ruleForm.branch_id = branchInfo.branch_id;
        this.ruleForm.branch_name = branchInfo.branch_name;
        this.ruleForm.branch_level = branchInfo.branch_level;
        this.ruleForm.brch_relation_code = branchInfo.brch_relation_code;
        this.ruleForm.branch_level_code = branchInfo.branch_level_code;
        this.ruleForm.real_branch_ind = branchInfo.real_branch_ind;
        this.ruleForm.branch_address = branchInfo.branch_address;
        this.ruleForm.postcode = branchInfo.postcode;
        this.ruleForm.ccy_code = branchInfo.ccy_code;
        this.ruleForm.contacts_name = branchInfo.contacts_name;
        this.ruleForm.contacts_phone = branchInfo.contacts_phone;
        this.ruleForm.branch_function_class = branchInfo.branch_function_class;
        this.ruleForm.swift_no = branchInfo.swift_no;
        this.ruleForm.holiday_code = branchInfo.holiday_code;
        this.ruleForm.branch_mail = branchInfo.branch_mail;
        this.ruleForm.contacts_mail = branchInfo.contacts_mail;
        this.ruleForm.parent_brch_id = branchInfo.parent_brch_id;
        this.ruleForm.branch_type = branchInfo.branch_type;
        this.ruleForm.branch_city_no = branchInfo.branch_city_no;
        this.ruleForm.branch_stus = branchInfo.branch_stus;
        this.ruleForm.iscity=branchInfo.iscity;
        this.ruleForm.province=branchInfo.province;
        this.ruleForm.city=branchInfo.city;
        this.ruleForm.area=branchInfo.area;
        this.ruleForm.address=branchInfo.address;
        this.ruleForm.agree_sign=branchInfo.agree_sign;
        this.ruleForm.show_province=branchInfo.show_province;
        this.ruleForm.show_city=branchInfo.show_city;
        this.ruleForm.show_area=branchInfo.show_area;
        this.ruleForm.showcityList=branchInfo.showcityList;
        this.ruleForm.showregionList=branchInfo.showregionList;
        this.title = "机构信息展示";
        this.type = "edit";
        this.showForm = true;
        if (branchInfo.show_province !="" && branchInfo.show_province != null){
          //获取展业城市
          this.getAreaList(branchInfo.show_province,"cityNoList");
        }
        if (branchInfo.show_city !="" && branchInfo.show_city != null){
          //获取展业区县
          this.getAreaList(branchInfo.show_city,"egionNoList");
        }
        if (branchInfo.province !="" && branchInfo.province != null){
          //市
          this.getAreaList(branchInfo.province,"cityList");
        }
        if (branchInfo.city !="" && branchInfo.city != null){
          //区
          this.getAreaList(branchInfo.city,"regionList");
        }
      });
    },
    methods: {

      //机构关联角色
      openBranchRoleDialog() {
        let that = this;
        console.log("this.$dataBus.getCurrentFormData(this)");
        console.log('this.$dataBus', that.$dataBus);
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "机构关联角色查询",
          toRequest: {
            url: "/views/ismt/ct/branch/branchRole/branch_role_manager.json",
            method: "get",
            "params": {
              "branch_id": that.ruleForm.branch_id,
              "brch_relation_code":that.ruleForm.brch_relation_code,
              "role_id": that.role_id
            }
          },
          width: "60%"
        })
      },

      //管理员角色关联角色
      openBranchRoleRoleDialog() {
        let that = this;
        console.log("this.$dataBus.getCurrentFormData(this)");
        console.log('this.$dataBus', that.$dataBus);
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "管理员关联角色查询",
          toRequest: {
            url: "/views/ismt/ct/branch/branchRoleRole/branch_role_role_manager.json",
            method: "get",
            "params": {
              "branch_id": that.ruleForm.branch_id,
              "brch_relation_code":that.ruleForm.brch_relation_code,
              "role_id": that.role_id
            }
          },
          width: "60%"
        })
      },

      //机构角色关联机构
      openBranchRoleBranchDialog() {
        let that = this;
        console.log("this.$dataBus.getCurrentFormData(this)");
        console.log('this.$dataBus', that.$dataBus);
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "管理员关联机构查询",
          toRequest: {
            url: "/views/ismt/ct/branch/branchRoleBranch/branch_role_branch_manager.json",
            method: "get",
            "params": {
              "branch_id": that.ruleForm.branch_id,
              "brch_relation_code":that.ruleForm.brch_relation_code,
              "role_id": that.role_id
            }
          },
          width: "60%"
        })
      },

      /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictTyp
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
      /**
       * 表单提交
       * @param formName 表单form值
       */
      submit(formName) {
        let that=this;
        that.$refs[formName].validate(valid => {
          if (valid) {
            let request_map = {}
            let request_url = "/SUMP/call/RPCCall";
            if(that.type === "edit"){
              request_map["operater_ind"] = "M";
            }else{
              request_map["operater_ind"] = "A";
              request_map["page_id"] = "/views/ismt/ct/branch/brannch-info-add.json";
            }
            request_map["servicecode"] = "ct2144";//修改
            request_map["org_id"] = that.ruleForm.org_id;// 法人代码
            request_map["branch_id"] = that.ruleForm.branch_id;// 机构编号
            request_map["user_id"] = that.ruleForm.user_id;// 用户id
            request_map["branch_level"] = that.ruleForm.branch_level;//  机构级别 branch_id
            request_map["brch_relation_code"] = that.ruleForm.brch_relation_code;//  机构关系
            request_map["real_branch_ind"] = that.ruleForm.real_branch_ind;// 实体机构标志
            request_map["parent_brch_id"] = that.ruleForm.parent_brch_id;// 上级机构编号
            request_map["ccy_code"] = that.ruleForm.ccy_code;// 币种
            that.$http.invokeAPI(request_url, "post", request_map).then(response => {
              console.log(response)
              if (response.code === "200") {
                if(response.message==='SUCCESS'){
                  that.$emit('refresh', '');
                  that.$message({
                    type: 'success',
                    message: "新增成功"
                  });
                }else{
                  that.$message({
                    type: 'error',
                    message: response.message,
                  });
                }
              } else {
                MyMessage({
                  message: response.message,
                  type: 'error'
                });
              }
            });

          } else {
            that.$message({
              type: 'warning',
              message: '校验不通过'
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      // 加载级别数据
      getBranchLevel(){
        let params = {
          dict_type: "CT_E_BRANCHLEVEL",
          servicecode: "ct2205",
        }
        let _this = this
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            _this.branchLevelList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      // 加载机构关系
      getBranchRelation(){
        let params = {
          servicecode: "ct2145",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.branchRelationList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },

      // 加载币种字典
      getCcyCode(){
        let params = {
          dict_type: "MS_CURRENCY",
          servicecode: "ct2205",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.ccyCodeList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },


      // 加载省元数据
      getAreaList(parent_code,listKey) {
        let params = {
          parent_code: parent_code,
          servicecode: "ct2200",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this[listKey]= res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      changeQueryProvince(regionNo) {
        this.ruleForm.city = ""
        this.ruleForm.area = ""
        if (regionNo == null || regionNo == "" ){
          this.cityList = []
          this.regionList = []
          return ;
        }
        let params = {
          parent_code: regionNo,
          servicecode: "ct2200",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.cityList= res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      changeShowProvince(regionNo) {
        if (regionNo == null || regionNo == "" ){
          this.cityNoList = []
          this.egionNoList = []
          return ;
        }
        let params = {
          parent_code: regionNo,
          servicecode: "ct2200",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.cityNoList= res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      // 改变市
      changeQueryCity(regionNo) {
        this.ruleForm.area = ""
        if (regionNo == null || regionNo == "" ){
          return  this.regionList = [];
        }
        let params = {
          parent_code: regionNo,
          servicecode: "ct2200",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.regionList= res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      //处理展业城市
      changeShowCity(regionNo) {
        this.ruleForm.show_area = ""
        if (regionNo == null || regionNo == "" ){
          return  this.egionNoList = [];
        }
        let params = {
          parent_code: regionNo,
          servicecode: "ct2200",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.egionNoList=res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getRoleId(){
        let params = {
          user_id: "$g{{user_info.userCode}}",
          servicecode: "ct2109",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.role_id = res.data.role_id;
          }
        }).catch(err => {
          console.error(err)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .branch-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    .branch-form--title {
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
        background: #727df8;
      }
    }
  }
  .branch-footer {
    text-align: center;
    padding: 0 0 10px 0;
  }
  .linkage {
    display: flex;
    div {
      margin-right: 5px;
    }
  }
  .showchbox{
    display: flex;
    div {
      margin-right: 2px;
    }
    font-size: 11px;
    width: 100%;
    overflow: hidden;
    border-radius: 3px;

  }
  .chbox{
    border-radius: 5px;
    height: 140px;
    width:auto;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: "Courier New", Courier, monospace;
  }

</style>
