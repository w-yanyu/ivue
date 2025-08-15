<template>
  <div class="box">
    <div v-if="is_leaf === '1'">
      <to-json
        :toUrl="pageUrl"
        :params="pageParams">
      </to-json>
    </div>
  </div>
</template>

<script>

export default {
  name: "infoDueSpringboard",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        node_cd: "",
        node_name: "",
        node_type: "",
        due_item_no: "",
        apply_no: "",
        cust_no: ""
      },
      is_leaf: '0',
      pageUrl: '',
      pageType: ''
    }
  },
  created() {
    console.log("父级页面参数：", this.cParentParams);
    this.pageParams.node_cd = this.cParentParams.node_cd;
    this.pageParams.due_item_no = this.cParentParams.node_cd;
    this.pageParams.node_name = this.cParentParams.node_name;
    this.pageParams.apply_no = this.cParentParams.apply_no;
    this.pageParams.cust_no = this.cParentParams.cust_no;
    this.is_leaf = this.cParentParams.is_leaf;
    this.modify_path = this.cParentParams.modify_path;
    this.detail_path = this.cParentParams.detail_path;
    this.pageType = this.cParentParams.pageType;
    if (this.pageType === 'detail') {
      this.pageUrl = this.cParentParams.detail_path;
    }
    if (this.pageType === 'modify') {
      this.pageUrl = this.cParentParams.modify_path;
    }
    if (this.cParentParams.node_type !== ""
      && this.cParentParams.node_type !== null
      && typeof (this.cParentParams.node_type) !== "undefined") {
      this.pageParams.node_type = this.cParentParams.node_type;
    }
    console.log("node_type", this.pageParams);
  },
  methods: {}
}
</script>


<style lang="less" scoped>

.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.box {
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  border: 0px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

img {
  width: 100%;
  height: 100%;
}
</style>
