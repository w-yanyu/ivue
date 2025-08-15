<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('贷款担保情况调查')}}</th>
        </tr>
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('一、基本情况及基本担保方式（抵押）核保情况')}}</th>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('采用的担保方式')}}</td>
          <td class="table-right">
            <div style="width: 100%">
              <ol>
                <li>
                  <el-row>
                    <el-col :span="6">
                      <input
                        type="checkbox"
                        disabled
                        name="guarantee_way"
                        v-model="page.guarantee_way"
                        value="1"
                      />{{$i18ns('抵押')}}
                    </el-col>
                    <el-col :span="6">
                      <input
                        type="checkbox"
                        disabled
                        name="guarantee_way"
                        v-model="page.guarantee_way"
                        value="2"
                      />{{$i18ns('质押')}}
                    </el-col>
                    <el-col :span="6">
                      <input
                        type="checkbox"
                        disabled
                        name="guarantee_way"
                        v-model="page.guarantee_way"
                        value="3"
                      />{{$i18ns('保证')}}
                    </el-col>
                    <el-col :span="6">
                      <input
                        type="checkbox"
                        disabled
                        name="guarantee_way"
                        v-model="page.guarantee_way"
                        value="4"
                      />{{$i18ns('信用')}}
                    </el-col>
                  </el-row>
                </li>
                <li>
                  <el-row>
                    <el-col :span="8">
                      {{$i18ns('复合担保:')}}
                      <input
                        type="checkbox"
                        disabled
                        name="is_compound_guarantee"
                        v-model="page.is_compound_guarantee"
                        value="1"
                      />{{$i18ns('是')}}
                      <input
                        type="checkbox"
                        disabled
                        name="is_compound_guarantee"
                        v-model="page.is_compound_guarantee"
                        value="0"
                      />{{$i18ns('否')}}
                    </el-col>
                    <el-col :span="16">
                      {{$i18ns('复合担保的具体方式为：')}}
                      <input
                        type="checkbox"
                        disabled
                        name="compound_gua_spec_way"
                        v-model="page.compound_gua_spec_way"
                        value="1"
                      />{{$i18ns('抵押')}}
                      <input
                        type="checkbox"
                        disabled
                        name="compound_gua_spec_way"
                        v-model="page.compound_gua_spec_way"
                        value="2"
                      />{{$i18ns('质押')}}
                      <input
                        type="checkbox"
                        disabled
                        name="compound_gua_spec_way"
                        v-model="page.compound_gua_spec_way"
                        value="3"
                      />{{$i18ns('保证')}}
                      <input
                        type="checkbox"
                        disabled
                        name="compound_gua_spec_way"
                        v-model="page.compound_gua_spec_way"
                        value="4"
                      />{{$i18ns('信用')}}
                    </el-col>
                  </el-row>
                </li>
                <li>
                  <el-row>
                    <el-col :span="8">
                      {{$i18ns('部分担保:')}}
                      <input
                        type="checkbox"
                        disabled
                        name="is_part_guarantee"
                        v-model="page.is_part_guarantee"
                        value="1"
                      />{{$i18ns('是')}}
                      <input
                        type="checkbox"
                        disabled
                        name="is_part_guarantee"
                        v-model="page.is_part_guarantee"
                        value="0"
                      />{{$i18ns('否')}}
                    </el-col>
                    <el-col :span="16">
                      {{$i18ns('部分担保的具体方式为：')}}
                      <input
                        type="checkbox"
                        disabled
                        name="part_guar_spec_way"
                        v-model="page.part_guar_spec_way"
                        value="1"
                      />{{$i18ns('抵押')}}
                      <input
                        type="checkbox"
                        disabled
                        name="part_guar_spec_way"
                        v-model="page.part_guar_spec_way"
                        value="2"
                      />{{$i18ns('质押')}}
                      <input
                        type="checkbox"
                        disabled
                        name="part_guar_spec_way"
                        v-model="page.part_guar_spec_way"
                        value="3"
                      />{{$i18ns('保证')}}
                      <input
                        type="checkbox"
                        disabled
                        name="part_guar_spec_way"
                        v-model="page.part_guar_spec_way"
                        value="4"
                      />{{$i18ns('信用')}}
                    </el-col>
                  </el-row>
                </li>
              </ol>
            </div>
          </td>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('抵[质]押物核实情况')}}</td>
          <td class="table-right">
            <div style="width: 100%">
              <ol>
                <li>
                  <input
                    type="checkbox"
                    disabled
                    name="is_double_check_pled"
                    v-model="page.is_double_check_pled"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_double_check_pled"
                    v-model="page.is_double_check_pled"
                    value="0"
                  />{{$i18ns('否')}} &nbsp;{{$i18ns('双人上门核实抵押物')}}
                </li>
                <li>
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_script"
                    v-model="page.is_check_pled_script"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_script"
                    v-model="page.is_check_pled_script"
                    value="0"
                  />{{$i18ns('否')}} &nbsp;{{$i18ns('核实抵（质）押物权证原件')}}
                </li>
                <li>
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_uncontested"
                    v-model="page.is_check_pled_uncontested"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_uncontested"
                    v-model="page.is_check_pled_uncontested"
                    value="0"
                  />{{$i18ns('否')}} &nbsp;{{$i18ns('确认抵（质）押物权属清晰无争议')}}
                </li>
              </ol>
            </div>
          </td>
        </tr>
        <tr v-for="(item, index) in guarDataList" :key="index">
          <td class="table-left">{{$i18ns('抵押')}}{{ index + 1 }}</td>
          <td class="table-right">
            <div style="width: 100%">
              <ol>
                <li>{{$i18ns('1、本抵押物地址：')}}{{ item.pledge_address }}</li>
                <li>
                  {{$i18ns('2、抵押物所有权是否属于借款人及其配偶：')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_pled_borrower"
                    v-model="item.is_pled_borrower"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_pled_borrower"
                    v-model="item.is_pled_borrower"
                    value="0"
                  />{{$i18ns('否')}}
                </li>
                <li>
                  {{$i18ns('3、个人名下抵押物类型：')}}
                  <input
                    type="checkbox"
                    disabled
                    name="personal_pled_type"
                    v-model="item.personal_pled_type"
                    value="1"
                  />{{$i18ns('住房')}}
                  <input
                    type="checkbox"
                    disabled
                    name="personal_pled_type"
                    v-model="item.personal_pled_type"
                    value="2"
                  />{{$i18ns('商用房')}}
                  <input
                    type="checkbox"
                    disabled
                    name="personal_pled_type"
                    v-model="item.personal_pled_type"
                    value="3"
                  />{{$i18ns('商住两用房')}}
                  <input
                    type="checkbox"
                    disabled
                    name="personal_pled_type"
                    v-model="item.personal_pled_type"
                    value="4"
                  />{{$i18ns('车辆')}}
                </li>
                <li>
                  {{$i18ns('4、经核实，抵押物情况与评估报告是否一致：')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_situ"
                    v-model="item.is_check_pled_situ"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_check_pled_situ"
                    v-model="item.is_check_pled_situ"
                    value="0"
                  />{{$i18ns('否')}}
                </li>
                <li>
                  {{$i18ns('5、是否有其他情况')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_other_situation"
                    v-model="item.is_other_situation"
                    value="1"
                  />{{$i18ns('是')}}
                  <input
                    type="checkbox"
                    disabled
                    name="is_other_situation"
                    v-model="item.is_other_situation"
                    value="0"
                  />{{$i18ns('否')}}
                  {{$i18ns('◆有其他情况的（例如已出租的，出租的用途等），进行说明：')}}
                  <br/>
                  {{ item.other_situation_explain }}
                </li>
              </ol>
            </div>
          </td>
        </tr>
      </table>
      <el-row class="table_report2">
        <el-col :span="3" class="border_div">{{$i18ns('是否有承租人声明')}}</el-col>
        <el-col :span="4" class="border_div">
          <input
            type="checkbox"
            disabled
            name="is_lessee_declare"
            v-model="page.is_lessee_declare"
            value="1"
          />{{$i18ns('是')}}
          <input
            type="checkbox"
            disabled
            name="is_lessee_declare"
            v-model="page.is_lessee_declare"
            value="0"
          />{{$i18ns('否')}}
        </el-col>
        <el-col :span="4" class="border_div">{{$i18ns('是否落实第二居所')}}</el-col>
        <el-col :span="4" class="border_div">
          <input
            type="checkbox"
            disabled
            name="is_workable_second_abode"
            v-model="page.is_workable_second_abode"
            value="1"
          />{{$i18ns('是')}}
          <input
            type="checkbox"
            disabled
            name="is_workable_second_abode"
            v-model="page.is_workable_second_abode"
            value="0"
          />{{$i18ns('否')}}
        </el-col>
        <el-col :span="5" class="border_div">{{$i18ns('第二居所是否属于抵押人家庭自有')}}</el-col>
        <el-col :span="4" class="border_div">
          <input
            type="checkbox"
            disabled
            name="is_second_abode_pledge_home"
            v-model="page.is_second_abode_pledge_home"
            value="1"
          />{{$i18ns('是')}}
          <input
            type="checkbox"
            disabled
            name="is_second_abode_pledge_home"
            v-model="page.is_second_abode_pledge_home"
            value="0"
          />{{$i18ns('否')}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbBasicAndGuarReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号
      guarDataList: [],
      page: {
        is_compound_guarantee: [], //是否复合担保
        compound_gua_spec_way: [], //复合担保的具体方式
        is_part_guarantee: [], //是否部分担保
        part_guar_spec_way: [], //部分担保的具体方式
        guarantee_way: [], //采用的担保方式
        is_double_check_pled: [], //是否双人上门核实抵押物
        is_check_pled_script: [], //是否核实抵（质）押物权证原件
        is_check_pled_uncontested: [], //是否确认抵（质）押物权属清晰无争议
        is_lessee_declare: [], //是否有承租人申明
        is_workable_second_abode: [], //是否落实第二居所
        is_second_abode_pledge_home: [], //第二居所是否属于抵押人家庭自有
      },
      pledTypeList: [], //个人名下抵押物类型列表
      yesOrNOList: [], //是否列表
    };
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getCustData();
    this.getGuarData();
    this.getDictList("AR_E_PERSONAL_PLEDGE_TYPE", "pledTypeList");
    this.getDictList("MS_E_YESORNO", "yesOrNOList");
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取当前客户数据
     */
    getCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar1714",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.page = res.data;
            that.checkboxDataTransform(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取当前客户数据
     */
    getGuarData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1804",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.guarDataList = res.data;
            // 转换行数据
            that.transformRowData(that.guarDataList);
            console.log("guarDataList", that.guarDataList);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 转换复选框中的数据
     * @param data
     */
    checkboxDataTransform(data) {
      this.page.is_compound_guarantee = data.is_compound_guarantee
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.compound_gua_spec_way = data.compound_gua_spec_way
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_part_guarantee = data.is_part_guarantee
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.part_guar_spec_way = data.part_guar_spec_way
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.guarantee_way = data.guarantee_way
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_double_check_pled = data.is_double_check_pled
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_check_pled_script = data.is_check_pled_script
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_check_pled_uncontested = data.is_check_pled_uncontested
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_lessee_declare = data.is_lessee_declare
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_workable_second_abode = data.is_workable_second_abode
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_second_abode_pledge_home =
        data.is_second_abode_pledge_home
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
    },
    /**
     * 转换列表数据中的属性
     * @param data
     */
    transformRowData(data) {
      data.forEach((item) => {
        console.log("item", item);
        item.is_pled_borrower = item.is_pled_borrower
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
        item.personal_pled_type = item.personal_pled_type
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
        item.is_check_pled_situ = item.is_check_pled_situ
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
        item.is_other_situation = item.is_other_situation
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
      });
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictLabel(listName, value) {
      let that = this;
      let tempValue = value;
      for (const item of that[listName]) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log(listKey, this[listKey]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>


<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   border-collapse: collapse;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;

  div:nth-child(1n + 0) {
    border-top: none;
  }
}

.table_report2 {
  width: 100%;
  height: auto;
  border-collapse: collapse;

  div:nth-child(1) {
    border-left: 1px solid #5e6d82;
    border-right: 0;
  }

  div:nth-child(2) {
    border-left: 1px solid #5e6d82;
  }
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}

.tr_header {
  height: 300px;
  border-top: 0 solid;
}

.tr_bottom {
  height: 0px;
  border: 0 solid;
}

.th_desc {
  text-align: left;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.border_div {
  height: 50px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-left: 0;
  border-top: 0;
  border-radius: 0;
  border-collapse: collapse;
  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

li {
  text-align: left;
}

.table-left {
  width: 20%;
  height: 100px;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;
  vertical-align: middle;
}

.table-right {
  width: 80%;
  height: 100px;
  border-collapse: collapse;
  vertical-align: middle;
  text-align: left;

  ol {
    margin: 0;
    padding: 20px;
  }
}
</style>
