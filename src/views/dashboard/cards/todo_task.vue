<template>
  <div>
    <!-- 缺省图配置 -->
    <emptyData v-if="list.length == 0" class="empty-box"></emptyData>
    <div
      @click="to(item.source_system, item.busi_type)"
      v-for="(item, index) in list"
      :key="index"
      class="todo-box"
      v-else
    >
      <p class="todo-title">待处理业务——{{ formatDictData(item.busi_type,TodoTypeDict) }}</p>
      <p class="todo-num">{{ item.count }}</p>
    </div>
    
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import Tools from "pte-ui/utils/Tools";
import { formatDictData } from "@/util/commondeal.js";

export default {
  name: "TodoTask",
  props: {
    config: Object, // 控件的相关配置
    value: [Object, String]
  },
  data() {
    return {
      list: [],
      TodoTypeDict: []
    };
  },
  created() {
    this.getDictList("AGGS_BUSI_TYPE", "TodoTypeDict");

    setTimeout(() => {
      this.getTodoList();
    }, 3000);

    // if (this.value) {
    //   if (Array.isArray(this.value)) {
    //     this.value.forEach(item => {
    //       let obj = {};
    //       obj.text = item.text || item[this.config.textField] || item;
    //       obj.url = item.url || item[this.config.urlField] || item;
    //       this.list.push(obj);
    //     });
    //   } else {
    //     let obj = {};
    //     obj.text = this.value;
    //     obj.url = this.value;
    //     this.list.push(obj);
    //   }
    // } else {
    //   if (this.config.text || this.config.url) {
    //     let obj = {};
    //     obj.text = this.config.text || this.config.url;
    //     obj.url = this.config.url || this.config.text;
    //     this.list.push(obj);
    //   }
    // }
  },
  methods: {
    formatDictData,
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取代办任务列表
     */
    getTodoList() {
      let params = {
        servicecode: "aggs0004",
        sizePage: 10,
        appId: "aggsOnl"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          console.log(res);
          if (res && res.code === "200") {
            this.list = res.data;

            console.log("res", res);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 跳转业务页面
     * source_system 来源系统
     * busi_type 业务类型
     */
    to(source_system, busi_type) {
      const url = "views/msap/aggs/aggs_wait_todo_by_count.json";
      const toUrl = Tools.resolveStringTemplate(
        url,
        this.$dataBus.getCurrentcParams(this),
        this.$dataBus.getParentcMeta(this),
        this.$dataBus.getParentScope(this),
        this.$dataBus.getCurrentcMeta(this),
        this.$dataBus.getCurrentScope(this)
      );
      let params = {
        source_system,
        busi_type
      }
      //this.$publicFn.openNavTab(url,this);
      this.$openNavTab(url, "待处理业务", params, this);
    }
  }
};
</script>
<style lang="less" scoped>
.todo-box {
  cursor: pointer;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  height: 36px;
  align-items: center;
  justify-content: space-between;
  background: #F7F8FA;
  border-radius: 8px;
  margin-bottom: 12px;
  .todo-title {
    color: #1D2129;
    font-size: 14px;
    font-weight: 500;
  }
  .todo-num {
    background: rgba(76, 142, 218, 0.12);
    width: 32px;
    height: 20px;
    border-radius: 20px;
    text-align: center;
  }
}
.empty-box {
  text-align: center;
  ::v-deep p {
    margin-top: 0 !important;
  }
}
</style>
