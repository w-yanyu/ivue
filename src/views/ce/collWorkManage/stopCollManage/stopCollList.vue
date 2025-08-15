<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form :model="form" ref="form" label-width="150px" class="custom-common--form">
          <el-row>
            <el-col :span="8">
              <el-form-item label="借据号"  prop="lncfno" >
                <el-input v-model="form.lncfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="停催来源" prop="source">
                <el-select v-model="form.source" placeholder="请选择停催来源">
                  <el-option
                    v-for="(item, index) in sourceList"
                    :key="index"
                    :label="item.dictId+'-'+item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户姓名" prop="custna">
                <el-input v-model="form.custna" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" prop="idtfno">
                <el-input v-model="form.idtfno" class="input"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="停催类型" prop="stoptype">
                <el-select v-model="form.stoptype" placeholder="请选择停催类型">
                  <el-option
                    v-for="(item, index) in stoptypeList"
                    :key="index"
                    :label="item.dictId+'-'+item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="停催原因" prop="stopreasion">
                <el-select v-model="form.stopreasion" placeholder="请选择停催原因">
                  <el-option
                    v-for="(item, index) in stopreasionList"
                    :key="index"
                    :label="item.dictId+'-'+item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称" prop="prodcd">
                <el-select v-model="form.prodcd" placeholder="请选择产品名称">
                  <el-option
                    v-for="(item, index) in prodcdList"
                    :key="index"
                    :label="item.prodna"
                    :value="item.crdtcd"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller">查询</el-button>
              <el-button type="success" @click="downloadFile">导出</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          stripe
        >

          <el-table-column
            label="借据号"
            prop="lncfno"
            width="240"
            align="center">
          </el-table-column>
          <el-table-column
            label="客户姓名"
            prop="custna"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="证件号码"
            prop="idtfno"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="产品名称"
            prop="prodna"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="停催来源"
            prop="source"
            align="center"
            :formatter="formatSourceData"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="停催类型"
            prop="stoptype"
            align="center"
            :formatter="formatStoptypeData"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="停催到期日期"
            prop="stopenddate"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="停催原因"
            prop="stopreasion"
            align="center"
            :formatter="formatStopreasionData"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            :label="$i18ns('备注')"
            prop="remark"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
        <el-pagination v-show="isShowPage"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,15,20]"
                       :page-size="tableSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableTotal">
        </el-pagination>
      </div>
    </div>

  </div>
</template>


<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import _ from "lodash";

  export default {
    name: "stopCollList",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
      return{
        tableData: [], //表格数据
        isShowPage:false,
        isBrchEnabled : false, //区域中心是否可选
        form:{
          lncfno: "",
          source: "",
          custna: "",
          idtfno: "",
          stoptype: "",
          stopreasion: "",
          prodna: "",
        },
        currentPage: 1,
        tableTotal: 10,
        tempForm: [],  //查询
        sourceList:[],  //停催来源字典
        stoptypeList:[],  //停催类型字典
        stopreasionList:[], //停催原因列表
        prodcdList:[], //产品列表
        tableSize: 10,
      }
    },
    created() {
      this.getDictList("E_STOP_SOURCETYPE","sourceList");
      this.getDictList("E_STOP_TYPE","stoptypeList");
      this.getDictList("E_STOP_REASION","stopreasionList");
      this.getProdcdList();
      this.getTableData();
    },
    methods: {
      /**
       * 获取字典
       */
      getDictList(dictType, listKey) {
        let params = {
          dictType: dictType,
          dictKey: [dictType]
        }
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },

      getProdcdList() {
        let params = {
          servicecode: "AS_ICMS_PD_QRPDLS",
          length: 100,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.prodcdList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },

      formatSourceData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.sourceList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },
      formatStoptypeData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.stoptypeList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },
      formatStopreasionData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.stopreasionList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.getTableData();
      },
      /**
       * 分页currentChange回调
       */
      currentChange(val) {
        this.currentPage = val;
        this.getTableData();
      },
      /**
       * 查询
       */
      searchTeller() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.tempForm = _.cloneDeep(this.form);
            this.currentPage = 1;
            this.getTableData();
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过"
            })
          }
        })
      },
      reset() {
        this.$refs.form.resetFields();
      },
      /**
       * 获取列表数据
       */
      getTableData() {
        let reqMap = {
          lncfno: this.form.lncfno,
          source: this.form.source,
          custna: this.form.custna,
          idtfno: this.form.idtfno,
          stoptype: this.form.stoptype,
          stopreasion: this.form.stopreasion,
          prodcd: this.form.prodcd,
          servicecode: "RLMSPLTS1039",
          start: this.currentPage,
          length: this.tableSize,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.isShowPage = true;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;

          }
        }).catch(err => {
          console.error(err);
        });
      },
      downloadFile() {
        let reqMap = {
          lncfno: this.form.lncfno,
          source: this.form.source,
          custna: this.form.custna,
          idtfno: this.form.idtfno,
          stoptype: this.form.stoptype,
          stopreasion: this.form.stopreasion,
          prodcd: this.form.prodcd,
          servicecode: "RLMSPLTS1066"
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          let URL = this.dataUrlToBlob(res.data.base64Str);
          var reader = new FileReader();
          reader.readAsDataURL(URL);
          reader.onload = function (e) {
            const a = document.createElement('a');
            a.download = '停催一览表.xls';
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a)
          }
        });
      },
      dataUrlToBlob(data){
        var bstr = atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: 'xls' });
      }

    }
  }
</script>


<style lang="less" scoped>
  .container-content {
    .container-content--search {
      padding: 16px 40px 0 12px;
      border-bottom: 1px solid #e3e8f5;
    }
    .container-content--toolbar{
      padding: 10px;
    }
    .container-content--pagination{
      float: right;
      padding: 10px;
    }
    .container-centent--table {
      margin-top: 10px;
      margin-right: 25px;
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
</style>
