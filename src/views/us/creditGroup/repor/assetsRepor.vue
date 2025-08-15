<template>
  <div>
    <el-row>
      <el-form :model="searchForm" ref="searchForm" label-width="100px" :inline="true" class="custom-common--form"
               style="margin: 0;padding: 0;">
        <el-form-item class="upload-item" label="年份"
                      prop="years"
                      :rules="{
                      required: true, message: '年份不能为空', trigger: 'blur'
        }">
          <el-date-picker
            v-model="searchForm.years"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('searchForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="7">
        <h2 style="text-align: center">资产</h2>
        <el-table
          :data="assetsTableData"
          border style="width: 100%"
          :span-method="arraySpanMethod">
          <el-table-column
            prop="alias_name"
            label="类别"
          >
          </el-table-column>

          <el-table-column
            prop="end_value"
            label="金额">
          </el-table-column>

          <el-table-column
            prop="money_percent"
            label="占比">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="说明">
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="7">
        <h2 style="text-align: center">负债</h2>
        <el-table
          :data="debtTableData"
          border style="width: 100%"
          :span-method="arraySpanMethod">
          <el-table-column
            prop="alias_name"
            label="类别"
          >
          </el-table-column>

          <el-table-column
            prop="end_value"
            label="金额">
          </el-table-column>

          <el-table-column
            prop="money_percent"
            label="占比">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="说明">
          </el-table-column>

        </el-table>
      </el-col>
      <el-col :span="10">
        <h2 style="text-align: center">资产占比</h2>
        <ve-ring
          class="ring"
          :data="chartData"
          width="500px"
          height="500px"
          :settings="chartSettings"
          :extend="chartExtend"
        ></ve-ring>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
import VeRing from 'v-charts/lib/ring.common';

export default {
  components: {
    VeRing
  },
  name: "assetsRepor",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    this.chartExtend = {
      legend: {
        orient: 'vertical',
        left: 'left'
      },  //隐藏legend
      series: {
        center: ['50%', '50%']
      }
    };
    return {
      searchForm: {
        years: ''
      },
      assetsTableData: [],
      debtTableData: [],
      netAssets: "", //净资产
      totalAssets: "", // 资产合计
      totalDebt: "", // 负债合计
      cust_no: "",
      chartExtend: {
        legend: {
          show: false
        }
      },
      chartSettings: {
        radius: ['60px', '80px'],
        label: {
          position: 'outside',
          formatter: params => {
            if (params.dataIndex === 0) {
              return `{a| ${params.name} ${params.percent}%}`
            } else {
              return `{b| ${params.name} ${params.percent}%}`
            }
          },
          rich: {
            a: {
              color: '#438de7'
            },
            b: {
              color: '#7b7d86'
            }
          }
        }
      },
      chartData: {
        "columns": ["alias_name", "end_value"],
        "rows": []
      }
    }
  },
  created() {
    this.cust_no = this.cParentParams.cust_no;
  },
  methods: {
    // 查询
    submit(formName) {
      let is_valid = "";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          is_valid = valid;
        } else {
          is_valid = valid
          return false;
        }
      });
      if (!is_valid) {
        return false;
      }
      let that = this;
      let params = {
        servicecode: "us0937",
        cust_no: that.cust_no,
        rpt_type: "01",
        rpt_perd_type: "Y",
        years: that.searchForm.years
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.assetsTableData.splice(0, that.assetsTableData.length);
            that.debtTableData.splice(0, that.assetsTableData.length);
            that.chartData.rows.splice(0,that.chartData.rows.length);
              res.data.forEach(function (temp) {
                if (temp.bal_sheet_type === "1") {
                  that.assetsTableData.push(temp);
                }
                if (temp.bal_sheet_type === "0") {
                  that.debtTableData.push(temp);
                }
              });
            if (that.assetsTableData.length > that.debtTableData.length) {
              let num = that.assetsTableData.length - that.debtTableData.length;
              for (var i = 1; i <= num; i++) {
                let obj = {
                  alias_name: "",
                  end_value: "",
                  money_percent: "",
                  remark: "",
                };
                that.debtTableData.splice(-1, 0, obj);
              }
            }
            if (that.debtTableData.length > that.assetsTableData.length) {
              let num = that.assetsTableData.length - that.assetsTableData.length;
              for (var i = 1; i <= num; i++) {
                let obj = {
                  alias_name: "",
                  end_value: "",
                  money_percent: "",
                  remark: "",
                };
                that.assetsTableData.splice(-1, 0, obj);
              }
            }
            // 拼接数据
            that.getRingData(that.assetsTableData);
          }
        })
        .catch((err) => {
          console.error(err);
          MyMessage({
            message: res.message,
            type: "error",
          });
        });
    },
    /**
     * 末行单元格合并方法
     * @param row
     * @param column
     * @param rowIndex
     * @param columnIndex
     * @returns {number[]}
     */
    arraySpanMethod({row, column, rowIndex, columnIndex}) {
      if (rowIndex === this.assetsTableData.length - 1) {
        if (columnIndex !== 0 && columnIndex !== 1) {
          return [0, 0];
        }
        if (columnIndex === 1) {
          return [1, 3];
        }
      }
    },
    /**
     * 拼装环图数据
     * @param assetsTableData
     */
    getRingData(assetsTableData) {
      let that = this;
      assetsTableData.forEach(function (temp) {
        if (temp.item_code !== "ZC000000001109" && temp.item_code !== "ZC000000001108") {
          let obj = {
            alias_name: temp.alias_name,
            end_value: temp.end_value
          }
          that.chartData.rows.push(obj);
        }
      })
    }
  }
};
</script>

