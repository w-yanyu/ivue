<template>
  <div>
    <div>
      <el-form ref="searchData" :rules="formRules" :model="searchData" label-width="150px" class="custom-common--form">
        <el-row class="row-cell">
          <el-col :span="18">
            <el-form-item label="系统名称" prop="systemName">
              <el-select v-model="searchData.systemName" filterable placeholder="请选择系统名称">
                <el-option
                  v-for="(item, index) in systemList"
                  :key="index"
                  :label="item.systemName"
                  :value="item.systemName"
                  @click.native="chooseSystemCallBack(index)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-cell">
          <el-col :span="18">
            <el-form-item class="require-asterisk" label="系统编号" prop="systemId">
              <el-input type="text" v-model="searchData.systemId" disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="show" class="row-cell">
          <el-col :span="18">
            <el-form-item class="require-asterisk" label="第一次" prop="isFirst">
              <el-input type="text" v-model="searchData.isFirst" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-if="show" class="row-cell">
          <el-col :span="18">
            <el-form-item class="require-asterisk" label="老系统编号" prop="oldSystemId">
              <el-input type="text" v-model="searchData.oldSystemId" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-cell">
          <el-col :span="18">
            <el-form-item label="系统所属机构" prop="systemBranchId">
              <el-select v-model="searchData.systemBranchId" placeholder="请选择系统所属机构" disabled="false">
                <el-option
                  v-for="(item, index) in branchList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row-cell">
          <el-col :span="18">
            <el-form-item label="备注:" prop="remark">
              <el-input type="textarea" :autosize="{minRows:5, maxRows: 8}" maxlength="200" show-word-limit v-model="searchData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!--    <div class="custom-common&#45;&#45;footer">-->
    <!--      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>-->
    <!--      <el-button size="small" @click="reset">取消</el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "AuthorizeBaseInfoAdd",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      searchData: {
        isFirst:"true",
        systemId: "",//系统编号
        oldSystemId: "",//系统编号
        systemName: "",//系统名称
        systemBranchId: "",//系统所属机构
        remark: "", // 备注
      },
      systemList: [], //系统列表
      branchList: [], //机构列表
      formRules: {//表单验证对象
        systemId: [{required: true, message: "请选择系统编号"}],
        systemName: [{required: true, message: "请选择系统"}],
        systemBranchId: [{required: true, message: "请选择所属机构"}]
      }
    }
  },
  created() {
    console.log("cMeta",this.cMeta);
    console.log("cParentParams",this.cParentParams);
   
    console.log("cParentMeta",this.cParentMeta);
    console.log("cParentScope",this.cParentScope);
    this.lastStep();
    this.getDictList("DECI_E_BRANCH_MARK2", "branchList");
    this.getSystemList();
  },

  methods: {
    lastStep(){
  //点击上一步
      if(this.cParentParams.systemId!=""){
        this.searchData.isFirst="false";
          let that = this;
        let reqMap = {
          servicecode: "deci090102",
          systemId:this.cParentParams.systemId,
          start:1,
          length:5000
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            console.log("code", res.code);
            that.searchData.systemName = res.data[0].systemName;
            that.searchData.systemId = res.data[0].systemId;
            that.searchData.systemBranchId = res.data[0].systemBranchId;
            that.searchData.remark = res.data[0].remark;
            that.searchData.oldSystemId = res.data[0].systemId;
          }
        }).catch(err => {
          console.error(err);
        });
      }
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
    getSystemList() {
      let that = this;
      let reqMap = {
        servicecode: "deci090101",
        start:1,
        length:5000
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.systemList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    chooseSystemCallBack(index){
      console.log("下标：" + index);
      let tempObj = this.systemList[index];
      this.searchData.systemId = tempObj.systemId;
      this.searchData.systemBranchId = tempObj.systemBranchId;
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

.row-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
