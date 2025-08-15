<template>
  <div class="box">
    <div class="addBtn">
      <el-button @click="add" icon="el-icon-circle-plus-outline" type="primary">&nbsp;&nbsp;新增</el-button>
      <el-button @click="maint(item)" icon="el-icon-setting" v-if="typeList.data.length > 0" style="margin-left: 15px; "
                 type="primary">&nbsp;&nbsp;维护</el-button>
    </div>
    <el-collapse v-for="(item, index) in typeList.data" :key="index" v-model="activeNames">
      <el-collapse-item class="coll" :title="item.legal_node" :name="index">
        <el-row class="rw">
          <el-col :span="6" v-for="(ele, index) in typeList.data[index].legal_content" :key="index">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item :label="ele.field_name + ':'">
                <!-- <el-input style="width: 160px;" disabled="true" v-model="ele.field_value"></el-input> -->
                <span class="pjval">{{ ele.field_value }}</span>
              </el-form-item>

            </el-form>
          </el-col>

        </el-row>

        <el-button @click="del(item)" icon="el-icon-delete" style="margin-left: 8px;margin-top: 20px"
                   type="danger">&nbsp;&nbsp;删除</el-button>
      </el-collapse-item>
    </el-collapse>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
      <el-collapse v-for="(item, index) in typeList.data" :key="index" v-model="activeNames2">
        <el-collapse-item class="coll" :title="item.legal_node" :name="index">
          <el-row>
            <el-col :span="8" v-for="(ele, index) in typeList.data[index].legal_content" :key="index">
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item :label="ele.field_name">
                  <el-input style="width: 160px;" v-if="ele.field_type == 'TEXT'" v-model="ele.field_value"></el-input>
                  <el-select style="width: 160px;" v-if="ele.field_type == 'SELECT'" v-model="ele.field_value"  >
                    <el-option
                      v-for="selitem in ele.field_select_data"
                      :key="ele.field_select_data"
                      :label="ele.field_select_data"
                      :value="ele.field_select_data">
                    </el-option>
                  </el-select>
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    style="width: 160px;"
                    v-if="ele.field_type == 'DATE'"
                    v-model="ele.field_value"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sub">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数 field_type
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      activeNames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19],
      activeNames2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19],
      paydata: "1",
      typeList: {data:[]},
      dialogVisible: false,

    };
  },
  components: {

  },
  mounted() {
    this.search()
  },

  methods: {
    del(item) {

      console.log(item.legal_id)
      let params = {
        servicecode: "cb00107",
        appId: "cbOnl",
        litigation_stage_code: item.legal_id,
        case_id: this.cParentParams.case_id,

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {

        }
      }).catch(err => {
        console.error(err);
      })

      setTimeout(() => {
        this.search()
      }, 500);
    },
    sub() {
      let str = JSON.stringify(this.typeList)
      let params = {
        servicecode: "cb00102",
        appId: "cbOnl",
        litigation_stage_code: this.cParentParams.litigation_stage_code,
        case_id: this.cParentParams.case_id,
        page_id: "/views/cs/collManage/tcManage/collWorkbench/functionMenu/litigation/litigation_work_record.vue",
        litigation_registration_content: str,
        isJson: true
      }
      MyAxios.invokeAPI("/SUMP/cscall/icmRPCCall05", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {

        }
      }).catch(err => {
        console.error(err);
      })


      this.dialogVisible = false
    },

    maint() {
      this.dialogVisible = true
    },



    add() {
      let that = this;
      that.$dataBus.bindCallBackMethod(that, that.fun, {});
      that.$dialog.open({
        that: that,
        title: "新增",
        toRequest: {
          url: "/views/cs/collManage/tcManage/collWorkbench/functionMenu/litigation/litigation_stage_select.json",
          params: {
            litigation_stage_code: that.cParentParams.litigation_stage_code,
            case_id: that.cParentParams.case_id
          }
        },
        width: "75%"
      })
    },

    search(item) {

      let params = {
        servicecode: "cb00105",
        appId: "cbOnl",
        case_id: this.cParentParams.case_id
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          console.log("search接口if前",res.data != [],res.data == [],res.data)
          if(res.data.length != 0){
            let obj = JSON.parse(res.data[0].litigation_registration_content)
            console.log("0077", JSON.parse(res.data[0].litigation_registration_content))



            if(obj.data){
              this.typeList.data = obj.data
              console.log(this.typeList,"193")
            }else{
              this.typeList.data = obj
              console.log(this.typeList,"196")
            }

          } else if (res.data.length == 0) {
            this.typeList.data = []
          }
          console.log("删除后的list",this.typeList)

        }
      }).catch(err => {
        console.error(err);
      })
    },


    fun(data1, data2) {
      console.log("data1", data1, "data2", data2)
      this.search()
      this.$dialog.close()
    },

  }
};
</script>

<style lang="less" scoped>
.addBtn {
  text-align: left;
  margin: 20px 5px 5px 5px;
}

.el-drawer__body {
  overflow-x: hidden; // 隐藏x轴滚动条
  overflow-y: auto;
  height: calc(100vh - 120px); // 用屏幕可视高度减去 头部与底部的高度，就是中间元素的高度
}

.dialog-footer {
  text-align: center;
}

/deep/.rw .el-form-item__content {
  text-align: left !important;
}

/deep/.el-form-item__label {
  font-weight: bold !important;
  font-size: 14px !important;
  color: #333 !important;
}

/deep/.el-form-item {
  margin-bottom: 5px !important;
}

/deep/.el-form {
  padding: 0px 12px 0 12px !important;
}

.box {
  width: auto;
  margin: -30px 0px 0px -16px;
}
</style>
