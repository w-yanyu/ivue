<template>
    <div>
        <el-collapse v-model="activeNames" class="custom-common--collapse">
            <el-collapse-item name="1">
                <template slot="title">
                    <span>
                        <em></em>基本信息
                    </span>
                </template>
                <el-form ref="basicForm" :model="basicForm" label-width="160px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="贷款合同编号" prop="ctrct_num">
                                <el-input v-model="basicForm.ctrct_num" @blur="InitialWhenBlur"
                                    @keyup.enter.native="InitialWhenBlur"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户名称" prop="cust_name">
                                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户号" prop="cust_no">
                                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="cert_no">
                                <el-input v-model="basicForm.cert_no" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号码" prop="mobile_no">
                                <el-input v-model="basicForm.mobile_no" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品名称" prop="prod_name">
                                <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品代码" prop="prod_no">
                                <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <span>
                        <em></em>欠款信息
                    </span>
                </template>
                <el-form ref="debtInfoForm" :model="debtInfoForm" label-width="160px" class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="贷款账号" prop="loan_acct_num">
                                <el-input v-model="debtInfoForm.loan_acct_num" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="逾期金额" prop="ovdue_amt">
                                <el-input v-model="debtInfoForm.ovdue_amt" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="欠款本金" prop="sumpbl">
                                <el-input v-model="debtInfoForm.sumpbl" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="逾期天数" prop="ovdays">
                                <el-input v-model="debtInfoForm.ovdays" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="正常本金" prop="lnnpbl">
                                <el-input v-model="debtInfoForm.lnnpbl" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="逾期本金" prop="lnopbl">
                                <el-input v-model="debtInfoForm.lnopbl" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="呆滞本金" prop="stgnt_prcpl">
                                <el-input v-model="debtInfoForm.stgnt_prcpl" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="核销本金" prop="write_off_princi">
                                <el-input v-model="debtInfoForm.write_off_princi" :disabled="true"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="正常利息" prop="accrued_inst">
                                <el-input v-model="debtInfoForm.accrued_inst" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="逾期利息" prop="debtin">
                                <el-input v-model="debtInfoForm.debtin" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="逾期违约金" prop="rcvbl_fine">
                                <el-input v-model="debtInfoForm.rcvbl_fine" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="呆账本金" prop="ucoltb_prcpl">
                                <el-input v-model="debtInfoForm.ucoltb_prcpl" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="贷款余额" prop="lnreamt">
                                <el-input v-model="debtInfoForm.lnreamt" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="开户行名称" prop="atbkna">
                                <el-input v-model="debtInfoForm.atbkna" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="银行卡号" prop="rpacno">
                                <el-input v-model="debtInfoForm.rpacno" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="最后还款日" prop="lareda">
                                <el-input v-model="debtInfoForm.lareda" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <span>
                        <em></em>借据列表
                    </span>
                </template>
                <el-table :data="tableDataReceipt">
                    <el-table-column label="借据号" width="200px" align="center" prop="loan_due_bill_num"></el-table-column>
                    <!-- <el-table-column label="逾期天数" align="center" prop="ovdays"></el-table-column> -->
                    <!-- <el-table-column label="是否延期中" align="center" prop="isdupo" :formatter="dupoFormat"></el-table-column> -->
                    <el-table-column label="贷款形态" align="center" prop="loan_form" :formatter="dataFormat"></el-table-column>
                    <el-table-column label="欠款金额" align="center" prop="sumamt"></el-table-column>
                    <el-table-column label="欠款本金" align="center" prop="sumpbl"></el-table-column>
                    <el-table-column label="逾期利息" align="center" prop="rcvbl_acd_pnly_int"></el-table-column>
                    <el-table-column label="逾期违约金" align="center" prop="rcvbl_fine"></el-table-column>
                    <!-- <el-table-column label="当期应还款金额" align="center" prop="curram"></el-table-column> -->
                    <!-- <el-table-column label="当期应还款日期" align="center" prop="next_rpymt_dt"></el-table-column> -->
                    <!-- <el-table-column label="优惠金额" align="center" prop="freeAmount"></el-table-column> -->
                    <el-table-column label="正常利息" align="center" prop="rcvbl_acd_int"></el-table-column>
                    <el-table-column label="贷款余额" align="center" prop="lnreamt"></el-table-column>
                    <el-table-column label="初始贷款期限" align="center" prop="loan_matu"></el-table-column>
                    <el-table-column label="利率" align="center" prop="nrl_int_rate"></el-table-column>
                </el-table>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <span>
                        <em></em>减免信息
                    </span>
                </template>
                <el-form ref="reduceForm" :model="reduceForm" :rules="reduceRules" label-width="140px"
                    class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item class="require-asterisk" label="是否减免息费" prop="isreduction">
                                <el-select v-model="reduceForm.isreduction">
                                    <el-option v-for="(item, i) in yesnoList" :key="i" :label="item.dictName"
                                        :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="reduceForm.isreduction == '1'">
                            <el-form-item class="require-asterisk" label="申请调整原因" prop="adjrs">
                                <el-select v-model="reduceForm.adjrs" multiple collapse-tags>
                                    <el-option v-for="(item, i) in adjrsList" :key="i" :label="item.dictName"
                                        :value="item.dictId"
                                        :disabled="(reduceForm.adjrs && reduceForm.adjrs.indexOf('0') > -1 && item.dictId == '1') ||
                                            (reduceForm.adjrs && reduceForm.adjrs.indexOf('1') > -1 && item.dictId == '0')"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="reduceForm.isreduction == '1'">
                            <el-form-item class="require-asterisk" label="申请调整类型" prop="adjty">
                                <el-select v-model="reduceForm.adjty" :disabled="true">
                                    <el-option v-for="(item, i) in appltypeList" :key="i" :label="item.dictName"
                                        :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="reduceForm.isreduction == '1'">
                            <el-form-item class="require-asterisk" label="减免金额" prop="reduceAmt">
                                <el-input v-model.trim="reduceForm.reduceAmt"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="reduceForm.isreduction == '1'">
                        <el-col :span="6">
                            <el-form-item label="减免滞纳费" prop="redcznf">
                                <el-input v-model="reduceForm.redcznf" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="减免利息" prop="redcni">
                                <el-input v-model="reduceForm.redcni" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-form-item label="减免当期利息" prop="rednni">
                                <el-input v-model="reduceForm.rednni" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    <el-row v-if="reduceForm.isreduction == '1'">
                        <el-col :span="8">
                            <el-form-item label="减免附件" prop="reduceFile">
                                <upload-file ref="reduceFileProp" :uploadFileList="reduceForm.file" :uploadDisabled="false"
                                    @changeFile="reduceFileChange" :key="timer"></upload-file>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <span>
                        <em></em>申请信息
                    </span>
                </template>
                <el-form ref="applyForm" :model="applyForm" :rules="applyRules" label-width="140px"
                    class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="债务重组方式" prop="debtRestructure">
                                <el-select v-model="applyForm.debtRestructure">
                                    <el-option v-for="(item, index) in debtRestructureList" :key="index"
                                        :label="item.dictName" :value="item.dictId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="还款方式" prop="schdtp">
                                <el-select v-model="applyForm.schdtp" :disabled="true" placeholder=" ">
                                    <el-option v-for="(item, index) in schdtpList" :key="index" :label="item.dictName"
                                        :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="批准额度" prop="amount">
                                <el-input v-model="applyForm.amount" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="分期期数" prop="instalment">
                                <el-select v-model="applyForm.instalment" placeholder=" ">
                                    <el-option v-for="(item, index) in instalmentList" :key="index"
                                        :label="item.dictId + item.dictName" :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="利率" prop="debtrate">
                                <el-input v-model="applyForm.debtrate" @focus="debtrateShow = true"
                                    @blur="debtrateShow = false"
                                    oninput="if(value.indexOf('.') > 0){value=value.slice(0,value.indexOf('.') + 4)}"></el-input>
                                <span class="rangeStyle" v-if="debtrateShow">
                                    利率范围：{{ mnlnir }}~{{ mxlnir }}
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="reduceForm.isreduction == '1'">
                        <el-col :span="8">
                            <el-form-item label="债务重组附件" prop="rebuildFile">
                                <upload-file ref="rebuildFileProp" :uploadFileList="applyForm.file" :uploadDisabled="false"
                                    @changeFile="rebuildFileChange" :key="timer"></upload-file>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" v-model="applyForm.remark" autosize="true"
                                    maxlength="200"></el-input>
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
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
//import {validateHandle} from "@/views/other/loanPostManager/loanPostConstant/loanPostConstant.js";
import _ from "lodash";
//import UploadFile from "@/views/pl/components/UploadFile.vue";
import { log } from 'util';
export default {
    name: "debtRebuildApply",
    components: {
        //   UploadFile,
    },
    data() {
        return {
            activeNames: ["1", "2", "3", "4", "5"],
            basicForm: {
                ctrct_num: "",   //合同编号
                cust_name: "",   //客户名称
                cust_no: "",   //客户号
                cert_no: "",   //证件号码
                mobile_no: "",   //手机号码
                prod_name: "",   //产品名称
                prod_no: "",   //产品代码
                applid: "",   //申请编号
                bchmk_int_rate: "",
                loan_form:"",//贷款形态
                loan_acct_ste:"",//贷款状态
                // zubhna   : "",   //自营机构名称
                // zubhno   : "",   //自营机构ID
                // rpacbr   : "",   //默认还款账户行号
                // islgfe   : "",   //是否法诉
                // ishidg   : "",   //是否高危
                // issynd   : "",   //是否联合贷
                // isabs    : "",   //是否资产证券化
                matu_dt: ""//到期日
            },
            debtInfoForm: {
                loan_acct_num: "",   //贷款账号
                ovdue_amt: "",   //逾期金额
                sumpbl: "",   //欠款本金
                lnreamt: "",   //贷款余额
                ovdays: "",   //逾期天数
                lnnpbl: "",   //正常本金
                lnopbl: "",   //逾期本金
                stgnt_prcpl: "",   //呆滞本金
                write_off_princi: "",   //核销本金
                ucoltb_prcpl: "",//呆账本金
                accrued_inst: "",   //正常利息
                rcvbl_acd_pnly_int: "",   //逾期利息
                rcvbl_fine: "",   //逾期违约金
                agng_prds:"",//贷款期数
                bchmk_int_rate:"",//基准利率
                legalf: "",   //法诉费
                wolgfe: "",   //核销法诉费
                yslgfe: "",   //应收法诉费（未核销法诉费）  
                rpacno: "",   //银行卡号
                atbkna: "",   //还款账户开户行名称
                lareda: "",   //最后还款日
            },
            reduceForm: {
                isreduction: "0",  //是否减免
                reduceAmt: "",   //减免金额
                adjrs: [],   //调整原因
                adjty: "",   //调整类型
                redcznf: "",   //减免滞纳费
                redcni: "",   //减免利息
                rednni: "",   //减免当期利息
                file: [],   //减免附件
            },
            applyForm: {
                debtRestructure: "1",  //债务重组方式
                schdtp: "3",  //还款方式
                amount: "",   //批准额度
                instalment: "",   //分期期数
                debtrate: "",   //利率
                file: [],   //债务重组附件
                remark: "",   //备注
            },
            maxreduceAmt: 0,    //最大减免金额
            mxlnir: 0,    //产品层获取最高利率
            mnlnir: 0,    //产品层获取最低利率
            instalmentList: [],   //产品层获取分期期数List
            lnrtir: 0,    //借据层获取的最大利率
            termfm: 0,    //借据层获取的最大贷款期限
            crdlnoLocal: "",   //当前页面额度编号
            yesnoList: [],   //是否list
            clssstList: [],   //贷款状态list
            schdtpList: [],   //借据层还款方式list
            adjrsList: [],   //申请调整原因list
            schdtpList: [],   //还款方式list
            appltypeList: [],   //申请调整类型list
            debtRestructureList: [],   //债务重组方式list
            actagestr: "",   //借据账龄字符串
            tableDataReceipt: [],   //借据列表数据
            unWatch: [],   //监听数组
            debtrateShow: false,//利率范围是否显示
            reduceRules: {
                isreduction: [{ required: true, message: "请选择是否减免" }],
            },
            applyRules: {
                debtRestructure: [{ required: true, message: "请选择债务重组方式" }],
                schdtp: [{ required: true, message: "请选择还款方式" }],
                amount: [{ required: true, message: "批准额度不可为空" }],
                debtrate: [{ required: true, validator: this.debtrateValidate, trigger: 'change' }],
                instalment: [{ required: true, message: "请选择分期期数" }],
            },
            sfPressbut: true,
            sfPresscanl: true,
        }
    },
    created() {
        // 添加变量的监听
        this.addWatch();
    },
    mounted() {
        this.getDictList("E_APPLTYPE", "appltypeList"); //申请调整类型字典
        this.getDictList("E_ADJR", "adjrsList"); //申请调整原因字典
        this.getDictList("E_YES___", "yesnoList"); //是否字典
        this.getDictList("E_CLSSST", "clssstList"); //贷款状态字典
        this.getDictList("E_SCHDTP", "schdtpList"); //还款方式字典
        this.getDictList("E_DEBTTYPE", "debtRestructureList"); // 初始化贷款账户状态数据字典
    },
    methods: {
        /*=========================================服务实现类start====================================== */
        /**
         * 额度号失焦初始化查询
         */
        InitialWhenBlur() {
            if (!this.basicForm.ctrct_num || this.crdlnoLocal === this.basicForm.ctrct_num) {
                return false;
            }
            this.crdlnoLocal = this.basicForm.ctrct_num; // 记录额度编号
            // 清空上次查询信息
            this.clearHistory();
            // 获取初始化的基础信息和欠款信息
            this.getInitialInfo();
        },
        /**
         * 重置页面信息
         */
        clearHistory() {
            this.$refs.basicForm.resetFields();
            this.$refs.debtInfoForm.resetFields();
            this.tableDataReceipt = [];
            this.cancel();
        },
        /**
         *获取初始化的基础信息和欠款信息
        *
        */
        getInitialInfo() {
            let params = {
                servicecode: "pl2002",
                ctrct_num: this.crdlnoLocal
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then(res => {
                    if (res && res.code === "200" && res.data) {
                        //额度层信息获取
                        let data = res.data.debtRebuildQry;
                        this.basicForm.applid = res.data.applid;  //申请编号
                        this.basicForm.ctrct_num = data.ctrct_num;      //合同编号
                        this.basicForm.cust_name = data.cust_name;      //客户名称
                        this.basicForm.cust_no = data.cust_no;      //客户号
                        this.basicForm.cert_no = data.cert_no;      //证件号码
                        this.basicForm.mobile_no = data.mobile_no;      //手机号码
                        this.basicForm.prod_name = data.prod_name;      //产品名称
                        this.basicForm.prod_no = data.prod_no;      //产品代码
                        this.basicForm.bchmk_int_rate = data.bchmk_int_rate;//利率
                        this.basicForm.loan_form = data.loan_form;//贷款形态
                        this.basicForm.loan_acct_ste = data.loan_acct_ste;//利率
                        this.mxlnir = data.bchmk_int_rate;//利率
                        // this.basicForm.zubhna    = data.zubhna;      //自营机构名称
                        // this.basicForm.zubhno    = data.zubhno;      //自营机构ID
                        // this.basicForm.pubacctno = data.pubacctno;   //公账专属账号
                        // this.basicForm.rpacbr    = data.rpacbr;      //还款账户行号
                        this.basicForm.matu_dt = data.matu_dt
                        // this.basicForm.islgfe    = data.islgfe;      //是否法诉
                        // this.basicForm.ishidg    = data.ishidg;      //是否高危
                        // this.basicForm.issynd    = data.issynd;      //是否联合贷
                        // this.basicForm.acctst    = data.acctst;      //贷款状态
                        // this.basicForm.isabs     = data.isabs;       //是否资产证券化
                        //欠款信息获取
                        this.debtInfoForm.loan_acct_num = data.loan_acct_num; //贷款账号
                        this.debtInfoForm.ovdue_amt = data.ovdue_amt //逾期金额
                        this.debtInfoForm.lnreamt = data.loan_balance;//贷款余额
                        this.debtInfoForm.agng_prds=data.agng_prds;//贷款期数
                        this.debtInfoForm.ovdays = data.ovdays; //逾期天数
                        this.debtInfoForm.lnnpbl = data.normal_princi; //正常本金
                        this.debtInfoForm.lnopbl = data.overdue_princi; //逾期本金
                        this.debtInfoForm.stgnt_prcpl = data.stgnt_prcpl_occr_amt; //呆滞本金
                        this.debtInfoForm.ucoltb_prcpl = data.ucoltb_prcpl; //呆账本金
                        this.debtInfoForm.write_off_princi = data.write_off_princi; //核销本金
                        this.debtInfoForm.bchmk_int_rate=data.bchmk_int_rate;//基准利率
                        this.debtInfoForm.sumpbl = this.sumCalc(data.stgnt_prcpl_occr_amt,
                            data.overdue_princi,
                            data.write_off_princi,
                            data.ucoltb_prcpl); //欠款本金
                        this.debtInfoForm.accrued_inst = data.accrued_inst; //正常利息
                        this.debtInfoForm.debtin = data.ovdue_acd_int; //逾期利息
                        this.debtInfoForm.rcvbl_fine = data.ovdue_dflt_amt; //逾期违约金
                        this.applyForm.amount = data.ovdue_amt;
                        this.maxreduceAmt = this.sumCalc(data.rcvbl_acd_int, data.debtin); //最大可减免金额
                        this.reduceAmt.redcni =0;
                        this.debtInfoForm.atbkna = data.atbkna; //还款账户开户行名称
                        this.debtInfoForm.rpacno = data.debit_card_no; //银行卡号
                        this.debtInfoForm.lareda = data.matu_dt; //最后还款日
                        //借据层信息获取
                        let receiptdata = res.data.receiptlninfo;
                        this.tableDataReceipt = [];
                        // let actageArray = [];  //借据账龄获取
                        let intRateArray = []; //借据利率获取
                        let termfmArray = [];  //借据贷款期限获取
                        let tempArray = {};
                        this.instalmentList = [];
                        receiptdata.forEach(item => {
                            //借据贷款期限数组
                            if ((/M/g).test(item.loan_matu)) {
                                termfmArray.push(item.loan_matu.substr(0, item.loan_matu.length - 1));
                            }
                            termfmArray.sort((a, b) => {
                                return parseFloat(b) - parseFloat(a)
                            });
                            this.termfm = termfmArray[0];
                            //借据利率数组
                            intRateArray.push(item.nrl_int_rate);
                            intRateArray.sort((a, b) => {
                                return parseFloat(b) - parseFloat(a)
                            });
                            this.lnrtir = intRateArray[0];
                            let array = {};
                            array = item;
                            // array.applid = res.data.applid; //申请编号
                            // array.legalf = this.sumCalc(item.wolgfe, item.yslgfe); //法诉费
                            // array.sumpbl = this.sumCalc(item.lnopbl,item.lndpbl,item.lnbpbl,item.hxxxpr);
                            // array.sumamt = this.sumCalc(array.sumpbl,item.debtin,item.ysxxfe,item.wolgfe,item.yslgfe)

                            array.sumpbl = this.sumCalc(array.ovdue_prcpl, array.stgnt_prcpl, array.ucoltb_prcpl, array.chk_write_off_prcpl);
                            array.lnreamt = this.sumCalc(array.sumpbl, array.nrl_prcpl);
                            array.sumamt = this.sumCalc(array.sumpbl, array.rcvbl_db_int, array.urge_collt_db_int, array.chk_write_off_int);

                            tempArray.dictId = array.totl_prds;
                            tempArray.dictName = "期";
                            this.instalmentList.push(tempArray)

                            this.tableDataReceipt.push(array);



                        });
                        // this.rangeGet();    //获取产品的利率范围和贷款期限范围    
                        //  this.actagestr = actageArray.join(',');
                        this.sfPressbut = false;
                        this.sfPresscanl = false;
                    }
                }
                )
                .catch(err => {
                    console.error(err);
                });
        },
        /**
         * 债务重组申请提交
         */
        submit() {
            let validateList = [];
            const formList = ["reduceForm", "applyForm"];
            // formList.forEach(item => {
            //     validateList.push(validateHandle(item, this));
            // });

            this.sfPressbut = true;
            this.sfPresscanl = true;
            //额度层贷款信息
            let quotalnParams = Object.assign({}, this.basicForm, this.debtInfoForm);
            //减免金额信息
            let applyinfoObject = {};
            applyinfoObject.ctrct_num = this.basicForm.ctrct_num;
            applyinfoObject.sfreduce = this.reduceForm.isreduction;
            applyinfoObject.redcznf = this.reduceForm.redcznf;
            applyinfoObject.redcni = this.reduceForm.redcni;
            applyinfoObject.rednni = this.reduceForm.rednni;
            applyinfoObject.dert_smtn = this.reduceForm.reduceAmt;
            applyinfoObject.adjrs = this.reduceForm.adjrs.toString();
            applyinfoObject.adjty = this.reduceForm.adjty;
            applyinfoObject.appAmount = this.applyForm.amount;
            applyinfoObject.debtRestructure = this.applyForm.debtRestructure;
            applyinfoObject.lnrtir = this.applyForm.debtrate;
            applyinfoObject.instaltnr = this.applyForm.instalment;
            applyinfoObject.remark = this.applyForm.remark;
            applyinfoObject.schdtp = this.applyForm.schdtp;
            applyinfoObject.applyatt = this.applyForm.file;
            applyinfoObject.reduatt = this.reduceForm.file;
            //获取操作员所属区域中心

            let params = {
                quotalninfo: quotalnParams,
                receiptlninfo: this.tableDataReceipt,
                applyinfo: applyinfoObject,
                lncatp: "DEBTAPPL",
                servicecode: "pl2001",
                apply_no: this.basicForm.apply_no,   //申请号
                ctrct_num: this.basicForm.ctrct_num,    //合同号
                cert_no: this.basicForm.cert_no, //证件号码
                mobile_no: this.basicForm.mobile_no,    //手机号码
                cust_name: this.basicForm.cust_name,    //客户姓名
                loan_form: this.basicForm.loan_form,    //贷款形态
                loan_acct_ste: this.basicForm.loan_acct_ste,        //贷款账户状态
                loan_purp: this.basicForm.loan_purp,    //贷款用途
                loanlimit: this.basicForm.loanlimit,    //额度余额
                debit_card_no: this.debtInfoForm.rpacno,        //借记卡号
                ovdue_ste: this.basicForm.ovdue_ste,   //逾期状态
                ovdue_amt: this.debtInfoForm.ovdue_amt,    //逾期金额
                loan_balance: this.debtInfoForm.lnreamt,       //贷款余额
                loan_ste: this.debtInfoForm.loan_acct_ste,   //贷款状态
                ovdays: this.debtInfoForm.ovdays, //逾期天数
                agng_prds: this.debtInfoForm.agng_prds,    //分期期数
                bchmk_int_rate: this.debtInfoForm.bchmk_int_rate,         //基准利率
                normal_princi: this.debtInfoForm.lnnpbl,       //正常本金
                overdue_princi: this.debtInfoForm.lnopbl,         //逾期本金
                stgnt_prcpl_occr_amt: this.debtInfoForm.stgnt_prcpl,               //呆滞本金发生额
                write_off_princi: this.debtInfoForm.write_off_princi,           //核销本金
                accrued_inst: this.basicForm.accrued_inst,      //应计利息
                dert_acd_int: this.reduceForm.dert_acd_int,       //减免应计利息
                recv_debit_inst_occur: this.basicForm.recv_debit_inst_occur,                //应收欠息发生额
                dert_rcvbl_db_int: this.basicForm.dert_rcvbl_db_int,           //减免应收欠息
                ovdue_acd_int: this.reduceForm.ovdue_acd_int,       //逾期应计利息
                dert_ovdue_acd_int: this.reduceForm.dert_ovdue_acd_int,             //减免逾期应计利息
                accrued_penalt_inst: this.basicForm.accrued_penalt_inst,              //应计罚息
                dert_acd_pnly_int: this.reduceForm.dert_acd_pnly_int,           //减免应计罚息
                ret_rcvbl_pnly_int: this.basicForm.ret_rcvbl_pnly_int,             //归还应收罚息
                dert_rcvbl_pnly_int: this.basicForm.dert_rcvbl_pnly_int,              //减免应收罚息
                chk_write_off_int: this.basicForm.chk_write_off_int,            //核销利息
                dert_chk_write_off_int: this.reduceForm.dert_chk_write_off_int,                 //减免核销利息
                ovdue_dflt_amt: this.basicForm.ovdue_dflt_amt,         //逾期违约金
                dert_ovdue_dflt: this.reduceForm.dert_ovdue_dflt,         //减免逾期违约金
                indebtedness_smtn: this.debtInfoForm.ovdue_amt,            //所欠合计
                dert_smtn: this.reduceForm.reduceAmt,    //减免合计
                debt_recmbn_way: this.applyForm.debtRestructure,          //债务重组方式
                installment_num: this.applyForm.instalment,         //分期期数
                remark: this.applyForm.remark, //备注
                aply_adjust_reason: this.reduceForm.adjrs.toString(),            //申请调整原因
                adjty: this.reduceForm.adjty, //申请调整类型
                is_dert: this.reduceForm.isreduction,//是否减免
                cust_no: this.basicForm.cust_no,  //客户编号
                aprvl_int_rate:this.applyForm.debtrate,//申请利率
                rebuild_amt:this.applyForm.amount,//重组金额
                cert_type: this.basicForm.cert_type                  //证件类型
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then(res => {
                    if (res && res.code === "200") {
                        this.$msg({ message: "提交成功", type: "success" });
                        this.sfPressbut = true; //禁用提交和保存按钮
                        this.sfPresscanl = true; // 禁用取消按钮
                        this.clearHistory(); // 清空页面信息
                        this.crdlnoLocal = "";
                    }
                })
                .catch(err => {
                    this.sfPressbut = false; //禁用提交按钮
                    this.sfPresscanl = false; //禁用提交按钮
                    console.error(err);
                });

        },
        /**
         * 取消按钮，重置减免申请信息
         */
        cancel() {
            console.log(this.applyForm.debtrate);
            // this.$refs.rebuildFileProp.clearFileList();
            this.reduceForm.file = [];
            this.applyForm.file = [];
            this.$refs.reduceForm.resetFields();
            this.$refs.applyForm.resetFields();
            this.$nextTick(() => {
                this.$refs.reduceForm.clearValidate();
                this.$refs.applyForm.clearValidate();
            })
        },
        /*=========================================服务实现类end======================================== */
        /*=========================================工具方法start======================================== */
        /**
         * 变量监听
         */
        addWatch() {
            this.unWatch.push(
                this.$watch("reduceForm.adjrs", function () { this.adjrs(); }, { deep: true })
            );
            this.unWatch.push(
                this.$watch("reduceForm.isreduction", function () { this.isreduction(); }, { deep: true })
            );
        },
        /**
         * 减免调整原因监听方法
         */
        adjrs() {
            if (!this.reduceForm.adjrs || this.reduceForm.adjrs.length == 0) {
                this.reduceForm.adjty = '';
            } else {
                // 勾选调整原因，触发调整类型的选择
                let item0_flg = false;  //是否选择了还款能力弱、特殊消费者
                let item1_flg = false;  //是否选择了除还款能力弱、特殊消费者之外的调整原因
                this.reduceForm.adjrs.forEach(item => {
                    if (item == '0' || item == '1') {
                        item0_flg = true;
                    } else {
                        item1_flg = true;
                    };
                });
                if (item0_flg && item1_flg) {
                    this.reduceForm.adjty = '3';
                } else {
                    if (item0_flg) {
                        this.reduceForm.adjty = '0';
                    } else {
                        this.reduceForm.adjty = '1';
                    }
                };
            };
        },
        /**
         *  计算减免金额
         */
        reduceAmt() {
            this.applyForm.amount = parseFloat(this.debtInfoForm.ovdue_amt) - parseFloat(this.reduceForm.reduceAmt);
            if (parseFloat(this.reduceForm.reduceAmt) <= parseFloat(this.debtInfoForm.ysxxfe)) {
                this.reduceForm.redcznf = this.reduceForm.reduceAmt;
                this.reduceForm.redcni = 0;
                this.reduceForm.rednni = 0;
            } else {
                this.reduceForm.redcznf = this.debtInfoForm.ysxxfe;
                let tempAmt = (parseFloat(this.reduceForm.reduceAmt) - parseFloat(this.debtInfoForm.ysxxfe)).toFixed(2);
                if (parseFloat(tempAmt) <= parseFloat(this.debtInfoForm.debtin)) {
                    this.reduceForm.redcni = parseFloat(tempAmt);
                    // this.reduceForm.rednni = 0;
                } else {
                    this.reduceForm.redcni = this.debtInfoForm.debtin;
                    // this.reduceForm.rednni = (parseFloat(tempAmt) - parseFloat(this.debtInfoForm.debtin)).toFixed(2);;
                }
            }
        },
        /**
         * 是否减免监听方法
         */
        isreduction() {
            if (this.reduceForm.isreduction == '1') {
                this.reduceRules = {
                    isreduction: [{ required: true, message: "请选择是否减免" }],
                    reduceAmt: [{ required: true, validator: this.reduceAmtValidate, trigger: 'change' }],
                    adjrs: [{ required: true, message: "请选择调整原因" }],
                    adjty: [{ required: true, message: "调整类型不可为空" }],
                    reduceFile: [{ required: true, validator: this.reduceFileValidate, trigger: 'change' }],
                }
            } else {
                this.reduceRules = {
                    isreduction: [{ required: true, message: "请选择是否减免" }],
                }
            };
            this.$nextTick(() => {
                this.$refs.reduceForm.clearValidate();
            });
        },
        /**
         * 获取区间范围
         */
        rangeGet() {
            this.mnlnir = "0";



            this.instalmentList.sort((a, b) => {
                return a.dictId - b.dictId
            });
            if (this.tableDataReceipt.length > 1) {
                this.applyForm.instalment = this.instalmentList[this.instalmentList.length - 1];
                if (this.mxlnir.indexOf('.') > 0) {
                    this.applyForm.debtrate = this.mxlnir.slice(0, this.mxlnir.indexOf('.') + 4);
                } else {
                    this.applyForm.debtrate = this.mxlnir;
                }
            } else {
                this.applyForm.instalment = this.termfm;
                if (this.lnrtir.indexOf('.') > 0) {
                    this.applyForm.debtrate = this.lnrtir.slice(0, this.lnrtir.indexOf('.') + 4);
                } else {
                    this.applyForm.debtrate = this.lnrtir;
                }
            }
        },
        /**
         * 获取数据字典列表
         * @param dictType  数据字典 dictTyp
         * @param listKey 列表对象key名称
         */
        getDictList(dictType, listKey) {
            let that = this;
            let params = {
                dictType: dictType,
                dictKey: [dictType]
            };
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
                .then(res => {
                    if (res && res.code === "200") {
                        this[listKey] = res.data;
                        return this[listKey];
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        /**
         * 多值求和
         */
        sumCalc() {
            let list = [...arguments];
            list = list.map(item => Number(item));
            var s = 0;
            list.forEach(item => (s += item));
            return Number(s).toFixed(2);
        },
        /**
         * 贷款形态
         */
        dupoFormat(row, column) {
            let name = row[column.property];
            let data = row[column.property];
            this.yesnoList.forEach(function (item, index) {
                if (data == item.dictId) {
                    name = item.dictName;
                }
            });
            return name;
        },
        /**
         * 贷款形态
         */
        dataFormat(row, column) {
            let name = row[column.property];
            let data = row[column.property];
            this.clssstList.forEach(function (item, index) {
                if (data == item.dictId) {
                    name = item.dictName;
                }
            });
            return name;
        },
        /**
         * 还款方式
         */
        schdFormat(row, column) {
            let name = row[column.property];
            let data = row[column.property];
            this.schdtpList.forEach(function (item, index) {
                if (data == item.dictId) {
                    name = item.dictName;
                }
            });
            return name;
        },
        /**
        * 添加文件回调
        * @param file 当前添加文件对象
        * @param fileList 已添加文件
        */
        reduceFileChange(val) { this.reduceForm.file = val; },
        rebuildFileChange(val) { this.applyForm.file = val; },
        /**
         * 减免金额校验
         */
        reduceAmtValidate(value, rule, callback) {
            if (!this.reduceForm.reduceAmt || this.reduceForm.reduceAmt == '') {
                return callback(new Error("请输入减免金额"));
            }
            if (isNaN(this.reduceForm.reduceAmt) || parseFloat(this.reduceForm.reduceAmt) <= 0) {
                return callback(new Error("不符合规则(不能为零、负数、字母等)"));
            }
            if (parseFloat(this.reduceForm.reduceAmt) > parseFloat(this.maxreduceAmt)) {
                return callback(new Error(`超过减免金额最大值${this.maxreduceAmt}`));
            }
            this.reduceAmt()
            return callback();
        },
        /**
         * 利率校验
         */
        debtrateValidate(value, rule, callback) {
            if (!this.applyForm.debtrate || this.applyForm.debtrate == '') {
                return callback(new Error("请输入利率"));
            }
            if (isNaN(this.applyForm.debtrate) || parseFloat(this.applyForm.debtrate) <= 0) {
                return callback(new Error("不符合规则(不能为零、负数、字母等)"));
            }
            if (parseFloat(this.applyForm.debtrate) < parseFloat(this.mnlnir) || parseFloat(this.applyForm.debtrate) > parseFloat(this.mxlnir)) {
                return callback(new Error("输入利率超出范围"));
            }
            return callback();
        },
        /**
         * 文件必输校验
         */
        reduceFileValidate(value, rule, callback) {
            if (this.reduceForm.file.length === 0) {
                return callback(new Error("请上传附件"));
            }
            return callback();
        },
        /*=========================================工具方法end========================================== */

    }
}
</script>
<style scoped>
.rangeStyle {
    color: #F56C6C;
    font-size: 12px;
}
</style>