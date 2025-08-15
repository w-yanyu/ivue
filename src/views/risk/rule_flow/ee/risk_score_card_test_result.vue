<template>
  <div style="margin-left: -22px;" class="page_content">
    <el-form
      class="table_content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-row span="24">
        <el-col span="8">
          <el-form-item
            label="评分卡代码"
            prop="scoreCodes"
            label-width="100px"
          >
            <el-input
              class="input_el_70"
              v-model="cept.scoreCardCode"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item
            label="评分卡名称"
            prop="scoreCodeName"
            label-width="100px"
          >
            <el-input
              class="input_el_70"
              v-model="cept.scoreCardName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item
            label="总分计算方式"  
            prop="totalExecType"
            label-width="100px"
          >
            <el-select
              v-model="ruleForm.totalExecType"
              placeholder="求和"
              disabled
            >
              <!-- <el-option
                v-for="item in totalExecTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"  
              ></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row span="24">
        <el-col>
          <el-table
            class
            :data="cept.detail"
            style="width: 100%"
            show-summary
            :summary-method="setTotal"
          >
            <el-table-column
              prop="scoreModelAttribute"
              label="评分属性"
              align="center"
            ></el-table-column>



            
            <el-table-column
              prop="scoreModelName"
              label="属性名称"
              align="center"
            ></el-table-column>
              <el-table-column
              prop="inputValue"
              label="输入值"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="scoreAttributePercent"
              label="权重"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="scorePoints"
              label="评分分值"
              align="center"
            ></el-table-column>
          </el-table>
          <el-input
            type="textarea"
            class="inpudiv"
            ref="demoInput"
            v-model="responseData"
          ></el-input>
        </el-col>
      </el-row>
                
        
    </el-form>
 
     
  </div>
</template>

<script>
import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType"; //导入操作符正常值选项

export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
    cept:{type:Object},
  },
  data() {
    return {
      tableData: [],
      responseData: "",
      scoreCardCode: "",
      scoreCodeName: "",
      totalExecType: "",
      total: ["合计", "", ""],
      totalExecTypeList: [],
      ruleForm: {
        scoreCardCode: "",
        totalExecType: "",
        scoreCodeName: "",
      },
      visible: false,
    };
  },
  mounted() {

    console.log("cParentParams",  );
     
    let that = this;
    that.tableData = that.cParentParams.tableData;
    this.totalExecTypeList = totalExecTypeDictdata.data;
    that.ruleForm.scoreCardCode = that.cParentParams.scoreCardCode;
    that.responseData = that.cParentParams.responseData;
    that.total.push(that.cParentParams.total);
    that.ruleForm.scoreCodes = that.cParentParams.scoreCodes;
    that.ruleForm.scoreCodeName = that.cParentParams.scoreCodeName;
    that.ruleForm.totalExecType = that.cParentParams.totalExecType;
  },
  methods: {
    //点击复制按钮复制报文
    copy() {
    //   this.visible = true;
    //   this.$refs.demoInput.select();
    //   var mess = document.getElementById("mess");
    //   console.log("***************");
    //   console.log(mess);
    //   mess.innerText = this.responseData.toString();
    //   this.$message.success("测试报文复制到剪贴板");
        this.$dialog.open({
          that: this,
          title: "测试成功，评分卡响应数据如下：",
          toRequest: {
            url: "@riskScoreDetail",
            method: "get",
            params: {
                score_result: this.responseData
            },
          },
          width: "60%",
        });
    },
    setTotal(param) {

  let tot = 0
  this.cept.detail.forEach((item,index) => {
    tot = Number(item.scoreAttributePercent) *  Number(item.scorePoints) + tot
  })

tot = tot + ""


      const { columns, data } = param;
          const sums = [];
          console.log("====param====",param);
          columns.forEach((column, index) => {
              if (index === 0) {
                  sums[index] = '合计';
                  return;
              }
              const values = data.map(item => Number(item[column.property]));
              //if (!values.every(value => isNaN(value))) {
              //指定列名是totalAmount或amount的列，其他不统计
              if (!values.every(value => isNaN(value)) && (column.property === 'scorePoints' || column.property ==='amount')) {
                  sums[index] = values.reduce((prev, curr) => {
                      const value = Number(curr);
                      if (!isNaN(value)) {
                          return prev + curr;
                      } else {
                          return prev;
                      }
                  }, 0);
                  sums[index] += ' ';
              } else {
                  sums[index] = ' ';
              }
          });

       return ["合计",  "",  "",  "",  tot];
 
    },
    seach(label) {
      let filter = totalExecTypeDictdata.data.filter(
        (obj) => obj.label === label
      );
      return filter[0].value;
    },
  },
};
</script>

<style lang="css" scoped>
.page_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.inputItem {
  width: 100%;
}
.footForm {
  position: relative;
}
.buttonGroup {
  position: absolute;
  bottom: -30px;
}
.copyBtn {
  position: absolute;
  bottom: 0px;
  right: -2px;
}
.inpudiv {
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
}
.table_content {
  width: 100%;
  margin-bottom: 50px;
}
.input_el_70 {
  width: 150px;
}
</style>
