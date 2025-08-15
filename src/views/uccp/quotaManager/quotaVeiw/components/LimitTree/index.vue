<template>
   <div class="gdt">
  <div  class="chart-limit-tree" id="chart-limit-tree"></div>
</div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "LimitTree",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    //客户编号
    customeNo: {
      type: String,
      require: true
    }
  },
  components: {},
  data() {
    return {
      
      treeData: { }
    };
  },
  created() {},
  mounted() {
    this.getLimitTreeData();
  },
  methods: {
    //请求额度树数据
    getLimitTreeData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp3025",
        cust_no: this.customeNo,
        cust_info_type: "1,2,3,4"
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getLimitTreeData", response.data);
          let limitTree = JSON.parse(response.data.limit_tree);
          this.treeData = limitTree[0];
          this. drawLimitTree();
        } else {
          MyMessage({ message: response.message, type: "error"});
        }
      });
    },
    drawLimitTree() {
      let treeLimitDom = document.getElementById("chart-limit-tree");
      let treeLimitChart = echarts.init(treeLimitDom);

      

      let option = {
         
        tooltip: {


        formatter: function (a) {
            if(!a.data.dot)
            return
            console.log('节点打印',a)
            let list = []
            let listItem = ''
            for (let key in a.data.dot) {
            

              list.push(
                `<i style="display: inline-block;width: 10px;height: 10px;background:rgb(150,214,214);border-radius: 50%;}"></i><span style="width:15px; display:inline-block;">
                </span>${key}---${a.data.dot[key]} `
              )
            }
            listItem = list.join('<br/>')
            return '<div style="padding:6px; text-align: left;" >' + listItem + '</div>'
          },



        //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
        trigger: "item",
          //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
          triggerOn: "mousemove",
    },
    series: [{
        type: 'tree',
        data: [this.treeData],
        top: '10%',
        left: '7%',
        bottom: '1%',
        right: '20%',
        symbolSize: 17,
        hoverAnimation: true, 
       

        

        label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
            lineHeight: 24,

            formatter: function(params) {
                console.log(params)
                if (params.data.dot === 1) {
                    return '{a|' + params.name + '}'
                } else if (params.data.level === 2) {
                    return '{b|' + params.name + '}'
                } else if (params.data.level === 3) {
                    return '{c|' + params.name + '}'
                } else {
                    return '{d|' + params.name + '}'
                }
            },

           
      
            rich: {
                a: {
                    padding: 6,
                    borderRadius: 3,
                    color:'#fff',
                    backgroundColor: '#81bff4'
                },
                b: {
                    padding: 6,
                    borderRadius: 3,
                    color:'#fff',
                    backgroundColor: '#6dc3dc'
                },
                c: {
                    padding: 6,
                    borderRadius: 3,
                    color:'#fff',
                    backgroundColor: '#56c7c0'
                },
                d: {
                    padding: 6,
                    borderRadius: 3,
                    color:'#fff',
                    shadowColor:'rgba(0, 0, 0, 0.4)',
                    shadowBlur:6,
                    backgroundColor: '#5db9c2'
                }
            }
        },

        itemStyle:{
                borderColor: '#11d56d',
                color: '#11d56d',
            },
        lineStyle:{
          width: 4,
          color: {
        type: 'linear',
        x: 0, //右
        y: 0, //下
        x2: 1, //左
        y2: 0, //上
        colorStops: [
          {
            offset: 0,
            color: '#11d56d' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#83bff6' // 100% 处的颜色
          }
        ]
      }

 
        },
        leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left"
              }
            },

        emphasis: {
            focus: 'descendant'
        },

         //子树折叠和展开的交互，默认打开
         expandAndCollapse: true,
            //树图初始展开的层级（深度）
            initialTreeDepth: 100,
            //初始动画的时长，支持回调函数,默认1000
            animationDuration: 1550,
            //数据更新动画的时长，默认300
            animationDurationUpdate: 750,

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
    }]
      };
      option && treeLimitChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#chart-limit-tree {
  width: 95vw;
  height: 100vh;
  text-align: left;
  
}

#chart-limit-tree:nth-child(1){
  
  width: 1572; //树图容器大小  树图的节点根据此宽度来自适应相互间的间距  因为节点间距是自适应容器宽度 所以此宽度不能设置成自适应（父子不能都为自适应  该页面解决方案应该是将节点间距写死，然后容器的宽度根据节点数量去自适应。但是需要改echars源码 所以目前只能先将宽度写死）
}
 
.gdt{ 
 
    overflow: hidden;
    overflow-x: scroll;
}
</style>
