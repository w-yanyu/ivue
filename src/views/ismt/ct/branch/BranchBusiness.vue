<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formData"
    label-width="240px"
    class="demo-ruleForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="机构编号" prop="target_branch" class="upload-item">
          <div
            class=""
            style="height: 32px;white-space: nowrap;"
          >
           <input
              type="text"
              v-model="formData.target_branch"
              autocomplete="off"
              placeholder=""
              name="target_branch"
              class="el-input__inner lookup-edit el-input"
               disabled
            />
            <button
            type="button"
            class="el-button el-button--primary el-button--mini"
            @click="openDialog"
            style="margin-left: 5px"
          >
            <!----><i class="el-icon-more"></i
            ><!---->
          </button>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="机构名称" prop="target_branch_name" class="upload-item">
            <input
              type="text"
              v-model="formData.target_branch_name"
              autocomplete="off"
              placeholder=""
              name="target_branch_name"
              class="el-input__inner lookup-edit el-input"
               disabled
            />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm"
        >{{$i18ns('确认')}}</el-button
      >
      <el-button type="primary" size="small" @click="closeForm">{{$i18ns('取消')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "BranchBusiness",
  props: {
    size: String, // 控件大小
    config: Object, // 控件的相关配置
    name: String,
    value: [Object, String, Array],
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      机构编号:this.$i18ns("机构编号"),
      机构名称:this.$i18ns("机构名称"),

      formData: {
        target_branch: "", //目标机构编号
        target_branch_name: "", //目标机构名称
      },
      dialogVisible: false,
      rules: {
        target_branch: [{ required: true, message: "请选择机构" }],
      },
    };
  },
  mounted() {
  },
  created() {},
  methods: {
    
    closeForm() {
      this.$dialog.close();
    },
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/ismt/ct/branch/branch-lookup.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: "选择机构",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data = returnData;
      this.formData.target_branch = data["branch_id"];
      this.formData.target_branch_name = data["branch_name"];
      this.$emit("input", this.value);
    },
    submitForm() {
      this.$refs.formData.validate((valid) => {
        
        let params = {
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2190",

        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.noticePtBusi();
            this.noticeUccpBusi();
            this.noticeIcmsBusi();
            this.noticeCrBusi();
            this.noticeUsBusi();
            this.$dataBus.doCallBack(this, {});
            // this.$dialog.close();
          }
        }).catch(err => {
          console.error(err)
        })
      });
    },

    noticePtBusi(){
      let params = {
          record_no: this.cParentParams.record_no,
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2195",
          appId: 'ptOnl',
          module_type: 'pt'

        }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res.code === "200") {
          // this.$dataBus.doCallBack(this, {});
          // this.$dialog.close();
        }
      }).catch(err => {
        console.error(err)
      })

    },

    noticeUccpBusi(){
      let params = {
          record_no: this.cParentParams.record_no,
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2195",
          appId: 'uccpOnl',
          module_type: 'uccp'

        }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res.code === "200") {
          // this.$dataBus.doCallBack(this, {});
          // this.$dialog.close();
        }
      }).catch(err => {
        console.error(err)
      })

    },

    noticeIcmsBusi(){
      let params = {
          record_no: this.cParentParams.record_no,
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2195",
          appId: 'icmsOnl',
          module_type: 'icms'

        }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res.code === "200") {
          // this.$dataBus.doCallBack(this, {});
          // this.$dialog.close();
        }
      }).catch(err => {
        console.error(err)
      })

    },

    noticeCrBusi(){
      let params = {
          record_no: this.cParentParams.record_no,
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2195",
          appId: 'crOnl',
          module_type: 'cr'

        }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res.code === "200") {
          // this.$dataBus.doCallBack(this, {});
          // this.$dialog.close();
        }
      }).catch(err => {
        console.error(err)
      })

    },

    noticeUsBusi(){
      let params = {
          record_no: this.cParentParams.record_no,
          revoke_no: this.cParentParams.revoke_no,
          branch_id:this.cParentParams.branch_id,
          branch_name:this.cParentParams.branch_name,
          target_branch:this.formData.target_branch,
          target_branch_name:this.formData.target_branch_name,
          servicecode: "ct2195",
          appId: 'usOnl',
          module_type: 'us'

        }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res.code === "200") {
          // this.$dataBus.doCallBack(this, {});
          // this.$dialog.close();
        }
      }).catch(err => {
        console.error(err)
      })

    }

  },
};
</script>
<style scoped>
.footer-submit {
  text-align: center;
}
</style>
