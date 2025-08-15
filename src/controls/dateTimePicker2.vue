<template>
  <!-- type="dateTimePicker " -->
  <!-- ref="elDatePicker" -->
<!--  :picker-options="config.disabledDate ? pickerOptions : ''"-->
  <div>
    <el-date-picker
      :ref="name"
      v-model="value"
      :readonly="config.readonly"
      :disabled="config.disabled"
      :format="dateTimePickerFormat(config) || null"
      :value-format="dateTimePickerValueFormat(config)"
      :clearable="typeof(config.clearable) === 'boolean' ? config.clearable : true"
      :size="size"
      :name="name"
      :type="dateType || 'date'"
      :picker-options="config.disabledDate ? pickerOptions : ''"
      :start-placeholder="$i18ns(config.startPlaceholder || '')"
      :end-placeholder="$i18ns(config.endPlaceholder || '')"
      :unlink-panels="config.unlinkPanels"
      :placeholder="$i18ns(config.placeholder || '')"
      @blur="handleChangeBlur"
      :default-time="config.defaultTime"
    ></el-date-picker>
<!--    <el-button type="primary" @click="handleButtonClick" >永久生效</el-button>-->
  </div>

</template>

<script>
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";
import SysConfig from "@/pte/sysconfig.json";
// 远程下拉选择，
export default {
  name: "dateTimePicker2",
  props: {
    size: {
      type: String,
      default: "small"
    }, // 控件大小
    config: Object, // 控件的相关配置
    name: String,
    value: [Object, String, Number, Array]
  },
  components: {},
  data() {
    return {
      dateType: "",
      pickerOptions: {
        disabledDate: this.disabledDate,
        time:'',
        shortcuts: []
      }
    };
  },
  computed: {
    systemDate() {
      return this.$store.state.pte_user.systemDate;
    }
  },
  watch: {
    value: {
      handler(val) {
        this.initTime();
        if (this.config.startField && this.config.endField && val) {
          this.$emit("upDataValue", {
            [this.config.startField]: val[0],
            [this.config.endField]: val[1]
          });
        }
        if (val === undefined || val === null) {
          this.$emit("upDataValue", {
            [this.config.startField]: "",
            [this.config.endField]: ""
          });
        }
        this.$emit("input", val);
      },
      deep: true
    }
  },
  created() {
    //处理可编辑表格的dataType
    if (this.config.type === "dateTimePicker") {
      this.dateType = this.config.dataType || "";
    } else {
      this.dateType = this.config.type || this.config.dataType;
    }
    if (this.config.startField && this.config.endField) {
      let initdata = this.$dataBus.getCurrentInitData(this);
      if (
        JSON.stringify(initdata) !== "{}" &&
        initdata[this.config.startField] &&
        initdata[this.config.endField]
      ) {
        let temp = [];
        temp.push(initdata[this.config.startField]);
        temp.push(initdata[this.config.endField]);
        this.$emit("input", temp);
      }
      this.$emit("upDataValue", {
        [this.config.startField]: this.value[0] || "",
        [this.config.endField]: this.value[1] || ""
      });
    }
    this.initTime();
    console.log("config",this.config);
    //初始化日期控件的按钮
    this.selectTimeButton();
  },
  methods: {
    initTime() {
      // 设置默认值为今天
      // if (Array.isArray(this.value)) {
      //   let newDate = []
      //   for (let key in this.value) {
      //     if (this.value[key] === "today") {
      //       newDate[key] = this.dateFormat(
      //         this.dateTimePickerValueFormat(this.config),
      //         new Date()
      //       );
      //     } else {
      //       newDate[key] = this.value[key]
      //     }
      //   }
      //   this.$emit("input", newDate)
      // } else {
      //   if (this.value === "today") {
      //     this.$emit("input", this.dateFormat(
      //         this.dateTimePickerValueFormat(this.config),
      //         new Date()
      //       ));
      //   }
      // }
      if (Array.isArray(this.value)) {
        for (let key in this.value) {
          if (new RegExp(/^today/).test(this.value[key])) {
            this.value[key] = this.getTodayRangeDate(this.value[key]);
          }
        }
      } else {
        if (new RegExp(/^today/).test(this.value)) {
          this.value = this.getTodayRangeDate(this.value);
        }
      }
    },
    getTodayRangeDate(val) {
      // 获取以当前时间范围
      if (val === "today") {
        let newVal = this.dateFormat(
          this.dateTimePickerValueFormat(this.config),
          new Date()
        );
        return newVal;
      } else {
        let newVal = "";
        if (new RegExp(/^today\s*\-/).test(val)) {
          let num = parseInt(val.replace(/^today\s*\-\s*/g, ""));
          newVal = this.dateFormat(
            this.dateTimePickerValueFormat(this.config),
            new Date(new Date().getTime() - num * 24 * 60 * 60 * 1000)
          );
        } else if (new RegExp(/^today\s*\+/).test(val)) {
          let num = parseInt(val.replace(/^today\s*\+\s*/g, ""));
          newVal = this.dateFormat(
            this.dateTimePickerValueFormat(this.config),
            new Date(new Date().getTime() + num * 24 * 60 * 60 * 1000)
          );
        }
        return newVal;
      }
    },
    dateTimePickerFormat(config) {
      // dateTimePicker展示格式化
      let fmt = "yyyy-MM-dd";
      let sysConfigFormat = _.get(SysConfig, "systemDateFormat.format"); // 系统format
      if (config.format) {
        fmt = config.format;
      } else if (this.dateType) {
        fmt = this.returnDateType(fmt);
      } else if (sysConfigFormat) {
        // 显示日期格式是系统配置的格式
        fmt = sysConfigFormat;
      }
      return fmt;
    },
    dateTimePickerValueFormat(config) {
      // dateTimePicker提交格式化
      let valueFormat = "yyyy-MM-dd";
      let sysConfigValueFormat = _.get(
        SysConfig,
        "systemDateFormat.valueFormat"
      ); // 系统valueFormat
      let sysConfigFormat = _.get(SysConfig, "systemDateFormat.format"); // 系统format
      if (config.valueFormat) {
        valueFormat = config.valueFormat;
      } else if (config.format) {
        valueFormat = config.format;
      } else if (this.dateType) {
        valueFormat = this.returnDateType(valueFormat);
      } else if (sysConfigValueFormat) {
        // 如果有系统valueFormat的话用系统valueFormat
        valueFormat = sysConfigValueFormat;
      } else if (sysConfigFormat) {
        // 如果有系统format的话用系统format
        valueFormat = sysConfigFormat;
      }
      return valueFormat;
    },
    returnDateType(format) {
      // 根据this.dateType设置format的格式
      let type = this.dateType;
      if (type === "year") format = "yyyy";
      if (type === "month") format = "yyyy-MM";
      if (type === "week") format = this.$i18ns("PTE_week");
      if (type === "datetime") format = "yyyy-MM-dd HH-mm-ss";
      if (type === "datetimerange") format = "yyyy-MM-dd HH-mm-ss";
      if (type === "daterange") format = "yyyy-MM-dd";
      return format;
    },
    disabledDate(time) {
      if (this.config.disabledDate === "dateBefore") {
        return this.systemDate
          ? time.getTime() < new Date(this.systemDate)
          : time.getTime() < Date.now();
      } else if (this.config.disabledDate === "dateAfter") {
        return this.systemDate
          ? time.getTime() < new Date(this.systemDate)
          : time.getTime() > Date.now();
      } else if (_.isPlainObject(this.config.disabledDate)) {
        let startVal = _.get(this.config, "disabledDate.startRange", "");
        let endVal = _.get(this.config, "disabledDate.endRange", "");
        startVal = Tools.resolveStringTemplate(
          startVal,
          {},
          {},
          {},
          {},
          this.$dataBus.getCurrentScope(this),
          {}
        );
        endVal = Tools.resolveStringTemplate(
          endVal,
          {},
          {},
          {},
          {},
          this.$dataBus.getCurrentScope(this),
          {}
        );
        return this.handleSystemTime(time, startVal, endVal);
      } else {
        console.log("没有逻辑");
      }
    },
    // 检查是否存在系统日期
    handleSystemTime(time, start, end) {
      // 是否存在系统当前时间，默认是世界当前时间
      let userInfo = this.$store.state.pte_user.userInfo;
      let startVal =
        start.indexOf("$g") > -1
          ? Tools.parseDynamicString(start, userInfo)
          : start;
      let endVal =
        end.indexOf("$g") > -1 ? Tools.parseDynamicString(end, userInfo) : end;
      if(this.config.type === "date" || this.config.type === undefined){
        if (startVal.length === 8) {
          startVal = this.formatNewDate(startVal);
        } else {
          startVal = this.transferDM(startVal);
        }
        if (endVal.length === 8) {
          endVal = this.formatNewDate(endVal);
        } else {
          endVal = this.transferDM(endVal);
        }
      }
      if(this.config.valueFormat === "timestamp" && /^\d+$/.test(startVal)){
        startVal = parseInt(startVal);
      }
      let startTime = startVal ? new Date(startVal) : new Date();
      let endTime = endVal ? new Date(endVal) : new Date();
      return (
        time.getTime() <= startTime.getTime() - 24 * 60 * 60 * 1000 ||
        time.getTime() > endTime.getTime()
      );
    },
    //转换日期格式，因为new Date("yyyyMMdd")无法转换为正确日期
    formatNewDate(dateval) {
      let valFormat = this.dateTimePickerValueFormat(this.config);
      let match = /^\d+$/.test(dateval);
      if (match) {
        if (valFormat === "yyyyMMdd") {
          dateval = this.formatYMD(dateval);
        } else {
          if (valFormat === "ddMMyyyy") {
            dateval = this.formatDMY(dateval);
          }
        }
      }
      return dateval;
    },
    //yyyyMMdd转化成yyyy-MM-dd
    formatYMD(dateVal) {
      let y = dateVal.substr(0, 4);
      let m = dateVal.substr(4, 2);
      let d = dateVal.substr(6, 2);
      dateVal = y + "-" + m + "-" + d;
      return dateVal;
    },
    //ddMMyyyy转化成dd-MM-yyyy
    formatDMY(dateVal) {
      let d = dateVal.substr(0, 2);
      let m = dateVal.substr(2, 2);
      let y = dateVal.substr(4, 4);
      dateVal = y + "-" + m + "-" + d;
      return dateVal;
    },
    //将dd-MM-yyyy转化成yyyy-MM-dd,因为new Date("15-12-2020")无法转换为正确日期
    transferDM(dateVal) {
      let match = /.*\d{4}$/.test(dateVal);
      if (dateVal.length > 8 && match) {
        let d = dateVal.substr(0, 2);
        let m = dateVal.substr(3, 2);
        let y = dateVal.substr(6, 4);
        dateVal = y + "-" + m + "-" + d;
      }
      return dateVal;
    },
    dateFormat(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return fmt;
    },
    handleChangeBlur(val) {
      this.$emit("PTE_BLUR", val, true);
    },
    /**
     * g给当前日期控件添加按钮
     */
    selectTimeButton(){
      let that = this;
      that.pickerOptions.shortcuts = [ {
        text: "最大日期",
        onClick(vm) {
          //获取json页面返回有效日期范围
          console.log("config---",that);
          let endDate = that.config.disabledDate.endRange;
          let year = endDate.substring(0,4);
          let month = endDate.substring(4,6);
          let day = endDate.substring(6,8);
          var date=new Date(year-1, month, day);
          vm.$emit('pick', date);
        },
      },]
    }
  }
};
</script>
