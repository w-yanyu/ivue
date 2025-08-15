<template>
  <div>
    <el-form  ref="basicForm" :model="basicForm" class="custom-common--form">
        <el-row>
            <el-col :span="9" >
                <el-form-item label-width="160px" label="简单评分卡代码：" prop="simpleScoreCardCode" :rules="[{ required: true,message:'简单评分卡代码不能为空' }]">
                    <el-input v-model="basicForm.simpleScoreCardCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="9">
                <el-form-item  label-width="160px" label="简单评分卡名称：" prop="simpleScoreCardName" :rules="[{ required: true,message:'简单评分卡名称不能为空' }]">
                    <el-input v-model="basicForm.simpleScoreCardName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label-width="120px" label="版本号：" prop="version">
                    <el-input v-model="basicForm.version"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="备注：" prop="remark" label-width="160px">
                    <el-input v-model="basicForm.remark" type="textarea" :rows="3" maxlength="200" show-word-limit></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row style="padding: 0px 0px 10px 0px;">
            <el-col :span="24">
                <el-form-item label="请选择版本进行切换："></el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="card-table">
        <el-table
        ref="multipleTable"
        :data="tableData"
        width="100%"
        style="text-algin:center;"
        border>
            <el-table-column
            type="selection"
            align="center">
            </el-table-column>
            <el-table-column
            prop="simpleScoreCardCode"
            label="简单评分卡代码"
            align="center">
            </el-table-column>
            <el-table-column
            prop="simpleScoreCardName"
            label="简单评分卡名称"
            align="center">
            </el-table-column>
            <el-table-column
            prop="version"
            label="版本号"
            align="center">
            </el-table-column>
            <el-table-column
            label="规则详情"
            align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="queryStrategy(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div style="text-align:center;padding: 10px 0px 10px 0px;">
        <el-button  @click="cancle">取消</el-button>
        <el-button type="primary"  @click="saveAction">确定</el-button>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ProdTemplate",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      basicForm: {
        simpleScoreCardCode: "", //简单评分卡代码
        simpleScoreCardName: "", //简单评分卡名称
        version: "", //版本号
        remark: "", //备注
      },
     tableData: [
        {
            simpleScoreCardCode: "1231",
            simpleScoreCardName: "的撒的撒",
            version: "1.0.1"
        }
     ], //版本切换列表
    };
  },
  
  // created() { },
  mounted() {
        console.log("父类传过来的参数--score_card_version_back", this.cParams);
        //this.requestVersionTable();
        this.getTableData();
        this.currVersion = this.cParentParams.currVersion;
    },
  methods: {
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
     * 获取版本切换列表
     */
    getTableData() {
      
      let that = this;
            let params = {
                scoreCardCode: that.cParentParams.scoreCardCode,
                busiVersion: that.cParentParams.currVersion, //当前生效版本号
                start: 1,
                length: 100,
                servicecode: "deci020114"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    that.tableData = obj.data;
                    console.log("111111", that.tableData);
                    //this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
    },
    /**
     * 查看回调
     */
    queryStrategy() {},
    /**
     * 取消回调
     */
    cancle() {
        this.$dialog.close();
    },
    /**
     * 提交（保存）
     */
    saveAction() {}
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}
.custom-common--footer {
  padding-top: 10px;
}
.card-table {
    margin: 0px 66px 26px 149px;
}
</style>
