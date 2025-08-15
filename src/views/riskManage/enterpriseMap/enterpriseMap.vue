<template>
  <div class="page_content">
    <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">

      <el-tab-pane label="企业链图" name="chainfigure" lazy>
        <chainfigure ref="chainfigure" pageType='chainfigure' class='components'></chainfigure>
      </el-tab-pane>

     <el-tab-pane label="股权穿透" name="equityThrough" lazy>
        <equityThrough ref="equityThrough" pageType='equityThrough'></equityThrough>
      </el-tab-pane>

      <el-tab-pane label="股权结构" name="equityStructure" lazy>
        <equityStructure ref="equityStructure" pageType="equityStructure" class='components'></equityStructure>
      </el-tab-pane>

      <el-tab-pane label="疑似实际控制人" name="actualController" lazy>
        <actualController ref="actualController" pageType="actualController" class='components'></actualController>
      </el-tab-pane>

      <el-tab-pane label="企业受益所有人" name="beneficialOwner" lazy>
        <beneficialOwner ref="beneficialOwner" pageType="beneficialOwner" class='components'></beneficialOwner>
      </el-tab-pane>

      <el-tab-pane label="企业关系图" name="enterpriseDiagram" lazy>
        <enterpriseDiagram ref="enterpriseDiagram" pageType="enterpriseDiagram" class='components'></enterpriseDiagram>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  //财务报表选项卡
  import MyMessage from 'pte-ui/utils/MyMessage'

  import chainfigure from './webItem.vue'
  import equityThrough from './webItem.vue'
  import equityStructure from './webItem.vue'
  import actualController from './webItem.vue'
  import beneficialOwner from './webItem.vue'
  import enterpriseDiagram from './webItem.vue'




  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    components: {
      chainfigure,
      equityThrough,
      equityStructure,
      actualController,
      beneficialOwner,
      enterpriseDiagram,

    },
    data() {
      return {
        activeName: 'chainfigure',
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
