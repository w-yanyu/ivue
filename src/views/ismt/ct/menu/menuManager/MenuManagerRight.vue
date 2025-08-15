<template>
  <div class="menu-form" v-show="showForm">
    <div class="menu-form--title">{{ title }}</div>
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单编码" prop="menu_code">
              <el-input v-model="ruleForm.menu_code" placeholder="请输入菜单编码" :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menu_desc">
              <el-input v-model="ruleForm.menu_desc" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级菜单id" prop="menu_upper_id">
              <el-input v-model="ruleForm.menu_upper_id" placeholder="请输入父级菜单名称" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级菜单名称" prop="menu_upper_name">
              <el-input v-model="ruleForm.menu_upper_name" placeholder="请输入父级菜单名称" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单id" prop="menu_id">
              <el-input v-model="ruleForm.menu_id" placeholder="请输入菜单id" :disabled="type==='edit'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单组" prop="menu_group">
              <el-input v-model="ruleForm.menu_group" :disabled="type!='mainAdd'" placeholder="请输入菜单组"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单类型" prop="menu_type">
              <el-select v-model="ruleForm.menu_type" :disabled="true" placeholder="请选择菜单类型">
                <el-option
                  v-for="(item, i) in menuTypeList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="page_display_scene">
              <el-input v-model="ruleForm.page_display_scene" placeholder="请输入菜单图标"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单url" prop="page_id">
              <el-input v-model="ruleForm.page_id" placeholder="请输入菜单url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单序号" prop="serial">
              <el-input v-model="ruleForm.serial" placeholder="请输入菜单序号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否显示" prop="menu_show_ind">
              <el-select v-model="ruleForm.menu_show_ind" placeholder="请选择是否显示">
                <el-option
                  v-for="(item, i) in showList"
                  :key="i"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="submit('ruleForm')">提交</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">{{$i18ns('重置')}}</el-button>
          </el-col>

        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import {EventBus} from "./Bus";
import {showList, rules} from "./constant";

export default {
  name: "MenuManagerRight",
  data() {
    return {
      menuTypeList: [],//菜单类型字典
      ruleForm: {
        menu_id: "",
        menu_code: "",
        menu_desc: "",
        menu_upper_id: "",
        menu_upper_name: "",
        page_display_scene: "",
        page_id: "",
        serial: null,
        menu_show_ind: "",
        menu_group: "",
        menu_type: "",
      },
      showForm: false,
      title: "",
      showList: showList,
      type: "",
      rules: {
        menu_code: [{required: true, message: '请输入菜单编码', trigger: 'blur'}],
        menu_upper_id: [{required: true, message: '请输入父类菜单id', trigger: 'blur'}],
        menu_desc: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
        menu_id: [{required: true, message: '请输入菜单id', trigger: 'blur'}],
        page_id: [{required: true, message: '请输入菜单URL', trigger: 'blur'}],
        menu_type: [{required: true, message: '请选择菜单类型', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.getDictList("CT_E_ROLESYL", "menuTypeList"); // 获取菜单类型字典
  },
  mounted() {
    EventBus.$on("addMainMenu", () => {
      this.title = "主菜单信息新增";
      this.type = "mainAdd";
      this.showForm = true;
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        menu_code: "",
        menu_desc: "",
        menu_id: "",
        menu_upper_id: "%",
        menu_upper_name: "%",
        page_display_scene: "",
        page_id: "####",
        serial: null,
        menu_show_ind: "",
        menu_type: "A",
        menu_group: "",
      }
    })
    EventBus.$on("addMenu", (menuInfo) => {
      this.title = "菜单信息新增";
      this.type = "add";
      this.showForm = true;
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        menu_id: "",//手输入
        menu_code: "",
        menu_desc: "",
        menu_upper_id: menuInfo.menu_id,
        menu_upper_name: menuInfo.menu_upper_name,
        page_display_scene: "",
        page_id: "",
        serial: null,
        menu_show_ind: "",
        menu_type: "A",
        menu_group: menuInfo.menu_group,
      }
    });
    EventBus.$on("addButton", (menuInfo) => {
      this.title = "按钮信息新增";
      this.type = "add";
      this.showForm = true;
      this.$refs.ruleForm.resetFields();
      this.ruleForm = {
        menu_id: "",//手输入
        menu_code: "",
        menu_desc: "",
        menu_upper_id: menuInfo.menu_id,
        menu_upper_name: menuInfo.menu_upper_name,
        page_display_scene: "",
        menu_type: "E",
        page_id: "",
        serial: null,
        menu_show_ind: "",
        menu_group: "",
      }
    });
    EventBus.$on("modifyMenu", (menuInfo) => {
      this.ruleForm.menu_id = menuInfo.menu_id;
      this.ruleForm.menu_code = menuInfo.menu_code;//菜单编号 上下级映射
      this.ruleForm.menu_desc = menuInfo.menu_desc;
      this.ruleForm.menu_upper_id = menuInfo.menu_upper_id;//% name不显示
      this.ruleForm.menu_upper_name = menuInfo.menu_upper_name;
      this.ruleForm.page_display_scene = menuInfo.page_display_scene;
      this.ruleForm.page_id = menuInfo.page_id;
      this.ruleForm.serial = menuInfo.serial;
      this.ruleForm.menu_show_ind = menuInfo.menu_show_ind;
      this.ruleForm.menu_type = menuInfo.menu_type;
      this.ruleForm.menu_group = menuInfo.menu_group;
      this.title = "菜单信息维护";
      this.type = "edit";
      this.showForm = true;
    });
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
            request_map["servicecode"] = "ct2055";//修改
            request_map["operater_ind"] = "M";
          } else {
            request_map["servicecode"] = "ct2054";//新增
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
          request_map["menu_type"] = that.ruleForm.menu_type;
          that.$http.invokeAPI(request_url, "post", request_map).then(response => {
            if (response.code === "200") {
              if (response.message === 'SUCCESS') {
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
    position: relative;
    line-height: 40px;

    &::before {
      content: "";
      width: 3px;
      height: 22px;
      display: block;
      position: absolute;
      left: 0;
      top: 8px;
      background: #727df8;
    }
  }
}

.menu-footer {
  text-align: center;
}

</style>
