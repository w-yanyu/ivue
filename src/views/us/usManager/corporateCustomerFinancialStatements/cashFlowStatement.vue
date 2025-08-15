<template>
  <div class="page_content">
    <div class="horizontal_info">
      <div> 客户编号： </div>
      <div> {{cParentParams.cust_no}}</div>
      <div> 报表行业类型 </div>
      <div> {{indu_type}} </div>
      <div> 报表模板： </div>
      <div> {{rpt_type}} </div>
      <div> 报表日期： </div>
      <div>{{cParentParams.rpt_date}}</div>
    </div>
    <div class="horizontal_info marginTop-1">
      <div> 财务报表合并口径 </div>
      <div>
        <el-select v-model="unit_way" placeholder="请选择..." class="table_select">
          <el-option v-for="item in unitWayType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div> <span>*</span>审计情况 </div>
      <div>
        <el-select v-model="check_flag" placeholder="请选择..." class="table_select">
          <el-option v-for="item in checkFlagType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div> 单位： </div>
      <div> 元 </div>
      <div> 特殊说明： </div>
      <div> {{cParentParams.remark}} </div>
    </div>

    <div class="horizontal_title">
      <div> 导入报表</div>

      <el-upload ref="upload" action="/" :on-change="handleChange" :onexceed="handleExceed" :show-file-list="false"
        :auto-upload="false">
        <el-button class="excel-btn">Excel导入</el-button>
      </el-upload>
    </div>



    <div class="horizontal_title">
      <div> {{indu_type}}</div>
      <div> 日期 {{cParentParams.rpt_date}} </div>
      <div> 单位：元 </div>
    </div>

    <table class="tabel_balance">
      <tr class="tr_title">
        <th class="th_big">项目 </th>
        <th class="th_small">行次</th>
        <th class="th_big">上期金额</th>
        <th class="th_big">本期金额</th>

      </tr>
      <tr class="tr_content" v-for="(itemData,index) in tableData"
        :class="{'link-item-active': itemData.id == activeLinkId,'link-item-hover':index==hoverIndex}" :key="index"
        @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1">
        <td class="textAginleft">{{itemData.l_alias_na}}({{itemData.l_item_cd}})</td>
        <td>{{itemData.l_rowno}}</td>
        <td>
          <el-input-number class="table_content_input" v-model="itemData.l_begin" :disabled="true" :precision="2">
          </el-input-number>
          <!-- <el-input class="table_content_input" v-model="itemData.l_begin" :disabled="true">
          </el-input> -->
        </td>
        <td>
          <el-input-number class="table_content_input" v-model="itemData.l_end" :disabled="itemData.l_form_ula!=''"
            :precision="2"></el-input-number>
          <!--  <el-input class="table_content_input" v-model="itemData.l_end" :disabled="itemData.l_form_ula!=''"
            @blur="itemLInput(itemData)"> 
          </el-input>-->
        </td>
      </tr>

    </table>

    <div>
      <el-button class="submit" type="primary" plain @click.native.prevent="saveData" v-if="tableData.length>0">{{$i18ns('保存')}}
      </el-button>
      <el-button class="submit" type="info" plain @click.native.prevent="close">{{$i18ns('返回')}}</el-button>
    </div>
  </div>
