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
          <el-col>
            <el-form-item
              :label="$i18ns('digitalScreen.card_selection') + ':'"
              prop="card_i_name"
              class="upload-item"
            >
              <el-button
                type="primary"
                size="medium"
                @click="openCardDialog"
                class="choose-btn"
                plain
                >{{ $i18ns("选择") }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item
              :label="$i18ns('卡片名称') + ':'"
              prop="titleName"
              class="upload-item"
            >
              <el-input
                v-model="ruleForm.titleName"
                class="input-item"
                :placeholder="$i18ns('digitalScreen.card_name_example')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item :label="$i18ns('digitalScreen.subheading') + ':'" prop="unitName" class="upload-item">
              <el-input
                v-model="ruleForm.unitName"
                class="input-item"
                :placeholder="$i18ns('digitalScreen.example_unit')"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item :label="$i18ns('digitalScreen.user_role') + ':'" prop="scope_range_str">
              <div
                v-if="ruleForm.scope_range_tags.length > 0"
                class="tags-item"
              >
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
                v-else
                type="primary"
                size="medium"
                @click="openManagerDialog"
                class="choose-btn"
                plain
                >{{ $i18ns("选择") }}</el-button
              >
            </el-form-item>
          </el-col>

          <el-col v-if="ruleForm.scope_range_tags.length > 0">
            <el-button
              type="primary"
              size="medium"
              @click="openManagerDialog"
              class="choose-btn"
              plain
              >{{ $i18ns("选择") }}</el-button
            >
          </el-col>
        </el-row>

        <!-- 当卡片为地图时，数据展示信息start -->
        <el-collapse
          v-model="activeNames"
          @change="handleChange"
          v-if="ruleForm.card_i_name === 'cardMap3' || ruleForm.card_i_name === 'cardMap2'"
        >
          <el-collapse-item :title="$i18ns('digitalScreen.map_config_info')" name="1">
            <el-row>
              <el-col>
                <el-form-item :label="$i18ns('标题') + '1:'" prop="area1" class="upload-item">
                  <el-input
                    v-model="ruleForm.area1"
                    class="input-item"
                    placeholder="name1"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  :label="$i18ns('digitalScreen.data_source') + '1:'"
                  prop="attribute1"
                  class="upload-item"
                >
                  <el-input
                    v-model="ruleForm.attribute1"
                    class="input-item"
                    :placeholder="$i18ns('digitalScreen.interface_output')"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="$i18ns('标题') + '2:'" prop="area2" class="upload-item">
                  <el-input
                    v-model="ruleForm.area2"
                    class="input-item"
                    placeholder="name2"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  :label="$i18ns('digitalScreen.data_source') + '2:'"
                  prop="attribute2"
                  class="upload-item"
                >
                  <el-input
                    v-model="ruleForm.attribute2"
                    class="input-item"
                    :placeholder="$i18ns('digitalScreen.interface_output')"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="$i18ns('标题') + '3:'" prop="area3" class="upload-item">
                  <el-input
                    v-model="ruleForm.area3"
                    class="input-item"
                    placeholder="name3"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  :label="$i18ns('digitalScreen.data_source') + '3:'"
                  prop="attribute3"
                  class="upload-item"
                >
                  <el-input
                    v-model="ruleForm.attribute3"
                    class="input-item"
                    :placeholder="$i18ns('digitalScreen.interface_output')"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="$i18ns('digitalScreen.home_province') + ':'" prop="province">
                  <el-select
                    v-model="merchant.province"
                    :placeholder="$i18ns('digitalScreen.province_choose')"
                    @change="renderCity"
                    clearable
                  >
                    <el-option
                      v-for="item in provinceList"
                      :key="item.code"
                      :value="item.code"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="" prop="province">
                  <el-select
                    v-model="merchant.city"
                    :placeholder="$i18ns('digitalScreen.city_choose')"
                    v-if="citySelectAble"
                    clearable
                  >
                    <el-option
                      v-for="item in cityList"
                      :key="item.code"
                      :value="item.code"
                      :label="item.name"
                    >
                    </el-option>
                  </el-select>
                  <el-button
                    type="warning"
                    plain
                    @click="getmap"
                    >获取地图</el-button
                  >
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="$i18ns('digitalScreen.map_gear') + ':'" prop="gear" class="upload-item">
                  <el-input-number
                    class="input-item"
                    v-model="ruleForm.gear"
                    @change="handleChangeGear"
                    :min="0"
                    :max="5"
                    :step="1"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  :label="$i18ns('digitalScreen.map_gear_interval') + ':'"
                  prop="gear_interval"
                  class="upload-item"
                >
                  <el-input-number
                    class="input-item"
                    v-model="ruleForm.gear_interval"
                    @change="handleChangeInterval"
                    :min="0"
                    :step="0.1"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <!-- 当卡片为地图时，数据展示信息end -->

        <el-row>
          <el-col>
            <el-form-item :label="$i18ns('机构') + ':'" prop="branch_id">
              <el-select
                v-model="ruleForm.branch_id"
                :placeholder="$i18ns('请选择')"
                clearable
              >
                <el-option
                  v-for="(item, index) in branchList"
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
          <el-col>
            <el-form-item :label="$i18ns('digitalScreen.business_type') + ':'" prop="busi_card_type">
              <el-select v-model="ruleForm.busi_card_type" :disabled="true">
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
          <el-col>
            <el-form-item
              :label="$i18ns('digitalScreen.interface_config') + ':'"
              prop="servicecode"
              class="upload-item"
            >
              <el-input
                v-model="ruleForm.servicecode"
                class="input-item"
                :placeholder="$i18ns('digitalScreen.example') + 'ar0054'"
                :disabled="true"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getServicecode"
                ></el-button>
              </el-input>
              <el-button
                type="warning"
                plain
                @click="postmanTest"
                :disabled="ruleForm.servicecode === ''"
                >{{ $i18ns("测试") + $i18ns('digitalScreen.map_interface') }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row>
          <el-col>
            <el-form-item label="">
              <el-button type="success" plain @click="copySample">复制接口示例报文</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-row>
          <el-col>
            <el-form-item :label="$i18ns('digitalScreen.chart_screenshot') + ':'" prop="card_img" class="upload-item">
              <el-image
                v-if="ruleForm.card_img !== ''"
                class="image-class"
                :src="ruleForm.card_img"
                fit="scale-down"
              >
              </el-image>
              <el-button
                :type="ruleForm.card_img === '' ? 'warning' : 'primary'"
                plain
                @click="saveImage"
                :disabled="this.ruleForm.card_i_name === ''"
                >{{ ruleForm.card_img === "" ? $i18ns("digitalScreen.screenshot") : $i18ns("刷新") }}</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="">
              <el-button type="info" plain @click="closeNavTab">{{
                $i18ns("取消")
              }}</el-button>
            </el-form-item>
          </el-col>
          <el-col>
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
      <layoutContent :isEditState="true" ref="layoutContent"></layoutContent>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import layoutContent from "./components/cardContent.vue";
import { Loading } from "element-ui";
export default {
  name: "dynamicScreemModuleAdd",
  components: {
    layoutContent
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
      activeNames: ["1"],
      ruleForm: {
        card_id: "", //卡片ID
        titleName: "", //标题
        unitName: "", //单位
        i: "", //卡片ID
        card_i_name: "", //模板名称
        x: 0, //模板X坐标位置 1表格为1单位
        y: 0, //模板Y坐标位置 1表格为1单位
        w: 6, //模板宽度 1表格为1单位
        h: 4, //模板高度 1表格为1单位
        servicecode: "", //接口请求
        scope_range: "", //适用角色名称编码
        scope_range_str: "", //适用角色名称
        scope_range_tags: [], //适用角色名称标签
        card_img: "", //图表截图
        busi_card_type: "", // 业务类型
        branch_id: "", // 机构
        gear: "", // 档位
        gear_interval: "", // 间隔
        area1: "", // 区域一
        area2: "", // 区域二
        area3: "", // 区域三
        attribute1: "0.00", // 属性一
        attribute2: "0.00", // 属性二
        attribute3: "0.00", // 属性三
        area_code: "" // 地图编码
      },
      rules: {
        card_i_name: [
          {
            required: true,
            message: this.$i18ns('请选择'),
            trigger: "blur"
          }
        ],
        titleName: [
          {
            required: true,
            message: this.$i18ns('请输入'),
            trigger: "blur"
          }
        ],
        servicecode: [
          {
            required: true,
            message: this.$i18ns('请输入'),
            trigger: "blur"
          }
        ],
        card_img: [
          {
            required: true,
            message: this.$i18ns('请保存'),
            trigger: "blur"
          }
        ]
      },
      busiList: [], // 业务类型list
      branchList: [], // 机构list
      merchant: {
        // 省市信息
        province: "",
        city: ""
      },
      citySelectAble: false, // 城市联动
      provinceList: [], // 省份list
      cityList: [] // 城市list
    };
  },
  created() {
    this.getDictList("CT_E_BUSI_CARD_TYPE", "busiList");
    this.getDictList("CT_E_BRANCH_CARD_TYPE", "branchList");
    this.getProvinceList();
    // 初始化先清空存储的顶部数据
    this.$store.commit("SET_MAPTOP_DATA", {});
  },
  mounted() {
    //接受到图表截图的异步回调
    this.$bus.on("getSaveImage", imgBase64 => {
      this.loading.close();
      this.ruleForm.card_img = imgBase64;
    });
  },
  watch: {
    //监听charts数据改变进行刷新
    ruleForm: {
      handler(value) {
        if (!this.ruleForm.card_i_name) return;
        this.$refs.layoutContent.setLayout(this.ruleForm);
      },
      immediate: false, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    },
    "$store.state.dynamic_screen.mapTopdata": {
      handler(val) {
        const obj = this.$store.state.dynamic_screen.mapTopdata;
        this.ruleForm.attribute1 = obj.attribute1;
        this.ruleForm.attribute2 = obj.attribute2;
        this.ruleForm.attribute3 = obj.attribute3;
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
     * 省份、直辖市数据字典
     */
    getProvinceList() {
      let params = {
        servicecode: "ct2200",
        parent_code: "0"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.provinceList = res.data;
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
            "/views/dynamicScreem/dynamicScreemManage/dynamic_screem_card_manage/dynamic_screem_card_manager_lookup.json",
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
      this.ruleForm.scope_range_tags = returnData.selectedData;
    },
    //tags删除事件
    handleClose(tag) {
      this.scope_range_tags.splice(this.scope_range_tags.indexOf(tag), 1);
    },
    //打开图标卡片选择
    openCardDialog() {
      const option = {
        toRequest: {
          url: "@dyanmicScreemCardLookUp",
          method: "get",
          params: {}
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
      this.ruleForm.card_i_name = returnData.value;
      this.msgSample = returnData.msgSample;
    },
    /**
     * 关闭tab窗口
     */
    closeNavTab() {
      this.$dataBus.doCallBack(this, {});
    },
    /**
     * 查询接口交易码
     */
    getServicecode() {
      const option = {
        toRequest: {
          url:
            "/views/dynamicScreem/dynamicScreemManage/dynamic_screem_card_manage/dynamic_screem_card_code_lookup.json",
          method: "get",
          params: {}
        },
        width: "70%",
        title: this.$i18ns('digitalScreen.get_servicecode'),
        that: this
      };
      this.$dataBus.bindCallBackMethod(this, this.bringCodeBack, option);
      this.$dialog.open(option);
    },
    bringCodeBack(formItem, returnData) {
      this.ruleForm.servicecode = returnData.service_code;
      this.ruleForm.busi_card_type = returnData.busi_card_type;
    },
    //接口测试按钮
    postmanTest() {
      if (this.ruleForm.servicecode === "") {
        this.$message({ message: this.$i18ns('digitalScreen.postman_test'), type: "warning" });
        return;
      }

      // 定义成数组格式，方便首页定时刷新
      let arr = [];
      this.ruleForm.area_code = this.merchant.city
        ? this.merchant.city
        : this.merchant.province; // 地图编码
      arr.push(this.ruleForm);

      this.$bus.emit("refreshCardData", arr);
    },
    //复制报文示例
    copySample() {
      let that = this;
      const save = function(e) {
        e.clipboardData.setData("text/plain", that.msgSample);
        e.preventDefault(); // 阻止默认行为
      };
      const once = {
        once: true
      };
      document.addEventListener("copy", save, once); // 添加一个copy事件,当触发时执行一次,执行完删除
      document.execCommand("copy"); // 执行copy方法
      this.$message({ message: "复制成功", type: "success" });
    },
    /**
     * 省市联动选择
     */
    renderCity(val) {
      if (val) {
        this.merchant.city = "";
        let params = {
          servicecode: "ct2200",
          parent_code: val
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.cityList = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
        this.citySelectAble = true;
      }
    },
    /**
     * 请求地图
     */
    getmap() {
      const cityCode = this.merchant.city
        ? this.merchant.city
        : this.merchant.province;
      // 如果编码为0或者空，则为中国，加载中国100000.json文件
      let newCityCode = (cityCode ===  '0' || cityCode === '') ? '100000' : cityCode;
      MyAxios.invokeAPI(`/cityjson/${newCityCode}.json `, "GET")
        .then(res => {
          if (res) {
            // 定义成数组格式，方便首页定时刷新
            let arr = [];
            this.ruleForm.area_code = this.merchant.city
              ? this.merchant.city
              : this.merchant.province; // 地图编码
            arr.push(this.ruleForm);
            this.$bus.emit("refreshMapData", arr);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //保存卡
    saveCard() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let scope_range = []; //适用角色名称编码
          let scope_range_str = []; //适用角色名称编码
          this.ruleForm.scope_range_tags.forEach(item => {
            scope_range.push(item.role_id.toString());
            scope_range_str.push(item.role_name);
          });

          let params = {
            servicecode: "ct2600",
            group_cust_no: this.cParentParams.cust_no,
            card_id: this.ruleForm.card_id, //卡片编号
            card_name: this.ruleForm.titleName, //卡片名称
            card_title: this.ruleForm.unitName, //卡片标题
            card_i_type: this.ruleForm.card_id, //卡片编号
            card_i_name: this.ruleForm.card_i_name, //卡片类型名称
            card_x: this.ruleForm.x, //卡片X轴
            card_y: this.ruleForm.y, //卡片Y轴
            card_w: this.ruleForm.w, //卡片宽度
            card_h: this.ruleForm.h, //卡片高度
            card_service_code: this.ruleForm.servicecode, //卡片服务码
            role_id: scope_range.toString(), //角色ID
            card_tags: scope_range_str.toString(), //角色标签
            card_img: this.ruleForm.card_img, //卡片图片
            remark: "", //备注
            busi_card_type: this.ruleForm.busi_card_type, // 业务类型
            branch_id: this.ruleForm.branch_id, // 机构
            gear: this.ruleForm.gear, // 档位
            gear_interval: this.ruleForm.gear_interval, // 间隔
            area1: this.ruleForm.area1, // 区域一
            area2: this.ruleForm.area2, // 区域二
            area3: this.ruleForm.area3, // 区域三
            attribute1: this.ruleForm.attribute1, // 属性一
            attribute2: this.ruleForm.attribute2, // 属性二
            attribute3: this.ruleForm.attribute3, // 属性三
            area_code: this.merchant.city
              ? this.merchant.city
              : this.merchant.province // 地图编码
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
      this.$refs.layoutContent.getSaveImage();
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
  width: 180px !important;
  // height: 40px;
}
.setting {
  height: 100%;
  position: relative;
  overflow-y: scroll;
}
.setting-form {
  position: relative;
}
.preview {
  flex: 6;
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
