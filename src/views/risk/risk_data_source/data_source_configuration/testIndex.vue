<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-28 10:11:31
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-02-28 14:17:13
 * @FilePath: /ivue/src/views/risk/risk_data_source/data_source_configuration/testIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>统计</span>
      </div>
      <div class="box-item">
        <div class="item">
          <p>{{total_count}}</p>
          <p>用例总数</p>
        </div>
        <div class="item">
          <p>{{pass_total}}</p>
          <p>通过数</p>
        </div>
        <div class="item">
          <p>{{failures_total}}</p>
          <p>未通过数</p>
        </div>
        <div class="item">
          <p>{{unexecute_total}}</p>
          <p>未执行数</p>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>用例</span>
      </div>
      <div class="table-box">
        <to-json
          :params="params"
          :toUrl="testUrl"
          @jsonCallBack="jsonCallBack"
        ></to-json>
      </div>
    </el-card>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "testIndex",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  data() {
    return {
      total_count: "",
      pass_total: "",
      failures_total: "",
      unexecute_total: "",
      params: this.cParentParams,
      testUrl: "/views/risk/risk_data_source/data_source_configuration/test_list.json",
    }
  },
  created() {
    console.log("this.cParentParams====" , this.cParentParams);
    this.getCountInfo();
  },
  methods: {
    jsonCallBack(data) {
      console.log("json模板回调回来的数据", data);
    },
    getCountInfo() {
      let params = {
        servicecode: "deci050202",
        data_source_code: this.cParentParams.data_source_code
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log("res.data===", res.data);
            this.total_count = res.data.total_count;
            this.pass_total = res.data.pass_total;
            this.failures_total = res.data.failures_total;
            this.unexecute_total = res.data.unexecute_total;
          }
        })
        .catch(err => {
          console.error(err);
        });
    
    },
  }
}
</script>

<style lang="less" scoped>
.box-item {
  display: flex;
  .item {
    flex: 1;
    text-align: center;
  }
}
</style>