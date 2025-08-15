<template>
  <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">
        <el-form-item label="行业分类" prop="gmtype">
          <el-select v-model="formData.gmtype" placeholder="请选择行业分类">
            <el-option v-for="(item, i) in gmtypeList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="企业特性" prop="gmnatu">
          <el-select v-model="formData.gmnatu" placeholder="请选择企业特性">
            <el-option v-for="(item, i) in gmnatuList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="从业人数" prop="employ">
          <el-input v-model="formData.employ" placeholder="从业人数"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="年销售额" prop="sailam">
          <el-input v-model.number="formData.sailam" placeholder="年销售额">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="资产总额" prop="totlam">
          <el-input v-model.number="formData.totlam" placeholder="资产总额">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="企业规模" prop="zypzbh">
          <el-select v-model="formData.zypzbh" disabled placeholder="点击计算按钮计算">
            <el-option v-for="(item, i) in zypzbhList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="footer-submit">
      <el-divider></el-divider>
      <span>注：金融企业填净资产总额，其他行业企业填资产总额</span>
      <el-divider></el-divider>
    </div>
    <div class="footer-submit">
      <el-button size="mini" type="primary" @click="calculate('formData')">计算</el-button>
      <el-button size="mini" type="primary" @click="submitForm('formData')">确认</el-button>
    </div>
  </el-form>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "scaleCalculate",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        formData: {
          gmtype: '',
          gmnatu: '',
          employ: '',
          sailam: '',
          totlam: '',
          zypzbh: '',
          name: '',
        },
        rules: {
          type: [{
            required: true,
            message: '该项为必填项'
          }],
          peculiarity: [{
            required: true,
            message: '该项为必填项'
          }],
          number: [{
            required: true,
            message: '该项为必填项'
          }],
          sale: [{
            required: true,
            message: '该项为必填项'
          }],
          totalAssets: [{
            required: true,
            message: '该项为必填项'
          }]
        },
        gmtypeList: [], // 行业分类
        gmnatuList: [], // 企业特性
        zypzbhList: [], // 企业规模
      };
    },
    mounted() {
      //初始化数据字典
      this.getDictList("E_CORPSIZEINDNEW", "gmtypeList"); // 初始化额度产品状态数据字典
      this.getDictList("E_CORPCHAR", "gmnatuList"); // 初始化是否数据字典
      this.getDictList("E_CORPSIZENEW", "zypzbhList"); // 初始化释放额度数据字典
    },
    created() {
      this.getFormData(); // 初始化申请人影像信息
    },
    methods: {
      getFormData() {
        let params = {
          cust_no: this.cParentParams.cust_no,
          servicecode: "IUMSCUTS0033",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.formData = res.data;
              //初始化时先清空规模
              this.formData.zypzbh = '';
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
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
      calculate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.count();
          } else {
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.formData.zypzbh == '') {
              this.$message({
                type: 'warn',
                message: '请先计算后再确认！'
              });
              return false;
            }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                let params = {
                  cust_no: this.cParentParams.cust_no,
                  gmtype: this.formData.gmtype,
                  gmnatu: this.formData.gmnatu,
                  employ: this.formData.employ,
                  sailam: this.formData.sailam,
                  totlam: this.formData.totlam,
                  zypzbh: this.formData.zypzbh,
                  servicecode: "IUMSCUTS4008",
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                  .then(res => {
                    if (res && res.code === "200") {
                      this.$dataBus.doCallBack(this, this.formData)
                    } else {
                      this.$message({
                        type: 'error',
                        message: res.message
                      })
                    }
                  })
                  .catch(err => {
                    console.error(err);
                    this.$message({
                      type: 'error',
                      message: '保存失败！'
                    })
                  });
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
        });
      },
      count() {
        let gmtype = this.formData.gmtype; //划分行业
        let employ = this.formData.employ; //从业人数
        let sailam = this.formData.sailam; //年销售额
        let totlam = this.formData.totlam; //资产总额
        let result;
        if (gmtype == '2') { //===========工业
          if (employ * 1 < 1000 || sailam * 1 < 40000) {
            if (employ * 1 >= 300 && sailam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 20 && sailam * 1 >= 300) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '3') { //===========建筑业
          if (sailam * 1 < 80000 || totlam * 1 < 80000) {
            if (sailam * 1 >= 6000 && totlam * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (sailam * 1 >= 300 && totlam * 1 >= 300) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '5') { //===========零售业
          if (employ * 1 < 300 || sailam * 1 < 20000) {
            if (employ * 1 >= 50 && sailam * 1 >= 500) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '4') { //===========批发业
          if (employ * 1 < 200 || sailam * 1 < 40000) {
            if (employ * 1 >= 20 && sailam * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 5 && sailam * 1 >= 1000) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '6') { //===========交通运输业
          if (employ * 1 < 1000 || sailam * 1 < 30000) {
            if (employ * 1 >= 300 && sailam * 1 >= 3000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 20 && sailam * 1 >= 200) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '8') { //===========邮政业
          if (employ * 1 < 1000 || sailam * 1 < 30000) {
            if (employ * 1 >= 300 && sailam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 20 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '9') { //===========住宿业
          if (employ * 1 < 300 || sailam * 1 < 10000) {
            if (employ * 1 >= 100 && sailam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '10') { //===========餐饮业
          if (employ * 1 < 300 || sailam * 1 < 10000) {
            if (employ * 1 >= 100 && sailam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '1') { //===========农林牧渔企业
          if (sailam * 1 < 20000) {
            if (sailam * 1 >= 500) {
              result = "3";
              //"中型企业";
            } else if (sailam * 1 >= 50) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '7') { //===========仓储企业
          if (employ * 1 < 200 || sailam * 1 < 30000) {
            if (employ * 1 >= 100 && sailam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 20 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '13') { //===========房地产企业
          if (sailam * 1 < 200000 || totlam * 1 < 10000) {
            if (sailam * 1 >= 1000 && totlam * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (sailam * 1 >= 100 && totlam * 1 >= 2000) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '11') { //===========信息传输企业
          if (employ * 1 < 2000 || sailam * 1 < 100000) {
            if (employ * 1 >= 100 && sailam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && sailam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '12') { //=========== 计算机服务及软件
          if (employ * 1 < 300 || sailam * 1 < 10000) {
            if (employ * 1 >= 100 && sailam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && sailam * 1 >= 50) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '16') { //===========其他企业
          if (employ * 1 < 300) {
            if (employ * 1 >= 100) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '14') { //===============物业管理(新标准)
          if (employ * 1 < 1000 || sailam * 1 < 5000) {
            if (employ * 1 >= 300 && sailam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 100 && sailam * 1 >= 500) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        } else if (gmtype == '15') { //===============租赁和商务服务业(新标准)
          if (employ * 1 < 300 || totlam * 1 < 120000) {
            if (employ * 1 >= 100 && totlam * 1 >= 8000) {
              result = "3";
              //"中型企业";
            } else if (employ * 1 >= 10 && totlam * 1 >= 100) {
              result = "4";
              //"小型企业";
            } else {
              result = "5";
              //"微型企业";
            }
          } else {
            result = "2";
            //"大型企业";
          }
        }
        const index = this.zypzbhList.findIndex(item => item.dictId === result);
        //获取下拉框label返回给lookup
        this.formData.name = this.zypzbhList[index].dictName;
        this.formData.zypzbh = result;
      }
    }
  }
</script>
<style scoped>
  .footer-submit {
    text-align: center;
  }
</style>
