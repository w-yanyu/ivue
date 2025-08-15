<template>
    <div class="sched-control-container">
        <div class="sched-button">
            <el-button type="primary" size="small" @click="remoteButton">移交</el-button>
        </div>
        <div class="table-list">
            <el-table :data="tableData" width="100%" border >
              <el-table-column type='index' label="序号" align="center"></el-table-column>
                <el-table-column prop="cust_no" label="客户编号" align="center"></el-table-column>
                <el-table-column prop="cust_name" label="客户名称" align="center"></el-table-column>
                <el-table-column prop="cert_type" label="证件类型" align="center" :formatter="formatCertTypeDatas"></el-table-column>
                <el-table-column prop="cert_no" label="证件号码" align="center"></el-table-column>
                <el-table-column prop="valid_state" label="是否有效" align="center" :formatter="formatValidStateDatas"></el-table-column>
            </el-table>
            <!-- <el-pagination
              v-show="tableData.length !== 0"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="start"
              :page-sizes="[10,15,20]"
              :page-size="length"
              layout="total,sizes,prev,pager,next,jumper"
              :total="tableData.length"
              style="text-align: right;">
            </el-pagination> -->
        </div>
        <pte-resolver
          :c-parent-meta="c_$meta"
          :c-parent-scope="c_$scope"
          :c-parent-params="c_$params"
          :to-request="toRequest"
        ></pte-resolver>
        <el-dialog
          title="移交客户信息"
          :visible.sync="dialogVisible"
          size="2400px"
          width="75%"
          :append-to-body="true">
            <cust-handover-manage @cancle-visable="cancle"></cust-handover-manage>
        </el-dialog>
        <el-button
          size="small"
          type="primary"
          class="submit-item--btn"
          @click="submit"
          >启动流程</el-button>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import CustHandoverManage from "@/views/us/custConnect/CustHandoverManage.vue"

export default {
    name: "CustConnectAppl",
    components: {
        CustHandoverManage
    },
    data() {
        return {
            tableData: [], //列表申明
            cert_typeList: [], //证件类型列表
            valid_stateList: [], //是否有效列表
            schedForm: {
                schedOverdu: "", //解除逾期账龄计算方式
                schedSettle: "", //提前结清账龄计算方式
            },
            dialogsForm: {
                repayment_method: "", //还款方式
                account_duration: [], //账龄
                redu_cost_max: "", //减免费用上限(%)
                redu_inte_max: "", //减免利息上限(%)
                redu_pena_inte_max: "", //减免正常利息上限(%)
                para_id: "",
            },
            start: 1,
            length: 10,
            total: null,
            dialogVisible: false, //弹窗的显示于隐藏
            c_$meta: {},
            c_$scope: {},
            c_$params: {
            },
            toRequest: {
              url: "/views/us/custConnect/handover_search.json",
              method: "GET"
            },
        }
    },
    created() {
      this.getDictList("MS_E_CRET_TYPE", "cert_typeList"); //证件类型列表
      this.getDictList("MS_E_YESORNO", "valid_stateList"); //是否有效列表
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
                console.error(err);
            })
        },
        handleSizeChange(val) {
            this.length = val;
            this.start = 1;
        },
        handleCurrentChange(val) {
            this.start = val;
        },
        /**
         * 移交按钮弹窗
         */
        remoteButton() {
            this.dialogVisible = true;
            this.tableData = [];
        },
        /**
         * 保存账龄计算方式
         */
        saveButton() {
            this.$confirm("确定保存账龄计算方式?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(()=> {
                let params = {
                    servicecode: "PLMSKGTS0253",
                    jcyqCalculationMethod: this.schedForm.schedOverdu, //解除逾期账龄计算方式
                    tqjqCalculationMethod: this.schedForm.schedSettle, //提前结清账龄计算方式
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                    if (res && res.code === "200") {
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        })
                    }
                }).catch(err => {
                    console.error(err);
                })
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消保存"
                })
            })
        },
        /**
         * 新增弹框保存按钮
         */
        submit() {
            this.$refs.dialogsForm.validate(valid => {
                if (valid) {
                    let params ={
                        servicecode: "PLMSKGTS0254",
                        repayment_method: this.dialogsForm.repayment_method,
                        account_duration: this.dialogsForm.account_duration.join(","),
                        redu_cost_max: this.dialogsForm.redu_cost_max,
                        redu_inte_max: this.dialogsForm.redu_inte_max,
                        redu_pena_inte_max: this.dialogsForm.redu_pena_inte_max,
                    }
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                        if (res && res.code === "200") {
                            this.$message({
                                type: "success",
                                message: "保存成功"
                            });
                            this.initInfoList();
                            this.dialogVisible = false;

                        }
                    }).catch(err => {
                        console.error(err);
                    })
                }else {
                    this.$message({
                        type: "warning",
                        message: "校验不通过"
                    })
                }
            })
        },
        /**
         * 弹窗关闭
         */
        cancle(val,list) {
            this.dialogVisible = val;
            this.tableData = list;
        },
        /**
         * 初始化信息
         */
        initInfoList() {
        },
        /**
         *证件类型数据字典转换
         */
        formatCertTypeDatas(row, column) {
          let name = row[column.property];
          let data = row[column.property];
          this.cert_typeList.forEach(function (item, index) {
            if (data == item.dictId) {
              name = item.dictName;
            }
          });
          return name;
        },
        /**
         * 是否有效数据字典转换
         */
        formatValidStateDatas(row, column) {
          let name = row[column.property];
          let data = row[column.property];
          this.valid_stateList.forEach(function (item, index) {
            if (data == item.dictId) {
              name = item.dictName;
            }
          });
          return name;
        },
    }
}
</script>
<style lang="less" scoped>
    .sched-control-container{
        // border-bottom: 1px solid #e3e8f5;
        .sched-button{
            padding-top: 20px;
            padding-left: 15px;
            margin-bottom: 5px;
        }
        .button-footer{
            text-align: center;
            margin-bottom: 20px;
            margin-top: 60px;
        }
    }
    .submit-item--btn {
      display: block;
      margin: 0 auto;
    }
</style>
