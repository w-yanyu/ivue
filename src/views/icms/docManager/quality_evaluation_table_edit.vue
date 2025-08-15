<template>
  <div class="table_container">
    <div class="table_center">
      <table border="3" class="table_big">
        <tr class="table-title ">
          质评报告
        </tr>
        <div class="table-points">
          <div>总得分：
            <span v-if="base_total_points!==''" class="point-text">{{ parseInt(base_total_points) -parseInt(deduction_total_points)}}</span>
          </div>
        </div>

        <table border="1" class="table_report">
          <tr class="table-main">
            <td>序号</td>
            <td class="width30">名称</td>
            <td>基础分</td>
            <td>扣分</td>
            <td class="width15">备注</td>
          </tr>

          <tr v-for="(item, index) in dataArray" :key="index">
            <td>{{ index+1 }}</td>
            <!-- <td>{{ item.quality_evaluation_no }}</td> -->
            <td class="width30 text-align-left">
              {{ item.quality_evaluation_content }}
            </td>
            <td>{{ item.quality_evaluation_mark }}</td>
            <td>
              <el-input
                type="number"
                size="small"
                v-model="item.deduction_points"
                placeholder="输入分值"
                @blur="scorePercentInput($event, item)"
                class="input-el"
                @mousewheel.native.prevent
                suffix-icon="el-icon-edit"
              ></el-input>
            </td>
            <td class="width15">
              <el-input
                size="small"
                v-model="item.requality_evaluation_remarkmark"
                suffix-icon="el-icon-edit"
              ></el-input>
            </td>
          </tr>
        </table>

        <div class="table-bottom">
          <el-button type="primary" size="medium" plain @click="submitSave"
            >{{$i18ns('保存')}}结果</el-button
          >
        </div>
      </table>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbCustReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      base_total_points: "",//基础总分
      deduction_total_points:'0',//扣分总分

      dataArray: [
        {
          quality_evaluation_no: "",
          quality_evaluation_content: "",
          quality_evaluation_mark: "",
          deduction_points: "",
          requality_evaluation_remarkmark: ""
        }
      ]
    };
  },
  filters: {},

  created() {
    this.apply_no = this.cParentParams.apply_no;
    // this.apply_no =  '000000000000023203'

    this.getInitTbaleData();
  },
  methods: {
    //初始化页面数据
    getInitTbaleData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0125"
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getChartData----ar0125", response.data);
          let temp = response.data;
          let tempTotalPoints = 0;
          let regQ = new RegExp("Q","g");
          temp.forEach(item => {
            item["deduction_points"] = 0;
            item["requality_evaluation_remarkmark"] = "";
            item["number"]=parseInt(item.quality_evaluation_no.replace(regQ,""));
            tempTotalPoints =
              tempTotalPoints + parseInt(item.quality_evaluation_mark);
          });
          this.dataArray=temp.sort(function(a, b){
            return a.number- b.number
             })
          this.base_total_points = tempTotalPoints;
          this.getReViewDate()
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //获取后台回显数据
    getReViewDate(){
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0126",
        apply_no: this.apply_no, //申请号
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getReViewDate----ar0126", response.data);
          let tempData = response.data;
            //分数回显赋值
          if(tempData.deduction_points && tempData.deduction_points.length>0){
            //Q1-10,Q2-0,Q3-2,Q4-3,Q5-4,Q6-5
           let splitData= tempData.deduction_points.split(",")
           if(splitData.length>0)
           splitData.forEach(itemStr => {
            this.initPoints(itemStr)
           });
           //重新计算总分值
           this. subDeduction()
          }

            //备注回显赋值
            if(tempData.quality_evaluation_remark && tempData.quality_evaluation_remark.length>0){
            //Q1-我是备注,Q2-我是备注,Q3-我是备注,Q4-我是备注,Q5-我是备注,Q6-我是备注
           let splitMark= tempData.quality_evaluation_remark.split(",")
           if(splitMark.length>0)
           splitMark.forEach(itemStr => {
            this.initMarks(itemStr)
           });
          }

        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //查找并赋值扣分值
    initPoints(str){
      let splitData=str.split("-");

      if(splitData.length>1){
        let index =  this.dataArray.findIndex(
            item => item.quality_evaluation_no === splitData[0]
          );
          if(index!=-1){
            this.dataArray[index].deduction_points=splitData[1]
          }
      }
    },
     //查找并赋值备注值
     initMarks(str){
      let splitData=str.split("-");

      if(splitData.length>1){
        let index =  this.dataArray.findIndex(
            item => item.quality_evaluation_no === splitData[0]
          );
          if(index!=-1){
            this.dataArray[index].requality_evaluation_remarkmark=splitData[1]
          }
      }
    },
    //评分值输入限制
    scorePercentInput(event, item) {
      let value = event.target.value;
      if(value==='') value=0;
      if (parseInt(value) > parseInt(item.quality_evaluation_mark))
        value = parseInt(item.quality_evaluation_mark);
      if (parseInt(value) < 0) value = "0";
      item.deduction_points = parseInt(value);
      this. subDeduction()

    },
    //计算扣分总分
    subDeduction(){
      let tempDeduction=0
      this.dataArray.forEach(item => {
        if(item.deduction_points==='')
        item.deduction_points=0;
        tempDeduction=tempDeduction+ parseInt(item.deduction_points)
      });
      this.deduction_total_points=tempDeduction

    },
    //保存结果
    submitSave() {
      let init_url = "/SUMP/call/RPCCall";
      let deduction_points=this.formatPoints()
      let quality_evaluation_remark=this.formatRemark()
      console.log("提交转换后的扣分字符串",deduction_points)
      console.log("提交转换后的备注字符串",quality_evaluation_remark)
      let init_req = {
        servicecode: "ar0127",
        apply_no: this.apply_no, //申请号
        deduction_points, //字符串 编号key-分数, 格式
        quality_evaluation_remark, //字符串 编号key-备注, 格式
        total_points: parseInt(this.base_total_points) -parseInt(this.deduction_total_points) //总得分
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("保存结果回调----ar0127", response.data);
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //格式化上传的扣分项
    formatPoints(){
      let pointStr=[]
      this.dataArray.forEach(item => {
        if(item.deduction_points==='')
        item.deduction_points=0;
        pointStr.push(`${item.quality_evaluation_no}-${item.deduction_points}`)
      });
      return pointStr.toString()
    },
    //格式化上传的备注项
    formatRemark(){
      let remarkmarkStr=[]
      this.dataArray.forEach(item => {
        if(item.requality_evaluation_remarkmark!=='')
        remarkmarkStr.push(`${item.quality_evaluation_no}-${item.requality_evaluation_remarkmark}`)
      });
      return remarkmarkStr.toString()
    },
  }
};
</script>

<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }
.table_big {
  width: 98%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-title {
  height: 100px;
  font-size: 30px;
  line-height: 100px;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.table-points {
  width: 90%;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.table_report {
  width: 98%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 5%;
  text-align: center;
}
.table-main{
background-color:#368ee0;
color:#FFF;
font-weight: bold;
font-size: 16px;
}
.point-text{
  font-size: 30px;
  color: red;
  font-weight: bolder;
}
.width30 {
  width: 30%;
}
.width15 {
  width: 15%;
}
.text-align-left {
  text-align: left;
}
.table-bottom {
  width: 98%;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* element样式重置 start */
/* 去掉input尾部上下小箭头 start */
/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  -o-appearance: none !important;
  -ms-appearance: none !important;
  appearance: none !important;
  margin: 0;
}
/deep/ input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  -o-appearance: textfield;
  -ms-appearance: textfield;
  appearance: textfield;
}
/* 去掉input尾部上下小箭头 end */
/deep/ .el-input__suffix{
       color:#368ee0;
}
</style>
