<template>
  <div style="width:20%">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-top: 20px;">
    </el-input>

    <el-tree class="filter-tree" lazy :load="loadNode" node-key="id" :props="defaultProps" default-expand-all:false 
     @node-contextmenu="youjian"
      :filter-node-method="filterNode" ref="tree">

      <span class="custom-tree-node" @click.right="rightData = data" v-contextmenu:contextmenu
        slot-scope="{ node, data }">

        <span style="font-size: 15px;">{{ node.label }}</span>
        <div   class="contextmenu-option">
          <v-contextmenu :class="qwe?'':'opcity'" ref="contextmenu" :theme="theme">
            <v-contextmenu-item @click="qqq">新增</v-contextmenu-item>
            <v-contextmenu-item>{{$i18ns('删除')}}</v-contextmenu-item>
          </v-contextmenu>
        </div>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  data() {
    return {

      nodeCd: '',
      qwe:false,//控制右键菜单是否出现
      filterText: '',
      defaultProps: { //这些是跟后台商量好的  lable是名字 
      children: 'children',
        label: 'title',
        isLeaf: "isLeaf",
      }
    };
  },
  created() {

  },
  monted() {

  },
  methods: {
  
    qqq(){  //控制右键新增的出现 其实是通过透明度样式来控制的 但其实新增还是可以被用户点到（新增在鼠标右键处 右下角一点点） 所以
            //此处给新增按钮设置一个判断 如果新增不该显示的话 即使你不小心点到了屏幕中隐身的他所在位置 ，也不会触发任何事件   
      if(!this.qwe )
          return
      console.log('ssss')
    },

    youjian(q ,w ,e ,r){
        let nodeArry = ['BASE' ,'CSG001','CSG005' ,'CSG006' ,'CSG002','CSG003','CSG004','ctxd' ,'hlwxd','lxyk' ,'lxyk_01' ,'test_99'  ] //只有这些右键出新增
        this.qwe = nodeArry.includes(w.node_cd)  //判断当前右键点击的节点的node cd 是否该出现新增
    },

    filterNode(value, data,node, ) {
      this.loadNode(node, )
      console.log('kanaknakanakn',node.data.title,)
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },

    loadNode(node, resolve) {
      //如果展开第一级节点，给他一个死数据
      if (node.level == 0) {//level不用配置 自带的  表明当前节点层级
        return resolve([{ title: '对私额度体系' }])// resolve 可以生成一个子节点（这里的是初始节点） 然后带值进去。这里把title写死 那么初始节点就永远是对私额度
      }
      //如果展开其他级节点，动态从后台加载下一级节点列表
      if (node.level >= 1) {
        this.loadchildnode(node, resolve);
        this.rightMenuShow = false
      }
    },

    //加载节点的子节点的方法
    async loadchildnode(node, resolve) {

      if (node.data.title == '对私额度体系') {    //如果你点的是初始节点 给后台传% 这个参数 这个是固定的
        console.log("超过二级的", node.data);

        let init_url = "/SUMP/icmcall/icmRPCCall";
        let init_req = {
          servicecode: "uccp4006",
          node_cd: "%",
          cust_type: "10",
        };
        const res = await this.$http.invokeAPI(init_url, "post", init_req);

        this.nodeCd =  node.data.node_cd
        console.log("超过二级的", res, node);
        return resolve(res.data);   //将后台给的参数用resolve生成子节点  
      }

      else {     //如果点的不是初始节点 那么 根据节点的node-cd 去判断他是否有子节点  有就生成 没有就点完没反应


        let init_url = "/SUMP/icmcall/icmRPCCall";
        let init_req = {
          servicecode: "uccp4006",
          node_cd: node.data.node_cd,
          cust_type: "10",
        };
        const res = await this.$http.invokeAPI(init_url, "post", init_req);

        this.nodeCd =  node.data.node_cd
        console.log("超过san级的", res, node, node.data.node_cd);
        return resolve(res.data);


      }


    },
  },



}

  ;

</script>

<style>
.folder-box {
  height: 100%;
}


.option-card-button {
  width: 100%;
  margin-left: 0;
  font-size: 10px;
  border-radius: 5;
  color: #003686,
}
.opcity{
  opacity: 0 !important;
}
</style>