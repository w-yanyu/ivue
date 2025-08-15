<template>
  <div class="app-container">
    <el-form
      ref="searchForm"
      :model="divisionReq"
      size="small"
      label-width="100px"
    >
      <el-row :gutter="15">
        <el-col :span="65">
          <el-form-item label="案件数" prop="qualityCaseNum">
            <el-input
              placeholder="请输入内容"
              v-model="this.cParentParams.selectedData.length"
              :disabled="true"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分案至" prop="qualityCaseTo">
            <el-select
              v-model="divisionReq.qualityCaseTo"
              style="width: 180px"
              placeholder="请选择"
              filterable
              :disabled="true"
            >
              <el-option
                v-for="item in qualityCaseTo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分派方式" prop="qualityCaseType">
            <el-select
              v-model="divisionReq.qualityCaseType"
              style="width: 180px"
              placeholder="请选择"
              filterable
              :disabled="true"
            >
              <el-option
                v-for="item in qualityCaseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getQualityUsersWithCounts()"
        >查询</el-button
      >
      <el-button type="primary" @click="qualityCaseToUserCheck()">派案</el-button>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="qualityUsersWithCounts"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="user_name"
        label="质检员"
        width="240"
      >
      </el-table-column>
      <el-table-column align="center" prop="branch_id" label="部门" width="240">
      </el-table-column>
      <el-table-column
        align="center"
        prop="quality_user_case_num"
        label="当前案件数"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    getTreeData: {
      type: String,
      default() {
        return null;
      },
    },
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      qwe: true,
      qualityUeres: [
        {
          value: "",
          label: "",
        },
      ],
      qualityCaseType: [{}],
      qualityUsersWithCounts: [],
      qualityUserList: [],
      tableData: [],
      // 选中的用户数据
      selectQualityUserList: [],
      divisionReq: {
        qualityCaseNum: null,
        qualityCaseTo: "a",
        qualityCaseType: "a",
      },
      qualityCaseTo: [
        {
          value: "a",
          label: "质检员",
        },
      ],
      qualityCaseType: [
        {
          value: "a",
          label: "平均分配",
        },
      ],
      value: "",
    };
  },
  mounted() {
    // 查询当前质检员
    this.getQualityUsers();
  },
  methods: {
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
      this.selectQualityUserList = val;
    },
    // 根据质检员角色获取对应的用户
    getQualityUsers() {
      let params = {
        servicecode: "ct2501",
        role_id: "cszjy01",
      };
      MyAxios.invokeAPI("/SUMP/rest/auth/userManager", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.qualityUserList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 获取质检员及其当前对应的案件数量
    getQualityUsersWithCounts() {
      let params = {
        servicecode: "qc0018",
        param: this.qualityUserList,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.qualityUsersWithCounts = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 质检派案
    qualityCaseToUserCheck() {
      if (this.selectQualityUserList.length > 0) {
        this.qualityCaseToUser();
      } else {
        this.$message({
          showClose: true,
          message: "请选择质检员！",
          type: "warning",
        });
      }
    },
    qualityCaseToUser() {
      let params = {
        servicecode: "qc0019",
        cases: this.cParentParams.selectedData,
        users: this.selectQualityUserList,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.$dialog.close();
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
</style>