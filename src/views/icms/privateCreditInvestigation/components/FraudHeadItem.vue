<template>
    <div class="report_header">
        <div class="report_header_center">
            <p>{{leftText}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "FraudHeadItem",
    props: {
       leftFlex: {
           type: Number,
           default: 1
       },
       rightFlex: {
           type: Number,
           default: 1
       },
       leftText: {
           type: String,
           default: ''
       },
       rightText: {
           type: String,
           default: ''
       }
    },
    data() {
        return{
            
        }
    },
    components: {

    },
    created(){
        
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
.report_header {
  box-sizing: border-box;
  height: 36px;
  width: 100%;
  margin: 0px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.report_header_center {
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  box-sizing: border-box;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  p {
    padding-left: 12px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    color: #798DA0;
  }
}
</style>