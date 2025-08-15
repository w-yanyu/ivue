<template>
<div>

  <div class="list-item" v-for="(item, index) in checkList" :key="index">

 
      <div class="item-name">
       <font   ><span @click="changeChildShow">{{item.warn_msg}}</span></font>  
      </div>
 
      <div v-if="item.child_list" class="children-item" >        
        <div v-for="(child, index) in item.child_list" :key="index" v-show="childShow">  
          <div >            
                <span v-html="'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'"></span>
                 <font   > 
                  <span  >{{child.warn_msg}}</span>    
                  </font>                                      
            </div>
  

        </div>
      </div>
    </div>

</div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import qs from 'qs'
import { List } from 'gojs';
export default {
    name: "Parent",
    props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
    data() {
      return {
        checkList: [],
        fontColor: ['#0477ff', '#01b470', '#ff711b', '#ff4848', '#8b48f7'],
        fontBackColor: ['#edf3ff', '#e6fbf3', '#ffece1', '#fff3f3', '#f5efff'],
        childShow:true
        }
   },
       created() {
        this.initCheckList();
    }    ,
  methods: {    
  initCheckList(){
    
      let params = {
         wf_prod_no: this.cParentParams.wf_prod_no,
         bpm_version: this.cParentParams.bpm_version,
         servicecode: this.cParentParams.servicecode,
         appId: this.cParentParams.appId
       };
       MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
         .then((res) => {
           if (res && res.code === "200") {
            this.checkList = res.data;
            console.log(this.checkList);
           }
         })
         .catch((err) => {
           console.error(err);
         });
  },
  changeChildShow(){
    this.childShow=!this.childShow
  }
}
}
 
</script>
<style>
.item-name{
	font-weight:bold
	}
</style>