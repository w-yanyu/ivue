<template>
  <div class="manual-form">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="五级分类调整类型:" prop="fltype">
            <el-select v-model="ruleForm.fltype">
              <el-option
                v-for="item in fltypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="人工五级分类:" prop="rgzxgradcd">
            <el-select v-model="ruleForm.rgzxgradcd">
              <el-option
                v-for="item in rgzxgradcdList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="调整原因:" prop="resion">
            <el-input type="textarea" v-model="ruleForm.resion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$i18ns('备注:')" prop="memo">
            <el-input type="textarea" v-model="ruleForm.memo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="manual-footer">
        <el-col :span="24"> 
          <el-button type="primary" size="small" @click="submit">提交</el-button>
          <el-button size="small" @click="cancel">{{$i18ns('取消')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ManualSubmit",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        fltype: "", // 五级分类调整类型
        rgzxgradcd: "", // 人工五级分类
        resion: "", // 调整原因
        memo: "", // 备注
        lncfno: [], // 借据号
      },
      fltypeList: [
        {
          label: "不影响征信",
          value: "BX"
        },
        {
          label: "影响征信",
          value: "YX"
        }
      ],
      rgzxgradcdList: [
        {
          label: "正常",
          value: "PF"
        },
        {
          label: "关注",
          value: "SM"
        },
        {
          label: "次级",
          value: "SS"
        },
        {
          label: "可疑",
          value: "LO"
        },
        {
          label: "损失",
          value: "TL"
        }
      ],
      rules: {
        fltype: [
          {
            required: true,
            message: "请选择五级分类调整类型"
          }
        ],
        rgzxgradcd: [
          {
            required: true,
            message: "请选择人工五级分类"
          }
        ]
      }
    }
  },
  created() {
    if( !this.cParentParams.selectedData){
      this.notSelectedData()
    }else {
      this.cParentParams.selectedData.forEach(item => {
      this.ruleForm.lncfno.push(item.lncfno);
    });
    }
  },
  methods: {
    /**
      * 不传入借据号则提示未选择
      */
    notSelectedData() {
      this.$message({
        type: "warning",
        message: "借据未选择",
      })
      this.$dialog.close()
    },
    /**
     * 表单提交
     */
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "PLMSKGTS0001",
            fltype: this.ruleForm.fltype,
            rgzxgradcd: this.ruleForm.rgzxgradcd,
            resion: this.ruleForm.resion,
            memo: this.ruleForm.memo,
            lncfno: this.ruleForm.lncfno,
            applid: this.cParentParams.applid,
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$dataBus.doCallBack(this, res);
              this.$dialog.close()
              this.$message({
                type: "success",
                message: "操作成功"
              })
            }
          }).catch(err => {
            console.error(err);
          });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
    /**
     * 关闭弹窗
     */
    cancel() {
      this.$dialog.close()
    }
  }
}
</script>
<style lang="less" scoped>
.manual-footer {
  text-align: center;
}
</style>
