<template>
  <div id="pageId" class="container_wrap">
    <div class="todo-top">
      <el-collapse v-model="activeNames" class="collapse-todo">
        <el-collapse-item class="collapse-item" name="top">
          <template slot="title">
            <div class="collapse-box">
              <div class="box-img">
                <img :src="applyImg" class="img" />
              </div>
              <div class="box-right">
                <p class="box-right--top">
                  {{
                    $i18ns("bpmmodel.application_number") +
                    ":" +
                    ruleForm.appl_id
                  }}
                </p>
                <p class="box-right--bottom">
                  <span>{{
                    $i18ns("bpmmodel.main_applicant") + ":" + ruleForm.cust_name
                  }}</span>
                  <span class="box-right--margin">{{
                    $i18ns("bpmmodel.application_date") +
                    ":" +
                    ruleForm.system_date
                  }}</span>
                  <span class="box-right--margin">{{
                    $i18ns("bpmmodel.application_status") +
                    ":" +
                    formatDictData(ruleForm.appl_state, statusList)
                  }}</span>
                </p>
              </div>
            </div>
          </template>
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
            <el-row>
              <!-- <el-col :span="8">
                <el-form-item
                  :label="$i18ns('bpmmodel.application_status')"
                  prop="appl_state"
                  class="upload-item"
                >
                  <el-select v-model="ruleForm.appl_state" :disabled="true">
                    <el-option
                      v-for="(item, i) in statusList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item :label="$i18ns('bpmmodel.opinion_type')" prop="appv_opinion_type">
                  <el-select v-model="ruleForm.appv_opinion_type" @change="opinionChange" :placeholder="$i18ns('bpmmodel.please_select_the_type_of_opinion')
                    ">
                    <el-option v-for="(item, i) in appv_opinion_list" :key="i" :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$i18ns('bpmmodel.optional_nodes')" prop="route_id">
                  <el-select v-model="ruleForm.route_id" @change="roadChange" :placeholder="$i18ns('bpmmodel.please_select_an_optional_node')
                    ">
                    <el-option v-for="(item, i) in roadList" :key="i" :label="item.route_name" :value="item.route_id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="routidSelect">
                <el-form-item :label="$i18ns('bpmmodel.next_handler')" prop="user_id">
                  <el-select v-model="ruleForm.user_id" multiple class="filter-item" :placeholder="$i18ns('bpmmodel.please_select_the_next_handler')
                    " size="small">
                    <el-option v-for="(item, i) in urinfoList" :key="i" :label="item.user_id + '' + item.user_name"
                      :value="item.user_id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="routidSelect2">
                <el-form-item :label="$i18ns('bpmmodel.next_handler')" prop="user_id">
                  <el-select v-model="ruleForm.user_id" :placeholder="$i18ns('bpmmodel.please_select_the_next_handler')
                    ">
                    <el-option v-for="(item, i) in urinfoList" :key="i" :label="item.user_id + '' + item.user_name"
                      :value="item.user_id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="routidSelect3" :class="{ 'margin-b-16': routidSelect3 }">
              <el-col :span="16" :offset="4">
                <el-table :data="ruleForm.pgatewayList" style="width: 100%" v-if="pgatewayNewList" v-loading="showTable">
                  <el-table-column prop="next_task_define_name" label="节点名称" width="180">
                  </el-table-column>
                  <el-table-column label="下一处理人">
                    <template slot-scope="scope">
                      <el-form-item class="table-form-item" v-if="scope.row.next_is_manu === '2' ||
                        scope.row.next_is_manu === '1'
                        " :label="''" :prop="'pgatewayList.' + scope.$index + '.user_info'">
                        <el-select :placeholder="$i18ns('bpmmodel.please_select_the_next_handler')
                          " v-model="scope.row.user_info" :multiple="scope.row.next_is_manu === '2'">
                          <el-option v-for="(item, i) in pgatewayDataDeal(
                            scope.row.route_id
                          )" :key="i" :label="item.user_id + '' + item.user_name" :value="selectChange(item)">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item v-else class="table-form-item"><span></span></el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item :label="$i18ns('bpmmodel.approval_opinions')" prop="appr_desc">
                  <el-input v-model="ruleForm.appr_desc" type="textarea" :rows="4" resize="none"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="custom-common--footer">
              <!-- <el-button type="primary" size="small" v-if="isShow(btn1)"  :disabled="buttonauthcontrol.timestampToTime(1612249038971) ||submitLoading" @click="topSubmit">提交</el-button>
              <el-button size="small" type="primary" v-if="isShow(btn2)" class="submit-item--btn" :disabled="isDisabled(btn2)" @click="toViewLog">{{$i18ns('查看')}}流程校验日志</el-button>
              <el-button size="small" type="primary" v-if="isShow(btn3)" class="submit-item--btn" :disabled="isDisabled(btn3)" @click="toViewAppv">{{$i18ns('查看')}}审批记录</el-button> -->
              <el-button type="primary" size="small" v-if="buttonauthcontrol.isShow(btn1, authMenuList)" :disabled="buttonauthcontrol.isDisabled(btn1, this.authMenuList) ||
                submitLoading
                " @click="topSubmit">{{ $i18ns("bpmmodel.submit_bts") }}
              </el-button>
              <el-button size="small" type="primary" v-if="buttonauthcontrol.isShow(btn2, authMenuList)"
                class="submit-item--btn" :disabled="buttonauthcontrol.isDisabled(btn2, this.authMenuList)
                  " @click="toViewLog">{{ $i18ns("bpmmodel.viewing_process_validation_logs") }}
              </el-button>
              <el-button size="small" type="primary" v-if="buttonauthcontrol.isShow(btn3, authMenuList)"
                class="submit-item--btn" :disabled="buttonauthcontrol.isDisabled(btn3, this.authMenuList)
                  " @click="toViewAppv">{{ $i18ns("bpmmodel.view_approval_records") }}
              </el-button>
              <el-button size="small" type="primary" v-if="buttonauthcontrol.isShow(btn3, authMenuList)"
                class="submit-item--btn" :disabled="buttonauthcontrol.isDisabled(btn3, this.authMenuList)
                  " @click="toRoutePrdict">{{ $i18ns("bpmmodel.route_prediction") }}
              </el-button>
              <el-button size="small" type="primary" v-if="buttonauthcontrol.isShow(btn4, authMenuList) &&
                sign_tran_flag === '1'
                " class="submit-item--btn" :disabled="buttonauthcontrol.isDisabled(btn4, this.authMenuList)
    " @click="toSingTran">{{ $i18ns("bpmmodel.sign_tran") }}
              </el-button>
              <el-button size="small" type="primary" v-if="buttonauthcontrol.isShow(btn5, authMenuList) &&
                sign_cancel_flag === '1'
                " class="submit-item--btn" :disabled="buttonauthcontrol.isDisabled(btn5, this.authMenuList)
    " @click="toSingCancel">{{ $i18ns("bpmmodel.sign_cancel") }}
              </el-button>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item class="collapse-item collapse-item-bottom" name="bottom">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.tree_menu_name"
              :name="'tab' + item.tree_seq">
              <pte-resolver v-if="activeName === 'tab' + item.tree_seq" :c-parent-meta="c_$meta"
                :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"></pte-resolver>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import qs from "qs";
