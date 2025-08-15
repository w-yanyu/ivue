<template>
    <div>
        <el-collapse v-model="activeNames" class="custom-common--collapse">
            <el-collapse-item name="1">
                <template slot="title">
                <span>
                    <em></em>债务重组申请信息
                </span>
                </template>
                <el-form ref="debtRebuildForm" :model="debtRebuildForm" label-width="160px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="债务重组申请编号">
                                <el-button type="success" @click="searchInfo" icon="el-icon-search">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="申请编号" prop="applid">
                                <el-input v-model="debtRebuildForm.applid" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="额度编号" prop="crdlno">
                                <el-input v-model="debtRebuildForm.crdlno" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证号" prop="idtfno">
                                <el-input v-model="debtRebuildForm.idtfno" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号码" prop="phonno">
                                <el-input v-model="debtRebuildForm.phonno" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户姓名" prop="acctna">
                                <el-input v-model="debtRebuildForm.acctna" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品名称" prop="prodna">
                                <el-input v-model="debtRebuildForm.prodna" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账户状态" prop="acctst">
                                <el-select v-model="debtRebuildForm.acctst" :disabled="true" placeholder>
                                <el-option
                                    v-for="(item, i) in acctstList"
                                    :key="i"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账户贷款状态" prop="clssst">
                                <el-select v-model="debtRebuildForm.clssst" :disabled="true" placeholder>
                                <el-option
                                    v-for="(item, i) in clssstList"
                                    :key="i"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="借记卡号" prop="rpacno">
                                <el-input v-model="debtRebuildForm.rpacno" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="贷款余额" prop="lnreamt">
                                <el-input v-model="debtRebuildForm.lnreamt" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="逾期状态" prop="overst">
                                <el-select v-model="debtRebuildForm.overst" :disabled="true" placeholder>
                                <el-option
                                    v-for="(item, i) in yesnoList"
                                    :key="i"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="减免调整" prop="reduce">
                                <el-input v-model="debtRebuildForm.reduce" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="欠款金额" prop="reovam">
                                <el-input v-model="debtRebuildForm.reovam" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                <span>
                    <em></em>债务重组开户信息
                </span>
                </template>
                <el-form ref="debtReOpenForm" :model="debtReOpenForm" label-width="100px" class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="批准额度" prop="resprincipal">
                                <el-input v-model="debtReOpenForm.resprincipal" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="分期期数" prop="instalment">
                                <el-input v-model="debtReOpenForm.instalment" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="利率" prop="debtrate">
                                <el-input v-model="debtReOpenForm.debtrate" disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="附件" prop="file">
                                <upload-file ref="fileProp" :uploadFileList="debtReOpenForm.file" :uploadDisabled="false" @changeFile="fileChange" :key="timer"></upload-file>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="备注" prop="remark" >
                                <el-input type="textarea" v-model="debtReOpenForm.remark" autosize="true" maxlength="200"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <div class="custom-common--footer">
            <el-button type="primary" size="small" @click="submit" :disabled="sfPressbut">提交</el-button>
            <el-button type="primary" size="small" @click="cancel" :disabled="sfPresscanl">取消</el-button>
        </div>
        <el-dialog title="债务重组申请单" :visible.sync="modelVisible" :show-close="true" width="1200px">
            <div class="el-dialog-dev">
                <div class="container-content--search">
                    <el-form :model="rebuildForm" ref="rebuildForm" label-width="130px" class="custom-common--form">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="额度编号" prop="crdlno">
                                    <el-input v-model="rebuildForm.crdlno" class="input"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="证件号码" prop="idtfno">
                                    <el-input v-model="rebuildForm.idtfno" class="input"></el-input>
                                </el-form-item>
                            </el-col> 
                            <el-col :span="6">
                                <el-form-item label="提交开始时间" prop="applyDateS">
                                    <el-date-picker
                                        clearable
                                        v-model="rebuildForm.applyDateS"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptionsS">
                                    </el-date-picker> 
                                </el-form-item>
                            </el-col>                    
                            <el-col :span="6">
                                <el-form-item label="提交结束时间" prop="applyDateE">
                                    <el-date-picker
                                        clearable
                                        v-model="rebuildForm.applyDateE"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期"
                                        :picker-options="pickerOptionsE">
                                    </el-date-picker> 
                                </el-form-item>
                            </el-col>                    
                        </el-row>
                        <el-row class="button-footer">
                            <el-col :span="24">
                                <el-button type="primary" @click="search()">查询</el-button>
                                <el-button @click="reset">重置</el-button>
                            </el-col>
                        </el-row>   
                    </el-form>
                </div>
                <div class="container-centent--table">
                    <el-table ref="caseTable" :data="caseTable" :border="true" style="width:98%">
                        <el-table-column label="债务重组申请编号" prop="applid" align="center">
                        </el-table-column>
                        <el-table-column label="额度编号" prop="crdlno" align="center">
                        </el-table-column>
                        <el-table-column label="证件号码" prop="idtfno" align="center">
                        </el-table-column>
                        <el-table-column label="提交时间" prop="completedt" align="center" :formatter="formatDate">
                        </el-table-column>
                        <el-table-column label="账户状态" prop="acctst" align="center" :formatter="formatAcctstData">
                        </el-table-column>
                        <el-table-column label="调减金额" prop="redtotal" align="center" >
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="100px">
                            <template slot-scope="scope">
                                <el-button type="text"  @click="choose(scope.row)">选择</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="container-content--pagination">
                    <el-pagination v-if="caseTable.length>0"
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
        </el-dialog>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
