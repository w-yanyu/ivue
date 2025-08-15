<template>
  <div>
    <el-link
      type="primary"
      style="margin-right:10px;height:34px"
      @click="to(item.url)"
      v-for="(item, index) in list"
      :key="index"
      >{{ item.text }}</el-link
    >
  </div>
</template>
<script>
import Tools from "pte-ui/utils/Tools";
export default {
  name: "link",
  props: {
    config: Object, // 控件的相关配置
    value: [Object, String]
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    if (this.value) {
      if (Array.isArray(this.value)) {
        this.value.forEach(item => {
          let obj = {};
          obj.text = item.text || item[this.config.textField] || item;
          obj.url = item.url || item[this.config.urlField] || item;
          this.list.push(obj);
        });
      } else {
        let obj = {};
        obj.text = this.value;
        obj.url = this.value;
        this.list.push(obj);
      }
    } else {
      if (this.config.text || this.config.url) {
        let obj = {};
        obj.text = this.config.text || this.config.url;
        obj.url = this.config.url || this.config.text;
        this.list.push(obj);
      }
    }
  },
  methods: {
    to(url) {
      if (this.config.downloadFile) {
        this.downloadFile(url);
      } else {
        const toUrl = Tools.resolveStringTemplate(
          url,
          this.$dataBus.getCurrentcParams(this),
          this.$dataBus.getParentcMeta(this),
          this.$dataBus.getParentScope(this),
          this.$dataBus.getCurrentcMeta(this),
          this.$dataBus.getCurrentScope(this)
        );
        window.open(toUrl);
      }
    },
    downloadFile(doRequest) {
      // let doRequestObj = Tools.resolveDoRequest(
      //   doRequest,
      //   this.$dataBus.getCurrentcParams(this),
      //   this.$dataBus.getParentcMeta(this),
      //   this.$dataBus.getParentScope(this),
      //   this.$dataBus.getCurrentcMeta(this),
      //   this.$dataBus.getCurrentScope(this)
      // );
      if (doRequest) {
        Tools.downLoadFile(
          doRequest,
          "get",
          {},
          true,
          err => {
            this.$msg({
              type: "info",
              message: err
            });
          }
        );
      }
    }
  }
};
</script>