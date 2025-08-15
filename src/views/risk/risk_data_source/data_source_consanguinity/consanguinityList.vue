<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-26 14:16:13
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-12 14:22:31
 * @FilePath: /ivue/src/views/risk/risk_data_source/data_source_consanguinity/consanguinityList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container-content">
    <div class="container-content--search">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="150px"
        class="custom-common--form"
      >
        <el-row>
          <!-- <el-col :span="7">
            <el-form-item label="血缘关系类型" prop="kinship_type">
              <el-select
                v-model="ruleForm.kinship_type"
                placeholder="请选择血缘关系类型"
              >
                <el-option
                  v-for="(item, index) in kinshipTypeList"
                  :key="index"
                  :label="item.dictId + '-' + item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="被调用对象类型" prop="called_object_type">
              <el-select
                v-model="ruleForm.called_object_type"
                placeholder="请选择调用对象类型"
                :disabled="true"
              >
                <el-option
                  v-for="(item, index) in objectTypeList"
                  :key="index"
                  :label="item.dictId + '-' + item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被调用对象代码" prop="called_object_code">
              <!-- <el-input v-model="ruleForm.called_object_code"></el-input> -->
              <el-select
                v-model="ruleForm.called_object_code"
                placeholder="请选择被调用对象代码"
                clearable
              >
                <el-option
                  v-for="(item, index) in calledObjectList"
                  :key="index"
                  :label="item.data_source_code"
                  :value="item.data_source_code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被调用对象名称" prop="called_object_name">
              <!-- <el-input v-model="ruleForm.called_object_name"></el-input> -->
              <el-select
                v-model="ruleForm.called_object_name"
                placeholder="请选择被调用对象名称"
                clearable
              >
                <el-option
                  v-for="(item, index) in calledObjectList"
                  :key="index"
                  :label="item.data_source_name"
                  :value="item.data_source_name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="button-footer">
          <el-col :span="6" :offset="18">
            <el-button type="primary" @click="searchTeller">查询</el-button>
            <el-button type="primary" @click="searchTeller">{{
              $i18ns("重置")
            }}</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="container-content--toolbar">
      <el-button type="primary" @click="changeEchart()" plain
        >图表样式</el-button
      >
    </div>
    <div class="container-centent--table">
      <el-table
        :data="checkList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="unity_logo_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="序号" type="index" width="55">
        </el-table-column>
        <el-table-column label="血缘关系类型" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                <!-- {{ scope.row.kinship_type }} -->
                {{formatDictData(scope.row.kinship_type,kinshipTypeList)}}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="调用对象类型" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                <!-- {{ scope.row.call_object_type }} -->
                {{formatDictData(scope.row.call_object_type,objectTypeList)}}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="调用对象代码" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                {{ scope.row.call_object_code }}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="调用对象名称" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                {{ scope.row.call_object_name }}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="被调用对象类型" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                {{ scope.row.called_object_type }}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="被调用对象代码" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                {{ scope.row.called_object_code }}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="被调用对象名称" width="200">
          <template slot-scope="scope">
            <span>
              <font>
                {{ scope.row.called_object_name }}
              </font>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
          min-width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click.stop="handleLook(scope.row)"
              >查看</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click.stop="handleLookObject(scope.row)"
            >
              调用对象详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="container-content--pagination">
      <el-pagination
        v-if="checkList.length > 0"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="tableSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal"
      >
      </el-pagination>
    </div>

    <!-- 血缘关系树  start -->
    <el-dialog
      title="图表样式"
      :visible.sync="chartShow"
      width="70%"
      height="70%"
      class="echart_dialog"
      :close-on-click-modal="false"
    >
      <div class="box" ref="box">
        <comEchart
          :option="option"
          :divObj="divObj"
          style="width: 100%; height: 100%"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartShow = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 血缘关系树  end -->
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import comEchart from "../../components/echartBase";
import { formatDictData } from "@/util/commondeal.js";

