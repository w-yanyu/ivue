<template>
  <div
    class="big-screen-container"
    id="big-screen-container"
    ref="bigScreen"
    v-if="defaultPreviewData.length > 0"
  >
    <div v-if="show_big" class="screen-box">
      <dv-full-screen-container style="background-color: rgb(11, 8, 53);">
        <titleBar
          @clickFullscreen="clickFullscreen"
          @refreshRateChange="refreshRateChange"
          @changeEditState="changeEditState"
          :isEditState="isEditState"
        ></titleBar>
        <layoutContent
          :defaultPreviewData="defaultPreviewData"
          :isEditState="isEditState"
          :canvasWidth="canvasWidth"
          :canvasHeight="canvasHeight"
          ref="layoutContent"
        ></layoutContent>
      </dv-full-screen-container>
    </div>
    <div v-else class="screen-box">
      <titleBar
        @clickFullscreen="clickFullscreen"
        @refreshRateChange="refreshRateChange"
        @changeEditState="changeEditState"
        :isEditState="isEditState"
      ></titleBar>
      <layoutContent
        :defaultPreviewData="defaultPreviewData"
        :isEditState="isEditState"
        :canvasWidth="canvasWidth"
        :canvasHeight="canvasHeight"
        ref="layoutContent"
      ></layoutContent>
    </div>

    <!-- 模板编辑弹框 -->
    <el-dialog
      :title="$i18ns('yWLR')"
      class="sys-dialog"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="cancelDialog"
    >
      <el-form ref="modleForm" :model="modleForm" :rules="rules">
        <el-form-item
          :label="$i18ns('digitalScreen.screenshot')"
          :label-width="formLabelWidth"
          prop="module_img"
        >
          <el-image
            class="image-class"
            :src="modleForm.module_img"
            fit="scale-down"
          >
          </el-image>
        </el-form-item>
        <el-form-item
          :label="$i18ns('digitalScreen.is_enabled')"
          :label-width="formLabelWidth"
          prop="title_Enname"
        >
          <el-radio-group
            v-model="modleForm.is_enable"
            class="radio-group"
            :disabled="modleForm.module_img === ''"
          >
            <el-radio :label="'0'">{{ $i18ns("ZCm") }}</el-radio>
            <el-radio :label="'1'">{{ $i18ns("piv") }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">{{
          $i18ns("confirmCancel")
        }}</el-button>
        <el-button type="primary" @click="submitDialog">{{
          $i18ns("confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import fullscreen from "screenfull";
import titleBar from "./components/titleBar.vue";
import layoutContent from "./components/layoutContent.vue";
import { Loading } from "element-ui";
import html2canvas from "html2canvas";
import MyAxios from "pte-ui/utils/MyAxios";

const readyLayout = JSON.parse(
  sessionStorage.getItem("dynamicScreemModleform")
);

export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {
    titleBar,
    layoutContent
  },
  data() {
    return {
      isEditState: false, //是否属于编辑状态
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      canvasWidth: "",
      canvasHeight: "",
      isinit: false, // 是否已初始化过
      scale: {
        width: "1",
        height: "1"
      },
      show_big: false, //控制显示全屏的布局还是小屏的布局
      fullscreenTag: false,
      scaleTime: null, // 定时任务
      loading: "", //读取框
      // 编辑模板信息
      modleForm: {
        module_img: "", //图表截图
        is_enable: "", // 是否启用
        is_default: "",
        is_edit: ""
      },
      dialogFormVisible: false, //编辑确认框
      // 默认预设布局数据
      defaultPreviewData: []
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // 获取div元素的高度
      this.canvasWidth = this.$refs.bigScreen.clientWidth;
      // resize()重新绘制
      // this.$refs.bigS1.chartsResize();
      // this.$refs.bigS2.chartsResize();
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;

      this.canvasHeight = this.$refs.bigScreen.clientHeight;
      // resize()重新绘制
      // this.$refs.bigS1.chartsResize();
      // this.$refs.bigS2.chartsResize();
    },
    fullscreenTag(newvalue, oldvalue) {
      if (newvalue != oldvalue) {
        // 进行退出全屏的后的事件
      }
    }
  },
  created() {
    this.getModuleList();
  },
  mounted() {
    let that = this;
    //添加F11全屏案件监听
    window.addEventListener("keydown", that.KeyDown, true);
    window.addEventListener("resize", this.resize);
    this.$message({
      type: "info",
      message: this.$i18ns("digitalScreen.screenfull_f10")
    });
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("keydown", that.KeyDown);
    //销毁定时任务
    this.timerDestroy();
    // 移除事件监听器
    this.$bus.off("refreshMapData")
    this.$bus.off("refreshCardData")
    this.$bus.off("productChange")
    this.$bus.off("branchChange")
  },
  methods: {
    /**
     * 获取模板布局
     */
    getModuleList() {
      let params = {
        servicecode: "ct2611",
        template_id: "", //模板编号
        template_name: "", //模板名称
        role_id: "", //角色id
        role_name: "", //角色名称
        is_enable: "", //是否启用
        need_page: ""
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.defaultPreviewData = res.data;
            // 默认模板
            let arrFilter = res.data.filter(item => item.is_default == "1");
            
            // 如果有默认模板，使用默认模板，多个默认模板使用第一个；如果没有默认模板使用该角色可展示的模板第一个。
            let arr = arrFilter.length > 0 ? arrFilter : res.data;
            // 处理数据
            let str = arr[0].card_group.replace(/(=)(?=,|})/g, "$1 ");
            let str2 = str.replace(/(\w+)=([^,\]}]+)/g, '"$1":"$2"');
            let newStr = JSON.parse(str2);

            newStr.forEach(item => {
              item.w = Number(item.w);
              item.h = Number(item.h);
              item.x = Number(item.x);
              item.y = Number(item.y);
              item.moved = Boolean(item.moved);
            });
            // 刷新卡片数据
            this.$nextTick(() => {
              this.$bus.emit("refreshMapData", newStr);
              this.$bus.emit("refreshCardData", newStr)
            });
            // 判断当前用户是否对可以当前模板进行编辑
            let isEditStateShow = arr[0].is_edit === "1" ? true : false;
            this.$store.commit("SET_EDIT_SHOW", isEditStateShow);
            // 对初始化模板进行存储
            sessionStorage.setItem(
              "dynamicScreemModleform",
              JSON.stringify(arr[0])
            );
            sessionStorage.setItem(
              "dynamicScreemLayout",
              JSON.stringify(newStr)
            );
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 屏幕大小改变更新倍数
    resize() {
      let that = this;
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
      that.checkFull();
    },
    //F10切换全屏
    KeyDown(event) {
      //F10
      if (event.keyCode === 121) {
        event.returnValue = false;
        this.clickFullscreen(); // 触发全屏的按钮
      } else if (event.keyCode === 27) {
        event.returnValue = false;
        this.clickFullscreen(); // 触发全屏的按钮
      }
    },
    //全屏状态切换
    clickFullscreen() {
      if (fullscreen.enabled) {
        let element = document.getElementById("big-screen-container"); //指定全屏区域元素
        fullscreen.toggle(element); //全屏显示
        this.fullscreenTag = !this.fullscreenTag;
        this.show_big = !this.show_big;
        // this.$forceUpdate();
        // this.$nextTick(() => {
        //   this.$bus.emit('refreshCardData', JSON.parse(sessionStorage.getItem("dynamicScreemLayout")))
        // })
        // 全屏卡片数据刷新
        setTimeout(() => {
          this.$bus.emit("refreshMapData", JSON.parse(sessionStorage.getItem("dynamicScreemLayout")));
          this.$bus.emit('refreshCardData', JSON.parse(sessionStorage.getItem("dynamicScreemLayout")))
        }, 1000)

      } else {
        this.$message({
          type: "warning",
          message: this.$i18ns("digitalScreen.isnot_screenfull_f10")
        });
      }
    },
    //检查全屏状态
    checkFull() {
      const fullscreen = window.fullScreen || document.webkitIsFullScreen;
      this.fullscreenTag = fullscreen;
      return fullscreen;
    },
    //刷新数据频率改变
    refreshRateChange(refreshRateValue) {
      let time = 0;
      switch (refreshRateValue) {
        //不刷新
        case "never":
          this.timerDestroy();
          break;
        //半小时
        case "half":
          time = 30 * 60 * 1000;
          this.timerStart(time);
          break;
        //1小时
        case "hour":
          time = 60 * 60 * 1000;
          this.timerStart(time);
          break;
      }
    },
    //定时任务启动
    timerStart(time) {
      this.timerDestroy();
      //全局发送bus通知各个chart刷新数据
      this.timer = setInterval(this.$bus.emit("refreshRateData"), time);
    },
    // 销毁定时器
    timerDestroy() {
      if (this.timer) clearInterval(this.timer);
    },
    changeEditState(type) {
      if (this.isEditState && type === "esc") {
        this.layout = sessionStorage.getItem("dynamicScreemLayout")
          ? JSON.parse(sessionStorage.getItem("dynamicScreemLayout"))
          : [];
        // 至少添加一个卡片
        if (this.layout.length < 1) {
          this.$message({ message: $i18ns("digitalScreen.min_card"), type: "warning" });
          return;
        }

        // 截图
        this.loading = Loading.service();
        this.$message({
          type: "success",
          message: this.$i18ns('digitalScreen.screenshot_message')
        });
        setTimeout(() => {
          this.getSaveImage();
        }, 1000);
      }
      if (type === "edit") {
        this.isEditState = true;
      }
    },
    //拿到截图的点击方法
    getSaveImage() {
      let canvasID = document.getElementById("big-screen-container");
      let that = this;
      let a = document.createElement("a");
      html2canvas(canvasID).then(canvas => {
        // 获取到canvas
        canvas.toBlob(blob => {
          //当前用户信息
          let userInfo = JSON.parse(localStorage.getItem("user_info"));
          // 将二进制对象的内容 转成file
          const file = new File([blob], Date.now() + ".png", {
            type: "image/png"
          });
          // formData插入file相关数据
          const formData = new FormData();
          formData.append("file", file);
          formData.append("org_id", userInfo.org_id);
          // 发起请求
          MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData)
            .then(res => {
              if (res && res.code === "200") {
                this.modleForm.module_img = res.data.path;
                this.loading.close();
                this.dialogFormVisible = true;
              } else {
                this.$message({
                  type: "error",
                  message: this.$i18ns('digitalScreen.upload_fail')
                });
              }
            })
            .catch(err => {
              console.error(err);
            });
        }, "image/png");
      });
    },
    // 确认编辑
    submitDialog() {
      let form = sessionStorage.getItem("dynamicScreemModleform")
        ? JSON.parse(sessionStorage.getItem("dynamicScreemModleform"))
        : {};
      const that = this;

      this.$refs.modleForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "ct2609",
            template_id: form.template_id || "", //模板编号
            template_name: form.template_name || "", //模板名称
            role_id: form.role_id || "", //角色id
            role_name: form.role_name || "", //角色名称
            card_group: this.layout || [], //卡片组
            card_img: this.modleForm.module_img || "", //卡片图片
            card_operate_flg: 2, //1角色维护 2用户维护
            is_enable: this.modleForm.is_enable || "", //是否启用 1是 0否
            remark: "", //备注
            is_default: form.is_default || "", //是否默认模板 1是 0否
            is_edit: form.is_edit || "" //是否可编辑 1是 0否
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                this.$message({
                  type: "success",
                  message: this.$i18ns(res.message)
                });
                //关闭当前对话框
                that.isEditState = false;
                that.dialogFormVisible = false;
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    // 取消编辑
    cancelDialog() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
.big-screen-container {
  width: 100%;
  height: 100%;
  background-color: rgb(11, 8, 53);
  box-shadow: 0px 2px 5px rgba(18, 32, 231, 0.788);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  .screen-box {
    width: 100%;
  }
}
.image-class {
  display: block;
}
</style>
