<template>
  <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="行业分类" prop="industry_classify">
          <el-select v-model="formData.industry_classify" >
            <el-option v-for="(item, i) in gmtypeList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="企业特性" prop="ent_nature">
          <el-select v-model="formData.ent_nature">
            <el-option v-for="(item, i) in gmnatuList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="从业人数" prop="employees_count">
          <el-input v-model="formData.employees_count" placeholder="从业人数"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="年销售额" prop="totlam">
          <el-input v-model.number="formData.totlam" placeholder="年销售额">
            <template slot="append">{{$i18ns('万元')}}</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="资产总额" prop="property_amt">
          <el-input v-model.number="formData.property_amt" placeholder="资产总额">
            <template slot="append">{{$i18ns('万元')}}</template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item :label="企业规模" prop="corp_size">
          <el-select v-model="formData.corp_size">
            <el-option v-for="(item, i) in zypzbhList" :key="i" :label="item.dictName" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="footer-submit">
      <el-divider></el-divider>
      <span>{{$i18ns('注：金融企业填净资产总额，其他行业企业填资产总额')}}</span>
      <el-divider></el-divider>
    </div>
    <div class="footer-submit">
      <el-button size="mini" type="primary" @click="calculate('formData')">{{$i18ns('计算')}}</el-button>
      <el-button size="mini" type="primary" @click="submitForm('formData')">{{$i18ns('确认')}}</el-button>
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
        行业分类:this.$i18ns("行业分类"),
        企业特性:this.$i18ns("企业特性"),
        从业人数:this.$i18ns("从业人数"),
        年销售额:this.$i18ns("年销售额"),
        资产总额:this.$i18ns("资产总额"),
        企业规模:this.$i18ns("企业规模"),



        formData: {
          industry_classify: '',
          ent_nature: '',
          employees_count: '',
          totlam: '',
          property_amt: '',
          corp_size: '',
          name: '',
        },
        rules: {
          
        },
        gmtypeList: [], // 行业分类
        gmnatuList: [], // 企业特性
        zypzbhList: [], // 企业规模
      };
    },
    mounted() {
     
    },
    created() {
      this.getFormData(); // 初始化申请人影像信息
       //初始化数据字典
      this.getDictList("US_E_INDUSTRY_TYPE", "gmtypeList"); // 初始化额度产品状态数据字典
      this.getDictList("US_E_ENT_NATURE", "gmnatuList"); // 初始化是否数据字典
      this.getDictList("US_E_CORP_SIZE", "zypzbhList"); // 初始化释放额度数据字典
    },
    methods: {
      getFormData() {
        let params = {
          cust_no: this.cParentParams.cust_no,
          servicecode: "us0391",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.formData = res.data;
              //初始化时先清空规模
              this.formData.corp_size = '';
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
              
              console.log("this.gmtypeList",this.gmtypeList);
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
            if (this.formData.corp_size == '') {
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
                  industry_classify: this.formData.industry_classify,
                  ent_nature: this.formData.ent_nature,
                  employees_count: this.formData.employees_count,
                  totlam: this.formData.totlam,
                  property_amt: this.formData.property_amt,
                  corp_size: this.formData.corp_size,
                  servicecode: "us0390",
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
        let industry_classify = this.formData.industry_classify; //划分行业
        let employees_count = this.formData.employees_count; //从业人数
        let totlam = this.formData.totlam; //年销售额
        let property_amt = this.formData.property_amt; //资产总额
        let result = "5" ;
        console.log("industry_classify",industry_classify)
        if (industry_classify == 'Y'||industry_classify == 'B' ) { //===========工业
          if (employees_count * 1 < 1000 || totlam * 1 < 40000) {
            if (employees_count * 1 >= 300 && totlam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 20 && totlam * 1 >= 300) {
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
        } else if (industry_classify == 'E') { //===========建筑业
          if (totlam * 1 < 80000 || "property_amt" * 1 < 80000) {
            if (totlam * 1 >= 6000 && "property_amt" * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (totlam * 1 >= 300 && "property_amt" * 1 >= 300) {
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
        } else if (industry_classify == 'H') { //===========零售业
          if (employees_count * 1 < 300 || totlam * 1 < 20000) {
            if (employees_count * 1 >= 50 && totlam * 1 >= 500) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'J') { //===========金融业
          if (employees_count * 1 < 300 || totlam * 1 < 20000) {
            if (employees_count * 1 >= 50 && totlam * 1 >= 500) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 100) {
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
        }else if (industry_classify == 'H' || industry_classify == 'C') { //===========批发业
          if (employees_count * 1 < 200 || totlam * 1 < 40000) {
            if (employees_count * 1 >= 20 && totlam * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 5 && totlam * 1 >= 1000) {
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
        } else if (industry_classify == 'F') { //===========交通运输业
          if (employees_count * 1 < 1000 || totlam * 1 < 30000) {
            if (employees_count * 1 >= 300 && totlam * 1 >= 3000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 20 && totlam * 1 >= 200) {
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
        }else if (industry_classify == 'D') { //===========电力、燃气及水的生产和供应业
          if (employees_count * 1 < 1000 || totlam * 1 < 30000) {
            if (employees_count * 1 >= 300 && totlam * 1 >= 3000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 20 && totlam * 1 >= 200) {
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
        }else if (industry_classify == 'F') { //===========邮政业
          if (employees_count * 1 < 1000 || totlam * 1 < 30000) {
            if (employees_count * 1 >= 300 && totlam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 20 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'I') { //===========住宿业
          if (employees_count * 1 < 300 || totlam * 1 < 10000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'I') { //===========餐饮业
          if (employees_count * 1 < 300 || totlam * 1 < 10000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 2000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'A') { //===========农林牧渔企业
          if (totlam * 1 < 20000) {
            if (totlam * 1 >= 500) {
              result = "3";
              //"中型企业";
            } else if (totlam * 1 >= 50) {
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
        } else if (industry_classify == 'F') { //===========仓储企业
          if (employees_count * 1 < 200 || totlam * 1 < 30000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 20 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'K') { //===========房地产企业
          if (totlam * 1 < 200000 || property_amt * 1 < 10000) {
            if (totlam * 1 >= 1000 && property_amt * 1 >= 5000) {
              result = "3";
              //"中型企业";
            } else if (totlam * 1 >= 100 && property_amt * 1 >= 2000) {
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
        } else if (industry_classify == 'G') { //===========信息传输企业
          if (employees_count * 1 < 2000 || totlam * 1 < 100000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 100) {
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
        } else if (industry_classify == 'G') { //=========== 计算机服务及软件
          if (employees_count * 1 < 300 || totlam * 1 < 10000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 50) {
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
        } else if (industry_classify == 'M') { //=========== 科学研究、技术服务业和地质勘察业
          if (employees_count * 1 < 300 || totlam * 1 < 10000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 50) {
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
        }else if (industry_classify == 'N') { //=========== 水利、环境和公共设施管理业
          if (employees_count * 1 < 300 || totlam * 1 < 10000) {
            if (employees_count * 1 >= 100 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && totlam * 1 >= 50) {
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
        }else if (industry_classify == 'O' || industry_classify == 'Z' ) { //===========其他企业
          if (employees_count * 1 < 300) {
            if (employees_count * 1 >= 100) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10) {
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
        } else if (industry_classify == 'W') { //===============物业管理(新标准)
          if (employees_count * 1 < 1000 || totlam * 1 < 5000) {
            if (employees_count * 1 >= 300 && totlam * 1 >= 1000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 100 && totlam * 1 >= 500) {
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
        } else if (industry_classify == 'L') { //===============租赁和商务服务业(新标准)
          if (employees_count * 1 < 300 || property_amt * 1 < 120000) {
            if (employees_count * 1 >= 100 && property_amt * 1 >= 8000) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10 && property_amt * 1 >= 100) {
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
        }else{
           if (employees_count * 1 < 300) {
            if (employees_count * 1 >= 100) {
              result = "3";
              //"中型企业";
            } else if (employees_count * 1 >= 10) {
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

       // console.log("item.dictId === ",result)
        const index = this.zypzbhList.findIndex(item => item.dictId === result);
        console.log("index",index)
      //  console.log("this.zypzbhList",this.zypzbhList)
        //获取下拉框label返回给lookup         
        this.formData.name = this.zypzbhList[index].dictName;
        this.formData.corp_size = result;
      }
    }
  }
</script>
<style scoped>
  .footer-submit {
    text-align: center;
  }
</style>
