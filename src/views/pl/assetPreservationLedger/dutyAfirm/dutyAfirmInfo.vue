<template>
  <div>
    <div>
      <el-table ref="modifyTable" :data="dutyDataList" :border="true">
        <el-table-column :label="$i18ns('责任人')" prop="duty_per_nm" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$i18ns('责任种类')" prop="duty_tp" align="center" :formatter="tpFormatter"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column :label="$i18ns('责任程度')" prop="duty_degree" align="center" :formatter="deFormatter">
        </el-table-column>
        <el-table-column :label="$i18ns('责任人处理方式')" prop="deal_way" align="center" :formatter="wayFormatter">
        </el-table-column>
        <el-table-column :label="$i18ns('责任原因')" prop="duty_cause" align="center">
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <el-form
        ref="fileForm"
        :model="fileForm"
        label-width="160px"
        class="custom-common--form"
      >
        <el-form-item :label="$i18ns('责任认定通知书')" width="200px">
          <a @click="download()" v-if="fileForm.file_path">{{ $i18ns('下载') }}</a>
        </el-form-item>
        <el-form-item :label="$i18ns('备注')" width="200px">
          <el-input
            type="textarea"
            resize="none"
            :rows="3"
            v-model="fileForm.remark"
            maxlength="200"
            disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "dutyAfirmInfo",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      fileForm: {
        remark: "",
        file_path:""
      },
      dutyDataList:[],
      dutytpLst: [],
      dutydeLst: [],
      dealwayLst: [],
    }
  },
  created() {
    this.getDictList("PL_E_DUTY_TP", "dutytpLst"); // 责任类型
    this.getDictList("PL_E_DUTY_DEGREE", "dutydeLst"); // 责任程度
    this.getDictList("PL_E_DUTY_DEAL_WAY", "dealwayLst"); // 责任人处理方式
    this.getDictList("PL_E_CLSSST", "clssstList");//贷款状态
    this.getDutyDataInfo();
  },
  methods: {
    /**
     * 获取责任认定详情
     *
     */
    getDutyDataInfo() {
      let params = {
        servicecode: "pl0296",
        loan_no: this.cParentParams.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            this.dutyDataList = data.list01;
            this.fileForm.file_path = data.file_path;
            this.fileForm.remark = data.remark;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 下载
     */
    download() {
      let params = new FormData();
      params.append("path",this.fileForm.file_path);
      params.append("fileName","下载");

      MyAxios.invokeAPI("/SUMP/minioCall/download", "post", params)
        .then(res => {
          const data = res.data;
          const url = window.URL.createObjectURL(new Blob([data]))
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.setAttribute('download', '')
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch(err => {
          console.error(err);
        });

      // document.location.href = this.fileForm.file_path;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
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
    /**
     * 表格中枚举转换
     */
    xbFormatter(val, lst) {
      //性别
      let cyxbvalue = val;
      if (cyxbvalue == null || cyxbvalue == "" || cyxbvalue == undefined) {
        return cyxbvalue;
      } else {
        let dycyxb = this[lst].filter((item) => item.value === cyxbvalue);//filter过滤方法（看自己的情况、需求）
        return dycyxb[0].label;//rerun的内容即为要在表格中显示的内容
      }
    },
    /**
     *字典转换
     */
    tpFormatter(row) {
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dutytpLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },
    deFormatter(row) {
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dutydeLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },
    wayFormatter(row) {
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dealwayLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },
    /**
     * 获取字典名称
     */
    getDictName(dictId, dictList) {
      let dictType = {};
      dictType = dictList.find(item => {
        return item.dictId === dictId;
      })
      return dictType.dictName;
    }
  }
}

</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;

  .el-row .el-col {
    padding-right: 16px;
  }
}

.line-change .el-form-item__label {
  text-align-last: center;
  line-height: 15px;
}

.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 0px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .button-footer {
    text-align: center;
    padding: 0 0 10px 0;
  }

  .container-centent--table {
    margin-top: 10px;
    bottom: 60px;
  }
}

.el-dialog-dev {
  max-height: 60vh;
  overflow: auto;
}

.space {
  margin-top: 20px;
}
a{
  color: #1890FF;
}
</style>
