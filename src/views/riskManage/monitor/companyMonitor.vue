<template>
<iframe id="show-iframe"  scrolling="auto"  v-bind:src="framesrc">
</iframe>
</template>
<script>
export default {
  data() {
    return{
    iframeState:true,
    token: ' ',
    framesrc: ' '
    }
  },
mounted(){
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
  },
  methods: {

  },
  created() {
 let init_req = {

    };
  this.$http.invokeAPI("/SUMP/rest/qxb/fetchtoken", "get",init_req).then((response) => {

     if (response.code == "200") {
      this.token=response.token;
      console.log(this.token);
      this.framesrc="https://b-plugin.qixin.com/third-login?tenant=sunlinexx&token="+this.token+"&returnUrl=/monitor/enterprise-monitor";
      console.log(this.framesrc);
     }
    });
   }
};
</script>
<style scoped>

</style>
