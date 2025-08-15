<template>
  <div class="box">
<!--    <div v-if="pageParams.node_type === '0'" class="imgDev">-->
<!--      <img :src="language === 'en' ? '../indexpage_en.jpg' : '../indexpage_zh.jpg'">-->
<!--    </div>-->
    <div v-if="pageParams.node_type === '3' && pageParams.is_leaf === '1'">
      <to-json
        toUrl="/views/pd/dueDiliTemplate/dueDiliTemplate_item_add.json"
        :params="pageParams">
      </to-json>
    </div>
    <div v-if="pageParams.node_type === '3' && pageParams.is_leaf === '0'">
      <to-json
        toUrl="/views/pd/dueDiliTemplate/dueDiliTemplate_template_add.json"
        :params="pageParams">
      </to-json>
    </div>
    <div v-if="pageParams.node_type === '2'">
      <to-json
        toUrl="/views/pd/dueDiliTemplate/dueDiliTemplate_template_add.json"
        :params="pageParams">
      </to-json>
    </div>
    <div v-if="pageParams.node_type === '1'">
      <to-json
        toUrl="/views/pd/dueDiliTemplate/dueDiliTemplate_cust_add.json"
        :params="pageParams">
      </to-json>
    </div>
  </div>
</template>

<script>

export default {
  name: "dueSpringboard",
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
        group_num: "",
        is_leaf: "0"
      }
    }
  },
  computed: {
    language() {
      return localStorage.getItem("LANGUAGE_STYLE");
    }
  },
  created() {
    console.log("父级页面参数：", this.cParentParams);
    this.pageParams.node_cd = this.cParentParams.node_cd;
    this.pageParams.node_name = this.cParentParams.node_name;
    this.pageParams.is_leaf = this.cParentParams.is_leaf;
    this.pageParams.group_num = this.cParentParams.group_num;
    if (this.cParentParams.node_type !== ""
      && this.cParentParams.node_type !== null
      && typeof (this.cParentParams.node_type) !== "undefined") {
      this.pageParams.node_type = this.cParentParams.node_type;
    }
    console.log("node_type",this.pageParams);
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
