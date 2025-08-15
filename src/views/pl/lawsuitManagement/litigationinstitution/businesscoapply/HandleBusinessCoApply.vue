<template>
  <div>
    <div class="container-content">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>机构列表</span>
          </template>
          <div class="container-content--toolbar">
                <el-button type="primary" size="small" @click="addData()">新增</el-button>
          </div>
          <div class="container-content--form">
            <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="60px" class="custom-common--form">
                <el-row>
                    <div>
                        <el-table ref="multipleTable" :data="appForm.tableData" :border="true" prop="tableData">
                            <el-table-column label="区域中心" prop="branchname" align="center" show-overflow-tooltip :formatter="formatTypeDataa">
                            </el-table-column>
                            <el-table-column label="机构类型" prop="orgType" align="center" show-overflow-tooltip :formatter="formatTypeData">
                            </el-table-column>
                            <el-table-column label="机构名称" prop="oa_org_name" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column label="合作状态" prop="mech_status" align="center" :formatter="formatTypeDatao">
                            </el-table-column>
                            <el-table-column label="代理模式" prop="proxy_pattern" align="center" width="400%">
                                <template slot-scope="scope">
                                <el-select v-model="scope.row.proxy_pattern_list" multiple v-if="scope.row.astatus"  placeholder="请选择代理模式">
                                    <el-option  v-for="(item, index) in proxyPatternList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                                </el-select>
                                <span v-else>{{scope.row.proxy_pattern_zn}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="磋商结果" prop="consulta_re" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.consulta_re" v-if="scope.row.astatus"  placeholder="请选择磋商结果">
                                        <el-option  v-for="(item, index) in consultaList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.consulta_re_zn}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" prop="deal_type" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-edit" @click="scope.row.astatus=true">修改</el-button>
                                    <el-button type="text" icon="el-icon-check" @click="saveRow(scope.$index,scope.row)">{{$i18ns('保存')}}</el-button>
                                    <el-button type="text" icon="el-icon-delete" @click="delRow(scope.$index,scope.row)">{{$i18ns('删除')}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="Org-footer" v-if= "appForm.tableData.length > 0">
                        <span slot="footer">
                            <el-button size="small" @click="saveAllRow">全部保存</el-button>
                            <el-button size="small" @click="deleteAllRow">全部删除</el-button>
                        </span>
                    </div>
                </el-row>
                <el-row class="elrow">
                    <el-form-item class="require-asterisk" label="附件" prop="fj">
                        <upload-file ref="fjProp" :uploadFileList="appForm.fj" :uploadDisabled="false" @changeFile="fjChange" :key="timer"></upload-file>
                    </el-form-item>
                </el-row>
                <el-row class="elrow">
                    <el-form-item :label="$i18ns('备注')" prop="remark" >
                        <el-input type="textarea" v-model="appForm.remark" autosize="true" maxlength="200"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button @click="clearData">{{$i18ns('重置')}}</el-button>
      <el-button type="primary" @click="submit" plain>{{$i18ns('保存')}}</el-button>
    </div>
    <el-dialog :title="title" :visible.sync="orgModelVisible" :show-close="true" :before-close="handleClose" width="1200px" :append-to-body="true">
        <div class="el-dialog-dev">
            <div class="container-content--search">
                <el-form :model="orgForm" ref="orgForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="机构类型" prop="org_type">
                                <el-select v-model="orgForm.org_type" placeholder="请选择机构类型" :disabled="orgTypeList.length==1" clearable="true">
                                    <el-option
                                    v-for="(item, index) in orgTypeList"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                             </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="机构名称" prop="org_name">
                                <el-input v-model="orgForm.org_name" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="合作状态" prop="coo_status">
                                <el-select v-model="orgForm.coo_status" placeholder="请选择合作状态" :disabled="mechsStatusList.length==1" clearable="true">
                                    <el-option
                                    v-for="(item, index) in mechsStatusList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                             </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="search()">查询</el-button>
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table ref="cooOrgTable" :data="cooOrgTable" row-key="oa_org_id" :border="true" style="width: 98%;" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" :reserve-selection="true" v-model="multipleSelection" :selectable="selectable"></el-table-column>
                    <el-table-column label="外包商机构编号" prop="oa_org_id" v-if="false">
                    </el-table-column>
                    <el-table-column label="区域中心" prop="branchname" align="center">
                    </el-table-column>
                    <el-table-column label="机构类型" prop="orgType" align="center" :formatter="formatTypeData">
                    </el-table-column>
                    <el-table-column label="机构名称" prop="oa_org_name" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="合作状态" prop="mech_status" align="center" :formatter="formatTypeDatao">
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination v-if="cooOrgTable.length>0"
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10,15,20]"
                :page-size="tableSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal">
                </el-pagination>
            </div>
            <div class="container-content--footer" v-if="cooOrgTable.length!=0">
                <el-button size="small" @click="handleClose">{{$i18ns('取消')}}</el-button>
                <el-button type="primary" size="small" @click="addOrg" plain>提交</el-button>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import SuitUtils from "@/views/pl/lawsuitManagement/fscommonComponets/SuitUtils";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  import { log } from 'util';
  export default {
    name: "HandleBusinessCoApply",
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
        isHandleChange:false, //经办岗页面是否有改动
        unWatch:[], //监听对象
        cooOrgTable:[],//合作机构记录
        orgTypeList:[],//机构类型list
        mechsStatusList:[],//合作状态list
        multipleSelection:[],//机构选取list
        branchList:[],//区域中心list
        consultaList:[],//磋商结果字典list
        proxyPatternList:[],//代理模式list
        appForm:{
            tableData:[],//业务合作申请记录
            fj:[],//附件
            remark: "", // 备注
        },
        orgForm:{
            org_type:"",//机构类型
            org_name:"",//机构名称
            coo_status:"",//合作状态
        },
        activeNames: ["1"],
        orgModelVisible:false,
        currentPage: 1,
        tableTotal: 10,
        tableSize: 10,
      }

    },
    created() {
      // 清除上次遗留监听事件
      this.unWatch.forEach(item => {
          item();
      });
      SuitUtils.$off("resave");
      let self = this;
      // 经办岗接受工作台提交时的传参，并向工作台传入页面改动与否的参数
      SuitUtils.$on("resave", msg => {
          if(msg == self.$options.name){
          if(self.isHandleChange){
              SuitUtils.$emit("toWorkbench","change");
          }else{
              SuitUtils.$emit("toWorkbench","nochange");
          }
          }
      });
      this.getDictList("E_ORGTYPES","orgTypeList");
      this.getDictList("E_MECHS_STATUS","mechsStatusList");
      this.getDictList("E_CONSULTA","consultaList");
      this.getDictList("E_CLENMODE","proxyPatternList");
      this.getBranch();
      this.initRule();
      this.getInitData();
    },
    watch:{
        orgModelVisible: function (val,oldVal){
            if (this.$refs.orgForm != undefined){
                this.$refs.orgForm.resetFields();
            }
        }
    },
    methods: {
        /**
         * 申请监听
         */
        addWatch(){
          this.unWatch.push(this.$watch("appForm",function(){this.isHandleChange = true;},{deep:true}));
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
         * 区域中心
         */
        getBranch(){
            let reqMap = {
                servicecode: "RLMSPLTS1068",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.branchList = res.data;
                }
            }).catch(err => {
                console.error(err);
            });
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
        * 回显合作机构列表数据
        */
        getInitData() {
            let reqMap = {
                applid: this.cParentParams.applid,
                servicecode: "RLMSPLTS1395",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    console.log(res.data);
                    this.appForm.tableData = [];
                    this.appForm.remark = res.data.busiCooperAppli.remark;
                    res.data.busiCooperOrgList.forEach(item =>{
                        let reqArr = {
                            astatus:false,
                            branchname:item.area_center,
                            orgType:item.case_acceptance,
                            oa_org_name:item.acceptance_name,
                            mech_status:item.mech_status,
                            oa_org_id:item.oa_org_id,
                            proxy_pattern:item.proxy_pattern,
                            proxy_pattern_list:this.formatProxyListData(item.proxy_pattern),
                            proxy_pattern_zn:this.formatProxyData(item.proxy_pattern),
                            consulta_re:item.consulta_re,
                            consulta_re_zn:this.formatConsultaData(item.consulta_re),
                        };
                        this.appForm.tableData.push(reqArr);
                    })
                    res.data.fileList.forEach((element) => {
                        this.appForm.fj.push({
                            fileName: element.fileName,
                            filePath: element.filePath,
                            buctetKey: element.buctetKey,
                            bucket: element.bucket,
                            status: "success",
                        });
                    });
                    this.timer = new Date().getTime(); //更新timer，重新加载子组件
                    this.addWatch();
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 重置业务合作申请页面
         */
        clearData(){
            this.appForm.tableData = [];
            this.$refs.appForm.resetFields();
            this.multipleSelection = [];
            this.$refs.cooOrgTable.clearSelection();
            this.cooOrgTable = [];
            this.$refs.fjProp.clearFileList();
            this.getInitData();
        },
        initRule(){
            this.appRules = {
                tableData: [{required: true,  message: "请添加业务合作机构"}],
                fj:[{ validator: this.fjValidate, trigger:'change'}],
            }
        },
        /**
         * 合作机构信息查询
         */
        search(){
            this.currentPage = 1;
            this.getTableData();
        },
        /**
        * 获取合作机构列表数据
        */
        getTableData() {
            let reqMap = {
                area_center: JSON.parse(localStorage.getItem("user_info")).branch_id,
                orgType: this.orgForm.org_type,
                oa_org_name: this.orgForm.org_name,
                mech_status: this.orgForm.coo_status,
                servicecode: "RLMSPLTS1396",
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.cooOrgTable = [];
                    res.data.forEach(item =>{
                        this.cooOrgTable.push(item);
                    })
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 区域中心
         */
        formatTypeDataa(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.branchList.forEach(function(item,index){
            if(data == item.branchNo){
              name = item.brachName;
            }
          })
          return name;
        },
        /**
         * 区域中心
         */
        formatTypeDataArea(data){
          let name = data;
          this.branchList.forEach(function(item,index){
            if(data == item.branchNo){
              name = item.brachName;
            }
          })
          return name;
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
        formatProxyData(val){
          let name = "";
          let data = val;
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
         * 代理模式list
         */
        formatProxyListData(val){
          let name = "";
          let data = val;
          let proxy_pattern_list = data.split(',');
          return proxy_pattern_list;
        },
        /**
         * 磋商结果
         */
        formatConsultaData(val){
          let name = "";
          let data = val;
          this.consultaList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
      /**
       * 保存行数据(收款账户信息)
       */
        saveRow(index,row){
            console.log(row);
            if(!row.proxy_pattern_list || row.proxy_pattern_list.length===0){
                this.$message({type: "warning", message: "请选择代理模式！"});
                return;
            }
            if(!row.consulta_re || row.consulta_re.length===0){
                this.$message({type: "warning", message: "请选择磋商结果！"});
                return;
            }
            for (let i=0; i < this.consultaList.length; i++){
                let accoutType = this.consultaList[i];
                if (row.consulta_re == accoutType.dictId){
                    row.consulta_re_zn = accoutType.dictName;
                }
            }
            let proxy_pattern_zn_list = [];
            for (let i=0; i<row.proxy_pattern_list.length; i++){
                let proxyPattern = row.proxy_pattern_list[i];
                for (let a=0; a<this.proxyPatternList.length; a++){
                    if(proxyPattern == this.proxyPatternList[a].dictId){
                        proxy_pattern_zn_list.push(this.proxyPatternList[a].dictName);
                        break;
                    }
                }
            }
            row.proxy_pattern = row.proxy_pattern_list.join(',')
            row.proxy_pattern_zn = proxy_pattern_zn_list.join(',')
            this.appForm.tableData[index] = row;
            this.appForm.tableData[index].astatus = false;
            this.$message({type: "success",message: "保存成功"});
        },
      /**
       * 删除行数据(收款账户信息)
       */
        delRow(index,row){
            this.appForm.tableData.splice(index,1);
            this.$message({type: "success",message: "删除成功！"})
        },
        /**
         * 业务合作申请提交
         */
        submit() {
            let rtn = false;
            this.$refs.appForm.validate(valid => {
                if (valid) {
                    this.$confirm("是否确认保存申请?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                    }).then(() => {
                        if(this.appForm.tableData.length != 0){
                            this.appForm.tableData.forEach(item=>{
                                if(item.astatus==true){
                                    this.$message({type: "warning", message: "存在未保存的业务合作机构，请保存后提交!"});
                                    rtn = true;
                                    return;
                                }
                            })
                        }else{
                            this.$message({type: "warning", message: "请添加业务合作机构后提交!"});
                            rtn = true;
                            return;
                        };
                        if (rtn){
                            return;
                        };
                        let params = {
                            servicecode: "RLMSPLTS1394",
                            applid: this.cParentParams.applid,
                            area_center: JSON.parse(localStorage.getItem("user_info")).branch_id,
                            area_center_name: this.formatTypeDataArea(JSON.parse(localStorage.getItem("user_info")).branch_id),
                            remark: this.appForm.remark,
                            fileList: this.appForm.fj,
                            busiCooperOrgList: [],
                        };
                        this.appForm.tableData.forEach(item => {
                            let reqMap = {
                                oa_org_id: item.oa_org_id,
                                area_center: JSON.parse(localStorage.getItem("user_info")).branch_id,
                                area_center_name: this.formatTypeDataArea(item.branchname),
                                case_acceptance: item.orgType,
                                mech_status: item.mech_status,
                                acceptance_name: item.oa_org_name,
                                proxy_pattern: item.proxy_pattern,
                                consulta_re: item.consulta_re,
                            };
                            params.busiCooperOrgList.push(reqMap);
                        });
                        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                            if (res && res.code === "200") {
                                this.isHandleChange = false; //提交后，变回初始值
                                this.$message({
                                    type: "success",
                                    message: res.message
                                });
                            }
                        }).catch(err => {
                            console.error(err);
                        });
                    });
                }
            });
        },
        /**
        * 关闭弹框
        */
        handleClose(){
            this.$confirm("是否确认关闭弹框?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.orgModelVisible = false;
            })
        },
        /**
         * 重置机构查询条件
         */
        reset(){
            this.$refs.orgForm.resetFields();
            this.multipleSelection= [];
            this.cooOrgTable= [];
            this.$refs.cooOrgTable.clearSelection();
        },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
        fjChange(val){this.appForm.fj= val;},
        fjValidate(value, rule, callback) {
            if (this.appForm.fj.length === 0) {
                return callback(new Error("请上传附件"));
            }
            return callback();
        },

        /**
         * 业务合作机构选择页面
         */
        addData(){
            this.orgModelVisible = true;
        },

        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        addOrg(){
            if(this.multipleSelection.length === 0){
                this.$message({message:'请至少勾选一项，再进行操作',type:'warning'})
            }else{
                let arr = this.multipleSelection;
                let selectionLen = this.multipleSelection.length;
                let tableLen = this.appForm.tableData.length;
                for (var i=0; i<selectionLen; i++){
                    let selArr ={
                        astatus:true,
                        branchname:arr[i].branchname,
                        orgType:arr[i].orgType,
                        oa_org_name:arr[i].oa_org_name,
                        mech_status:arr[i].mech_status,
                        oa_org_id:arr[i].oa_org_id,
                        proxy_pattern:"",
                        consulta_re:"",
                    };
                    this.appForm.tableData.push(selArr);
                }
                this.appForm.tableData = this.unique(this.appForm.tableData);
                this.orgModelVisible = false;
            }
        },
        /**
         * 已退出机构不可勾选
         */
        selectable(row,index){
            if(row.mech_status == 'YTC'){
                return false;
            }else{
                return true;
            }
        },
        /**
         * 合作机构申请列表去重
         */
        unique(arr){
            const res = new Map();
            return arr.filter((arr) => !res.has(arr.oa_org_id)&&res.set(arr.oa_org_id,1))
        },
      /**
       * 保存所有数据
       */
        saveAllRow(){
          let saveStatus = true;
          for (let i = 0;i < this.appForm.tableData.length;i++) {
            let item = this.appForm.tableData[i];
            if(!item.branchname || item.branchname.length===0){
              this,saveStatus = false;
              break;
            }
            if(!item.orgType || item.orgType.length===0){
              this,saveStatus = false;
              break;
            }
            if(!item.oa_org_name || item.oa_org_name.length===0){
              this,saveStatus = false;
              break;
            }
            if(!item.mech_status || item.mech_status.length===0){
              this,saveStatus = false;
              break;
            }
            if(!item.proxy_pattern_list || item.proxy_pattern_list.length===0){
              this,saveStatus = false;
              break;
            }
            if(!item.consulta_re || item.consulta_re.length===0){
              this,saveStatus = false;
              break;
            }
          }
          if(saveStatus){
            this.appForm.tableData.forEach((row, index) =>  {
              for (let i=0; i < this.consultaList.length; i++){
                  let accoutType = this.consultaList[i];
                  if (row.consulta_re == accoutType.dictId){
                      row.consulta_re_zn = accoutType.dictName;
                  }
              };
              let proxy_pattern_zn_list = [];
              for (let i=0; i<row.proxy_pattern_list.length; i++){
                  let proxyPattern = row.proxy_pattern_list[i];
                  for (let a=0; a<this.proxyPatternList.length; a++){
                      if(proxyPattern == this.proxyPatternList[a].dictId){
                          proxy_pattern_zn_list.push(this.proxyPatternList[a].dictName);
                          break;
                      }
                  }
              };
              row.proxy_pattern = row.proxy_pattern_list.join(',')
              row.proxy_pattern_zn = proxy_pattern_zn_list.join(',')
              this.appForm.tableData[index] = row;
              this.appForm.tableData[index].astatus = false;
            })
            this.$message({
              type: "success",
              message: "保存成功！"
            })
          }else{
            this.$message({type: "error", message: "信息未录入完整,保存失败!"});
          }
        },
      /**
       * 删除全部数据行
       */
        deleteAllRow(){
            this.$confirm("是否删除所有数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            }).then(() => {
            this.appForm.tableData = [];
            this.$message({
                type: "success",
                message: "删除成功！"
            })
            })
        },
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
.Org-footer{
  padding-top:5px;
  padding-right:10px;
  direction:rtl;
}
</style>
