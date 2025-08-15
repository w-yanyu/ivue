<template>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item name="1">
      <template slot="title">
        <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('经营信息时间轴')}}
      </template>
      <div style="height: 300px; width: 98%; overflow: auto">
        <el-timeline>
          <el-timeline-item v-for="(item, i) in tableList"
                            :key="i"
                            :timestamp="item.year"
                            placement="top"
                            style="text-align: left">
            <el-card>
              <h4>{{ item.busi_name }}</h4>
              <p>{{$i18ns('资本积累')}}：<span style="color: #0a4db2">{{ item.capi_accu | formatMoney }}</span></p>
              <p>{{ item.doc_desc }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <i class="header-icon el-icon-info"></i><em></em>{{$i18ns('经营信息管理')}}
      </template>
      <el-row style="text-align: left">
        <el-button
          size="mini"
          type="primary"
          @click="handleAdd()"
          class="addButton">{{$i18ns('新增')}}
        </el-button>
      </el-row>
      <el-row>
        <el-table ref="singleTable" :data="tableList" :border="true" style="width: 98%; height: 404.5px;">
          <el-table-column :label="$i18ns('经营序号')" prop="oper_no" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('年份')" prop="year" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('企业名称')" prop="busi_name" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('资本积累')" prop="capi_accu" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.capi_accu | formatMoney }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$i18ns('描述')" prop="doc_desc" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('操作')" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">{{$i18ns('维护')}}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">{{$i18ns('删除')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="container-content--pagination">
          <el-pagination v-if="isShowPage"
                         @size-change="sizeChange"
                         @current-change="currentChange"
                         :current-page="currentPage"
                         :page-sizes="[10,15,20]"
                         :page-size="tableSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableTotal">
          </el-pagination>
        </div>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbOpehAndCapaManageInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams: {
        due_item_no: "",
        apply_no: "",
        cust_no: ""
      },
      // tableList: [{
      //   year: 2022,
      //   busi_name: "深圳市长亮科技有限公司",
      //   doc_desc: "大数据时代下，长亮科技携手两大财务公司共同探索数据资产管理新模式",
      //   capi_accu: 10000000
      // }],
      tableList: [],
      activeNames: ["1", "2"],
      isShowPage: false,
      currentPage: 1,
      tableSize: 10,
      tableTotal: 10
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    this.pageParams.due_item_no = this.cParentParams.node_cd;
    this.pageParams.apply_no = this.cParentParams.apply_no;
    this.pageParams.cust_no = this.cParentParams.cust_no;

    // this.pageParams.due_item_no = "custBTA403";
    // this.pageParams.apply_no = "20210315000000000034101";
    // this.pageParams.cust_no = "UR00000000010308";
    //初始化表格
    this.initTableList();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams(){
      if (this.apply_no === null || this.apply_no === ""){
        return false;
      }
      if (this.cust_no === null || this.cust_no === ""){
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === ""){
        return false;
      }
      return true;
    },
    /**
     * 查询列表
     */
    initTableList() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let reqMap = {
        servicecode: "ar1848",
        due_item_no: that.pageParams.due_item_no,
        apply_no: that.pageParams.apply_no,
        cust_no: that.pageParams.cust_no,
        start: that.currentPage,
        length: that.tableSize
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.tableList = res.data;
          that.tableTotal = res.pageParam ? res.pageParam.total : 0;
          that.isShowPage = true;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 删除选项
     */
    handleDelete(index, row) {
      let that = this;
      this.$confirm('将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let reqMap = {
          servicecode: "ar1851",
          oper_no: row.oper_no
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            that.initTableList();
            this.$message({
              type: "success",
              message: "删除成功！"
            })
          }
        }).catch(err => {
          console.error(err);
        });
      }).catch(() => {
      });
    },
    /**
     * 维护经营信息
     * @param index
     * @param row
     */
    handleEdit(index, row) {
      let title = "维护经营信息";
      let url = "/views/pd/dueDiliTemplate/templatePage/ArbOpehAndCapa/ArbOpehAndCapa_modify.json";
      let data = row;
      this.openDialog(title, url, data);
    },
    /**
     * 新增经营信息
     */
    handleAdd() {
      let title = "新增经营信息";
      let url = "/views/pd/dueDiliTemplate/templatePage/ArbOpehAndCapa/ArbOpehAndCapa_add.json";
      this.openDialog(title, url, {});
    },
    /**
     * 页码变化
     */
    sizeChange(val) {
      this.tableSize = val;
      this.initTableList();
    },
    /**
     * 当前页变化
     */
    currentChange(val) {
      this.tableSize = val;
      this.initTableList();
    },
    /**
     * 打开弹窗
     */
    openDialog(title, url, rowData) {
      rowData.due_item_no = this.pageParams.due_item_no,
        rowData.apply_no = this.pageParams.apply_no,
        rowData.cust_no = this.pageParams.cust_no
      console.log("zdfjdkfjdkfj", rowData);
      const option = {
        toRequest: {
          url: url,
          method: "get",
          params: rowData
        },
        width: "50%",
        title: title,
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      this.$dialog.close();
      this.initTableList();
    },
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

.addButton {
  margin: 10px 0 5px 13px;
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

.box {
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  border: 0px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

img {
  width: 100%;
  height: 100%;
}

h4 {
  color: black;
}

p {
  color: black;
}
</style>
