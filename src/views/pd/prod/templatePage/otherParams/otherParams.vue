<template>
  <div>
    <el-button type="primary" @click="onSubmit" class="formSubmit">
      保存
    </el-button>
    <el-table :data="attTableData" border max-height="250">
      <el-table-column
        prop="attribute"
        :label="$i18ns('属性')"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.attribute"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="longname"
        label="中文名"
        show-overflow-tooltip
        width="230px"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.longname"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="text_type"
        show-overflow-tooltip
        label="文本类型"
        width
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.text_type"
            :placeholder="请选择"
            @change="textTypeChange(scope.row)"
          >
            <el-option
              v-for="item in textTypeList"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="select_data"
        label="选项值"
        show-overflow-tooltip
        width="95px"
      >
        <template slot-scope="scope">
          <el-button
            @click="optionValueOperation(scope.row)"
            :disabled="scope.row.text_type === 'string' || scope.row.text_type === ''|| scope.row.text_type === 'datePicker'"
          >
            操作
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="default_value"
        label="默认值"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.default_value"
            v-if="scope.row.text_type === 'string' || scope.row.text_type === ''||scope.row.text_type === 'dynamicSelect'"
          ></el-input>
          <el-select
            v-if="scope.row.text_type === 'select' || scope.row.text_type === 'switch' || scope.row.text_type === 'linkageSelect'"
            v-model="scope.row.default_value"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, sort_no) in scope.row.select_data"
              :key="sort_no"
              :label="item.display_field"
              :value="item.value_field"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="scope.row.text_type === 'datePicker'"
            v-model="scope.row.default_value"
            type="date"
            format="yyyyMMdd"
            value-format="yyyyMMdd"
            placeholder="选择日期">
          </el-date-picker>
<!--          <el-time-picker-->
<!--            v-if="scope.row.text_type === 'timePicker'"-->
<!--            v-model="scope.row.default_value"-->
<!--            value-format="HH:mm:ss"-->
<!--            :placeholder="$t('common.placeholderSelect')"-->
<!--          ></el-time-picker>-->
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="配置描述"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.description"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip width="50px">
        <template slot="header">
          <i class="el-icon-circle-plus-outline" @click.stop="addAttTableData()"></i>
        </template>
        <template slot-scope="scope">
          <i
            class="el-icon-remove-outline"
            @click.stop="delAttTableData(scope.$index)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 下拉框的属性添加 -->
    <el-dialog
      :title="propertiesTitle"
      :close-on-click-modal="false"
      :visible.sync="selecDataPropertiesDialog"
      custom-class="dialog-medium"
      :append-to-body="true"
    >
      <el-table :data="selPropTableData" border>
        <el-table-column prop="value_field" :label="fieldLable1" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.value_field"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="display_field" :label="fieldLable2" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.display_field"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip width="50px">
          <template slot="header">
            <i class="el-icon-circle-plus-outline" @click.stop="AddSelPropTableData()"></i>
          </template>
          <template slot-scope="scope">
            <i
              class="el-icon-remove-outline"
              @click.stop="delSelPropTableData(scope.$index)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="selectDataOperationSave">
          保存
        </el-button>
        <el-button @click="selecDataPropertiesDialog = false">
          取消
        </el-button>
      </div>
    </el-dialog>

    <!-- 联动下拉框属性添加 -->
    <el-dialog
      :title="propertiesTitle"
      :close-on-click-modal="false"
      :visible.sync="linkageSelectPropertiesDialog"
      custom-class="dialog-medium"
      :append-to-body="true"
    >
      <el-table :data="liSeTableData" border>
        <el-table-column
          prop="value_field"
          :label="$t('customNodeManage.attribute')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.value_field"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="display_field"
          :label="$t('customNodeManage.longname')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.display_field"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="linkageField"
          :label="$t('customNodeManage.linkageField')"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.linkageField"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip width="50px">
          <template slot="header">
            <i class="el-icon-circle-plus-outline" @click.stop="addLiSeTableData()"></i>
          </template>
          <template slot-scope="scope">
            <i
              class="el-icon-remove-outline"
              @click.stop="delLiSeTableData(scope.$index)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button type="primary" @click="linkageSelectDataOperationSave">
          {{
            $t("common.save")
          }}
        </el-button>
        <el-button @click="linkageSelectPropertiesDialog = false">
          {{
            $t("common.cancel")
          }}
        </el-button>
      </div>
    </el-dialog>

    <Page :pageParams="pageParams" :submit="submit"></Page>
  </div>
