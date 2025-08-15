<template>
  <div>
    <div class="todo-top" >
      <div class="container-content--search" v-if="!viewFlag">
        <el-button type="primary" @click="updateStrategy()" plain>修改委案比例</el-button>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row v-if="viewFlag">
          <el-col :span="12">
            <el-form-item label="调整前分配下限(%):" prop="old_ratio_min" class="upload-item">
              <el-input-number v-model="ruleForm.old_ratio_min" :disabled="true"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="调整前分配上限(%):" prop="old_ratio_max" class="upload-item">
              <el-input-number v-model="ruleForm.old_ratio_max" :disabled="true"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最新分配下限(%):" prop="new_ratio_min" class="upload-item" :rules="{ required: true, message: '最新分配下限不能为空', trigger: 'blur'}">
              <el-input-number v-model="ruleForm.new_ratio_min"  :min="0"  :max="100" :disabled="!viewFlag"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最新分配上限(%):" prop="new_ratio_max" class="upload-item" :rules="{ required: true, message: '最新分配上限不能为空', trigger: 'blur'}">
              <el-input-number v-model="ruleForm.new_ratio_max" :min="100"  :disabled="!viewFlag"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="custom-common--footer">
          <el-button type="primary" size="small" @click="topSubmit"  v-if="viewFlag">提交</el-button>
          <el-button type="primary" size="small" @click="returnMessage"  v-if="viewFlag">{{$i18ns('取消')}}</el-button>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card" >
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.mytitle" :name="item.idField">
          <pte-resolver
            :c-parent-meta="c_$meta"
            :c-parent-scope="c_$scope"
            :c-parent-params="c_$params"
            :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "strategyControl",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        viewFlag:false,
        ruleForm: {
          old_ratio_min: "",
          old_ratio_max: "",
          new_ratio_min: "",
          new_ratio_man: ""
        }
      }
    },
    created() {
    this.getStrategyMessage();
    },
    methods: {

      /**
       * 获取最新限制比例信息
       */
      getStrategyMessage() {
        let params = {
          servicecode: "RLMSPLTS1205_pl1205",
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            if (res.data && res.data.strategyControlInfo) {
              this.ruleForm.old_ratio_min = res.data.strategyControlInfo.new_ratio_min;
              this.ruleForm.old_ratio_max = res.data.strategyControlInfo.new_ratio_max;
              this.ruleForm.new_ratio_min = res.data.strategyControlInfo.new_ratio_min;
              this.ruleForm.new_ratio_max = res.data.strategyControlInfo.new_ratio_max;
            }
          }
        }).catch(err => {
          console.error(err);
        });
      },
      /**
       * 获取tab信息
       */
      updateStrategy() {
        this.viewFlag = true;
      },
      returnMessage() {
        this.getStrategyMessage();
        this.viewFlag = false;
      },

      /**
       * 提交申请
       */
      topSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let params = {
              new_ratio_min:this.ruleForm.new_ratio_min,
              new_ratio_max:this.ruleForm.new_ratio_max,
              servicecode: "RLMSPLTS1160_pl1160",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if (res && res.code === "200") {
                this.getStrategyMessage();
                this.viewFlag = false;
                this.$message({
                  type: "success",
                  message:"申请成功"
                })
              }
            }).catch(err => {
              console.error(err);
            });
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过"
            })
          }
        })
      },

    }
  }
</script>
<style lang="less" scoped>
  .todo-top {
    border-bottom: 1px solid #e3e8f5;
  }

  .todo-bottom--left {
    width: 50%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid #e3e8f5;
    .custom-common--form .el-form-item {
      margin-bottom: 0;
    }
  }
  .internet-info--title {
    font-size: 14px;
    font-weight: 600;
    color: #666;
  }
  .custom-common--footer {
    padding-top: 10px;
  }
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 0px solid #e3e8f5;
  }
</style>
