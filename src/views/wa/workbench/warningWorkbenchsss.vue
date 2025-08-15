<template>
  <div>
    <div class="todo-top" v-if="show">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="申请书编号:" prop="appl_id" class="upload-item">
              <el-input v-model="Applys.appl_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主申请人:" prop="custna" class="upload-item">
              <el-input v-model="Applys.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请状态:" prop="applst" class="upload-item">
              <el-select v-model="Applys.applst" placeholder="" :disabled="true">
                <el-option
                  v-for="(item, i) in applstList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期:" prop="appldt" class="upload-item">
              <el-input v-model="Applys.appldt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item label="Branch Code:" prop="brch_cd" class="upload-item">
              <el-input v-model="ruleForm.brch_cd" :disabled="true"></el-input>
            </el-form-item>
          </el-col>-->
          <!--<el-col :span="8">
            <el-form-item label="可选节点:" prop="routid" :rules="[{required: true, message: '请选择可选节点'}]">
              <el-select v-model="ruleForm.routid" @change="roadChange" placeholder="请选择可选节点">
                <el-option
                 v-for="(item, i) in roadList"
                 :key="i"
                 :label="item.route_name"
                 :value="item.route_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-show="routidSelect">
             <el-form-item label="下一处理人:" prop="usercd" :rules="[{required: usercdRules, message: '请选择下一处理人'}]">

              <el-select v-model="ruleForm.usercd" placeholder="请选择下一处理人">
                <el-option
                  v-for="(item, i) in urinfoList"
                  :key="i"
                  :label="item.usercd + '' + item.userna"
                  :value="item.usercd">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta" :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "DHWaitToWithDeal",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      show: false,
      Applys: {
        custna: "",
        corpsize: "",
        evaldt: "",
        reptdt: "",
        temp_id: "",
        indcredit: ""
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        appl_id: "",
        procinstid: "",
        custid: "",
        custna: ""
      },
      params: "",
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "first",
      tabList: [
        {
          idField: "first",
          title: "客户基本信息",
          toRequest: {
            url: "/views/dh/warn/workbench/customer_info.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag2",
          title: "预警信息",
          toRequest: {
            url: "/views/dh/warn/workbench/wab_case_info.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag3",
          title: "预警历史",
          toRequest: {
            url: "/views/dh/warn/workbench/was_case_manege.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag4",
          title: "借据信息",
          toRequest: {
            url: "/views/dh/warn/workbench/wab_acct_manege.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag5",
          title: "渠道额度信息",
          toRequest: {
            url: "/views/dh/warn/workbench/wab_cust_channel_limit_manege.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag6",
          title: "产品额度信息",
          toRequest: {
            url: "/views/dh/warn/workbench/wab_cust_channel_p_limit_manege.json",
            method: "get",
            params: {
              "custid": this.cParentParams.custid
            },
          },
        },
        {
          idField: "tag7",
          title: "审批记录",
          toRequest: {
            url: "/views/dh/atpy/query/approval_record.json",
            method: "get",
            params: {
              "appl_id": this.cParentParams.appl_id,
              "proc_inst_id": this.cParentParams.proc_inst_id
            },
          },
        },
        {
          idField: "tag8",
          title: "工单处置信息",
          toRequest: {
            url: "/views/dh/warn/workbench/wab_case_deal_info.json",
            method: "get",
            params: {
                "appl_id": "1"
            },
          },
        }
      ], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    // this.Applys.instr_id = this.cParentParams.instr_id;
    // this.Applys.prodcd = this.cParentParams.prodcd;
    // this.Applys.start_usr = this.cParentParams.start_usr;
    // this.Applys.atpy_status = "已处理";
    // this.Applys.adp_status = "还款账户变更";
    // this.Applys.val_dt = this.cParentParams.val_dt;
    // this.Applys.handle_user = this.cParentParams.handle_user;
    // this.Applys.start_org = this.cParentParams.start_org;

    this.Applys.case_id = this.cParentParams.case_id;
    this.Applys.applst = this.cParentParams.applst;
    this.Applys.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.Applys.custid = this.cParentParams.custid; // appid参数传递
    this.Applys.custna = this.cParentParams.custna;
    this.Applys.appldt = this.cParentParams.appldt; // appid参数传递
    this.Applys.routid = this.cParentParams.routid; // appid参数传递
    this.Applys.usercd = this.cParentParams.usercd;


    this.c_$params.lncfno = this.cParentParams.lncfno;
    this.c_$params.case_id = this.cParentParams.case_id;
    this.c_$params.applst = this.cParentParams.applst;
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.custid = this.cParentParams.custid; // appid参数传递
    this.c_$params.custna = this.cParentParams.custna;
    this.c_$params.appldt = this.cParentParams.appldt; // appid参数传递
    this.c_$params.routid = this.cParentParams.routid; // appid参数传递
    this.c_$params.usercd = this.cParentParams.usercd; // appid参数传递
    this.c_$params.proc_inst_id = this.cParentParams.proc_inst_id; // appid参数传递     res.data.applys.procinstid


    this.show = true;
  },


  methods: {
    setStatus(row, column) {
    return this.getSatus(已处理);
    },
    getSatus(atpy_status) {
      switch (atpy_status) {
        case "3":
          return "已处理";
        default:
          return "";
      }
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    }
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
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
  text-align: center;
  margin-bottom: 20px;
}
</style>
