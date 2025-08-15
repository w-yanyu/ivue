// /src/components/MessageBox/index.js

/**
*授权检查弹出框
*/
import Vue from 'pte-ui/main' // vue插件
import buildmsgbox from 'views/modules/BuildTodo.vue';
export default function BuildBox(trans_data) {
    const MessageBoxInstance = Vue.extend(buildmsgbox);
    let currentMsg;

    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);


    currentMsg.openMask(trans_data.request, trans_data.response);
}



