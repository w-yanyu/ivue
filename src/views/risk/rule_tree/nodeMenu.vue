<template>
  <div style="margin: 0">
    <el-button round type="info" size="mini" @click="checkView">查看</el-button>
    <el-button round size="mini" type="primary" @click="addStock(0)" v-if="treeData.nodeType !== 2 ">添加
    </el-button>
    <el-button round type="success" size="mini" @click="addStock(1)">编辑</el-button>
    <el-button round type="danger" size="mini" @click="deleteStock">删除</el-button>
  </div>
</template>

<script>
  export default {
    props: {
      json: {}, // 渲染数据
      isDetail: {
        default: false // 是否是详情
      }
    },

    data() {
      return {
        treeData: {},
      }
    },
    onShow: function() { //option为object类型，会序列化上个页面传递的参数
    },
    onPullDownRefresh() {

    },
    watch: {
      // isDetail: function (val) { // 是否是详情,详情不能添加编辑
      //   this.isDetail = val;
      // },
      // json: {
      //   // 遍历当前的数据
      //   handler: function (Props) {
      //     let extendKey = function (jsonData) {
      //       jsonData.extend =
      //         jsonData.extend === void 0 ? true : !!jsonData.extend;
      //       // if (Array.isArray(jsonData.children) && jsonData.children.length) {
      //       //   jsonData.children.forEach(c => {
      //       //     extendKey(c);
      //       //   });
      //       // }
      //       return jsonData;
      //     };
      //     if (Props) {
      //       this.treeData = extendKey(Props);
      //     }
      //   },
      //   immediate: true,
      //   deep: true
      // }
    },
    computed: {
    },
    methods: {
      //val: 0 新增, 1 编辑
      addStock(val) {
        this.$emit('add', {
          val: val,
          data: this.treeData
        })
      },
      checkView() {
        this.$emit('checkView', this.treeData)
      },
      // 删除股东
      deleteStock() {
        this.$emit('delete', this.treeData)
      }


    },
    onLoad() {

    }

  }
</script>

<style scoped>
  .page {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular, PingFang SC;
    font-style: bold;
  }
</style>
