<template>
  <div class="credit-html" >
    <div v-html="htmldata"></div>
    <div class="credit-watermark" :style="watermarkStyle"></div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "CreditReportView",
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
        lncfno: this.cParentParams.lncfno,
        servicecode: "PLMSKGTS0044",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.parseHtml(res.data.pbocHtml);
          //this.htmldata=res.data.pbocHtml;
        }
      }).catch(err => {
        console.error(err);
      })
    },
    parseHtml(pbocHtml){
        let el = document.createElement('html');
        el.innerHTML=pbocHtml;
        let name = this.getFirstName(el.getElementsByTagName('table')[0].rows[2].cells[0].innerText);
        el.getElementsByTagName('table')[0].rows[2].cells[0].innerText = name;
        el.getElementsByTagName('table')[0].rows[2].cells[2].innerText = "******************";
        el.getElementsByTagName('table')[0].rows[2].cells[3].innerText = "*************";
        this.htmldata = el.innerHTML;
    },
    //姓名脱敏
    getFirstName(name){
        let hyphenated = ['欧阳','太史','端木','上官','司马','东方','独孤','南宫','万俟','闻人','夏侯','诸葛','尉迟','公羊','赫连','澹台','皇甫',
            '宗政','濮阳','公冶','太叔','申屠','公孙','慕容','仲孙','钟离','长孙','宇文','城池','司徒','鲜于','司空','汝嫣','闾丘','子车','亓官',
            '司寇','巫马','公西','颛孙','壤驷','公良','漆雕','乐正','宰父','谷梁','拓跋','夹谷','轩辕','令狐','段干','百里','呼延','东郭','南门',
            '羊舌','微生','公户','公玉','公仪','梁丘','公仲','公上','公门','公山','公坚','左丘','公伯','西门','公祖','第五','公乘','贯丘','公皙',
            '南荣','东里','东宫','仲长','子书','子桑','即墨','达奚','褚师'];
        let lastName = name;
        if(name.length>2 && hyphenated.indexOf(name.substr(0,2))>-1){
            lastName = name.substr(0,2)+"**";
        }else{
            lastName = name.substr(0,1)+"**";
        }
        return lastName;
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
