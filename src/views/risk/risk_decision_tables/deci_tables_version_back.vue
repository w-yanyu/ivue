<template>
    <div>
        <el-form ref="basicForm" :model="basicForm" class="custom-common--form">
            <el-row>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="决策表代码" prop="deci_tables_code"
                        :rules="[{ required: true, message: '决策表代码不能为空' }]">
                        <el-input v-model="basicForm.deci_tables_code" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="决策表名称" prop="deci_tables_name"
                        :rules="[{ required: true, message: '决策表名称不能为空' }]">
                        <el-input v-model="basicForm.deci_tables_name" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="版本号" prop="busi_version">
                        <el-input v-model="basicForm.busi_version" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="deci_tables_describe" label-width="120px">
                        <el-input v-model="basicForm.deci_tables_describe" type="textarea" :rows="3" maxlength="200" show-word-limit
                            disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="padding: 0px 0px 10px 0px;">
                <el-col :span="24">
                    <el-form-item label="请选择版本进行切换："></el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="versionData" ref="versionTable" border
            @select="dialogCheck" highlight-current-row @current-change="handleCurrentChange" @row-click="rowClick">
            <el-table-column label="选择" width="50">
                 <template slot-scope="scope">
                <el-radio :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="deci_tables_code" label="决策表代码" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="deci_tables_name" label="决策表名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="busi_version" label="版本号" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="决策表详情" width="100px" align="center">
                <template slot-scope="scope">
                    <el-button @click="reviewDetail(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="footDiv">
            <el-button @click="versionFallback" v-if="versionData.length > 0" type="primary" plain>确定</el-button>
            <el-button @click="versionFallcancel" type="info" plain>取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "versionBack",
    components: {},
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    data() {
        return {
            basicForm: {
                deci_tables_code: "", //规则代码
                deci_tables_name: "", //规则名称
                busi_version: "", //版本号
                deci_tables_describe: "", //备注
            },
            radio:"",
            pfkcode:"",
            bbh:"",
            serid:"",
            sername:"",
            versionData: [], //版本列表数据
            selectioned: "", //单选中的值
            selectVersion: undefined, //选择的类
        };
    },
    mounted() {
        console.log("父类传过来的参数--cParams", this.cParams);
        console.log("父类传过来的参数--cParentParams", this.cParentParams);

        this.init();
        this.requestVersionTable();
    },
    methods: {
        init() {
            this.basicForm.deci_tables_code = this.cParentParams.deci_tables_code, //规则代码
                this.basicForm.deci_tables_name = this.cParentParams.deci_tables_name, //规则名称
                this.basicForm.busi_version = this.cParentParams.busi_version, //版本号
                this.basicForm.deci_tables_describe = this.cParentParams.deci_tables_describe//备注
        },
        //请求版本表格数据
        requestVersionTable() {
            let that = this;
            let params = {
                deci_tables_code: that.cParentParams.deci_tables_code,
                busi_version: that.cParentParams.busi_version, //当前生效版本号
                start: 1,
                length: 100,
                servicecode:
                    "deci020407"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    that.versionData = obj.data;
                    console.log("111111", that.versionData);
                    //this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => { });
        },
        //查看决策表详情
        reviewDetail(row) {
            console.log("版本回退row", row);
            let that = this;
            that.$dialog.open({
                title: "决策表详情",
                that: that,
                toRequest: {
                    url: "/views/risk/risk_decision_tables/risk_decision_tables_his_view.json",
                    method: "get",
                    params: {
                        cParentParams: row,
                        params:row,
                        "deci_tables_code": row.deci_tables_code,
                        "deci_tables_name": row.deci_tables_name,
                        "branch_id": row.branch_id,
                        "busi_version": row.busi_version,
                        "data_update_time": row.data_update_time,
                        "deci_tables_describe": row.deci_tables_describe
                    },
                },
                width: "85%",
            });
        },
          getCurrentRow(val){
            console.log("决策表参数val",val)
            this.bbh = val.busi_version
            this.pfkcode = val.deci_tables_code
            this.serid = val.scoreCardId
            this.sername = val.deci_tables_name
        },
        //确认版本回退
        versionFallback() {
            if (!this.bbh) return;
            this.$confirm("是否将“" + this.pfkcode + "”“" + this.cParentParams.deci_tables_name + "”的“" + this.cParentParams.busi_version + "”版本切换为“" + this.bbh + "”版本？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let that = this;
                if (this.bbh === undefined) return;
                let params = {
                    //scoreCardId: this.serid, //id
                    deci_tables_code: this.pfkcode, //评分卡代码
                    busi_version: this.bbh, //版本号
                    servicecode: "deci020408",
                };
                that.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                    .then((obj) => {
                        console.log("请求表格数据回调", obj);
                        this.$message.success("切换成功");
                       // this.$message.success("保存成功");
                        this.$dataBus.doCallBack(this, params);
                    })
                    .catch((res) => { });
            });
        },
        //关闭窗口
        versionFallcancel() {
            this.$dataBus.doCallBack(this, {});
        },
        /*实现单选*/
        dialogCheck(selection, row) {
            console.log("单选选中-----", selection, row);
            if (selection.length > 1) {
                this.$refs.versionTable.clearSelection();
                this.$refs.versionTable.toggleRowSelection(selection.pop());
            }
            if (selection.length !== 0) {
                this.selectVersion = selection[selection.length - 1];
            } else {
                this.selectVersion = null;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.footDiv {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
/deep/ .el-table__header-wrapper .el-checkbox__inner {
    display: none;
}
</style>
