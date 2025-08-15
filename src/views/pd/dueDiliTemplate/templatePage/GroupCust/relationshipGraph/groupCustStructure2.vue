 <template>
    <div id="mygoChart" class="goTree">
    </div>
</template>
<script>
import go from'gojs'
export default {
  name: "mygoChart",
  props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object   //父页面每块区域业务数据

  },
  data() {
    return {
      mygoChartData: [],
      cParams: this.cParentParams,
      group_no:String,
      charWidth: 200,
      charHeight: 75
    }
  },
  created(){

  },
  mounted(){
    let init_url = "SUMP/call/RPCCall";
    let getgroup_no = {
      servicecode: "us0606",
      cust_no: this.cParentParams.cust_no
    }
    this.$http.invokeAPI(init_url, "post", getgroup_no)
    .then(response1 => {
      if(response1.code="200"){
        console.log(response1.data);
        let init_req = {
              servicecode: "us0604",
              cust_no: response1.data.cust_no
            }

        this.$http.invokeAPI(init_url, "post", init_req)
            .then(response => {
              console.log(response);
              if(response.code="200"){
                var responseData = response.data;
                console.log("组织架构解析前数据："+ JSON.stringify(responseData));
                for(var i in responseData){
                  if(responseData[i].id == this.cParentParams.cust_no){
                    responseData[i].category = "mainNode3";
                    responseData[i].cust_name = responseData[i].title;
                    responseData[i].key = responseData[i].id;
                    responseData[i].parent = responseData[i].pid;
                  }else if(responseData[i].pid == "-1"){
                    responseData[i].category = "mainNode";
                    responseData[i].cust_name = responseData[i].title;
                    responseData[i].key = responseData[i].id;
                  }else{
                    responseData[i].category = "mainNode2";
                    responseData[i].cust_name = responseData[i].title;
                    responseData[i].key = responseData[i].id;
                    responseData[i].parent = responseData[i].pid;
                  }
                }

                this.mygoChartData = responseData;
              console.log("组织架构解析后数据："+ JSON.stringify(responseData));
              /* this.mygoChartData = [
              {status: '0', category: 'mainNode', key:"1", name1: "开证方：吉利汽车",name2: "签发日：2020.05.01", name3: "到期日：2020.11.30", name4: "1,000,000元" , img: require("styles/framework/images/sunline_logo.png")},
              {status: '1', category: 'mainNode2', key:"2", parent:"1", name1: "持证方：A公司",  name2: "", name3: "", name4: "500,000元", img: require("styles/framework/images/sunline_logo.png")},
              {status: '1', category: 'mainNode2', key:"3", parent:"2", name1: "持证方：B1公司", name2: "", name3: "", name4: "200,000元", img: require("styles/framework/images/sunline_logo.png")},
              {status: '2', category: 'mainNode3', key:"4", parent:"2", name1: "B2公司", name2: "已转让", name3: "", name4: "100,000元", img: require("styles/framework/images/sunline_logo.png")},
              {status: '1', category: 'mainNode2', key:"5", parent:"3", name1: "持证方：C1公司", name2: "", name3: "", name4: "150,000元", img: require("styles/framework/images/sunline_logo.png")},
              {status: '3', category: 'mainNode4', key:"6", parent:"3", name1: "持证方：C2公司", name2: "贴现方：XX银行", name3: "", name4: "50,000元", img: require("styles/framework/images/sunline_logo.png")},
              {status: '1', category: 'mainNode2', key:"7", parent:"4", name1: "持证方：C3公司", name2: "", name3: "", name4: "100,000元", img: require("styles/framework/images/sunline_logo.png")},
            ]; */
            /*this.mygoChartData = [
              {status: '0', category: 'mainNode',key:"1", cust_name: "开证方：吉利汽车",img: require("styles/framework/images/sunline_logo.png")},
              {status: '0', category: 'mainNode',key:"2", parent:"1", cust_name: "开证方：吉利汽车2",img: require("styles/framework/images/sunline_logo.png")},
              {status: '0', category: 'mainNode2',key:"3", parent:"1", cust_name: "开证方：吉利汽车3",img: require("styles/framework/images/sunline_logo.png")},
              {status: '0', category: 'mainNode3',key:"4", parent:"2", cust_name: "开证方：吉利汽车4",img: require("styles/framework/images/sunline_logo.png")},
              {status: '0', category: 'mainNode4',key:"5", parent:"3", cust_name: "开证方：吉利汽车5",img: require("styles/framework/images/sunline_logo.png")},
              ];*/

            var mySelf = this;
            const MAKE = go.GraphObject.make;
            mySelf.myDiagram  = MAKE(go.Diagram, "mygoChart",{
              contentAlignment: go.Spot.Center, // 居中显示
              isReadOnly:true,//只读
              allowMove:false,//允许拖动
              allowZoom:false,
              allowHorizontalScroll:true,
              allowVerticalScroll:true,
              "animationManager.isEnabled": false,
              autoScale:go.Diagram.UniformToFill,
              "dragSelectingTool.isEnabled" : false,
              nodeSelectionAdornmentTemplate: MAKE(go.Adornment, "Auto",MAKE(go.Shape, "Rectangle", { fill: "white", stroke: null }),),
              layout:MAKE(go.TreeLayout,{
                angle: 90,
                layerSpacing: 40
              })
            });
            for(var i in this.mygoChartData){
              mySelf.myDiagram.model.addNodeData(this.mygoChartData[i]);
              mySelf.myDiagram.model.addLinkData({"from":this.mygoChartData[i].parent, "to":this.mygoChartData[i].key,"category":"commonLine"});
              //开证方
              if(this.mygoChartData[i].category == 'mainNode'){
                mySelf.myDiagram.nodeTemplateMap.add("mainNode",
                  MAKE(go.Node,new go.Binding("location", "loc", go.Point.parse),
                    MAKE(go.Shape, "RoundedRectangle", { fill: "rgba(182, 0, 42, 0.3)",
                      /* stroke: 'green', */
                      strokeWidth:0,
                      width: this.charWidth,
                      height: this.charHeight,
                      angle: 0
                    }),
                    "Auto",
                    MAKE(go.Panel, "Horizontal",{padding:5},
                      /* MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                          { margin: 0, width: 60, height: 60, background: "#FFF" },
                          new go.Binding("source","img")
                        )
                      ), */
                      MAKE(go.Panel, "Vertical",
                        MAKE(go.TextBlock, {margin: new go.Margin(10, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "key")),
                        MAKE(go.TextBlock, {margin: new go.Margin(0, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "cust_name")),
                      ),
                    ),
                  )
                )
              }
              if(this.mygoChartData[i].category == 'mainNode2'){
                mySelf.myDiagram.nodeTemplateMap.add("mainNode2",
                  MAKE(go.Node,new go.Binding("location", "loc", go.Point.parse),
                    MAKE(go.Shape, "RoundedRectangle", { fill: "rgba(35, 171, 245, 0.3)",
                      /* stroke: 'green', */
                      strokeWidth:0,
                      width: this.charWidth,
                      height: this.charHeight,
                      angle: 0
                    }),
                    "Auto",
                    MAKE(go.Panel, "Horizontal",{padding:5},
                      /* MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                          { margin: 0, width: 60, height: 60, background: "#FFF" },
                          new go.Binding("source","img")
                        )
                      ), */
                      MAKE(go.Panel, "Vertical",
                        MAKE(go.TextBlock, {margin: new go.Margin(10, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "key")),
                        MAKE(go.TextBlock, {margin: new go.Margin(0, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "cust_name")),

                      ),
                    ),
                  )
                )
              }
              if(this.mygoChartData[i].category == 'mainNode3'){
                mySelf.myDiagram.nodeTemplateMap.add("mainNode3",
                  MAKE(go.Node,new go.Binding("location", "loc", go.Point.parse),
                    MAKE(go.Shape, "RoundedRectangle", { fill: "rgba(204, 204, 204, 1)",
                      /* stroke: 'green', */
                      strokeWidth:0,
                      width: this.charWidth,
                      height: this.charHeight,
                      angle: 0
                    }),
                    "Auto",
                    MAKE(go.Panel, "Horizontal",{padding:5},
                      /* MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                          { margin: 0, width: 60, height: 60, background: "#FFF" },
                          new go.Binding("source","img")
                        )
                      ), */
                      MAKE(go.Panel, "Vertical",
                        MAKE(go.TextBlock, {margin: new go.Margin(10, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "key")),
                        MAKE(go.TextBlock, {margin: new go.Margin(0, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "cust_name")),

                      ),
                    ),
                  )
                )
              }
              if(this.mygoChartData[i].category == 'mainNode4'){
                mySelf.myDiagram.nodeTemplateMap.add("mainNode4",
                  MAKE(go.Node,new go.Binding("location", "loc", go.Point.parse),
                    MAKE(go.Shape, "RoundedRectangle", { fill: "rgba(112, 182, 3, 0.3)",
                      /* stroke: 'green', */
                      strokeWidth:0,
                      width: this.charWidth,
                      height: this.charHeight,
                      angle: 0
                    }),
                    "Auto",
                    MAKE(go.Panel, "Horizontal",{padding:5},
                      /* MAKE(go.Panel, "Vertical",
                        MAKE(go.Picture,
                          { margin: 0, width: 60, height: 60, background: "#FFF" },
                          new go.Binding("source","img")
                        )
                      ), */
                      MAKE(go.Panel, "Vertical",
                        MAKE(go.TextBlock, {margin: new go.Margin(10, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "key")),
                        MAKE(go.TextBlock, {margin: new go.Margin(0, 0, 0, 15), stroke: "#4f5256", font: "bold 14px sans-serif",},new go.Binding("text", "cust_name")),

                      ),
                    ),
                  )
                )
              }
            }
            mySelf.myDiagram.linkTemplate = MAKE(go.Link,
            { routing: go.Link.Orthogonal, corner: 0 },
            MAKE(go.Shape, { strokeWidth: 3, stroke: "#ccc" }),

            );

              }else{
                this.$message({
                  message: response.message,
                  type: 'warning'
                });
              }
            });






      }else{
        this.$message({
          message: response.message,
          type: 'warning'
        });
      }
      console.log("group_no ===== " + this.group_no);
    });

    let init_req = {
      servicecode: "us0604",
      cust_no: this.group_no
    }


/*     let windowHeight = parseInt(window.innerHeight);
    let windowWidth = parseInt(window.innerWidth);
    console.log(windowHeight);
    console.log(windowWidth);
    this.goTree.height = windowHeight + 'px';
    this.goTree.width = (windowWidth - 200) + 'px'; */
  }
}
</script>
<style lang="css" scoped>
  .goTree {
    width: 100%;
    height: 300px;
  }
</style>