export default {
  name: "consanguinityList",
  components: {
    comEchart
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  data() {
    return {
      jumpParams:{},
      divObj: null,
      currentPage: 1,
      ruleForm: {
        kinship_type: "",
        called_object_type: "DATA_SOURCE",
        called_object_code: "",
        called_object_name: ""
      },
      checkList: [],
      chartShow: false,
      treeData: {},
      option: {},
      kinshipTypeList: [],
      objectTypeList: [],
      calledObjectList: [],
    };
  },
  created() {
    this.getDictList("DECI_E_KINSHIP_TYPE", "kinshipTypeList");
    this.getDictList("DECI_E_CALL_OBJECT_TYPE", "objectTypeList")
    this.searchTeller();
    this.getCalledObject();
  },
  watch: {
    jumpParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        return newVal
      }
    }
  },
  mounted() {
    this.divObj = this.$refs.box;
  },
  methods: {
    formatDictData,
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getCalledObject() {
      let params = {
        data_source_code: "",
        data_source_name: "",
        data_source_status: "",
        data_source_type: "",
        length: 10,
        regist_status: "",
        servicecode: "deci050013",
        start: 1,
        start_status: "",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.calledObjectList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 查询列表
     */
    searchTeller() {
      let reqMap = {
        // kinship_type: this.ruleForm.kinship_type,s
        called_object_type: this.ruleForm.called_object_type,
        called_object_code: this.ruleForm.called_object_code,
        called_object_name: this.ruleForm.called_object_name,
        // kinship_type: "3",
        // called_object_type: "DATA_SOURCE",
        // called_object_code: "数据源zx",
        // called_object_name: "zx中文名",
        servicecode: "deci050067"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            this.checkList = res.data.field_map[0].checkList;
            this.treeData = {
              name: "血缘关系",
              children: this.tarverse(this.checkList)
            }
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 处理图表树数据
     */
    tarverse(arr) {
      arr.map(i => {
        i.name = i.call_object_name;
        i.value = i.call_object_code;

        if(i.children && i.children.length) {
          this.tarverse(i.children)
        }
      })
      return arr;
    },
    /**
     * 分页sizeChange 回调
     */
    sizeChange(val) {
      this.tableSize = val;
      this.searchTeller();
    },
    /**
     * 分页currentChange回调
     */
    currentChange(val) {
      this.currentPage = val;
      this.searchTeller();
    },
    /**
     * 查看
     */
    handleLook(row) {
      this.$dialog.open({
        that: this,
        title: "详情",
        toRequest: {
          url:
            "/views/risk/risk_data_source/data_source_consanguinity/consanguinity_view.json",
          method: "get",
          params: { ...row }
        },
        width: "50%",
        height: "30%"
      });
    },
    /**
     * 调用对象详情
     */
    handleLookObject(row) {
      let toUrl = "/views/risk/risk_fact/risk_facts_view.json";
      let init_req = {};
      // row.call_object_type = 'FACT';
      // row.call_object_code = 'acct.balance';

      if(row.call_object_type === 'FACT'){ // 事实属性 deci010111 事实管理查询
        toUrl = "/views/risk/risk_fact/attribute/risk_attribute_view.json";  
        let tempStr = row.call_object_code.split(".");
        init_req = {
          servicecode: 'deci010111',
          fact_code: tempStr[0],
          field_code: tempStr[1],
        }
        this.getDetailsData(init_req,toUrl);

      }else if(row.call_object_type === 'VARIABLES'){ // 变量  deci050066
        toUrl = "@variableListAdd";
        init_req = {
          servicecode: 'deci050066',
          variable_code: row.call_object_code,
        }
        this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'RULES'){ //规则  deci010634
        toUrl = "/views/risk/risk_decision_rule/risk_decision_rule_view.json";
        init_req = {
          servicecode: 'deci010634',
          rule_code: row.call_object_code
        }
       this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'RULESET'){ //规则集  deci010635
        toUrl = "/views/risk/risk_decision_rule/group/risk_decision_rule_group_view_look.json";
        init_req = {
          servicecode: 'deci010635',
          group_code: row.call_object_code
        }
        this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'DECISION_TREE'){ //决策树  deci040215
        toUrl = "/views/risk/rule_tree/root_rule_tree_view.json";
        init_req = {
          servicecode: 'deci040215',
          tree_code: row.call_object_code
        }
        this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'DECISION_TABLE'){ //决策表  deci020404
        toUrl = "/views/risk/risk_decision_tables/risk_decision_tables_edit_table_view.json";
        init_req = {
          servicecode: 'deci020404',
          deci_tables_code: row.call_object_code
        }
        this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'DECISION_FLOW'){ //决策流 deci010726
        toUrl = "/views/risk/rule_flow/rule_flow_edit.json";
        init_req = {
          servicecode: 'deci010726',
          flow_code: row.call_object_code
        }
         this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'GRADING_CARD'){ //简单评分卡   deci020128
        toUrl = "@riskScoreCardModelView";
        init_req = {
          servicecode: 'deci020128',
          score_card_code: row.call_object_code
        }
       this.getDetailsData(init_req,toUrl);
      }else if(row.call_object_type === 'COMPLEX_GRADING_CARD'){ //复杂评分卡  deci020128
        toUrl = "@simpleScoreCardTableView";
        init_req = {
          servicecode: 'deci020128',
          score_card_code: row.call_object_code
        }
       this.getDetailsData(init_req,toUrl);
      }
      
    },
    getDetailsData(init_req, toUrl){
      this.$http.invokeAPI("/SUMP/call/RPCCall", "post", init_req).then(response => {
        this.jumpParams= response.data;
        if(this.jumpParams) {
        this.$dialog.open({
          that: this,
          title: "调用对象详情",
          toRequest: {
            url:toUrl,
            method: "get",
            params: this.jumpParams
          },
          width: "80%",
          height: "50%"
        });
      }
      }).catch(err => {
      });
    },
    /**
     * 切换图表样式
     */
    changeEchart() {
      this.chartShow = true;
      this.option = {
        tooltip: {
          // 提示框浮层设置
          trigger: "item",
          triggerOn: "mousemove", // 提示框触发条件
          enterable: true, // 鼠标是否可进入提示框浮层中，默认false
          confine: true, // 是否将tooltip框限制在图表的区域内
          formatter: function(params) {
            // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            // console.log('params:', params)
            return (
              params.marker +
              params.name +
              "<br/>" +
              "$ " +
              (params.value || "--")
            );
          },
          // valueFormatter: function (value) { // tooltip 中数值显示部分的格式化回调函数
          //   return '$' + value.toFixed(2)
          // },
          backgroundColor: "#FFF", // 提示框浮层的背景颜色
          borderColor: "#1890FF", // 提示框浮层的边框颜色
          borderWidth: 1, // 提示框浮层的边框宽
          borderRadius: 8, // 提示框浮层圆角
          padding: [6, 8], // 提示框浮层的内边距
          textStyle: {
            // 提示框浮层的文本样式
            color: "#333", // 文字颜色
            fontWeight: 400, // 字体粗细
            fontSize: 16, // 字体大小
            lineHeight: 20, // 行高
            width: 60, // 文本显示宽度
            // 文字超出宽度是否截断或者换行；只有配置width时有效
            overflow: "breakAll", // truncate截断，并在末尾显示ellipsis配置的文本，默认为...;break换行;breakAll换行，并强制单词内换行
            ellipsis: "..."
          },
          extraCssText:
            "box-shadow: 0 0 9px rgba(0, 0, 0, 0.3);text-align: right;" // 额外添加到浮层的css样式
        },
        series: [
          {
            type: "tree",
            data: [this.treeData],
            name: "树图",
            top: "1%", // 组件离容器上侧的距离，像素值20，或相对容器的百分比20%
            left: "7%", // 组件离容器左侧的距离
            bottom: "1%", // 组件离容器下侧的距离
            right: "20%", // 组件离容器右侧的距离
            layout: "orthogonal", // 树图的布局，正交orthogonal和径向radial两种
            orient: "LR", // 树图中正交布局的方向，'LR','RL','TB','BT'，只有布局是正交时才生效
            edgeShape: "curve", // 树图边的形状，有曲线curve和折线polyline两种，只有正交布局下生效
            roam: false, // 是否开启鼠标缩放或平移，默认false
            initialTreeDepth: 2, // 树图初始的展开层级（深度），根节点是0，不设置时全部展开
            // symbol: 'arrow', // 标记的图形，默认是emptyCircle;circle,rect,roundRect,triangle,diamond,pin,arrow,none
            // symbolRotate: 270, // 配合arrow图形使用效果较好
            symbolSize: 16, // 大于0时是圆圈，等于0时不展示，标记的大小
            itemStyle: {
              // 树图中每个节点的样式
              color: "#1890FF", // 节点未展开时的填充色
              borderColor: "rgba(255, 144, 0, 1)", // 图形的描边颜色
              borderWidth: 1, // 描边线宽，为0时无描边
              borderType: "dotted", // 描边类型
              borderCap: "square", // 指定线段末端的绘制方式butt方形结束，round圆形结束，square
              shadowColor: "rgba(0,121,221,0.3)", // 阴影颜色
              shadowBlur: 16, // 图形阴影的模糊大小
              opacity: 1 // 图形透明度
            },
            label: {
              // 每个节点对应的文本标签样式
              show: true, // 是否显示标签
              distance: 8, // 文本距离图形元素的距离
              position: "left", // 标签位置
              verticalAlign: "middle", // 文字垂直对齐方式，默认自动，top，middle，bottom
              align: "center", // 文字水平对齐方式，默认自动，left，right，center
              fontSize: 16, // 字体大小
              color: "#333", // 字体颜色
              backgroundColor: "#F0F5FA", // 文字块的背景颜色
              borderColor: "#1890FF", // 文字块边框颜色
              borderWidth: 1, // 文字块边框宽度
              borderType: "solid", // 文字块边框描边类型 solid dashed dotted
              borderRadius: 4, // 文字块的圆角
              padding: [6, 12], // 文字块内边距
              shadowColor: "rgba(0,121,221,0.3)", // 文字块的背景阴影颜色
              shadowBlur: 6, // 文字块的背景阴影长度
              width: 100,
              // 文字超出宽度是否截断或者换行；只有配置width时有效
              overflow: "truncate", // truncate截断，并在末尾显示ellipsis配置的文本，默认为...;break换行;breakAll换行，并强制单词内换行
              ellipsis: "..."
            },
            lineStyle: {
              // 树图边的样式
              color: "rgba(0,0,0,.35)", // 树图边的颜色
              width: 2, // 树图边的宽度
              curveness: 0.5, // 树图边的曲度
              shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影颜色
              shadowBlur: 10 // 图形阴影的模糊大小
            },
            emphasis: {
              // 树图中图形和标签高亮的样式
              disabled: false, // 是否关闭高亮状态，默认false
              // 在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果
              focus: "self", // none不淡出其他图形（默认）；self只聚焦当前高亮的数据图形；series聚焦当前高亮的数据所在系列的所有图形；ancestor聚焦所有祖先节点；descendant聚焦所有子孙节点；relative聚焦所有子孙和祖先节点
              blurScope: "coordinateSystem", // 开启focus时，配置淡出的范围，coordinateSystem淡出范围为坐标系（默认）；series淡出范围为系列；global淡出范围为全局
              itemStyle: {
                // 该节点的样式
                color: "#1890FF", // 图形的颜色
                // borderColor: 'rgba(255, 144, 0, 1)', // 图形的描边颜色
                borderWidth: 1, // 描边线宽，为0时无描边
                borderType: "solid", // 描边类型 solid dashed dotted
                borderCap: "square", // 指定线段末端的绘制方式butt方形结束，round圆形结束，square
                shadowColor: "rgba(0,121,221,0.3)", // 阴影颜色
                shadowBlur: 12, // 图形阴影的模糊大小
                opacity: 1 // 图形透明度
              },
              lineStyle: {
                // 树图边的样式
                color: "rgba(0,0,0,.45)", // 树图边的颜色
                width: 2, // 树图边的宽度
                curveness: 0.5, // 树图边的曲度
                shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影颜色
                shadowBlur: 6 // 图形阴影的模糊大小
              },
              label: {
                // 高亮标签的文本样式
                color: "#333",
                fontWeight: 600
              }
            },
            blur: {
              // 淡出状态的相关配置，开启emphasis.focus后有效
              itemStyle: {}, // 节点的样式
              lineStyle: {}, // 树图边的样式
              label: {} // 淡出标签的文本样式
            },
            leaves: {
              // 叶子节点的特殊配置
              label: {
                // 叶子节点的文本标签样式
                distance: 8,
                // color: '#1890FF',
                position: "right",
                verticalAlign: "middle",
                align: "left"
              },
              itemStyle: {}, // 叶子节点的样式
              emphasis: {}, // 叶子节点高亮状态的配置
              blur: {}, // 叶子节点淡出状态的配置
              select: {} // 叶子节点选中状态的配置
            },
            animation: true, // 是否开启动画
            expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
            animationDuration: 550, // 初始动画的时长
            animationEasing: "linear", // 初始动画的缓动效果
            animationDelay: 0, // 初始动画的延迟
            animationDurationUpdate: 750, // 数据更新动画的时长
            animationEasingUpdate: "cubicInOut", // 数据更新动画的缓动效果
            animationDelayUpdate: 0 // 数据更新动画的延迟
          }
        ]
      };
    }
  }
};
</script>

<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }
  .container-content--toolbar {
    padding: 16px 40px 0 12px;
  }
  .container-content--pagination {
    float: right;
    padding: 10px;
  }
  .container-centent--table {
    margin-top: 10px;
  }
}
.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
.el-dialog-dev {
  max-height: 60vh;
  overflow: auto;
}

.areaStrategy-basic,
.areaStrategy-detail {
  padding: 16px 20px 0 0px;
}
.areaStrategy-detail {
  .el-form {
    padding: 0;
  }
  /deep/.el-collapse {
    .el-collapse-item__content {
      padding: 20px 80px 20px 20px;
    }
  }
}
.attachmentTab {
  min-height: 68.667px;
}

.businessRow {
  padding: 0px 0px 0 30px;
}

.echart_dialog {
  /deep/ .el-dialog {
    height: 70%;
    .el-dialog__body {
      height: 80%;
    }
  }
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
