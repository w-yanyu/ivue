<template>
  <div class="page_content">
    <to-json
      toUrl="/views/us/privateManage/privateManage_info.json"
      :params="this.cParentParams"
      v-if="cust_type === '10'"
    ></to-json>
    <to-json
      toUrl="/views/us/entManager/ent_cust_tree.json"
      :params="this.cParentParams"
      v-if="cust_type == '20'"
    ></to-json>
     <to-json
      toUrl="/views/us/groupManager/group_cust_tree.json"
      :params="this.cParentParams"
      v-if="cust_type == '30'"
    ></to-json>
    <to-json
      toUrl="/views/us/peersManage/peer_cust_tree.json"
      :params="this.cParentParams"
      v-if="cust_type == '40'"
    ></to-json>
  </div>
</template>
<script>
  import MyMessage from 'pte-ui/utils/MyMessage'
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
      return {

        cust_type: "${{params.cust_type}}",
        cust_no: "${{params.cust_no}}"
      }
    },
    created() {
      console.log('+++++++++++++++'+this.cParentParams.grupno);
      this.cust_type = this.cParentParams.cust_type.substring(0,2);
      this.cust_no = this.cParentParams.cust_no;

    },




  }
</script>

