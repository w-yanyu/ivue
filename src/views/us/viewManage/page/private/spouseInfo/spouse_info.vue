<template>
    <div>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('配偶姓名')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.spouse_name }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('身份证号码')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.spouse_cert_no }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('移动电话')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.spouse_phone }}</span>
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
            currentInfo: {},
        };
    },
    mounted() {
      let that = this;
      console.log('cParentParams--lookup', this.cParentParams);
      that.getUserInfo();

    },
    methods: {
        getUserInfo() {
          let custno = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
            if(custno == null || custno == ""){
                custno = "Demo000000000"
            }
            const params = {
                servicecode: "us0007",
                cust_no: custno,
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
