<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item" name="1">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em> {{$i18ns('产品属性')}}
        </template>
        <to-json
          :toUrl="prodUrl"
          :params="pageParams">
        </to-json>
      </el-collapse-item>
      <el-collapse-item class="collapse-item" name="2">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('产品关联参数')}}
        </template>
        <sellProductAddSecond
          v-if="pageParams.tranType === 'modify' || pageParams.tranType === 'add'"
          :cParentParams="pageParams"
        >

        </sellProductAddSecond>
        <sellProductAddSecondDetail
          v-if="pageParams.tranType === 'detail'"
          :cParentParams="pageParams"
        >

        </sellProductAddSecondDetail>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import sellProductAddSecond from "@/views/pd/prod/add/sellProductAddSecond.vue";
import sellProductAddSecondDetail from "@/views/pd/prod/detail/sellProductAddSecondDetail.vue";

export default {
  components: {
    sellProductAddSecond,
    sellProductAddSecondDetail
  },
  name: "prodLayout",
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
        template_version: "",
        busi_seq: "",
        template_id: "",
        cust_class: "",
        isLastTab: false,
        pageTranType: "",
        cust_class_list: "",
        prod_picture_url:""

      },
      prodUrl: "",
      activeNames: ['1', '2'],
      tranType: ""
    }
  },
  created() {
    this.pageParams.template_id = this.cParentParams.template_id;
    this.pageParams.tranType = this.cParentParams.tranType;
    this.pageParams.sale_prod_cd = this.cParentParams.sale_prod_cd;
    this.pageParams.sale_prod_name = this.cParentParams.sale_prod_name;
    this.pageParams.prod_type = this.cParentParams.prod_type;
    this.pageParams.prod_version = this.cParentParams.prod_version;
    this.pageParams.template_version = this.cParentParams.template_version;
    this.pageParams.busi_seq = this.cParentParams.busi_seq;
    this.pageParams.pageTranType = this.cParentParams.pageTranType;
    this.pageParams.prod_picture_url = this.cParentParams.prod_picture_url;
    this.pageParams.cust_class = this.cParentParams.cust_class;
    this.pageParams.cust_class_list = this.isNull(this.pageParams.cust_class_list) ? this.cParentParams.cust_class + "|99" : this.pageParams.cust_class_list;
    // 展示维护或者详情页面
    this.choseUrl(this.pageParams.tranType);
  },
  methods: {
    isNull(params) {
      if (params === "" || params === null || params === undefined) {
        return true;
      }
      return false;
    },
    /**
     * 选择当前产品对应页面
     */
    choseUrl(tranType) {
      let that = this;
      if (tranType === 'detail') {
        if (that.pageParams.prod_type === 'CL') {
          that.prodUrl = '/views/pd/prod/creditProdBaseAttr/creditProdBaseAttr_info.json'
        }
        if (that.pageParams.prod_type !== 'CL') {
          that.prodUrl = '/views/pd/prod/prodBaseAttribute/prodBaseAttribute_info.json'
        }
      } else {
        if (that.pageParams.prod_type === 'CL') {
          that.prodUrl = '/views/pd/prod/creditProdBaseAttr/creditProdBaseAttr_modify.json'
        }
        if (that.pageParams.prod_type !== 'CL') {
          that.prodUrl = '/views/pd/prod/prodBaseAttribute/prodBaseAttribute_modify.json'
        }
      }
    }
  }
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

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.text-edit {
  padding: 0;
  margin: 0;
  color: #697b8c;
  line-height: 36px;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}

.divider {
  border: 1px solid #DCDFE6;
  padding: 10px;
  display: block;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}

.collapse-item {
  border: 0.996px;
  padding: 10px 10px 0 10px;
}
</style>
