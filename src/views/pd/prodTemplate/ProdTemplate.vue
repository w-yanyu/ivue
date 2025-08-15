<template>

  <div>
    <div class="todo-top">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.title"
          :name="item.idField"
          
        >
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="item.params"
            :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ProdTemplate",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      basicForm: {
        valid_flag:"",
        prod_type_name: "",
        prod_version: "",
        template_id: "",
        template_name: ""
      },
      isYESORNOList: [], // 额度产品状态数据字典
      c_$meta: {},
      c_$scope: {},
      activeName: "",
      apply_type_list: "",
      toRequest: {
        method: "get",
        url: "",
      },
      tabList: [], // tab切换列表
    };
  },
  created() {
    //选择的申请类型list，来自父页面
    this.apply_type_list = this.cParentParams.apply_type_list;
    this.getTableData(this.apply_type_list);
    this.basicForm.valid_flag = this.cParentParams.valid_flag;
    this.basicForm.prod_type_name = this.cParentParams.prod_type_name;
    this.basicForm.prod_version = this.cParentParams.prod_version;
    this.basicForm.template_id = this.cParentParams.template_id;
    this.basicForm.template_name = this.cParentParams.template_name;
  },
  mounted() {
    //初始化数据字典
    this.getDictList("MS_E_YESORNO","isYESORNOList");//获取数据字典MS_E_YESORNO
  },  
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
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
    async getTableData(apply_type_list) {
      for (var i = 0; i < apply_type_list.length; i++) {
        var apply_type=apply_type_list[i];
        let params = {
              servicecode: "pd0143",
              grupno: "0006",
              id: apply_type,
            };
            await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params).then((res) => {
              if (res && res.code === "200") {
                let newItem = {};
                newItem.toRequest = this.toRequest;
                newItem.toRequest.url = this.cParentParams.childUrl;
                newItem.idField = res.data.id;
                newItem.title = res.data.title;
                newItem.params = {};
                newItem.params.apply_type = apply_type;
                newItem.params.prod_type = this.cParentParams.prod_type;
                newItem.params.template_id = this.cParentParams.template_id;
                newItem.params.prod_version = this.cParentParams.prod_version;
                this.tabList.push(newItem);
                this.activeName = this.tabList[0].idField;
              }
            })
            .catch((err) => {
              console.error(err);
            });
          }
      // apply_type_list.forEach((apply_type) => {
      //   let params = {
      //     servicecode: "pd0143",
      //     grupno: "0006",
      //     id: apply_type,
      //   };
      //   MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params).then((res) => {
      //     if (res && res.code === "200") {
      //        let newItem = {};
      //       newItem.toRequest = this.toRequest;
      //       newItem.toRequest.url = this.cParentParams.childUrl;
      //       newItem.idField = res.data.id;
      //       newItem.title = res.data.title;
      //       newItem.params = {};
      //       newItem.params.apply_type = apply_type;
      //       newItem.params.prod_type = this.cParentParams.prod_type;
      //       newItem.params.template_id = this.cParentParams.template_id;
      //       newItem.params.prod_version = this.cParentParams.prod_version;
      //       this.tabList.push(newItem);
      //       console.log("最终----", this.tabList);
      //       this.activeName = this.tabList[0].idField;
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
      // });
    },
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
