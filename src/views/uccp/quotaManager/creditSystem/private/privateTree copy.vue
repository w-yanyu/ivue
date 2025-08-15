<template>
  <div style="width:20%">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-top: 20px;">
    </el-input>

    <el-tree  class="filter-tree" :data="treeData" node-key="id"
      @node-click="twoSq" @node-contextmenu="floderOption" :props="defaultProps" default-expand-all:false
      :filter-node-method="filterNode" ref="tree">

      <span class="custom-tree-node" slot-scope="{ node, data }">

        <span style="font-size: 15px;">{{ node.label }}</span>
      </span>


    </el-tree>
    <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item @click="handleRightAdd">新增</v-contextmenu-item>
        <v-contextmenu-item @click="handleRightDelete">{{$i18ns('删除')}}</v-contextmenu-item>
      </v-contextmenu>

    <!-- 右键点完出的菜单 -->
    <div :style="{
      'z-index': 9999, position: 'fixed', left: optionCardX + 'px',
      top: optionCardY + 'px', width: '70px', background: 'white',
      'box-shadow': '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)'
    }" v-show="optionCardShow" id="option-button-group">
      <el-button @click="append" class="option-card-button">新增
      </el-button>


    </div>



  </div>
</template>
<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

  },

  data() {
    return {
      optionCardx: '',
      optionCardy: '',
      optionCardShow: false,
      optionData: [],
      node: null,
      tree: null,
      useData: [],
      useData2: [],
      nodeCd: '',

      filterText: '',
      treeData: [{
        id: 10,
        title: '对私额度体系',
        children: [

        ]

      },  //data
      ],//data

      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  created() {
    this.getPieInfo()
  },
  monted() {
  
  },
  methods: {
    //接口拿值
    getPieInfo() {
      let init_url = "/SUMP/icmcall/icmRPCCall";
      let init_req = {
        servicecode: "uccp4006",
        node_cd: "%",
        cust_type: "10"

      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {


        this.useData = response.data;
        // this.nodeCd =   response.data[data.id].node_cd;
        for(let i=0 ; i<response.data.length;i++){
          response.data[i]['children']=[]
          this.treeData[0].children.push(response.data[i])
         
        }
        // this.treeData[0].children = this.useData

        console.log("asdasdasdasdasdasdasdasd", this.treeData, this.nodeCd);


      });


    },



    getPieInfo2(node) {
      let init_url = "/SUMP/icmcall/icmRPCCall";
      let init_req = {
        servicecode: "uccp4006",
        node_cd: node.node_cd,
        cust_type: "10"

      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {


        let useData2 = response.data;
        if (useData2.length > 0 && node.children.length==0) {
          for (let i in useData2) {
            console.log('22222',useData2[i])
            let child = {
              ...useData2[i],
              children: [],
            }
            node.children.push(child)
          }

        }

        console.log("我是第二个接口！！！！！！！！！！", this.treeData, this.nodeCd);


      });


    },

 
 
    twoSq(node) {
      console.log('111111111', node)

      if (node.title == '对私额度体系') {

      } else
      
        this.getPieInfo2(node)

    },






    floderOption(e, data, n, t) {  //右键事件
      if (data.label === '基本授信额度') {
        this.optionCardShow = false
        this.optionCardShow = true  // 展示右键菜单
        this.optionCardX = e.x + 22  // 让右键菜单出现在鼠标右键的位置
        this.optionCardY = e.y - 22
        this.optionData = data
        this.node = n // 将当前节点保存
        this.tree = t

        document.addEventListener('click', this.closeRightMenu)
      }


      console.log('对对对对对对的点点滴滴', data.id)

    },


    closeRightMenu() {
      this.optionCardShow = false
      // 及时关掉鼠标监听事件
      document.removeEventListener('click', this.closeRightMenu)
    },

    OptionCardClose(event) { //点别的地方隐藏菜单
      var currentCli = document.getElementById("option-button-group");
      if (currentCli) {
        if (!currentCli.contains(event.target)) { //点击到了id为option-button-group以外的区域，就隐藏菜单
          this.optionCardShow = false;
        }
      }
    },

  }

};

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
</style>