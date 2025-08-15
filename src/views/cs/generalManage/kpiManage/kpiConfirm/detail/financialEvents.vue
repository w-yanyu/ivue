<template>
  <div class="contant">
      <el-collapse v-model="activeNames">
        <el-collapse-item  name="1">
          <template slot="title">
            <span><em class="em-sty"></em>财务事件</span>
          </template>
            <div>
              <to-json
                toUrl="/views/cs/generalManage/kpiManage/kpiConfirm/detail/financialEvents.json"
                :params="{ case_id: cParentParams.case_id }"
              ></to-json>
            </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em class="em-sty"></em>业务事件</span>
          </template>
            <div>
              <to-json
                toUrl="/views/cs/generalManage/kpiManage/kpiConfirm/detail/bussinessEvents.json"
                :params="{ case_id: cParentParams.case_id }"
              ></to-json>
            </div>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
  export default {
    name: "contractInfo",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        activeNames: ["1","2"],
        params: {
          case_id: this.cParentParams.case_id
        }
      }
    },
    created() {},
    methods: {}
}
</script>

<style lang="less" scoped>
  .contant {
    padding: 16px 12px 0px;
  }
  .em-sty {
    width: 2px;
    height: 14px;
    background: #1890FF;
    display: block;
    float: left;
    margin-right: 8px;
    border-radius: 50px;
    margin-top: 17px;
  }
</style>
