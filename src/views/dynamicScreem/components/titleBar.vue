<template>
  <div class="title-bar" @dblclick="clickFullscreen">
    <!-- <div class="title"><span>{{ titleName }}</span></div> -->
    <div class="title">{{ produtTitleName + $i18ns('digitalScreen.real_time_situation') }}</div>
    <div class="time" data-html2canvas-ignore="true">
      <p>{{ time }}</p>
      <p class="margin-l-8">{{ week + " " + weather }}</p>
    </div>
    <div class="selection-bar" data-html2canvas-ignore="true">
      <!-- 机构筛选 -->
      <div class="titletight width-30" v-if="!isEditState">
        <span class="selection-title">{{ $i18ns('机构') }}</span>
        <el-select
          v-model="branch_id"
          :placeholder="$i18ns('请选择')"
          class="display-flex-1"
          :popper-append-to-body="false"
          @change="branchChange"
        >
          <el-option
            v-for="(item, index) in branchList"
            :key="index"
            :label="item.dictId + '-' + item.dictName"
            :value="item.dictId"
          >
          </el-option>
        </el-select>
        <!-- <el-input
            v-model="institutionSelected"
            class="display-flex-1"
            @focus="operatorInteraction('branch')"
          >
            <i class="el-icon-search" slot="suffix" @click="operatorInteraction('branch')"
            ></i>
        </el-input> -->
      </div>
      <!-- 产品筛选 -->
      <div class="titletight width-30" v-if="!isEditState">
        <span class="selection-title">{{ this.$i18ns('digitalScreen.business_type') }}</span>
        <el-select
          v-model="busi_card_type"
          :placeholder="$i18ns('请选择')"
          class="display-flex-1"
          :popper-append-to-body="false"
          @change="productChange"
        >
          <el-option
            v-for="(item, index) in busiList"
            :key="index"
            :label="item.dictId + '-' + item.dictName"
            :value="item.dictId"
          >
          </el-option>
        </el-select>

        <!-- <el-input
          v-model="productSelected"
          class="display-flex-1"
          @focus="operatorInteraction('layout')"
        >
          <i class="el-icon-search" slot="suffix" @click="operatorInteraction('layout')"
          ></i>
        </el-input> -->

        <!-- <div class="cascader-div">
          <el-cascader
            class="cascader "
            :append-to-body="false"
            :props="defaultParams"
            :options="productOptions"
            v-model="productSelected"
            :show-all-levels="false"
            @change="productChange"
          ></el-cascader>
        </div> -->
      </div>
      <!-- 模板选择按钮 -->
      <div class="titletight marginLeft1vw" v-if="!isEditState">
        <el-tooltip
          effect="light"
          :content="this.$i18ns('digitalScreen.template_selection')"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-s-grid pointer-icon"
            @click="operatorInteraction('layout')"
          ></i>
        </el-tooltip>
      </div>

      <!-- 刷新频率 -->
      <div class="titletight" v-if="isEditState">
        <span class="selection-title">{{ $i18ns('digitalScreen.refresh_frequency') }}</span>
        <div class="cascader-div">
          <el-select
            v-model="refreshRateValue"
            :placeholder="$i18ns('请选择')"
            class="cascader"
            @change="refreshRateChange"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in refreshRateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 图表超市 -->
      <div class="titletight marginLeft1vw" v-if="isEditState">
        <el-tooltip
          effect="light"
          :content="$i18ns('digitalScreen.chart_setting')"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-pie-chart pointer-icon"
            @click="operatorInteraction('charts')"
          ></i>
        </el-tooltip>
      </div>

      <!-- 复位按钮 -->
      <div class="titletight marginLeft1vw" v-if="isEditState">
        <el-tooltip
          effect="light"
          :content="$i18ns('digitalScreen.reset_layout')"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-refresh-right pointer-icon"
            @click="operatorInteraction('reset')"
          ></i>
        </el-tooltip>
      </div>
      <!-- 编辑按钮 -->
      <div class="titletight marginLeft1vw" v-if="isEditStateShow">
        <el-tooltip
          effect="light"
          :content="$i18ns('digitalScreen.screen_editing')"
          placement="bottom"
          transition="el-fade-in-linear"
          v-if="!isEditState"
        >
          <i
            class="el-icon-setting pointer-icon"
            @click="changeEditState('edit')"
          ></i>
        </el-tooltip>
        <el-tooltip
          effect="light"
          :content="$i18ns('digitalScreen.exit_edit')"
          placement="bottom"
          transition="el-fade-in-linear"
          v-else
        >
          <i
            class="el-icon-s-tools pointer-icon"
            @click="changeEditState('esc')"
          ></i>
        </el-tooltip>
      </div>

      <div class="titletight marginLeft1vw" v-if="!isEditStateShow">
        <el-tooltip
          effect="light"
          :content="$i18ns('刷新')"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-refresh-left pointer-icon"
            @click="refreshEcharts"
          ></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "title-bar",
  props: {
    titleName: {
      type: String,
      required: true
    },
    // 编辑
    isEditState: {
      type: Boolean,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isEditStateShow: this.$store.state.dynamic_screen.isEditStateShow,
      produtTitleName: "",
      time: "",
      institutionSelected: "", //机构选择器
      productSelected: "", //产品选择器
      refreshRateValue: "never", //频率选择器
      defaultParams: {
        label: "name",
        value: "id",
        children: "children"
        // expandTrigger: 'hover',
        // multiple :false
      },
      //机构选择器选项
      institutionOptions: [],
      //产品选择器选项
      productOptions: [
        {
          id: "00000000001",
          name: "民用房按揭贷款"
        },
        {
          id: "00000000002",
          name: "企业固定资产贷款"
          // children: [
          //   {
          //     id: "2-1",
          //     name: "信用卡"
          //   },
          //   {
          //     id: "2-2",
          //     name: "存款产品"
          //   },
          //   {
          //     id: "2-3",
          //     name: "个人结算"
          //   },
          //   {
          //     id: "2-4",
          //     name: "财富管理"
          //   },
          //   {
          //     id: "2-5",
          //     name: "借记卡"
          //   },
          //   {
          //     id: "2-6",
          //     name: "个人贷款"
          //   },
          //   {
          //     id: "2-7",
          //     name: "代理产品"
          //   },
          // ]
        },
        {
          id: "00000000003",
          name: "企业流动资金贷款"
        },
        {
          id: "00000000004",
          name: "个人经营贷"
        },
        {
          id: "00000010",
          name: "新房按揭宝"
        },
        {
          id: "00003203",
          name: "个人汽车消费贷"
        }
      ],
      //刷新频率
      refreshRateOptions: [
        {
          value: "never",
          label: this.$i18ns('digitalScreen.not_refresh')
        },
        {
          value: "half",
          label: this.$i18ns('digitalScreen.half_hour')
        },
        {
          value: "hour",
          label: this.$i18ns('digitalScreen.an_hour')
        }
      ],
      swiper: "",
      swiperOn: "",
      // 位置信息
      city: "",
      city_id: "",
      city_code: "",
      location: "",
      localIp: "", // 公网ip
      // 天气
      week: "", // 星期
      weather: "", // 天气情况
      busi_card_type: "", // 业务类型
      branch_id: "", // 机构
      busiList: [], // 业务类型list
      branchList: [], // 机构list
    };
  },
  watch: {
    isEditState: {
      handler(val) {
        this.isEditState = val;
      }
    },
    "$store.state.dynamic_screen.isEditStateShow": {
      handler(val) {
        this.isEditStateShow = val;
      }
    }
  },
  created() {
    // 获取ip地址，查询天气
    fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(data => {
        this.localIp = data.ip;
        this.getWeather();
      })
      .catch(err => {
        console.error(err, "22");
        this.getWeather();
      });

    this.getDictList("CT_E_BUSI_CARD_TYPE", "busiList");
    this.getDictList("CT_E_BRANCH_CARD_TYPE", "branchList");
  },
  mounted() {
    setInterval(() => {
      this.getTime();
      this.produtTitleName =
        JSON.parse(sessionStorage.getItem("dynamicScreemModleform"))
          .template_name || "";
    }, 1000);
    this.busi_card_type =
      JSON.parse(sessionStorage.getItem("dynamicScreemModleform"))
        .busi_card_type || "";
  },
  beforeDestroy() {
    //销毁定时任务
    this.timerDestroy();
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getTime() {
      var date = new Date();
      date.getFullYear(); //获取完整的年份
      date.getMonth(); //获取当前月份
      date.getDate(); //获取当前日
      date.toLocaleTimeString(); //获取当前时间
      this.time =
        date.getFullYear() +
        "年" +
        (date.getMonth() * 1 + 1) +
        "月" +
        date.getDate() +
        "日" +
        " " +
        date.toLocaleTimeString("chinese", { hour12: false });
    },
    // 销毁定时器
    timerDestroy() {
      if (this.time) clearInterval(this.time);
    },
    // 查询天气情况
    getWeather() {
      let params = {};

      if (this.localIp) {
        params = {
          servicecode: "ct2565",
          app_name: "NG",
          city: this.city,
          city_id: this.city_id,
          city_code: this.cicity_codety,
          location: this.location,
          ip: this.localIp
        };
      } else {
        params = {
          servicecode: "ct2565",
          app_name: "NG",
          city: "深圳",
          city_id: "76",
          city_code: "101280601",
          location: "",
          ip: ""
        };
      }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.week = res.data.week;
            this.weather = res.data.weather;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //双击显示全屏
    clickFullscreen() {
      this.$emit("clickFullscreen");
    },
    // 刷新页面数据
    refreshEcharts() {},
    //刷新频率切换
    refreshRateChange(value) {
      this.$emit("refreshRateChange", value);
    },
    // 机构选择切换
    branchChange(val) {
      this.branch_id = val;
      this.$bus.$emit("branchChange", val);
    },
    //产品选择切换
    productChange(val) {
      this.busi_card_type = val;
      this.$bus.emit("productChange", val);
    },
    //数字大屏编辑按钮
    changeEditState(type) {
      this.$emit("changeEditState", type);
    },
    //布局 图表超市 复位操作
    operatorInteraction(operatorType) {
      this.$bus.emit("operatorInteraction", operatorType);
    }
  }
};
</script>

