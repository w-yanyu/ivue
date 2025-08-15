<template>
  <el-form :model="formData" :rules="rules" ref="formData" label-width="240px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">

          <el-form-item label="押品对应序号" prop="colt_rela_id" class="upload-item" >
            <el-input v-model="formData.colt_rela_id" :disabled="true"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="担保方式" prop="guar_type" class="upload-item">
          <el-select v-model="formData.guar_type"  @change="getColtType" placeholder="" :disabled="true" >
            <el-option
              v-for="(item, i) in secTypeList"
              :key="i"
              :label="item.dictName"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资产类型" prop="colt_type" class="upload-item">
          <el-select v-model="formData.colt_type"  @change="getColtProd" placeholder="" >
            <el-option
              v-for="(item, i) in coltTypeList"
              :key="i"
              :label="item.colt_name"
              :value="item.colt_type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="抵质押品产品编号" prop="colt_prod_cd" class="upload-item">
          <el-select v-model="formData.colt_prod_cd"  @change="getOtherColtType" placeholder="" >
            <el-option
              v-for="(item, i) in coltProdList"
              :key="i"
              :label="item.colt_prod_name"
              :value="item.colt_prod_cd"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="押品系统大类" prop="other_colt_type" class="upload-item" >
          <el-select v-model="formData.other_colt_type" placeholder="" >
            <el-option
              v-for="(item, i) in otherColtTypeList"
              :key="i"
              :label="item.colt_catg_desc"
              :value="item.colt_catg"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="押品系统小类" prop="other_colt_prod_cd" class="upload-item">
          <el-input v-model="formData.other_colt_prod_cd" ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm">{{$i18ns('保存')}}</el-button>
      <el-button type="primary" size="small" @click="closeForm" >{{$i18ns('取消')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CollateralEntry2",
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
      formData: {
        guar_type: '', //担保方式
        colt_type: '', //产品类型
        colt_prod_cd: '', //产品编号
        other_colt_type:'',
        other_colt_prod_cd:''

      },
      rules: {
        guar_type: [
          {required: true, message: '请选择担保方式'}
        ],
        colt_type: [
          {required: true, message: '请选择资产类型'}
        ],
        colt_prod_cd: [
          {required: true, message: '请选择抵质押品产品编号'}
        ],
        other_colt_type: [
          {required: true, message: '请选择押品系统大类'}
        ],
        other_colt_prod_cd:[
          {required: true, message: '请输入押品系统小类'}
        ]
      },
      secTypeList: [], // 担保方式
      coltTypeList: [], // 抵质押品类型
      coltProdList: [], // 抵质押品产品
      otherColtTypeList:[]
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("MS_E_GUAR_TYPE", "secTypeList"); // 初始化额度产品状态数据字典

  },
  created() {

    this.formData.colt_rela_id = this.cParentParams.colt_rela_id
    this.formData.guar_type = this.cParentParams.guar_type
    this.getColtType(this.formData.guar_type)
    this.formData.colt_type = this.cParentParams.colt_type
    this.getColtProd(this.formData.colt_type)
    this.formData.colt_prod_cd = this.cParentParams.colt_prod_cd
    this.getOtherColtType(this.formData.colt_prod_cd)
    this.formData.other_colt_type = this.cParentParams.other_colt_type
    this.formData.other_colt_prod_cd = this.cParentParams.other_colt_prod_cd


  },
  methods: {

    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getColtType(val) {
      this.formData.colt_type = '';
      let params = {
        guar_type: val,
        servicecode: "co1012",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.coltTypeList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    closeForm() {
      this.$dialog.close()
    },
    getColtProd(val) {
      this.formData.colt_prod_cd = '';
      this.toRequestUrl = '';
      let obj = this.coltTypeList.find(function(item) {
        return item.colt_type == val;
      }) // 查询相应的对象
      let params = {
        colt_type: val,
        servicecode: "co1013",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.coltProdList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getOtherColtType(val) {
      this.formData.other_colt_type = '';
      let obj = this.coltProdList.find(function(item) {

        return item.colt_prod_cd == val;

      }) // 查询相应的对象

      let params = {
        colt_catg: "",
        servicecode: "co1002",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.otherColtTypeList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    getAssetType(val) {
      let obj = this.coltProdList.find(function(item) {
        return item.colt_prod_cd == val;
      }) // 查询相应的对象
      this.formData.asset_type = obj.asset_type;
    },
    closeForm() {
      this.$dialog.close()
    },

    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {

          let params = {
            "servicecode": "co1003",
            "tran_type":"2",
            "detail": this.formData
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message,
                });
                this.closeForm();
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
.footer-submit {
  text-align: center;
}
</style>
