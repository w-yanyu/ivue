<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-01-19 09:47:29
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-02-18 13:54:49
 * @FilePath: /ivue/src/views/mk/mkActivity/mkExternalLink.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    :type="type"
    @click.stop="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{ $i18ns(label) }}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import pageJump from "pte-ui/mixins/pageJump";
import Tools from "pte-ui/utils/Tools";
import * as _ from "lodash";
import SysConfig from "@/pte/sysconfig.json";

export default {
  name: "MkExternalLink",
  mixins: [buttonPropsMixin, pageJump],
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleClick() {
      console.log(
        "this.$options.propsData.currentData",
        this.$options.propsData.currentData
      );
      const imgurl = this.$options.propsData.currentData.active_img || "";
      const tool_comment =
        this.$options.propsData.currentData.tool_comment || "";
      const link_url = this.$options.propsData.currentData.active_connect || "";
      this.openUrl(imgurl, tool_comment, link_url);
    },
    /**
     * 跳转H5营销海报页面
     * link_url 外链url 例如 http://10.22.12.119:7674
     * imgurl 图片url
     * tool_comment
     * busiOrgId 法人号
     * trxnBranch 机构号
     */
    openUrl(imgurl, tool_comment, link_url) {
      const busiOrgId = JSON.parse(localStorage.getItem("user_info")).org_id;
      const trxnBranch = JSON.parse(localStorage.getItem("user_info"))
        .branch_id;
      let url = link_url + "/?";
      let operatorType = "&operatorType=0001";  // H5写死的类别，识别来源
      let operatorTypeData = {
        tip: tool_comment,
        img: imgurl
      };
      const urlLink =
        url +
        "busiOrgId=" +
        busiOrgId +
        "&trxnBranch=" +
        trxnBranch +
        operatorType +
        "&operatorTypeData=" +
        JSON.stringify(operatorTypeData);
      window.open(urlLink);
    }
  }
};
</script>

<style lang="less" scoped></style>
