<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{ $i18ns('征信查询次数') }}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ busi_count }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{ $i18ns('最新查询日期') }}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ currentInfo.quary_date }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{ $i18ns('最新查询原因') }}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ currentInfo.queryReason }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{ $i18ns('最新征信报告编号') }}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ currentInfo.reportId }}</span>
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
      busi_count:"",
      currentInfo: {
        busi_count: "",
        quary_date: "",
        queryReason: "",
        reportId: "",
      },
    };
  },
  mounted() {
    let that = this;
    console.log('cParentParams--lookup', this.cParentParams);
    that.getbusiCount();
    that.getUserInfo();

  },

  methods: {
    getbusiCount() {
      let custno = this.cParentParams.cust_no ? this.cParentParams.cust_no : this.cParentParams.cust_id;
      if (custno == null || custno == "") {
        custno = "Demo000000000"
      }
      const params = {
        servicecode: "ar8031",
        length: 999,
        cust_no: custno,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((response) => {
          if (response.code === "200") {
            console.log('response:', response);

            this.currentInfo = response.data.info;
            if ( response.pageParam.total == null || response.pageParam.total == "" || response.pageParam.total == 0) {
              this.busi_count = 0;
            } else {
              this.busi_count = response.pageParam.total;
            }

          } else {
            this.$message({
              message: response.message,
              type: 'error'
            });
          }
        });


    },
    getUserInfo() {
      let custno = this.cParentParams.cust_no ? this.cParentParams.cust_no : this.cParentParams.cust_id;
      if (custno == null || custno == "") {
        custno = "Demo000000000"
      }
      const params = {
        servicecode: "ar8032",
        length: 999,
        cust_no: custno,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((response) => {
          if (response.code === "200") {
            console.log('response:', response);

            this.currentInfo = response.data.info;
            // if ( response.pageParam.total == null || response.pageParam.total == "" || response.pageParam.total == 0) {
            //   this.currentInfo.busi_count = 0;
            //   this.currentInfo.quary_date = "";
            //   this.currentInfo.queryReason = "";
            //   this.currentInfo.reportId = "";
            // } else {
            //   this.currentInfo.busi_count = response.pageParam.total;
            //   this.currentInfo.quary_date = response.data.quary_date;
            //   this.currentInfo.queryReason = response.data.queryReason;
            //   this.currentInfo.reportId = response.data.reportId;
            // }

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
