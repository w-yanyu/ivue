<template>
   <el-table
      :data="linkman"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="custid"
        label="客户编号"
        width="180"
       align="center"
      >
      </el-table-column>

        <el-table-column
        prop="channal_id"
        label="渠道号"
        width="180"
        align="center">
      </el-table-column>

      <el-table-column
        prop="connam"
        label="联系人姓名"
          width="180"
          align="center"
       >
      </el-table-column>
      <el-table-column
        label="联系人关系"
          width="120"
          align="center">
            <template slot-scope="scope">
                {{linkerTranslate(scope.row.conntp)}}
              </template>
      </el-table-column>

       <el-table-column
        prop="phonum"
        label="电话"
          width="180"
          align="center">
      </el-table-column>

      <el-table-column
        prop="addres"
        label="工作地址"
         align="center">
      </el-table-column>

       <el-table-column
       show-overflow-tooltip
        prop="conndw"
        label="联系单位"
        align="center">
      </el-table-column>
<!--
 <el-table-column
 show-overflow-tooltip
        prop="crtusr"
        label="创建人"
        align="center">
      </el-table-column>

       <el-table-column
       show-overflow-tooltip
        prop="cretdt"
        label="修改时间"
        align="center">
      </el-table-column>

       <el-table-column
       show-overflow-tooltip
        prop="updusr"
        label="最后更新人"
          width="120"
          align="center">
      </el-table-column>

       <el-table-column
       show-overflow-tooltip
        prop="gmt_modified"
        label="最后更新时间"
          width="120"
          align="center">
      </el-table-column>

      <el-table-column
      show-overflow-tooltip
        prop="remark"
        :label="$i18ns('备注')"
           width="120"
        align="center">
      </el-table-column>-->


    </el-table>
</template>
<script>
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化
  export default {
    props: {
        cMeta:Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object   //父页面每块区域业务数据
    },
    data() {
      return {
          cParams: this.cParentParams , //使用父页面参数
          linkman:[],//父类传输过来的联系人数据

      }
    },
    created (){
          this.getDictList("E_LINKREL", "linkerList");
    },

    mounted() {


    },
    methods: {
      /**
     * 转译数据字典方法
     */
        linkerTranslate(val) {

      for (let index = 0; index < this.linkerList.length; index++) {
        const item = this.linkerList[index];
        if (val === item.dictId) return item.dictName;
      }
        },
      /**
     * 获取数据字典列表
     */
    getDictList(dictType, key) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
       this.$http.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {

          this[key] = res.data;

              //需要在轉譯字典回调成功后才渲染数据
                this.linkman=this.cParentScope.parentFormModel.linkman;

        }
      }).catch(err => {
        console.error(err)
      })
    },

    }
  }
</script>
<style lang="css" scoped>


</style>
