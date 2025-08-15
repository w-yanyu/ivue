<template>
<div class="verifiy-container clearfix">
<el-collapse v-model="activeNames" class="data-check--collapse">
    <el-collapse-item name="1">
    <div class="verifiy-left">
        <el-form label-width="120px" class="custom-common--form">
          <el-row>
            <el-col>
              <el-form-item label="客户姓名">
                <el-input v-model="educationInfo.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
                <el-form-item label="性别">
                  <el-select v-model="educationInfo.gender" :disabled="true">
                    <el-option
                      v-for="(item, i) in genderList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="民族">
                <el-select v-model="educationInfo.nation" :disabled="true">
                    <el-option
                      v-for="(item, i) in nationList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="出生日期">
                <el-input v-model="educationInfo.birthday" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="地址">
                <el-input v-model="educationInfo.address" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="身份证号">
                <el-input v-model="educationInfo.certNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item label="签发机构">
                <el-input v-model="educationInfo.issuingAgency" :disabled="true"></el-input>
              </el-form-item>
            </el-col><el-col >
              <el-form-item label="有效日期">
                <el-input v-model="educationInfo.cardsday" :disabled="true"></el-input>
              </el-form-item>
            </el-col><el-col >
              <el-form-item label="申请件来源">
                <el-select v-model="educationInfo.applyType" :disabled="true">
                    <el-option
                      v-for="(item, i) in applyTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col><el-col >
              <el-form-item label="手机号码">
                <el-input v-model="educationInfo.phone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        </div>

<div class="verifiy-right">



</div>



    </el-collapse-item>
  </el-collapse>
</el-collapse>

</div>
</template>
<script>
export default {
  name: "CertnoInfo",
  props: {
    applyNo: String,
     applid:String,
  },
  data() {
    return {
       
       activeNames: ["1", "2"],
      educationInfo: {
        name: "",
        gender: "",
        nation: "",
        birthday: "",
        address: "",
        certNo: "",
        issuingAgency: "",
        cardsday: "",
        certNo: "",
        applyType: "",
        phone: "",
        
      },
       genderList: [],
       applyTypeList: [],
       nationList: [],
    }
  },

  created() {
 
       this.getDictList("MS_E_GENDER", "genderList"); // 初始化性别数据字典
       this.getDictList("E_APPLYTP", "applyTypeList");
       this.getDictList("E_NATIONALITY", "nationList");//民族
       this.getEduData();
  },
    
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取身份证信息
     */
    getEduData() {
      let params = {
        servicecode: "certNoInfoQuery",
        applyNo:this.applyNo,
        applid:this.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.educationInfo.name  = res.data.name   ;      
            this.educationInfo.gender = res.data. gender ;      
            this.educationInfo.nation = res.data. nation ;      
            this.educationInfo.birthday  = res.data.birthday ;    
            this.educationInfo.address  = res.data.address ;     
            this.educationInfo.certNo   = res.data.certNo  ;    
            this.educationInfo.issuingAgency= res.data.issuingAgency ; 
            this.educationInfo.cardsday    = res.data.cardsday ;  
            this.educationInfo.applyType  = res.data.applyType  ;  
            this.educationInfo.phone= res.data.phone;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
  }
}
</script>
<style lang="less" scoped>
  
</style>