import { List } from "gojs";
import { formatDictData } from "@/util/commondeal.js";
import applyImg from "/public/shenqingshu.svg";

export default {
  name: "WaitToDoDeal",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },

  data() {
    return {
      pageId: "K000101", //定义页面id，所有的有按钮的页面都要定义，例如 pageId:"A0101"
      btn1: "K00010101", //定义按钮id，所有的按钮的页面都要定义，例如 btn1:"A010101"
      btn2: "K00010102", //定义按钮id，所有的按钮的页面都要定义，例如 btn2:"A010103"
      btn3: "K00010103", //定义按钮id，所有的按钮的页面都要定义，例如 btn3:"A010103"
      authMenuList: [], //定义接收按钮权限列表数组
      ln_prodcd_cd: "",
      activeNames: ["top", "bottom"], //折叠面板
      appv_opinion_type_rule_desc: this.$i18ns(
        "bpmmodel.please_select_the_type_of_opinion"
      ),
      route_id_rule_desc: this.$i18ns(
        "bpmmodel.please_select_an_optional_node"
      ),
      user_id_rule_desc: this.$i18ns("bpmmodel.please_select_the_next_handler"),
      appr_desc_rule_desc: this.$i18ns(
        "bpmmodel.please_enter_approval_comments"
      ),
      route_prediction: this.$i18ns("bpmmodel.route_prediction"),
      ruleForm: {
        appl_id: "",
        route_id: "",
        user_id: "",
        appv_opinion_type: "",
        appr_desc: "",
        system_date: "",
        // user_info: {
        //   user_id: "",
        //   head_appv_flag: "",
        //   user_name: "",
        //   user_branch: ""
        // }
        pgatewayList: []
      },
      route_users: [{ user_info: {} }],
      rules: {
        appv_opinion_type: [
          {
            required: true,
            message: this.appv_opinion_type_rule_desc,
            trigger: "blur"
          }
        ],
        appr_desc: [
          {
            required: true,
            message: this.route_id_rule_desc,
            trigger: "blur"
          }
        ],
        user_id: [
          {
            required: true,
            message: this.user_id_rule_desc,
            trigger: "blur"
          }
        ],
        route_id: [
          {
            required: true,
            message: this.appr_desc_rule_desc,
            trigger: "blur"
          }
        ]
      },
      userinfoRules: {
        user_info: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback("请选择！");
              }
            },
          },
        ]
      },
      roadList: [], // 可选节点列表

      urinfoList: [], // 可选节点列表
      statusList: [],
      appv_opinion_list: [],
      imageForm: {
        // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "" // 身份证反面
      },

      c_$meta: {},
      c_$scope: {},
      c_$params: {
        applid: "",
        appl_id: "",
        cust_id: "",
        cust_name: "",
        cust_type: "",
        cert_no: "",
        crdlno: "",
        prod_cd: "",
        margin_ctr_ppsl_id: "",
        system_date: "",
        apply_type: "", //产品中申请类型,
        parent_apply_id: "", //父级申请编号
        reserve1: "",
        reserve2: "",
        reserve3: "",
        reserve4: "",
        reserve5: ""
      },
      activeName: "first",
      tabList: [], // tab切换列表
      routidSelect: false,
      routidSelect2: false,
      routidSelect3: false,
      submitLoading: false, // 防止多次提交
      sign_tran_flag: "",
      sign_cancel_flag: "",
      applyImg, // 申请书小图标
      task_define_id: "", //并行网关 节点定义id
      pgatewayNewList: [], //并行网关列表
      showTable: false
    };
  },
  created() {
    this.c_$params.applid = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.apply_no = this.cParentParams.appl_id; // apply_no参数传递
    this.c_$params.reserve1 = this.cParentParams.reserve1;
    this.c_$params.reserve2 = this.cParentParams.reserve2;
    this.c_$params.reserve3 = this.cParentParams.reserve3;
    this.c_$params.reserve4 = this.cParentParams.reserve4;
    this.c_$params.reserve5 = this.cParentParams.reserve5;
    this.getHeadInfo();
    this.getauthMenuList(); //得到按钮权限
    this.getRoadList(); // 获取可选节点列表
    this.getTabInfo(); // 获取tab信息

    this.getDictList("BPM_E_APPL_STATE", "statusList");
    this.getDictList("BPM_E_OPINION_TYPE", "appv_opinion_list");
    this.c_$params.applid = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.apply_no = this.cParentParams.appl_id; // apply_no参数传递
    this.c_$params.cust_id = this.cParentParams.cust_id; // cust_id参数传递
    this.c_$params.cert_no = this.cParentParams.cert_no; // cust_id参数传递
    this.c_$params.cust_name = this.cParentParams.cust_name;
    this.c_$params.prod_cd = this.cParentParams.prod_cd; //业务产品号
    this.c_$params.system_date = this.cParentParams.system_date; //申请日期
    this.c_$params.margin_ctr_ppsl_id = this.cParentParams.margin_ctr_ppsl_id;
    this.c_$params.wf_inst_id = this.cParentParams.wf_inst_id;
    this.c_$params.cur_wfrl_id = this.cParentParams.cur_wfrl_id; //信用评级权限角色编码
    this.c_$params.part_project_no = this.cParentParams.part_project_no;
    this.c_$params.project_template_no = this.cParentParams.project_template_no;
    this.c_$params.tranType = this.cParentParams.tranType;
    this.c_$params.project_template_version = this.cParentParams.project_template_version;
    this.c_$params.version = this.cParentParams.version;
    this.c_$params.part_no = this.cParentParams.part_no;

    // 进件中心查产品申请类型
    if (this.cParentParams.appId === "icmsOnl") {
      this.getBuisApplyInfo(); //获取业务申请信息
      this.getApplyType();
    }
  },

  mounted() {
    this.c_$params.applid = this.cParentParams.appl_id
      ? this.cParentParams.appl_id
      : this.$dataBus.getCurrentcParams(this).data_appl_id; // appid参数传递
    this.c_$params.cust_id = this.cParentParams.cust_id
      ? this.cParentParams.cust_id
      : this.$dataBus.getCurrentcParams(this).data_cust_id; //cust_id参数传递
  },
  methods: {
    formatDictData,
    async getauthMenuList() {
      this.authMenuList = await this.buttonauthcontrol.getAuthority(
        this.pageId
      ); //得到按钮权限
    },
    selectChange(val) {
      // 对可能遇到 undefined类型的数据返回空字符串
      let newVal = JSON.stringify(val, (key, value) =>
        typeof value === "undefined" || null ? "" : value
      );

      return newVal;
    },
    selectChange2(val) {
      let newArray = val.map(item => {
        return JSON.parse(item);
      });
      return newArray;
    },
    selectChange3(val) {
      let arr = [];
      arr.push(JSON.parse(val));
      return arr;
    },
    /**
     * 获取头部信息
     */
    getHeadInfo() {
      let that = this;
      let params = {
        appl_id: this.cParentParams.appl_id,
        task_inst_id: this.cParentParams.task_inst_id,
        servicecode: "bpm1014",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            // this.c_$params.prod_cd = res.data.prod_cd;
            // that.c_$params.crdlno= res.data.crdlno;//额度编号
            // that.ruleForm.applno =  res.data.applno;//授信编号
            // that.c_$params.crdlno = res.data.crdlno;//额度编号
            if (!this.c_$params.reserve1 || this.c_$params.reserve1 === "") {
              this.c_$params.reserve1 = res.data.reserve1; //预留字段1
            }
            if (!this.c_$params.reserve2 || this.c_$params.reserve2 === "") {
              this.c_$params.reserve2 = res.data.reserve2; //预留字段1
            }
            if (!this.c_$params.reserve3 || this.c_$params.reserve3 === "") {
              this.c_$params.reserve3 = res.data.reserve3; //预留字段1
            }
            if (!this.c_$params.reserve4 || this.c_$params.reserve4 === "") {
              this.c_$params.reserve4 = res.data.reserve4; //预留字段1
            }
            if (!this.c_$params.reserve5 || this.c_$params.reserve5 === "") {
              this.c_$params.reserve5 = res.data.reserve5; //预留字段1
            }
            this.ruleForm.appl_id = res.data.appl_id;
            this.ruleForm.cust_name = res.data.cust_name;
            this.ruleForm.cust_id = res.data.cust_id;
            this.ruleForm.appl_state = res.data.appl_state;
            this.ruleForm.system_date = res.data.system_date;
            this.ruleForm.brch_cd = res.data.brch_cd;
            this.ruleForm.wf_inst_id = res.data.wf_inst_id;
            this.ruleForm.task_inst_id = res.data.task_inst_id;
            this.c_$params.part_project_no = this.cParentParams.part_project_no;
            this.c_$params.project_template_no = res.data.reserve3;
            this.c_$params.tranType = this.cParentParams.tranType;
            this.c_$params.project_template_version = this.cParentParams.project_template_version;
            this.c_$params.version = res.data.reserve5;
            this.c_$params.part_no = this.cParentParams.reserve1;
            this.sign_tran_flag = res.data.sign_tran_flag; //是否可转签
            this.sign_cancel_flag = res.data.sign_cancel_flag; //是否可取消签收
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 获取产品中申请类型
     */
    getApplyType() {
      let that = this;
      let params = {
        apply_no: this.cParentParams.appl_id,
        servicecode: "ar0705"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.c_$params.apply_type = res.data.apply_type;
          }
        })
        .catch(err => {
          console.error(err);
        });
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
     * 获取可选节点列表
     */
    getRoadList() {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        task_inst_id: this.cParentParams.task_inst_id,
        task_define_id: this.task_define_id,
        servicecode: "bpm1003",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            // 没有值时为初始化，查询返回数据为第一个可选节点，有值为并行网关节点查询
            if (this.task_define_id) {
              this.showTable = false;
              this.ruleForm.pgatewayList = res.data;
              // 每次查询先置空，避免重复push
              this.pgatewayNewList = [];
              this.ruleForm.pgatewayList.forEach(item => {
                if (item.next_is_manu === "1" || item.next_is_manu === "2") {
                  this.pgatewayData(item.route_id);
                }
              });
            } else {
              this.roadList = res.data;
            }
          }
        })
        .catch(err => {
          this.showTable = false;
          console.error(err);
        });
    },
    getBuisApplyInfo() {
      let that = this;
      let params = {
        servicecode: "ar0705",
        apply_no: this.cParentParams.appl_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.c_$params.parent_apply_id = res.data.parent_apply_id;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    roadChange(val) {
      let task_type = ""; // 获取当前节点状态 END取消申请 PGATEWAY并行网关
      this.task_define_id = "";
      let ismanu = "0";
      this.roadList.forEach(item => {
        if (item.route_id === val) {
          ismanu = item.next_is_manu;
          task_type = item.task_type;
          this.task_define_id = item.next_task_define_id;
        }
      });
      // PGATEWAY并行网关，不显示单独的下一节点处理人，有几个并行节点出现几个列表
      if (task_type === "PGATEWAY") {
        this.getRoadList();
        this.showTable = true;
        this.routidSelect3 = true;
      } else if (ismanu === "2") {
        this.routidSelect = true;
        // if (this.urinfoList.length === 0) {
        this.getUrinfoList(val);
        //}
      } else if (ismanu === "1") {
        this.routidSelect2 = true;
        this.getUrinfoList(val);
      } else {
        this.routidSelect = false;
        this.routidSelect2 = false;
        this.routidSelect3 = false;
      }
    },
    opinionChange(val) {
      let that = this;
      let params = {
        servicecode: "bpm6006",
        appl_id: this.cParentParams.appl_id,
        appv_opinion_type: val,
        appId: this.cParentParams.appId,
        task_inst_id: this.cParentParams.task_inst_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.ruleForm.appr_desc = res.data.opinion_desc;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取审批人信息
     */
    getUrinfoList(route_id) {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        route_id: route_id,
        cur_user_id: JSON.parse(localStorage.user_info).userCode, // userCode
        cur_brch_cd: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "bpm1004",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            if (res.data && res.data.candidate) {
              this.urinfoList = res.data.candidate;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取tab信息
     */
    getTabInfo() {
      let params = {
        frame_cd: this.cParentParams.frame_cd,
        servicecode: "bpm0048",
        appId: this.cParentParams.appId
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let reqList = res.data;
            let showList = [];
            for (let i = 0; i < reqList.length; i++) {
              let node = new Object();
              node.tree_seq = reqList[i].tree_seq;
              node.tree_menu_name = reqList[i].tree_menu_name;
              let toReq = new Object();
              toReq.url = reqList[i].vue_path;
              node.toRequest = toReq;
              showList.push(node);
            }
            this.tabList = showList;
            this.activeName = "tab" + this.tabList[0].tree_seq;
            if (this.c_$params.temp_type === "1") {
              for (var i = 0; i < this.tabList.length; i++) {
                if (this.tabList[i].tree_menu_name === "财务因素") {
                  this.tabList.splice(i, 1);
                }
              }
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 头部提交
     */
    topSubmit() {
      this.validate();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            wf_inst_id: this.cParentParams.wf_inst_id,
            route_id: this.ruleForm.route_id,
            servicecode: "bpm1006",
            appId: this.cParentParams.appId,
            appr_desc: this.ruleForm.appr_desc,
            task_id: this.cParentParams.task_inst_id
          };

          if (this.routidSelect) {
            params.next_user_id = this.ruleForm.user_id;
            params.task_id = this.cParentParams.task_inst_id;

            let data2 = [];
            this.ruleForm.user_id.filter((item, i) => {
              let user_infoT = {
                user_id: "",
                user_name: "",
                user_branch: "",
                head_appv_flag: ""
              };
              user_infoT.user_id = this.ruleForm.user_id[i];
              data2.push(user_infoT);
            });
            params.user_info = data2;
          }

          if (this.routidSelect2) {
            params.task_id = this.cParentParams.task_inst_id;
            let data2 = [];
            let user_infoT = {
              user_id: "",
              user_name: "",
              user_branch: "",
              head_appv_flag: ""
            };
            user_infoT.user_id = this.ruleForm.user_id;
            data2.push(user_infoT);
            params.user_info = data2;
          }
          // 并行网关提交
          if (this.routidSelect3) {
            params.task_inst_id = this.cParentParams.task_inst_id;
            params.servicecode = "bpm1037";
            params.appr_code = this.ruleForm.appv_opinion_type;
            // 对表格下一处理人数据处理
            let route_users = [];
            let route_user = [];
            this.ruleForm.pgatewayList.forEach(item => {
              if (item.user_info && Array.isArray(item.user_info)) {
                route_user.push({
                  inner_route_id: item.route_id,
                  user_info: this.selectChange2(item.user_info)
                });
              } else if (item.user_info && typeof item.user_info === "string") {
                route_user.push({
                  inner_route_id: item.route_id,
                  user_info: this.selectChange3(item.user_info)
                });
              } else {
                route_user.push({
                  inner_route_id: item.route_id,
                  user_info: []
                });
              }
            });

            route_user.forEach(ele => {
              route_users.push({
                inner_route_id: ele.inner_route_id,
                user_info: ele.user_info
              });
            });
            params.route_users = route_users;

            // 校验 有选择
          }

          this.submitLoading = true;


          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$dataBus.doCallBack(this, res);
                this.submitLoading = false;
                this.$message({
                  type: "success",
                  message: res.message
                });
              }
            })
            .catch(err => {
              this.submitLoading = false;
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: this.$i18ns("validateErrorMessage")
          });
        }
      });
    },
    validate() {
      this.ruleForm.pgatewayList.forEach(item => {
        if (item.next_is_manu == '2' && item.user_info.length == 0) {
          this.$message({
            message: "请选择" + item.next_task_define_name + "下一处理人",
            type: 'error'
          });
          throw new Error("请选择" + item.next_task_define_name + "下一处理人");
        }
        if (item.next_is_manu == '1' && !item.user_info) {
          this.$message({
            message: "请选择" + item.next_task_define_name + "下一处理人",
            type: 'error'
          });
          throw new Error("请选择" + item.next_task_define_name + "下一处理人");
        }
      })
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      const tags = this.$store.state.pte_tagsNav.tagNavList.filter(
        item => !this.routeEqual(this.$route, item)
      );
      this.$store.commit("SETTAGNAVLIST", tags);
      this.$store.state.pte_tagsNav.tagNavList = tags;
      this.$router.push("/dashboard");
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    },
    /**
     * 查看流程校验日志
     */
    toViewLog() {
      this.$dialog.open({
        that: this,
        title: "查看流程校验日志",
        openType: "dialog",
        toRequest: {
          url: "/views/ismt/ct/busiAuth/authOperaLog/authb_system_log_sel.json",
          method: "get",
          params: {
            appId: this.cParentParams.appId,
            busi_seq: this.cParentParams.appl_id
          }
        }
      });
    },
    toRoutePrdict() {
      this.$dialog.open({
        that: this,
        title: this.route_prediction,
        openType: "dialog",
        toRequest: {
          url:
            "/views/msap/bpm/workbench/wait_todo/workbench_route_prediction.json",
          method: "get",
          params: {
            appId: this.cParentParams.appId,
            wf_inst_id: this.cParentParams.wf_inst_id,
            wf_prod_no: this.cParentParams.wf_prod_no,
            task_define_id: this.cParentParams.task_define_id
          }
        }
      });
    },
    /**
     * 查看审批记录
     */
    toViewAppv() {
      this.$dialog.open({
        that: this,
        title: "查看审批记录",
        openType: "dialog",
        toRequest: {
          url: "/views/msap/bpm/workbench/wait_todo/workbench_appv_view.json",
          method: "get",
          params: {
            appId: this.cParentParams.appId,
            wf_inst_id: this.cParentParams.wf_inst_id
          }
        }
      });
    },
    toSingTran() {
      this.$dialog.open({
        that: this,
        title: "转签",
        openType: "dialog",
        toRequest: {
          url:
            "/views/msap/bpm/processManagement/design/process_transign_manager.json",
          method: "get",
          params: {
            appId: this.cParentParams.appId,
            task_inst_id: this.cParentParams.task_inst_id,
            wf_inst_id: this.cParentParams.wf_inst_id,
            sign_mode: "0"
          }
        }
      });
    },
    toSingCancel() {
      this.$confirm(
        this.$i18ns("bpmmodel.sign_cancel_tip"),
        this.$i18ns("watchInfo"),
        {
          confirmButtonText: this.$i18ns("confirm"),
          cancelButtonText: this.$i18ns("confirmCancel"),
          type: "warning"
        }
      )
        .then(() => {
          let that = this;
          let params = {
            task_inst_id: that.cParentParams.task_inst_id,
            servicecode: "bpm1021",
            appId: that.cParentParams.appId
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.sign_cancel_flag = "0";
                this.$message({
                  type: "success",
                  message: res.message
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$i18ns("cancelMsg")
          });
        });
    },
    /**
     * 并行网关 下一处理人列表查询
     */
    pgatewayData(route_id) {
      let params = {
        wf_inst_id: this.cParentParams.wf_inst_id,
        route_id: route_id,
        cur_user_id: JSON.parse(localStorage.user_info).userCode, // userCode
        cur_brch_cd: JSON.parse(localStorage.user_info).branch_id, // branch_id
        servicecode: "bpm1004",
        appId: this.cParentParams.appId
      };

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            if (res.data && res.data.candidate) {
              this.pgatewayNewList.push({
                route_id: route_id,
                userinfo: res.data.candidate
              });
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 并行网关 每一列 下一处理人 数据处理
     */
    pgatewayDataDeal(route_id) {
      let list = [];
      this.pgatewayNewList.forEach(ele => {
        if (ele.route_id == route_id) {
          list = ele.userinfo;
        }
      });
      return list;
    }
  }
};
</script>
<style lang="less" scoped>
.container_wrap {
  height: 100%;
}

.todo-top {
  border-bottom: 1px solid #e3e8f5;
  height: 100%;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}

.collapse-item {
  border: 0.996px;
  padding: 10px 10px 0 10px;
}

.collapse-item-bottom {
  height: 100%;

  /deep/ .el-collapse-item__wrap {
    padding-top: 12px !important;
    padding-bottom: 12px !important;

    .el-collapse-item__content {
      .el-tabs {
        .el-tabs__content {
          padding: 12px;
        }
      }
    }
  }
}

.collapse-todo {
  /deep/ .el-collapse-item__header {
    height: 100% !important;
  }

  /deep/ .el-collapse-item__content {
    padding: 0 20px;
  }
}

.collapse-box {
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;

  .box-img {
    width: 48px;
    height: 48px;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .box-right {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .box-right--top {
      font-size: 16px;
      line-height: 24px;
      margin: 0;
    }

    .box-right--bottom {
      font-size: 14px;
      line-height: 20px;
      color: #86909c;
      margin-top: 4px;
      margin-bottom: 0;

      .box-right--margin {
        margin-left: 40px;
      }
    }
  }
}

.table-form-item {
  /deep/ .el-form-item__content {
    margin: 8px 16px 0 !important;
  }
}
</style>
