<template>
  <div class="content-box">
    <div class="class-title">
      <el-button type="success" plain @click.prevent="openAddDialog"
        >+{{ $i18ns("login.NewLoginStyle") }}</el-button
      >
    </div>
    <hr class="hr-class" />
    <div class="item-content">
      <div v-for="(item, index) in layoutData" :key="index" class="item">
        <el-tooltip
          class="item-tip"
          effect="dark"
          :content="$i18ns('login.styleName') + item.module"
          placement="bottom"
        >
          <el-image :src="item.card_img" fit="fit" class="item-img"></el-image>
        </el-tooltip>
        <div class="btn-bar">
          <el-switch
            class="switch"
            style="display: block"
            v-model="item.enable_ind"
            active-color="#13ce66"
            inactive-color="#d4d3d3"
            :active-text="$i18ns('login.Enable')"
            :inactive-text="$i18ns('login.Disable')"
            @change="selectModule(item)"
          >
          </el-switch>
          <el-button
            type="danger"
            icon="el-icon-delete"
            class="del-btn"
            plain
            v-if="item.module !== 'login_0'"
            :disabled="item.enable_ind"
            @click="delItem(item)"
          ></el-button>
        </div>
      </div>
    </div>
    <!-- 开关开启之前先输入系统名称 -->
    <el-dialog
      :title="$i18ns('login.sysNameEdit')"
      class="sys-dialog"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="cancelDialog"
    >
      <el-form ref="form" :model="formSystem" :rules="rules">
        <el-form-item
          :label="$i18ns('login.sysNameZh')"
          :label-width="formLabelWidth"
          prop="title_Zhname"
        >
          <el-input
            v-model="formSystem.title_Zhname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$i18ns('login.sysNameEn')"
          :label-width="formLabelWidth"
          :required="formSystem.title_Zhname ? true : false"
          prop="title_Enname"
        >
          <el-input
            v-model="formSystem.title_Enname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">{{
          $i18ns("confirmCancel")
        }}</el-button>
        <el-button type="primary" @click="dialogClick">{{
          $i18ns("confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {},
  data() {
    var enRequired = (rule, value, callback) => {
      if (this.formSystem.title_Zhname !== "") {
        if (value === "") {
          callback(new Error(this.$i18ns("login.errorSysNameEn")));
        } else {
          callback();
        }
      }
    }; // 输入中文系统名称时，英文必输
    return {
      layoutData: [],
      tempEnableMoudel: "", //记录开启项目，禁止在已打开项目上操作
      flagModel: {}, // 记录选中模板
      dialogFormVisible: false, // 对话框关闭
      formLabelWidth: "150px",
      formSystem: {
        // 启用之前输入系统名称表单
        title_Zhname: "",
        title_Enname: ""
      },
      flagClose: false, // 提交就开关启用标识，防止dialog的close回调重置
      rules: {
        title_Zhname: [
          {
            max: 50,
            message: this.$i18ns("login.errorSysNameZh"),
            trigger: "blur"
          }
        ],
        title_Enname: [{ validator: enRequired, trigger: "blur" }]
      }
    };
  },
  watch: {},
  created() {
    console.log("父类传过来的参数 cMeta", this.cMeta);
    console.log("父类传过来的参数 cParentParams", this.cParentParams);
    console.log("父类传过来的参数 cParentMeta", this.cParentMeta);
    console.log("父类传过来的参数 cParentScope", this.cParentScope);
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {},
  methods: {
    //请求登录模版数据
    initData() {
      let that = this;
      let loading = Loading.service();
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ct2604"
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("请求 ct2604 回调----》", response.data);
          this.layoutData = response.data.info;
          //遍历数据，将是否启动开关 1 0 转换成boolean
          this.layoutData.forEach(item => {
            item.enable_ind = item.enable_ind === "1";
            if (item.enable_ind) that.tempEnableMoudel = item.module;
          });
          //对数据进行排序
          this.layoutData = this.layoutData.sort(
            that.compareObjectByProp("module", "desc")
          );
        } else {
          this.$message({ message: response.message, type: "error" });
        }
        loading.close();
      });
    },
    //选择打开后上传后台并将其他模版关闭
    selectModule(selectItem) {
      this.flagModel = Object.assign(this.flagModel, selectItem); // 数据拷贝

      //如果样式已经是启用状态，点击无效提示不可关闭
      if (this.tempEnableMoudel === selectItem.module) {
        selectItem.enable_ind = true;
        this.$message.warning(this.$i18ns("login.TypeEnabledCannotTurned"));
        return;
      }
      // 进行表单编辑
      this.dialogFormVisible = true;
    },
    // 系统名称维护
    cancelDialog() {
      this.dialogFormVisible = false;
      if(this.flagClose) {
        return
      }else {
        this.layoutData.forEach(item => {
          if (this.flagModel.template_id === item.template_id)
            item.enable_ind = false;
        });
        this.reset();
      }
        
    },
    dialogClick() {
      // 提交校验表单
      if(this.formSystem.title_Zhname){
        this.$refs.form.validate(valid => {
          if (valid) {
            let init_url = "/SUMP/call/RPCCall";
            let init_req = {
              servicecode: "ct2605",
              template_id: this.flagModel.template_id,
              title_Zhname: this.formSystem.title_Zhname,
              title_Enname: this.formSystem.title_Enname
            };

            this.$http.invokeAPI(init_url, "post", init_req).then(response => {
              if (response.code === "200") {
                this.tempEnableMoudel = this.flagModel.module;
                this.layoutData.forEach(item => {
                  if (this.flagModel.template_id !== item.template_id)
                    item.enable_ind = false;
                });
                this.$message.success(
                  `${this.$i18ns("login.EnableLoginStyle")}${
                    this.flagModel.module
                  }`
                );
                this.dialogFormVisible = false;
              } else {
                this.$message({ message: response.message, type: "error" });
                //请求失败时，需要将原来启动的开关复位关上
                this.layoutData.forEach(item => {
                  if (this.flagModel.template_id === item.template_id)
                    item.enable_ind = false;
                });
              }
            });
            this.flagClose = true;
            this.reset();
          } else {
            this.$message({
              type: "warning",
              message: this.$i18ns("login.errorSysNameEn")
            });
          }
        });
      }else {
        let init_url = "/SUMP/call/RPCCall";
        let init_req = {
          servicecode: "ct2605",
          template_id: this.flagModel.template_id,
          title_Zhname: this.formSystem.title_Zhname,
          title_Enname: this.formSystem.title_Enname
        };

        this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            this.tempEnableMoudel = this.flagModel.module;
            this.layoutData.forEach(item => {
              if (this.flagModel.template_id !== item.template_id)
                item.enable_ind = false;
            });
            this.$message.success(
              `${this.$i18ns("login.EnableLoginStyle")}${
                this.flagModel.module
              }`
            );
            this.dialogFormVisible = false;
          } else {
            this.$message({ message: response.message, type: "error" });
            //请求失败时，需要将原来启动的开关复位关上
            this.layoutData.forEach(item => {
              if (this.flagModel.template_id === item.template_id)
                item.enable_ind = false;
            });
          }
        });
        this.reset();
        this.flagClose = true;
      }
      
    },
    // 取消
    reset() {
      this.formSystem = {
        title_Zhname: "",
        title_Enname: ""
      };
      this.$nextTick(() => {
        this.$refs['form'].resetFields()
      })
    },
    //打开新增登录样式窗口
    openAddDialog() {
      const option = {
        toRequest: {
          url: "@loginModuleAdd",
          method: "get",
          params: {}
        },
        width: "40%",
        title: this.$i18ns("login.NewLoginStyle"),
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.bringCardBack, option);
      this.$dialog.open(option);
    },
    //登录样式窗口回调数据
    bringCardBack(formItem, returnData) {
      console.log("卡片模版回来回调returnData", returnData);
      //刷新数据
      this.initData();
    },
    //删除样式
    delItem(selectItem) {
      let that = this;
      that
        .$confirm(
          this.$i18ns("login.ConfirmDeleteLoginStyle"),
          this.$i18ns("提示"),
          {
            confirmButtonText: this.$i18ns("确定"),
            cancelButtonText: this.$i18ns("取消"),
            type: "warning"
          }
        )
        .then(() => {
          let init_url = "/SUMP/call/RPCCall";
          let init_req = {
            servicecode: "ct2607",
            template_id: selectItem.template_id
          };
          that.$http.invokeAPI(init_url, "post", init_req).then(response => {
            if (response.code === "200") {
              console.log("请求 ct2607 删除操作----》", response.data);
              that.$message({
                type: "success",
                message: this.$i18ns("login.successfullyDelete")
              });
              //重新刷新数据
              that.initData();
            } else {
              that.$message({ message: response.message, type: "error" });
            }
          });
        });
    },
    //快速排序函数
    compareObjectByProp(prop1, prop2) {
      return function compareObject(obj1, obj2) {
        //取出第一列的值。
        let code1 = obj1[prop1];
        let code2 = obj2[prop1];
        //根据属性值的类型，可能需要进行一下相应的判断。
        //如果数字的话，就转换成数字，进行数字之间的比较。 如果是数字的话，要两个都是数字。 一个数字，另外一个是字符串，那么数字只是数字型的字符串，类型并不是数字。
        if (!isNaN(Number(code1)) && !isNaN(Number(code2))) {
          code1 = Number(code1);
          code2 = Number(code2);
        }
        //取出第二列的值。
        let code3 = obj1[prop2];
        let code4 = obj2[prop2];
        //根据属性值的类型，可能需要进行一下相应的判断。
        //如果数字的话，就转换成数字，进行数字之间的比较。 如果是数字的话，要两个都是数字。 一个数字，另外一个是字符串，那么数字只是数字型的字符串，类型并不是数字。
        if (!isNaN(Number(code3)) && !isNaN(Number(code4))) {
          code3 = Number(code3);
          code4 = Number(code4);
        }
        if (code1 < code2) {
          //升序和降序 写在方法里面，当然，也可以通过参数传入进来。
          return -1;
        } else if (code1 > code2) {
          return 1;
        } else {
          //return code3-code4;
          return code4 - code3;
        }
      };
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
.content-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.class-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.class-title {
  width: 95%;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 32px;
  color: #404cfa;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.hr-class {
  width: 95%;
  height: 1px;
  color: #7f7f7f;
}
.item-content {
  width: 95%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1vw;
}
.item-img {
  width: 37vw;
  height: 37vh;
  cursor: pointer;
  transition: all 0.5s;
  img {
    width: 100%;
    height: 100%;
  }
}
.item-img:hover {
  //鼠标悬停时激活
  transition: 0.5s; //动画过渡的更加顺滑
  transform: scale(1.1); //放大倍数
}
.btn-bar {
  position: relative;
  margin: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch {
  color: #d4d3d3;
}
.del-btn {
  position: absolute;
  right: 0px;
  top: -5px;
}
</style>
