<template>
  <div class="app-container">
    <el-form ref="delegateForm" size="small" :model="caseMatchSetting" label-width="88px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="案件数">
            <template>
              <span>{{ cParentParams.selectedData.length }}</span>
            </template>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="分案至">
            <el-radio v-model="caseMatchSetting.matchTarget" label="1"> 催收员 </el-radio>
            <el-radio v-model="caseMatchSetting.matchTarget" label="2"> 催收组 </el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="分配方式">
            <el-select v-model="caseMatchSetting.matchModle" placeholder="选择分配方式" filterable clearable>
              <el-option v-for="(item, index) in matchModleOptions" :key="index" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <el-table v-show="caseMatchSetting.matchTarget === '1'" ref="operTable" v-loading="operTableLoading"
        :data="operTable" tooltip-effect="dark" style="width: 100%;" stripe @selection-change="selYuan">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="collector" label="催员" align="center" />
        <el-table-column prop="coll_team" label="部门" align="center" />
        <el-table-column prop="ac_had_cnt" label="当前案件数" align="center">
        </el-table-column>
        <el-table-column prop="ac_had_amt" label="当前案件金额" align="center">
        </el-table-column>
      </el-table>
      <el-table v-show="caseMatchSetting.matchTarget === '2'" ref="managerTable" v-loading="operTableLoading"
        :data="operTable1" tooltip-effect="dark" style="width: 100%;" stripe @selection-change="selZu">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="coll_team" label="部门" align="center" />
        <el-table-column prop="ac_had_cnt" label="当前案件数" align="center">
        </el-table-column>
        <el-table-column prop="ac_had_amt" label="当前案件金额" align="center">
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="center-button">
      <el-button type="primary" :loading="divisionResultLoading" :disabled="divisionResultBtn" @click="viewResult"> 预览分配结果
      </el-button>
    </div>

    <el-dialog :close-on-click-modal="true" :visible.sync="isDiaShow" title="预览" :modal-append-to-body="false"
      :append-to-body="true">

      <el-form ref="delegateForm" size="small" :model="caseMatchSetting" label-width="88px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="分案至">
              <el-radio :disabled="true" v-model="caseMatchSetting.matchTarget" label="1"> 催收员 </el-radio>
              <el-radio :disabled="true" v-model="caseMatchSetting.matchTarget" label="2"> 催收组 </el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <el-form-item label="分配方式">
              <el-select :disabled="true" v-model="caseMatchSetting.matchModle" placeholder="选择分配方式" filterable clearable>
                <el-option v-for="(item, index) in matchModleOptions" :key="index" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-table v-show="caseMatchSetting.matchTarget === '1'" ref="operTable" v-loading="operTableLoading"
          :data="showList" tooltip-effect="dark" style="width: 100%;">

          <el-table-column prop="collector" label="催员" align="center" />
          <el-table-column prop="coll_team" label="部门" align="center" />
          <el-table-column prop="ac_had_cnt" label="当前案件数" align="center">
          </el-table-column>
        </el-table>
        <el-table v-show="caseMatchSetting.matchTarget === '2'" ref="managerTable" v-loading="operTableLoading"
          :data="showList" tooltip-effect="dark" style="width: 100%;">

          <el-table-column prop="coll_team" label="部门" align="center" />
          <el-table-column prop="ac_had_cnt" label="当前案件数" align="center">
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="center-button">
        <el-button type="primary" @click="subMit"> 提交 </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  collector: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {},
  data() {
    return {
      showList: [],
      batch_no: "",
      caseList: [],
      yuanList: [],
      selList: [],
      isDiaShow: false,
      operTable: [],
      operTable1: [],
      total: 0,
      caseMatchSetting: {
        caseCount: null,
        delegateAmount: null,
        matchTarget: '1',
        matchModle: null,
        deptIds: [],
        userIds: []
      },
      matchModleOptions: [{
        'label': '数量+逾期总金额',
        'value': "NUM_OVERDUE_AMOUNT"
      }, {
        'label': '数量+贷款余额',
        'value': "NUM_BALANCE"
      }, {
        'label': '数量+逾期本金',
        'value': "NUM_OVERDUE_PRINCIPAL"
      }]
    };
  },
  created() {
    console.log("布局相关json数据-----", this.cMeta);
    console.log("父页面传的参数-----", this.cParentParams);
    console.log("父页面的相关json数据-----", this.cParentMeta);
    console.log("父页面的scope数据对-----", this.cParentScope);
    this.selectUserChange();
    this.selectDeptChange();
    this.cParentParams.selectedData.forEach((item, index) => {
      const caseMap = {};
      caseMap['case_id'] = item.case_id;
      this.caseList.push(caseMap);
      // this.caseList.push(item.case_id)
    })
  },
  mounted() {
  },
  methods: {
    selYuan(val) {
      this.yuanList = val

    },
    selZu(val) {
      this.selList = val
    },
    viewResult() {
      this.isDiaShow = true
      let divis = []
      if (this.caseMatchSetting.matchTarget == "1") {
        this.yuanList.forEach((item, index) => {
          let j = {}
          j.coll_team = item.coll_team
          j.collector = item.collector
          divis.push(j)
        })
      }

      if (this.caseMatchSetting.matchTarget == "2") {
        this.selList.forEach((item, index) => {
          let j = {}
          j.coll_team = item.coll_team
          j.collector = ""
          divis.push(j)
        })
      }

      console.log("123123", divis, this.caseList)



      let reqMap = {
        servicecode: "cb0346",
        caseList: this.caseList,
        divisionVoList: divis,
        division_type: this.caseMatchSetting.matchTarget,
        assign_algorithm: this.caseMatchSetting.matchModle
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(response => {
        if (response && response.code === "200") {
          this.batch_no = response.data.batch_no
          this.showList = response.data.list01
        }
      }).catch(err1 => {
        console.error(err1);
      })
    },

    subMit() {
      let reqMap = {
        servicecode: "cb0347",
        batch_no: this.batch_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(response => {
        if (response && response.code === "200") {
          // 处理正常响应
          // 可以在这里执行关闭页面或其他逻辑
          // this.isDiaShow = false; // 关闭对话框

          // 使用 Vue Router 导航到上一个页面，假设上一个页面的路由名称是 "previousPage"
          //  this.$router.push({ name: 'manualDivision' });
          // 返回上一步路由
          this.$router.go(-1);
          //刷新页面
          // this.$dataBus.doCallBack(this, {});
          //  this.$router.push("/dashboard");
          // this.$router.push({path: "/S1/S03/S0301/S030101", query: {}});
        } else {
          // 处理错误响应
          // 可以在这里抛出错误或执行其他逻辑
          console.error("请求失败，错误码: " + response.code);
          // 例如，抛出一个错误
          throw new Error("请求失败，错误码: " + response.code);
        }
      }).catch(err1 => {
        // 处理请求失败的情况
        console.error(err);
      })
    },
    // 选中催员
    // selectUserChange(selection) {
    selectUserChange() {
      console.log("163")
      // this.caseMatchSetting.userIds = [];
      // const userIds = [];
      // const divisionVoList = [];

      // selection.forEach(row => {
      //   divisionVoList.push(row.operId);
      // });
      let reqMap = {
        servicecode: "cb0344",
        start: 1,
        length: 10,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(response => {
        if (response && response.code === "200") {
          this.operTable = response.data;
        }
      }).catch(err1 => {
        console.error(err1);
      })
      // this.caseMatchSetting.userIds = Array.from(new Set(userIds));
    },
    // 选中小组
    // selectDeptChange(selection) {
    selectDeptChange() {
      console.log("188")
      // this.caseMatchSetting.deptIds = [];
      // const deptIds = [];
      // selection.forEach(row => {
      //   deptIds.push(row.deptId);
      // });
      let reqMap = {
        servicecode: "cb0345",
        start: 1,
        length: 10,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(response => {
        if (response && response.code === "200") {
          this.operTable1 = response.data;
        }
      }).catch(err1 => {
        console.error(err1);
      })
      // this.caseMatchSetting.deptIds = Array.from(new Set(deptIds));
    }
  }
};
</script>
<style lang="less" scoped>
.table-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // color: #d0f4fa;
}

.center-button {
  text-align: center;
  /* 水平居中 */
  margin-top: 20px;
  /* 可选：增加顶部间距 */
}

/deep/ .el-table .cell {
  white-space: pre-wrap; // pre-wrap 识别空格和换行符，pre-line合并空格并识别换行符
}
</style>
