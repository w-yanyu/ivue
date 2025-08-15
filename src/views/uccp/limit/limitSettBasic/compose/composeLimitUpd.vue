<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px ">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_no')">
            <el-input
              size="small"
              :disabled="true"
              v-model="form.normNo"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_name')">
            <el-input
              size="small"
              :disabled="true"
              v-model="form.normName"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_amount')" prop="limitAmount">
            <el-input v-model="form.limitAmount" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Start_date')" prop="start_date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              v-model="form.start_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_control_way')" prop="limit_control_way">
            <el-select
              class="selectW"
              size="small"
              v-model="form.limit_control_way"
            >
              <el-option
                v-for="(item, i) in controlList"
                :key="i"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_measures')" prop="measures">
            <el-select class="selectW" size="small" v-model="form.measures">
              <el-option
                v-for="(item, i) in measuresList"
                :key="i"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.limit_control_way == '0'">
        <el-col :span="12">
          <el-form-item :label="$i18ns('T302.Limit_monitor_freq')" prop="amt_monitor_freq">
            <el-select
              class="selectW"
              size="small"
              v-model="form.amt_monitor_freq"
              @change="nowtime"
            >
              <el-option
                v-for="(item, i) in frequencyList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.amt_monitor_freq == '4'" :span="6">
          <el-form-item :label="$i18ns('T302.Limit_monitor_startdt')" prop="starDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.starDate"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col v-if="form.amt_monitor_freq == '4'" :span="6">
          <el-form-item :label="$i18ns('T302.Limit_monitor_enddt')" prop="endDate">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.endDate"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col v-if="form.amt_monitor_freq == '3'" :span="12">
          <el-form-item :label="$i18ns('T302.Limit_monitor_year')" prop="amt_monitor_range">
            <el-input
              size="small"
              :disabled="true"
              v-model="form.amt_monitor_range"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col v-if="form.amt_monitor_freq == '2'" :span="12">
          <el-form-item :label="$i18ns('T302.Limit_monitor_season')" prop="amt_monitor_range">
            <el-select
              class="selectW"
              size="small"
              v-model="form.amt_monitor_range"
            >
              <!-- <el-option
                v-for="(item, i) in seasons"
                :key="i"
                :label="item.distLabel"
                :value="item.distValue"
              /> -->
              <el-option
                v-for="(item, i) in seasonList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="form.amt_monitor_freq == '1'" :span="12">
          <el-form-item :label="$i18ns('T302.Limit_monitor_month')" prop="amt_monitor_range">
            <el-select
              class="selectW"
              size="small"
              v-model="form.amt_monitor_range"
            >
             <!-- <el-option
                v-for="(item, i) in month"
                :key="i"
                :label="item.distLabel"
                :value="item.distValue"
              /> -->
              <el-option
                v-for="(item, i) in monthList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col v-if="form.amt_monitor_freq == '0'" :span="12">
          <el-form-item prop="amt_monitor_range" :label="$i18ns('T302.Limit_monitor_date')">
            <el-input
              size="small"
              v-model="form.amt_monitor_range"
              placeholder="请输入具体天数"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="有效标识" prop="limit">
            <el-select class="selectW" size="small" v-model="form.limit">
              <el-option
                v-for="(item, i) in limitList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row>
        <el-col :span="24">
          <el-form-item :label="$i18ns('T302.Limit_dimension')">
            <el-checkbox-group v-model="form.defCheck" @change="changeBox">
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
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item
            class="xiala"
            v-for="(item, index) in form.dimension_list"
            :key="index"
            v-if="checked.includes(item.limit_dimension_name)"
            :label="item.limit_dimension_name"
            :prop="'dimension_list.' + index + '.selected'"
            :rules=" [{required: true, message: `请选择`, trigger: 'change' }]"
          >
            <el-select
              filterable
              multiple
              class="selectW"
              size="small"
              v-model="item.selected"
              @change="optionChange"
            >
              <el-option
                v-for="(child, i) in item.selectOptions"
                :key="i"
                :label="child.limit_dimension_value_name"
                :value="child.limit_dimension_value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
      限额编号:this.$i18ns("限额编号"),
      限额名称:this.$i18ns("限额名称"),
      限额总额:this.$i18ns("限额总额"),
      起始日期:this.$i18ns("起始日期"),
      控制方式:this.$i18ns("控制方式"),
      管控措施:this.$i18ns("管控措施"),
      监控频率:this.$i18ns("监控频率"),
      监控起始日:this.$i18ns("监控起始日"),
      监控终止日:this.$i18ns("监控终止日"),
      监控年份:this.$i18ns("监控年份"),
      监控季度:this.$i18ns("监控季度"),
      监控月份:this.$i18ns("监控月份"),
      监控天数:this.$i18ns("监控天数"),
      限额维度:this.$i18ns("限额维度"),

      days: "",
      month: [
        {
          distValue: "0",
          distLabel: "循环"
        },
        {
          distValue: "1",
          distLabel: "一月"
        },
        {
          distValue: "2",
          distLabel: "二月"
        },
        {
          distValue: "3",
          distLabel: "三月"
        },
        {
          distValue: "4",
          distLabel: "四月"
        },
        {
          distValue: "5",
          distLabel: "五月"
        },
        {
          distValue: "6",
          distLabel: "六月"
        },
        {
          distValue: "7",
          distLabel: "七月"
        },
        {
          distValue: "8",
          distLabel: "八月"
        },
        {
          distValue: "9",
          distLabel: "九月"
        },
        {
          distValue: "10",
          distLabel: "十月"
        },
        {
          distValue: "11",
          distLabel: "十一月"
        },
        {
          distValue: "12",
          distLabel: "十二月"
        }
      ],
      seasons: [
        {
          distValue: "0",
          distLabel: "循环"
        },
        {
          distValue:"1",
          distLabel:"一季度"
        },
        {
          distValue:"2",
          distLabel:"二季度"
        },
        {
          distValue:"3",
          distLabel:"三季度"
        },
        {
          distValue:"4",
          distLabel:"四季度"
        },
      ],
      frequencyList: "",
      opts: [],
      sel: [],
      measuresList: [],
      controlList: [],
      seasonList: [],
      monthList: [],
      date2: "",
      checked: [],
      checkBox: [],
      defDis: [],
      limit_component_code: "",
      limit_component_type: "",
      usedAmount: "",
      availableAmount: "",
      dimensionSettList2: [],
      form: {
        normNo: "", //限额编号
        normName: "",
        limitAmount: "",
        start_date: "",
        limit_control_way: "",
        measures: "",
        amt_monitor_freq: "",
        starDate: "",
        endDate: "",
        amt_monitor_range: "",
        limit: "",
        defCheck: [],
        season: "",
        mon: "",
        dimension_list:[]
      },
      rules: {
        limitAmount: [
          { required: true, message: "请输入限额总额", trigger: blur }
        ],
        start_date: [
          { required: true, message: "请输入限额起始日", trigger: blur }
        ],
        limit_control_way: [
          { required: true, message: "请选择控制方式代码", trigger: blur }
        ],
        measures: [
          { required: true, message: "请选择管控措施", trigger: blur }
        ],
        amt_monitor_freq: [
          { required: true, message: "请选择金额监控频率", trigger: blur }
        ],
        starDate: [
          { required: true, message: "请选择日期", trigger: blur }
        ],
        endDate: [
          { required: true, message: "请选择日期", trigger: blur }
        ],
        amt_monitor_range: [
          { required: true, message: "请输入限额监控区间", trigger: blur }
        ]
      }
    };
  },
  created() {
    console.log("cParentParams", this.cParentParams);
    console.log("cParentParams", this.cParentParams.limit_component_type);
    this.form.normNo = this.cParentParams.norm_no; //限额编号
    //this.getDictList("UCCP_E_VALID_FLAG", "limitList");
    // this.getDictList("UCCP_E_LIMIT_CONTORL_WAY", "controlList");
    // this.getDictList("UCCP_E_LIMIT_MANAGE_WAY", "measuresList");
    this.getDictList("UCCP_E_MONITOR_FREQ", "frequencyList");
    this.getDictList("UCCP_E_SEASON", "seasonList");
    this.getDictList("UCCP_E_MONTH", "monthList");
    this.limit_component_type = this.cParentParams.limit_component_type;
  },
  mounted() {
    this.initInfoData();
  },
  methods: {
    getComponentList(limit_component_code) {
      let params = {
        limit_component_code: limit_component_code,
        servicecode: "uccp4013",
        appId: "uccpOnl"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          console.log("res===", res);
          if (res && res.code === "200") {
            this.controlList = res.data.controlList;
            this.measuresList = res.data.manageList;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //获取后台字典
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log("获取字典回调1111", res.data);
            this[listKey] = res.data;
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
        norm_no: this.form.normNo //限额编号
      };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        console.log("回显数据", response.data);

        this.getComponentList(response.data.limit_component_code);

        (this.limit_component_code = response.data.limit_component_code),
          (this.form.normName = response.data.norm_name);
        if(response.data.limit_total_amt !== ''){
          this.form.limitAmount =response.data.limit_total_amt? response.data.limit_total_amt.replace(
            /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
            "$1,"
          ):'';
          }
        this.form.start_date = response.data.start_date;
        this.form.limit_control_way = response.data.limit_control_way;
        this.form.amt_monitor_freq = response.data.amt_monitor_freq;
        this.form.starDate = response.data.monitor_start_date;
        this.form.endDate = response.data.monitor_end_date;
        this.form.amt_monitor_range = response.data.amt_monitor_range;
        this.form.availableAmount = response.data.limit_available_amt;
        this.form.measures = response.data.limit_manage_way;
        this.form.limit = response.data.valid_flag;
        let dimensionSettList = response.data.dimensionSettList;

        this.checkBox = response.data.limit_component_detail;

        for (let i = 0; i < this.checkBox.dimension_list.length; i++) {
          console.log(
            "this.checkBox.dimension_list[i]",
            this.checkBox.dimension_list[i]
          );

          this.checkBox.dimension_list[i]["selected"] = []; // //勾选后的下拉框选择项目[[1,2,3],[1,2,3]]
          this.checkBox.dimension_list[i]["selectOptions"] = []; // //勾选后下拉框options
          //this.opts.push(this.checkBox.dimension_list[i].opts);

          console.log("this.opts.length", this.opts.length);
          //for(let i = 0; i <= this.opts.length; i++){
          //  this.opts[i] = i;
          //}

          console.log("this.opts===", this.opts);

          //回显已选择的下拉项目
          dimensionSettList.forEach(item => {
            if (
              item.limit_dimension_code ===
              this.checkBox.dimension_list[i].limit_dimension_code
            )
              this.checkBox.dimension_list[i].selected.push(
                item.limit_dimension_value
              );
          });
          if (this.checkBox.dimension_list[i].opts.length != 0) {
            //如果这个checkBox的opts 有值，代表他是默认勾选
            this.form.defCheck.push(
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
          this.getOptionsData(this.checkBox.dimension_list[i]);
        }
      });
    },

    selName(val, item) {
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
        limit_dimension_code: item.limit_dimension_code
      };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        console.log("请求字典回调", response.data);
        item.selectOptions = response.data;
        this.$forceUpdate();
        console.log(" this.checkBox.", this.checkBox);
        this.form.dimension_list=[]
        this.checkBox.dimension_list.forEach(item=>{
          this.form.dimension_list.push({...item, key: Date.now()})
        })
      });
    },
    //下拉框改变
    optionChange() {
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
      console.log("是否改变：", value);
      this.form.amt_monitor_range = "";
      if (3 == value) {
        let nowDate = new Date();
        let date = {
          // 获取当前年
          amt_monitor_range: nowDate.getFullYear()
        };
        this.form.amt_monitor_range = date.amt_monitor_range;
      }
    },

    subMit() {
      let that=this
      console.log("this.defCheck", this.form.defCheck);
      this.$refs.form.validate(valid => {
        console.log("表单验证结果", valid);
        if (valid) {
          this.checkBox.dimension_list=this.form.dimension_list
          for (let i = 0; i < this.form.defCheck.length; i++) {
            console.log("aaathis.selected", this.checkBox);
            for (let j = 0; j < this.checkBox.dimension_list.length; j++) {
              console.log("this.defCheck[i]", this.form.defCheck[i]);
              console.log("limit_dimension_name", this.checkBox.dimension_list[j].limit_dimension_name);
              if (this.form.defCheck[i] ==this.checkBox.dimension_list[j].limit_dimension_name) {
                console.log("dimension_list",this.checkBox.dimension_list[j].selected);
                for (let k = 0; k < this.checkBox.dimension_list[j].selected.length;k++) {
                  let dimensionSett = {
                    limit_dimension_code: "", //	限额维度编号
                    limit_dimension_value: "", // 限额维度值
                    limit_dimension_value_name: "", // 限额维度值名称
                    norm_no: "" // 限额编号
                  };
                  dimensionSett.norm_no = this.form.normNo;
                  // dimensionSett.limit_dimension_value_name = this.form.dimension_list[i];
                  dimensionSett.limit_dimension_value_name =  this.checkBox.dimension_list[j].selectOptions.find(item=>item.limit_dimension_value===this.checkBox.dimension_list[j].selected[k]).limit_dimension_value_name
                  dimensionSett.limit_dimension_type = this.checkBox.dimension_list[j].limit_dimension_type;
                  dimensionSett.limit_dimension_code = this.checkBox.dimension_list[j].selected[k];
                  dimensionSett.limit_dimension_value = this.checkBox.dimension_list[j].selected[k];
                  

                  this.dimensionSettList2.push(dimensionSett);
                  console.log("48546644",this.dimensionSettList2);
                }
              }
            }
          }
          let init_url = "/SUMP/call/RPCCall";
          let init_req = {
            servicecode: "uccp5017",
            norm_no: this.form.normNo,
            norm_name: this.form.normName,
            limit_component_code: this.limit_component_code,
            limit_control_way: this.form.limit_control_way,
            amt_monitor_freq: this.form.amt_monitor_freq,
            monitor_start_date: this.form.starDate,
            monitor_end_date: this.form.endDate,
            limit_manage_way: this.form.measures,
            limit_total_amt: this.form.limitAmount.replace(/[,]/g,""),
            start_date: this.form.start_date,
            limit_available_amt: this.form.availableAmount,
            valid_flag: this.form.limit,
            limit_component_type: this.limit_component_type,
            amt_monitor_range: this.form.amt_monitor_range,
            dimensionSettList: this.dimensionSettList2
          };

          this.$http.invokeAPI(init_url, "post", init_req).then(response => {
            console.log("数据提交回调", response.data);
            (this.limit_component_code = response.data.limit_component_code),
              (this.form.normName = response.data.norm_name);
            this.checkBox = response.data.limit_component_detail;
            this.$dataBus.doCallBack(this, init_req);
          });
        }
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
