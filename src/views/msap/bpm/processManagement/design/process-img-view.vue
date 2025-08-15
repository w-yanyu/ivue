<template>
  <div class="process-container">
    <el-image
      class="preview-image"
       v-if="imageUrl"
      :src="imageUrl"
      fit="contain"></el-image>       
    <span v-else>    
     {{ $i18ns('bpmmodel.loading') }}...
    </span>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ProcessImgView",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      imageUrl: "",
      from: ""
    }
  },
  created() {
    this.from = this.cParentParams.from;
    this.getImage();
  },
  methods: {
    getImage() {
      let params = {};
      switch (this.from) {
        case "backlog":
        case "doneList":
          params = {
            wf_inst_id: this.cParentParams.wf_inst_id,
            servicecode: "bpm0062",
            appId: this.cParentParams.appId,
            query_hist_flag:this.cParentParams.query_hist_flag
          }
          break;
        case "processDesign":
          params = {
            wf_temp_define_no: this.cParentParams.id_,
            servicecode: "bpm0003",
            appId: this.cParentParams.appId
          }
          break;
          case "prediction":
          params = {
            wf_temp_define_no: this.cParentParams.id_,
            servicecode: "bpm1034",
            appId: this.cParentParams.appId,
            wf_prod_no:this.cParentParams.wf_prod_no,
            bpm_version:this.cParentParams.bpm_version,
            task_define_id:this.cParentParams.task_define_id,
            wf_inst_id:this.cParentParams.wf_inst_id

          }
          break;     
          case "shortest":
          params = {
            wf_temp_define_no: this.cParentParams.id_,
            servicecode: "bpm1036",
            appId: this.cParentParams.appId,
            wf_prod_no:this.cParentParams.wf_prod_no,
            bpm_version:this.cParentParams.bpm_version,
            task_define_id:this.cParentParams.task_define_id,
            wf_inst_id:this.cParentParams.wf_inst_id

          }
          break;           
        default:
          break;
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.imageUrl =  `data:image/jpeg;base64,${res.data.imge_bytes}`;
        }
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.process-container {
  min-height: 420px;
}
/deep/.preview-image {
  width: 100%;
  height: auto;
  .el-image__error {
    height: 200px;
  }
}
</style>