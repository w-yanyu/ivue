<template>
  <div class="page_content" ref="page_content">
    <table border="1" class="horizontal_info">
      <tr>
        <td class="width12">{{$i18ns('报表行业类型')}}</td>
        <td class="width12">{{ indu_type }}</td>
        <td class="width12">{{$i18ns('报表类型')}}</td>
        <td class="width12">{{ rpt_type }}</td>
        <td class="width12">{{$i18ns('报表名称')}}</td>
        <td class="width12">{{ tplt_name }}</td>
      </tr>
    </table>

    <div class="button-bar" v-if="tableData.length !== 0">
      <el-button
        type="success"
        @click="upRow(tableRadio)"
        icon="el-icon-top"
      ></el-button>
      <el-button
        type="success"
        @click="downRow(tableRadio)"
        icon="el-icon-bottom"
      ></el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 95%"
      max-height="550"
      :row-style="isSelect"
    >
      <el-table-column :label="$i18ns('选择')" width="55" align="center">
        <template slot-scope="scope">
          <el-radio v-model="tableRadio" :label="scope.$index"
            ><i></i
          ></el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" :label="$i18ns('序号')"> </el-table-column>

      <!-- <el-table-column prop="sort_no" label="排序号" width="60">
          <template slot-scope="scope">
            <el-input
              class="table_content_input"
              v-model="scope.row.sort_no"
              :precision="0"
            ></el-input>
          </template>
        </el-table-column> -->

      <el-table-column prop="name" :label="$i18ns('科目名称')">
        <template slot-scope="scope">
          <div class="input-div">
            <el-input
              class="table_content_input"
              v-model="scope.row.item_alias"
              readonly
              disabed
            >
            </el-input>
            <el-input
              class="table_content_input margin-left3"
              v-model="scope.row.item_code"
              readonly
              disabed
            >
            </el-input>
            <el-button
              class="table_content_columnNum_btn margin-left3"
              type="success"
              icon="el-icon-search"
              plain
              @click.native.prevent="lookupBtn(scope.$index)"
            ></el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="bal_sheet_type" :label="$i18ns('科目类型')" width="170">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.bal_sheet_type"
            :placeholder="$i18ns('请选择')"
            class="table_content_input"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column prop="form_ula" :label="$i18ns('公式')">
        <template slot-scope="scope">
          <el-input class="table_content_input" v-model="scope.row.form_ula">
          </el-input>
        </template>
      </el-table-column>

      <el-table-column prop="turn_old_form_ula" :label="$i18ns('新模板转旧模板公式')">
        <template slot-scope="scope">
          <el-input
            class="table_content_input"
            v-model="scope.row.turn_old_form_ula"
          >
          </el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$i18ns('操作')" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            class="del_btn"
            type="danger"
            icon="el-icon-delete"
            plain
            @click.native.prevent="delItem(scope.$index)"
            >{{ $i18ns("删除") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button
      class="submit"
      type="success"
      plain
      @click.native.prevent="addTableItem"
      >{{$i18ns('新增报表栏目')}}</el-button
    >
    <div class="evaluation_formula">
      <div class="left">
        <p>{{$i18ns('报表验评公式')}}</p>
        <p>eg:(a=b;c+d=e+f)</p>
      </div>
      <div class="right">
        <el-input
          class="evaluation_formula_textarea"
          type="textarea"
          min-height="100"
          :autosize="{ minRows: 2, maxRows: 4 }"
          :placeholder="$i18ns('请输入内容')"
          v-model="textarea2"
          resize="none"
          @blur="evaluationFormulaInput($event)"
        >
        </el-input>
      </div>
    </div>

    <div>
      <el-button
        class="submit"
        type="primary"
        plain
        @click.native.prevent="saveData"
        >{{ $i18ns("保存") }}</el-button
      >
      <el-button
        class="submit"
        type="warning"
        plain
        @click.native.prevent="back"
        >{{ $i18ns("返回") }}</el-button
      >
    </div>

    <el-dialog
      title="科目选择"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true"
    >
      <!-- <to-json :params="params" :toUrl="lookUpUrl" @jsonCallBack="jsonCallBack"></to-json> -->
      <Lookup
        ref="Lookup"
        @closeDialog="closeDialog"
        :cParentParams="cParentParams"
      ></Lookup>
    </el-dialog>
  </div>
</template>
<script>
//财务报表模板定义
import MyMessage from "pte-ui/utils/MyMessage";
import i18n from "pte-ui/i18ns"; // 国际化
import Lookup from "./financialStatementsCustomizationLookUp.vue";
export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  components: {
    Lookup
  },
  data() {
    return {
      params: "",
      lookUpUrl:
        "/views/us/usManager/financialStatementsCustomManagement/financialStatementsCustomization_lookup.json",
      indu_type: "", //财务报表行业
      rpt_type: "", //报表模板
      tplt_na: "", //报表名称
      tableData: [],
      options: [
        {
          value: "0",
          label: "负债和所有者权益类"
        },
        {
          value: "1",
          label: "资产类"
        }
      ],
      tableRadio: -1, //选中行数据
      value: [],
      channelOptions: [],
      statusOptions: [],
      channelNameOptions: [],
      isBtnDisabel: true,
      dialogVisible: false,
      cooperationData: [], //合作方列表数据
      cooperationSelectionTemp: null, //选择了的合作列表暂存
      cooperationSelection: null, //选择了的合作列表

      hoverIndex: -1, // 菜单hover索引
      activeLinkId: 0, // 当前激活的菜单id
      tempIndex: "", //选择的项目
      textarea2: "",//报表验评公式
    };
  },
  mounted() {
    let that = this;
    console.log("cParentParams", this.cParentParams);
    that.indu_type = that.induTypeFormat(that.cParentParams);
    that.rpt_type = that.rptTypeFormat(that.cParentParams);
    that.tplt_name = that.cParentParams.tplt_name;
    that.initData();
  },
  methods: {
    initData() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "us0920";
      request_map["tplt_id"] = that.cParentParams.tplt_id;
      request_map["indu_type"] = that.cParentParams.indu_type;
      request_map["rpt_type"] = that.cParentParams.rpt_type;
      this.$http.invokeAPI(request_url, "post", request_map).then(response => {
        console.log("cooperationSelect", response);
        if (response.code === "200") {
          console.log("请求回调的表格数据", response.data);
          that.tableData = response.data.list01;
          that.textarea2=response.data.par_form_ula;
          that.tableData = that.tableData.sort(
            that.compareObjectByProp("sort_no", "desc")
          );
        } else {
          MyMessage({
            message: response.message,
            type: "error"
          });
        }
      });
    },
    // 报表行业类型
    induTypeFormat(data) {
      switch (data.indu_type) {
        case "00":
          return this.$i18ns('标准财务报表');
        case "01":
          return this.$i18ns('公共事业单位类');
        case "07":
          return this.$i18ns('融惠通财务报表');
      }
    },
    //报表类型
    rptTypeFormat(data) {
      switch (data.rpt_type) {
        case "01":
          return this.$i18ns('资产负债表');
        case "02":
          return this.$i18ns('损益表');
        case "03":
          return this.$i18ns('现金流量表');
        case "04":
          return this.$i18ns('收入支出表');
        case "09":
          return this.$i18ns('他财务报表');
      }
    },
    //json模板回调的方法，例如打开一个表单模板，点击表单的确定按钮，点击后的回调事件
    jsonCallBack(data) {
      let that = this;
      // that.dialogVisible = false;
      console.log(data, "json模板回调回来的数据");
    },
    lookupBtn(index) {
      let that = this;
      that.dialogVisible = true;
      console.log("index", index);
      that.tempIndex = index;
    },
    closeDialog(item) {
      let that = this;
      that.dialogVisible = false;
      let isHad = false;
      for (let i in that.tableData) {
        if (that.tableData[i].item_code === item.item_code) {
          isHad = true;
          MyMessage({
            message: `已经存在科目编号${item.item_code},请核实!`,
            type: "error"
          });
        }
      }

      if (item && !isHad) {
        that.$nextTick(() => {
          that.tableData[that.tempIndex].item_alias = item.item_name;
          that.tableData[that.tempIndex].item_code = item.item_code;
        });
      }
    },
    back() {
      this.$dialog.close();
    },
    //提交保存
    saveData() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "us0921";
      request_map["tplt_id"] = that.cParentParams.tplt_id;
      request_map["list01"] = that.tableData;
      request_map["par_form_ula"] = that.textarea2;
      this.$http.invokeAPI(request_url, "post", request_map).then(response => {
        console.log("cooperationSelect", response);
        if (response.code === "200") {
          console.log(response.data);
          // that.tableData = response.data;
          MyMessage({
            message: "修改成功",
            type: "succes"
          });
          this.$dialog.close();
        } else {
          MyMessage({
            message: response.message,
            type: "error"
          });
        }
      });
    },
    //新增报表行
    addTableItem() {
      let that = this;
      let idNo = that.tableData.length - 1;
      let sort_no = that.tableData.length + 1;
      that.tableData.push({
        id: idNo,
        sort_no: sort_no,
        item_code: "",
        item_alias: "",
        bal_sheet_type: "",
        form_ula: "",
        turn_old_form_ula: "",
        tplt_id: that.cParentParams.tplt_id
      });
    },
    //删除行
    delItem(index) {
      let that = this;
      that.tableData.splice(index, 1);
      // this.$set(this.tempList[index], 0, item)
    },
    //验评公式输入
    evaluationFormulaInput(event) {
      let that = this;
      console.log(event);
      let value = event.target.value;
      let valueArry = value.split("=");
    },
    //快速排序函数
    compareObjectByProp(prop1, prop2) {
      return function compareObject(obj1, obj2) {
        //取出第一列的值。
        let code1 = obj1[prop1];
        let code2 = obj2[prop1];
        //根据属性值的类型，可能需要进行一下相应的判断。
        //如果数字的话，就转换成数字，进行数字之间的比较。 如果是数字的话，要两个都是数字。 一个数字，另外一个是字符串，那么数字只是数字型的字符串，类型并不是数字。
        if (!isNaN(Number(code1)) && !isNaN(Number(code2))) {
          code1 = Number(code1);
          code2 = Number(code2);
        }
        //取出第二列的值。
        let code3 = obj1[prop2];
        let code4 = obj2[prop2];
        //根据属性值的类型，可能需要进行一下相应的判断。
        //如果数字的话，就转换成数字，进行数字之间的比较。 如果是数字的话，要两个都是数字。 一个数字，另外一个是字符串，那么数字只是数字型的字符串，类型并不是数字。
        if (!isNaN(Number(code3)) && !isNaN(Number(code4))) {
          code3 = Number(code3);
          code4 = Number(code4);
        }
        if (code1 < code2) {
          //升序和降序 写在方法里面，当然，也可以通过参数传入进来。
          return -1;
        } else if (code1 > code2) {
          return 1;
        } else {
          //return code3-code4;
          return code4 - code3;
        }
      };
    },
    // 上移行数据
    upRow(index) {
      if (index == -1 || index === 0) return;
      let temp = this.tableData[index - 1].sort_no;
      this.tableData[index - 1].sort_no = this.tableData[index].sort_no;
      this.tableData[index].sort_no = temp;
      this.$set(
        this.tableData,
        index,
        [
          this.tableData[index - 1],
          (this.tableData[index - 1] = this.tableData[index])
        ][0]
      );

      this.tableRadio = this.tableRadio - 1;
    },
    // 下移行数据
    downRow(index) {
      if (index == -1 || index === this.tableData.length - 1) return;
      let temp = this.tableData[index + 1].sort_no;
      this.tableData[index + 1].sort_no = this.tableData[index].sort_no;
      this.tableData[index].sort_no = temp;
      this.$set(
        this.tableData,
        index,
        [
          this.tableData[index + 1],
          (this.tableData[index + 1] = this.tableData[index])
        ][0]
      );
      this.tableRadio = this.tableRadio + 1;
    },
    //b
    isSelect({ row, rowIndex }) {
      console.log("isSelect", row, rowIndex);
      if (this.tableRadio === rowIndex)
        return {
          "background-color": "#b4d1f8",
          color: "#fff"
        };
    }
  }
};
</script>
<style lang="less" scoped>
.page_content {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: "hidden";
}
.horizontal_info {
  margin-top: 20px;
  width: 95%;
  text-align: center;
  margin-bottom: 20px;
}

.evaluation_formula {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin-top: 20px;
}

.evaluation_formula .left {
  flex: 2;
  border: 1px solid #777b80;
  height: 80px;
  text-align: center;
}

.evaluation_formula .right {
  flex: 8;
  border: 1px solid #777b80;
  height: 80px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.evaluation_formula_textarea {
  width: 98%;
}

.submit {
  margin-top: 20px;
}
.width12 {
  width: 12.5%;
  height: 36px;
}
.input-div {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.button-bar {
  width: 94%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
.margin-left3 {
  margin-left: 3px;
}
.table-content {
  height: 60%;
  width: 96%;
  position: relative;
  overflow: hidden;
}
/deep/ .table_content_input .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
</style>
