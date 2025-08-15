<template>
  <table v-if="treeData && treeData.ruleTreeNodeId">
    <tr>
      <td :colspan="treeData.children ? treeData.children.length * 2 : 1"
          :class="{parentLevel: treeData.children, extend: treeData.children && treeData.children.length && treeData.extend}">
        <div :class="{node: true, hasMate: treeData.mate}">
          <div class="person" @click="$emit('click-node', treeData)">
            <el-popover
              v-if="!isDetail"
              placement="bottom-end"
              width="200"
              trigger="hover">
              <div style="margin: 0">
                <el-button round type="info" size="mini" @click="checkView">{{$i18ns('查看')}}</el-button>
                <el-button round size="mini" type="primary" @click="addStock(0)" v-if="treeData.nodeType !== 2 ">添加
                </el-button>
                <el-button round type="success" size="mini" @click="addStock(1)">{{$i18ns('编辑')}}</el-button>
                <el-button round type="danger" size="mini" @click="deleteStock">{{$i18ns('删除')}}</el-button>
              </div>
              <div class="avat"
                   :class="{parent: !treeData.nodeType, action: Number(treeData.nodeType) === 2, root: Number(treeData.nodeType) === 3}"
                   slot="reference">
                <el-row style="color: #000000">
                  <el-col :span="24">规则树根节点:{{ treeData.treeId }}</el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if="treeData.treeCode != null " :span="24"> 规则树代码:{{ treeData.treeCode }}</el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if="treeData.ruleTreeNodeId != null " :span="24"> 节点树编号:{{
                      treeData.ruleTreeNodeId
                    }}
                  </el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if="treeData.nodeIdFrom != null" :span="24">上节点编号:{{ treeData.nodeIdFrom }}</el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if="treeData.nodeType != null " :span="24">
                    节点类型:{{ treeData.nodeType === 1 ? '分支节点' : treeData.nodeType === 2 ? '叶子节点' : '根节点' }}
                  </el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if=" treeData.treeDesc != null " :span="24"> 规则树描述:{{ treeData.treeDesc }}</el-col>
                </el-row>
                <el-row style="color: #000000">
                  <el-col v-if=" treeData.ruleDesc != null " :span="24"> 满足规则:{{ treeData.ruleDesc }}</el-col>
                </el-row>
              </div>
            </el-popover>
          </div>

        </div>
        <div class="extend_handle" v-if="treeData.children && treeData.children.length"
             @click="toggleExtend(treeData)"></div>
      </td>
    </tr>
    <!-- 这是一个递归组件,注意,这里还要调用,需要传递的数据这里也要传递,否则操作时拿不到子级的数据 -->
    <tr v-if="treeData.children && treeData.children.length && treeData.extend">
      <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel">

        <TreeChart
          :json="children"
          :isDetail="isDetail"
          @add="$emit('add', $event)"
          @delete="$emit('delete', $event)"
          @click-node="$emit('click-node', $event)"
          @checkView="$emit('checkView', $event)"
        />
      </td>
    </tr>
  </table>


</template>

<script>


export default {
  name: "TreeChart",
  props: {
    json: {}, // 渲染数据
    isDetail: {
      default: false // 是否是详情
    }
  },

  data() {
    return {
      treeData: {},
    };
  },

  created() {
    // console.log(this.json)
  },

  watch: {
    isDetail: function (val) { // 是否是详情,详情不能添加编辑
      this.isDetail = val;
    },
    json: {
      // 遍历当前的数据
      handler: function (Props) {
        let extendKey = function (jsonData) {
          jsonData.extend =
            jsonData.extend === void 0 ? true : !!jsonData.extend;
          // if (Array.isArray(jsonData.children) && jsonData.children.length) {
          //   jsonData.children.forEach(c => {
          //     extendKey(c);
          //   });
          // }
          return jsonData;
        };
        if (Props) {
          this.treeData = extendKey(Props);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    toggleExtend(treeData) {
      treeData.extend = !treeData.extend;
      this.$forceUpdate();
    },
    //val: 0 新增, 1 编辑
    addStock(val) {
      this.$emit('add', {val: val, data: this.treeData})
    },
    checkView() {
      this.$emit('checkView', this.treeData)
    },
    // 删除股东
    deleteStock() {
      this.$emit('delete', this.treeData)
    }
  }
};
</script>

<style lang="less">
.v-modal {
  z-index: 1000 !important;
}

.el-dialog__wrapper {
  z-index: 2000 !important;
}

table {
  border-collapse: separate !important;
  border-spacing: 0 !important;
}

td {
  position: relative;
  vertical-align: top;
  padding: 0 0 50px 0;
  text-align: center;
}

.parent {
  background: #199ed8 !important;
  font-weight: bold;
}

.extend_handle {
  position: absolute;
  left: 50%;
  bottom: 27px;
  width: 10px;
  height: 10px;
  padding: 10px;
  transform: translate3d(-15px, 0, 0);
  cursor: pointer;
}

//箭头
.extend_handle:before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 2px solid;
  border-color: #101011 #101011 transparent transparent;
  transform: rotateZ(135deg);
  transform-origin: 50% 50% 0;
  transition: transform ease 300ms;
}

.extend_handle:hover:before {
  border-color: #333 #333 transparent transparent;
}

.extend .extend_handle:before {
  transform: rotateZ(-45deg);
}

//箭头下方
.extend::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 15px;
  height: 15px;
  border-left: 2px solid #101011;
  transform: translate3d(-1px, 0, 0)
}

//节点上方
.childLevel::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 100%;
  height: 15px;
  border-left: 2px solid #101011;
  transform: translate3d(-1px, 0, 0)
}

