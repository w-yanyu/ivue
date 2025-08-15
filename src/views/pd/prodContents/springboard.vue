<template>
  <div class="box">
<!--    <div v-if="pageParams.node_type === '1'" class="imgDev">-->
<!--      <img :src="language === 'en' ? '../indexpage_en.jpg' : '../indexpage_zh.jpg'">-->
<!--    </div>-->
    <div v-if="pageParams.node_type === '2'">
      <sellProductAddSecondDetail
        :cParentParams="pageParams"
      >
      </sellProductAddSecondDetail>
    </div>
  </div>
</template>

<script>
import sellProductAddSecondDetail from "@/views/pd/prod/detail/sellProductAddSecondDetail.vue";

export default {
  components: {
    sellProductAddSecondDetail,
  },
  name: "springboard",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        tranType: "",
        sale_prod_cd: "",
        sale_prod_name: "",
        prod_type: "",
        prod_version: "",
        busi_seq: "",
        template_id: "",
        template_version: "",
        node_type: "1",
        pageTranType: "format"
      },
      is_leaf: '0'
    }
  },
  computed: {
    language() {
      return localStorage.getItem("LANGUAGE_STYLE");
    }
  },
  created() {
    console.log("父级页面参数：",this.cParentParams);
    this.pageParams.template_id = this.cParentParams.template_id;
    this.pageParams.template_version = this.cParentParams.template_version;
    this.pageParams.tranType = this.cParentParams.tranType;
    this.pageParams.sale_prod_cd = this.cParentParams.sale_prod_cd;
    this.pageParams.sale_prod_name = this.cParentParams.sale_prod_name;
    this.pageParams.prod_type = this.cParentParams.prod_type;
    this.pageParams.prod_version = this.cParentParams.prod_version;
    this.pageParams.busi_seq = this.cParentParams.busi_seq;
    if (this.pageParams.node_type !== ""
      && this.pageParams.node_type !== null
      && typeof (this.pageParams.node_type) !== "undefined") {
      this.pageParams.node_type = this.cParentParams.node_type;
    }
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
