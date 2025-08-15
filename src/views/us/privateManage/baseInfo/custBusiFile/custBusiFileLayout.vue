<template>
  <div>
    <el-container
      class="main-content-background"
      :style="{overflow: 'hidden', height: parentHeight }">
      <el-aside width="400px">
        <el-container>
          <el-header style="text-align: center; font-size: 12px">
            <h3>
              <span/>业务资料
            </h3>
          </el-header>
          <el-main>
            <el-tree
              :data="treeData"
              node-key="doc_no"
              :props="defaultProps"
              default-expand-all
              class="tree-menu-template"
              style="height: 100%"
              highlight-current="true"
              @node-click="chooseFile"
              :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }" style="width: 100% !important;">
<!--                  <el-badge :value="data.count" class="item">-->
                  <!--                    <span>{{ node.label }}</span>-->
                  <!--                  </el-badge>-->
                  <el-row>
                    <el-col :span="20" class="file-body">
                      <el-tooltip class="item" effect="dark" :content="node.label" placement="bottom" open-delay="500">
                        <div>{{ node.label }}</div>
                      </el-tooltip>
                    </el-col>
                    <el-col :span="4" style="display: flex; justify-content: right;align-items: center;">
                      <div class="file-count">
                      {{ data.count }}
                      </div>
                    </el-col>
                  </el-row>
                </span>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
        </el-header>

        <el-main>
          <to-json
            toUrl="/views/us/privateManage/baseInfo/custBusiFile/right/busi_file_manage.json"
            :params="params"
            :key="tableKey"
          ></to-json>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "custBusiFileLayout",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  data() {
    return {
      cert_type: "",
      cert_no: "",

      parentHeight: "100%",
      treeData: [],
      busiFileList: [],
      tableKey: 10,
      defaultProps: {
        children: 'children',
        label: 'doc_name'
      },
      params: {
        doc_no: "",
        cert_type: "",
        cert_no: ""
      }
    }
  },
  created() {
    this.init();
    this.calculateParentHeight();
    this.initTreeData();
  },
  methods: {
    init() {
      this.cert_type = this.cParentParams.cert_type;
      this.cert_no = this.cParentParams.cert_no;
    },
    /**
     * 计算父容器高度，初始化树高度
     */
    calculateParentHeight() {
      // 使用window.parent来访问父级页面的window对象
      const parentWindow = window.parent;
      // 获取父级页面的高度
      const parentPageHeight = parentWindow.innerHeight;
      this.parentHeight = parentPageHeight - 50 + "px";
    },
    /**
     * 初始化树数据
     */
    initTreeData() {
      let params = {
        servicecode: "ar0267",
        cert_type: this.cert_type,
        cert_no: this.cert_no
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.treeData = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    chooseFile(data) {
      let that = this;
      this.params.doc_no = data.doc_no;
      this.params.cert_type = this.cert_type;
      this.params.cert_no = this.cert_no
      that.tableKey++;
    }
  }


}
</script>
<style lang="less" scoped>
.tree-el-header {

}

.filter_search_title {
  text-align: center;
}

h3 {
  background: #f5f7fb;
  margin-top: 0;
  padding: 0 8px;
  text-align: left !important;
  border-bottom: 1px solid #e7e7e7;
  height: 49px;
  line-height: 49px;

  span {
    width: 3px;
    height: 18px;
    background: #1890FF;
    display: block;
    float: left;
    margin-right: 8px;
    border-radius: 50px;
    margin-top: 16px;
  }
}

.file-body {
  overflow: hidden;
}

.file-count {
  background-color: #409eff;
  color: #FFFFFF;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}

.custom-tree-node {
  overflow: hidden;
}
</style>
