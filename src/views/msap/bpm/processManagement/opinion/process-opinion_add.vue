<template>
    <div class="Sidebar">
        <el-form :model="formdata" ref="formdata" :rules="rules" class="form-two-column">
            <el-form-item label="审批意见定义名称">
                <el-input v-model="formdata.opinion_define_name" placeholder="请输入审批意见定义名称" maxlength="20"
                    show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="审批意见类型">
                <el-select v-model="formdata.appv_opinion_type" placeholder="请选择审批意见类型">
                    <el-option v-for="item in appv_opinion_list" :key="i" :label="item.dictName" :value="item.dictId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型">
                <el-select v-model="formdata.busi_type" @change="busiChange" placeholder="请选业务类型">
                    <el-option v-for="item in busi_type_list" :key="i" :label="item.dictName" :value="item.dictId">
                    </el-option>
                </el-select>
            </el-form-item>            
            <el-form-item label="审批意见可选参数" class="full-row">
                <el-button v-for="opinionParam in paramList" type="primary" :key="opinionParam.param_code"
                    @click="paramClick(opinionParam)">{{ opinionParam.param_name }}</el-button>
            </el-form-item>
            <el-form-item label="审批意见详情" class="full-row">
                <el-input type="textarea" :rows="5" placeholder="请编辑审批意见详情" v-model="formdata.opinion_desc" maxlength="150"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item   class="btn">
                <el-button @click="onsubmit()" type="primary">提交</el-button>
            </el-form-item>
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
            formdata: {
                opinion_define_name: "",
                opinion_belong: "",
                appv_opinion_type: "",
                opinion_desc_param: "",
                opinion_desc: "",
                busi_type:""
            },
            busi_type_list:[],
            appv_opinion_list:[],
            paramList: [],
            rules: {
                opinion_define_name: [
                    { required: true, message: '请输入审批意见名称', trigger: 'blur' }
                ],
                appv_opinion_type: [
                    { required: true, message: '请选择审批意见类型', trigger: 'blur' }
                ],
                opinion_desc: [
                    { required: true, message: '请输入审批意见详情', trigger: 'blur' }
                ],
                busi_type: [
                    { required: true, message: '请选择归属业务类型', trigger: 'blur' }
                ]
            }

        };
    },
    methods: {
        paramClick(opinionParam) {
            if (typeof this.formdata.opinion_desc == 'undefined' || this.formdata.opinion_desc == null || this.formdata.opinion_desc === '') {
                this.formdata.opinion_desc = "【" + opinionParam.param_name + "】";
            } else {
                this.formdata.opinion_desc = this.formdata.opinion_desc + "【" + opinionParam.param_name + "】";
            }
        },
        busiChange(val) {
          this.initParamList(val);
        },
        onsubmit() {
            let params = {
                opinion_define_name: this.formdata.opinion_define_name,
                opinion_belong: this.formdata.opinion_belong,
                busi_type :this.formdata.busi_type,
                opinion_desc: this.formdata.opinion_desc,
                appv_opinion_type: this.formdata.appv_opinion_type,
                servicecode: "bpm6002",
                appId: this.cParentParams.appId
            };

            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
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
        initParamList(busi_type) {
            let params = {
                servicecode: "bpm6005",
                appId: this.cParentParams.appId,
                busi_type: busi_type
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.paramList = res.data;
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
         /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log("下拉列表" + JSON.stringify(this[listKey]));
          }
        })
        .catch(err => {
          console.error(err);
        });
    }

    },

    created() {
        this.getDictList("AR_E_BUSI_TYPE", "busi_type_list");
        this.getDictList("BPM_E_OPINION_TYPE", "appv_opinion_list");
        this.formdata.opinion_belong = this.cParentParams.opinion_belong,
            this.initParamList();
    }
};
</script>


<style lang="less" scoped>
/deep/ .form-two-column {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;

    .el-form-item {
        width: 48%;
    }

    .el-form-item.full-row {
        width: 100%;
    }

    .el-select {
        width: 100%;
    }

    .btn {
        width:100%;
        display: flex;
        justify-content: center;

        .el-button:first-child {
            margin-right: 60px;
        }
    }
}
</style>