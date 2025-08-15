<template>
    <div>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('客户名称')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.cust_name }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('身份证号码')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.cert_no }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('性别')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ getDictLabel(sex_tpList, currentInfo.sex_tp) }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('年龄')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.user_age }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('学历')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ getDictLabel(educationList, currentInfo.education) }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('工作单位')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.job_corp }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('工作年限')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.employ_start }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('户籍')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.domic_addr }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('住宅住址')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.house_addr }}</span>
        </el-col>
        </el-row>
        <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('婚姻状况')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ getDictLabel(marr_stateList, currentInfo.marr_state) }}</span>
        </el-col>
        </el-row>
    </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";
export default {
    props: {
        cParentParams: Object, // 父页面传的参数
    },
    data() {
        return {
            currentInfo: {},
            sex_tpList: [], //性别
            educationList: [], // 学历
            marr_stateList: [] //婚姻状况
        };
    },
    mounted() {
      let that = this;
      console.log('cParentParams--lookup', this.cParentParams);
      that.init();
      that.getUserInfo();
    },
    methods: {
        init() {
            this.getDictList("MS_E_GENDER", "sex_tpList");
            this.getDictList("MS_E_MAXEDU", "educationList");
            this.getDictList("MS_E_MARITA", "marr_stateList");
        },
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
        * 获取字典对应的label
        * @param list
        * @param value
        * @returns {*}
        */
        getDictLabel(list, value) {
            let tempValue = value;
            for (const item of list) {
                if (tempValue === item.dictId) {
                tempValue = item.dictName;
                break;
                }
            }
            return tempValue;
        },
        getUserInfo() {
            let custno = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
            if(custno == null || custno == ""){
                custno = "Demo000000000"
            }
            const params = {
                servicecode: "us0007",
                //cust_no: this.cParentParams.cust_no,
                cust_no: custno
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    if (response.code === "200") {

                        this.currentInfo = response.data.info;
                        if(this.currentInfo.employ_start == 0){
                            this.currentInfo.employ_start = "";
                        }

                    } else {
                        this.$message({
                        message: response.message,
                        type: 'error'
                        });
                    }
                });


        },
    },
};
</script>

<style scoped>
  .text {
    font-size: 14px;
    color: black;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 480px;
  }
</style>
