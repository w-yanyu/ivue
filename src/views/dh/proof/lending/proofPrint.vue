<template>
  <el-form id="printJS-form" ref="form" :model="formData">
    <table border="1" cellspacing="0" class="table-page">
      <tr>
        <td>借据号:{{ formData.gmtype }}</td>
        <td>贷款户名:{{ formData.gmtype }}</td>
      </tr>
      <tr>
        <td>还款账号:{{ formData.gmtype }}</td>
        <td>还款户名:{{ formData.gmtype }}</td>
      </tr>
      <tr>
        <td>减免罚息:{{ formData.gmtype }}</td>
        <td>减免利息:{{ formData.gmtype }}</td>
      </tr>
      <tr>
        <td>交易机构:{{ formData.gmtype }}</td>
        <td>操作员:{{ formData.gmtype }}</td>
      </tr>
    </table>
    <div id="footer-submit" class="footer-submit" style="margin-top: 20px">
      <el-button size="mini" type="primary" @click="handlePrintContent()">打印</el-button>
    </div>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import print from "print-js";


export default {
  name: "ProofPrint",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      formData: {
        gmtype: '33',
        gmnatu: '',
        employ: '',
        sailam: '',
        totlam: '',
        zypzbh: '',
        name: '',
      },
      rules: {
        type: [{
          required: true,
          message: '该项为必填项'
        }],
        peculiarity: [{
          required: true,
          message: '该项为必填项'
        }],
        number: [{
          required: true,
          message: '该项为必填项'
        }],
        totalAssets: [{
          required: true,
          message: '该项为必填项'
        }]
      }
    };
  },
  mounted() {

  },
  created() {
    this.getFormData(); // 初始化申请人影像信息
  },
  methods: {
    handlePrintContent(btn) {
      print({ printable: 'printJS-form',
        type: 'html',
        ignoreElements:  ["footer-submit"],
        header: '贷款还款专用凭证',
        css: '',
        headerStyle: 'text-align:center;color:#f00;width:100%;',
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid;} .table-page{width: 100%;} @page {margin:0 10mm};' // 表格样式
      });
    }
  }
}
</script>
<style scoped>
table,table tr th, table tr td { border:1px solid ; }
table { line-height: 25px;text-align: left;  border-collapse: collapse;}
.table-box {
  border: 1px solid;
}
.table-page{
  width: 100%;
}
.footer-submit {
  text-align: center;
}
</style>
