// 版本切换页面
<template>
    <div>
        <el-table
            :data="versionData"
            ref="versionTable"
            border
            stripe
            @selection-change="handleSelectionChange"
            @select="dialogCheck"
        >
            <el-table-column label="选择" width="55" align="center" type="selection"></el-table-column>
            <el-table-column prop="tree_code" label="规则树代码" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="tree_name" label="规则树名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="busi_version" label="版本号" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column label="规则树详情" width="100px" align="center">
                <template slot-scope="scope">
                    <el-button @click="reviewDetail(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="footDiv">
            <el-button @click="versionFallback" v-if="versionData.length>0" type="primary" plain>确定</el-button>
            <el-button @click="versionFallcancel" type="info" plain>取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "versionBack",
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    data() {
        return {
            versionData: [], //版本列表数据
            selectioned: "", //单选中的值
            selectVersion: undefined, //选择的类
        };
    },
    mounted() {
        console.log(
            "父类传过来的参数---rule_tree_version_back",
            this.cParentParams
        );
        this.init();
    },
    methods: {
        //请求版本表格数据
        init() {
            let that = this;
            let params = {
                tree_code: that.cParentParams.tree_code,
                curr_version: that.cParentParams.curr_version, //当前生效版本号
                start: 1,
                length: 100,
                servicecode:
                    "deci040104",
                isList: true,
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    that.versionData = obj.data;
                    console.log("版本数据：", that.versionData);
                })
                .catch((res) => {});
        },
        //查看规则详情
        reviewDetail(row) {
            console.log("版本回退row", row);
            let that = this;
            that.$dialog.open({
                title: "规则树详情",
                that: that,
                toRequest: {
                    url: "@ruleTreeVersionBackDetail",
                    method: "get",
                    params: row,
                },
                width: "85%",
            });
        },
        //确认版本回退
        versionFallback() {
            let that = this;
            if (this.selectVersion === undefined) {
                return;
            }
            let params = {
                tree_id: this.selectVersion.tree_id, //id
                tree_code: this.selectVersion.tree_code, //规则树代码
                busi_version: this.selectVersion.busi_version, //版本号
                servicecode: "deci040114"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
        //关闭窗口
        versionFallcancel() {
            this.$dataBus.doCallBack(this, {});
        },
        /*实现单选*/
        dialogCheck: function (selection, row) {
            console.log("单选选中-----", selection, row);
            this.$refs.versionTable.clearSelection();
            this.selectVersion = undefined;
            if (selection.length === 0) {
                // 判断selection是否有值存在
                return;
            }
            if (row) {
                this.selectioned = row;
                this.$refs.versionTable.toggleRowSelection(row, true);
                this.selectVersion = row;
                console.log("选中的选项-----", this.selectVersion);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.footDiv {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
</style>
