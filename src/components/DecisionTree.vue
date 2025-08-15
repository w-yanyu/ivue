    <template>
  <!-- 规则树  主要用在规则树定义 -->
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
      cParentScope: Object, //父页面每块区域业务数据
      isUseMiniMap: {//是否使用小地图
        type: Boolean,
        default: true,
      },
      //设置画布高度
      setHeight:{
        type:String,
        default:'0'
      },
    },
    name: 'tree',

    data() {
      return {
        cParams: this.cParentParams,
        graph: null, //G6实例
        container: '', //G6的画布
        width: '', //画布宽高
        height: ' ', //画布宽高
        tree_root: this.$i18ns('decision.tree_root'),
        tree_node: this.$i18ns('decision.tree_node'),
        rule_express: this.$i18ns('decision.rule_express'),
        tree_child: this.$i18ns('decision.tree_child'),
        action_list: this.$i18ns('decision.action_list'),
        add: this.$i18ns('decision.add'),
        view: this.$i18ns('decision.view'),
        edit: this.$i18ns('decision.edit'),
        delete: this.$i18ns('decision.delete'),
        defaultConfig: { //G6配置初始化
          width: this.width,
          height: this.height,
          modes: { //交互配置
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
        console.log(that.cParams);
        //获取容器元素
        that.container = document.getElementById('container');
        that.width = that.container.scrollWidth;
        console.log(`that.container`, that.container);
        console.log('this.setHeight----------------',this.setHeight);
        that.height =this.setHeight==='0'? window.innerHeight || that.container.scrollHeight:this.setHeight;
        console.log(`宽==${that.width}   高==${that.height}`);
        console.log(`宽window.innerWidth==${window.innerWidth}   高window.innerHeight==${window.innerHeight}`);
        that.defaultConfig.width = that.width;
        that.defaultConfig.height = that.height;
        that.registerFn();
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

      //节点自定义设置（在页面加载的时候调用init方法，然后调用这个方法）
      registerFn() { 
        let that = this

        let tree_root = this.tree_root
        let tree_node = this.tree_node
        let tree_child = this.tree_child
        let rule_express = this.rule_express
        let action_list = this.action_list
        let add = this.add
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
            //设置节点数据对应属性
            const {
              ruleTreeNodeId,
              ruleExpress,
              collapsed,
              ruleDesc,
              nodeType,
              rate,
              children,
            } = cfg;

            console.log('节点数据对应属性', cfg);
            const grey = '#CED4D9';
            // 节点框的基本样式 逻辑不应该在这里判断
            const rectConfig = {
              width: 300, //节点的宽
              height: 110, //节点的高
              lineWidth: 1,
              fontSize: 16,
              fill: '#fff',
              radius: 4,
              stroke: grey,
              opacity: 1,
            };
            console.log('rectConfig', rectConfig);
            const nodeOrigin = {
              x: -rectConfig.width / 2,
              y: -rectConfig.height / 2,
            };
            console.log('nodeOrigin', nodeOrigin);

            const textConfig = {
              textAlign: 'left',
              textBaseline: 'bottom',
            };
            console.log('textConfig', textConfig);

            const rect = group.addShape('rect', {
              attrs: {
                x: nodeOrigin.x,
                y: nodeOrigin.y,
                ...rectConfig,
              },
            });
            console.log('rect', rect);

            const rectBBox = rect.getBBox();
            console.log('rectBBox', rectBBox);
            
            //将节点类型修改的节点标题           
            const treeNum = group.addShape('text', {
              attrs: {
                x: 12 + nodeOrigin.x,
                y: 23 + nodeOrigin.y,
                text: nodeType === 3 ? tree_root : nodeType === 2 ? tree_child : tree_node,
                fontSize: 16,
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
                fill: '#000',
              },
              name: 'name-shape',
            });

            //规则描述的底层颜色块
            if (nodeType !== 3) {
              group.addShape('rect', {
                attrs: {
                  x: 10 + nodeOrigin.x,
                  y: 25 + nodeOrigin.y,
                  width: 210,
                  height: 78,
                  fill: that.colors[nodeType],
                  radius: 3,
                  opacity: 0.10,
                },
              });
              //添加dom（没成功）
              // group.addShape('dom', {
              //   attrs: {
              //     x: 10 + nodeOrigin.x,
              //     y: 25 + nodeOrigin.y,
              //     width: 210,
              //     height: 78,
              //     // DOM's html
              //     html: `<div style="border:1px solid #2196f3;border-radius:5px;">66666</div>`
              //   },
              //   name: 'dom-shape',
              //   draggable: true,
              // });
            }

            // 规则中文描述
            /**if (ruleDesc) {
              //规则描述标题
              const treeType = group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 45 + nodeOrigin.y,
                  text: '规则描述：',
                  fontSize: 14,
                  fill: '#000',
                  opacity: 0.85,
                },
              });
              // 第一行
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 60 + nodeOrigin.y,
                  text: that.byteLength(ruleDesc) > 36 ? that.subStr(ruleDesc, 36) : ruleDesc,
                  fontSize: 12,
                  fill: '#000',
                  // opacity: 0.85,
                  cursor: 'pointer',
                  fontFamily: "楷体",
                },
                name: 'rule_desc',
              });
              // 第二行
              if (that.byteLength(ruleDesc) > 36 && that.byteLength(ruleDesc) <= 72) {
                console.log(ruleDesc, ruleDesc.length);
                console.log('ruleDesc.length > 18', ruleDesc.length > 18);
                let ruleDescOne = that.subStr(ruleDesc, 36); //计算第一行的字符
                let ruleDescOther = ruleDesc.substr(ruleDescOne.length, ruleDesc.length);
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 75 + nodeOrigin.y,
                    text: ruleDescOther,
                    fontSize: 12,
                    fill: '#000',
                    // opacity: 0.85,
                    cursor: 'pointer',
                    fontFamily: "楷体",
                  },
                  name: 'rule_desc',
                });
              }
              //第三行
              if (that.byteLength(ruleDesc) > 72) {
                let ruleDescOther = that.subStr(ruleDesc, 72);

                let ruleDescEnd = ruleDesc.substr(ruleDescOther.length, ruleDesc.length);
                if (that.byteLength(ruleDescEnd) > 36) {
                  ruleDescEnd = that.subStr(ruleDescEnd, 33) + '...';
                }
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 75 + nodeOrigin.y,
                    text: ruleDescEnd,
                    fontSize: 12,
                    fill: '#000',
                    // opacity: 0.85,
                    cursor: 'pointer',
                    fontFamily: "楷体",
                  },
                  name: 'rule_desc',
                });
              }
            }*/
            // 规则公式
            if (ruleExpress && nodeType) {
              //规则描述标题
              const treeType = group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 45 + nodeOrigin.y,
                  text: nodeType == 1 ? rule_express : action_list,
                  fontSize: 14,
                  fill: '#000',
                  opacity: 0.85,
                },
              });
              // 第一行
              group.addShape('text', {
                attrs: {
                  ...textConfig,
                  x: 12 + nodeOrigin.x,
                  y: 60 + nodeOrigin.y,
                  text: that.byteLength(ruleExpress) > 36 ? that.subStr(ruleExpress, 36) : ruleExpress,
                  fontSize: 12,
                  fill: '#000',
                  // opacity: 0.85,
                  cursor: 'pointer',
                  fontFamily: "楷体",
                },
                name: 'rule_desc',
              });
              // 第二行
              if (that.byteLength(ruleExpress) > 36 && that.byteLength(ruleExpress) <= 72) {
                console.log(ruleExpress, ruleExpress.length);
                console.log('ruleExpress.length > 18', ruleExpress.length > 18);
                let ruleExpressOne = that.subStr(ruleExpress, 36); //计算第一行的字符
                let ruleExpressOther = ruleExpress.substr(ruleExpressOne.length, ruleExpress.length);
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 75 + nodeOrigin.y,
                    text: ruleExpressOther,
                    fontSize: 12,
                    fill: '#000',
                    // opacity: 0.85,
                    cursor: 'pointer',
                    fontFamily: "楷体",
                  },
                  name: 'rule_desc',
                });
              }
              //第三行
              if (that.byteLength(ruleExpress) > 72) {
                let ruleExpressOther = that.subStr(ruleExpress, 72);

                let ruleExpressEnd = ruleExpress.substr(ruleExpressOther.length, ruleExpress.length);
                if (that.byteLength(ruleExpressEnd) > 36) {
                  ruleExpressEnd = that.subStr(ruleExpressEnd, 33) + '...';
                }
                group.addShape('text', {
                  attrs: {
                    ...textConfig,
                    x: 12 + nodeOrigin.x,
                    y: 75 + nodeOrigin.y,
                    text: ruleExpressEnd,
                    fontSize: 12,
                    fill: '#000',
                    // opacity: 0.85,
                    cursor: 'pointer',
                    fontFamily: "楷体",
                  },
                  name: 'rule_desc',
                });
              }
            }
            // bottom line background
            const bottomBackRect = group.addShape('rect', {
              attrs: {
                x: nodeOrigin.x,
                y: rectBBox.maxY - 4,
                width: rectConfig.width,
                height: 4,
                radius: [0, 0, rectConfig.radius, rectConfig.radius],
                // fill: '#E0DFE3',
                // fill: that.colors[status],
                fill: that.colors[nodeType],
              },
            });

            // 底部颜色线
            const bottomRect = group.addShape('rect', {
              attrs: {
                x: nodeOrigin.x,
                y: rectBBox.maxY - 4,
                width: rate * rectBBox.width,
                height: 4,
                radius: [0, 0, 0, rectConfig.radius],
                // fill: that.colors[status],
                fill: that.colors[nodeType],
              },
            });
            let menuY = -10; //整体控制按钮组上下移动


            let filter = [];
            if (children && children.length > 0) {
              filter = children.filter(obj => obj.nodeType === 2)
            }

            //子节点时要显示的按钮
            if (nodeType === 1) {
              if (filter.length === 0) {
                //添加按钮底
                group.addShape('rect', {
                  attrs: {
                    x: rectConfig.width / 2 - 70,
                    y: menuY - 40,
                    width: 50,
                    height: 20,
                    cursor: 'pointer',
                    fill: '#04b6ea',
                    radius: 3
                  },
                  name: 'menu_add',
                  modelId: cfg.id,
                });

                //添加按钮字
                group.addShape('text', {
                  attrs: {
                    x: rectConfig.width / 2 - 60,
                    y: menuY - 29,
                    width: 50,
                    height: 20,
                    cursor: 'pointer',
                    fill: '#ffffff',
                    text: add,
                    fontSize: 14,
                    textAlign: 'left',
                    textBaseline: 'middle',
                  },
                  name: 'menu_add',
                  modelId: cfg.id,
                });
              }
              //查看按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY - 15,
                  width: 50,
                  height: 20,
                  stroke: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fill: '#787878',
                  radius: 3
                },
                name: 'menu_detail',
                modelId: cfg.id,
              });
              //显示查看按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
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

              //编辑按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY + 10,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: "#67be69",
                  radius: 3
                },
                name: 'menu_edit',
                modelId: cfg.id,
              });
              //编辑按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY + 21,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ffffff',
                  text: edit,
                  fontSize: 14,
                  textAlign: 'left',
                  textBaseline: 'middle',
                },
                name: 'menu_edit',
                modelId: cfg.id,
              });

              //删除按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY + 35,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ff0000',
                  radius: 3
                },
                name: 'menu_del',
                modelId: cfg.id,
              });

              //删除按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY + 46,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ffffff',
                  text: del,
                  fontSize: 14,
                  textAlign: 'left',
                  textBaseline: 'middle',
                },
                name: 'menu_del',
                modelId: cfg.id,
              });
            }
            //动作节点显示的按钮组
            if (nodeType === 2) {
              //查看按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY - 40,
                  width: 50,
                  height: 20,
                  stroke: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fill: '#787878',
                  radius: 3
                },
                name: 'menu_detail',
                modelId: cfg.id,
              });
              //查看按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY - 29,
                  width: 50,
                  height: 20,
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

              //编辑按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY - 15,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#67be69',
                  radius: 3
                },
                name: 'menu_edit',
                modelId: cfg.id,
              });
              //编辑按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY - 4,
                  width: 50,
                  height: 20,
                  stroke: 'rgba(0, 0, 0, 0.25)',
                  cursor: 'pointer',
                  fill: '#ffffff',
                  text: edit,
                  fontSize: 14,
                  textAlign: 'left',
                  textBaseline: 'middle',
                },
                name: 'menu_edit_action',
                modelId: cfg.id,
              });

              //删除按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY + 10,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ff0000',
                  radius: 3
                },
                name: 'menu_del',
                modelId: cfg.id,
              });
              //删除按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY + 21,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ffffff',
                  text: del,
                  fontSize: 14,
                  textAlign: 'left',
                  textBaseline: 'middle',
                },
                name: 'menu_del',
                modelId: cfg.id,
              });
            }
            //根节点显示的按钮组
            if (nodeType === 3) {
              //添加按钮底
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 70,
                  y: menuY - 40,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#04b6ea',
                  radius: 3
                },
                name: 'menu_add',
                modelId: cfg.id,
              });
              //添加按钮字
              group.addShape('text', {
                attrs: {
                  x: rectConfig.width / 2 - 60,
                  y: menuY - 29,
                  width: 50,
                  height: 20,
                  cursor: 'pointer',
                  fill: '#ffffff',
                  text: add,
                  fontSize: 14,
                  textAlign: 'left',
                  textBaseline: 'middle',
                },
                name: 'menu_add',
                modelId: cfg.id,
              });
            }

            // collapse rect 是否显示子节点交互框 展开
            if (cfg.children && cfg.children.length) {
              group.addShape('rect', {
                attrs: {
                  x: rectConfig.width / 2 - 8,
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
                  x: rectConfig.width / 2,
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
            return rect;
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
         * edgeName 自定义边的名称
         * options 自定义边时的配置项，配置项中包括完整的生命周期方法
         * extendedEdgeName 自定义边时可基于内置边进行定义，该字段表示内置边的名称
         */
        G6.registerEdge('flow-cubic', registerEdgeOptions, 'single-line');
      },

      //组件暴露出去的方法，渲染树的数据（父页面会调用这个方法）
      renderTreeData(treeData) {
        let that = this;
        // that.init();
        console.log('树组件准备渲染数据');
        //如果G6已被创建 更新渲染数据
        if (that.graph) {
          //在拉取新数据重新渲染页面之前先获取当前缩放比例
          const zoom = that.graph.getZoom();
          //在拉取新数据重新渲染页面之前先获取点（0， 0）在画布上的位置
          const lastPoint = that.graph.getCanvasByPoint(0, 0);
          that.graph.changeData(treeData);
          //缩放至之前的比例
          that.graph.zoomTo(zoom);
          //获取重新渲染之后点（0， 0）在画布的位置
          const newPoint = that.graph.getCanvasByPoint(0, 0);
          //移动画布相对位移
          that.graph.translate(lastPoint.x - newPoint.x, lastPoint.y - newPoint.y);
        } else {
          //创建G6并渲染数据
          that.initGraph(treeData)
        }
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
            const ruleDesc = e.item.getModel().ruleDesc;
            const ruleExpress = e.item.getModel().ruleExpress;

            if (e.target.get('name') === 'rule_express') {
              outDiv.innerHTML = `规则表达式:${ruleExpress}`;
            } else {
              outDiv.innerHTML = `规则描述:${ruleDesc}`;
            }
            return outDiv;
          },
          shouldBegin: (e) => {
            if (e.target.get('name') === 'rule_express' || e.target.get('name') === 'rule_desc') return true;
            return false;
          },
        });
        const grid = new G6.Grid();

        if (this.isUseMiniMap) {
          const minimap = new G6.Minimap({
            size: [150, 150],
            className: 'minimap',
            type: 'default',
            delegateStyle: {
              opacity: '0.8'
            }
          });
          that.graph = new G6.TreeGraph({
            container: 'container',
            ...that.defaultConfig,
            // ...config,
            plugins: [tooltip, grid, minimap]
            // plugins: [grid, minimap]
          });
        } else {
          that.graph = new G6.TreeGraph({
            container: 'container',
            ...that.defaultConfig,
            // ...config,
            plugins: [tooltip, grid]
            // plugins: [grid, minimap]
          });
        }
        console.log('准备渲染', data);
        console.log(
          `宽that.defaultConfig==${that.defaultConfig.width}   高that.defaultConfig==${that.defaultConfig.height}`);
        console.log(`that.defaultConfig`, that.defaultConfig);
        that.graph.data(data);
        that.graph.render();
        that.graph.get('canvas').set('supportCSSTransform', true)
        // that.graph.zoom(config.defaultZoom || 1);
        if (data.children) {
          that.graph.zoom(1);
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
        //监听添加按钮
        that.graph.on('menu_add:click', function(evt) {
          console.log('目录添加事件', evt);
          let node = evt.item._cfg.model;
          console.log('添加的treeid 根节点id====', node.treeId);
          console.log('添加的nodeIdFrom 上一节点id====', node.nodeIdFrom);
          console.log('添加的ruleTreeNodeId 本节点id====', node.ruleTreeNodeId);
          //调用addStock方法
          that.addStock({
            val: 0,
            data: node
          })
        });
        //监听子节点上的编辑按钮
        that.graph.on('menu_edit:click', function(evt) {
          console.log('目录编辑事件', evt);
          let node = evt.item._cfg.model;
          that.addStock({
            val: 1,
            data: node
          })
        });
        //监听动作节点上的编辑按钮
        that.graph.on('menu_edit_action:click', function(evt) {
          console.log('目录动作节点编辑事件', evt);
          let node = evt.item._cfg.model;
          console.log('目录动作节点编辑事件--节点数据', node);
          that.addStock({
            val: 1,
            data: node,
            actionList: node.actionList
          })
          // that.setActionList(node.actionList)
        });
        //监听详情按钮
        that.graph.on('menu_detail:click', function(evt) {
          console.log('查看按钮点击事件', evt);
          let node = evt.item._cfg.model;
          that.checkView(node);
          that.setActionList(node.actionList)
        });
        //监听删除按钮
        that.graph.on('menu_del:click', function(evt) {
          console.log('目录删除事件', evt);
          let node = evt.item._cfg.model;
          that.deleteStock(node)
        });
      },
      //val: 0 新增, 1 编辑
      addStock(val) {
        this.$emit('add', val) //调用父组件的add事件方法
      },
      checkView(data) {
        this.$emit('checkView', data) //调用父组件的checkView事件方法
      },
      // 删除
      deleteStock(data) {
        this.$emit('delete', data) //调用父组件的delete事件方法
      },
      setActionList(actionList) {
        this.$emit('setActionList', actionList) //调用父组件的setActionList事件方法
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

  .minimap {
    left: 0px;
    background-color: #FFFFFF;
    bottom: 0px;
    z-index: 99;
    position: absolute;
  }
</style>
