<template>
  <div class="main-content-background" :class="language === 'en' ? 'dashboard-en' : 'dashboard-zh'">
    <!-- <div>
      <el-button @click="downLoad">{{$i18ns('下载')}}</el-button>
    </div> -->
    <!-- <img v-if="language === 'en'" src="indexpage_en.jpg" style="height:99%" />
    <img v-else src="indexpage_zh.jpg" style="height:99%" /> -->
  </div>
</template>


<script>


import Tools from "pte-ui/utils/Tools";
export default {
  // created() {
  //   this.downLoad();
  // },
  data() {
    return {};
  },
  computed: {
    language() {
      return localStorage.getItem("LANGUAGE_STYLE");
    }
  },
  methods: {
    downLoad() {
          console.log("+++++++++++++++++++++++++++++++++++++++++++++++++");
          var url = "/SUMP/call/downloadfile";
          var method = "POST";
          //成功后调用的方法
          var errorCallback = "失败";
          //失败后调用的方法
          var successCallback = "成功";
          var params = {};
          //是否为文件
          var isFile = true
          Tools.downLoadFile(url, method, params, isFile, errorCallback, successCallback);
      //   Fetch(url, req).then(response => {
      //   const disposition = response.headers.get('content-disposition');
      //   if (disposition && disposition.match(/attachment/)) {
      //     let filename = decodeURIComponent(disposition.replace(/attachment;.*filename=/, '').replace(/"/g, ''));
      //     filename = filename && filename !== '' ? filename : 'file';
      //     response.blob().then(blob => {
      //       FileSaver.saveAs(blob, filename);
      //     });
      //     successCallback && successCallback({});
      //   }
      // }).catch(res => {
      //   errorCallback && errorCallback(res);
      // });
    }
  }
};
</script>