<style lang="less" scoped>
.title-bar {
  // width: 100vw;
  // height: 7vh;
  display: flex;
  position: relative;
  align-items: center;
}
.title {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  color: #fff !important;
  font-size: 22px;
  font-weight: bold;
  line-height: 80px;
  height: 80px;
  text-align: center;
  letter-spacing: 0.5em;
  background: url("../assets/title-bg.png") no-repeat center / 100%;
}
.time {
  display: flex;
  align-items: center;
  flex-direction: row;
  position: absolute;
  left: 1vw;
  color: #fff !important;
  text-align: left;
  font-weight: 800;
  line-height: 2;
  width: 33.3%;
}
.selection-bar {
  height: 100%;
  position: absolute;
  right: 1vw;
  height: 30px;
  width: 24vw;
  display: flex;
  justify-content: flex-end;
}
.titletight {
  color: #fff;
  text-align: right;
  font-weight: 800;
  line-height: 3;
  display: flex;
  align-items: center;
  margin-right: 0.4vw;
}
.width-30 {
  width: 30%;
}
.selection-title {
  margin-right: 1px;
  font-size: 12px;
  line-height: 4.5;
  margin-right: 0.4vw;
}
.cascader-div {
  width: 100px;
  line-height: 3;
  position: relative;
}
.cascader {
  position: static;
}