//叶子节点中间
.childLevel::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  border-top: 2px solid #101011;
}

.childLevel:first-child:before, .childLevel:last-child:before {
  display: none;
}

//第一个叶子节点
.childLevel:first-child:after {
  left: 50%;
  height: 15px;
  border: 2px solid;
  border-color: #101011 transparent transparent #101011;
  border-radius: 6px 0 0 0;
  transform: translate3d(1px, 0, 0)
}

//最后一个叶子节点
.childLevel:last-child:after {
  right: 50%;
  height: 15px;
  border: 2px solid;
  border-color: #101011 #101011 transparent transparent;
  border-radius: 0 6px 0 0;
  transform: translate3d(-1px, 0, 0)
}

//叶子节点之后
.childLevel:first-child.childLevel:last-child::after {
  left: auto;
  border-radius: 0;
  border-color: transparent #101011 transparent transparent;
  transform: translate3d(1px, 0, 0)
}

.node {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  text-align: left;
  padding: 0 5px;
}

.node .person {
  padding-top: 15px;
  position: relative;
  display: inline-block;
  z-index: 1000 !important;
  width: 200px;
  overflow: hidden;
}

.node .person .avat {
  padding: 5px;
  padding-top: 10px;
  display: block;
  width: 100%;
  height: 100%;
  margin: auto;
  word-break: break-all;
  background: #04fd96;
  box-sizing: border-box;
  border-radius: 4px;

  .opreate_icon {
    display: none;
  }

  &:hover {
    .opreate_icon {
      display: block;
      position: absolute;
      top: -3px;
      right: -3px;
      padding: 5px;
    }
  }

  &.action {
    background: #ffe500;
  }

  &.root {
    background: #ff706d;
  }
}

.node .person .avat img {
  cursor: pointer;
}

.node .person .name {
  height: 2em;
  line-height: 2em;
  overflow: hidden;
  width: 100%;
}

.node.hasMate::after {
  content: "";
  position: absolute;
  left: 2em;
  right: 2em;
  top: 15px;
  border-top: 2px solid #ccc;
  z-index: 1000 !important;
}

.node.hasMate .person:last-child {
  margin-left: 1em;
}

.tips {
  padding: 0 20px;

  .el-select {
    width: 100%;
  }

  .blue {
    color: #00B5EF;
  }

  .check {
    margin-left: 100px;
  }

  .inquiry {
    font-weight: bold;
  }

  .el-form-item__label {
    display: block;
    float: none;
    text-align: left;
  }

  .el-form-item__content {
    margin-left: 0;
  }
}


// 竖向
.landscape {
  transform: translate(-100%, 0) rotate(-90deg);
  transform-origin: 100% 0;

  .node {
    text-align: left;
    height: 8em;
    width: 10em;
  }

  .person {
    position: relative;
    transform: rotate(90deg);
    // padding-left: 4.5em;
    // height: 4em;
    top: 35px;
    left: 12px;
    width: 150px;
  }
}


// .landscape{transform: rotate(-90deg); padding:0 4em;}
// .landscape .node{text-align: left;height: 8em;width:8em;}
// .landscape .person{position: relative; transform: rotate(90deg);padding-left: 4.5em;height: 4em;top:4em;left: -1em;}
// .landscape .person .avat{position: absolute;left: 0;}
// .landscape .person .name{height: 4em; line-height: 4em;}
// .landscape .hasMate{position: relative;}
// .landscape .hasMate .person{position: absolute; }
// .landscape .hasMate .person:first-child{left:auto; right:-4em;}
// .landscape .hasMate .person:last-child{left: -4em;margin-left:0;}

.el-popover {
  .el-button {
    padding: 8px !important;
    margin-left: 5px !important;
    float: left;
  }
}
</style>
