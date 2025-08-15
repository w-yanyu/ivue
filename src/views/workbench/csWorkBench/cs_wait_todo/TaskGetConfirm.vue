<template>
  <div>
    <div class="task-tontainer">
      <p><i class="el-icon-warning"></i>确认要领取该任务吗？</p>
    </div>
    <div class="task-footer">
      <el-button type="primary" size="small" @click="confirm">确认</el-button>
      <el-button size="small" @click="cancel">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CsTaskGetConfirm",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      params: {},
    }
  },
  methods: {
    /**
     * 确认领取任务
     */
    confirm() {
      const params = {
        servicecode: "rlms_clmtsk",
        usercd: JSON.parse(localStorage.getItem("user_info")).userCode,
        tkinid: this.cParentParams.task_inst_id,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: res.message,
            })
            let that = this.$parent.$parent.$parent;
            this.$dataBus.doCallBack(this, {});
            this.$dataBus.bindCallBackMethod(that, function () { return "currentNull" }, {});
            this.$publicFn.openNavTab("@csWaitToDoDeal", "待办事项办理", this.cParentParams, that); // 领取任务成功后跳转至待办事项办理页面
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 取消领取任务
     */
    cancel() {
      this.$dialog.close();
    }
  }
}
</script>
<style lang="less" scoped>
  .task-tontainer {
    margin: 60px 0;
    text-align: center;
    font-size: 20px;
    color: #606266;
    .el-icon-warning {
      margin-right: 8px;
      color: #e6a23c;
    }
  }
  .task-footer {
    text-align: center;
  }
</style>
