<template>
  <div class="page_content">
    <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">

      <el-tab-pane label="基本信息" name="basicInformation" lazy>
        <basicInformation ref="basicInformation" pageType='basicInformation' class='components'></basicInformation>
      </el-tab-pane>

      <el-tab-pane label="经营风险" name="businessRisks" lazy>
        <businessRisks ref="businessRisks" pageType='businessRisks'class='components'></businessRisks>
      </el-tab-pane>

      <el-tab-pane label="司法风险" name="legalRisk" lazy>
        <legalRisk ref="legalRisk" pageType="legalRisk" class='components'></legalRisk>
      </el-tab-pane>

      <el-tab-pane label="知识产权" name="intellectualProperty" lazy>
        <intellectualProperty ref="intellectualProperty" pageType="intellectualProperty" class='components'></intellectualProperty>
      </el-tab-pane>

      <el-tab-pane label="经营信息" name="businessInformation" lazy>
        <businessInformation ref="businessInformation" pageType="businessInformation" class='components'></businessInformation>
      </el-tab-pane>

      <el-tab-pane label="新闻舆情" name="newsOpinion" lazy>
        <newsOpinion ref="newsOpinion" pageType="newsOpinion" class='components'></newsOpinion>
      </el-tab-pane>

      <el-tab-pane label="上市信息" name="litigationRelationInquiry" lazy>
        <litigationRelationInquiry ref="litigationRelationInquiry" pageType="litigationRelationInquiry" class='components'>
        </litigationRelationInquiry>
      </el-tab-pane>

      <el-tab-pane label="新三板信息" name="newThirdBoard" lazy>
        <newThirdBoard ref="newThirdBoard" pageType="newThirdBoard" class='components'></newThirdBoard>
      </el-tab-pane>

      <el-tab-pane label="项目信息" name="projectInformation" lazy>
        <projectInformation ref="projectInformation" pageType='projectInformation' class='components'></projectInformation>
      </el-tab-pane>




    </el-tabs>
  </div>
</template>
<script>
  //财务报表选项卡
  import MyMessage from 'pte-ui/utils/MyMessage'

  import basicInformation from './webItem.vue'
  import businessRisks from './webItem.vue'
  import intellectualProperty from './webItem.vue'
  import legalRisk from './webItem.vue'
  import listedInformation from './webItem.vue'
  import businessInformation from './webItem.vue'
  import newsOpinion from './webItem.vue'
  import newThirdBoard from './webItem.vue'
  import projectInformation from './webItem.vue'
  import litigationRelationInquiry from './webItem.vue'



  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    components: {
      basicInformation,
      businessRisks,
      intellectualProperty,
      legalRisk,
      listedInformation,
      businessInformation,
      newsOpinion,
      newThirdBoard,
      projectInformation,
      litigationRelationInquiry
    },
    data() {
      return {
        activeName: 'basicInformation',
        params: '',
      }
    },
    mounted() {

    },
    methods: {
      //初始化第一个页面的数据
      initData() {
        let that = this;
      },


      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // handleClick(tab, event) {
      //   let that = this;
      //   switch (tab.name) {
      //     case 'basicInformation':
      //       that.$nextTick(() => {
      //         that.$refs.basicInformation.setType('basicInformation');
      //       })
      //       break;
      //     case 'businessRisks':
      //       that.$nextTick(() => {
      //         that.$refs.businessRisks.setType('businessRisks');
      //       })
      //       break;
      //     case 'legalRisk':
      //       that.$nextTick(() => {
      //         that.$refs.legalRisk.setType('legalRisk');
      //       })
      //       break;
      //     case 'intellectualProperty':
      //       that.$nextTick(() => {
      //         that.$refs.intellectualProperty.setType('intellectualProperty');
      //       })
      //       break;
      //     case 'businessInformation':
      //       that.$nextTick(() => {
      //         that.$refs.businessInformation.setType('businessInformation');
      //       })
      //       break;
      //     case 'litigationRelationInquiry':
      //       that.$nextTick(() => {
      //         that.$refs.litigationRelationInquiry.setType('litigationRelationInquiry');
      //       })
      //       break;
      //     case 'newsOpinion':
      //       that.$nextTick(() => {
      //         that.$refs.newsOpinion.setType('newsOpinion');
      //       })
      //       break;
      //     case 'newThirdBoard':
      //       that.$nextTick(() => {
      //         that.$refs.newThirdBoard.setType('newThirdBoard');
      //       })
      //       break;
      //     case 'projectInformation':
      //       that.$refs.projectInformation.setType('projectInformation');
      //       that.$nextTick(() => {
      //         console.log("projectInformation", projectInformation);
      //         that.$refs.projectInformation.setType('projectInformation');
      //       })
      //       break;

      //   }
      // }

    }
  }
</script>
<style lang="css" scoped>
  .page_content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
  }

  .tabs_table {
    width: 99%;
    height: 100%;
  }

  .el-tab-pane {
    height: 100%;
  }

    div>>>.el-tabs__content {
    height: 100%;
  }
  .components{
    width: 100%;
    height: 100%;
  }
  
</style>
