<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="规则组代码" prop="groupCode" label-width="100px">
              <el-input class="input_el" v-model="ruleForm.groupCode" type="text" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="规则组名称" prop="groupName" label-width="100px">
              <el-input class="input_el" v-model="ruleForm.groupName" @input="groupNameInput($event)" type="text">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="description" label-width="100px">
              <el-input class="input_el" type="textarea" :rows="3" v-model.number="ruleForm.description" maxlength="500"
                show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-transfer class='transfer' target-order="unshift" v-model="selectGroup" @change="transferChange"
            :titles="['规则列表', '选中规则']" :data="currentPageDatas">
            <el-pagination small slot="left-footer" align="right" @current-change="handleCurrentChange"
              v-if="page.total!=1 || page.total!=0" :current-page="page.pageNum" :page-size="page.pageSize"
              :total="page.total" :pager-count="5" layout="prev, pager, next"
              :hide-on-single-page="page.total==1 || page.total==0"></el-pagination>
          </el-transfer>

        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {},
    data() {
      return {
        ruleForm: {
          groupCode: '', //规则组代码
          groupName: "", //规则组名称
          groupId: "", //规则组
          description: "", //备注
        },
        rules: {
          groupCode: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],
          groupName: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],
        },
        selectGroup: [], //穿梭框选择组
        currentPageDatas: [], //穿梭框选择数据组
        currentDatas: [],
        sourceDatas: [],
        formDatas: {
          river: "",
        },
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          readedPageNum: [], //已读页码组
        },

      }
    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
      that.init();
    },
    methods: {
      init() {
        let that = this;
        that.ruleForm.groupCode = that.cParentParams.groupCode;
        that.ruleForm.groupId = that.cParentParams.groupId;
        that.ruleForm.groupName = that.cParentParams.groupName;
        that.ruleForm.description = that.cParentParams.description;
        that.postTransferData();
      },
      postTransferData() {
        let that = this;
        let params = {
          length: that.page.pageSize,
          ruleCode: "",
          ruleId: "",
          ruleName: "",
          ruleVersion: "",
          start: that.page.pageNum,
        };
        //请求表格数据
        that.$http
          .invokeAPI("/API/risk-management-service/risk-decision-rule/page-select", "POST", params)
          .then(obj => {
            console.log("请求表格数据回调", obj);
            if (obj.code === '200') {
              let currentDatas = obj.data.map((value, index) => {
                return {
                  label: `[${value.ruleId}]${value.ruleName}`,
                  key: index + that.currentPageDatas.length,
                  obj: value,
                };
              });
              console.log('currentDatas', currentDatas);
              that.page.total = obj.pageParam.total;
              let isReadedPage = false;
              that.page.readedPageNum.find(function(value) {
                if (value === that.page.pageNum) {
                  isReadedPage = true;
                }
              })
              if (!isReadedPage) {
                // that.currentPageDatas = currentDatas;
                that.currentPageDatas.push(...currentDatas);
                that.sourceDatas.push(...currentDatas);
                that.page.readedPageNum.push(that.page.pageNum)
              }
              console.log('要显示的数组', that.currentPageDatas);
              console.log('记录的总数组', that.sourceDatas);
              console.log('记录已缓存的页码', that.page.readedPageNum);
            }
          })
          .catch(reg => {});
      },
      // 分页change
      handleCurrentChange(val) {
        let that = this;
        that.page.pageNum = val;
        that.postTransferData();
      },
      groupNameInput(event) {
        let that = this;
        console.log("规则组名称", event);
        let value = event;
        if (/^[A-Za-z][A-Za-z\\d_]{0,59}$/i.test(value)) {
          value = value.substr(0, 0)
          that.$message.error("请正确输入");
        }
        that.ruleForm.ruleCode = value
      },
      isCompleted() {
        let that = this
        let isCompleted = true;
        if (that.ruleForm.ruleName === '' || that.ruleForm.ruleCode === '' || that.ruleForm.ruleType === '' || that
          .ruleForm.ruleGrade === '') {
          isCompleted = false
          that.$message.error("规则基本信息有未填写完项目");
        }
        return isCompleted;
      },
      submitriskDecisionRuleAdd() {
        return this.ruleForm;
      },
    }
  }
</script>

<style lang="css" scoped>
  .menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

  .menu-form--title {
    width: 100%;
    height: 40px;
    padding-left: 10px;
    position: relative;
    line-height: 40px;
  }

  .menu-footer {
    margin-top: 20px;
    text-align: center;
  }

  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
  }

  .divTitle {
    width: 100%;
    text-align: left;
  }

  .required {
    color: red;
  }

  .tableDiv {
    width: 100%;
  }

  .input_el {
    width: 100%;
  }

  .input_el_80 {
    width: 80%;
  }

  .scene-footer {
    margin-top: 10px;
  }

  .transfer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>
