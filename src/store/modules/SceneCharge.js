import Vue from 'pte-ui/main' // vue插件
import SceneCharge from '@/views/modules/SceneCharge.vue';

export default function sceneBox(trans_data) {
    const MessageBoxInstance = Vue.extend(SceneCharge);
    let currentMsg;

    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);

    currentMsg.openMask(trans_data.request, trans_data.response);
}