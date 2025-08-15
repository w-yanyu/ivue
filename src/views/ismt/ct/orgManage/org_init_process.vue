<template>
  <div>
    <div align="center" >
      <el-progress :percentage="processData.complete_cent" type="circle" :format="format"></el-progress>
      <!-- <el-progress :text-inside="true" :stroke-width="16" :percentage="processData.complete_cent" :format="format"
        status="success"></el-progress> -->
    </div>
    <el-table :data="recordList" border style="width: 100%">
      <el-table-column prop="system_name" :label="$i18ns('系统名称')" align="center"></el-table-column>
      <el-table-column prop="org_id" :label="$i18ns('被复制法人')" align="center"></el-table-column>
      <el-table-column prop="target_org_id" :label="$i18ns('目标法人')" align="center"></el-table-column>
      <el-table-column prop="tran_state" :formatter="formatStatusData" :label="$i18ns('交易状态')" align="center">

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      timer: null,
      processData: {
        all_count: 0,
        complete_count: 0,
        failure_count: 0,
        complete_cent: 0,
        uncomplete_count: 1
      },
      busi_seq: "",
      recordList: [],
      tran_state_list: []
    }
  },

  mounted() {
    this.getDictList('COM_E_BAT_TRAN_STATE', 'tran_state_list');
    this.busi_seq = this.cParentParams.busi_seq;
    this.queryInitProcess();
    this.timer = setInterval(() => {
      this.queryInitProcess();
    }, 2000)

  },
  methods: {
    format(percentage) {
      // return percentage === 100 ? '满' : `${percentage}%`;
      return this.processData.complete_count + '/' + this.processData.all_count;
    },
    /**
        * 表格字典值转换
        */
    formatStatusData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.tran_state_list.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
    },
    queryInitProcess() {


      let params = {
        busi_seq: this.busi_seq,

        servicecode: "ct2348"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res.data) {
            this.processData.complete_cent = res.data.complete_count / res.data.all_count * 100;
            this.processData.all_count = res.data.all_count;
            this.processData.complete_count = res.data.complete_count;
            this.processData.failure_count = res.data.failure_count;
            this.processData.uncomlpete_count = res.data.uncomplete_count;
            this.recordList = res.data.recordList;
            if (this.processData.uncomlpete_count == 0) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }


        })
        .catch(error => {
          this.showTable = true;
          //alert(error);
        });
    },
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
    }


  },
  beforeDestroy() {
    // js提供的clearInterval方法用来清除定时器
    clearInterval(this.timer);
    this.timer = null;
  }
}
</script>

<style lang="less" scoped>
.sun-progress {
  margin: 0 auto 16px;
  width: 200px;
}
</style>