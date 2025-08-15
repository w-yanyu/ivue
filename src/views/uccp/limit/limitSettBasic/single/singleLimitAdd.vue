<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="限额编号">
            <el-input
              size="small"
              :disabled="true"
              v-model="normNo"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="限额名称">
            <el-input
              size="small"
              :disabled="true"
              v-model="normName"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="限额总额">
            <el-input v-model="limitAmount" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="限额起始日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              v-model="start_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" v-if="'1' == '0'">
        <el-form label-width="100px ">
          <el-form-item label="控制方式代码">
            <el-select class="selectW" size="small" :disabled="true" v-model="limit_control_way">
              <el-option v-for="(item, i) in controlList" :key=i :label="item.dictName" :value="item.dictId" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="管控措施">
            <el-select class="selectW" size="small" v-model="measures">
              <el-option v-for="(item, i) in measuresList" :key=i :label="item.dictName" :value="item.dictId" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="limit_control_way == '0'">
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="金额监控频率">
            <el-select class="selectW" size="small" v-model="amt_monitor_freq" @change="nowtime">
              <el-option v-for="(item, i) in frequencyList" :key=i :label="item.dictName" :value="item.dictId" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-if="amt_monitor_freq == '4'" :span="6">
        <el-form label-width="100px ">
          <el-form-item label="监控起始日" prop="name">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              v-model="starDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-if="amt_monitor_freq == '4'" :span="6">
        <el-form label-width="100px ">
          <el-form-item label="监控终止日" prop="name">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              v-model="endDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-if="amt_monitor_freq == '3'" :span="12">
        <el-form label-width="100px ">
          <el-form-item label="监控年份" prop="name">
            <el-input
              size="small"
              :disabled="true"
              v-model="amt_monitor_range"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-if="amt_monitor_freq == '2'" :span="12">
        <el-form label-width="100px ">
          <el-form-item label="监控季度">
            <el-select class="selectW" size="small" v-model="season">
              <el-option
                v-for="(item, i) in seasons"
                :key="i"
                :label="amt_monitor_range"
                :value="item.seasonsName"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-if="amt_monitor_freq == '1'" :span="12">
        <el-form label-width="100px ">
          <el-form-item label="监控月份">
            <el-select class="selectW" size="small" v-model="mon">
              <el-option
                v-for="(item, i) in month"
                :key="i"
                :label="amt_monitor_range"
                :value="item.monthName"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col v-if="amt_monitor_freq == '0'" :span="12">
        <el-form :rules="dayRules" label-width="100px ">
          <el-form-item prop="name" label="监控天数">
            <el-input
              size="small"
              v-model="amt_monitor_range"
              placeholder="请输入具体天数"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form label-width="100px ">
          <el-form-item label="限额状态" prop="name">
            <el-select class="selectW" size="small" v-model="limit">
              <el-option
                v-for="(item, i) in limitList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form label-width="100px ">
          <el-form-item label="限额维度">
            <el-checkbox-group v-model="defCheck" @change="changeBox">
              <el-checkbox
                v-for="(item, index) in checkBox.dimension_list"
                :key="item.limit_dimension_view_sort"
                :disabled="Number(item.dimension_must_sel)"
                :label="item.limit_dimension_name"
                class="check"
                >{{ item.limit_dimension_name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="12">
          <el-form label-width="100px ">
            <el-form-item class="xiala" v-for="(item, index) in checkBox.dimension_list" :key="index"
              v-if="checked.includes(item.limit_dimension_name)" :label=item.limit_dimension_name>
              <el-select filterable multiple class="selectW" size="small" v-model="item.selected" @change="optionChange"
               >
                <el-option v-for="(child, i) in item.selectOptions"
                  :key="i"
                  :label="child.limit_dimension_value_name"
                  :value="child.limit_dimension_value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    <div class="subBtn">
      <el-button @click="subMit" type="primary">{{$i18ns('保存')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },

  data() {
    return {
      starDate: "",
      endDate: "",
      days: "",
      season: "",
      mon: "",
      month: [
        { monthName: "循环" },
        { monthName: "一月" },
        { monthName: "二月" },
        { monthName: "三月" },
        { monthName: "四月" },
        { monthName: "五月" },
        { monthName: "六月" },
        { monthName: "七月" },
        { monthName: "八月" },
        { monthName: "九月" },
        { monthName: "十月" },
        { monthName: "十一月" },
        { monthName: "十二月" }
      ],
      seasons: [
        { seasonsName: "循环" },
        { seasonsName: "一季度" },
        { seasonsName: "二季度" },
        { seasonsName: "三季度" },
        { seasonsName: "四季度" }
      ],
      amt_monitor_freq: "",
      frequencyList: "",
      amt_monitor_range: "",
      opts: [],
      sel: [],
      measuresList: [],
      measures: "",
      controlList: [],
      limit_control_way: "",
      limit: "",
      limitList: [],
      start_date: "",
      date2: "",
      normName: "",
      checked: [],
      checkBox: [],
      defDis: [],
      defCheck: [],
      normNo: "", //限额编号
      limit_component_code: "",
      limitAmount: "",
      usedAmount: "",
      availableAmount: "",
      dimensionSettList2: []
    };
  },
  created() {
    console.log("cParentParams", this.cParentParams);
    this.normNo = this.cParentParams.norm_no; //限额编号
    this.getDictList("MS_E_YESORNO", "limitList");
    this.getDictList("UCCP_E_LIMIT_CONTORL_WAY", "controlList");
    this.getDictList("UCCP_E_LIMIT_MANAGE_WAY", "measuresList");
    this.getDictList("UCCP_E_MONITOR_FREQ", "frequencyList");
    
  },
  mounted() {
    this.initInfoData();
  },
  methods: {
    //获取后台字典
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            // console.log('获取字典回调', this[listKey])
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //获取初始化数据回显数据
    initInfoData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp5020",
        norm_no: this.normNo //限额编号
      };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        console.log("回显数据", response.data);

        (this.limit_component_code = response.data.limit_component_code),
          (this.normName = response.data.norm_name);
        this.limitAmount = response.data.limit_total_amt;
        this.start_date = response.data.start_date;
        this.limit_control_way = 1;
        this.amt_monitor_freq = response.data.amt_monitor_freq;
        this.starDate = response.data.monitor_start_date;
        this.endDate = response.data.monitor_end_date;
        this.amt_monitor_range = response.data.amt_monitor_range;
        this.availableAmount = response.data.limit_available_amt;
        this.measures = response.data.limit_manage_way;
        this.limit = response.data.valid_flag;
        let dimensionSettList=response.data.dimensionSettList;


        this.checkBox = response.data.limit_component_detail;
       
        for (let i = 0; i < this.checkBox.dimension_list.length; i++) {
          console.log(
            "this.checkBox.dimension_list[i]",
            this.checkBox.dimension_list[i]
          );

         this.checkBox.dimension_list[i]['selected']=[]// //勾选后的下拉框选择项目[[1,2,3],[1,2,3]]
         this.checkBox.dimension_list[i]["selectOptions"]=[]// //勾选后下拉框options
          //this.opts.push(this.checkBox.dimension_list[i].opts);

          console.log("this.opts.length", this.opts.length);
          //for(let i = 0; i <= this.opts.length; i++){
          //  this.opts[i] = i;
          //}

          console.log("this.opts===", this.opts);
      
           //回显已选择的下拉项目
          dimensionSettList.forEach(item => {
             if(item.limit_dimension_code===this.checkBox.dimension_list[i].limit_dimension_code)
             this.checkBox.dimension_list[i].selected.push(item.limit_dimension_value)
            });
          if (this.checkBox.dimension_list[i].opts.length != 0) {
            //如果这个checkBox的opts 有值，代表他是默认勾选
            this.defCheck.push(
              this.checkBox.dimension_list[i].limit_dimension_name
            ); //控制默认勾选
            this.checked.push(
              this.checkBox.dimension_list[i].limit_dimension_name
            ); //控制下拉框默认出现
            this.defDis.push(
              this.checkBox.dimension_list[i].limit_dimension_name
            );
          } else
            this.defDis.push(
              this.checkBox.dimension_list[i].limit_dimension_name
            ); //如果没值 那么就不默认勾选，并且点他的下拉框时要掉接口从后台拿，这个配置用来下面做判断
          this. getOptionsData(this.checkBox.dimension_list[i])
        }
      });
     
    },

    selName(val,item) {
      //参数是当前点击的下拉框的标题
      let forLength =
        this.checked.length === 1
          ? this.checked.length
          : this.checked.length - 1;
      for (let i = 0; i <= forLength; i++) {
        //遍历所有checkBOX（有几个checkbox就代表有几个下拉框）
        if (val == this.checkBox.dimension_list[i].limit_dimension_name) {
          //通过name 定位当前选的是哪个下拉框
          if (
            this.defDis.includes(val) //如果当前点的这个下拉框里 不是默认勾选，证明他的opts没值 需要掉接口拿
          ) {
            let init_url = "/SUMP/call/RPCCall";
            let init_req = {
              servicecode: "uccp5023",
              limit_dimension_code: this.checkBox.dimension_list[i]
                .limit_dimension_code
            };
            this.$http.invokeAPI(init_url, "post", init_req).then(response => {
              (this.sel = []), //每次点都清空一下，因为下拉框的配置项都放在这个容器
                (this.sel = response.data);
              console.log("sssssssssssssssssssssssssssss", response);
            });
          } else {
            console.log("若果我是否会进来", this.defDis.includes(val)); //如果是默认勾选 那么说明他本身有opts  直接塞进去
            (this.sel = []), (this.sel = this.checkBox.dimension_list[i].opts);
          }
        }
      }
    },
    //获取下拉框options
    getOptionsData(item) {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp5023",
        limit_dimension_code:item.limit_dimension_code
      };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        console.log("请求字典回调", response.data);
        item.selectOptions=response.data
        this.$forceUpdate();
        console.log(" this.checkBox.",  this.checkBox); 
      });
    
    },
    //下拉框改变
    optionChange(){
      this.$forceUpdate();
    },
    changeBox(val) {
      this.checked = val; //选中checkBox时 把name放到这个容器里
    },

    visivleChange(val) {
      //下拉框关闭时清空
      if (val) {
      } else (this.sel = []), console.log("eee", this.opts);
    },

    nowtime(value) {
      console.log("是否改变：",value);
      this.amt_monitor_range = "";
      if(3 == value){
        let nowDate = new Date();
        let date = {
          // 获取当前年
          amt_monitor_range: nowDate.getFullYear(),
        };
        this.amt_monitor_range = date.amt_monitor_range
      }
    },

    subMit() {
      console.log('this.defCheck', this.defCheck);
      for(let i = 0; i < this.defCheck.length; i++){
        console.log('aaathis.selected', this.checkBox);
        for(let j = 0; j < this.checkBox.dimension_list.length; j++){
          console.log('this.defCheck[i]', this.defCheck[i]);
          console.log('limit_dimension_name', this.checkBox.dimension_list[j].limit_dimension_name);
          if(this.defCheck[i] == this.checkBox.dimension_list[j].limit_dimension_name){
            console.log('dimension_list', this.checkBox.dimension_list[j].selected);
            for(let k = 0; k < this.checkBox.dimension_list[j].selected.length; k++){
              let dimensionSett = {
                limit_dimension_code: "", //	限额维度编号
                limit_dimension_value	: "", // 限额维度值
                limit_dimension_value_name	: "", // 限额维度值名称
                norm_no	: "", // 限额编号
              }
              dimensionSett.norm_no = this.normNo
              dimensionSett.limit_dimension_value_name = this.defCheck[i]
              dimensionSett.limit_dimension_type =this.checkBox.dimension_list[j].limit_dimension_type
              dimensionSett.limit_dimension_code = this.checkBox.dimension_list[j].selected[k]
              dimensionSett.limit_dimension_value = this.checkBox.dimension_list[j].selected[k]

              this.dimensionSettList2.push(dimensionSett);
            }
            
          }
          
        }
      }

      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp5017",
        norm_no: this.normNo,
        norm_name: this.normName,
        limit_component_code: this.limit_component_code,
        limit_control_way: this.limit_control_way,
        amt_monitor_freq: this.amt_monitor_freq,
        monitor_start_date: this.starDate,
        monitor_end_date: this.endDate,
        limit_manage_way: this.measures,
        limit_total_amt: this.limitAmount,
        start_date: this.start_date,
        limit_available_amt: this.availableAmount,
        valid_flag: this.limit,
        limit_component_type: "1",
        amt_monitor_range: this.amt_monitor_range,
        dimensionSettList: this.dimensionSettList2
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        console.log("数据提交回调", response.data);
        (this.limit_component_code = response.data.limit_component_code),
          (this.normName = response.data.norm_name);
        this.checkBox = response.data.limit_component_detail;
        this.$dataBus.doCallBack(this, init_req);
      });
    }
  }
};
</script>

<style scoped lang="less">
/deep/.el-checkbox__label {
  font-size: 13px;
}

.selectW {
  width: 100%;
}

.subBtn {
  margin-top: 30px;
  margin-bottom: 13px;
  text-align: center;
}

.el-form {
  padding: 0px !important;
}

.el-form-item {
  margin: 0;
}

.el-row {
  margin-bottom: 21px;
}

.xiala:not(:first-child) {
  margin-top: 20px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
