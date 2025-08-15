<template>
  <!-- 规则交易树  主要使用在规则树交易信息查询 -->
  <!-- G6 决策树渲染块 -->
  <div id="container" @contextmenu.prevent></div>

</template>
<script>
  import G6 from '@antv/g6';
  import insertCss from 'insert-css';
  insertCss(`
   .g6-component-tooltip {
     background-color: rgba(0,0,0, 0.65);
     padding: 10px;
     box-shadow: rgb(174, 174, 174) 0px 0px 10px;
     width: fit-content;
     color: #fff;
     border-radius = 4px;
   }
 `);
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object //父页面每块区域业务数据
    },
    name: 'tree',

    data() {
      return {
        tree_root: this.$i18ns('decision.tree_root'),
        tree_node: this.$i18ns('decision.tree_node'),
        description: this.$i18ns('decision.description'),
        tree_child: this.$i18ns('decision.tree_child'),
        action_description: this.$i18ns('decision.action_description'),
        rule_description: this.$i18ns('decision.rule_description'),
        view: this.$i18ns('decision.view'),
        edit: this.$i18ns('decision.edit'),
        delete: this.$i18ns('decision.delete'),
        cParams: this.cParentParams,
        graph: null, //G6实例
        container: '', //G6的画布
        width: '', //画布宽高
        height: ' ', //画布宽高
        defaultConfig: { //G6配置初始化
          width: this.width,
          height: this.height,
          modes: { //交互配置
            // default: ['drag-canvas'],
            default: ['zoom-canvas', 'drag-canvas'],
          },
          fitView: true,
          animate: true,
          defaultNode: {
            type: 'flow-rect',
          },
          defaultEdge: {
            type: 'cubic-horizontal',
            style: {
              stroke: '#CED4D9',
            },
          },
          layout: { //树的布局配置
            type: 'indented', //类型为缩进树
            direction: 'LR', //树布局的方向，默认为 'LR'，其他选项说明：
            dropCap: false,
            indent: 400, //列间间距
            getHeight: () => {
              return 90;
            }, //每个节点的高度 可调整高度间距
          },
        }, //默认配置
        colors: { //配置节点颜色数组
        B: '#5BD8A6',
        1: '#5B8FF9',
        2: '#ffaa00',
        3: '#F46649',
        DI: '#A7A7A7',
        },

      }
    },
    mounted() {
      this.init();
    },
    computed: {},
    methods: {
      //初始化参数
      init() {
        let that = this;
        that.container = document.getElementById('container');
        that.width = that.container.scrollWidth;
        that.height = that.container.scrollHeight || window.innerHeight * 0.7;
        console.log(`宽==${that.width}   高==${that.height}`);
        console.log(`宽window.innerWidth==${window.innerWidth}   高window.innerHeight==${window.innerHeight}`);
        that.defaultConfig.width = that.width;
        that.defaultConfig.height = that.height;
        that.registerFn();

        console.log('that.defaultConfig', that.defaultConfig);
      },
      //获取字符串的字节数
      byteLength(val) {
        var b = 0;
        var len = val.length; //初始化字节数递加变量并获取字符串参数的字符个数
        if (len) { //如果存在字符串，则执行计划
          for (var i = 0; i < len; i++) { //遍历字符串，枚举每个字符
            if (val.charCodeAt(i) > 255) { //字符编码大于255，说明是双字节字符
              b += 2; //则累加2个
            } else {
              b++; //否则递加一次
            }
          }
          return b; //返回字节数
        } else {
          return 0; //如果参数为空，则返回0个
        }
      },

      /**
       * 按字节长度截取字符串
       * @param {String} str 要截取的字符串
       * @param {Number} L 要截取的字节长度，注意是字节不是字符，一个汉字两个字节
       */
      subStr(str, L) {
        var result = ''
        var strlen = str.length // 字符串长度
        var chrlen = str.replace(/[^x00-\xff]/g, '**').length // 字节长度：如果有中文就替换成两个*号之后进行计算length

        if (chrlen <= L) {
          return str
        }

        for (var i = 0, j = 0; i < strlen; i++) {
          var chr = str.charAt(i)
          if (/[x00-\xff]/.test(chr)) {
            j++ // ascii码为0-255，一个字符就是一个字节的长度
          } else {
            j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
          }

          if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr
          } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result
          }
        }
      },
      //组件暴露出去的方法，渲染树的数据
      renderTreeData(treeData) {
        let that = this;
        //如果G6已被创建 更新渲染数据
        if (that.graph) {
          // that.graph.data(that.treeData);
          // that.graph.render();
          that.graph.changeData(treeData);
        } else {
          //创建G6并渲染数据
          that.initGraph(treeData)
        }
      },
      //判断弹框是否显示
      checkView(data) {
        this.$emit('checkView', data)
      },

      setActionList(actionList) {
        this.$emit('setActionList', actionList)
      },
      ////节点自定义设置
      registerFn() {
        let that = this
        let tree_root = this.tree_root
        let tree_node = this.tree_node
        let tree_child = this.tree_child
        let description = this.description
        let action_description = this.action_description
        let rule_description = this.rule_description
        let view = this.view
        let edit = this.edit
        let del = this.delete
        //需要自定义节点的options
        let registerNodeOptions = {
          shapeType: 'flow-rect',
          /**
           * 绘制节点，包含文本
           * @param  {Object} cfg 节点的配置项
           * @param  {G.Group} group 图形分组，节点中的图形对象的容器
           * @return {G.Shape} 绘制的图形，通过 node.get('keyShape') 可以获取到
           **/
          draw(cfg, group) {
            const { //设置节点数据对应属性
              ruleTreeNodeId,
              collapsed, //节点收缩状态
              treeDesc, //规则解析
              hitFlag, //是否命中规则
              nodeType, //节点类型
            } = cfg;
            // 根节点框样式
            const rootConfig = {
              width: 300, //节点的宽
              height: 110, //节点的高
              lineWidth: 1, //线的宽度
              fontSize: 16, //字体大小
              fill: '#fff', //填充颜色
              radius: 4, //圆角
              stroke: '#CED4D9', //边的颜色
              opacity: 1,
            };
            // 未命中的节点框样式
            const noHitConfig = {
              width: 300, //节点的宽
              height: 110, //节点的高
              lineWidth: 5, //线的宽度
              fontSize: 16, //字体大小
              fill: '#fff', //填充颜色
              radius: 4, //圆角
              stroke: '#ececec', //边的颜色
              opacity: 1,
            };
            //命中的节点框样式
            const hitConfig = {
              width: 300, //节点的宽
              height: 110, //节点的高
              fontSize: 16,
              radius: 10,
              opacity: 1,
              fill: '#fff',
              stroke: '#bae637',
              lineWidth: 5,
            };
            console.log('noHitConfig', noHitConfig);
            const nodeOrigin = {
              x: -noHitConfig.width / 2,
              y: -noHitConfig.height / 2,
            };
            console.log('nodeOrigin', nodeOrigin);

            const textConfig = {
              textAlign: 'left',
              textBaseline: 'bottom',
            };
            console.log('textConfig', textConfig);

            let treeNode;
            //根节点hitflag=''
            if (!hitFlag) {
              treeNode = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: nodeOrigin.y,
                  ...rootConfig,
                  cursor: 'pointer',
                },
                name: 'root_hit',
              });
              //如果是命中规则显示绿色
            } else if (hitFlag === 'hit') {
              const circle = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: nodeOrigin.y,
                  ...hitConfig,
                  cursor: 'pointer',
                },
                name: 'root_hit',
              });
              treeNode = circle;
              //如果是未命中的节点
            } else {
              const rect = group.addShape('rect', {
                attrs: {
                  x: nodeOrigin.x,
                  y: nodeOrigin.y,
                  ...noHitConfig,
                  cursor: 'pointer',
                },
                name: 'root_hit',
              });
              treeNode = rect;
              console.log('rect', rect);

              const rectBBox = rect.getBBox();
              console.log('rectBBox', rectBBox);
            }


            //将节点类型修改的节点标题
            const treeNum = group.addShape('text', {
              attrs: {
                ...textConfig,
                x: 12 + nodeOrigin.x,
                y: 23 + nodeOrigin.y,
                // text: name.length > 28 ? name.substr(0, 28) + '...' : name,
                text: nodeType === 3 ? tree_root : nodeType === 2 ? tree_child : tree_node,
                fontSize: 16,
                // fill: hitFlag === 'hit' ? '#fff' : '#000',
                fill: that.colors[nodeType],
                opacity: 0.85,
              },
              name: 'name-shape',
            });

            //节点编号内容
            group.addShape('text', {
              attrs: {
                ...textConfig,
                x: 5 + treeNum.getBBox().maxX,
                y: -3 + treeNum.getBBox().maxY,
                text: ruleTreeNodeId,
                fontSize: 10,
                // fill: hitFlag === 'hit' ? '#fff' : '#000',
                 fill: that.colors[nodeType],
              },
              name: 'root_hit',
            });
                console.log('nodeType-------------------', );
            //规则描述的底层颜色块
            group.addShape('rect', {
              attrs: {
                x: 10 + nodeOrigin.x,
                y: 25 + nodeOrigin.y,
                width: 210,
                height: 78,
                fill: that.colors[nodeType],
                radius: 3,
                opacity: 0.30,
              },
            });

            let menuY = -30; //整体控制按钮组上下移动
            //查看按钮底
            group.addShape('rect', {
              attrs: {
                x: rootConfig.width / 2 - 70,
                y: menuY - 15,
                width: 50,
                height: 20,
                stroke: 'rgba(0, 0, 0, 0.25)',
                cursor: 'pointer',
                fill: '#04b6ea',
                radius: 3
              },
              name: 'menu_detail',
              modelId: cfg.id,
            });
            //显示查看按钮字
            group.addShape('text', {
              attrs: {
                x: rootConfig.width / 2 - 60,
                y: menuY - 4,
                width: 50,
                height: 20,
                stroke: 'rgba(0, 0, 0, 0.25)',
                cursor: 'pointer',
                fill: '#ffffff',
                text: view,
                fontSize: 14,
                textAlign: 'left',
                textBaseline: 'middle',
              },
              name: 'menu_detail',
              modelId: cfg.id,
            });

            // 规则解释
            if (treeDesc) {
              //规则描述标题
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 45 + nodeOrigin.y,
                  text: nodeType === 3 ? description : nodeType === 2 ? action_description : rule_description,
                  fontSize: 14,
                  // fill: hitFlag === 'hit' ? '#fff' : '#000',
                  fill: that.colors[nodeType],
                  opacity: 0.85,
                },
                name: 'root_hit',
              });
              // 第一行
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 60 + nodeOrigin.y,
                  text: that.byteLength(treeDesc) > 30 ? that.subStr(treeDesc, 30) : treeDesc,
                  fontSize: 14,
                  // fill: hitFlag === 'hit' ? '#fff' : '#000',
                  fill: '#000',
                  // opacity: 0.85,
                  cursor: 'pointer',
                  fontFamily: "楷体",
                },
                name: 'root_hit',
              });
              // 第二行
              if (that.byteLength(treeDesc) > 30) {
                console.log(treeDesc, treeDesc.length);
                console.log('treeDesc.length > 18', treeDesc.length > 30);
                let treeDescOne = that.subStr(treeDesc, 30);
                let treeDescOther = treeDesc.substr(treeDescOne.length, treeDescOne.length+1);
                console.log('treeDescOther------------', treeDescOther);
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 75 + nodeOrigin.y,
                    text: treeDescOther,
                    fontSize: 14,
                    // fill: hitFlag === 'hit' ? '#fff' : '#000',
                    fill: '#000',
                    // opacity: 0.85,
                    fontFamily: "楷体",
                  },
                  name: 'root_hit',
                });
              }
              //第三行
              if (that.byteLength(treeDesc) > 60) {
                let treeDescOther = that.subStr(treeDesc,60);
                let treeDescEnd = treeDesc.substr(treeDescOther.length, treeDesc.length);
                if (that.byteLength(treeDescEnd) > 36) {
                  treeDescEnd = that.subStr(treeDescEnd, 33) + '...';
                }
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 90 + nodeOrigin.y,
                    text: treeDescEnd,
                    fontSize: 14,
                    fill: '#000',
                    // opacity: 0.85,
                    cursor: 'pointer',
                    fontFamily: "楷体",
                  },
                  name: 'rule_desc',
                });
              }
            }
            // collapse rect 是否显示子节点交互框 展开
            if (cfg.children && cfg.children.length) {
              group.addShape('rect', {
                attrs: {
                  x: noHitConfig.width / 2 - 8,
                  y: -8,
                  width: 16,
                  height: 16,
                  stroke: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fill: '#fff',
                },
                name: 'collapse-back',
                modelId: cfg.id,
              });

              // collpase text 是否显示子节点交互框 收缩
              group.addShape('text', {
                attrs: {
                  x: noHitConfig.width / 2,
                  y: -1,
                  textAlign: 'center',
                  textBaseline: 'middle',
                  text: collapsed ? '+' : '-',
                  fontSize: 16,
                  cursor: 'pointer',
                  fill: 'rgba(0, 0, 0, 0.25)',
                },
                name: 'collapse-text',
                modelId: cfg.id,
              });
            }


            this.drawLinkPoints(cfg, group);
            return treeNode;
          },
          update(cfg, item) {
            const group = item.getContainer();
            this.updateLinkPoints(cfg, group);
          },
          setState(name, value, item) {
            if (name === 'collapse') {
              const group = item.getContainer();
              const collapseText = group.find((e) => e.get('name') === 'collapse-text');
              if (collapseText) {
                if (!value) {
                  collapseText.attr({
                    text: '-',
                  });
                } else {
                  collapseText.attr({
                    text: '+',
                  });
                }
              }
            }
          },
          getAnchorPoints() {
            return [
              [0, 0.5],
              [1, 0.5],
            ];
          },
        }
        /**
         * nodeName 自定义节点名称，需保持唯一性。
         * options 自定义节点时的配置项，配置项中包括完整的生命周期方法
         * extendNodeName 自定义节点时可基于内置节点进行定义，该字段表示内置节点名称
         */
        G6.registerNode('flow-rect', registerNodeOptions, 'rect');


        let registerEdgeOptions = {

          getControlPoints(cfg) {
            let controlPoints = cfg.controlPoints; // 指定controlPoints
            if (!controlPoints || !controlPoints.length) {
              const {
                startPoint,
                endPoint,
                sourceNode,
                targetNode
              } = cfg;
              const {
                x: startX,
                y: startY,
                coefficientX,
                coefficientY
              } = sourceNode ? sourceNode.getModel() : startPoint;
              const {
                x: endX,
                y: endY
              } = targetNode ? targetNode.getModel() : endPoint;
              let curveStart = (endX - startX) * coefficientX;
              let curveEnd = (endY - startY) * coefficientY;
              curveStart = curveStart > 40 ? 40 : curveStart;
              curveEnd = curveEnd < -30 ? curveEnd : -30;
              controlPoints = [{
                  x: startPoint.x + curveStart,
                  y: startPoint.y
                },
                {
                  x: endPoint.x + curveEnd,
                  y: endPoint.y
                },
              ];
            }
            return controlPoints;
          },
          getPath(points) {
            const path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push([
              'C',
              points[1].x,
              points[1].y,
              points[2].x,
              points[2].y,
              points[3].x,
              points[3].y,
            ]);
            return path;
          },

        }
        /**
         * 注册自定义的边。
         * edgeName 	自定义边的名称
         * options 自定义边时的配置项，配置项中包括完整的生命周期方法
         * extendedEdgeName 自定义边时可基于内置边进行定义，该字段表示内置边的名称
         */
        G6.registerEdge('flow-cubic', registerEdgeOptions, 'single-line');
      },
      //初始化
      initGraph(data) {
        let that = this;
        that.graph = null;
        if (!data) {
          return;
        }
        const tooltip = new G6.Tooltip({
          // offsetX and offsetY include the padding of the parent container
          offsetX: 20,
          offsetY: 30,
          // the types of items that allow the tooltip show up
          // 允许出现 tooltip 的 item 类型
          itemTypes: ['node'],
          // custom the tooltip's content
          // 自定义 tooltip 内容
          getContent: (e) => {
            // console.log("浮动层交互事件", e);
            const outDiv = document.createElement('div');
            //outDiv.style.padding = '0px 0px 20px 0px';
            const treeDesc = e.item.getModel().treeDesc;
            outDiv.innerHTML = `规则描述:${treeDesc}`;

            return outDiv;
          },
          shouldBegin: (e) => {
            if (e.target.get('name') === 'root_hit') return true;
            return false;
          },
        });
        const grid = new G6.Grid();
        // const minimap = new G6.Minimap({
        //   size: [150, 150],
        //   className: 'minimap',
        //   delegateStyle: {
        //     opacity: '0.8'
        //   }
        // });
        that.graph = new G6.TreeGraph({
          container: 'container',
          ...that.defaultConfig,
          //plugins: [tooltip, grid, minimap],
          plugins: [tooltip, grid]
        });
        
        console.log('准备渲染', data);
        that.graph.data(data);
        that.graph.render();
        that.graph.get('canvas').set('supportCSSTransform', true)
        // that.graph.zoom(config.defaultZoom || 1);
        if (data.children) {
          that.graph.zoom(0.9);
        } else {
          that.graph.zoom(0.3);
        }

        const handleCollapse = (e) => {
          const target = e.target;
          const id = target.get('modelId');
          const item = that.graph.findById(id);
          const nodeModel = item.getModel();
          nodeModel.collapsed = !nodeModel.collapsed;
          that.graph.layout();
          that.graph.setItemState(item, 'collapse', nodeModel.collapsed);
        };
        //是否显示子节点交互框
        that.graph.on('collapse-text:click', (e) => {
          console.log('节点收缩事件', e);
          handleCollapse(e);
        });
        //是否显示子节点交互框
        that.graph.on('collapse-back:click', (e) => {
          console.log('节点展开事件', e);
          handleCollapse(e);
        });

        that.graph.on('menu_detail:click', function(evt) {
          console.log('查看按钮点击事件', evt);
          let node = evt.item._cfg.model;
          that.checkView(node);
          that.setActionList(node.actionList)
        });
      },
    },


  }
</script>

<style lang="css" scoped>
  #container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
