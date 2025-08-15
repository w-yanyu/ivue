<template>
  <div>
    <el-alert
      title="当前产品未配置拓展参数"
      type="warning"
      v-if="paramsList.length === 0">
    </el-alert>
    <el-form ref="form" class="form-two-column" label-width="auto">
      <template>
        <el-row>
          <el-col
            :span="12"
            v-for="(item, index) in paramsList"
            :key="index">
            <el-form-item>
                <span slot="label">
                    {{ item.longname }}
                    <el-tooltip v-if="item.description" :content="item.description" placement="top">
                        <i class="el-icon-warning"></i>
                    </el-tooltip>
                </span>
              <el-input
                v-if="item.text_type === 'string'"
                v-model="item[item.attribute]"
                class="input"
              ></el-input>
              <el-select
                v-if="item.text_type === 'select'"
                v-model="item[item.attribute]"
                class="select"
              >
                <el-option
                  v-for="it in item.select_data"
                  :key="it.id"
                  :label="it.display_field"
                  :value="it.value_field"
                ></el-option>
              </el-select>
              <el-switch
                v-if="item.text_type === 'switch'"
                v-model="item[item.attribute]"
                :validate-event="false"
                :active-value="item.activeValue"
                :inactive-value="item.inactiveValue"
                :active-text="item.activeText"
                :inactive-text="item.inactiveText"
              ></el-switch>
              <el-time-picker
                v-if="item.text_type === 'timePicker'"
                v-model="item[item.attribute]"
                value-format="HH:mm:ss"
                class="input"
              ></el-time-picker>
              <el-select
                v-if="item.text_type === 'dynamicSelect'"
                v-model="item[item.attribute]"
                remote
                :remote-method="remoteFlow"
                :loading="loading"
                class="input"
              >
                <el-option
                  v-for="it in item.select_data"
                  :key="it.value_field"
                  :label="`${it.value_field}${it.display_field ? ' - ' + it.display_field : ''}`"
                  :value="it.value_field"
                ></el-option>
              </el-select>
              <el-select
                v-if="item.text_type === 'linkageSelect'"
                v-model="item[item.attribute]"
              >
                <el-option
                  v-for="it in item.select_data"
                  :key="it.value_field"
                  :label="it.display_field"
                  :value="it.value_field"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="item.text_type === 'datePicker'"
                v-model="item[item.attribute]"
                type="date"
                format="yyyyMMdd"
                value-format="yyyyMMdd"
                class="input"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div slot="footer" class="button" v-if="paramsList.length !== 0">
      <el-button type="primary" @click="onSubmit">
        保存
      </el-button>
      <el-button @click="selecDataPropertiesDialog = false">
        取消
      </el-button>
    </div>
  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  name: "prodParams",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      form: {},
      submitForm: {},
      paramsList: [],
      realList: []
    };
  },
  created() {
    this.initForm();
  },

  methods: {
    /**
     * 初始化表单参数
     */
    initForm() {
      let that = this;
      let params = {
        sale_prod_cd: that.cParentParams.prod_cd,
        // sale_prod_cd: '00000004',
        apply_no: that.cParentParams.apply_no,
        apply_type: that.cParentParams.apply_type,
        servicecode: 'ar0592'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          console.log("原始数据", res.data);
          let str = res.data.params_records;
          that.paramsList = JSON.parse(str.replaceAll("\"", '"'));
          let str1 = "";
          that.paramsList.forEach((item, index) => {
            str1 = item.select_data.toString()
            item.select_data = JSON.parse(str1.replaceAll("\"", '"'));
          })
          console.log("表单数据", that.paramsList);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    //保存
    onSubmit() {
      let that = this;
      let params = {
        apply_date: that.cParentParams.appl_date,
        sale_prod_cd: that.cParentParams.prod_cd,
        cust_name: that.cParentParams.cust_name,
        prin_cust_no: that.cParentParams.cust_id,
        apply_no: that.cParentParams.apply_no,
        // apply_date: "20210105",
        // sale_prod_cd: '00000004',
        // apply_no: '10900001',
        // cust_name: "左手",
        // prin_cust_no: "1000010",
        params_records: JSON.stringify(that.paramsList),
        servicecode: 'ar0593'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          MyMessage({
            message: res.message,
            type: 'success'
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item__content {
  position: relative;
}

.form-label-icon {
  position: absolute;
  left: -18px;
  top: 8px;
  z-index: 1;
}

.form-two-column {
  display: flex;
  flex-wrap: wrap;

  .el-form-item {
    width: 50%;
  }

  .el-form-item.full-row {
    width: 100%;
  }
}

.button {
  text-align: center;
}

.input {
  width: 220px !important;
}

.select {
  width: 220px !important;
}
</style>
