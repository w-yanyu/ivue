<template>
  <div>
    <div class="addBtn">
      <el-button @click="add" icon="el-icon-circle-plus-outline" size="small" type="primary">&nbsp;&nbsp;新增</el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item class="coll" v-if="messageData.length > 0" title="    法诉信息" name="1">
        <div class="sx"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in messageData" :key="index" :label="item.field_name" >
            <el-input style="width: 290px;" disabled="true" v-model="messageData[index].default_value"></el-input>

            <p  style="display: inline-block;  width: 50px; margin:0 0 0 10px; color: rgb(185, 185, 185); font-size: 12px;" >{{ item.field_type }}</p>
            <el-button @click="maint(item)" icon="el-icon-setting" size="small" style="margin-left: 15px;"  type="primary">&nbsp;&nbsp;维护</el-button>
            <el-button @click="del(item)"  icon="el-icon-delete" size="small" style="margin-left: 8px;"  type="danger">&nbsp;&nbsp;删除</el-button>

          </el-form-item>
        </el-form>

      </el-collapse-item>
      <el-collapse-item class="coll" v-if="payData.length > 0" title="法诉费用" name="2">
        <div class="sx"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in payData" :key="index" :label="item.field_name" >
            <el-input style="width: 290px;" disabled="true" v-model="payData[index].default_value"></el-input>

            <p  style="display: inline-block;  width: 50px; margin:0 0 0 10px; color: rgb(185, 185, 185); font-size: 12px;" >{{ item.field_type }}</p>
            <el-button @click="maint(item)" icon="el-icon-setting" size="small" style="margin-left: 15px;"  type="primary">&nbsp;&nbsp;维护</el-button>
            <el-button @click="del(item)"  icon="el-icon-delete" size="small" style="margin-left: 8px;"  type="danger">&nbsp;&nbsp;删除</el-button>
          </el-form-item>
        </el-form>


      </el-collapse-item>
      <el-collapse-item class="coll" v-if="otherData.length > 0" title="其他" name="3">
        <div class="sx"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in otherData" :key="index" :label="item.field_name" >
            <el-input style="width: 290px;" disabled="true" v-model="otherData[index].default_value"></el-input>

            <p  style="display: inline-block;  width: 50px; margin:0 0 0 10px; color: rgb(185, 185, 185); font-size: 12px;" >{{ item.field_type }}</p>
            <el-button @click="maint(item)" icon="el-icon-setting" size="small" style="margin-left: 15px;"  type="primary">&nbsp;&nbsp;维护</el-button>
            <el-button @click="del(item)"  icon="el-icon-delete" size="small" style="margin-left: 8px;"  type="danger">&nbsp;&nbsp;删除</el-button>

          </el-form-item>
        </el-form>


      </el-collapse-item>
      <el-collapse-item class="coll" title="提醒信息" name="4">
        <div class="sx"></div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in remindData" :key="index" :label="item.field_name" >
            <el-input style="width: 290px;" disabled="true" v-model="remindData[index].default_value"></el-input>

            <p  style="display: inline-block;  width: 50px; margin:0 0 0 10px; color: rgb(185, 185, 185); font-size: 12px;" >{{ item.field_type }}</p>
            <el-button @click="maint(item)" icon="el-icon-setting" size="small" style="margin-left: 15px;"  type="primary">&nbsp;&nbsp;维护</el-button>
            <el-button @click="del(item)"  icon="el-icon-delete" size="small" style="margin-left: 8px;"  type="danger">&nbsp;&nbsp;删除</el-button>
          </el-form-item>
        </el-form>


      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      activeNames: ["1", "2", "3", "4"],
      messageData: [],
      payData: [],
      otherData: [],
      remindData: [],
      typeList: [],
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
    };
  },
  components: {

  },
  mounted() {
    this.getDictList("E_LAW_STAGE_FILED_TYPE", "typeList");
    this.getData()
  },

  methods: {

    del(item) {
      let params = {
        servicecode: "cb0075",
        appId: "cbOnl",
        coll_kind: "02",
        litigation_stage_code: this.cParentParams.litigation_stage_code,
        field_code: item.field_code
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          this.getData()
        }
      }).catch(err => {
        console.error(err);
      })
    },


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
    maint(item){
      console.log("item",item)
      let that = this;
      if(item.field_type == "日期"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_date.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }

      if(item.field_type == "下拉框"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_select.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }

      if(item.field_type == "文本"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_text.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }

      if(item.field_type == "数字"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_number.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }

      if(item.field_type == "联系方式"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_contact.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }

      if(item.field_type == "单选框"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_radio.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }


      if(item.field_type == "文件"){
        that.$dataBus.bindCallBackMethod(that, that.fun, {});
        that.$dialog.open({
          that: that,
          title: "维护",
          toRequest: {
            url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_edit_item_file.json",
            params: {
              litigation_stage_code:item.litigation_stage_code,
              field_code:item.field_code,
              field_name:item.field_name,
              field_group:item.field_group,
              is_required:item.is_required,
              default_value:item.default_value,
              field_date_type:item.field_date_type
            }
          },
          width: "75%"
        })
      }




    },


    add() {
      let that = this;
      that.$dataBus.bindCallBackMethod(that, that.fun, {});
      that.$dialog.open({
        that: that,
        title: "新增",
        toRequest: {
          url: "/views/cs/paramManage/template/lawTemplate/lawTemplate_add_item.json",
          params: {
            litigation_stage_code: that.cParentParams.litigation_stage_code
          }
        },
        width: "75%"
      })


    },

    fun() {
      console.log(11111)
      this.getData()
      this.$dialog.close()

    },

    getData() {
      this.getDictList("E_LAW_STAGE_FILED_TYPE", "typeList");
      this.messageData = [];
      this.payData = [];
      this.otherData = [];
      this.remindData = [];

      let params = {
        servicecode: "cb0077",
        appId: "cbOnl",
        coll_kind: "02",
        litigation_stage_code: this.cParentParams.litigation_stage_code
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {

          res.data.forEach((item, index) => {
            this.typeList.forEach((ele, index) => {
              if (item.field_type == ele.dictId) {
                item.field_type = ele.dictName
              }
            })
          })

          console.log("jiekou", res.data)
          res.data.forEach((item, index) => {
            if (item.field_group == 'M') {
              this.messageData.push(item)
              console.log(item.default_value)
            }
            if (item.field_group == 'F') {
              this.payData.push(item)
            }
            if (item.field_group == 'R') {
              this.remindData.push(item)
            }
            if (item.field_group == 'O') {
              this.otherData.push(item)
            }


          });

        }
      }).catch(err => {
        console.error(err);
      })
    },
  }
};
</script>

<style lang="less" scoped>
/deep/.el-collapse-item__content {
  padding: 5px !important;

}

/deep/.el-collapse-item {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.24) 0px 2px 16px 0px;


}

/deep/.el-collapse-item__header {
  padding: 0 10px 0 20px !important;
}


/deep/.el-form-item__content{
  text-align: left !important;
}
.eltable {
  width: 100%;
  margin: 0 !important;
}
.coll{
  position: relative;
}
/deep/.el-table {
  margin: 0 !important
}

.sx{
  width: 3px;
  height: 18px;
  background-color: rgb(36, 135, 221);
  position: absolute;
  top:10px;
  left: 12px;
}

.addBtn {
  text-align: left;
  margin: 0 5px 5px 5px;
}
</style>
