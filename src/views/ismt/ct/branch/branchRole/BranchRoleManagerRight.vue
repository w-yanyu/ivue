<template>
  <div class="view_box">
    <div style="width:950px;height: 50px">
      <div style=" margin-top: 20px;margin-left: 30%;float: left;width:500px">
        <el-input
          placeholder="请输入角色编号"
          v-model="roleId"
          clearable>
        </el-input>
      </div>
      <div style=" margin-top: 25px;margin-left: 2%;float: left">
        <el-button type="primary" icon="el-icon-search" @click="initBranchRoleData">搜索</el-button>
      </div>
    </div>
    <div style=" margin-top: 20px;margin-left: 12%;">
      <el-button type="primary" @click="openDialog">新增关联角色</el-button>
    </div>
    <div class="table_box">
      <el-table
        :data="roleData"
        border
        style="width: 100%">
        <el-table-column
          prop="branch_id"
          align="center"
          label="机构号">
        </el-table-column>
        <el-table-column
          prop="branch_name"
          align="center"
          label="机构名称">
        </el-table-column>
        <el-table-column
          prop="role_id"
          align="center"
          label="关联角色编号">
        </el-table-column>
        <el-table-column
          prop="role_name"
          align="center"
          label="角色名称">
        </el-table-column>

        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="deleteBranchRole(scope.row)"></i>
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
    name: "BranchRoleManagerRight",
    props:['branch_id'],
    data() {
      return {
        roleData:[],
        branchId:'',
        roleId:'',
        // 分页总条数
        total: 0,
        pageNum:1,
        pageSize:10,
      }

    },
    created() {
      this.initBranchRoleData();
    },
    mounted() {
      EventBus.$on("Branch", (branchInfo) => {
        this.branchId = branchInfo;
      });

    },
    methods: {
      initBranchRoleData(){
        let params = {
          branch_id: this.branchId,
          role_id:this.roleId,
          start:this.pageNum,
          servicecode: "ct2181",

        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.roleData = res.data;
            this.total = res.pageParam.total;
          }
        }).catch(err => {
          console.error(err)
        })
      },

      // 删除机构角色关联
      deleteBranchRole(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            branch_id: row.branch_id,
            role_id:row.role_id,
            servicecode: "ct2179",
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res.code === "200") {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.initBranchRoleData();
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
        this.initBranchRoleData()
      },

      // 新增机构角色弹窗
      openDialog() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "机构关联角色新增",
          toRequest: {
            url: "/views/ismt/ct/branch/branchRole/branch_role_add.json",
            method: "get",
            "params": {
              "branch_id": that.branchId
            }
          },
          width: "60%"
        })
      },
      jsonCallBack(a,b){
        this.initBranchRoleData()
      }

    },
    watch: {
      'branch_id' :{
        handler(val) {
          this.branchId = val
          this.pageNum = 1
          this.initBranchRoleData()
        }
      },
      'roleId':{
        handler(val) {
          this.pageNum = 1
          this.initBranchRoleData()
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
