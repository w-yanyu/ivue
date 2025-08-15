<template>
  <!-- 质检管理 -->
  <div class="app-container">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div>
        <el-row :gutter="24">
          <el-col :span="5">
            <span class="one"
              >联系人姓名:{{
                this.cParentParams.relation_cust_name
                  ? this.cParentParams.relation_cust_name
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >联系人关系：{{
                
                this.cParentParams.relationship
                  ? getRelitionshipName(this.cParentParams.relationship.toString())
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >联系人号码：{{
                this.cParentParams.phone_or_email
                  ? this.cParentParams.phone_or_email
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >客户姓名 ：{{
                this.cParentParams.cust_name
                  ? this.cParentParams.cust_name
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="5">
            <span class="one"
              >开始时间：{{
                this.cParentParams.start_time
                  ? this.cParentParams.start_time
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >结束时间：{{
                this.cParentParams.end_time ? this.cParentParams.end_time : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >时长：{{
                this.cParentParams.duration ? this.cParentParams.duration : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >催收员：{{
                this.cParentParams.collector
                  ? this.cParentParams.collector
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="5">
            <span class="one"
              >质检内容类型：{{
                this.cParentParams.quality_content_type
                  ? formatProduceData(
                      this.cParentParams.quality_content_type,
                      this.qualityContentTypeDict
                    )
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >发起方类型：{{
                this.cParentParams.initiater_type
                  ? formatProduceData(
                      this.cParentParams.initiater_type,
                      this.initiaterTypeDict
                    )
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5">
            <span class="one"
              >催记流水号：{{
                this.cParentParams.record_serial_no
                  ? this.cParentParams.record_serial_no
                  : "--"
              }}
            </span>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
    <!-- 质检命中信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>质检命中信息</span>
      </div>
      <div>
        <el-row :gutter="24">
          <el-col :span="5" v-if="qualityHitInfos[0]">
            <span class="one"
              >{{
                qualityHitInfos[0]
                  ? formatProduceData(
                      qualityHitInfos[0].quality_rule_type,
                      qualityRuleTypeDict
                    )
                  : ""
              }}：{{
                qualityHitInfos[0] ? qualityHitInfos[0].quality_hit_num : ""
              }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[0]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[1]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[1].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[1].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[1]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[2]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[2].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[2].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[2]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[3]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[3].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[3].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[3]">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="5" v-if="qualityHitInfos[4]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[4].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[4].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[4]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[5]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[5].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[5].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[5]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[6]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[6].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[6].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[6]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[7]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[7].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[7].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[7]">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="5" v-if="qualityHitInfos[8]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[8].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[8].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[8]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[9]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[9].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[9].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[9]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[10]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[10].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[10].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[10]">
            <el-divider direction="vertical" />
          </el-col>
          <el-col :span="5" v-if="qualityHitInfos[11]">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[11].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[11].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[11]">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>

        <el-row :gutter="24" v-if="qualityHitInfos[12]">
          <el-col :span="5">
            <span class="one"
              >{{
                formatProduceData(
                  qualityHitInfos[12].quality_rule_type,
                  qualityRuleTypeDict
                )
              }}：{{ qualityHitInfos[12].quality_hit_num }}</span
            >
          </el-col>
          <el-col :span="1" v-if="qualityHitInfos[12]">
            <el-divider direction="vertical" />
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
    <!-- 录音插件 -->
    <div class="divs" v-if="cParentParams.quality_content_type === 'VOICE'">
      <Audioplay2 :audioSrc="SmsOrEmailContent" v-loading="loading" />
      <div class="download">
        <el-button type="text">
          <a
            :href="SmsOrEmailContent"
            style="text-decoration: none; color: #409eff"
            >{{$i18ns('下载')}}</a
          >
        </el-button>
      </div>
    </div>

    <!-- 聊天文件 -->

    <div v-if="cParentParams.quality_content_type === 'VOICE'">
      <chat :message-list="messageList" :current-user="currentUser" />
    </div>
    <!-- 短信邮件 -->
    <div v-if="cParentParams.quality_content_type !== 'VOICE'">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>质检内容</span>
        </div>
        <span>{{ this.SmsOrEmailContent }}</span>
        <div></div>
      </el-card>
    </div>
    <!-- 结论表单 -->
    <el-form size="small" label-width="120px">
      <el-row :gutter="24">
        <el-col :span="20">
          <el-form-item label="质检结论">
            <el-select
              v-model="quality_conclusion"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="(item, i) in qualityConclusionDictEg"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="20">
          <el-form-item label="质检备注">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="quality_remark"
              :rows="4"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="15">
          <el-form-item>
            <el-button type="primary" size="mini" @click="commitQualityResult()"
              ><i class="el-icon-search" />
              提交
            </el-button>
            <el-button size="mini" @click="reset()"
              ><i class="el-icon-refresh" />{{$i18ns('重置')}}</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import Audioplay from "./component/audioplay";
import Audioplay2 from "./component/audioplay2";
import chat from "./component/chat";

export default {
  components: { Audioplay, chat, Audioplay2 },
  props: {
    getTreeData: {
      type: String,
      default() {
        return null;
      },
    },
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      loading: false,
      params: {},
      url: "/views/cs/qualityManage/qualityWorkLocation/quality_work_location.json",
      // 字典转换失效.
      qualityConclusionDictEg: [
        {
          dictId: "VIOLATION",
          dictName: "违规",
        },
        {
          dictId: "NON_VIOLATION",
          dictName: "不违规",
        },
      ],
      // 字典转换失效.
      qualityRelationEg: [
        {
          dictId: "1",
          dictName: "父母与子女",
        },
        {
          dictId: "2",
          dictName: "子女与父母",
        },
        {
          dictId: "3",
          dictName: "丈夫与妻子",
        },
        {
          dictId: "4",
          dictName: "妻子与丈夫",
        },
        {
          dictId: "5",
          dictName: "贷款担保人与被担保人",
        },
        {
          dictId: "6",
          dictName: "贷款被担保人与担保人",
        },
        {
          dictId: "9999",
          dictName: "本人",
        }
      ],

      quality_conclusion: this.cParentParams.quality_conclusion,
      quality_remark: this.cParentParams.quality_remark,
      qualityHitInfos: [],
      addVisible: false,
      orgSelectdata: [],
      defaultProps: {
        children: "data",
        label: "name",
      },
      nodeKey: "name",
      startCallTime: [],
      defaultCheckedKeys: [],
      currentUser: "CALLER",
      chatVisible: true,
      messageList: [],
      // 录音文本
      tableList: [],
      loading: false,
      disabled: false,
      total: 1,
      vocabularys: null,
      // 质检短信/邮件 内容。
      SmsOrEmailContent: "",
      // 质检结论
      qualityConclusionDict: [],
      // 质检状态
      qualityStatusDict: [],
      // 质检内容类型
      qualityContentTypeDict: [],
      // 发起方类型
      initiaterTypeDict: [],
      // 质检内容规则类型
      qualityRuleTypeDict: [],
      // 联系人关系
      qualityRelationship: [],

      rules: {
        // 验证规则
        quality_result: [
          { required: true, message: "请选择质检结论。", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  mounted() {
    this.getDictList("CS_QUALITY_CUST_RELATION", "qualityRelationship ");
    this.getDictList("CS_QUALITY_STATUS", "qualityStatusDict"); //质检状态
    this.getDictList("CS_QUALITY_CONTENT_TYPE", "qualityContentTypeDict"); //质检内容类型
    this.getDictList("CS_INITIATER_TYPE", "initiaterTypeDict"); //发起方类型
    this.getDictList("CS_QUALITY_PLAN_RULE_TYPE", "qualityRuleTypeDict"); //质检内容规则类型
    this.getDictList("CS_QUALITY_CONCLUSION", "qualityConclusionDict "); //质检结论

    
    //联系人关系
    //质检结论
    // 获取质检命中信息
    this.getQualityHitInfo();
    // 获取质检内容
    this.getQualityContent();

    this.getQualitySMSEmailContentInfo();
  },
  methods: {
    jsonCallBack(data) {
      console.log(data, "json模板回调回来的数据");
    },
    // 获取质检内容
    getQualityContent() {
      if (this.cParentParams.quality_content_type === "VOICE") {
        this.getQualityCallContentInfo();
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
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log(listKey + res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 表格字典值转换
     */
    formatProduceData(dictId, dicts) {
      let name;
      dicts.forEach(function (item, index) {
        if (dictId === item.dictId) {
          name = item.dictName;
        }
      });
      console.log("dictname", dictId, name);
      return name;
    },

    getRelitionshipName(val) {
      for (let i = 0; i < this.qualityRelationEg.length; i++) {
        if (val == this.qualityRelationEg[i].dictId) {
          return this.qualityRelationEg[i].dictName;
        }
      }
    },
    popoverHide() {},
    search() {
      this.getResultList();
    },
    reset() {
      this.$refs.select.clearSelectedNode();
      this.$refs.select.clearSelectedNodes();
      this.vocabularys = null;
      this.startCallTime = [];
    },
    // 获取质检命中信息
    getQualityHitInfo() {
      let params = {
        servicecode: "qc0015",
        quality_serial_no: this.cParentParams.quality_serial_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("wwwwwww", res.data);
            this.qualityHitInfos = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // 获取质检内容  --  录音文本
    getQualityCallContentInfo() {
      let params = {
        servicecode: "qc0017",
        quality_serial_no: this.cParentParams.quality_serial_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.messageList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getQualitySMSEmailContentInfo() {
      console.log("AAAAAAAAA" + JSON.stringify(this.cParentParams));
      let params = {
        servicecode: "qc0020",
        record_serial_no: this.cParentParams.record_serial_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.loading = false;
            this.SmsOrEmailContent = res.data.quality_content;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 批量下载录音
    soundDownload() {
      // this.multipleSelection
    },
    // 播放录音
    playerSound() {
      this.$message({
        type: "success",
        message: "播放录音",
      });
    },
    // 下载录音
    downloadFile() {
      this.$message({
        type: "success",
        message: "下载录音",
      });
    },
    checkChange(value) {
      this.vocabularys = value.join(",");
    },
    showChat(messageList) {
      this.chatVisible = true;
      this.messageList = messageList;
    },
    commitQualityResult() {
      let params = {
        servicecode: "qc0016",
        quality_serial_no: this.cParentParams.quality_serial_no,
        quality_conclusion: this.quality_conclusion,
        quality_remark: this.quality_remark,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.$dialog.close();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.one {
  font-size: 13px;
  font-weight: 400;
  display: block;
  margin: 2px;
  padding-top: 8px;
}
.divs .audio,
.download {
  width: 90%;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
}
</style>
