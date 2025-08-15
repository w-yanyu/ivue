<template>
  <div class="collAccount_details_container">
    <CollAccountDetailItem
      v-for="(detail, index) in details"
      :key="index"
      :tableData="detail"
      :index="index"
      :dictionaries="dictionaries"
    />
  </div>
</template>
<script>
import CollAccountDetailItem from "./CollAccountDetailItem.vue";
import MyAxios from "pte-ui/utils/MyAxios";
/**
 * 所有相关还款责任信息展示组件
 * TODO 需要在这里处理过滤相关还款责任，因为涉及到相关还款责任序号的显示，最好提前控制。如果不在乎序号就可以直接传入。
 * 每个CollAccountDetailItem负责具体的相关还款责任显示，相关还款责任显示具体逻辑在该组件中修改。
 */
export default {
  name: "CollAccountDetails",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
    collAccountParam: {
      Type: Object,
      default() {
        return {}
      }
    }
  },
  components: { CollAccountDetailItem },
  data() {
    return {
      details: [],
      // 字典集合
      dictionaries: {},
    };
  },
  async created() {
    await this.getDictLists().catch(res => {
      console.error(res);
      this.$message.error("字典获取失败！")
      throw new Error('get dicts error!');
    })
    this.initData(this.collAccountParam);
  },
  methods: {
    async initData(form) {
      this.details = await this.getData(form);
    },
    getData(form) {
      console.log("###################$$$$$$$$$$$$$$$$$$$$$$$#########sys_flg:",form.sys_flg)
      console.log("###################$$$$$$$$$$$$$$$$$$$$$$$#########apply_no:",form.apply_no)
      console.log("###################$$$$$$$$$$$$$$$$$$$$$$$#########credit_reports_no:",form.credit_reports_no)
      return new Promise((resolve) => {
        let servicecode = "ar8023";
        console.log("ddddddddddddddddddddddddddddddddd",servicecode)
        if("icms" === form.sys_flg){
          servicecode = "ar8023";
          console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
        }else if("plms" === form.sys_flg){
          servicecode = "pl8023";
          console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
        }

        let params = {
          servicecode: servicecode,
          apply_no:form.apply_no,
          credit_reports_no: form.credit_reports_no
        }
        let that = this;
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params)
        .then(res => {
          if (res && res.code === "200") {  
            console.log("===#################################===res:",res.data)
            resolve(res.data);
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error(err)
        });
      });
    },
    /**
     * 初始化获取所有需要用到的字典
     */
    getAllDictionaries() {},
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     */
    async getDictList(dictType) {
      return new Promise((resolve, reject) => {
        let params = {
          dictType: dictType
        };
        let that = this;
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.dictionaries[dictType] = res.data;
            resolve();
          } else {
            reject();
          }
        })
        .catch(err => {
          console.error(err);
          reject();
        });
      })
    },
    async getDictLists() {
      return Promise.all([
        this.getDictList('E_C_LOANTYPE'),//业务种类
        this.getDictList('E_C_ACCOUNT_STATUS_C1'),//账户状态：C1
        this.getDictList('E_C_SPECIALTRADETYPE'),//特殊交易类型
        this.getDictList('E_QUERY_ORG_TYPE'),
      ])
    }

  },
};
</script>
<style lang="css" scoped></style>