</template>
<script>
  //现金流量表
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化
  import XLSX from 'xlsx'
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
      return {
        indu_type: '', //财务报表行业
        rpt_type: '', //报表模板
        unit_way: '', //报表合并口径
        rpt_perd_tp: '', //报表期限类型
        check_flag: '', //是否审计
        rpt_date: '', //报表日期
        unitWayType: [{
          value: '1',
          label: '汇总'
        }, {
          value: '2',
          label: '单一'
        }, {
          value: '3',
          label: '合并'
        }],
        checkFlagType: [{
          value: 'N',
          label: '否'
        }, {
          value: 'Y',
          label: '是'
        }],
        tableData: [],
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
        isImportTbale: 'N', //是否是表格导入的数据
        tabelName: '',    //要导入表格的名字

      }
    },
    mounted() {
      let that = this;
      console.log("cParentParams", this.cParentParams);
      that.indu_type = that.induTypeFormat(that.cParentParams);
      that.rpt_type = that.rptPerdTpFormat(that.cParentParams);
      that.tabelName = that.cParentParams.tabelName
      that.unit_way = this.cParentParams.unit_way
      that.check_flag = this.cParentParams.check_flag
      that.initData();
    },
    methods: {
      initData() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ISMTCTST2171";
        // request_map["data_id"] = '107267221';
        request_map["data_id"] = that.cParentParams.data_id; //数据主表ID
        // request_map["tplt_id"] = that.cParentParams.tplt_id;//报表模板ID
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            // console.log(response.data);
            that.tableData = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      dataFormat(data) {
        let that = this;
        let tempDataItem = [];

        for (let i in data) {
          if (data[i].l_form_ula) {
            let array = that.importFormula(data[i].l_form_ula);
            let tempObj = {};
            for (let j in array) {
              tempObj[array[j]] = '0'
            }
            tempObj.index = i + ``;
            tempObj.side = 'l';
            tempObj.formula = data[i].l_form_ula;
            tempObj.array = array;
            tempDataItem.push(tempObj);
          }
          if (data[i].r_form_ula) {
            let array = that.importFormula(data[i].r_form_ula);
            let tempObj = {};
            for (let j in array) {
              tempObj[array[j]] = '0'
            }
            tempObj.index = i + ``;
            tempObj.side = 'r';
            tempObj.formula = data[i].r_form_ula;
            tempObj.array = array;
            tempDataItem.push(tempObj);
          }
        }
        that.formulaData = tempDataItem;
      },
      //excel导入时，自动触发页面上的公式
      //formulaStr:公式字符串
      //jiwb 20141021
      importFormula(formulaStr) {
        let that = this
        let formulalist = formulaStr.split(";"); //提取每个公式
        for (let i = 0; i < formulalist.length; i++) { //循环每个公式
          let singleformula = formulalist[i];
          let flag1 = singleformula.indexOf("="); //=号在字符中的序号
          let filterlist = singleformula.substr(flag1 + 1); //右边项let
          let fre = /[^A-Z0-9a-z0-9]+/g;
          let sourlist = filterlist.replace(fre, "-"); //
          let sourcelist = sourlist.split("-"); //提取单元数据
          //isinclude(formulaStr,"b",sourcelist[0]);//上期金额，促发公式
          return sourcelist;
          // that.isinclude(formulaStr, "e", sourcelist[0]); //本期金额，促发公式//sourcelist[0]为等号右边
        }
      },
      //判断是否需要触发自动计算合计项的方法
      isinclude(formula, flag0, itemcd, tempArray) {
        let that = this
        let lefts = new Array();
        let rights = new Array();
        let formulalist = formula.split(";"); //提取每个公式
        let totalValue = ''
        for (let i = 0; i < formulalist.length; i++) {
          let temp;
          temp = formulalist[i].split("=");
          lefts[i] = temp[0];
          rights[i] = temp[1];
        }

        for (let i = 0; i < formulalist.length; i++) {
          let fre = /[^A-Z0-9a-z0-9]+/g;
          let sourlist = rights[i].replace(fre, "-"); //把所有的符号换成‘-’
          let sourcelist = sourlist.split("-"); //提取单元数据

          for (let j = 0; j < sourcelist.length; j++) {
            if (sourcelist[j] === itemcd) {
              totalValue = that.calcn(formulalist[i], flag0, tempArray); //计算
              that.isinclude(formula, flag0, lefts[i]);
            }
          }
        }
        return totalValue
      },

      //根据公式计算
      calcn(singleformula, flag, tempArray) {
        let that = this;
        let flag1 = singleformula.indexOf("="); //=号在字符中的序号
        let targetid = singleformula.substring(0, flag1); //左边项
        let filterlist = singleformula.substr(flag1 + 1); //右边项

        let fre = /[^A-Z0-9a-z0-9]+/g;
        let sourlist = filterlist.replace(fre, "-"); //
        let sourcelist = sourlist.split("-"); //提取单元数据
        let re = /[A-Z0-9a-z0-9]+/g;
        let fllist = filterlist.replace(re, "t"); //
        let flaglist = fllist.split("t"); //提取所有的符号
        console.log('sourcelist', sourcelist);
        // let source = parseFloat(that.delcommax($id(flag + sourcelist[0]).value)); //右边公式的第一个值
        let source = parseFloat(tempArray[sourcelist[0]]); //右边公式的第一个值
        for (let m = 1; m < flaglist.length - 1; m++) {
          if (flaglist[m] == "+") {
            // source += parseFloat(that.delcommax($id(flag + sourcelist[m]).value));
            source += parseFloat(tempArray[sourcelist[m]]);
          } else if (flaglist[m] == "-") {
            // source -= parseFloat(that.delcommax($id(flag + sourcelist[m]).value));
            source -= parseFloat(tempArray[sourcelist[m]]);
          }
        }
        source = source.toFixed(2);
        // $id(flag + targetid).value = source;
        // that.fmtMoney($id(flag + targetid));
        let total = that.fmtMoney(source);
        console.log("calcn", total);
        return total;
      },
      delcommax(oldNum) {
        //这里使用正则表达式来匹配替换逗号“，”
        let initNum = oldNum.replace(/,/g, "");
        return initNum;
      },
      /*处理金额的千分位等*/
      fmtMoney(field) {
        let fmtValue = field;
        let len = 2;
        if (!isNaN(fmtValue)) {
          //是数字才处理
          if ((fmtValue.length > 0) && (fmtValue != 0) && this.check_money(field)) {
            if ((fmtValue.indexOf(".") > 0)) {
              let valueArray = fmtValue.split(".");
              let intV = valueArray[0];
              let fltV = valueArray[1];
              for (let i = fltV.length; i < len; i++) {
                fltV = fltV + "0";
              }
              if (fltV.length > len) {
                fltV = fltV.substring(0, len);
              }
              field = intV + "." + fltV;
              //field.value =addComma(field.value);
            } else {
              field = fmtValue + ".00";
              //field.value =addComma(field.value);
            }
          }
        } else {
          field = 0;
        }
        return field
      },
      check_money(s) {
        s = s.replace(/,/g, "")
        var re = /^(\+|-)?\d+(.\d+)?$/i;
        return re.test(s);
      },
      // 左边输入框激活方法
      itemLInput(item) {
        let that = this
        let modifyArray = [];
        console.log("左边输入框输入", event);
        if (item.l_item_cd != '') {
          let modifyArray = that.seachMachArry(item.l_item_cd, item.l_end);
          console.log('需要修改的数组', modifyArray);
          that.$nextTick(() => {
            for (let i in modifyArray) {
              if (modifyArray[i].side === 'l') {
                that.tableData[modifyArray[i].index].l_end = modifyArray[i].totalValue
              } else {
                that.tableData[modifyArray[i].index].r_end = modifyArray[i].totalValue
              }
            }
          })
        }
        that.$nextTick(() => {
          let value = that.fmtMoney(item.l_end);
          item.l_end = value
        })
      },

      seachMachArry(key, value) {
        let that = this
        let modifyArray = []
        for (let i in that.formulaData) {
          if (that.formulaData[i][key] != undefined) {
            that.formulaData[i][key] = value;
            let formulaStr = that.formulaData[i].formula;
            let sourcelist = that.formulaData[i].array;
            let totalValue = ''
            totalValue = that.isinclude(formulaStr, "e", sourcelist[0], that.formulaData[
              i]); //本期金额，促发公式//sourcelist[0]为等号右边
            let modifyObj = {
              index: that.formulaData[i].index,
              side: that.formulaData[i].side,
              totalValue
            }
            modifyArray.push(modifyObj)
          }
        }
        return modifyArray;
      },
      // 报表行业类型
      induTypeFormat(data) {
        switch (data.indu_type) {
          case '00':
            return '标准财务报表'
          case '01':
            return '公共事业单位类'
          case '07':
            return '融惠通财务报表'
        }
      },
      //报表类型
      rptTypeFormat(data) {
        switch (data.rpt_type) {
          case '01':
            return '资产负债表'
          case '02':
            return '损益表'
          case '03':
            return '现金流量表'
          case '04':
            return '收入支出表'
          case '09':
            return '他财务报表'
        }
      },
      //报表期限类型
      rptPerdTpFormat(data) {
        switch (data.rpt_perd_tp) {
          case 'D':
            return '日报'
          case 'M':
            return '月报'
          case 'Q':
            return '季报'
          case 'S':
            return '半年报'
          case 'Y':
            return '年报'
        }
      },
      //
      unitWayFormat(data) {
        return data.unit_way === '1' ? '汇总' : data.unit_way === '2' ? '单一' : '合并';
      },
      //是否审计
      checkFlagFormat(data) {
        return data.check_flag === '0' ? '否' : '是';
      },
      //关闭对话框
      close() {
        this.$dialog.close();
      },
      saveData() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ISMTCTST2170";
        request_map["data_id"] = that.cParentParams.data_id; //数据主表ID
        request_map["rpt_type"] = that.cParentParams.rpt_type; //报表模板ID
        request_map["list01"] = that.tableData;
        request_map["isinport"] = that.isImportTbale; //是否是财务报表导入
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            // that.tableData = response.data;
            MyMessage({
              message: '提交成功',
              type: 'succes'
            });
            that.$dialog.close();
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      //上传文件时处理方法
      handleChange(file, fileList) {
        // let file = file.files[0] // 使用传统的input方法需要加上这一步
        let self = this;
        const types = file.name.split(".")[1];
        // const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        const fileType = ["xlsx", "xlc", "xlm", "xls"].some(
          item => item === types
        );
        this.fileTemp = file.raw;
        if (this.fileTemp) {
          // if ((types === 'xlsx') || (types === 'xlc') || (types === 'xlm') || (types === 'xls') || (types === 'xlt') ||(types =='xlw') || (types === 'csv')) {
          if ((types === 'xlsx') || (types === 'xlc') || (types === 'xlm') || (types === 'xls')) {
            this.importfxx(types);
          } else {
            this.$message({
              type: 'warning',
              message: '附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请上传附件！'
          })
        }
      },
      //超出最大上传文件数量时的处理方法
      handleExceed() {
        this.$message({
          type: 'warning',
          message: '超出最大上传文件数量的限制！'
        })
      },
      importfxx(obj) {
        let _this = this;
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据

        this.file = event.currentTarget.files[0];

        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;

        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            //如果没有在main.js中引入，则此处需要引入，用于解析excel
            // var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            console.log("excel读取到的数据：", outdata)
            console.log('获取对象key===', Object.keys(outdata[0])[0]);
            console.log('传过来的key===', _this.tabelName);
            // outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
            // 此处可对数据进行处理
            if (Object.keys(outdata[0])[0] !== _this.tabelName) {
              return _this.$message({
                type: 'warning',
                message: '导入表格错误，请检查后导入'
              })
            }
            let arr = [];
            outdata.map(v => {
              console.log('v', v);
              let obj = {}
              //Excel 删掉目录的解析
              // obj.l_alias_na = v['资产科目名称']
              // obj.l_rowno = v['行号']
              // obj.l_item_cd = v['科目号']
              // obj.l_begin = v['年初数']
              // obj.l_end = v['期末数']
              // obj.l_form_ula = ""

              // obj.r_alias_na = ""
              // obj.r_rowno = '0'
              // obj.r_item_cd = ""
              // obj.r_begin = "0.00"
              // obj.r_end = "0.00"
              // obj.r_form_ula = ""

              //Excel没有删掉目录的接触
              obj.l_alias_na = v[_this.tabelName]
              obj.l_rowno = v['__EMPTY']
              obj.l_item_cd = v['__EMPTY_1']
              obj.l_begin = _this.fmtMoney(v['__EMPTY_2'])
              obj.l_end = _this.fmtMoney(v['__EMPTY_3'])
              obj.l_form_ula = ""

              obj.r_alias_na = ""
              obj.r_rowno = '0'
              obj.r_item_cd = ""
              obj.r_begin = "0.00"
              obj.r_end = "0.00"
              obj.r_form_ula = ""

              arr.push(obj)
            });
            arr.shift();
            console.log("excel整理过的数据：", arr)
            // _this.da=arr;
            // _this.dalen=arr.length;
            // return arr;
            if (arr.length > 0) {
              _this.tableData = arr;
              _this.dataFormat(arr);
              _this.isImportTbale = 'Y'
            }
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },





    }
  }
