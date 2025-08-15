<template>
  <div>
    <div class="btnBox">
      <!--<Button id="ents-t-pageable0" data-sign="ents-t-pageable" @click="handleBulkSubmit" type="primary" v-if="bulkable" icon="arrow-up-c" class="btnMargin">批量提交</Button>-->
      <el-button  @click="handleAdd" type="primary" v-if="addable" class="btnMargin">新增</el-button>
      <el-Button  @click="handleDelete" type="error" v-if="deleteable&&!bulkable" class="btnMargin">删除</el-Button>
    </div>
    <div>
      <el-table border @selection-change="selectionChange" :data="tableData"  :loading="loading" stripe :height="height" :highlight-row="highlightRow" @row-click="clickRow" @row-dblclick="onRowDblclick" @select="onSelect" @select-all="onSelectAll" @current-change="onCurrentChange" @select-cancel="onSelectCancel" @sort-change="onSortChange">
        <el-table-column   v-for="(item, index) in columns"
                           :prop="item.key"
                           :label="item.title"
                           :key="item.key"
                           sortable
                           show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-section style="margin: 10px; overflow: hidden;" v-if="paginaion">
        <div style="float: right;display:flex;line-height:32px;">
          <!-- //白金客户未处理数据展示 -->
          <span v-if="disposeText" style="margin-right:10px;">未处理数据 {{disposeData}} 条</span>
          <el-page :current="pagenum" :page-size="pagesize" :total="_mytotal" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer show-total show-elevator placement="top" :page-size-opts="pageSizeOpts"></el-page>
        </div>
      </el-section>
    </div>
    <div class="content-buttons" v-if="bulkable">
      <el-button  type="primary" @click="handleBulkSubmit">批量提交</el-button>
      <el-button  type="error" @click="handleBulkDelete">批量删除</el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
