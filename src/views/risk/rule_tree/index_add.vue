<template>
    <!-- 修改过规则设置的新的 -->
    <div id="page_content">
        <div class="tips">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item
                    v-if="isEdit"
                    label="节点树编号"
                    prop="ruleTreeNodeId"
                    label-width="120px"
                    align="left"
                >
                    <el-input
                        :disabled="isEdit"
                        style="width: 150px"
                        v-model="ruleForm.ruleTreeNodeId"
                    ></el-input>
                </el-form-item>
                <!-- 查看页面展示 -->
                <el-form-item
                    label="节点类型"
                    prop="nodeType"
                    v-if="isEdit"
                    label-width="120px"
                    align="left"
                >
                    <el-select
                        v-model="ruleForm.nodeType"
                        :disabled="isEdit"
                        placeholder="节点类型"
                        style="width: 150px"
                        @change="changeType"
                    >
                        <el-option
                            v-for="item in nodeTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 非根节点时的选项 -->
                <el-form-item
                    label="节点类型"
                    prop="nodeType"
                    v-else-if="!isEdit && !isRootNode && !isHaveChildren"
                    label-width="120px"
                    align="left"
                >
                    <el-select
                        v-model="ruleForm.nodeType"
                        :disabled="isEdit"
                        placeholder="节点类型"
                        style="width: 150px"
                        @change="changeType"
                    >
                        <el-option
                            v-for="item in nodeTypeOptionsAdd"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <!-- 根节点时的选项 -->
                <el-form-item label="节点类型" prop="nodeType" v-else label-width="120px" align="left">
                    <el-select
                        v-model="ruleForm.nodeType"
                        :disabled="isEdit"
                        placeholder="节点类型"
                        style="width: 150px"
                        @change="changeType"
                    >
                        <el-option
                            v-for="item in nodeTypeOptionsAddRoot"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="规则配置"
                    prop="left"
                    label-width="120px"
                    align="left"
                    v-if="ruleForm.nodeType === 1 "
                >
                    <el-input
                        disabled
                        style="width: 80%;"
                        spellcheck="false"
                        :value="ruleForm.ruleExpress"
                    ></el-input>
                    <el-button type="primary" size="mini" @click.native="setDialog">配置</el-button>
                </el-form-item>
                <!-- 规则描述 -->
                <el-form-item
                    label="规则描述"
                    label-width="120px"
                    align="left"
                    v-if="ruleForm.nodeType === 1 "
                >
                    <el-input
                        :disabled="true"
                        style="width: 80%;"
                        type="textarea"
                        :rows="5"
                        :value="ruleForm.ruleDesc"
                        spellcheck="false"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="ruleForm.nodeType === 2 "
                    prop="actionList"
                    label="动作列表"
                    label-width="120px"
                    align="left"
                    class="action"
                >
                    <ActionConfiguration
                        ref="actionConfiguration"
                        :cParentParams="cParentParams"
                        haveNOSet="true"
                    ></ActionConfiguration>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <div>
                <el-button type="info" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </div>
        </span>
    </div>
</template>

