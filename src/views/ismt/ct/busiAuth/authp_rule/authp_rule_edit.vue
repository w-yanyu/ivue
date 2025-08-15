<template>
    <div class="Sidebar">
        <el-form :model="formdata" ref="formdata">
            <el-table :data="formdata.ruleList" :row-class-name="tableRowClassName">

                <el-table-column align="center" header-align="center" :label="$i18ns('busi_auth.auth_check_type')" width="180">

                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.dimension_type'">
                            <span v-if="scope.row.dimension_type === '1'">{{ $i18ns('busi_auth.condition_item') }}</span>
                            <span v-else>{{ $i18ns('busi_auth.check_item') }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" :label="$i18ns('busi_auth.column_name')" width="180">

                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.field_name'">
                            <span>{{ scope.row.field_name }}</span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center"  :label="$i18ns('busi_auth.comparison_mode')" width="180">
                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.opt_type'">
                            <el-select v-model="scope.row.opt_type" >
                                <el-option v-for="item in scope.row.opt_types" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="right"  :label="$i18ns('busi_auth.max_value')" width="180">
                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.max_value'">
                            <span v-if="scope.row.retrun_value_type === '0' || scope.row.retrun_value_type === '1'">
                                <el-input type="text" v-model="scope.row.max_value" :placeholder="$i18ns('busi_auth.input_max_value')"></el-input>
                            </span>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="right" :label="$i18ns('busi_auth.min_value')" width="180">
                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.min_value'">
                            <span v-if="scope.row.retrun_value_type === '0' || scope.row.retrun_value_type === '1'">
                                <el-input type="text" v-model="scope.row.min_value" :placeholder="$i18ns('busi_auth.input_min_value')"></el-input>
                            </span>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column align="center" header-align="center" :label="$i18ns('busi_auth.char_or_option_value')" width="180">
                    <template slot-scope="scope">
                        <el-form-item :prop="'ruleList.' + scope.$index + '.string_value'">
                            <span
                                v-if="scope.row.retrun_value_type === '2' || scope.row.retrun_value_type === '3' || scope.row.retrun_value_type === '4'">
                                <el-select v-model="scope.row.string_value" v-if="scope.row.retrun_value_type === '3'"
                                    :placeholder="$i18ns('busi_auth.please_select')">
                                    <el-option v-for="item in scope.row.opt_value" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="scope.row.string_value_list"
                                    v-else-if="scope.row.retrun_value_type === '4'" multiple :placeholder="$i18ns('busi_auth.please_select')">
                                    <el-option v-for="item in scope.row.opt_value" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input type="text" v-model="scope.row.string_value" v-else
                                    ：placeholder="$i18ns('busi_auth.input_char')"></el-input>
                            </span>
                        </el-form-item>
                    </template>
                </el-table-column>

            </el-table>
            <div>
                <el-form-item header-align="center" width="900">
                    <el-button @click="onsubmit()" type="success">{{ $i18ns('busi_auth.preserve') }}</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    data() {
        return {
            //控制修改显示隐藏
        comparison_mode_not_null: this.$i18ns('busi_auth.comparison_mode_not_null'),
        max_value_not_null:this.$i18ns('busi_auth.max_value_not_null'),
        min_value_not_null: this.$i18ns('busi_auth.min_value_not_null'),
        min_value_max_value: this.$i18ns('busi_auth.min_value_max_value'),
        char_not_null: this.$i18ns('busi_auth.char_not_null'),
            formdata: {
                ruleList: [
                ]
            },
            authp_system_code: "",
            auth_version: "",
            role_id: "",
            authp_rule_code: ""
        };
    },
    methods: {
        onsubmit() {
            let that = this;
            this.submitCheck();

            this.dealMselect();
            // 处理数据前数据转移，提交交易用处理后的数据           
            this.sendDataToServer();

        },
        tableRowClassName({ row, rowIndex }) {
            if (row.dimension_type === '1') {
                return 'condition-row';
            }
            if (row.dimension_type === '0') {
                return 'check-row';
            }
            return '';
        },
        dealMselect() {

            this.formdata.ruleList.forEach((item, index) => {

                if (item.retrun_value_type === '4') {
                    let string_value_arr = item.string_value_list;
                    let string_value_parse = '';

                    string_value_arr.forEach((item) => {
                        string_value_parse = string_value_parse + item + ";"
                    });

                    this.formdata.ruleList[index].string_value = string_value_parse;
                }
            });
        },
        sendDataToServer() {
            let params = {
                authp_system_code: this.authp_system_code,
                auth_version: this.auth_version,
                role_id: this.role_id,
                authp_rule_code: this.authp_rule_code,
                ruleList: this.formdata.ruleList,
                servicecode: "ct2409",
                appId: this.cParentParams.appId
            };

            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.authp_rule_code = res.data.authp_rule_code;
                        this.authp_system_code = res.data.authp_system_code;
                        this.auth_version = res.data.auth_version;
                        this.role_id = res.data.role_id;
                        this.$dataBus.doCallBack(this, 'refresh');
                    } else {
                        this.$message({
                            message: erortx,
                            type: 'error'
                        });
                        throw new Error(erortx);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        submitCheck() { //校验
            this.formdata.ruleList.forEach((item) => {
                //1 操作模式必输
                if (typeof item.opt_type == 'undefined' || item.opt_type == null || item.opt_type === '') {

                    this.$message({
                        message: item.field_name +this.comparison_mode_not_null,
                        type: 'error'
                    });
                    throw new Error(item.field_name + this.comparison_mode_not_null);
                }
                //2 数字类型的 
                if (item.retrun_value_type === '0' || item.retrun_value_type === '1') {
                    //总体规则 ，有小于时 最大值 不能为空     ； 有大于时 最小值不能为空； 单为等于时 最小值不能为空
                    // 00  小于 01 小于等于  02 等于 03 大于 04 大于等于 05 大于，小于 06  大于等于，小于等于
                    //2.1   00  小于 01 小于等于    05 大于，小于 06  大于等于，小于等于    最大值不能为空  
                    if (item.opt_type === '00' || item.opt_type === '01' || item.opt_type === '05' || item.opt_type === '06') {
                        if (typeof item.max_value == 'undefined' || item.max_value == null || item.max_value === '' || item.max_value < 0) {
                            this.$message({
                                message: item.field_name + this.max_value_not_null,
                                type: 'error'
                            });
                            throw new Error(item.field_name +  this.max_value_not_null);
                        }
                    }
                    //2.2    02 等于 03 大于 04 大于等于 05 大于，小于 06  大于等于，小于等于 最小值不能为空
                    if (item.opt_type === '02' || item.opt_type === '03' || item.opt_type === '04' || item.opt_type === '05' || item.opt_type === '06') {

                        if (typeof item.min_value == 'undefined' || item.min_value == null || item.min_value === '' || item.min_value < 0) {
                            this.$message({
                                message: item.field_name + this.min_value_not_null,
                                type: 'error'
                            });
                            throw new Error(item.field_name + this.min_value_not_null);
                        }
                    }
                    if (item.opt_type === '05' || item.opt_type === '06') {// 当为  05 大于，小于 06  大于等于，小于等于   最小值不能大于最大值                      
                        if (parseFloat(item.min_value) >= parseFloat(item.max_value)) {
                            this.$message({
                                message: item.field_name + this.min_value_max_value,
                                type: 'error'
                            });
                            throw new Error(item.field_name + this.min_value_max_value);
                        }


                    }
                }
                //3 字符类型 的字符值必输
                if (item.retrun_value_type === '2' || item.retrun_value_type === '3') {
                    if (typeof item.string_value == 'undefined' || item.string_value == null || item.string_value === '') {
                        this.$message({
                            message: item.field_name + this.char_not_null,
                            type: 'error'
                        });
                        throw new Error(item.field_name + this.char_not_null);
                    }
                }
                //4 多选 string_values 不能为空
                if (item.retrun_value_type === '4') {
                    if (typeof item.string_value_list == 'undefined' || item.string_value_list == null || item.string_value_list === '') {
                        this.$message({
                            message: item.field_name + this.char_not_null,
                            type: 'error'
                        });
                        throw new Error(item.field_name + this.char_not_null);
                    }
                }

            });
        },
        //点击修改       
        getFormInfo() {
            let params = {
                authp_system_code: this.authp_system_code,
                auth_version: this.auth_version,
                role_id: this.role_id,
                authp_rule_code: this.authp_rule_code,
                servicecode: "ct2439",
                appId: this.cParentParams.appId
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.formdata.ruleList = res.data.ruleList;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },



    },
    created() {
        this.authp_system_code = this.cParentParams.authp_system_code,
        this.auth_version = this.cParentParams.auth_version,
        this.role_id = this.cParentParams.role_id,
        this.authp_rule_code = this.cParentParams.authp_rule_code,

        this.getFormInfo()

    }
};
</script>

<style   >
.condition-row {
    background: rgb(203, 240, 71) !important;
}
.check-row {
    background: rgb(13, 235, 5) !important;
}
</style>