/deep/ .el-input .el-input--medium .el-input--suffix,
/deep/ .el-select .el-input .el-input__inner {
  height: 22px !important;
  font-size: 12px;
  background: rgba(0, 65, 114, 0.5) !important;
  border: 1px solid rgba(239, 239, 239, 0.5) !important;
  color: #fff !important;
}

/deep/ .el-cascader .el-input .el-input__inner,
/deep/ .el-input__inner {
  height: 22px !important;
  font-size: 12px;
  background: rgba(0, 65, 114, 0.5) !important;
  border: 1px solid rgba(239, 239, 239, 0.5) !important;
  color: #fff !important;
}

/deep/ .el-cascader-menu__list,
/deep/ .el-select-dropdown,
/deep/ .el-select-dropdown__item {
  background: #004172 !important;
  background-color: #004172;
  font-size: 12px;
  color: #fff;
}

/deep/ .el-cascader-menu__list .el-cascader-node .el-cascader-node__label {
  text-align: left;
}
/deep/ .el-switch__action {
  width: 17px !important;
  height: 1.6vh !important;
  top: 0 !important;
}

/deep/ .el-switch__core {
  height: 1.8vh !important;
  background: #aaa;
}

/deep/ .el-switch__core::after {
  top: -3px;
}
/deep/ .el-cascader-node:not(.is-disabled):hover {
  background: #ffffff20;
  color: #409eff !important;
}
.pointer-icon {
  cursor: pointer;
}
.marginLeft1vw {
  margin-left: 1vw;
}
</style>
