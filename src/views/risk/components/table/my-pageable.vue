<template>
  <div>
    <el-table :data="tableData"  fit
              :header-cell-style="{height: '40px',padding: '0',background: '#f7f9fa','font-size': '12px',color: '#8590a6'}"
              :row-style="{'font-size': '12px',color: '#212121'}"
              :size="size"
              :max-height="max_height"
              :height="height"
              :width="width"
              ref="multipleTable" border stripe
              @sort-change="handleSort"
              @filter-change="filterHandler"
              @row-click="handleRowClick">
      <el-table-column v-for="(item, index)  in tableHeader"
                       :index="index"
                       :key="index"
                       :prop="item.key"
                       :label="item.title"
                       show-overflow-tooltip
      >
        <template slot-scope="scope">
          <ex-slot v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" :column="item"/>
          <span v-else>{{ scope.row[item.key] || '-' }}</span>

          <!-- 点击跳转页面 -->
          <div v-else-if="th.router">
            <router-link :to="{path: item.router.path, query: {expertFields: scope.row['fieldName']}}">
              {{scope.row[item.prop]}}
            </router-link>
          </div>
          <div v-else>
            <!-- 鼠标滑过显示气泡框 -->
            <el-popover v-if="th.describe"
                        popper-class="popover-el-class"
                        placement="bottom"
                        width="200"
                        trigger="hover"
                        :content="scope.row[item.prop]">
              <span class="describe-wrap" slot="reference" style="-webkit-box-orient:vertical">{{ scope.row[item.prop] }}</span>
            </el-popover>
            <!-- 下拉选择框 -->
            <el-select v-else-if="item.selected" :disabled="!item.disabled" v-model="scope.row[item.prop]"
                       @change="item.changeFunc" clearable>
              <el-option v-for="(item, index) in item.selected" :value="item.value" :label="item.text"
                         :key="index"></el-option>
            </el-select>
            <!-- 纯展示数据 -->
            <span v-else-if="!th.formatData">{{ scope.row[item.prop] }}</span>
            <!-- 需要格式化的数据结构 -->
            <span v-else>{{ scope.row[item.prop] | formatters(item.formatData) }}</span>
          </div>
        </template>

      </el-table-column>
    </el-table>
    <section  v-if="paginaion">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="text-align: right;"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </section>
  </div>
</template>

<script>
  // 自定义内容的组件
  var exSlot = {
    functional: true,
    props: {
      row: Object,
      render: Function,
      index: Number,
      column: {
        type: Object,
        default: null
      }
    },
    render: (h, data) => {
      const params = {
        row: data.props.row,
        index: data.props.index
      }
      if (data.props.column) params.column = data.props.column
      return data.props.render(h, params)
    }
  }
  export default {
    name: 'comp-table',
    components: {exSlot},
    props: {
      size:"",
      max_height: "",
      height: "",
      width:"",

      paginaion: true,
      currentPage: {
        default() {
          return 1;
        },
        type: Number
      },
      pageSizes: {
        default() {
          return [10, 30, 50, 100];
        },
        type: Array
      },
      pageSize: {
        default() {
          return 10;
        },
        type: Number
      },
      total: {
        default() {
          return 0;
        },
        type: Number
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 表格数据
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 表头数据
      tableHeader: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    filters: {
      formatters(val, format) {
        if (typeof (format) === 'function') {
          return format(val)
        } else return val
      }
    },
    methods: {
      // 排序事件
      handleSort(sort) {
        this.$emit('sort-events', sort)
      },
      // 筛选事件
      filterHandler(filters) {
        this.$emit('filter-events', filters)
      },
      // 某一行被点击
      handleRowClick(row) {
        this.$emit('click-events', row)
      },
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val);
      },
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
      },
      formatterValue(row, column, cellValue) {
        return cellValue;
      }
    }
  }
</script>

