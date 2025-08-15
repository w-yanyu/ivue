<template>
    <div>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('违规次数')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.violations_num }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('重大事件件数')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.majorEvents_num }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('历史逾期次数')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.overdue_num }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('逾期贷款笔数')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.overdueSituation_num }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('逾期总金额(元)')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.overdueSituation_total }}</span>
        </el-col>
      </el-row>
    </div>

</template>

<script>
export default {
    props: {
        cParentParams: Object, // 父页面传的参数
    },
    data() {
        return {
            currentInfo: {
                violations_num:"",
                majorEvents_num:"",
                overdue_num:"",
                overdueSituation_num:"",
                overdueSituation_total:"",
            },
        };
    },

    mounted() {
        let custno = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
            if(custno == null || custno == ""){
                custno = "Demo000000000"
            }
      this.$nextTick(async () => {
        // 个人客户违规
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "us0350",
                    cust_no:custno,

                })
                .then((response) => {
                    this.currentInfo.violations_num = response.pageParam.total;
                    if(response.pageParam.total == 0){
                        this.currentInfo.violations_num = "";
                    }
                });
            //客户重大事件
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "us0073",
                    cust_no:custno,
                })
                .then((response) => {
                    this.currentInfo.majorEvents_num = response.pageParam.total;
                    if(response.pageParam.total == 0){
                        this.currentInfo.majorEvents_num = "";
                    }
                });
            // 我行贷款历史
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "syln0001",
                    "outlistid":"lstLnOvdInfo",
                    "wthr_ever_ovdue":"0",
                    "cust_num": custno
                    })
                .then((response) => {
                    // 逾期贷款笔数：
                    // 逾期总金额(元)
                    response.data.forEach(item => {
                        console.log('item:', item);
                        this.currentInfo.overdueSituation_total = item.over_sum_amt;
                        this.currentInfo.overdueSituation_num = item.over_count_num;
                    });
                    if(this.currentInfo.overdueSituation_num === 0){
                        this.currentInfo.overdueSituation_num = "";
                    }
                    if(this.currentInfo.overdueSituation_total === 0){
                        this.currentInfo.overdueSituation_total = "";
                    }
                });
            // 我行贷款历史
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "syln0001",
                    "outlistid":"lstLnOvdInfo",
                    "wthr_ever_ovdue":"1",
                    "cust_num": custno
                    })
                .then((response) => {
                     // 历史逾期次数：
                    response.data.forEach(item => {
                        console.log('item:', item);
                        this.currentInfo.overdue_num === item.over_count_num;
                    });
                    if(this.currentInfo.overdue_num === 0){
                        this.currentInfo.overdue_num = "";
                    }
                });
            });

    },
    methods: {
        getUserInfo() {
            const params = {
                servicecode: "us0007",
                cust_no: this.cParentParams.cust_no,
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    if (response.code === "200") {
                        console.log('response:', response);
                        this.currentInfo = response.data.info;
                        console.log('currentInfo', this.currentInfo);

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
