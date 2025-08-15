<template>
  <div class="page_content">
    <div class="text_content">{{textContent}}</div>
    <div slot="footer" class="dialog-footer">
      <el-button class="copyBtn" type="primary" small @click="copy">复制到剪贴板</el-button>
      <el-input type="textarea" class="inpudiv" ref="demoInput" v-model="responseData"></el-input>
      <el-button @click="close">确 认</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据

    },
    data() {
      return {
        textContent: '提示文字',
        responseData: "",
      };
    },
    mounted() {
      console.log("cParentParams", this.cParentParams);

      let that = this;
      that.responseData = that.cParentParams.responseData;
       that.textContent = that.cParentParams.textContent;
    },
    methods: {
      //点击复制按钮复制报文
      copy() {
        console.log('复制按钮被点击');
        this.$refs.demoInput.select()
        document.execCommand('copy')
        this.$message.success("测试报文复制到剪贴板");
      },
      close() {
        console.log('关闭按钮被点击');
        this.$dialog.close();
      },



    },
  };
</script>

<style lang="css" scoped>
  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .text_content {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-top: 30px;
    margin-bottom: 70px;
  }

  .dialog-footer {
    position: absolute;
    bottom: 2px;
    right: -2px;
    z-index: 99;

  }


  .copyBtn {
    margin-right: 10px;
  }

  .inpudiv {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
     z-index: -1;
  }
</style>
