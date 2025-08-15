<template>
    <div>
      <el-input v-model="value" width="widnum"></el-input>
      <span class="el-input__suffix" @click="dialogVisible=true">
          <span class="el-input__suffix-inner">
            <i class="el-icon-zoom-in"></i>
          </span>
      </span>
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :title="dialogTitle"
        :modal-append-to-body="false"
        :append-to-body="true"
      >
        <el-container>
          <el-aside width="150px">
            <el-radio-group v-model="radio" size="small" @change="radioChange">
              <el-radio label="D">天</el-radio>
              <el-radio label="W">周</el-radio>
              <el-radio label="S">旬</el-radio>
              <el-radio label="M">月</el-radio>
              <el-radio label="Q">季</el-radio>
              <el-radio label="Y">年</el-radio>
            </el-radio-group>
          </el-aside>
          <!-- tab内容 -->
          <el-main>
            <el-row gutter="20" >
              <el-col :span="2.5"> <span class="des-lable">期限:</span></el-col>
              <el-col :span="7"> <el-input-number v-model="num"  controls-position="right" @change="numChange" :min="1"></el-input-number></el-col>
              <el-col :span="1"><span class="des-lable">{{period}}</span></el-col>
            </el-row>
          </el-main>
        </el-container>
        <div class="footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: "timeLimit",
    components: {},
    props: {
      size: {
        type: String,
        default: "small"
      }, // 控件大小
      config: Object, // 控件的相关配置
      name: String,
      value: [Object, String, Array, Number]
    },
    data() {
      return {
        widnum:this.config.width,
        dialogVisible: false,
        dialogWidth: "80%",
        dialogTitle: "期限",
        value:"",//最终值
        tempvalue:"",//拼接的值
        options: [],
        radio: 'D',
        period:"天",//日期种类
        num:1,
        daynum:1//天数
      };
  
    },
    watch: {
      value(newVal, oldVal) {
        //将选择的周期赋给输入框
        this.$emit("input", this.value);
      }
    },
    methods: {
      /**
       * radio切换事件
       */
      radioChange(){
        let _this = this;
        switch (_this.radio){
          case "D":
            _this.period="天";
            break;
          case "W":
            _this.period="周";
            break;
          case "S":
            _this.period="旬";
            break;
          case "M":
            _this.period="月";
            break;
          case "Q":
            _this.period="季";
            break;
          case "Y":
            _this.period="年";
            break;
          default:
            _this.period="天";
        }
  
      },
      numChange(value){
        this.num=value;
      },
      /**
       * 提交
       */
      submit(){
        let _this=this;
        _this.tempvalue="";
        _this.tempvalue=_this.tempvalue+_this.num+_this.radio;
        _this.value= _this.tempvalue;
        _this.tempvalue="";
        _this.dialogVisible=false;
      },
      cancel(){
        let _this=this;
        _this.tempvalue="";
        _this.dialogVisible=false;
      }
    }
  }
  </script>
  
  <style scoped>
  .el-row {
    margin-bottom: 20px;
    margin-left: 0 !important;
    margin-right:0 !important;
  }
  el-row:last-child {
    margin-bottom: 0;
  
  }
  .el-col {
    border-radius: 4px;
  }
  .des-lable{
    display: block;
    width: 60px;
    line-height:200% ;
    text-align: center;
  }
  .el-radio{
    display: block;
    white-space: normal;
    margin-right: 0;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-container{
    flex-direction:row!important;
    padding: 10px!important;
  }
  .el-aside{
    border-right:solid  #368ddf; 
    display: block;
  }
  .footer{
    display:block;
    text-align: center;
  }
  .el-input__suffix{
    background: #368ddf;
    height: 100%;
    width: 10%;
    border-radius: 10%;
    text-align: center;
    right: 0!important;
  }
  .el-input__suffix i{
    line-height: 200%;
  }
  </style>
  