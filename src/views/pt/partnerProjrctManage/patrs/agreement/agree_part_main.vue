<template>
  <div class="dialog_content">
    <div class="main-container">
      <el-tabs v-model="showNum" tab-position="left">
        <el-tab-pane v-for="(item, index) in partList" :key="index" :label="item.parts_name" :name="index">
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      v-for="item in partsListComputed"
      :key="item.parts_no">
      <to-json
        v-if="tranType === 'add'"
        :toUrl="item.add_url"
        :params="jsonParams">
      </to-json>
      <to-json
        v-if="tranType === 'modify'"
        :toUrl="item.update_url"
        :params="jsonParams">
      </to-json>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "agreePartMain",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
    pageList: [],
  },
  data() {
    return {
      showNum: 0,
      tranType: "",
      isFirst: false,
      protocol_template_no:"",//协议模版编号
      part_protocol_no:"",//协议编号
      part_project_no:"",//项目编号
      partList:[]
    }

  },
  created() {
    this.tranType = this.cParentParams.tranType;
    this.protocol_template_no=this.cParentParams.protocol_template_no;
    this.part_project_no=this.cParentParams.part_project_no;
    this.part_protocol_no=this.cParentParams.part_protocol_no;

    console.log("part_protocol_no", this.part_protocol_no);
    this.getPartsList();
  },
  computed: {
    partsListComputed: function () {
      let that = this;
      return that.partList.filter(function (item, index) {
        return that.showNum === index;
      })
    }
  },
  methods: {
    /**
     * 获取协议部件列表
     */
    getPartsList(){
      let params={
        servicecode:"pt0319",
        protocol_template_no:this.protocol_template_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
            this.partList=res.data;
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

.container-steps {
  padding: 10px;
  margin: 0 auto;
  justify-content: center;
}

.container-div-right {
  width: 80%;
  height: 100%;
  display: inline;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.container-center {
  margin: 10px 0;
  width: 100%;
  text-align: center;
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
</style>
