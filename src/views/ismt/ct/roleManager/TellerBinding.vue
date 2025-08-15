<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="ruleForm" ref="ruleForm">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户ID" :label-width="formLabelWidth" prop="user_id" >
                                <el-input v-model="ruleForm.user_id" autocomplete="off" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="user_name">
                                <el-input v-model="ruleForm.user_name" autocomplete="off" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户状态" :label-width="formLabelWidth" prop="user_status">
                                <el-select v-model="ruleForm.user_status">
                                    <el-option
                                        v-for="(item,i) in statusList"
                                        :key="i"
                                        :label="item.dictName"
                                        :value="item.dictId">
                                           <span>{{ item.dictId }}-{{ item.dictName}}</span>
                                    </el-option>    
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="机构号" :label-width="formLabelWidth" prop="branch_id">
                                <el-input v-model="ruleForm.branch_id" autocomplete="off" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>           
                    <el-form-item class="button">
                        <div class="button" style="width:150px;float:right;">
                            <el-button type="primary" @click="searchTeller">查询</el-button>
                            <el-button @click="resetForm('form')">{{$i18ns('重置')}}</el-button>
                        </div>
                    </el-form-item> 
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table
                ref="multipleTable"
                :data="tableData"
                :border="true"
                style="width: 100%"
                height="250"
                :row-key="getRowKey"
                stripe
                @select="clickChecked"
                @select-all="clickCheckedAll"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                        :reserve-selection="true"
                        class="noneSelectHeader"
                        >
                    </el-table-column>
                    <el-table-column
                        label="用户ID"
                        width="120"
                        prop="user_id"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="用户姓名"
                        prop="user_name"
                        width="120"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="性别"
                        prop="gender"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="机构号"
                        prop="branch_id"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="所属系统"
                        prop="belong_system_id"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="用户状态"
                        prop="user_status"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="冻结标志"
                        prop="freeze_ind"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="最近密码修改日期"
                        prop="password_date"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="密码状态"
                        prop="password_status"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="指纹录入标志"
                        prop="fprint_ind"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="登录状态"
                        prop="login_status"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="休假标志"
                        prop="holiday_ind"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="最后登录日期"
                        prop="last_login_time"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="最后登录IP"
                        prop="ip_address"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="tableSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal">
                </el-pagination>
            </div>
        </div>
        <div class="container-footer">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "TellerBinding",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            tableData: [], //表格数据
            multipleSelection: [], //选中数据
            ruleForm:{
                user_id: "",
                user_name: "",
                user_status: "",
                branch_id: ""
            },
            formLabelWidth: "120px",
            currentPage: 1,
            tableTotal: 10,
            formLabelWidth: '120px',
            tempRuleForm: [],  //查询
            tableSize: 10,
            statusList: [], //下拉数据
            defaultData: [], //初始化默认勾选数据
            newMul: [], //提交的数据
            newArr : [], //全选时缓存
        }
    },
    created() {
        this.getDictList("CT_E_TELLERSTAS","statusList")
        this.getTableData()
        this.getDefaultData()
    },
    methods: {
        getRowKey(row) {
            return row.user_id
        },
        /*
        * 默认勾选
        */
        toggleSelection(rows) {           
            if(rows) {
                rows.forEach( row => {
                    this.multipleSelection.forEach( item => {
                        if(row.user_id === item) {
                            this.$refs.multipleTable.toggleRowSelection(row,true)
                        }
                    })
                })
            }
        },
        /*
        * 勾选数据缓存
        */
        clickChecked(selection, row) {
            if (selection.indexOf(row) > -1) {
                // 选中
                this.multipleSelection.indexOf(row.user_id) === -1 && this.multipleSelection.push(row.user_id); // 防止初始化多次push
            } else {
                // 取消选中
                this.multipleSelection = this.multipleSelection.filter(item => {
                    return item === row.user_id ? false : true;
                })
            }
        },
        /*
        * 全选与取消全选
        */
        clickCheckedAll(selection) {
            let currentArr = []; //存放当前页选中数据
            for( let i of this.tableData) {
                this.newArr.push(i.user_id)
                currentArr.push(i.user_id)
            }
            if(selection.length) {
                this.multipleSelection = Array.from(new Set(this.newArr))
            }else {
                this.multipleSelection = this.multipleSelection.filter(item => {
                    return  currentArr.includes(item) ? false : true;
                })
            }
        },
        /**
        * 获取数据字典列表
        * @param dictType  数据字典 dictTyp
        * @param listKey 列表对象key名称
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
        * 查询
        */
        searchTeller() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.tempRuleForm = _.cloneDeep(this.ruleForm);
                    this.currentPage = 1;
                    this.getTableData();
                } else {
                    this.$message({
                        type: "warning",
                        message: "校验不通过"
                    })
                }
            })
        },
        /**
        * 获取列表数据
        */
        getTableData() {
            let params = {
                length: this.tableSize,
                start: this.currentPage,
                user_id: this.ruleForm.user_id,
                user_name: this.ruleForm.user_name,
                branch_id: this.ruleForm.branch_id,
                user_status: this.ruleForm.user_status,
                servicecode: "ct2002"
            }
            MyAxios.invokeAPI("/SUMP/rest/auth/userManager", "post", params).then(res => {
                if (res && res.code === "200") {
                    this.tableData = res.data;
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                    this.$nextTick( function() {
                        this.toggleSelection(this.tableData)
                    })
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /*
        * 获取默认选中数据
        */
        getDefaultData() {
            let params = {
                role_id: this.cParentParams.role_id,
                servicecode: "ct2002"
            }
            let that = this;
            MyAxios.invokeAPI("/SUMP/rest/role/bindUserId", "post", params).then(res => {
                if (res && res.code === "200") {
                    that.defaultData = res.data;
                    res.data.forEach( item => {
                        that.multipleSelection.push(item);
                    })
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
        * 提交
        */
        submit() {
            let newMul = Array.from(new Set(this.multipleSelection))
            let params = {
                userList: newMul,
                role_id: this.cParentParams.role_id,
                servicecode: "ct2104"
            }
            MyAxios.invokeAPI("/SUMP/rest/role/updateBindUsers", "post", params).then(res => {
                if (res && res.code === "200") {
                    this.$message({
                        type: "success",
                        message: "操作成功"
                    })
                }else {
                    this.$message({
                        type: "error",
                        message: "操作失败"
                    })
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>

<style lang="less" scoped>
.container-content {
    .container-content--search {
        border-bottom: 1px solid #e3e8f5;
        .input {
            width: 180px;
            padding: 0;
        }
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
</style>