<template>
  <div>
    <div class="container-content">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>机构列表</span>
          </template>
          <div class="container-content--form">
            <el-form ref="appForm" :model="appForm" label-width="60px" class="custom-common--form">
                <el-row>
                    <div>
                        <el-table ref="multipleTable" :data="appForm.tableData" :border="true" prop="tableData">
                            <el-table-column label="机构编号" prop="branch_id" align="center" show-overflow-tooltip >
                            </el-table-column>
                            <el-table-column label="机构类型" prop="orgType" align="center" show-overflow-tooltip :formatter="formatTypeData">
                            </el-table-column>
                            <el-table-column label="机构名称" prop="branch_name" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="合作状态" prop="mech_status" align="center" :formatter="formatTypeDatao">
                            </el-table-column>
                         <!--   <el-table-column label="代理模式" prop="proxy_pattern" align="center" width="400%" :formatter="formatTypeDatad">
                            </el-table-column>
                            <el-table-column label="磋商结果" prop="consulta_re" align="center" :formatter="formatTypeDatac">
                            </el-table-column>-->
                        </el-table>
                    </div>
                </el-row>
                <el-row class="elrow">
                    <el-form-item class="require-asterisk" label="附件" prop="fj">
                        <upload-file ref="fjProp" :uploadFileList="appForm.fj" :uploadDisabled="true" @changeFile="fjChange" :key="timer"></upload-file>
                    </el-form-item>
                </el-row>
                <el-row class="elrow">
                    <el-form-item :label="$i18ns('备注')" prop="remark">
                        <el-input type="textarea"  v-model="appForm.remark" autosize="true" resize="none" :readonly="true"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  export default {
    name: "PreviewBusinessCoApply",
    components: {
      UploadFile,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        orgTypeList:[],//机构类型list
        mechsStatusList:[],//合作状态list
        consultaList:[],//磋商结果字典list
        proxyPatternList:[],//代理模式list
        appForm:{
            tableData:[],//业务合作申请记录
            fj:[],//附件
            remark: "", // 备注
        },
        activeNames: ["1"],
        currentPage: 1,
        tableTotal: 10,
        tableSize: 10,
      }
      
    },
    created() {
      this.getDictList("PL_E_ORGTYPES","orgTypeList");
      this.getDictList("Pl_E_MECHS_STATUS","mechsStatusList");
      this.getDictList("E_CONSULTA","consultaList");
      this.getDictList("E_CLENMODE","proxyPatternList");
      this.getTableData();
      this.getBranch();
    },
    methods: {
       /**
       * 获取数据字典列表
       * @param dictType  数据字典 dictType
       * @param listKey 列表对象key名称
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
        * 获取合作机构列表数据
        */
        getTableData() {
            let reqMap = {
                apply_no : this.cParentParams.apply_no,
                servicecode: "pl0606",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.appForm.tableData = [];
                    this.appForm.remark = res.data.plbBusiCooperAppli.remark;
                    
                    res.data.plbBusiCooperOrg.forEach(item =>{
                        this.appForm.tableData.push(item);
                    })
                    res.data.plbLitiFileDetail.forEach((element) => {
                        this.appForm.fj.push({
                            orig_file_nm: element.orig_file_nm,
                            file_path:element.file_path,
                            file_base_64: element.file_base_64,
                            
                            status: "success",
                        });
                    });
                    this.timer = new Date().getTime(); //更新timer，重新加载子组件
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 机构类型
         */
        formatTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.orgTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 合作状态
         */
        formatTypeDatao(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.mechsStatusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 代理模式
         */
        formatTypeDatad(row,column){
          let name = row[column.property];
          let data = row[column.property];
          let proxy_pattern_list = data.split(',');
          let proxy_pattern_zn_list = [];
          for (let i=0; i<proxy_pattern_list.length; i++){
              let proxyPattern = proxy_pattern_list[i];
              for (let a=0; a<this.proxyPatternList.length; a++){
                  if(proxyPattern == this.proxyPatternList[a].dictId){
                      proxy_pattern_zn_list.push(this.proxyPatternList[a].dictName);
                      break;
                  }
              }
          }
          let proxy_pattern_zn = proxy_pattern_zn_list.join(',')
          return proxy_pattern_zn;
        },
        /**
         * 磋商结果
         */
        formatTypeDatac(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.consultaList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
        fjChange(val){this.appForm.fj= val;},
    }
  
  }
</script>

<style lang="less" scoped>
.container-content {
    .container-content--toolbar{
        padding-left: 25px;
    }
    .container-centent--form {
        margin-top: 10px;
    }  
}
.el-dialog-dev{
    max-height:100vh;
    overflow:auto;
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--footer {
        margin-top: 10px;
        padding: 16px 40px 0 12px;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }  
    .container-centent--table {
        margin-top: 10px;
    } 
} 
.elrow {
    padding: 0;
    margin-top: 10px;
    width:30%
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>