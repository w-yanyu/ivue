<template>
  <div style="margin-left: -19px">
    <el-row :gutter="1" class="el-row">


      <el-col :span="12">
        <div class="card-div">
          <div class="card-div-text">{{ $i18ns('联系信息') }} </div>
        </div>
        <el-card class="box-card3">
          <template>
            <div style="margin-left: -20px;height:100%;width:100%;overflow:auto">
              <el-table :data="tableDataPhone" :border="true" :resizable="true" @row-dblclick="dbSelected">
                <el-table-column prop="relation_cust_name" label="联系人姓名" align="center">
                </el-table-column>
                <el-table-column prop="relationship" label="联系人关系" align="center" :formatter="formatRELATIONSHIPData">
                </el-table-column>
                <el-table-column prop="phone_type" label="电话类型" align="center" :formatter="formatPHONETYPEData">
                </el-table-column>
                <el-table-column prop="phone_no" label="电话号码" align="center">
                </el-table-column>
                <el-table-column prop="is_valid" label="是否有效" align="center" :formatter="formatIsValidData">
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="{ row }">
                    <el-button type="primary" icon="el-icon-phone" @click="handleCall(row)">拨打</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="container-content--pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.start" :page-sizes="[5, 10, 15, 20, 25, 30]" :page-size="page.length"
                layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount" style="margin: 0 10px">
              </el-pagination>
            </div>
          </template>
        </el-card>
      </el-col>

      <el-col :span="12">
        <div class="card-div">
          <div class="card-div-text">{{ $i18ns('催记面板') }}</div>
        </div>
        <el-card class="box-card3">
          <template>
            <to-json v-if="flag" :params="params" :toUrl="url4" @jsonCallBack="(val) => jsonCallBack(val)"></to-json>
          </template>
        </el-card>
      </el-col>


      <el-col :span="12">
        <div class="card-div">
          <div class="card-div-text">{{ $i18ns('电话面板') }}</div>
        </div>
        <el-card class="box-card2">
          <template>
            <to-json v-if="flag" :params="params" :toUrl="url6" @jsonCallBack="(val) => jsonCallBack(val)"></to-json>
          </template>
        </el-card>
      </el-col>


      <el-col :span="12">
        <div class="card-div">
          <div class="card-div-text">{{ $i18ns('话术指导') }}</div>
        </div>
        <el-card class="box-card2">
          <template>
            <to-json :params="params" :toUrl="url3" @jsonCallBack="jsonCallBack"></to-json>
          </template>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { i18ns } from 'pte-ui/utils/i18n'
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "index",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      flag: true,
      /*    url1: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/debtInfo/debtInfo_management.json", // 逾期欠款
          url2: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/collMark/collMark_management.json", // 催收标识*/
      url3: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/skillGuide/skillGuide_management.json", // 话术指导
      url4: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/control/control_management.json", // 催记面板
      url5: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/contact/contact_allInfo.json", // 联系信息
      url6: "/views/cs/collManage/tcManage/collWorkbench/mainMenu/telephone/telephone_management.json", // 电话面板
      tableDataPhone: [],
      page: {
        totalCount: 0,
        length: 5,
        start: 1
      },
      params: {
        case_id: "",
        case_no: "",
        cust_id: "",
        org_id: "",
        oa_org_id: "",
        queue_code: "",
        phone_no: ""
      },
    }
  },
  created() {
    this.params.case_id = this.cParentParams.case_id;
    this.params.case_no = this.cParentParams.case_no;
    this.params.cust_id = this.cParentParams.cust_id;
    this.params.org_id = this.cParentParams.org_id;
    this.params.oa_org_id = this.cParentParams.oa_org_id;
    this.params.queue_code = this.cParentParams.queue_code;
    this.getDictList("CS_E_YESORNO", "IsValidDict");  //是否有效字典
    this.getDictList("CS_E_RELATIONSHIP", "RELATIONSHIPDict");  //联系人关系字典
    this.getDictList("CS_E_PHONE_TYPE", "PHONETYPEDict");  //联系人关系字典

    this.searchTeller();

  },
  methods: {
    i18ns,
    switchTab(tab) {
      this.activeTab = tab;
    },
    handleCall(row) {
      // 在这里可以添加处理拨打操作的逻辑
      // 调用 dbSelected 方法，也可以在这里处理其他逻辑
      this.dbSelected(row);
      // 添加其他拨打操作的逻辑
    },
    dbSelected(row) {
      this.params.phone_no = row.phone_no;
      this.params.relation_cust_name = row.relation_cust_name;
      this.params.relationship = row.relationship;
      this.flag = false
      this.$nextTick(() => {
        this.flag = true
      })
    },

    handleSizeChange(val) {
      let that = this;
      that.page.length = val;
      this.searchTeller();
    },
    handleCurrentChange(val) {
      let that = this;
      that.page.start = val;
      this.searchTeller();
    },

    /**
  * 查询列表
  */
    searchTeller() {
      let reqMap = {
        case_id: this.cParentParams.case_id,
        case_no: this.cParentParams.case_no,
        cust_id: this.cParentParams.cust_id,
        org_id: this.cParentParams.org_id,
        oa_org_id: this.cParentParams.oa_org_id,
        queue_code: this.cParentParams.queue_code,
        start: this.page.start,
        length: this.page.length,
        servicecode: "cb0107",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          this.tableDataPhone = res.data;
          this.page.totalCount = res.pageParam ? res.pageParam.total : 0;

        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        console.error(err);
      });
    },

    /**getDictList
* 获取数据字典列表
*/
    getDictList(dictType, listkey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listkey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },

    /**
 * 转化枚举类型
 */
    formatIsValidData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.IsValidDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
 * 转化枚举类型
 */
    formatRELATIONSHIPData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.RELATIONSHIPDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
* 转化枚举类型
*/
    formatPHONETYPEData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.PHONETYPEDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
  }
}
</script>

<style scoped>
/*  .box-card1{
    width: 100%;
    margin: 12px;
    height:220px;
  }*/
.box-card2 {
  width: 100%;
  margin: 1px;
  height: 220px;
}

.container-content--pagination {
  float: right;
  padding: 10px;
}

.box-card3 {
  width: 100%;
  margin: 1px;
  height: 450px;
}

.card-div {
  background: #F0F2F5;
  width: 100%;
  height: 40px;
  margin-left: 11px;
  margin-bottom: -10px;
}

.card-div-text {
  margin-left: 5px;
  padding-top: 5px;
}
</style>
