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
  import Tools from "pte-ui/utils/Tools";
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
			  this.$dataBus.doAllValidator(this).then(res =>{
			    if (res === true){
            let newDoRequest = (this.config && this.config.doRequest);
            let doRequestObj = Tools.createDoRequestParams(newDoRequest,
              this.$dataBus.getCurrentFormData(this),
              this.$dataBus.getCurrentcParams(this),
              this.$dataBus.getParentcMeta(this),
              this.$dataBus.getParentScope(this),
              this.$dataBus.getCurrentcMeta(this),
              this.$dataBus.getCurrentScope(this));
              this.$http.doApi(doRequestObj).then(response => {this.$publicFn.closeNavTab(this);})
          }
          return;
        } )
      }
    }
	}
</script>

<style scoped>

</style>
