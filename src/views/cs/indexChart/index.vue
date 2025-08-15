<template>
  <div style="margin-left: 60px">
  <el-row :gutter="20">
    <el-col :span="4">
      <el-card class="card1" style="height: 200px;">
        <div class="text">
          <p>
            {{$i18ns('新入案件')}} {{list[0].data1}} {{i18ns('件')}}
          </p>
          <p>
            {{$i18ns('新入金额')}} {{list[0].data2}} {{$i18ns('元')}}
          </p>
        </div>
        <div class="icon">
          <i class="el-icon-plus"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" >
      <el-card class="card2" style="height: 200px;">
        <div class="text">
          <p>
            {{$i18ns('存量案件')}} {{list[1].data1}} {{$i18ns('件')}}
          </p>
          <p>
            {{$i18ns('存量金额')}} {{list[1].data2}} {{$i18ns('元')}}
          </p>
        </div>
        <div class="icon">
          <i class="el-icon-s-grid"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4"  >
      <el-card class="card3" style="height: 200px;">
        <div class="text">
          <p>
            {{$i18ns('回款案件')}} {{list[2].data1}} {{$i18ns('件')}}
          </p>
          <p>
            {{$i18ns('回款金额')}} {{list[2].data2}} {{$i18ns('元')}}
          </p>
        </div>
        <div class="icon">
          <i class="el-icon-phone"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" >
      <el-card class="card4" style="height: 200px;">
        <div class="text">
          <p>
            {{$i18ns('待处理案件')}} {{list[3].data1}} {{$i18ns('件')}}
          </p>
          <p>
            {{$i18ns('待处理金额')}} {{list[3].data2}} {{$i18ns('元')}}
          </p>
        </div>
        <div class="icon">
          <i class="el-icon-document-copy"></i>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card class="card5" style="height: 200px;">
        <div class="text">
          <p>
            {{$i18ns('处理案件')}} {{list[4].data1}} {{$i18ns('件')}}
          </p>
          <p>
            {{$i18ns('处理金额')}} {{list[4].data2}} {{$i18ns('元')}}
          </p>
        </div>
        <div class="icon">
          <i class="el-icon-check"></i>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>

</template>

<script>
  import { i18ns } from 'pte-ui/utils/i18n'

  export default {
    name: "index",
    data(){
      return {
       list: [{
         data0: this.i18ns('新入'), //表示类型  新入案件 新入金额/存量案件 存量金额
         data1: "222",  //案件值
         data2: "22222.22", //金额值
       }],
      }
    },
    created() {

      let params = {
        servicecode: "cb0287",
        applyNo: this.applyNo,
        applid:this.applid,
      }

      //this.$http.invokeAPI("SUMP/rest/index/getTop", "post")
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
              .then(response => {
          if (response && response.code === "200") {
           console.log(response);
           this.list = response.data;
          } else {
            this.$message.error(response.message);
          }
        })
    },
    methods: {
      i18ns,
    }
  }
</script>

<style scoped>

  .text {
    font-size: 20px;
    color: white;
    line-height: 22px;
  }

  el-card{
    width: 250px;
  }


  .card1{
    background-color: #29B6F6;
  }
  .card2{
    background-color: #67C23A;
  }
  .card3{
    background-color: #E6A23C;
  }
  .card4{
    background-color: #F56C6C;
  }
  .card5{
    background-color: #9370DB;
  }

  .icon{
    float: right;
    font-size: 70px;
    color: white;
  }

  p{
    font-size: 20px;
    word-break:break-word
  }

</style>
