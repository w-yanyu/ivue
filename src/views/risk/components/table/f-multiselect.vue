<template>
  <Poptip placement="bottom" style="padding-left: 5px;">
    <Icon type="funnel" size="16" style="cursor: pointer;" color="#2d8cf0"></Icon>
    <div slot="content">
    </div>
  </Poptip>  
</template>

<script type="text/javascript">
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },

  }
</script>

<style type="text/css">
  
</style>