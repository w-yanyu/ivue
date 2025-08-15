<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-table ref="multipleTable" :data="tableData" border   @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="temp_id" label="评级模板编码" v-if="show"></el-table-column>
        <el-table-column prop="adj_id" label="调整规则编码" v-if="show"></el-table-column>
        <el-table-column prop="adj_name" label="分类名称"> </el-table-column>
        <el-table-column label="调整后的值">
          <template slot-scope="scope">
            <select-option :temp_id="scope.row.temp_id" :adj_id="scope.row.adj_id" :scope="scope">
            </select-option>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel()">{{$i18ns('取消')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import selectOption from "./select.vue"; // 信用评级财务因素页面
export default {
   props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
   },
  data() {
    return {
      radio: "",
      show: false,
      tableData: [],
      adjust: {
       new_rlv: "",
       adju_rk: "",
       adj_id: ""
      },
      formData: {
        servicecode: "cr1020",
        appl_id: "",
        cust_no: "",
        procinst_id: "",
        role_id:"",
        temp_id:"",
        rolecd: "",
        procinstid: "",
        custid: "",
        adjudt: "",
        adjuus: "",
        adj_id: "",
        evaldt: "",
        adjutp: "",
        tpltrgid: "",
        adjust: [],
      },
        multipleSelection: [] //用于存储选
    };
  },
  components: {
    selectOption,
  },
  created() {
   this.formData.appl_id = this.cParentParams.applid;
   this.formData.appl_id = this.cParentParams.applid;
   this.formData.role_id = this.cParentParams.cur_wfrl_id;
   this.formData.procinst_id = this.cParentParams.wf_inst_id;
   this.formData.cust_no = this.cParentParams.cust_id;
    this.formData.temp_id= this.cParentParams.reserve2;
   this.fetchData();
  },
  methods: {
    fetchData() {

      var _this = this; //很重要！！
      let params = {
        temp_id: this.cParentParams.reserve2, //
        servicecode: "cr0051",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            _this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onSubmit(param) {
      let flag = true;
      this.formData.adjust = [];
      if (this.multipleSelection.length === 0){
        this.$alert('请先勾选分类名称');
        return;
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        // this.adjust.newrlv=this.multipleSelection[i].adj_id;
        let obj = {};
        // obj.newrlv = this.multipleSelection[i].adj_level;
        obj.adj_id = this.multipleSelection[i].adj_id;
        obj.adju_rk = this.multipleSelection[i].adj_name;
        obj.new_rlv = this.multipleSelection[i].level_rule_rank;
        this.formData.tpltrgid = this.multipleSelection[i].temp_id;
        this.formData.adjust.push(obj);
      }
      this.formData.adjust.forEach(item => {
         if (item.new_rlv === "" || typeof (item.new_rlv) === "undefined"){
            flag = false;
         }
      });
      if (flag === false){
        this.$alert('请选择调整后的值');
        return;
      }
      console.log(this.formData);
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", this.formData)
      .then((res) => {
        if (res && res.code === "200") {
          // this.tableData = res.data;
          this.$emit("update");
        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
    onCancel(param) {
      this.$emit("update");
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
};
</script>

