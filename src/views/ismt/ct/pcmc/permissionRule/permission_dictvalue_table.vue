<template>
  <div class="container" v-loading="showTable">
    <!-- 查询表格 -->
    <div class="left-content">
      <el-form ref="searchTable" :model="searchTable" size="small" :inline="true">
        <el-form-item :label="$i18ns('字典名称')">
          <el-input v-model="searchTable.dict_name" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">{{$i18ns('查询')}}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="ruleTableData" height="320" border style="width: 100%">
        <el-table-column prop="dict_type" :label="$i18ns('字典类型')"></el-table-column>
        <el-table-column prop="dict_id" :label="$i18ns('字典ID')"></el-table-column>
        <el-table-column prop="dict_name" :label="$i18ns('字典名称')"></el-table-column>
        <el-table-column prop="dict_type_name" :label="$i18ns('字典类型名称')"></el-table-column>
        <el-table-column :label="$i18ns('操作')" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.showBtn"
              @click="handleClick(scope.row)"
              type="text"
              size="small"
            >{{$i18ns('选择')}}</el-button>
          </template>
        </el-table-column>
        <!-- 缺省图配置 -->
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </el-table>
      <div class="pagenation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="singlePage"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 已选数据 -->
    <div class="right-content">
      <div class="right-content-title">
        <span>{{$i18ns("已选数据")}}</span>
      </div>
      <div class="right-content-area">
        <el-tag
          v-for="tag in tags"
          :key="tag.dict_type"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{ tag.dict_name }}</el-tag>
      </div>
      <div class="right-content-btn">
        <el-button
          @click="bringback"
          type="primary"
          size="small"
        >{{$i18ns("保存")}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";

export default {
  data() {
    return {
      cParentParams: this.$dataBus.getCurrentcParams(this) || {}, // 父页面传的参数
      cParentMeta: this.$dataBus.getParentcMeta(this) || {}, // 父页面的相关json数据
      cParentScope: this.$dataBus.getParentScope(this) || {}, // 父页面的scope数据对象
      cMeta: this.$dataBus.getCurrentcMeta(this) || {}, // 布局相关json数据
      searchTable: {
        dict_name: ""
      },
      ruleTableData: [],
      tableData: [],
      singlePage: false, //是否只有一页
      currentPage: 1, //分几页
      total: 5,
      pageSize: 10, //每页条数
      tags: [], // 已选数据列表
      tagsId: [], // 已选数据列表
      initSearch: true, // 初始化查询标记
      showTable: false,
    };
  },
  created() {
    
  },
  mounted() {
    if(this.cParentParams.rule_value) {
      this.tagsId = this.cParentParams.rule_value.split(",")
    }
    this.initRulesData();
  },
  methods: {
    /**
     * 查询值集列表
     */
    initRulesData(currentPage, pageSize) {
      this.showTable = true;
      if (!currentPage) {
        currentPage = this.currentPage;
      }
      if (!pageSize) {
        pageSize = this.pageSize;
      }
      
      let params = {
        dict_type: this.cParentParams.dict_type,
        dict_name: this.searchTable.dict_name,
        servicecode: "ct2205",
        pageSize: pageSize,
        currentPage: currentPage
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res.data) {
            let tableData = Object.assign(res.data);
            tableData.forEach(ele => {
              let status = '1';
              if(this.initSearch) {
                this.tagsId.forEach(item => {
                  if (item === ele.dict_id) {
                    status = '0';
                  }
                });
              }else {
                this.tags.forEach(item => {
                  if (item.dict_id === ele.dict_id) {
                    status = '0';
                  }
                });
              }
              
              if (status === '0') {
                ele.showBtn = false;
              } else {
                ele.showBtn = true;
              }
            });
            this.ruleTableData = Object.assign(tableData);
            this.initSelect();
          }
          this.total = parseInt(res.pageParam.total);
          
          if (
            parseInt(res.pageParam.pageSize) > parseInt(res.pageParam.total)
          ) {
            this.singlePage = true;
          } else {
            this.singlePage = false;
          }
          
        })
        .catch(error => {
          this.showTable = true;
          //alert(error);
        });
    },
    // 初始化选中标签
    initSelect() {
      this.showTable = false;
      if(this.initSearch){
        this.ruleTableData.forEach(item => {
          if(!item.showBtn) this.tags.push(item)
        })
      }
    },
    // 选择
    handleClick(value) {
      value.showBtn = false;
      this.tags.push(value);
    },
    handleClose(tag) {
      //关闭tags
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.ruleTableData.forEach(ele => {
        if (ele.dict_id === tag.dict_id) {
          ele.showBtn = true;
        }
      });
    },
    onSubmit() {
      this.initSearch = false;
      // 查询
      this.initRulesData();
    },
    handleSizeChange(pageSize) {
      this.initSearch = false;
      this.initRulesData(1, pageSize);
    },
    handleCurrentChange(pages) {
      this.initSearch = false;
      //切换页码
      this.initRulesData(pages, this.pageSize);
    },
    // 带回
    bringback() {
      this.$dataBus.doCallBack(this, this.tags);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.left-content {
  width: 70%;
  // box-shadow: 0 3px 15px 1px #e7e8e9;
  border-radius: 5px;
  margin: 1px;
  .pagenation {
    text-align: right;
  }
}
.right-content {
  position: relative;
  width: 28%;
  height: 450px;
  box-shadow: 0 2px 12px 5px #e7e8e9;
  border-radius: 5px;
  margin: 1px;
  .right-content-title {
    padding: 10px;
    line-height: 18px;
    font-size: 13px;
    border-bottom: 1px solid #eee;
  }
  .right-content-area {
    height: calc(100% - 80px);
    overflow: auto;
  }
  .right-content-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    .el-button {
      padding: 8px 10px;
    }
  }
  .el-tag {
    margin: 8px 0 0 12px;
  }
}
</style>