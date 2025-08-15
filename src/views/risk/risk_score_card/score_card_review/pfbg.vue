<template>
<div>
    <el-table
        :data="detail_bak_2"
        :show-header="true"
        :span-method="arraySpanMethod"
      >
        <el-table-column
          v-for="column in detail_bak_1"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
          align="center"
          min-width="20px"
        ></el-table-column>
      </el-table>
    
<div>
    <el-pagination
      
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageSize"
    >
    </el-pagination>
  </div>


    </div>
</template>
  
  <script>
 export default {
      props: {
       cMeta: Object, //本页面模板json数据Layout对象
       cParentMeta: Object, //父页面模板json数据Layout对象
       cParentParams: Object, //父页面自定义参数与内置参数
       cParentScope: Object, //父页面每块区域业务数据
     },
      data() {  
        return {
          detail_bak_1:[],
          detail_bak_2:[],
           // 分页数据源
      currentPage: 1, // 当前显示页码
      pageSize: 10, // 最大页
      pageSizes:10
        };
      },
   mounted() {
     console.log("score_card_review----父类传过来信息", this.cParentParams);
        this.getFactList();
      },
  methods: {
    /**
     * 单页数据变化监听
     * @param val
     */
    handleSizeChange(val) {
      this.pageSizes = val;
      this.getFactList();
      console.log(`每页 ${val} 条`);
    },
    /**
     * 当前页变化监听
     * @param val
     */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFactList();
      console.log(`当前页: ${val}`);
    },
    /**
     * table page start number index
     */
    indexMethed(index) {
      console.log("页数"+this.currentPage)
      console.log("几条"+this.pageSizes)
      console.log("数字"+this.index)
      return Number(this.currentPage) * Number(this.pageSizes)  + index - 9 ;
    },
      getFactList() {
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode: "deci020219",
                   score_card_code: this.cParentParams.scoreCardCode,
                      start: this.currentPage,
        length: this.pageSizes,
                })
         .then((obj) => {
           this.detail_bak_1 = obj.data.field_map.X;
            this.detail_bak_2 = obj.data.field_map.Y;
           console.log("this.detail_bak_1",this.detail_bak_1);
            console.log("this.detail_bak_1",this.detail_bak_2);
            this.pageSize = obj.data.field_map.pageParam;
            console.log("数量" + obj.data.field_map.pageParam);
         })
         .catch((reg) => {
         });
     },
   }
 }
  </script>
  
  