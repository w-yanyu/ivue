<template>
  <div id="page_content">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="custom-common--form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="编码" prop="id" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.id" type="text" placeholder="请输入编码" clearable
              :disabled="disabled">
            </el-input>
          </el-form-item>

          <el-form-item label="英文名称" prop="en_name" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.en_name" type="text" placeholder="请输入英文名称" clearable
              :disabled="disabled">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="中文名称" prop="zh_name" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.zh_name" type="text" placeholder="请输入中文名称" clearable
              :disabled="disabled">
            </el-input>
          </el-form-item>

          <el-form-item label="类型" prop="type" label-width="100px">
            <el-select v-model="ruleForm.type" placeholder="请选择类型" @change="changeTypeValue" clearable
              :disabled="disabled">
              <el-option v-for="item in typeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="作用域" prop="action_scope" label-width="100px">
            <el-select v-model="ruleForm.action_scope" placeholder="请选作用域" @change="changeActionScopeValue" clearable
              :disabled="disabled">
              <el-option v-for="item in actionScopeOptions" :key="item.dictId" :label="item.dictName"
                :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="状态" prop="status" label-width="100px">
            <el-select v-model="ruleForm.status" placeholder="请选作用域" @change="changeStatusValue" clearable
              :disabled="disabled">
              <el-option v-for="item in statusOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="函数体" prop="function_body" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.function_body" type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class='addTbale'>
          <div>
            <el-button type="primary" size="small" @click="addTable">添加行</el-button>
            <el-button type="danger" size="small" @click="delTable">删除行</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class='table_show'>
          <el-table :data="tableData" border :row-key="id">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="序号">
            </el-table-column>

            <el-table-column prop=" select_type" label="类型">
              <template slot-scope="scope">
                <el-select v-model="scope.row.select_type" placeholder="请选择类型"
                  @change="changeSelectTypeValue(scope.row)" clearable :disabled="disabled">
                  <el-option v-for="item in select_typeOptions" :key="item.dictId" :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column prop="name" label="名字" align='center'>
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.name" placeholder="请输入名字" clearable :disabled="disabled">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <div class="tip-left">
        <el-button type="info" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </span>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        ruleForm: {
          id: '',
          en_name: '',
          zh_name: '',
          type: '',
          action_scope: '',
          status: '',
          function_body: '',

        },
        rules: {
          id: [{
            required: true,
            message: "请填写id",
            trigger: "blur",
          }, ],
          en_name: [{
            required: true,
            message: "请选择担保类型",
            trigger: "blur",
          }, ],
          zh_name: [{
            required: true,
            message: "请输入保证金金额",
            trigger: 'blur',
          }],
          type: [{
              required: true,
              message: "请输入本次使用金额",
              trigger: 'blur',
            }

          ],
          action_scope: [{
            required: true,
            message: '请输入签订日期',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请输入起始日期',
            trigger: 'blur'
          }],
          function_body: [{
            required: true,
            message: '请输入结束日期',
            trigger: 'blur'
          }],
        },
        typeOptions: [],
        actionScopeOptions: [],
        statusOptions: [],
        tableData: [{
          id: '1',
          select_type: '',
          name: ''
        }],


      };
    },
    mounted() {},
    beforeDestroy() {

    },
    methods: {
      addTable() {},
      delTable() {},
      cancel() {},
      confirm() {},


    }
  };
</script>


<style lang="css" scoped>
  .page_content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .addTbale {
    margin-bottom: 10px;
  }

  .table_show {
    width: 100%;
    min-height: 50px;
  }

  .dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    padding-bottom: 20px;
    margin-top: 20px;
  }
</style>
