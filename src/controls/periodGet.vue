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
            <el-col :span="2.5"> <span class="des-lable">每</span></el-col>
            <el-col :span="7"> <el-input-number v-model="num"  controls-position="right" @change="numChange" :min="1" :max="10"></el-input-number></el-col>
            <el-col :span="1"><span class="des-lable">{{period}}</span></el-col>
          </el-row>
          <el-row gutter="20">
            <el-col :span="2.5"> <span class="des-lable">工作日</span></el-col>
            <el-col :span="7">
              <el-select v-model="gzr" placeholder="请选择" >
                <el-option
                  v-for="item in gzrday"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row gutter="20" v-show="jtr_isShow" :key="1">
            <el-col :span="2.5"> <span class="des-lable">具体日</span></el-col>
            <el-col :span="7">
              <el-select v-model="jtr" placeholder="请选择" @change="jtrChange">
                <el-option
                  v-for="item in jtday"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row gutter="20" v-show="jyf_isShow" :key="3">
            <el-col :span="2.5"> <span class="des-lable">季月份</span></el-col>
            <el-col :span="7">
              <el-select v-model="jyf" placeholder="请选择" >
                <el-option
                  v-for="item in jyday"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row gutter="20" v-show="rq_isShow" :key="4">
            <el-col :span="2.5"> <span class="des-lable">日期</span></el-col>
            <el-col :span="7"><el-input v-model="riqi"  size="medium" placeholder="例：0101"></el-input></el-col>
          </el-row>
          <el-row gutter="20" v-show="ts_isShow" :key="2">
            <el-col :span="2.5"> <span class="des-lable">指定天数</span></el-col>
            <el-col :span="7"> <el-input-number v-model="daynum"  controls-position="right" @change="daynumChange" :min="1" :max="31"></el-input-number></el-col>
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
  name: "periodGet",
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
      dialogTitle: "周期选择",
      value:"",//最终值
      tempvalue:"",//拼接的值
      options: [],
      radio: 'D',
      tabView: 'select1',
      period:"天",//日期种类
      num:1,
      gzr:"A",//工作日
      jtr:"F",//具体日
      jyf:"F",//季月份
      daynum:1,//天数
      riqi:"",//日期
      jtr_isShow:false,//具体日是否显示
      ts_isShow:false,//天数是否显示
      jyf_isShow:false,//季月份是否显示
      rq_isShow:false,//日期是否显示
      gzrday:[
        {
          value:"A",
          label:"A-实际工作日"
        },
        {
          value:"N",
          label:"N-下一个工作日"
        },
        {
          value:"P",
          label:"P-上一个工作日"
        }
      ],
      jtday:[
        {
          value:"F",
          label:"F-第一天"
        },
        {
          value:"E",
          label:"E-最后一天"
        },
        {
          value:"D",
          label:"D-天数"
        }
      ],
      jyday:[
        {
          value:"F",
          label:"F-第一个月"
        },
        {
          value:"M",
          label:"M-第二个月"
        },
        {
          value:"E",
          label:"E-第三个月"
        }
      ]
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
      let item =  {
        value:"R",
        label:"R-指定日期"
      }
      console.log(_this.radio,1111)
      switch (_this.radio){
        case "D":
          _this.jtr_isShow=false;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.rq_isShow=false;
          _this.period="天";
          if(_this.jtday.length==4){
            _this.jtday.pop();
          }
          break;
        case "W":
          _this.jtr_isShow=true;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.rq_isShow=false;
          _this.period="周";
          _this.jtr="F";
          if(_this.jtday.length==4){
            _this.jtday.pop();
          }
          break;
        case "S":
          _this.jtr_isShow=true;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.rq_isShow=false;
          _this.jtr="F";
          _this.period="旬";
          if(_this.jtday.length==4){
            _this.jtday.pop();
          }
          break;
        case "M":
          _this.jtr_isShow=true;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.rq_isShow=false;
          _this.jtr="F";
          _this.period="月";
          if(_this.jtday.length==4){
            _this.jtday.pop();
          }
          break;
        case "Q":
          _this.jtr_isShow=true;
          _this.ts_isShow=false;
          _this.jyf_isShow=true;
          _this.rq_isShow=false;
          _this.jtr="F";
          _this.period="季";
          if(_this.jtday.length==4){
            _this.jtday.pop();
          }
          break;
        case "Y":
          _this.jtr_isShow=true;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.rq_isShow=false;
          _this.period="年";
          _this.jtr="F";
          if(_this.jtday.length==3){
            _this.jtday.push(item);
          }
          console.log(_this.jtday,2222);
          break;
        default:
          _this.jtr_isShow=false;
          _this.ts_isShow=false;
          _this.jyf_isShow=false;
          _this.period="天";
      }

    },
    numChange(value){
      console.log(value);
      this.num=value;
    },
    daynumChange(value){
      this.daynum=value;
    },
    /**
     * 具体日选择变化
     */
    jtrChange(){
      let _this=this
      if(_this.jtr=="D"){
        _this.ts_isShow=true;
      }else{
        _this.ts_isShow=false;
      }
      if(_this.jtr=="R"){
        _this.rq_isShow=true;
      }else{
        _this.rq_isShow=false;
      }
    },
    /**
     * 提交
     */
    submit(){
      let _this=this;
      _this.tempvalue="";
      _this.tempvalue=_this.tempvalue+_this.num+_this.radio+_this.gzr
      if(_this.radio!="D"){
        if(_this.jtr=="D"){
          _this.tempvalue= _this.tempvalue+_this.daynum
        }else if(_this.jtr=="R"){
          _this.tempvalue= _this.tempvalue+_this.riqi
        }else{
          _this.tempvalue= _this.tempvalue+_this.jtr
        }
        if(_this.radio=="Q"){
          _this.tempvalue= _this.tempvalue+_this.jyf
        }
      }

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
  border-right:solid  #368ddf; ;
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