</script>
<style lang="css" scoped>
  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .horizontal_info {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .horizontal_info div {
    border: 1px solid #2feeff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    flex: 1;
  }

  .horizontal_info div span {
    color: red;
  }

  .marginTop-1 {
    margin-top: -1px;
  }

  .horizontal_title {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
  }

  .horizontal_title div {
    border: 1px solid #2feeff;
    height: 30px;
    text-align: center;
    flex: 1;
    line-height: 30px;
  }

  .tabel_peson {
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6px;

  }


  .table_title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    height: 40px;

  }

  .table_title_big {
    flex: 4;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }

  .table_title_small {
    flex: 1;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }



  .table_content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    text-align: center;
  }



  .table_content_big {
    flex: 4;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }

  .table_content_small {
    flex: 1;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }



  table,
  th,
  td {
    border: 1px solid #2feeff;
  }

  .tabel_balance {
    margin-top: 6px;
    width: 95%;
  }

  .tr_title {
    height: 26px;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  .th_big {
    width: 30%;
    text-align: center;
  }

  .th_small {
    width: 10%;
    text-align: center;
  }

  .tr_content {
    height: 24px;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    text-align: center;
  }

  .textAginleft {
    text-align: left;
    padding-left: 6px;
  }

  .table_content_input {
    width: 80%;

  }


  div>>>.el-input__inner {
    height: 20px;
    line-height: 20px;
  }

  .link-item-hover {
    background-color: #fac172;
  }

  /* 链接菜单激活样式 */
  .link-item-active {
    color: #fff;
    background-color: #b3cae4;
  }

  .submit {
    margin-top: 15px;
  }
</style>
