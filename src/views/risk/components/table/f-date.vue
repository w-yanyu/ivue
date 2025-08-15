<template>
  <Poptip placement="bottom" style="padding-left: 5px;">
    <Icon type="funnel" size="16" style="cursor: pointer;" color="#2d8cf0"></Icon>
    <div slot="content">
      <DatePicker 
        type="daterange" 
        :options="opt" 
        placeholder="请选择时间范围" 
        split-panels 
        @on-change="changeDateRange">
      </DatePicker>
    </div>
  </Poptip>  
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        opt: {
          shortcuts: [
            {
              text: '近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600*1000*24*7);
                return [start, end];
              }
            },
            {
              text: '近一月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600*1000*24*30);
                return [start, end];
              }
            },
            {
              text: '近一季度',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600*1000*24*90);
                return [start, end];
              }
            }
          ]
        }
      }
    },
    methods: {
      changeDateRange (v) {
        this.$emit('filter-daterange', {
          value:  v
        });
      }
    }
  }
</script>

<style type="text/css">
  
</style>
