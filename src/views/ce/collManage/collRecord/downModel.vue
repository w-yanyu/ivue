<template>
  <div>
        <el-button size="small" type="success" @click="downloadFile">模板导出</el-button>
  </div>
</template>


<script>
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "downModel",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
      return{
        tableData: [], //表格数据
        isShowPage:false,
        downloadForm:{
          branch_id:"",
          produce_status:"",
          applid: "",
          oa_org_name: "",
          trustMonth: "",
        },
        currentPage: 1,
        tableTotal: 10,
        produceDict:[],  //账户形态字典
        tableSize: 10,
        secondBranchList:[],
      }
    },
    created() {
    },
    methods: {

      downloadFile() {
        let reqMap = {
          type: "CJDR",
          servicecode: "PLMSKGTS0081",
          start: 1,
          length: 10,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            let fileString = res.data[0].filebase64;
            let URL = this.dataUrlToBlob(fileString, 'xls');
            var a = document.createElement("a");
            a.download = '催记数据导入模板.xls';
            a.style.display = "none";
            a.href = window.URL.createObjectURL(URL);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }).catch(err => {
          console.error(err);
        });},
      dataUrlToBlob(data, prefix) {
        var bstr = window.atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: prefix });
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
    .container-content--toolbar{
      padding: 10px;
    }
    .container-content--pagination{
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
</style>
