<template>
  <div class="credit-html" >
    <div v-html="htmldata"></div>
    <div class="credit-watermark" :style="watermarkStyle"></div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "credit_application_view.",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      htmldata: "",
      watermarkUrl: "", // 水印base64路径
      content: "", // 水印文字
      watermarkStyle: {
        background: "",
      }
    }
  },
  created() {
    this.view();
  },
  mounted() {
    this.content = this.$moment(new Date()).format('YYYY/MM/DD') + " " + JSON.parse(localStorage.getItem("user_info")).userName;
    this.watermarkUrl = this.svgWM({content: this.content});
    this.watermarkStyle.background = `url('${this.watermarkUrl}')`;
  },
  methods: {
    /**
     * 获取页面展示信息
     */
    view(){
      let params = {
        applid: this.cParentParams.applid,
        servicecode: "qrcrde",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
        this.htmldata=res.data.tdzxview;
        }
      }).catch(err => {
        console.error(err);
      })
    },
    svgWM({ 
      content = '请勿外传',
      width = '300px',
      height = '200px',
      opacity = '0.2',
      fontSize = '20px',
      zIndex = 1000
    } = {}) {
      const svgStr = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <text x="50%" y="50%" dy="12px" text-anchor="middle" stroke="#000000" stroke-width="1" stroke-opacity="${opacity}" fill="none" transform="rotate(45, 120 120)" style="font-size: ${fontSize};">${content}</text>
      </svg>`;
      const base64Url = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
      return base64Url;
    }
  }
};
</script>
<style lang="less" scoped>
.credit-html {
  position: relative;
  .credit-watermark {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