<script>
import ActionConfiguration from "@/components/ActionConfiguration.vue";
import BizRuleCondition from "@/components/BizRule/BizRuleCondition.vue";
import { Loading } from "element-ui";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    name: "tree",
    components: {
        ActionConfiguration,
        BizRuleCondition,
    },
    data() {
        return {
            cParams: this.cParentParams,
            ruleData: {
                funcitonCode: "",
            },
            propsData: {},
            treeData: "",
            nodeTreeDat: "", //节点树的数据
            actionType: [
                {
                    value: '1',
                    label: "插入",
                },
                {
                    value: '2',
                    label: "更新",
                },
                {
                    value: '3',
                    label: "删除",
                },
            ],
            left: 0,
            top: 0,
            isEdit: false,
            delData: "",

            disabled: false, // 是否是详情,不可编辑操作

            dataList: "",
            ruleForm: {
                ruleTreeNodeId: "", //节点
                treeId: "", //根节点
                nodeType: 1, //节点类型
                nodeIdFrom: "", //上一节点
                ruleExpress: "", //执行表达式
                ruleDesc: "", //规则描述
                natureExpression: "", //规则设置类
            },
            rules: {
                ruleTreeNodeId: [
                    {
                        required: true,
                        message: "请输入股东名称",
                        trigger: "blur",
                    },
                ],
                nodeType: [
                    {
                        required: true,
                        message: "请选择节点类型",
                        trigger: "blur",
                    },
                ],
                ruleRight: [
                    {
                        required: true,
                        message: "请配置规则",
                        trigger: "blur",
                    },
                ],
            },
            nodeTypeOptions: [
                {
                    label: "分支节点",
                    value: 1,
                },
                {
                    label: "叶子节点",
                    value: 2,
                },
                {
                    label: "根节点",
                    value: 3,
                },
            ],
            // 节点类型 查看编辑
            nodeTypeOptionsAdd: [
                {
                    label: "分支节点", //普通接地那
                    value: 1,
                },
                {
                    label: "叶子节点", //动作节点
                    value: 2,
                },
            ], // 节点类型 新增
            nodeTypeOptionsAddRoot: [
                {
                    label: "分支节点", //普通接地那
                    value: 1,
                },
            ], // 节点类型 新增
            lastId: 11, // 最后一级id
            currentTreeData: {},
            ruleValue: "", //上传的寄送
            getZhRuleDesc: "", //规则描述
            getRuleExpress: "", //规则表达式
            isRootNode: false, //是否是根节点 跟节点只能添加分支节点
            depth: 0, //树的深度 0根
            isHaveChildren: false, //是否有子分支节点
        };
    },
    mounted() {
        console.log("父类传过来的数据", this.cParentParams);
        this.isEdit = this.cParentParams.isEdit !== 0;
        if (this.isEdit) {
            //属于编辑模式下
            this.ruleForm.nodeType = this.cParentParams.ruleForm.nodeType; //节点类型
            //将以前提交的相关参数的json逆解析出类 并赋值
            if (
                this.ruleForm.nodeType === 1 &&
                this.cParentParams.ruleForm.natureExpression &&
                this.cParentParams.ruleForm.natureExpression !== ""
            ) {
                let jsonTwo = JSON.parse(
                    this.cParentParams.ruleForm.natureExpression
                );
                console.log("jsonTwo", jsonTwo);

                this.ruleForm.natureExpression = jsonTwo; //规则设置类
                this.ruleForm.ruleDesc = this.cParentParams.ruleForm.ruleDesc; //规则描述
                this.ruleForm.ruleExpress =
                    this.cParentParams.ruleForm.ruleExpress; //执行表达式
            }

            if (
                this.ruleForm.nodeType === 2 &&
                this.cParentParams.ruleForm.actionList &&
                this.cParentParams.ruleForm.actionList.length > 0
            ) {
                this.setActionList(this.cParentParams.ruleForm.actionList);
            }
        }

        //加载父类传过来的树id参数
        this.ruleForm.ruleTreeNodeId =
            this.cParentParams.ruleForm.ruleTreeNodeId;
        this.ruleForm.treeId = this.cParentParams.ruleForm.treeId;
        this.ruleForm.nodeIdFrom = this.cParentParams.ruleForm.nodeIdFrom;
        this.depth = this.cParentParams.ruleForm.depth;
        this.isHaveChildren = this.cParentParams.val.data.children.length > 0;
        if (this.ruleForm.treeId === this.ruleForm.nodeIdFrom) {
            //如果树id跟父节点id一样
            this.isRootNode = true; //是跟节点添加的分支节点
        }

        if ((!this.isEdit && this.isRootNode) || this.isHaveChildren) {
            this.ruleForm.nodeType = 1;
        }
        console.log("是否处于编辑模式下-------", this.isEdit);
        console.log("初始化", this.ruleForm);
        console.log("--组件", this.cParentParams);
        console.log(
            "判断----",
            !this.isEdit && !this.isRootNode && this.depth === 1
        );
        console.log("isEdit----", this.isEdit);
        console.log("isRootNode----", this.isRootNode);
        console.log("depth----", this.depth);
    },
    destroyed() {
        console.log("对话框销毁的时候-------", this.isEdit);
        this.clearDialog();
    },
    computed: {},
    methods: {
        setActionList(actionList) {
            let that = this;
            that.$nextTick(() => {
                console.log("目录动作节点编辑事件--组件", that.$refs);
                console.log("目录动作节点编辑事件--数组", actionList);
                if (that.$refs.actionConfiguration) {
                    that.$refs.actionConfiguration.setActionList(actionList);
                }
            });
        },
        // 添加子节点
        confirm() {
            console.log("isCompleted===", this.isCompleted());
            if (this.isCompleted()) {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.sendData();
                    }
                });
            }
        },
        // 发送添加节点数据
        sendData() {
            let that = this;

            let actionList = [];
            if (that.$refs.actionConfiguration) {
                if (!that.$refs.actionConfiguration.isCompleted) {
                    return;
                }
                that.ruleForm.actionList =
                    that.$refs.actionConfiguration.submitActionList();
                actionList = that.ruleForm.actionList;
            }
            if (this.ruleForm.nodeType === 2) {
                this.translationActionList();
            }
            let data = that.ruleForm;
            console.log("添加的treeid 根节点id====", data.treeId);
            console.log("添加的nodeIdFrom 上一节点id====", data.nodeIdFrom);
            console.log(
                "添加的ruleTreeNodeId 本节点id====",
                data.ruleTreeNodeId
            );
            console.log("添加的actionList 动作列表====", actionList);
            let loading = Loading.service();
            let userInfo = JSON.parse(localStorage.getItem("user_info"));

            if (that.isEdit) {
                let param = {
                    ruleTreeNodeId: data.ruleTreeNodeId, //节点id
                    treeId: data.treeId, //根节点
                    nodeType: data.nodeType, //节点类型
                    nodeIdFrom: data.nodeIdFrom, //上一节点
                    ruleExpress: data.ruleExpress, //执行表达式
                    ruleDesc: data.ruleDesc, //规则描述
                    natureExpression: JSON.stringify(data.natureExpression), //规则转译成json
                    // actionList: data.actionList //动作列表
                    actionList, //动作列表
                    updateUser: userInfo.userCode, //修改更新人
                    servicecode:
                        "deci040112"
                };
                console.log("编辑节点提交的参数", param);
                if (this.cParentParams.flowCallBack) {
                    this.cParentParams.flowCallBack(param, that.isEdit);
                    that.$dataBus.doCallBack(that);
                } else {
                    //后台添加数据
                    that.$http
                        .invokeAPI(
                            "/SUMP/icmcall/icmRPCCall",
                            "POST",
                            param
                        )
                        .then((obj) => {
                            that.$message({
                                type: "success",
                                message: "成功",
                            });
                            that.$dataBus.doCallBack(that, obj);
                        })
                        .catch((reg) => {});
                }
                that.clearDialog();
                loading.close();
            } else {
                // 添加
                // 前端添加数据,需要自己生成子级id,可以传数据的时候把最后一级id传过来,进行累加

                let param = {
                    treeId: data.treeId, //根节点
                    nodeType: data.nodeType, //节点类型
                    nodeIdFrom: data.nodeIdFrom, //上一节点
                    ruleExpress: data.ruleExpress, //执行表达式
                    ruleDesc: data.ruleDesc, //规则描述
                    natureExpression: JSON.stringify(data.natureExpression), //规则转译成json
                    // actionList: data.actionList
                    actionList, //动作列表
                    createUser: userInfo.userCode, //创建人
                    updateUser: userInfo.userCode, //修改更新人
                    servicecode: "deci040111"
                };
                console.log("添加子节点提交的参数", param);
                if (this.cParentParams.flowCallBack) {
                    this.cParentParams.flowCallBack(param, that.isEdit);
                    that.$dataBus.doCallBack(that);
                } else {
                    //后台添加数据
                    that.$http
                        .invokeAPI(
                            "/SUMP/icmcall/icmRPCCall",
                            "POST",
                            param
                        )
                        .then((obj) => {
                            that.$message({
                                type: "success",
                                message: "成功",
                            });
                            that.$dataBus.doCallBack(that, obj);
                        })
                        .catch((reg) => {});
                }
                that.clearDialog();
                loading.close();
            }
        },
        // 清除表单信息
        clearDialog() {
            this.ruleForm.ruleOperate = "";
            this.ruleForm.ruleRight = "";
            this.ruleForm.ruleTreeNodeId = "";
            this.ruleForm.ruleLeft = "";
            this.ruleForm.ruleExpress = "";
            this.ruleForm.ruleLeftDataType = "";
            this.ruleForm.ruleLeftName = "";
            this.ruleForm.ruleDesc = "";
            this.ruleForm.actionList = [
                {
                    actionType: "",
                    actionCode: "",
                    actionString: "",
                    actionName: "",
                    actionValue: "",
                    actionDataType: "",
                },
            ];
            console.log("是否清除完毕数据", this.ruleForm);
        },
        changeType(val) {
            this.ruleForm.nodeType = val;
            if (this.ruleForm.actionList === undefined) {
                this.ruleForm.actionList = [
                    {
                        actionType: "",
                        actionCode: "",
                        actionString: "",
                        actionName: "",
                        actionValue: "",
                        actionDataType: "",
                    },
                ];
            }
        },
        //判断项目是否填写完成
        isCompleted() {
            let that = this;
            let isCompleted = true;
            let inputObj = that.ruleForm;
            console.log("是否完成判断开始----------");
            //   .isCompleted());
            if (inputObj.nodeType === "") {
                this.$message.error("请选择节点类型");
                isCompleted = false;
                //左边第二个框选择了在。。之间和大于..的..次方 特殊场景
            } else if (
                inputObj.nodeType === 1 &&
                inputObj.natureExpression === ""
            ) {
                this.$message.error("请配置规则");
                isCompleted = false;
            } else if (
                inputObj.nodeType === 2 &&
                that.$refs.actionConfiguration &&
                !that.$refs.actionConfiguration.isCompleted()
            ) {
                console.log(
                    "动作设置判断是否完成222222----",
                    that.$refs.actionConfiguration.isCompleted()
                );
                isCompleted = false;
            }
            return isCompleted;
        },
        cancel() {
            this.$dialog.close();
        },
        //配置对话框
        setDialog() {
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            this.$dialog.open({
                that: this,
                title: "设置规则",
                toRequest: {
                    url: "@decisionRuleAddDialog", //跳到删除确认按钮页面框
                    method: "get",
                    params: {
                        itemForm: this.ruleForm.natureExpression,
                    },
                },
                width: "90%",
            });
        },
        dialogCallBack(btnConfig, response) {
            console.log("对话框待会的回调", btnConfig);
            console.log("对话框待会的回调", response);
            this.ruleForm.natureExpression = response.itemForm; //上传的寄送
            this.ruleForm.ruleDesc = response.itemDesc; //规则描述
            this.ruleForm.ruleExpress =
                response.itemForm.funcitonCode + response.itemCode; //规则表达式

            // this.ruleData.rule_code = response.itemCode;
            // this.ruleData.rule_desc = response.itemDesc;
            // this.ruleData.rule_Form = response.itemForm;
            //this.ruleData.funcitonCode = response.itemForm.funcitonCode;
        },
        translationActionList() {
            console.log("translationActionList", this.ruleForm.actionList);
            let actionDesc = "";
            let actionExpress = "";
            for (const child of this.ruleForm.actionList) {
                let actionTypeExpress =
                    child.actionType === '1'
                        ? "insert"
                        : child.actionType === '2'
                        ? "updata"
                        : "del";
                let actionTypeDESC =
                    child.actionType === '1'
                        ? "插入"
                        : child.actionType === '2'
                        ? "更新"
                        : "删除";
                if (child.actionType !== '3') {
                    actionExpress = `${actionExpress}${actionTypeExpress} ${child.actionString} ${child.actionValue} and `;

                    actionDesc =
                        child.attributeDesc.length > 0
                            ? `${actionDesc}${actionTypeDESC} ${child.actionName} ${child.attributeDesc} 和 `
                            : `${actionDesc}${actionTypeDESC} ${child.actionName} ${child.actionValue} 和 `;
                } else {
                    actionExpress = `${actionExpress}${actionTypeExpress} ${child.actionString} and `;
                    actionDesc = `${actionDesc}${actionTypeDESC} ${child.actionName} 和 `;
                }
            }
            this.ruleForm.ruleExpress = actionExpress.substr(
                0,
                actionExpress.length - 5
            );
            this.ruleForm.ruleDesc = actionDesc.substr(
                0,
                actionDesc.length - 2
            );
            console.log("ruleExpress", this.ruleForm.ruleExpress);
            console.log("ruleDesc", this.ruleForm.ruleDesc);
        },
    },
};
</script>

<style lang="css" scoped>
#page_content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    padding-bottom: 10px;
}
</style>