//import UploadFile from "@/views/pl/components/UploadFile.vue";
export default {
    name:"debtRebuildOa",
    components: {
     // UploadFile,
    },
    data(){
        return{
            activeNames: ["1", "2"],
            debtRebuildForm:{
                applid : "", //申请编号
                crdlno : "", //额度编号
                idtfno : "", //身份证号
                phonno : "", //手机号码
                acctna : "", //客户姓名
                prodna : "", //产品名称
                acctst : "", //账户状态
                clssst : "", //账户贷款状态
                rpacno : "", //借记卡号
                lnreamt: "", //贷款余额
                overst : "", //逾期状态
                reduce : "", //减免调整
                reovam: "", //欠款金额
            },
            debtReOpenForm:{
                resprincipal: "",   //批准额度
                instalment  : "",   //分期期数
                debtrate    : "",   //利率
                file        : [],   //附件
                remark      : "",   //备注
            },
            rebuildForm:{
                crdlno   : "",   //额度编号
                idtfno   : "",   //身份证号
                applyDateS: "",   //提交时间开始
                applyDateE: "",   //提交时间结束
            },
            pickerOptionsS:{
                disabledDate:(time) => {
                    if (!this.rebuildForm.applyDateE) { return false };
                    return time.getTime() > new Date(this.rebuildForm.applyDateE.replace(/-/g,'/')).getTime()
                }
            },
            pickerOptionsE:{
                disabledDate:(time) => {
                    if (!this.rebuildForm.applyDateS) { return false};
                    return time.getTime() < new Date(this.rebuildForm.applyDateS.replace(/-/g,'/')).getTime()
                }
            },
            caseTable   : [],      //债务重组申请单数据
            modelVisible: false,   //弹框是否显示
            clssstList  : [],      //账户贷款状态字典
            acctstList  : [],      //账户状态字典
            yesnoList   : [],      //是否字典
            currentPage : 1,
            tableTotal  : 10,
            tableSize   : 10,
            sfPressbut : true,
            sfPresscanl : true,
        }
    },
    watch:{
        modelVisible: function(){
            if (this.$refs.rebuildForm != undefined){
                this.$refs.rebuildForm.resetFields();
            }
        }
    },
    created(){
        this.getDictList("E_YES___", "yesnoList"); //是否
        this.getDictList("E_CLSSST","clssstList"); //账户贷款状态
        this.getDictList("E_ACCTST", "acctstList"); //账户状态
    },
    methods:{
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
         * 债务重组申请单查询条件重置
         */
        reset(){
            this.$refs.rebuildForm.resetFields();
        },
        /**
         * 展开债务重组申请单查询弹框
         */
        searchInfo(){
            this.modelVisible = true;
        },
        /**
         * 选择债务重组申请单
         */
        choose(row){
            console.log(row);
            this.$refs.debtRebuildForm.resetFields(); //清空债务重组申请信息
            this.debtRebuildForm.applid = row.applid; //申请编号
            this.debtRebuildForm.crdlno = row.crdlno; //额度编号
            this.debtRebuildForm.idtfno = row.idtfno; //身份证号
            this.debtRebuildForm.phonno = row.phonno; //手机号码
            this.debtRebuildForm.acctna = row.acctna; //客户姓名
            this.debtRebuildForm.prodna = row.prodna; //产品名称
            this.debtRebuildForm.acctst = row.acctst; //账户状态
            this.debtRebuildForm.clssst = row.clssst; //账户贷款状态
            this.debtRebuildForm.rpacno = row.rpacno; //借记卡号
            this.debtRebuildForm.lnreamt = row.lnreamt; //贷款余额
            this.debtRebuildForm.reovam = row.reovam; //欠款金额
            this.debtRebuildForm.overst = row.overst; //逾期状态
            //减免调整
            if(parseFloat(row.redtotal) > 0){
                this.debtRebuildForm.reduce = "明确减免金额"
            }else{
                this.debtRebuildForm.reduce = "不调整"
            };
            this.debtReOpenForm.resprincipal = row.appAmount; //批准额度
            this.debtReOpenForm.instalment = row.instaltnr; //分期期数
            if(row.intrate.indexOf('.') > 0){
                this.debtReOpenForm.debtrate = row.intrate.slice(0,row.intrate.indexOf('.') + 4); //利率
            }else{
                this.debtReOpenForm.debtrate = row.intrate; //利率
            }
            this.sfPressbut = false; //禁用提交按钮
            this.sfPresscanl = false; // 禁用取消按钮
            this.modelVisible = false;  //关闭弹框
        },
        /**
         * 查询债务重组申请单信息
         */
        search(){
            this.currentPage = 1;
            this.getTableData();
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
        /**
         * 获取债务重组申请单信息
         */
        getTableData(){
            let params = {
                crdlno : this.rebuildForm.crdlno,
                idtfno : this.rebuildForm.idtfno,
                startdate : this.rebuildForm.applyDateS.replace(/-/g,""),
                enddate : this.rebuildForm.applyDateE.replace(/-/g,""),
                servicecode : "PLMSKGTS0893",
                start: this.currentPage,
                length: this.tableSize,
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
                if (res && res.code === "200" && res.data){
                    this.caseTable = [];
                    res.data.forEach(item =>{
                        this.caseTable.push(item);
                    })
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                }
            })
            .catch(err => {
                console.error(err);
            });
        },
        /**
         * 提交开户申请
         */
        submit(){
            this.sfPressbut = true; //禁用提交按钮
            this.sfPresscanl = true; // 禁用取消按钮
            let params = {
                reapply_no : this.debtRebuildForm.applid,
                debt_crldno : this.debtRebuildForm.crdlno,
                fileList: this.debtReOpenForm.file,
                remark : this.debtReOpenForm.remark,
                servicecode : "PLMSKGTS0890",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
                if (res && res.code === "200"){
                    this.$msg({message: "提交成功",type: "success"});
                    this.sfPressbut = true; //禁用提交按钮
                    this.sfPresscanl = true; // 禁用取消按钮
                }
            })
            .catch(err => {
                this.sfPressbut = false; //禁用提交按钮
                this.sfPresscanl = false; // 禁用取消按钮
                console.error(err);
            });
        },
        /**
         * 取消申请
         */
        cancel(){
            this.$refs.debtRebuildForm.resetFields();
            this.$refs.debtReOpenForm.resetFields();
            this.$refs.fileProp.clearFileList();
        },
        /**
         * 添加文件回调
         * @param file 当前添加文件对象
         * @param fileList 已添加文件
         */
        fileChange(val){
            this.debtReOpenForm.file= val;
        },
        /**
         * 贷款形态枚举值转中文名
         */
        formatAcctstData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.acctstList.forEach(function(item, index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        /**
         * 日期格式化
         */
        formatDate(row,column){
            let data = row[column.property];
            let formatDate = row[column.property];
            if(data.length == '8'){
                formatDate= data.substr(0,4) + '-' + data.substr(4,2) + '-' + data.substr(6,2)
            }
            return formatDate;
        },
    },
}
</script>
<style lang="less" scoped>
.el-dialog-dev{
    max-height:100vh;
    overflow:auto;
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--footer {
        margin-top: 10px;
        padding: 16px 40px 0 12px;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }  
    .container-centent--table {
        margin-top: 10px;
    } 
} 
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
.selectButton{
    padding: 10px 0;
}
</style>