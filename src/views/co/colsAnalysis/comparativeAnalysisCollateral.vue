<template>
  <div class="page_content">


    <div class="page_content_container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px">
        <el-row>
          <div class="page_content_title">{{$i18ns('押品价值信息比较分析')}}</div>
        </el-row>

        <el-row>
          <!-- 转化后 -->
          <el-table border class="page_content_up_table" :data="transUpData">
            <el-table-column v-for="(item, index) in transUpTitle" :label="item" :key="index" align="center">
              <template slot-scope="scope">
                {{scope.row[index]}}
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row>
          <div class="page_content_title">{{$i18ns('押品专项信息比较分析')}}</div>
        </el-row>

        <el-row>
          <!-- 转化后 -->
          <el-table border class="page_content_up_table" :data="transDownData">
            <el-table-column v-for="(item, index) in transDownTitle" :label="item" :key="index" align="center">
              <template slot-scope="scope">
                {{scope.row[index]}}
              </template>
            </el-table-column>
          </el-table>
        </el-row>

        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button size="small" @click="close">{{$i18ns('关闭')}}</el-button>
          </el-col>

        </el-row>


      </el-form>
    </div>

  </div>
</template>
<script>
  import MyMessage from 'pte-ui/utils/MyMessage'
  import MyAxios from "pte-ui/utils/MyAxios";
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    data() {
      return {

        colName:this.$i18ns("抵押品"),
        title: "同类押品比较分析",
        // originData 为后端原始正常的数据, 此数据按正常表格展示 一行一行的数据
        // 保证数组里每一个对象中的字段顺序, 从上到下 一次对应显示表格中的从左到右
        upData: [], //上面表格数据
        upTitle: [], // upTitle 该标题为 正常显示的标题, 数组中的顺序就是上面数据源对象中的字段标题对应的顺序
        transUpTitle: [], // transUpTitle 该标题为转化后的标题, 注意多一列,  因为原来的标题变成了竖着显示了, 所以多一列标题, 第一个为空即可
        transUpData: [],

        currencyList: [],//存放币种
        downData: [],
        downTitle: [],
        downTitleKey: [], // upTitle 该标题为 正常显示的标题, 数组中的顺序就是上面数据源对象中的字段标题对应的顺序
        transDownTitle: [], // transUpTitle 该标题为转化后的标题, 注意多一列,  因为原来的标题变成了竖着显示了, 所以多一列标题, 第一个为空即可
        transDownData: [],
        coltNoList: '', //接口入参，选择对比的列
        coltType: '', //接口入参，前页选择的押品类型
        servicecode: '', //下面表格的请求服务码




      }
    },
    mounted() {
      console.log('cMeta', this.cMeta);
      console.log('cParentParams', this.cParentParams);
      console.log("cParentMeta", this.cParentMeta);
      console.log("cParentScope", this.cParentScope);
      this.getParentParams();
      this.initUpData();
      this.postServicecode();
      this.getBranchLevel();

    },
    methods: {
      //获取币种列表
      getBranchLevel(){
        let params = {
          dict_type: "MS_CURRENCY",
          servicecode: "ct2205",
        }
        let that = this
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            that.currencyList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
      getParentParams() {
        let that = this;
        let selectedData = that.cParentParams.selectedData;
        for (let i in selectedData) {
          that.coltNoList += selectedData[i].colt_no + '#';
          that.coltType = selectedData[i].colt_type;
        }
        that.coltNoList = that.coltNoList.substring(0, that.coltNoList.length - 1)
        //操作类型，新增的时候0，查询历史的时候为3
        that.caozuolx = that.cParentParams.caozuolx
        if (that.caozuolx === "0") {
          that.coltNoList = that.cParentParams.colt_no_str;
          that.coltType = that.cParentParams.colt_type;
        }
      },
      initUpData() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "co2105";

        request_map["colt_no_list"] = that.coltNoList;
        request_map["colt_type"] = 'VALUEINFO';
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("对比---上---面表格请求回调", response);
          if (response.code === "200") {
            //   that.upData = response.data;
            //   let size = that.upData.length;
            //   that.transUpTitle = ['']
            //   for (let i = 0; i < size; i++) {
            //     that.transUpTitle.push("抵押品" + (i + 1))
            //   }
            //   console.log("transUpTitle", that.transUpTitle);
            //   that.formatUpData()
            //押品价值信息字段集合
            that.formatUpTitle(response.data.list02);
            that.formatResponseUpData(response.data.list01);
            let size = that.upData.length;
            that.transUpTitle = ['']
            for (let i = 0; i < size; i++) {
              that.transUpTitle.push(this.colName + (i + 1))
            }
            console.log("transUpTitle", that.transUpTitle);
            that.formatUpData()
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      formatUpData() {
        // 数组按矩阵思路, 变成转置矩阵
        let matrixData = this.upData.map((row) => {
          let arr = []
          for (let key in row) {
            arr.push(row[key])
          }
          return arr
        })
        console.log('matrixData', matrixData)
        // 加入标题拼接最终的数据
        this.transUpData = matrixData[0].map((col, i) => {
          return [this.upTitle[i], ...matrixData.map((row) => {
            return row[i]
          })]
        })
        console.log('完成规整上面对比数据', this.transUpData)
      },
      formatUpTitle(titleData) {
        let tempTitle = new Array(titleData.length);
        let tempTitleKey = new Array(titleData.length);
        for (let i in titleData) {
          tempTitle[titleData[i].sort_no - 1] = titleData[i].column_name;
          tempTitleKey[titleData[i].sort_no - 1] = titleData[i].column_value;
        }
        this.upTitle = tempTitle;
        this.upTitleKey = tempTitleKey;
        console.log('formatUpTitle--tempTitle', this.upTitle);
        console.log('formatUpTitle--downTitleKey', this.upTitleKey);
      },
      formatResponseUpData(upData) {
        let tempData = [];
        let tempTitleKey = this.upTitleKey;
        console.log('upData', upData);
        for (let i in upData) {
          let obj = {};
          tempTitleKey.forEach(function(ele, index, array) {
            obj[ele] = upData[i][ele]
          });
          console.log('obj' + i, obj);
          tempData.push(obj)
        }
        console.log('formatUpData', tempData);
        this.upData = tempData;
      },
      // formatUpData() {
      //   // 数组按矩阵思路, 变成转置矩阵
      //   let matrixData = this.upData.map((row) => {
      //     let arr = []
      //     for (let key in row) {
      //       arr.push(row[key])
      //     }
      //     return arr
      //   })
      //   console.log('matrixData', matrixData)
      //   // 加入标题拼接最终的数据
      //   this.transUpData = matrixData[0].map((col, i) => {
      //     return [this.upTitle[i], ...matrixData.map((row) => {
      //       return row[i]
      //     })]
      //   })
      //   console.log('完成规整上面对比数据', this.transUpData)
      // },
      postServicecode() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "co2102";
        request_map["colt_type"] = that.coltType;
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("请求服务码回调", response);
          if (response.code === "200") {
            that.servicecode = response.data.out_service_code;
            that.initDownData();
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },

      initDownData() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = that.servicecode;
        request_map["colt_no_list"] = that.coltNoList;
        request_map["colt_type"] = that.coltType;
        request_map["is_backup"] = that.caozuolx;
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("对比---下---面表格请求回调", response);
          if (response.code === "200") {
            that.formatDownTitle(response.data.list02);
            that.formatResponseDownData(response.data.list01);
            let size = that.downData.length;
            that.transDownTitle = ['']
            for (let i = 0; i < size; i++) {
              that.transDownTitle.push(this.colName + (i + 1))
            }
            console.log("transDownTitle", that.transDownTitle);
            that.formatDownData()
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      formatDownData() {
        // 数组按矩阵思路, 变成转置矩阵
        console.log('this.downData', this.downData);
        console.log('this.downData.length', this.downData.length);

        let matrixData = this.downData.map((row) => {
          let arr = []
          for (let key in row) {
            console.log('row[key]', key, row[key]);
            arr.push(row[key])

          }
          return arr
        })
        console.log('matrixData', matrixData)
        console.log('this.downTitle', this.downTitle)
        // 加入标题拼接最终的数据
        this.transDownData = matrixData[0].map((col, i) => {
          return [this.downTitle[i], ...matrixData.map((row) => {
            return row[i]
          })]
        })
        console.log('完成规整下面对比数据', this.transDownData)
      },
      formatDownTitle(titleData) {
        let tempTitle = new Array(titleData.length);
        let tempTitleKey = new Array(titleData.length);
        for (let i in titleData) {
          tempTitle[titleData[i].sort_no - 1] = titleData[i].column_name;
          tempTitleKey[titleData[i].sort_no - 1] = titleData[i].column_value;
        }
        this.downTitle = tempTitle;
        this.downTitleKey = tempTitleKey;
        console.log('formatDownTitle--tempTitle', this.downTitle);
        console.log('formatDownTitle--downTitleKey', this.downTitleKey);
      },
      formatResponseDownData(downData) {
        let that = this;
        let tempData = [];
        let tempTitleKey = this.downTitleKey;
        let tempTitle = this.downTitle;
        console.log('downData', downData);
        for (let i in downData) {
          let obj = {};
          tempTitleKey.forEach(function(ele, index, array) {
            //将币种转为中文描述
            if (ele === 'ccy_code') {
              for(var j=0;j<that.currencyList.length;j++){
                if (that.currencyList[j].dict_id ===downData[i][ele] ) {
                  obj[ele] = that.currencyList[j].dict_name;
                  console.log('that.currencyList[j].dict_name+++',that.currencyList[j].dict_name);
                }
                  obj[ele] = that.currencyList[j].dict_name;
                }
               

            } else {
              obj[ele] = downData[i][ele]
              console.log('downData[i][ele]++++',downData[i][ele]);
            }
            console.log(`规整出的数据单向  ${tempTitle[index]}  ${tempTitleKey[index]}   ${downData[i][ele]}`);
          });
          console.log('obj' + i, obj);
          tempData.push(obj)
          console.log('obj++++', obj);
        }
        console.log('formatDownData', tempData);
        this.downData = tempData;
      },


      //关闭按钮
      close() {
        this.$dialog.close();
      },




    }
  }
</script>
<style lang="css" scoped>
  .page_content {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .page_content_title {
    width: 100%;
    height: 40px;
    padding-left: 10px;
    position: relative;
    line-height: 40px;
  }

  .page_content_title::before {
    content: "";
    width: 3px;
    height: 22px;
    display: block;
    position: absolute;
    left: 0;
    top: 8px;
    background: #727df8;
  }

  .page_content_container {
    width: 100%;
  }

  .page_content_up_table {
    width: 100%;
    margin-top: 50px;
  }

  .page_content_small_title {
    width: 100%;
    text-align: center;
  }

  .menu-footer {
    margin-top: 30px;
    text-align: center;
  }
</style>
