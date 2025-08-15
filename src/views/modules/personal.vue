<template>
    <div id="check">
		<br />
		<div>wahaha</div>
		<br/>
        <div>{{$i18ns("permission.auth_reason_type")}}</div>
        <br/>
        <div @click="openMask">点击这里</div>
		
        <br/>

        <div @click="openBox">点击box</div>
  </div>
</template>
<script>

import Vue from 'pte-ui/main' // vue插件
import Permis from 'views/modules/Permis.vue'
export default {   
  
    data(){
        return {
            sendVal: false
        }    
    },    
    methods: {
        openMask(index){
            this.sendVal = true;
        },
        openBox(index){
            const MessageBoxInstance = Vue.extend(Permis);
            // 实例化vue实例
            let currentMsg = new MessageBoxInstance();
            let msgBoxEl = currentMsg.$mount().$el;
            document.body.appendChild(msgBoxEl);

            let req = {}
            let rsp = {}
            req.url = ""
            req.method = "post"
            req.data = {}
            rsp.auth_reason = []

            currentMsg.openMask(req, rsp);
        }   
    }
}

</script>