import fDate from './f-date'
import fNumber from './f-number'
import * as C from './column-render'
import {
  dynamicRenderRow
} from './cell-render'
export default {
  props: {
    downloadCsv: {
      type: String,
      default: ''
    },
    row: Object,
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    paginaion: {
      type: Boolean,
      default: false
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    deleteable: {
      type: Boolean,
      default: false
    },
    bulkable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    _pagesize: {
      type: Number,
      default: 10
    },
    _pagenum: {
      type: Number,
      default: 1
    },
    _total: {
      type: Number,
    },
    optionSelection: {
      type: Array
    },
    height: {
      type: Number
    },
    recFlag: {
      type: Boolean,
      default: false
    },
    recIndex: {
      type: Number
    },
    addFlag: {
      type: String
        //default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    //白金高端客户未处理数据
    disposeText: {
      type: Boolean,
      default: false
    },
    disposeData: {
      type: String
    },
    pageSizeOpts: {
      type: Array,
      default: () => [10,40,70,100]
    }
  },
  components: {
    fDate,
    fNumber
  },
  data() {
    return {
      tableData: [],
      reviseTableData: [],
      pagenum: 0,
      pagesize: 0,
      total: 0,
      cells: {},
      resetDom: true,
    }
  },
  computed: {
    _mytotal: {
      get: function() {
        return this._total
      },
      set: function() {

      }
    }
  },
  watch: {
    downloadCsv: function(value) {
      this.getExportCsv()
    },
    tableData: function(value) {
      this.resetDom = false;
      this.$nextTick(function() {
        this.resetDom = true;
      })
    },
    _total: function(newVlal, oldVal) {
      if (newVlal != oldVal) {
        this.pagenum = 1;
      }
    },
    _pagenum: function(newVlal, oldVal) {
      if (newVlal == 1) {
        this._mytotal = 0;
      } else {
        this._mytotal = this._total;
      }
    },
    data() {
      this.init();
    },
    recFlag: function(newVal, oldVal) {
      if (newVal) {
        if (this.addFlag == "0") {
          this.tableData[this.recIndex].adding = true;
        } else {
          this.tableData[this.recIndex].editting = true;
        }
        this.tableData[this.recIndex].saving = false;
      }
    },
    commitAddCol: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.handleAdd()
      }
    }
  },
  methods: {
    onSelectAll(data) {
      this.$emit('on-select-all', data)
    },
    onSelect(data, row) {
      this.$emit('on-select', data, row);
    },
    clickRow(data) {
      this.$emit('on-row-click', data);
    },
    onRowDblclick(index) {
      this.$emit('on-row-dblclick', index);
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow);

    },
    onSortChange(sortColumn) {
      this.$emit('on-sort-change', sortColumn);
    },
    selectionChange(value) {

      this.optionSelection = value;
      this.$emit('on-selection-change', value);
    },
    onSelectCancel(selection, row) {
      this.$emit('on-select-cancel', selection, row);
    },
    init() {
      this.tableData = JSON.parse(JSON.stringify(this.data));
      this.edittingStore = this.tableData;
      this.backStore = this.handleBackdata(this.tableData);
      //this.edittingStore = JSON.parse(JSONstringify(this.tableData));
      this.columns.forEach(col => C.renderColumn(this, col));
    },
    fetch() {
      throw new Error('No Implement!');
    },
    changePage(v) {
      this.pagenum = v;
      this.$emit('paginationchange', {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        total: this.total
      });
    },
    changePageSize(v) {
      this.pagesize = v;
      this.$emit('paginationchange', {
        pagenum: 1,
        pagesize: this.pagesize,
        total: this.total
      });
    },
    handleAdd() {
      let addObj = {};
      this.columns.forEach(function(col, index) {
        addObj[col.key] = "";
      });
      addObj.adding = true;
      this.tableData.unshift(addObj);

      // let count=0;
      // this.tableData.forEach((item, index) => {
      //   if(item.adding){
      //     count++;
      //   }
      // })
      // if(count!=0){
      //   this.$Message.error('请先保存当前可编辑的行，再继续添加!');
      //   return;
      // }else{
      //   this.tableData.push({
      //     adding: true
      //   });
      // }
      dynamicRenderRow(this, addObj, this.tableData.length - 1);
      // this.edittingStore = JSON.parse(JSON.stringify(this.tableData));
    },
    handleDelete() {
      let data = this.optionSelection;
      if (data && data.length > 0) {
        this.$emit('on-bulk-delete', data);
      } else {
        this.$Message.error('请选择要删除的行!');
      }
    },
    handleBulkSubmit() {
      let data = this.optionSelection;
      if (!data || data.length < 1) {
        this.$Message.error('请选择要提交的行!');
        return;
      }
      let lastRowAdding,
        lastRowEditting,
        isvalid = true;
      for (let i = 0; i < data.length; i++) {
        let row = data[i];
        if (!row.adding && !row.editting) {
          this.$Message.error('有不属于编辑或新增状态，不能提交');
          isvalid = false;
          break;
        }
        if (i > 0) {
          if (lastRowAdding != row.adding || lastRowEditting != row.editting) {
            this.$Message.error('有属于编辑状态，又有属于新增状态，不能提交');
            isvalid = false;
            break;
          }
        }
        lastRowAdding = row.adding;
        lastRowEditting = row.editting;
      }
      if (!isvalid) return;
      let type = lastRowAdding ? 'add' : 'edit';
      this.$emit('on-bulk-submit', data, type);
    },
    handleBackdata(data) {
      let clonedData = JSON.parse(JSON.stringify(data));
      clonedData.forEach(item => {
        delete item.editting;
        delete item.edittingCell;
        delete item.saving;
      });
      return clonedData;
    },
    handleBulkDelete() {
      console.log("請補充這裡的邏輯")
    }
  },
  created() {
    this.pagesize = this._pagesize;
    this.pagenum = this._pagenum;
    this._mytotal = this._total;
    /*
    for (let i=0; i<15; i++) {
      for (let j=0; j<15; j++) {
        this.cells[`${i}-${j}`] = 0;
      }
    }
    */
    this.init();
  }
}
</script>
<style lang="less">
.btnBox {
  text-align: right;
  line-height: 1;
  button {
    margin-right: 20px;
  }
}

.btnMargin {
  margin-top: -10px;
  margin-bottom: 5px!important;
}

.ivu-table .valid-cell .ivu-input-wrapper {
  border: solid 1px red;
  border-radius: 3px;
}

.ivu-table .valid-cell .ivu-select {
  border: solid 1px red;
  border-radius: 3px;
}

.content-buttons {
  text-align: center;
  button {
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
}

.ivu-table-cell .ivu-tooltip {
  width: 100%;
  .ivu-tooltip-rel {
    position: static;
    width: 100%;
  }
}
</style>