</template>
<script>
import Page from "@/views/components/Page.vue";
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
// import { CustomNodeManage } from "@/services";

export default {
  components: {
    Page,
  },
  name: "otherParams",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      currentRow: [],
      pageParams: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [], //列表数据
      submitForm: {
        servicecode: "pd0384",
      },
      addOrEditDialog: true,
      attTableData: [],
      oldAttTableData: [],
      rulesSubmitForm: {
        nodeName: [
          {
            required: true,
            message:
              this.$t("customNodeManage.nodeName") +
              this.$t("common.cannotEmpty"),
            trigger: "blur",
          },
          {
            max: 6,
            message:
              this.$t("customNodeManage.nodeName") +
              this.$t("common.rulesLength6"),
            trigger: "blur",
          },
        ],
        nodeDescription: [
          {
            max: 256,
            message:
              this.$t("customNodeManage.nodeDescription") +
              this.$t("common.rulesLength256"),
            trigger: "blur",
          },
        ],
        nodeImplName: [
          {
            required: true,
            message:
              this.$t("customNodeManage.nodeImplClassName") +
              this.$t("common.cannotEmpty"),
            trigger: "blur",
          },
          {
            max: 50,
            message:
              this.$t("customNodeManage.nodeImplClassName") +
              this.$t("common.rulesLength50"),
            trigger: "blur",
          },
        ],
      },
      isUpdata: false,
      customNodeDetailDialog: false,
      detailTableData: [],
      textTypeList: [],
      selectDataButFlag: true,
      selPropTableData: [],
      liSeTableData: [],
      selecDataPropertiesDialog: false,
      linkageSelectPropertiesDialog: false,
      switchPropertiesDialog: false,
      switchTableData: [],
      isUpdate: true,
      propertiesTitle: "选择属性",
      fieldLable1: "属性",
      fieldLable2: "中文名",
      showDirectionOption: false,
      directionOption: [
        {label: "kongzhi", value: "kongzhi"},
        {label: "baowenjieya", value: "baowenjieya"},
        {label: "qianming", value: "qianming"},
        {label: "rizhi2", value: "rizhi2"},
        {label: "waidiao", value: "waidiao"},
        {label: "token", value: "token"},
        {label: "chushihua", value: "chushihua"},
        {label: "shiduan", value: "shiduan"},
        {label: "shezhi2", value: "shezhi2"},
        {label: "jianquan", value: "jianquan"},
        {label: "jiajiemi", value: "jiajiemi"},
        {label: "zhuanhuan", value: "zhuanhuan"},
        {label: "luyou", value: "luyou"},
        {label: "tongjiguolv", value: "tongjiguolv"},
        {label: "guolv", value: "guolv"},
        {label: "mingdan", value: "mingdan"},
        {label: "bingfakongzhi", value: "bingfakongzhi"},
        {label: "xianliu", value: "xianliu"},
        {label: "huiduluyou", value: "huiduluyou"},
        {label: "tuomin", value: "tuomin"},
        {label: "juhe", value: "juhe"},
      ],
      developerImg: "",
    };
  },
  created() {
    //文本类型下拉字典
    this.getDictList("PD_E_TEXT_TYPE", "textTypeList");
    console.log("这里", this.textTypeList);
    this.initTable();
  },
  watch: {
    oldAttTableData: {
      handler(newVal) {
        console.log(newVal)
      },
      deep: true
    }
  },
  methods: {
    changeSelection(item) {
      this.submitForm.nodeIcon = item.value;
      this.showDirectionOption = false;
    },
    //新增
    addCustomNode() {
      this.submitForm = {
        nodeName: "",
        nodeImplName: "",
        nodeDescription: "",
        nodeIcon: "juhe",
      };
      this.queryTextTypeList();
      this.addOrEditDialog = true;
      this.isUpdate = false;
      this.attTableData = [];
      this.dialogTitle = this.$t("customNodeManage.addCustomNode");
    },
    //编辑弹框+号
    addAttTableData() {
      this.attTableData.push({
        attribute: "",
        longname: "",
        default_value: "",
        description: "",
        text_type: "",
        select_data: [],
        id: this.attTableData.length,
        sort_no: this.attTableData.length,
      });
    },
    //编辑弹框-号
    delAttTableData(sort_no) {
      this.attTableData.splice(sort_no, 1);
    },
    //下拉选择的属性+号
    AddSelPropTableData() {
      this.selPropTableData.push({
        value_field: "",
        display_field: "",
        id: this.selPropTableData.length,
        sort_no: this.selPropTableData.length,
      });
    },
    //下拉选择的属性-号
    delSelPropTableData(sort_no) {
      this.selPropTableData.splice(sort_no, 1);
    },
    //联动选择的属性+号
    addLiSeTableData() {
      this.liSeTableData.push({
        value_field: "",
        display_field: "",
        linkageField: "",
        id: this.liSeTableData.length,
        sort_no: this.liSeTableData.length,
      });
    },
    //联动选择的属性-号
    delLiSeTableData(sort_no) {
      this.liSeTableData.splice(sort_no, 1);
    },
    submit(data) {
      this.pageParams.pageNumber = data.pageNumber;
      this.pageParams.pageSize = data.pageSize;
      this.initTable();
    },
    //查询自定义组件列表
    queryCustomNodeList() {
      // CustomNodeManage.queryCustomNodeList({
      //     pageNumber: 1,
      //     pageSize: this.pageParams.pageSize,
      // }).then((response) => {
      //     this.tableData = response.data.data;
      //     this.pageParams.total = response.data.total;
      //     this.pageParams.pageNumber = response.data.pageParam.pageNumber;
      //     this.pageParams.pageSize = response.data.pageParam.pageSize;
      // });
    },
    //保存
    onSubmit() {
      let that = this;
      if (!that.isUpdate) {
        let params = {};
        let innerList = that.attTableData;
        innerList.forEach((item, index) => {
          item.select_data = JSON.stringify(item.select_data);
        });
        params.list = innerList;
        params.servicecode = 'pd0384';
        params.sale_prod_cd = that.cParentParams.sale_prod_cd;
        params.prod_version = that.cParentParams.prod_version;
        params.busi_seq = that.cParentParams.busi_seq;
        params.apply_type = that.cParentParams.apply_type;
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            //存储当前表格数据
            // console.log(that.oldAttTableData)
            // that.oldAttTableData = that.attTableData;
            MyMessage({
              message: res.message,
              type: 'success'
            });
          }
        }).catch(err => {
          console.error(err);
        });
      } else {
        let params = {};
        let innerList = that.attTableData;
        innerList.forEach((item, index) => {
          item.select_data = JSON.stringify(item.select_data);
        });
        params.list = innerList;
        params.servicecode = 'pd0384';
        params.sale_prod_cd = that.cParentParams.sale_prod_cd;
        params.prod_version = that.cParentParams.prod_version;
        params.busi_seq = that.cParentParams.busi_seq;
        params.apply_type = that.cParentParams.apply_type;
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            that.initTable();
            //存储当前表格数据
            // that.oldAttTableData = that.attTableData;
            MyMessage({
              message: res.message,
              type: 'success'
            });
          }
        }).catch(err => {
          console.error(err);
        });
      }
    },
    //查看
    // seeProperties(val) {
    //   this.customNodeDetailDialog = true;
    //   var jsonObj = JSON.parse(val);
    //   this.detailTableData = [];
    //   for (var i = 0; i < jsonObj.length; i++) {
    //     this.detailTableData[i] = jsonObj[i];
    //   }
    // },
    // //编辑
    // editCustomNode(row) {
    //   this.queryTextTypeList();
    //   this.submitForm.nodeName = row.nodeName;
    //   this.submitForm.nodeImplName = row.nodeImplName;
    //   this.submitForm.nodeDescription = row.nodeDescription;
    //   this.submitForm.id = row.id;
    //   var jsonObj = JSON.parse(row.customProperties);
    //
    //   var tableData = [];
    //   for (var i = 0; i < jsonObj.length; i++) {
    //     tableData[i] = jsonObj[i];
    //   }
    //   this.attTableData = tableData;
    //   this.oldAttTableData = JSON.parse(row.customProperties);
    //   this.dialogTitle = this.$t("customNodeManage.editCustomNode");
    //   this.oldSubmitForm = {...this.submitForm};
    //   this.isUpdate = true;
    //   this.addOrEditDialog = true;
    // },
    // 删除
    // deleteCustomNode(rowId) {
    //   this.$confirm(this.$t("common.reminder"), this.$t("common.tip"), {
    //     confirmButtonText: this.$t("common.confirm"),
    //     cancelButtonText: this.$t("common.cancel"),
    //     type: "warning",
    //   }).then(() => {
    //     // CustomNodeManage.deleteCustomNode({ id: rowId }).then(
    //     //     (response) => {
    //     //         if (response.code === "200") {
    //     //             this.queryCustomNodeList();
    //     //             this.$message({
    //     //                 showClose: true,
    //     //                 message: response.message,
    //     //                 type: "success",
    //     //             });
    //     //         } else {
    //     //             this.$message({
    //     //                 showClose: true,
    //     //                 message: response.message,
    //     //                 type: "error",
    //     //             });
    //     //         }
    //     //     },
    //     //     (response) => {
    //     //         this.$message({
    //     //             showClose: true,
    //     //             message: this.$t("sys.error"),
    //     //             type: "error",
    //     //         });
    //     //     }
    //     // );
    //   });
    // },
    //下拉框选项值操作
    optionValueOperation(row) {
      let that = this;
      this.currentRow = row;
      if (row.text_type === "select" || row.text_type === "dynamicSelect") {
        this.selecDataPropertiesDialog = true;
        if (row.text_type === "select") {
          // this.propertiesTitle = this.$t(
          //   "customNodeManage.selecDataProperties"
          // );
          // this.fieldLable1 = this.$t("customNodeManage.attribute");
          // this.fieldLable2 = this.$t("customNodeManage.longname");
          that.selPropTableData = row.select_data;
          console.log("内部", that.selPropTableData);
          // that.selPropTableData = row.select_data;
        } else {
          // this.propertiesTitle = this.$t(
          //   "customNodeManage.addParameter"
          // );
          // this.fieldLable1 = this.$t("customNodeManage.parameter");
          // this.fieldLable2 = this.$t(
          //   "customNodeManage.parametervalue"
          // );
        }
        if (
          row.select_data.length !== 0 &&
          row.select_data[0].keyValue === undefined
        ) {
          this.selPropTableData = row.select_data;
        } else {
          this.selPropTableData = [];
        }
      } else if (row.text_type === "switch") {
        this.switchPropertiesDialog = true;
        if (row.select_data.length !== 0 && row.select_data[0].keyValue) {
          this.switchTableData = row.select_data;
        } else {
          this.switchTableData = [
            {
              switchValue: false,
              keyValue: true,
              value_field: "",
              display_field: "",
            },
            {
              switchValue: true,
              keyValue: false,
              value_field: "",
              display_field: "",
            },
          ];
        }
      } else if (row.text_type === "linkageSelect") {
        this.linkageSelectPropertiesDialog = true;
        this.propertiesTitle = this.$t(
          "customNodeManage.linkageSelectProperties"
        );
        console.log(row.select_data);
        if (row.select_data.length !== 0) {
          this.liSeTableData = row.select_data;
        } else {
          this.liSeTableData = [];
        }
      }
    },
    //文本类型变化
    textTypeChange(row) {
      console.log(this.oldTest)
      // console.log("没有进",this.oldAttTableData);
      // console.log("row数据·1",row);
      // if (this.isUpdate && row.sort_no < this.oldAttTableData.length) {
      //   if (row.text_type !== this.oldAttTableData[row.sort_no].text_type) {
      //     console.log("进来",this.oldAttTableData);
      //     row.default_value = "";
      //     console.log("输出",row.default_value);
      //     row.select_data = [];
      //   } else {
      //     row.default_value =
      //       this.oldAttTableData[row.sort_no].default_value;
      //     row.select_data = this.oldAttTableData[row.sort_no].select_data;
      //   }
      // }
    },
    //下拉框选项值操作保存
    selectDataOperationSave() {
      this.currentRow.select_data = this.selPropTableData;
      this.currentRow.default_value = "";
      this.attTableData.splice(this.currentRow.sort_no, 1, this.currentRow);
      this.selPropTableData = [];
      this.selecDataPropertiesDialog = false;
    },
    //开关选项值操作保存
    switchOperationSave() {
      this.currentRow.select_data = this.switchTableData;
      this.currentRow.default_value = "";
      this.attTableData.splice(this.currentRow.sort_no, 1, this.currentRow);
      this.switchPropertiesDialog = false;
    },
    //联动下拉框选项值操作保存
    linkageSelectDataOperationSave() {
      this.currentRow.select_data = this.liSeTableData;
      this.currentRow.default_value = "";
      this.attTableData.splice(this.currentRow.sort_no, 1, this.currentRow);
      this.liSeTableData = [];
      this.linkageSelectPropertiesDialog = false;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 初始化表格
     */
    initTable() {
      let that = this;
      let params = {
        sale_prod_cd: that.cParentParams.sale_prod_cd,
        prod_version: that.cParentParams.prod_version,
        apply_type: that.cParentParams.apply_type,
        start: that.pageParams.start,
        length: that.pageParams.length,
        servicecode: 'pd0383'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.attTableData = res.data;
          that.attTableData.forEach((item, index) => {
            item.select_data = JSON.parse(item.select_data.replace('\"', '"'));
          });
          //分页插件记录总数
          that.pageParams.total = res.pageParam.total
          //存储当前表格数据
          that.oldAttTableData = res.data;
          that.oldTest = res.data;
          console.log("yuanbi表格数据", that.oldAttTableData);
        }
      }).catch(err => {
        console.error(err);
      });
    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table__body-wrapper {
  height: 46vh !important;
  overflow-y: scroll;
}

/deep/ .el-dialog.dialog-large .el-dialog__body {
  overflow-y: visible;
  height: 75vh !important;

  .el-table__body-wrapper {
    height: 46vh !important;
    overflow-y: scroll;
  }
}

i {
  font-size: 16px;
}

/deep/ .el-dialog.dialog-medium .el-dialog__body {
  overflow-y: visible;
  height: 50vh !important;

  .el-table__body-wrapper {
    height: 42vh !important;
    overflow-y: scroll;
  }
}

.el-date-editor.el-input {
  width: 100%;
}

/deep/ .developerImg {
  text-align: center;
  margin-top: 6px;

  i {
    font-size: 60px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 24px;
  }
}

.el-popover {
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 444px;

    li {
      font-size: 40px;
      width: 50px;
      text-align: center;
      margin: 12px;
      line-height: 50px;
    }
  }
}

.formSubmit {
  padding: 7px 10px 7px 10px;
  margin: 7px 10px 7px 10px;
}
</style>
