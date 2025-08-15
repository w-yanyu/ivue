<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>相关还款责任信息概要</h2>
    <br>
    <table border="1">
      <tr>
        <th rowspan="2">责任类型</th>
        <th colspan="3">被追偿业务</th>
        <th colspan="5">其他借贷交易</th>
        <th colspan="5">担保交易</th>
      </tr>
      <tr>
        <th>还款责任金额</th>
        <th>账户数</th>
        <th>余额</th>
        <th>还款责任金额</th>
        <th>账户数</th>
        <th>余额</th>
        <th>关注类余额</th>
        <th>不良类余额</th>
        <th>还款责任金额</th>
        <th>账户数</th>
        <th>余额</th>
        <th>关注类余额</th>
        <th>不良类余额</th>
      </tr>
      <tr v-for="item in arbCRepayLiabilityCom">
        <td>{{ item.duty_type_name }}</td>
        <td>{{ item.recovered_busi_repay_amt }}</td>
        <td>{{ item.recovered_busi_account_num }}</td>
        <td>{{ item.recovered_busi_balance }}</td>
        <td>{{ item.other_trans_busi_repay_amt }}</td>
        <td>{{ item.other_trans_busi_account_num }}</td>
        <td>{{ item.other_trans_busi_balance }}</td>
        <td>{{ item.other_trans_busi_concern_balance }}</td>
        <td>{{ item.other_trans_busi_bad_balance }}</td>
        <td>{{ item.guar_trans_busi_repay_amt }}</td>
        <td>{{ item.guar_trans_busi_account_num }}</td>
        <td>{{ item.guar_trans_balance }}</td>
        <td>{{ item.guar_trans_concern_balance }}</td>
        <td>{{ item.guar_trans_bad_balance }}</td>
      </tr>
      <tr v-if="arbCRepayLiabilityCom.length === 0">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <br>
  </div>
</template>

<script>

export default {
  name: "arbCRepayLiability",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCRepayLiabilityCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCRepayLiabilityCom = this.cParentParams;
      }
    }
  }
}
</script>


<style lang="less" scoped>
table {
  width: calc(100% - 10px);
  height: auto;
  margin: 0 10px 0 10px;
  table-layout: fixed;

  th {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: black;
    height: 40px;
  }

  td {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    height: 40px;
  }
  td, th {
    white-space:nowrap;  //强制在一行显示
    overflow:hidden;    //溢出的内容切割隐藏
    text-overflow:ellipsis; //当内联溢出块容器时，将溢出部分替换为…
    word-break:keep-all;  //允许在单词内换行
  }
  caption {
    text-align: center;
  }
}

h2 {
  color: black;
  font-weight: bold;
}
</style>
