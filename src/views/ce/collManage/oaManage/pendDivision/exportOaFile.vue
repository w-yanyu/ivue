<template>
    <div style="text-align: center;width:100%;padding-top:10%;">
        <span>{{$i18ns('下载')}}中,请稍后。。。</span>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "exportOaFile",
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
        this.downloadFile();
    },
    methods: {
       
        downloadFile() {
            let that = this;
            let reqMap = {
                servicecode: that.cParentParams.servicecode,
                regional_center: that.cParentParams.regional_center,
                prodcd: that.cParentParams.prodcd,
                function_cd: that.cParentParams.function_cd,
                lncf_no: that.cParentParams.lncf_no,
                cust_nm: that.cParentParams.cust_nm,
                cert_id: that.cParentParams.cert_id
            }
            if(reqMap.servicecode==="RLMSPLTS1071"){
                reqMap.oa_org_id = that.cParentParams.oa_org_id;
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = that.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    if(reqMap.servicecode==="RLMSPLTS1070"){
                        a.download = '待分案数据.xlsx';
                    }else{
                        a.download = '待委案数据.xlsx';
                    }
                    
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a)
                }
                reader.onloadend=function(e){
                    that.$dialog.close();
                }
                
            });
        },
        dataUrlToBlob(data){
            var bstr = atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: 'xlsx' });
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
