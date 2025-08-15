<template>
  <div class="menu-form">
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item" name="1">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>合同申请信息
        </template>
        <to-json
          toUrl="/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/coltContractApplyDetail/colt_contract_apply_info.json"
          :params="cParentParams"
          style="border-radius: 0px"
        ></to-json>
      </el-collapse-item>
      <el-collapse-item
        class="collapse-item"
        name="2"
      >
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{title}}
        </template>
        <to-json
          :toUrl="col_url"
          :params="cParentParams"
        ></to-json>
      </el-collapse-item>
    </el-collapse>
    <!--    <div style="text-align: left;">-->
    <!--      <span>合同申请信息</span>-->
    <!--    </div>-->
    <!--    <to-json-->
    <!--      toUrl="/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/coltContractApplyDetail/colt_contract_apply_info.json"-->
    <!--      :params="cParentParams"-->
    <!--      style="border-radius: 0px"-->
    <!--    ></to-json>-->
    <!--    &lt;!&ndash;    <div style="text-align: right">合同申请信息</div>&ndash;&gt;-->

    <!--    <el-divider></el-divider>-->
    <!--    <div style="text-align: left"  v-if="guar_type === '2' || guar_type === '3'">已关联抵质押品</div>-->
    <!--    <to-json-->
    <!--      toUrl="/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/coltContractApplyDetail/colt_contract_apply_relation.json"-->
    <!--      :params="cParentParams"-->
    <!--      v-if="guar_type === '2' || guar_type === '3'"-->
    <!--    ></to-json>-->
    <!--    <div style="text-align: left" v-if="guar_type === '1'">关联保证人</div>-->
    <!--    <to-json-->
    <!--      toUrl="/views/icms/guaranteeManager/guaranteeContractManager/guarContractApply/guarantyContractlApplyDetail/guar_contract_apply_relation.json"-->
    <!--      :params="cParentParams"-->
    <!--      v-if="guar_type === '1'"-->
    <!--    ></to-json>-->
    <!--    <div style="text-align: left" v-if="guar_type === '5'">已关联保证金账号</div>-->
    <!--    <to-json-->
    <!--      toUrl="/views/icms/guaranteeManager/guaranteeContractManager/marginContractApply/marginContractApplyDetail/gmargin_contract_apply_relation.json"-->
    <!--      :params="cParentParams"-->
    <!--      v-if="guar_type === '5'"-->
    <!--    ></to-json>-->
    <!--    <el-divider v-if="guar_rule !== 'O'"></el-divider>-->
    <!--    <div style="text-align: left" v-if="guar_rule !== 'O'">最高额担保合同关联业务</div>-->
    <!--    <to-json-->
    <!--      toUrl="/views/icms/guaranteeManager/guaranteeContractManager/guaranteeMaxContract_list.json"-->
    <!--      :params="cParentParams"-->
    <!--      v-if="guar_rule !== 'O'"-->
    <!--    ></to-json>-->
  </div>
</template>
<script>
//财务报表自定义

export default {
  name: "linkMaxContract",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  components: {},
  data() {
    return {
      guar_rule: "",//担保合同号
      guar_type: "",//担保类型
      title: "",//折叠框标题
      col_url: "",//折叠框对应页面
      activeNames: ['1', '2']//折叠面板展示
    };
  },
  created() {
    this.guar_rule = this.cParentParams.guar_rule;
    this.guar_type = this.cParentParams.guar_type;
    this.judgePage();
  },
  methods: {
    judgePage() {
      let guar_type = this.guar_type;
      let guar_rule = this.guar_rule;
      if (guar_rule === 'O') {
        if (guar_type === '2' || guar_type === '3') {
          this.title = "已关联抵质押品";
          this.col_url = "/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/coltContractApplyDetail/colt_contract_apply_relation.json";
        }
        if (guar_type === '1') {
          this.title = "关联保证人";
          this.col_url = "/views/icms/guaranteeManager/guaranteeContractManager/guarContractApply/guarantyContractlApplyDetail/guar_contract_apply_relation.json";
        }
        if (guar_type === '5') {
          this.title = "已关联保证金账号";
          this.col_url = "/views/icms/guaranteeManager/guaranteeContractManager/marginContractApply/marginContractApplyDetail/gmargin_contract_apply_relation.json";
        }
      }
      if (guar_rule === 'F' || guar_rule === 'B') {
        this.title = "最高额担保合同关联业务";
        this.col_url = "/views/icms/guaranteeManager/guaranteeContractManager/guaranteeMaxContract_list.json";
      }
    }
  },
};
</script>
<style lang="css" scoped>
.menu-form {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.menu-form--title {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  duty_type: relative;
  line-height: 40px;
}

.menu-form--title

&
::before {
  content: "";
  width: 3px;
  height: 22px;
  display: block;
  duty_type: absolute;
  left: 0;
  top: 8px;
  background: #727df8;
}

.menu-footer {
  margin-top: 20px;
  text-align: center;
}

.page_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "PingFang SC";
}

.divTitle {
  width: 100%;
  text-align: left;
}

.required {
  color: red;
}

.tableDiv {
  width: 100%;
}

.input_el {
  width: 100%;
}

/deep/ .el-form {
  overflow: hidden;

.scene-table--item {
  width: 100%;

.el-form-item__content {
  text-align: left;
  width: 100%;
}

.el-form-item__label {
  text-align: left;
  display: none;
}

.el-form-item__content {
  width: 100%;
  margin-left: 0 !important;
}

}

.el-form-item__content {
  flex: 1;
  width: 100%;
  margin: 0 !important;

.el-input__inner {
  height: 32px;
}

}

.el-form-item__label {
  text-align: left;
  height: 34px;
  padding: 0 8px 0 0;
  font-size: 14px;
  line-height: 34px;
  color: #697b8c;
}

}

.scene-footer {
  margin-top: 10px;
}
</style>
