<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item class="collapse-item" name="1">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('合作项目基础信息')}}
        </template>
        <to-json
          :toUrl="projUrl"
          :params="pageParams">
        </to-json>
      </el-collapse-item>
      <el-collapse-item class="collapse-item" name="2">
        <template slot="title">
          <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('合作项目关联信息')}}
        </template>
        <projectAddSecond v-if="pageParams.tranType === 'modify'&&flag"
          :cParentParams="pageParams">
        </projectAddSecond>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import projectAddSecond from "@/views/pt/partnerProjrctManage/projectAddSecond.vue";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  components: {
    projectAddSecond
  },
  name: "projectAddLayout",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        tranType: "",
        part_project_no:"",
        project_template_no: "",
        project_template_version:"",
        version:null,
        data_list_no:"",
        isLastTab: false
      },
      projUrl: "",
      activeNames: ['1', '2'],
      tranType: "",
      flag:false
    }
  },
  created() {
    this.pageParams.part_project_no = this.cParentParams.part_project_no;
    this.pageParams.tranType = 'modify';
    this.pageParams.version = this.cParentParams.version;
    this.pageParams.project_template_no = this.cParentParams.project_template_no;
    this.pageParams.project_template_version = this.cParentParams.project_template_version;
    // 展示维护或者详情页面
    this.choseUrl(this.pageParams.tranType);
    this.getProjtem(this.cParentParams.project_template_no);
  },
  methods: {
    /**
     * 选择当前产品对应页面
     */
    choseUrl(tranType) {
      let that = this;
      // if (tranType === 'detail') {
      //     that.projUrl = '/views/pt/partnerProjrctManage/cor_project_baseinfo_detail.json'
      // } else {
      //     that.projUrl = '/views/pt/partnerProjrctManage/cor_project_baseinfo_edit.json'
      //   }
      that.projUrl = '/views/pt/partnerProjrctManage/cor_project_baseinfo_edit.json'
    },
    getProjtem(project_template_no){
      let params = {
        servicecode: "pt0096",
        project_template_no: project_template_no
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.pageParams.data_list_no=res.data.data_list_no;
          this.flag=true;
        }
      }).catch(err => {
        console.error(err);
      });
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
