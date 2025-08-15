<template>
  <div class="dialog-box">
    <div class="setting">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="auto"
        class="setting-form"
      >
        <el-row>
          <el-col :span="7.5">
            <el-form-item
              :label="$i18ns('digitalScreen.template_name') + ':'"
              prop="template_name"
              class="upload-item"
            >
              <el-input
                v-model="ruleForm.template_name"
                class="input-item"
                :placeholder="$i18ns('digitalScreen.template_name')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7.5">
            <el-form-item :label="$i18ns('digitalScreen.user_role') + ':'" prop="scope_range_tags">
              <div class="tags-item">
                <el-tag
                  v-for="(tag, index) in ruleForm.scope_range_tags"
                  :key="index"
                  closable
                  @close="handleClose(tag)"
                  :class="index === 0 ? 'tage-margin5' : ''"
                >
                  {{ tag.role_name }}
                </el-tag>
              </div>
              <el-button
                type="primary"
                size="medium"
                @click="openManagerDialog"
                class="choose-btn"
                plain
                >{{ $i18ns("选择") }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item :label="$i18ns('digitalScreen.business_type') + ':'" prop="busi_card_type">
              <el-select v-model="ruleForm.busi_card_type">
                <el-option
                  v-for="(item, index) in busiList"
                  :key="index"
                  :label="item.dictId + '-' + item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7.5">
            <el-form-item :label="$i18ns('digitalScreen.is_edit') + ':'" prop="is_edit">
              <el-radio-group v-model="ruleForm.is_edit" class="radio-group">
                <el-radio :label="'0'">{{ $i18ns("ZCm") }}</el-radio>
                <el-radio :label="'1'">{{ $i18ns("piv") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7.5">
            <el-form-item
              :label="$i18ns('digitalScreen.card_selection') + ':'"
              prop="layoutArray"
              class="upload-item"
            >
              <el-button
                type="primary"
                size="medium"
                @click="openCardDialog"
                class="choose-btn"
                plain
                :disabled="
                  ruleForm.scope_range_tags.length === 0 &&
                    ruleForm.busi_card_type
                "
                >{{ $i18ns("选择") }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7.5">
            <el-form-item
              :label="$i18ns('digitalScreen.chart_screenshot') + ':'"
              prop="module_img"
              class="upload-item"
            >
              <el-image
                v-if="ruleForm.module_img !== ''"
                class="image-class"
                :src="ruleForm.module_img"
                fit="scale-down"
              >
              </el-image>
              <el-button
                :type="ruleForm.module_img === '' ? 'warning' : 'primary'"
                plain
                @click="saveImage"
                :disabled="this.ruleForm.i === ''"
                >{{ ruleForm.module_img === "" ? $i18ns("digitalScreen.screenshot") : $i18ns("刷新") }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7.5">
            <el-form-item :label="$i18ns('digitalScreen.is_enabled') + ':'" prop="is_enable">
              <el-radio-group
                v-model="ruleForm.is_enable"
                class="radio-group"
                :disabled="ruleForm.module_img === ''"
              >
                <el-radio :label="'0'">{{ $i18ns("ZCm") }}</el-radio>
                <el-radio :label="'1'">{{ $i18ns("piv") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7.5">
            <el-form-item :label="$i18ns('digitalScreen.is_default') + ':'" prop="is_default">
              <el-radio-group
                v-model="ruleForm.is_default"
                class="radio-group"
                :disabled="ruleForm.module_img === ''"
              >
                <el-radio :label="'0'">{{ $i18ns("ZCm") }}</el-radio>
                <el-radio :label="'1'">{{ $i18ns("piv") }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item label="">
              <el-button type="info" plain @click="closeNavTab">{{
                $i18ns("取消")
              }}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="">
              <el-button type="primary" plain @click="saveCard">{{
                $i18ns("保存")
              }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="preview">
      <templateContent
        :isEditState="true"
        ref="templateContent"
      ></templateContent>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import templateContent from "./components/templateContent.vue";
import { Loading } from "element-ui";

export default {
  name: "dynamicScreemModuleEdit",
  components: {
    templateContent
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  data() {
    return {
      loading: "", //读取框
      msgSample: "", //报文示例
      ruleForm: {
        template_id: "", //卡片ID
        template_name: "", //标题
        layoutArray: [], //模版中的图表
        scope_range: "", //适用角色名称编码
        scope_range_str: "", //适用角色名称
        scope_range_tags: [], //适用角色名称标签
        module_img: "", //图表截图
        is_enable: "", // 是否启用
        remark: "", // 是否启用
        is_default: "", //是否默认
        is_edit: "", //是否可编辑
        busi_card_type: "" // 业务类型
      },
      rules: {
        moduleName: [
          {
            required: true,
            message: this.$i18ns('请输入'),
            trigger: "blur"
          }
        ],
        module_img: [
          {
            required: true,
            message: this.$i18ns('请保存'),
            trigger: "blur"
          }
        ],
        scope_range_str: [
          {
            required: true,
            message: this.$i18ns('请选择'),
            trigger: "blur"
          }
        ],
        layoutArray: [
          {
            required: true,
            message: this.$i18ns('请选择'),
            trigger: "blur"
          }
        ]
      },
      busiList: [] // 业务类型list
    };
  },
  created() {
    this.getDictList("CT_E_BUSI_CARD_TYPE", "busiList");
  },
  mounted() {

    if (this.cParentParams && this.cParentParams.template_id) {
      this.ruleForm.template_id = this.cParentParams.template_id;
      this.ruleForm.template_name = this.cParentParams.template_name;
      this.ruleForm.scope_range = this.cParentParams.role_id;
      this.ruleForm.scope_range_str = this.cParentParams.role_name;
      this.ruleForm.is_enable = this.cParentParams.is_enable;
      this.ruleForm.is_edit = this.cParentParams.is_edit;
      this.ruleForm.is_default = this.cParentParams.is_default;
      this.ruleForm.scope_range_tags = [
        {
          role_name: this.cParentParams.role_name,
          role_id: this.cParentParams.role_id
        }
      ];
      this.ruleForm.module_img = this.cParentParams.card_img;
      this.ruleForm.remark = this.cParentParams.remark;
      this.ruleForm.busi_card_type = this.cParentParams.busi_card_type;
      // 布局数据处理
      let str = this.cParentParams.card_group.replace(/(=)(?=,|})/g, "$1 ");
      let newstr = str.replace(/(\w+)=([^,\]}]+)/g, '"$1":"$2"');
      this.ruleForm.layoutArray = JSON.parse(newstr);

      this.ruleForm.layoutArray.forEach(item => {
        item.w = Number(item.w);
        item.h = Number(item.h);
        item.x = Number(item.x);
        item.y = Number(item.y);
        item.moved = Boolean(item.moved);
      });
      this.$nextTick(() => {
        this.$bus.emit("refreshMapData", this.ruleForm.layoutArray);

        this.$bus.emit("refreshCardData", this.ruleForm.layoutArray);
      });
    }
    //接受到图表截图的异步回调
    this.$bus.on("getSaveImage", imgBase64 => {
      this.loading.close();
      this.ruleForm.module_img = imgBase64;
    });

    // setTimeout(() => {
    // }, 1000);
    // 接收删除卡片回调
    this.$bus.on("changeFormLayout", this.changeFormLayout);
    // 接收复位清空模板布局回调
    this.$bus.on("operatorInteraction", operatorType => {
      switch (operatorType) {
        case "layout":
          break;
        case "charts":
          break;
        case "reset":
          this.ruleForm.layoutArray = [];
          break;
      }
    });
  },
  watch: {
    //监听charts数据改变进行刷新
    ruleForm: {
      handler(value) {
        this.$refs.templateContent.setModuleLayout(this.ruleForm);
      },
      immediate: false, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
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
     * 打开弹窗适用角色查询
     */
    openManagerDialog() {
      const option = {
        toRequest: {
          url:
            "/views/dynamicScreem/dynamicScreemManage/dynamic_screem_module_manage/dynamic_screem_module_manager_lookup.json",
          method: "get",
          params: {}
        },
        width: "70%",
        title: this.$i18ns('digitalScreen.get_role'),
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      this.ruleForm.scope_range_tags = [];
      this.ruleForm.scope_range_tags.push(returnData);
    },
    //tags删除事件
    handleClose(tag) {
      this.ruleForm.scope_range_tags = [];
    },
    //打开图标卡片选择
    openCardDialog() {
      const option = {
        toRequest: {
          url:
            "/views/dynamicScreem/dynamicScreemManage/dynamic_screem_module_manage/dynamic_screem_card_lookup.json",
          method: "get",
          params: {
            role_id: this.ruleForm.scope_range,
            busi_card_type: this.ruleForm.busi_card_type
          }
        },
        width: "65%",
        height: "80%",
        title: this.$i18ns('digitalScreen.get_screen_card'),
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.bringCardBack, option);
      this.$dialog.open(option);
    },
    //图表卡片选择回带数据
    bringCardBack(formItem, returnData) {
      //遍历判断是否有已添加过的图表
      returnData.selectedData.forEach(cardItem => {
        let index = this.ruleForm.layoutArray.findIndex(
          x => x.card_id === cardItem.card_id
        );
        if (index > -1) {
          this.$message({ message: this.$i18ns('digitalScreen.card_repetition'), type: "warning" });
          return;
        }

        let temp = {
          card_id: cardItem.card_id, //卡片ID
          titleName: cardItem.card_name, //标题
          unitName: cardItem.card_title, //单位
          i: cardItem.card_id, //卡片ID
          card_i_name: cardItem.card_i_name, //卡片名称
          x: cardItem.card_x ? parseInt(cardItem.card_x) : 0, //模板X坐标位置 1表格为1单位
          y: cardItem.card_y ? parseInt(cardItem.card_y) : 0, //模板Y坐标位置 1表格为1单位
          // w: cardItem.card_w?parseInt(cardItem.card_w):6, //模板宽度 1表格为1单位
          // h: cardItem.card_h?parseInt(cardItem.card_h):4, //模板高度 1表格为1单位
          w: 4, //模板宽度 1表格为1单位
          h: 2, //模板高度 1表格为1单位
          servicecode: cardItem.card_service_code, //接口请求
          busi_card_type: cardItem.busi_card_type, //业务类型
          branch_id: cardItem.branch_id, //机构
          gear: cardItem.gear, // 档位
          gear_interval: cardItem.gear_interval, // 间隔
          area1: cardItem.area1, // 区域一
          area2: cardItem.area2, // 区域二
          area3: cardItem.area3, // 区域三
          attribute1: cardItem.attribute1, // 属性一
          attribute2: cardItem.attribute2, // 属性二
          attribute3: cardItem.attribute3, // 属性三
          area_code: cardItem.area_code, // 地图编码
        };
        this.ruleForm.layoutArray.push(temp);
      });

      this.$nextTick(() => {
        this.$bus.emit('refreshMapData',this.ruleForm.layoutArray)

        this.$bus.emit("refreshCardData", this.ruleForm.layoutArray);
      });
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      this.$dataBus.doCallBack(this, {});
    },

    //保存卡
    saveCard() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // let scope_range = []; //适用角色名称编码
          // let scope_range_str = []; //适用角色名称编码
          // this.ruleForm.scope_range_tags.forEach(item => {
          //   scope_range.push(item.role_id.toString());
          //   scope_range_str.push(item.role_name);
          // });

          let params = {
            servicecode: "ct2609",
            template_id: this.ruleForm.template_id, //模板编号
            template_name: this.ruleForm.template_name, //模板名称
            role_id: this.ruleForm.scope_range, //角色id
            role_name: this.ruleForm.scope_range_str, //角色id
            card_group: this.ruleForm.layoutArray, //卡片组
            card_img: this.ruleForm.module_img, //卡片图片
            card_operate_flg: 2, //1角色维护 2用户维护
            is_enable: this.ruleForm.is_enable, //是否启用 1是 0否
            remark: this.ruleForm.remark, //备注
            is_default: this.ruleForm.is_default, //是否默认模板 1是 0否
            is_edit: this.ruleForm.is_edit, //是否可编辑 1是 0否
            busi_card_type: this.ruleForm.busi_card_type //业务类型
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                this.$message({
                  type: "success",
                  message: this.$i18ns(res.message)
                });
                //关闭当前对话框
                this.closeNavTab();
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
    },
    //保存截图
    saveImage() {
      this.loading = Loading.service();
      this.$message({
        type: "success",
        message: this.$i18ns('digitalScreen.screenshot_message')
      });
      this.$refs.templateContent.getSaveImage();
    },
    // 处理删除的卡片，同步layout布局
    changeFormLayout(layout) {
      this.ruleForm.layoutArray = layout;
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload-item {
  width: 100%;
}
.input-item {
  width: 180px;
  height: 40px;
}
.setting {
  flex: 2;
  height: 100%;
  position: relative;
  overflow-y: scroll;
}
.setting-form {
  margin-top: 20%;
  position: relative;
  width: 90%;
}
.preview {
  flex: 8;
  height: 100%;
  background-color: rgb(11, 8, 53);
  box-shadow: 0px 2px 5px rgba(18, 32, 231, 0.788);
  overflow: hidden;
}
.img-class {
  height: 100px;
  margin-left: 10px;
}
/deep/.el-select-dropdown__wrap
  .el-select-dropdown__list
  .el-select-dropdown__item {
  height: 110px !important;
}
/deep/ .el-form-item__error {
  width: 100px !important;
}

.choose-btn {
  width: 70px;
  margin-top: 2px;
  margin-left: 2px;
  margin-bottom: 10px;
}
.tags-item {
  width: 230px;
  display: flex;
  flex-wrap: wrap;
}
/deep/ .el-tag + .el-tag {
  margin-left: 0px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.tage-margin5 {
  margin-right: 5px;
  margin-bottom: 5px;
}
.image-class {
  width: 200px;
  height: 200px;
}
</style>
