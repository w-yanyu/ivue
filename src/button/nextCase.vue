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
    {{$i18ns(label)}}
  </el-button>
</template>

<script>
  import buttonPropsMixin from "pte-ui/mixins/buttonProps";
	export default {
		name: "CustomButton",
    components: {},
    mixins: [buttonPropsMixin],
    props: {
    },
    data() {
			return {
      }
    },
		methods: {
			handleClick() {
        // this.$publicFn.closeNavTab(this);
        let request = {
          "url": "/SUMP/icmcall/icmRPCCall",
          "params": {
            "servicecode": "cb0110",
            "case_id": this.$dataBus.getCurrentcParams(this).case_id
          }
        }
        console.log(request)
        let that = this;
        this.$http.invokeAPI(request.url, "post", request.params).then(function (response) {
         console.log(response)
         if (response.case_id === "" || response.case_id === null)  {
            that.$message({
              type: 'error',
              message:  "没有下一个案件"
              });
              return;
         }
        //  that.$publicFn.closeNavTab(that);
         that.$publicFn.openNavTab("/views/cs/collManage/tcManage/collWorkbench/collWorkbench.json", "电催工作台", response.data, that);
					//	待触发父模板的回调
				}).catch(function () {
					// 不处理
				});
      }
    }
	}
</script>

<style scoped>

</style>
