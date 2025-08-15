<template>
  <div class="box">
    <div v-if="node_type === '0'" class="imgDev">
      <img :src="language === 'en' ? '../indexpage_en.jpg' : '../indexpage_zh.jpg'">
    </div>
    <div v-if="node_type !== '0'">
      <el-collapse v-model="activeNames">
        <el-collapse-item class="collapse-item" name="1">
          <template slot="title">
            <i class="header-icon el-icon-info"></i><em></em>基本信息
          </template>
          <to-json
            :toUrl="url"
            :params="this.pageParams"
          ></to-json>
        </el-collapse-item>
        <el-collapse-item
          class="collapse-item"
          name="2"
          v-if="node_type === '3'">
          <template slot="title">
            <i class="header-icon el-icon-info"></i><em></em>关键人信息
          </template>
          <to-json
            toUrl="/views/us/creditGroup/keyPeople/keyPeopleRelation/keyPeopleRelation_manage.json"
            :params="this.pageParams"
          ></to-json>
        </el-collapse-item>
        <el-collapse-item
          class="collapse-item"
          name="3"
          v-if="node_type === '3'">
          <template slot="title">
            <i class="header-icon el-icon-info"></i><em></em>信用户列表
          </template>
          <to-json
            toUrl="/views/us/creditGroup/letterUser/letterUserRelation/letterUserRelation_manage.json"
            :params="this.pageParams"
          ></to-json>
        </el-collapse-item>
        <el-collapse-item
          class="collapse-item"
          name="4">
          <template slot="title">
            <i class="header-icon el-icon-info"></i><em></em>行内业务信息
          </template>
          <to-json
            toUrl="/views/us/creditGroup/baseInfo/credit_busi_info.json"
            :params="this.pageParams"
          ></to-json>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>

export default {
  name: "creditGroupView",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        area_no: "",
        area_name: ""
      },
      node_type: "",
      url: "",
      is_leaf: '0',
      activeNames: ['1', '2', '3', '4']
    }
  },
  computed: {
    language() {
      return localStorage.getItem("LANGUAGE_STYLE");
    }
  },
  created() {
    console.log("父级页面参数：",this.cParentParams);
    this.pageParams.area_no = this.cParentParams.node_cd;
    this.pageParams.area_name = this.cParentParams.node_name;
    this.node_type = this.cParentParams.node_type;
    this.getUrl(this.node_type);
  },
  methods: {
    /**
     * 根据不同的节点类型，返回不同的路径
     * @param node_type
     */
    getUrl(node_type){
      if(node_type === "1"){
        this.url = "/views/us/creditGroup/baseInfo/county/county_modify.json";
      }else if(node_type === "2"){
        this.url = "/views/us/creditGroup/baseInfo/town/town_modify.json";
      }else if(node_type === "3"){
        this.url = "/views/us/creditGroup/baseInfo/village/village_modify.json";
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
