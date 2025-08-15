<template>
  <el-collapse v-model="activeNames" class="data-check--collapse">
    <el-collapse-item name="1">
      <template slot="title">
        <span>
          <em></em>学籍信息查询
        </span>
      </template>
      <el-form label-width="160px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="学籍是否存在">
              <el-select v-model="educationInfo.cmpCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span>
          <em></em>学历信息查询
        </span>
      </template>
        <el-form label-width="160px" class="custom-common--form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历是否一致">
                <el-select v-model="educationInfo.schoolCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="层次是否一致">
                <el-select v-model="educationInfo.educationLevelCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="院校名称是否一致">
                <el-select v-model="educationInfo.nameOfSchoolCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕业年份是否一致">
                <el-select v-model="educationInfo.graduationYearCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学习形式是否一致">
                <el-select v-model="educationInfo.learningFormCheck" :disabled="true">
                  <el-option
                    v-for="(item, i) in flagList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="毕结业结论">
                <el-input v-model="educationInfo.studyResult" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际学历">
                <el-input v-model="educationInfo.educationDegree" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "EducationDetail",
  props: {
    applyId: String, // 进件编号
    applyNo: String, // 业务订单号
  },
  data() {
    return {
      activeNames: ["1", "2"],
      educationInfo: {
        cmpCheck: "",
        schoolCheck: "",
        educationLevelCheck: "",
        nameOfSchoolCheck: "",
        graduationYearCheck: "",
        learningFormCheck: "",
        studyResult: "",
        educationDegree: "",
      },
      flagList: [],
    }
  },
  created() {
    this.getEduData(); // 初始化学历学籍信息
    this.getDictList("E_YES", "flagList"); // 初始化是否数据字典
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
     * 获取认领信息
     */
    getEduData() {
      let params = {
        servicecode: "xlxjQuery",
        applid: this.applyId,
        applyNo: this.applyNo,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.educationInfo.cmpCheck = res.data.education.cmpCheck ? res.data.education.cmpCheck : "N";
            this.educationInfo.schoolCheck = res.data.school.schoolCheck ? res.data.school.schoolCheck : "N";
            this.educationInfo.educationLevelCheck = res.data.school.educationLevelCheck ? res.data.school.educationLevelCheck : "N";
            this.educationInfo.nameOfSchoolCheck = res.data.school.nameOfSchoolCheck ? res.data.school.nameOfSchoolCheck : "N";
            this.educationInfo.graduationYearCheck = res.data.school.graduationYearCheck ? res.data.school.graduationYearCheck : "N";
            this.educationInfo.learningFormCheck = res.data.school.learningFormCheck ? res.data.school.learningFormCheck : "N";
            this.educationInfo.studyResult = res.data.school.studyResult;
            this.educationInfo.educationDegree = res.data.school.educationDegree;
            
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