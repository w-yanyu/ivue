<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
         {{$i18ns('高管成员数')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.executive_person_num }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('董事会成员数')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.directors_num }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "usbCorpHandlerThumbnail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      cust_no: "",//客户编号
      cust_type: "",// 客户类型
      dataForm: {
        executive_person_num: "", //高管成员数
        directors_num: "" //董事会成员数
      }
    }
  },
  created() {
    this.cust_no = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
    this.queryCustInfo();
  },

  methods: {
    /**
     * 查询客户相应信息
     */
    queryCustInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us0533",
        cust_no: that.cust_no
        // cust_no: "UR00000000010311"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.dataForm = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    }
  }

}
</script>

<style lang="less" scoped>
.display-cell {
  display: flex;
  align-items: center;
  border-radius: 0;
  //background: #efefef;
  //border: 1px solid #e3e8f5;
  //border-top: 0px;
  //border-right: 0px;
}
</style>
