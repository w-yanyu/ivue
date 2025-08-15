<template>
    <div>
        <el-form ref="basicForm" :model="basicForm" class="custom-common--form">
            <el-row>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="复杂评分卡代码" prop="scoreCardCode"
                        :rules="[{ required: true, message: '复杂评分卡代码不能为空' }]">
                        <el-input v-model="basicForm.scoreCardCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="复杂评分卡名称" prop="scoreCardName"
                        :rules="[{ required: true, message: '复杂评分卡名称不能为空' }]">
                        <el-input v-model="basicForm.scoreCardName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label-width="120px" label="版本号" prop="version">
                        <el-input v-model="basicForm.version" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="description" label-width="120px">
                        <el-input v-model="basicForm.description" type="textarea" :rows="3" maxlength="200" show-word-limit
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
            <el-table-column prop="scoreCardCode" label="复杂评分卡代码" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="scoreCardName" label="复杂评分卡名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="version" label="版本号" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="规则详情" width="100px" align="center">
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
                scoreCardCode: "", //规则代码
                scoreCardName: "", //规则名称
                version: "", //版本号
                description: "", //备注
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
        console.log("父类传过来的参数--score_card_version_back", this.cParams);
        this.init();
        this.requestVersionTable();
    },
    methods: {
        init() {
            this.basicForm.scoreCardCode = this.cParentParams.scoreCardCode, //规则代码
                this.basicForm.scoreCardName = this.cParentParams.scoreCardName, //规则名称
                this.basicForm.version = this.cParentParams.version, //版本号
                this.basicForm.description = this.cParentParams.description//备注
        },
        //请求版本表格数据
        requestVersionTable() {
            let that = this;
            let params = {
                scoreCardCode: that.cParentParams.scoreCardCode,
                busiVersion: that.cParentParams.version, //当前生效版本号
                start: 1,
                length: 100,
                servicecode:
                    "deci020114"
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
        //查看规则详情
        reviewDetail(row) {
            console.log("版本回退row", row);
            let that = this;
            that.$dialog.open({
                title: "规则详情",
                that: that,
                toRequest: {
                    url: "@simpleScoreCardVersionBackTableView",
                    method: "get",
                    params: {
                        cParentParams: row,
                    },
                },
                width: "85%",
            });
        },
          getCurrentRow(val){
            console.log("复杂评分卡",val)
            this.bbh = val.version
            this.pfkcode = val.scoreCardCode
            this.serid = val.scoreCardId
            this.sername = val.scoreCardName
        },
        //确认版本回退
        versionFallback() {
            if (!this.bbh) return;
            this.$confirm("是否将“" + this.pfkcode + "”“" + this.cParentParams.scoreCardName + "”的“" + this.cParentParams.version + "”版本切换为“" + this.bbh + "”版本？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let that = this;
                if (this.bbh === undefined) return;
                let params = {
                    scoreCardId: this.serid, //id
                    scoreCardCode: this.pfkcode, //评分卡代码
                    version: this.bbh, //版本号
                    servicecode: "deci020115",
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
