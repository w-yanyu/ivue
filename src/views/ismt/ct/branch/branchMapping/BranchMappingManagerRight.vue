<template>
  <div class="view_box">
    <div style=" margin-top: 20px;margin-left: 12%;">
      <el-button type="primary" @click="openDialog">新增映射机构</el-button>
    </div>
    <div class="table_box">
      <el-table
        :data="branchMappingData"
        border
        style="width: 100%">
        <el-table-column
          prop="branch_id"
          align="center"
          label="机构号">
        </el-table-column>
        <el-table-column
          prop="related_branch_id"
          align="center"
          label="映射机构号">
        </el-table-column>
        <el-table-column
          prop="branch_mapping_type"
          align="center"
          label="机构映射类型">
          <template slot-scope="scope">

              <span>{{setbranchMappingType(scope.row.branch_mapping_type)}}</span>

          </template>

        </el-table-column>

        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="deleteBranchMapping(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :page-size="pageSize"
        :page-count="pageNum"
        :total="total"
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        style="height:30px;margin-top:10px;text-align: center"
      ></el-pagination>
    </div>
  </div>

</template>
<script>

  import {EventBus} from "../Bus";
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "BranchMappingManagerRight",
    props: ['branch_id','brch_relation_code'],
    data() {
      return {
        branchMappingData: [],
        branchMappingType:[],
        // 分页总条数
        total: 0,
        pageNum: 1,
        pageSize: 10,
      }

    },
    created() {
      this.getBranchMappingType();
      this.initBranchMappingData();

    },
    mounted() {
      EventBus.$on("Branch", (branchInfo) => {
        this.branchId = branchInfo;
      });

    },
    methods: {
      initBranchMappingData() {
        let params = {
          branch_id: this.branchId,
          start: this.pageNum,
          servicecode: "ct2177",

        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.branchMappingData = res.data;
            this.total = res.pageParam.total;
          }
        }).catch(err => {
          console.error(err)
        })
      },


      // 删除机构角色关联
      deleteBranchMapping(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            branch_id: row.branch_id,
            related_branch_id:row.related_branch_id,
            servicecode: "ct2175",
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res.code === "200") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.initBranchMappingData();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 页数的改变
      handleCurrentChange(val) {
        this.pageNum = val
        this.initBranchMappingData()
      },

      openDialog() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "机构映射新增",
          toRequest: {
            url: "/views/ismt/ct/branch/branchMapping/branch_mapping_add.json",
            method: "get",
            "params": {
              "branch_id": that.branchId,
              "brch_relation_code":that.brch_relation_code
            }
          },
          width: "60%"
        })
      },
      jsonCallBack(a,b){
        this.initBranchMappingData()
      },

      setbranchMappingType(event){
        for (let i in this.branchMappingType){
          if(this.branchMappingType[i].dict_id === event){
            return this.branchMappingType[i].dict_name;
          }
        }
      },
      // 加载机构关系
      getBranchMappingType(){
        let params = {
          dict_type: "CT_E_BRANCH_MAPPING_TYPE",
          servicecode: "ct2205",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.branchMappingType = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },

    },
    watch: {
      'branch_id' :{
        handler(val) {
          this.branchId = val
          this.pageNum = 1
          this.initBranchMappingData()
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.view_box{
  width: 95%;
  height: 95%;
  padding: 10px;
}
  .table_box{
    width: 80%;
    margin-top: 20px;
    height: 60%;
    margin-left: 10%;
  }
</style>
