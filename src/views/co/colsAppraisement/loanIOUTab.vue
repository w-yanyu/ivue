<template>
  <div>
    <div class="todo-top">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.mytitle"
          :name="item.idField"
          v-if="item.tabStatus"
        >
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="c_$params"
            :to-request="item.toRequest"
            @update="update"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-row class="custom-common--footer" type="flex" justify="end">
      <el-button
        type="primary"
        size="medium"
        @click="closeNavTab"
      >关闭
      </el-button
      >
    </el-row>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "loanIOUTab",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        lend_no: "",//放款序号
        appl_id: "",//申请号
        pageType: ""
      },
      //涉及信息状态
      isFarmFlagStatus: false,//是否涉农
      isRzrhFlagStatus: false,//是否涉融资平台
      isHouseFlagStatus: false,//是否涉房地产
      isProjFlagStatus: false,//是否涉项目贷款
      activeName: "first",
      tempList: [],
      tabList: [], // tab切换列表
      submitLoading: false, // 防止多次提交
    };
  },
  beforeDestroy() {
    this.$dataBus.doCallBack(this, "refresh");
  },
  created() {
    this.c_$params.lend_no = this.cParentParams.lend_no; // appid参数传递
    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.pageType = this.cParentParams.pageType; // appid参数传递
    this.getTabInfo(this.cParentParams.pageType); // 获取tab信息
  },
  methods: {
    /**
     * 获取tab信息
     */
    getTabInfo(pageType) {
      let params = {
        framecd: "loanIOU",
        servicecode: "ICMSPBTS0081",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.tempList = res.data;
            this.activeName = this.tempList[0].idField;
            this.checkModifyOrInfo(pageType);//检查tab信息并且替换相关信息
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      this.$dataBus.doCallBack(this, "refresh");
    },
    /**
     * 判断页面类型（修改，新增，详情）
     * @param pageType
     */
    checkModifyOrInfo(pageType) {
      if (pageType === "info") {
        for (let i = 0; i < this.tempList.length; i++) {
          //借据详情页替换
          if (this.tempList[i].toRequest.url === "@IOUDetails") {
            this.tempList[i].toRequest.url = "@IOUDetails_info";
          }else{
            this.tempList[i].toRequest.url = this.tempList[i].toRequest.url.replace("_modify", "_info");//替换页面路径
          }
        }
      }
      this.updateTabInfo();//更新tab项状态
    },
    /**
     * 更新tab项状态
     * @param pageType
     */
    updateTabInfo() {
      let obj = {};
      for (let i = 0; i < this.tempList.length; i++) {
        if (this.tempList[i].mytitle === "涉农贷款信息") {
          this.tempList[i].tabStatus = this.isFarmFlagStatus;
        } else if (this.tempList[i].mytitle === "涉融资平台信息") {
          this.tempList[i].tabStatus = this.isRzrhFlagStatus;
        } else if (this.tempList[i].mytitle === "涉房地产贷款信息") {
          this.tempList[i].tabStatus = this.isHouseFlagStatus;
        } else if (this.tempList[i].mytitle === "涉项目贷款信息") {
          this.tempList[i].tabStatus = this.isProjFlagStatus;
        } else {
          this.tempList[i].tabStatus = true;
        }
        obj = this.tempList[i];
      }
      this.tabList = this.tempList;
      this.$set(this.tabList, 1, this.tempList[1]);//响应式监听数组
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    },
    //更新tab涉及信息的状态，子组件触发
    update(data) {
      if (data.name === "farm_flag") {
        this.isFarmFlagStatus = data.value;
      }
      if (data.name === "rzrh_flag") {
        this.isRzrhFlagStatus = data.value;
      }
      if (data.name === "house_flag") {
        this.isHouseFlagStatus = data.value;
      }
      if (data.name === "proj_flag") {
        this.isProjFlagStatus = data.value;
      }
      if (data.name === "updatedrawdnid") {
        console.log("++++++++++这里出发了+++++",data.value);
        this.updatedrawdnid(data.value);
      }
      this.updateTabInfo();
    },
    //更新放款序号
    updatedrawdnid(data){
      this.c_$params.lend_no = data;
    }
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
</style>
