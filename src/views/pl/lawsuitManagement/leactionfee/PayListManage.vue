<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="payListSelForm" ref="payListSelForm" :rules="payListSelRules" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="区域中心" prop="area_no">
                                <el-select v-model="payListSelForm.area_no" placeholder="请选择区域中心" >
                                    <el-option
                                    v-for="(item, index) in branchList"
                                    :key="index"
                                    :label="item.branchNo+'-'+item.brachName"
                                    :value="item.branchNo"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财务经办确认日期" prop="hand_post_date">
                                <el-date-picker style="width:382px" v-model="payListSelForm.hand_post_date" value-format="yyyyMMdd" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="借据号" prop="lncfno">
                                <el-input v-model="payListSelForm.lncfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户姓名" prop="cust_nm">
                                <el-input v-model="payListSelForm.cust_nm" class="input"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="8">
                            <el-form-item label="收款人姓名" prop="rece_acc_name">
                                <el-input v-model="payListSelForm.rece_acc_name" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="支付状态" prop="pay_status">
                                <el-select v-model="payListSelForm.pay_status" placeholder="-请选择-" clearable>
                                    <el-option
                                    v-for="(item, index) in payStatusList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="缴费类型" prop="pay_type">
                                <el-select v-model="payListSelForm.pay_type" placeholder="-请选择-" clearable>
                                    <el-option
                                    v-for="(item, index) in payTypeList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="button-footer">
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                            <el-button type="primary" @click="search()">查询</el-button>
                            <el-button type="primary" size="small" @click="downloadFile" plain class="export-button-style">
                                <i class="iconfont icon-daochu"></i>导出
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row style="text-align:left;color:red">
                        <span>* 只可导出待支付状态下的打款清单且不支持重复导出，请妥善保存打款清单！</span>
                    </el-row>
                </el-form>
            </div>
            <div class="container-content--footer">
                <el-button type="primary" size="small" @click="paySuccess">支付成功标记</el-button>
                <el-button type="primary" size="small" @click="payFail">支付失败标记</el-button>
            </div>
            <div class="container-content--table">
                <el-table ref="tableData" row-key="appl_id" :data="tableData" :border="true" style="width: 98%;"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :reserve-selection="true" v-model="multipleSelection" :selectable="selectable"></el-table-column>
                    <el-table-column label="申请流水号" v-if="false" prop="appl_id">
                    </el-table-column>
                    <el-table-column label="缴费类型"  prop="pay_type" align="center" width="100px" show-overflow-tooltip :formatter="formatPayTypeData">
                    </el-table-column>
                    <el-table-column label="区域中心"  prop="area_name" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="财务经办确认日期"  prop="hand_post_date" align="center" width="150px" :formatter="dateFormatymd">
                    </el-table-column>
                    <el-table-column label="借据号" prop="lncfno" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="额度编号" prop="crdlno" align="center" width="150px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="客户姓名" prop="cust_nm" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="付款人姓名" prop="pay_name" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="付款人账号" prop="pay_account_name" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="收款人姓名" prop="rece_acc_name" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="收款银行名称" prop="bank_name" align="center" width="100px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="收款银行行号" prop="bank_no" align="center" width="150px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="收款人账号" prop="rece_accno" align="center" width="150px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="打款金额" prop="pay_amount" align="center" width="150px  " show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="支付状态" prop="pay_status" align="center" width="100px" show-overflow-tooltip :formatter="formatPayStautsData">
                    </el-table-column>
                    <el-table-column label="财务复核确认人" prop="check_post_name" align="center" width="150px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="财务复核确认时间" prop="check_post_date" align="center" width="150px" show-overflow-tooltip :formatter="dateFormat">
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination v-if="tableData.length>0"
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10,15,20]"
                :page-size="tableSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal">
                </el-pagination>
            </div>
        </div>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "PayListManage",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            tableData: [], //缴费清单列表数据
            multipleSelection:[],//缴费清单列表选取list
            branchList:[], //区域中心List
            payStatusList:[], //支付状态List
            payTypeList:[], //缴费类型list
            payListSelForm:{
                area_no:"",  //区域中心
                hand_post_date:"", //财务经办确认日期
                lncfno:"", //借据号
                cust_nm:"", //客户姓名
                rece_acc_name:"", //收款人姓名
                pay_status:"", //支付状态
            },
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
            payListSelRules : {
                pay_type: [{required: true, message: "请选择缴费类型"}],
            },
        }
    },
    created() {
        this.getDictList("E_PAY_STATUS","payStatusList");
        this.getDictList("E_PAY_TYPE","payTypeList");
        this.getBranch();
    },
    methods: {
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
        getBranch(){
            let reqMap = {
                servicecode: "RLMSPLTS1068", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.branchList = res.data;
                    if(this.branchList.length==1){
                        this.payListSelForm.area_no =  this.branchList[0].branchNo;
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        },

       /**
       * 获取字典名称
       */
        getDictName(dictId,dictList){
            let dictType = {};
            dictType = dictList.find(item=>{return item.dictId===dictId;})
            return dictType.dictName;
        },
         /**
        * 分页sizeChange 回调
        */
        sizeChange(val) {
            this.tableSize = val;
            this.getTableData();
        },
        /**
        * 分页currentChange回调
        */
        currentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        reset() {
            this.$refs.payListSelForm.resetFields();
            if(this.branchList.length==1){
                this.payListSelForm.area_no =  this.branchList[0].branchNo;
            }
        },
        /**
         * 机构信息查询
         */
        search(){
            this.$refs.payListSelForm.validate(valid => {
                if (valid) {
                    this.multipleSelection = [];
                    this.$refs.tableData.clearSelection();
                    this.currentPage = 1;
                    this.getTableData();
                }
            });
        },
        /**
        * 获取列表数据
        */
        getTableData() {
             let reqMap = {
                area_no: this.payListSelForm.area_no,
                start_hand_post_date:this.payListSelForm.hand_post_date[0],
                end_hand_post_date:this.payListSelForm.hand_post_date[1],
                lncfno: this.payListSelForm.lncfno,
                cust_nm: this.payListSelForm.cust_nm,
                rece_acc_name: this.payListSelForm.rece_acc_name,
                pay_status: this.payListSelForm.pay_status,
                pay_type: this.payListSelForm.pay_type,
                servicecode: "RLMSPLTS1326",
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.tableData = [];
                    res.data.forEach(item =>{
                        this.tableData.push(item);
                    });
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 勾选的数据list
         */
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        /**
         * 日期格式化
         */
        dateFormat(row,column){
            var date = row[column.property];
            if(date == ""){
                return ""
            }else{
                var year = date.substring(0,4);
                var month = date.substring(4,6);
                var day = date.substring(6,8);
                var hour = date.substring(8,10);
                var minutes = date.substring(10,12);
                var seconds = date.substring(12,14);
                return (year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
            }
        },
        /**
         * 日期格式化
         */
        dateFormatymd(row,column){
            var date = row[column.property];
            if(date == ""){
                return ""
            }else{
                var year = date.substring(0,4);
                var month = date.substring(4,6);
                var day = date.substring(6,8);
                return (year + "-" + month + "-" + day);
            }
        },
        /**
         * 缴费类型
         */
        formatPayTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.payTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 支付状态
         */
        formatPayStautsData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.payStatusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 只可勾选支付中及支付成功状态下的缴费记录
         */
        selectable(row,index){
            if(row.pay_status == '1' || row.pay_status == '2'){
                return true;
            }else{
                return false;
            }
        },
        /**
         * 导出数据到表格
         */
        downloadFile() {
            this.$refs.payListSelForm.validate(valid => {
                if (valid) {
                    let that = this;
                    let reqMap = {
                        area_no: this.payListSelForm.area_no,
                        start_hand_post_date:this.payListSelForm.hand_post_date[0],
                        end_hand_post_date:this.payListSelForm.hand_post_date[1],
                        lncfno: this.payListSelForm.lncfno,
                        cust_nm: this.payListSelForm.cust_nm,
                        rece_acc_name: this.payListSelForm.rece_acc_name,
                        pay_status: "0", //默认导出待支付状态数据
                        pay_type: this.payListSelForm.pay_type,
                        servicecode: "RLMSPLTS1327",
                    }
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                        let URL = that.dataUrlToBlob(res.data.downloadUrl);
                        var reader = new FileReader();
                        reader.readAsDataURL(URL);
                        reader.onload = function (e) {
                            const a = document.createElement('a');
                            if(reqMap.servicecode==="RLMSPLTS1327"){
                                a.download = '缴费清单一览表.xlsx';
                            }
                            
                            a.href = e.target.result;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a)
                        }
                        reader.onloadend=function(e){
                            that.$dialog.close();
                        }
                        this.getTableData();
                    });
                }
            })
        },
        dataUrlToBlob(data){
            var bstr = atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: 'xlsx' });
        },
        /**
         * 支付成功标记
         */
        paySuccess(){
            let userCode = JSON.parse(localStorage.getItem("user_info")).userCode;
            if(this.multipleSelection.length === 0){
                this.$message({message:'请至少勾选一项，再进行操作',type:'warning'})
            }else{
                this.$confirm("确认将勾选缴费记录的支付状态置为支付成功", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                    const date = new Date();
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    let d = date.getDate();
                    let hh = date.getHours();
                    let mm = date.getMinutes();
                    let ss = date.getSeconds();
                    m = m < 10 ? '0' + m : m;
                    d = d < 10 ? '0' + d : d;
                    hh = hh < 10 ? '0' + hh : hh;
                    mm = mm < 10 ? '0' + mm : mm;
                    ss = ss < 10 ? '0' + ss : ss;
                    let result = '';
                    result = `${y}${m}${d}${hh}${mm}${ss}`;
                    let arrayLen = this.multipleSelection.length;
                    let reqMap = {
                        plhDefaultPayModify: [],
                        servicecode: "RLMSPLTS1328",
                    };
                    for (var i=0; i<arrayLen; i++){
                        if(this.multipleSelection[i].pay_status == '2'){
                            this.$message({message:'勾选缴费清单中存在支付成功记录,不可重复标识,请重新勾选',type:'warning'});
                            return;
                        }
                        let params = {
                           appl_id :this.multipleSelection[i].appl_id,
                           check_post_name: userCode,
                           check_post_date :result,
                           last_pay_status :this.multipleSelection[i].pay_status,
                           pay_type :this.multipleSelection[i].pay_type,
                           new_pay_status :'2'
                        }
                        reqMap.plhDefaultPayModify.push(params);
                    };
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                        if (res && res.code === "200") {
                            this.multipleSelection = [];
                            this.$refs.tableData.clearSelection();
                            this.getTableData();
                            this.$message({type: "success", message: res.message});
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                })
            }
        },
        /**
         * 支付失败标记
         */
        payFail(){
            let userCode = JSON.parse(localStorage.getItem("user_info")).userCode;
            if(this.multipleSelection.length === 0){
                this.$message({message:'请至少勾选一项，再进行操作',type:'warning'})
            }else{
                this.$confirm("确认将勾选缴费记录的支付状态置为支付失败", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
                }).then(() => {
                    const date = new Date();
                    let y = date.getFullYear();
                    let m = date.getMonth() + 1;
                    let d = date.getDate();
                    let hh = date.getHours();
                    let mm = date.getMinutes();
                    let ss = date.getSeconds();
                    m = m < 10 ? '0' + m : m;
                    d = d < 10 ? '0' + d : d;
                    hh = hh < 10 ? '0' + hh : hh;
                    mm = mm < 10 ? '0' + mm : mm;
                    ss = ss < 10 ? '0' + ss : ss;
                    let result = '';
                    result = `${y}${m}${d}${hh}${mm}${ss}`;
                    let arrayLen = this.multipleSelection.length;
                    let reqMap = {
                        plhDefaultPayModify: [],
                        servicecode: "RLMSPLTS1328",
                    };
                    for (var i=0; i<arrayLen; i++){
                        let params = {
                           appl_id :this.multipleSelection[i].appl_id,
                           check_post_name: userCode,
                           check_post_date :result,
                           last_pay_status :this.multipleSelection[i].pay_status,
                           pay_type :this.multipleSelection[i].pay_type,
                           new_pay_status :'3'
                        }
                        reqMap.plhDefaultPayModify.push(params);
                    };
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                        if (res && res.code === "200") {
                            this.multipleSelection = [];
                            this.$refs.tableData.clearSelection();
                            this.getTableData();
                            this.$message({type: "success", message: res.message});
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                })
            }
        },
    }
}
</script>


<style lang="less" scoped>
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }
    .container-content--table {
        margin-top: 10px;
    }
    .container-content--footer {
        margin-top: 10px;
        padding: 1px 10px;
    }
}
.button-footer {
  text-align: center;
}
.export-button-style {
  background: #6ac044 !important;
  border-color: #6ac044 !important;
}
</style>