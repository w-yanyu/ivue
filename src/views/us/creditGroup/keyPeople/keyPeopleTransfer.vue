<template>
  <div>
    <to-json
      :toUrl="custUrl"
      :params="pageParams">
    </to-json>
  </div>
</template>
<script>

export default {
  name: "keyPeopleTransfer",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        cust_no: "",
        show_flash: "",
        grupno: ""
      },
      custUrl: "",
      cust_type: ""
    }
  },
  created() {
    this.pageParams.cust_no = this.cParentParams.cust_no;
    this.cust_type = this.cParentParams.cust_type;
    // 展示维护或者详情页面
    this.choseUrl(this.cust_type);
    console.log("yemai",this.pageParams);
  },
  methods: {
    /**
     * 选择当前产品对应页面
     */
    choseUrl(cust_type) {
      if (cust_type === "10"
        || cust_type === "1010"
        || cust_type === "1020") {
        this.custUrl = "/views/us/privateManage/privateManage_info.json";
        this.pageParams.show_flash = "0";
        this.pageParams.grupno = "0005"
      }
      if (cust_type === "20"
        || cust_type === "2010"
        || cust_type === "2020"
        || cust_type === "2030"
        || cust_type === "30"
        || cust_type === "60") {
        this.custUrl = "/views/us/entManager/ent_cust_tree.json";
        this.pageParams.show_flash = "0";
        this.pageParams.grupno = "0001"
      }
      if (cust_type === "40") {
        this.custUrl = "/views/us/peersManage/peer_cust_tree.json";
        this.pageParams.show_flash = "0";
        this.pageParams.grupno = "0008"
      }
      if (cust_type === "70") {
        this.custUrl = "/views/us/microManage/micro_cust_tree.json";
        this.pageParams.show_flash = "0";
        this.pageParams.grupno = "0007"
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
