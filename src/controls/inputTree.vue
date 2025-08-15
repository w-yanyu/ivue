<template>
  <el-select
    ref="select"
    :value="valueTitle" :clearable="clearable" @clear="clearHandle">
    <el-option :value="valueId" :label="valueTitle">
      <el-tree id="tree-option"
               ref="selectTree"
               :accordion="accordion"
               :data="options"
               :props="defaultProps"
               :node-key="pageCodeStr"
               :default-expanded-keys="defaultExpandedKey"
               @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
  import Tools from "pte-ui/utils/Tools";
  import _ from "lodash";

  function findNode(id, keyName,labelField, arr) {
    let hasFound = false, // 表示是否有找到id值
      result = null;
    let fn = function(data) {
      if (Array.isArray(data) && !hasFound) {
        // 判断是否是数组并且没有的情况下，
        data.forEach(item => {
          if (item[keyName] === id) {
            // 数据循环每个子项，并且判断子项下边是否有id值
            result = item; // 返回的结果等于每一项
            hasFound = true; // 并且找到id值
          } else if (item.children) {
            fn(item.children); // 递归调用下边的子项
          }
        });
      }
    };
    fn(arr);
    return result[labelField];
  }

  export default {
    name: "PTE_inputTree",
    props: {
      config: Object, // 控件的相关配置
      name: String,
      scope: Object,
      value: String,
      /* 配置项 */
      defaultProps: {
        type: Object,
        default: () => {
          return {
            children: "children",
            isLeaf: "isLeaf",
            label: "",
          }
        }
      },
      /* 选项列表数据(树形结构的对象数组) */
      options: {
        type: Array,
        default: () => {
          return []
        }
      },
      /* 初始值 */
      value: [String, Number],
      /* 可清空选项 */
      clearable: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /* 自动收起 */
      accordion: {
        type: Boolean,
        default: () => {
          return false
        }
      },
    },
    data() {
      return {
        valueId: this.value,    // 初始值
        valueTitle: '',
        defaultExpandedKey: [],
        loading: false,//非异步情况loading
        hasDefinedNode : false,
        pageCodeStr: "", //节点的唯一标识
        labelField: "", //节点的唯一标识
        parentCodeStr: "", // 节点父节点标识
        currentSelectNode: {},
      }
    },
    created() {
      this.hasDefinedNode = _.get(this.config, "root.rootNode", false);
      this.pageCodeStr = _.get(this.config, "idField", "pageCode");
      this.parentCodeStr = _.get(this.config, "pIdField", "parentCode");
      this.labelField = _.get(this.config, "labelField", "labelField");
      if (this.hasDefinedNode) {
        this.rootVal = _.get(this.hasDefinedNode, "value", "");
      }
      this.defaultProps.label = this.config.labelField;
      this.defaultProps.value = this.config.idField;
      this.defaultProps.icon = this.config.iconField;
    },
    mounted() {
      this.initTreeData()
      this.initHandle()
    },
    watch: {
      value(){
        this.$emit("input", this.value)
        this.$emit("events", this.value)
        this.valueId = this.value
        this.initHandle()
      }
    },
    methods: {
      initTreeData() {
        let queryParams = {};
        this.loading = true;
        // 设置默认的method
        this.config.doRequest.method = this.config.doRequest.method || "post";
        // 获取动态数据
        let currentcParams = this.$dataBus.getCurrentcParams(this);
        let cParentMeta = this.$dataBus.getParentcMeta(this);
        let cParentScope = this.$dataBus.getParentScope(this);
        let cMeta = this.$dataBus.getCurrentcMeta(this);
        let scope = this.$dataBus.getCurrentScope(this);

        let doRequestObj = Tools.createDoRequestParams(
          this.config.doRequest,
          queryParams,
          currentcParams,
          cParentMeta,
          cParentScope,
          cMeta,
          scope
        );
        this.$http
          .doApi(doRequestObj)
          .then(response => {
            let result = _.cloneDeep(response.data);
            let list = this.formatTreeData(result, this.rootVal);
            let root = {};
            // 如果存在自定义根节点
            if (this.hasDefinedNode) {
              root = this.formatRootData(this.config.root);
              root.children = [...list];
              this.options = [root];
            } else {
              this.options = [...list];
            }
            // 存在初始节点默认打开第一个节点的模板
            if (this.valueId) {
              this.valueTitle = findNode(this.valueId,this.pageCodeStr,this.labelField,this.options);
            }
            this.loading = false;
          })
          .catch(() => {
            //不处理
            this.options = [];
            this.loading = false;
          });
      },
      // 检查是否存在根节点，存在时需要格式化其数据结构
      formatRootData(root) {
        let rootObject = {};
        rootObject[this.config.labelField] = Tools.resolveStringTemplate(
          _.get(root, "rootNode.name", "根目录"),
          this.cParentParams,
          this.cParentMeta,
          this.cParentScope,
          {},
          {},
          {}
        );
        rootObject[this.config.idField] = _.get(root, "rootNode.value", "");
        rootObject.icon = _.get(root, "rootNode.icon", "shouye2");
        rootObject.isLeaf = false;
        rootObject.nodeType = "ROOT_ELEMENT";
        rootObject.disabled = _.get(root, "rootNode.disabled");
        rootObject[this.rootId] = _.get(root, `rootNode.${this.rootId}`, -1);
        return rootObject;
      },
      // 初始化值
      initHandle() {
        if (this.valueId) {
          // this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.defaultProps.label];
          // console.log(JSON.stringify(this.options))
          // console.log("222222"+ this.$refs.selectTree.getNode(this.value));
          this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
          this.defaultExpandedKey = [this.valueId]      // 设置默认展开
        }
        this.$nextTick(() => {
          let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
          let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
          scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          scrollBar.forEach(ele => ele.style.width = 0)
        })
      },
      // 生成树结构数据
      formatTreeData(data, rootVal) {
        let nodeList = [];
        let pageCode = this.pageCodeStr;
        let parentCode = this.parentCodeStr;
        let type = this.setNodeType;
        if (!_.isArray(data)) {
          return [];
        }
        if (_.isArray(data) && data.length === 0) {
          return [];
        }
        for (let i = 0; i < data.length; i++) {
          let parentSymbel = rootVal ? rootVal : "-1";
          if (data[i][parentCode] === parentSymbel) {
            let obj = data[i];
            obj.nodeType = data[i][type];
            obj.children = [];
            nodeList.push(data[i]);
            data.splice(i, 1);
            i--;
          }
        }
        let run = function(treeArrs) {
          if (data.length > 0) {
            for (let i = 0; i < treeArrs.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (treeArrs[i][pageCode] === data[j][parentCode]) {
                  let obj = data[j];
                  obj.nodeType = data[j][type];
                  obj.children = [];
                  treeArrs[i].children.push(obj);
                  data.splice(j, 1);
                  j--;
                }
              }
              run(treeArrs[i].children);
            }
          }
        };
        run(nodeList);
        return nodeList;
      },
      // 切换选项
      handleNodeClick(node) {
        this.valueTitle = node[this.defaultProps.label]
        this.valueId = node[this.defaultProps.value]
        this.$emit("input", this.valueId)
        this.$emit("change")
        this.defaultExpandedKey = []
        this.$refs.select.blur() // 收起下拉框
      },
      // 清除选中
      clearHandle() {
        this.valueTitle = ''
        this.valueId = null
        this.defaultExpandedKey = []
        this.clearSelected()
        this.$emit('input', null)
      },
      /* 清空选中样式 */
      clearSelected() {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      }
    }
  };
</script>

<style scoped>
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }

  .el-select-dropdown__item.selected {
    font-weight: normal;
  }

  ul li >>> .el-tree .el-tree-node__content {
    height: auto;
    padding: 0 20px;
  }

  .el-tree-node__label {
    font-weight: normal;
  }

  .el-tree >>> .is-current .el-tree-node__label {
    color: #409EFF;
    font-weight: 700;
  }

  .el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
    color: #606266;
    font-weight: normal;
  }
</style>
