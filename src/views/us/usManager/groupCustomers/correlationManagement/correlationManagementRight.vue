<template>
  <div class="menu-form" v-show="showForm">
    <div class="menu-form--title">{{title}}</div>
    <div class="tabs" v-if="showFarther">
      <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="客户信息" name="clientInformation">
          <to-json :params="parentData" :toUrl="clientInformationFatherUrl"></to-json>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="tabs" v-if="showSon">
      <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="客户信息" name="clientInformation">
          <to-json :params="parentData" :toUrl="clientInformationFatherUrl"></to-json>
        </el-tab-pane>
        <el-tab-pane label="集团客户关系" name="groupRelations">
          <to-json :params="parentData" :toUrl="groupRelationsUrl"></to-json>
        </el-tab-pane>
      </el-tabs>
    </div>



  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import * as _ from "lodash";
  import {
    EventBus
  } from "./Bus";
  import {
    showList,
    rules
  } from "./constant";

  export default {
    name: "MenuManagerRight",
    data() {
      return {
        showForm: false,
        showFarther: false,
        showSon: false,
        title: "",
        parentData: '',
        clientInformationFatherUrl: "/views/us/usManager/groupCustomers/correlationManagement/client_information.json",
        groupRelationsUrl: "/views/us/usManager/groupCustomers/correlationManagement/group_relations.json",
        activeName: 'clientInformation',
      }
    },
    mounted() {
      EventBus.$on("root", (root) => {
        this.title = "根目录菜单";
        this.showForm = false;
      })
      EventBus.$on("father", (menuInfo) => {
        this.title = menuInfo.cust_name;
        this.parentData = menuInfo;
        console.log("father1111111111111111111");
        this.showForm = true;
        this.showFarther = true;
        this.showSon = false;
        this.activeName = 'clientInformation';
        // this.InitData()
      });
      EventBus.$on("son", (menuInfo) => {
        console.log("son111111111111111111111111");
        this.title = menuInfo.cust_name;
        this.parentData = menuInfo
        this.showForm = true;
        this.showFarther = false;
        this.showSon = true;
        this.activeName = 'clientInformation';
      });
    },
    methods: {
      InitData() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/icmcall/icmRPCCall";
        // request_map["trantp"] = "SELECT";
        request_map["servicecode"] = "IUMSCUTS0030";
        request_map["cust_no"] = that.parentData.cust_no;
        request_map["custup"] = that.parentData.custup;
        request_map["gropid"] = that.parentData.gropid;
        request_map["trantp"] = 'SELECT';
        MyAxios.invokeAPI(request_url, "post", request_map).then(res => {
          console.log('IUMSCUTS0030--SELECT---then', res);
          if (res && res.code === "200") {
            // this.treeData = this.menuDataHandle(res.data.menu.children);
            this.treeData.push(res.data.menu);
            // that.$nextTick(() => {
            //   // treeBox 元素的ref   value 绑定的node-key
            //   that.$refs.tree.setCurrentKey(that.treeData.children[0].cust_no);
            //   EventBus.$emit("modifyMenu", that.treeData.children[0]);
            // });
          }
        }).catch(err => {
          console.error(err);
        });
      },
      /**
       * 表单提交
       * @param formName 表单form值
       */
      submit(formName) {
        let that = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            let request_map = {}
            let request_url = "/SUMP/call/RPCCall";
            if (that.type === "edit") {
              request_map["servicecode"] = "ct2055"; //修改
              request_map["operater_ind"] = "M";
            } else {
              request_map["servicecode"] = "ct2054"; //新增
            }
            request_map["menu_id"] = that.ruleForm.menu_id;
            request_map["menu_code"] = that.ruleForm.menu_code;
            request_map["menu_desc"] = that.ruleForm.menu_desc;
            request_map["menu_upper_id"] = that.ruleForm.menu_upper_id;
            request_map["menu_upper_name"] = that.ruleForm.menu_upper_name;
            request_map["page_display_scene"] = that.ruleForm.page_display_scene;
            request_map["page_id"] = that.ruleForm.page_id;
            request_map["serial"] = that.ruleForm.serial;
            request_map["menu_show_ind"] = that.ruleForm.menu_show_ind;
            request_map["menu_group"] = that.ruleForm.menu_group;
            that.$http.invokeAPI(request_url, "post", request_map).then(response => {
              if (response.code === "200") {
                if (response.comm_rsp.sys_erortx === 'SUCCESS') {
                  that.$emit('refresh', '');
                  that.$message({
                    type: 'success',
                    message: that.type === "modifyMenu" ? "修改成功" : "新增成功"
                  });
                } else {
                  that.$message({
                    type: 'error',
                    message: response.message,
                  });
                }
              } else {
                MyMessage({
                  message: response.message,
                  type: 'error'
                });
              }
            });
          } else {
            this.$message({
              type: 'warning',
              message: '校验不通过'
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>
<style lang="less" scoped>
  .menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .menu-form--title {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      duty_type: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        duty_type: absolute;
        left: 0;
        top: 8px;
        background: #727df8;
      }
    }
  }

  .menu-footer {
    text-align: center;
  }

  .tabs {
    width: 100%;
    height: 100%;
  }

  .tabs_table {
    width: 99%;
    height: 100%;
  }
</style>
