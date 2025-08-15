<template>
 <div class='all_div'>
   <div class='title'><span class="bl"></span><span class='span-title'>{{$i18ns('T302.Limit-Change-Hist')}}</span></div>
    <div class="table_wh">
    <to-json toUrl="/views/uccp/quotaManager/quotaVeiw/components/LimitHistory/change_hist_list.json" :params="this.params">
        </to-json>
        </div>
 </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
  export default {
    name: "PreHistInfo",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
        //客户编号
        customeNo: {
            type: String,
            require: true
        },
        //客户名称
        customeName: {
            type: String,
            require: true
        },
        
    },
    data() {
      return {
        preTableData: [],
        occpTableData: [],
        system_List: [], // 来源系统
        occup_List: [], // 占用状态
        ccy_List: [], // 业务币种
        params: {
                cust_no:'',
            },
      }
    },
    created() {
        console.log("this.customeN", this.customeName);
        this.params.cust_no = this.customeNo;
        this.params.cust_name = this.customeName;
    },
    mounted() {
    },
    methods: {
        init() {
            this.getDictList("UCCP_E_SOURCE_SYSTEM", "system_List");
            this.getDictList("UCCP_E_PRECCUP_STATUS", "occup_List");
            this.getDictList("MS_CURRENCY", "ccy_List");
        },
        /**
        * 获取字典
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
        * 获取字典source_system对应的label
        */
        getSystemLabel(row, column) {
            let tempValue = row.source_system;
            for (const item of this.system_List) {
                if (tempValue === item.dictId) {
                    tempValue = item.dictName;
                    break;
                }
            }
            return tempValue;
        },
        /**
        * 获取字典ccup_status对应的label
        */
        getCcupLabel(row, column) {
            let tempValue = row.occup_status;
            if(!tempValue){
                tempValue = row.preccup_status;
            }
            console.log("this.occup_List="+this.occup_List);
            for (const item of this.occup_List) {
                if (tempValue === item.dictId) {
                    tempValue = item.dictName;
                    break;
                }
            }
            return tempValue;
        },
        /**
        * 获取字典base_ccy_code对应的label
        */
        getCcyLabel(row, column) {
            let tempValue = row.base_ccy_code;
            for (const item of this.ccy_List) {
                if (tempValue === item.dictId) {
                    tempValue = item.dictName;
                    break;
                }
            }
            return tempValue;
        },
        //请求额度树数据 UR00000000012905
        getPredata() {
            let init_url = "/SUMP/call/RPCCall";
            let init_req = {
                servicecode: "uccp3019",
                cust_no: this.customeNo,
            };

            this.$http.invokeAPI(init_url, "post", init_req).then(response => {
                if (response.code === "200") {
                console.log("getPredata", response.data);
                this.preTableData = response.data;
                } else {
                MyMessage({ message: response.message, type: "error" });
                }
                });
        },

        //请求额度树数据 UR00000000012905
        getOccupdata() {
            let init_url = "/SUMP/call/RPCCall";
            let init_req = {
                servicecode: "uccp3020",
                cust_no: this.customeNo,
            };

            this.$http.invokeAPI(init_url, "post", init_req).then(response => {
                if (response.code === "200") {
                console.log("getOccupdata", response.data);
                this.occpTableData = response.data;
                } else {
                MyMessage({ message: response.message, type: "error" });
                }
                });
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总和';
                    return;
                }
                if (index === 8 || index === 9) {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] = sums[index].toFixed(2)
                        sums[index] += ' 元';
                    } else {
                        sums[index] = 'N/A';
                    } 
                }
                
            });

            return sums;
        },
    }
  }
</script>
<style lang="less" scoped>
 
    .title{
       
        text-align:left;
        
        margin-top: 20px;
    }
    .span-title{
        font-size: 20px;
        font-weight: bold;
        color: #697b8c;
        border-bottom: 1px solid #dcdfe6;
        margin-left:15px;
        margin-bottom:10px;
        padding-bottom:10px;
    }
    /deep/.el-table .el-table__footer-wrapper .cell {
        color:red;
    }
    .table_wh{
        width:100%
    }
    .jine{
        color:red;
        align:right;
        text-align:right;
    }
    

    

</style>