<template>
    <div>
        <el-form :model="operatorForm" :rules="operatorRules" ref="operatorForm" label-width="120px" class="custom-common--form">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="用户ID" prop="user_id">
                        <el-input v-model="operatorForm.user_id" placeholder="请输入用户ID" :clearable= "true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="用户姓名" prop="user_name">
                        <el-input v-model="operatorForm.user_name" placeholder="请输入用户姓名" :clearable= "true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" class="operatorView">
                    <el-button size="small" type="primary" class="el-icon-search" @click= "searchClick">查询</el-button>
                    <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="tableData" style="width:100%;" border>
            <el-table-column label="序号" type="index" align="center"></el-table-column>
            <el-table-column label="用户ID" prop="user_id" align="center"></el-table-column>
            <el-table-column label="用户姓名" prop="user_name" align="center"></el-table-column>
            <el-table-column label="机构号" prop="branch_id" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="150px">
                <template slot-scope="scope">
                    <div class="selectStyle">
                        <el-button type="text" @click="selectClick(scope.row)">{{$i18ns('选择')}}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        v-show="tableData.length !== 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="start"
        :page-sizes="[10,15,20]"
        :page-size="length"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
        style="text-align: right;">
        </el-pagination>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "DhapprovalRoleManager",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
        return {
            operatorForm: {
                user_name: "", //操作员名称
                user_id: "",
                user_status: "",
                role_Id: ""
            },
            tableData: [], //操作员列表
            length: 10,
            start: 1,
            total: null,       //总记录数
            list: [],
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        /**
         * 获取用户列表信息
         */
        getTableData() {
            let params = {
            servicecode: "ct2002",
            user_name: this.operatorForm.user_name,
            user_id: this.operatorForm.user_id,
            start: this.start,
            length: this.length
            }
            MyAxios.invokeAPI("/SUMP/rest/auth/userManager","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                this.tableData = res.data;
                this.total = res.pageParam.total;
              }
            }).catch(err => {
              console.error(err);
            })
        },
        /**
         * 查询按钮回调
         */
        searchClick() {
          this.$refs.operatorForm.validate((valid) => {
            if (valid) {
              this.list = _.cloneDeep(this.operatorForm);
              this.start = 1;
              this.getTableData();
            } else {
              this.$message.error({
                type: "warning",
                message: "校验不通过"
              })
            }
          })
        },
        /**
         * 重置
         */
        reset() {
          this.$refs.operatorForm.resetFields();
        },
        selectClick(row) {
          let that=this;
          this.$confirm("是否选择新增该用户", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
          let params = {
              servicecode: "PLMSPBTS0010",
              opridd: row.user_id,
              wfrlid: that.cParentParams.wfrlid,
              oprnam: row.user_name,
              branch_id: row.branch_id,
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if(res && res.code === "200") {
                    that.$dataBus.doCallBack(that, {}); //返回上一个页面
                    that.$message({
                    type: 'success',
                    message: '新增成功'
                    });
              }
              else {
                    that.$message({
                     type: 'error',
                       message: '新增失败',
                    });
              }
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消新增'
        });
      })
    },
      handleSizeChange(val) {
        this.length = val;
        this.start = 1;
        this.getTableData();  //重新渲染列表
      },
      //处理当前页数改变的方法
      handleCurrentChange(val) {
        this.start = val;
        this.getTableData();
      },
    }
}
</script>
<style lang="less" scoped>
    .operatorView {
        text-align: right;
    }
</style>
