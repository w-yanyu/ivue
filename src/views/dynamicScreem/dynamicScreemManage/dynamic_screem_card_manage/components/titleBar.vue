<template>
  <div class="title-bar" @dblclick="clickFullscreen">
    <!-- <div class="title">{{ titleName }}</div> -->
    <div class="title">{{ produtTitleName }}</div>
    <div class="time">{{ time }}</div>
    <div class="selection-bar">
      <!-- 机构筛选 -->
      <!-- <div class="titletight">
        <span class="selection-title">机构筛选</span>
        <div class="cascader-div">
          <el-cascader
            :append-to-body="false"
            :props="defaultParams"
            :options="institutionOptions"
            v-model="institutionSelected"
            :show-all-levels="false"
            class="cascader "
          ></el-cascader>
        </div>
      </div> -->
      <!-- 产品筛选 -->
      <div class="titletight" v-if="!isEditState">
        <span class="selection-title">产品筛选</span>
        <div class="cascader-div">
          <el-cascader
            class="cascader "
            :append-to-body="false"
            :props="defaultParams"
            :options="productOptions"
            v-model="productSelected"
            :show-all-levels="false"
            @change="productChange"
          ></el-cascader>
        </div>
      </div>

      <!-- 刷新频率 -->
      <div class="titletight" v-if="!isEditState">
        <span class="selection-title">刷新频率</span>
        <div class="cascader-div">
          <el-select
            v-model="refreshRateValue"
            placeholder="请选择"
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

      <!-- 布局按钮 -->
      <div class="titletight marginLeft1vw" v-if="isEditState">
        <el-tooltip
          effect="light"
          content="默认布局"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-s-grid pointer-icon"
            @click="operatorInteraction('layout')"
          ></i>
        </el-tooltip>
      </div>
      <!-- 图表超市 -->
      <div class="titletight marginLeft1vw" v-if="isEditState">
        <el-tooltip
          effect="light"
          content="图表设置"
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
          content="复位布局"
          placement="bottom"
          transition="el-fade-in-linear"
        >
          <i
            class="el-icon-refresh-left pointer-icon"
            @click="operatorInteraction('reset')"
          ></i>
        </el-tooltip>
      </div>
      <!-- 编辑按钮 -->
      <div class="titletight marginLeft1vw">
        <el-tooltip
          effect="light"
          content="大屏编辑"
          placement="bottom"
          transition="el-fade-in-linear"
          v-if="!isEditState"
        >
          <i class="el-icon-setting pointer-icon" @click="changeEditState"></i>
        </el-tooltip>
        <el-tooltip
          effect="light"
          content="退出编辑"
          placement="bottom"
          transition="el-fade-in-linear"
          v-else
        >
          <i class="el-icon-s-tools pointer-icon" @click="changeEditState"></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "title-bar",
  props: {
    titleName: {
      type: String,
      required: true
    },
    isEditState: {
      type: Boolean,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isEditState: false, //是否属于编辑状态
      produtTitleName: "民用房按揭贷款实施战况",
      time: "",
      institutionSelected: "", //机构选择器
      productSelected: "00000000001", //产品选择器
      refreshRateValue: "never", //频率选择器
      defaultParams: {
        label: "name",
        value: "id",
        children: "children"
        // expandTrigger: 'hover',
        // multiple :false
      },
      //机构选择器选项
      institutionOptions: [
        {
          id: "1",
          name: "全行"
        },
        {
          id: "2",
          name: "西安总行"
        },
        {
          id: "3",
          name: " 	西咸新区分行",
          children: [
            {
              id: "3-1",
              name: "曲江新区支行"
            },
            {
              id: "3-2",
              name: "经济技术开发区支行"
            },
            {
              id: "3-3",
              name: "高新科技支行"
            },
            {
              id: "3-4",
              name: "碑林区支行"
            },
            {
              id: "3-5",
              name: "莲湖区支行"
            },
            {
              id: "3-6",
              name: "灞桥区支行"
            }
          ]
        },
        {
          id: "4",
          name: "宝鸡分行"
        },
        {
          id: "5",
          name: "咸阳分行"
        },
        {
          id: "6",
          name: "渭南分行"
        },
        {
          id: "7",
          name: "榆林分行"
        },
        {
          id: "8",
          name: "延安分行"
        },
        {
          id: "9",
          name: "铜川分行"
        },
        {
          id: "10",
          name: "汉中分行"
        },
        {
          id: "11",
          name: "安康分行"
        },
        {
          id: "12",
          name: "商洛分行"
        }
      ],
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
          label: "不刷新"
        },
        {
          value: "half",
          label: "半小时"
        },
        {
          value: "hour",
          label: "1小时"
        }
      ],
      swiper: "",
      swiperOn: ""
    };
  },
  watch: {},
  created() {},
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  beforeDestroy() {},
  methods: {
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
    //双击显示全屏
    clickFullscreen() {
      console.log("双击显示全屏");
      this.$emit("clickFullscreen");
    },
    //刷新频率切换
    refreshRateChange(value) {
      this.$emit("refreshRateChange", value);
    },
    //产品选择切换
    productChange(value) {
      console.log("1111111", value[0]);
      this.$bus.emit("productChange", value[0]);
      this.produtTitleName =
        this.productOptions.find(item => item.id === value[0]).name +
        "实施战况";
    },
    //数字大屏编辑按钮
    changeEditState() {
      this.$emit("changeEditState");
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
  width: 100vw;
  height: 7vh;
  display: flex;
  position: relative;
}
.title {
  width: 80%;
  height: 50px;
  margin: 0 auto;
  color: #fff !important;
  font-size: 22px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.5em;
  background: url("../../../assets/title-bg.png") no-repeat center / 100%;
}
.time {
  position: absolute;
  left: 1vw;
  top: 2vh;
  height: 30px;
  color: #fff !important;
  text-align: left;
  font-weight: 800;
  line-height: 2;
  width: 33.3%;
}
.selection-bar {
  position: absolute;
  right: 1vw;
  top: 2vh;
  height: 30px;
  width: 24vw;
  display: flex;
  justify-content: flex-end;
}
.titletight {
  height: 30px;
  color: #fff;
  text-align: right;
  font-weight: 800;
  line-height: 3;
  display: flex;
  align-items: center;
  margin-right: 0.4vw;
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

/deep/ .el-cascader .el-input .el-input__inner,
/deep/ .el-select .el-input .el-input__inner {
  height: 18px !important;
  font-size: 12px;
  background: rgba(0, 65, 114, 0.5) !important;
  border: 1px solid rgba(0, 65, 114, 0.5) !important;
  color: #fff;
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
