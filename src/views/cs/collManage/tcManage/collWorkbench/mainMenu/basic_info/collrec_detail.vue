<template>
  <div>
    <div class="page case-detail__content">
      <div class="panel-header">
        <div class="align-left"> 与客户{{ chatName }}的催记信息 </div>
        <div class="align-right">
          <el-button type="primary" plain @click="toggleChatMode" class="fr"
            :icon="chatMode === 'LIST' ? 'el-icon-message' : 'el-icon-tickets'" size="small" style="margin-top: -5px;">
            <template v-if="chatMode === 'LIST'">对话模式</template>
            <template v-else>列表模式</template>
          </el-button>
        </div>
      </div>
      <div class="panel-content">
        <template v-if="chatMode === 'LIST'">
          <div class="container-centent--table">
            <el-table :data="chatList" style="width: 100%">
              <el-table-column prop="coll_time" label="催收时间" align="center" width="150px">
              </el-table-column>
              <el-table-column prop="collector" label="催收员" align="center">
              </el-table-column>
              <el-table-column prop="relationship" label="客户关系" align="center" :formatter="formatRelationShiData">
              </el-table-column>
              <el-table-column prop="relation_cust_name" label="联系姓名" align="center">
              </el-table-column>
              <el-table-column prop="phone_no" label="电话号码" align="center">
              </el-table-column>
              <el-table-column prop="phone_status" label="电话状态" align="center" :formatter="formatPhoneStatusData">
              </el-table-column>
              <el-table-column prop="message_type" label="内容类型" align="center" :formatter="formatMessageTypeData">
              </el-table-column>
              <el-table-column prop="send_content" label="发送内容" align="center" :width="300">
              </el-table-column>
              <el-table-column prop="coll_result" label="催收结果" align="center" :formatter="formatCollResultData">
              </el-table-column>
              <el-table-column prop="is_valid_result" label="是否有效" align="center" :formatter="formatIsValidData">
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center">
              </el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="page.start" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="page.length"
              layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount" style="margin: 0 10px">
            </el-pagination>
          </div>
        </template>

        <template v-else>
          <!-- 聊天框 -->
          <div class="chat-wrapper" style="width:90%">
            <!-- <div class="chat-header"><i class="fa fa-comments"></i> 与{{chatName}}的催收记录</div> -->
            <div class="chat-content" style="overflow:scroll">
              <div class="msg-box padding15">
                <!-- 聊天框内容渲染 -->
                <template v-for="item of chatList">
                  <!-- 对方 -->
                  <div v-if="item.way_type === 'SEND'" class="align-left" :key="item.serial_no">
                    <div class="item">
                      <div class="label">
                        <img class="avatar" :src="imgIcon">
                      </div>
                      <div class="content">
                        <div>
                          <div class="divs" v-if="item.message_type === 'VOICE'">
                            <Audioplay2 class="audioplay" :audioSrc="SmsOrEmailContent" v-loading="loading" />
                            <div class="download">
                              <el-button type="text">
                                <a :href="SmsOrEmailContent" style="text-decoration: none; color: #409eff">{{ $i18ns('下载')
                                }}</a>
                              </el-button>
                            </div>
                          </div>
                          <div v-else>
                            <div class="message">{{ item.send_content }}</div>
                          </div>
                          <p class="time1">
                            <span><el-tag type="info" size="mini" :hit="false">{{ item.message_type === 'VOICE' ? '语音' : (item.message_type === 'SMS' ? '短信' : (item.message_type === 'EMAIL' ? '邮件' : '未知类型')) }}</el-tag></span>
                            <span>{{ item.coll_time }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 自己 -->
                  <div v-else class="align-right">
                    <div class="item">
                      <div class="content">
                        <div>
                          <div class="divs" v-if="item.message_type === 'VOICE'">
                            <Audioplay2 class="audioplay" :audioSrc="SmsOrEmailContent" v-loading="loading" />
                            <div class="download">
                              <el-button type="text">
                                <a :href="SmsOrEmailContent" style="text-decoration: none; color: #409eff">{{ $i18ns('下载')
                                }}</a>
                              </el-button>
                            </div>
                          </div>
                          <div v-else>
                            <div class="message">{{ item.send_content }}</div>
                          </div>
                          <p class="time1">
                            <span><el-tag type="info" size="mini" color="#f7f7f7" :hit="false">{{ item.message_type === 'VOICE' ? '语音' : (item.message_type === 'SMS' ? '短信' : (item.message_type === 'EMAIL' ? '邮件' : '未知类型')) }}</el-tag></span>
                            <span>{{ item.coll_time }}</span>
                          </p>
                        </div>
                      </div>
                      <div class="label">
                        <img class="avatar" :src="imgIcon">
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment';
import MyAxios from "pte-ui/utils/MyAxios";
import Audioplay2 from "./component/audioplay2";

export default {
  components: { Audioplay2 },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },

  data() {
    return {
      loading: false,
      imgIcon: require('../../../../../../../../public/default_avatar.png'),
      caseDetail: {},
      page: {
        totalCount: 0,
        length: 10,
        start: 1
      },
      // 质检短信/邮件 内容。
      SmsOrEmailContent: "",
      renfaDetail: null,
      chatList: [],
      chatName: '',
      chatMode: 'TALK',
    };
  },
  created() {
    this.getQualitySMSEmailContentInfo();
    this.getChatRecord();
    this.chatName = this.cParentParams.cert_no;
    this.getDictList("CS_E_YESORNO", "IsValidDict");  //是否有效字典
    this.getCollResultDictList("", "CollResultDict");  //催收结果字典
    this.getDictList("CS_E_MESSAGE_TYPE", "MessageTypeDict");  //内容类型字典
    this.getDictList("CS_E_PHONE_STATUS", "PhoneStatusDict");  //电话状态字典
    this.getDictList("CS_E_RELATIONSHIP", "RelationShipDict");  //客户关系字典
  },
  methods: {

    toggleChatMode() {
      this.chatMode = this.chatMode === 'LIST' ? 'TALK' : 'LIST';
    },
    /**
     * 转化枚举类型
     */
    formatIsValidData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.IsValidDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
    * 转化枚举类型
    */
    formatMessageTypeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.MessageTypeDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
    * 转化枚举类型
    */
    formatPhoneStatusData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.PhoneStatusDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
    * 转化枚举类型
    */
    formatRelationShiData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.RelationShipDict.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictId + "-" + item.dictName;
        }
      })
      return name;
    },
    /**
   * 转化枚举类型
   */
    formatCollResultData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.CollResultDict.forEach(function (item, index) {
        if (data == item.coll_result_code) {
          name = item.coll_result_code + "-" + item.coll_result_name;
        }
      })
      return name;
    },
    /**
      * 获取数据字典列表
      */
    getDictList(dictType, listkey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listkey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },

    /**
 * 获取数据字典列表
 * @param dictType  数据字典 dictType
 * @param listKey 列表对象key名称
 */
    getCollResultDictList(dictType, listKey) {
      let params = {
        servicecode: "cb0038",
        start: 1,
        length: 1000,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    getQualitySMSEmailContentInfo() {
      console.log("AAAAAAAAA" + JSON.stringify(this.cParentParams));
       this.SmsOrEmailContent = "https://xqt-20230410.oss-cn-shenzhen.aliyuncs.com/7500204-20200821103050-13143352872-21003019--record-sip-3-1597977050.36432.mp3";
       this.loading = false;
      },

    handleSizeChange(val) {
      let that = this;
      that.page.length = val;
      this.getChatRecord();
    },
    handleCurrentChange(val) {
      let that = this;
      that.page.start = val;
      this.getChatRecord();
    },

    getChatRecord() {

      let params = {
        servicecode: "cb0098",
        case_no: this.cParentParams.case_no,
        cust_id: this.cParentParams.cust_id,
        org_id: this.cParentParams.org_id,
        oa_org_id: this.cParentParams.oa_org_id,
        case_id: this.cParentParams.case_id,
        start: this.page.start,
        length: this.page.length,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(response => {
          if (response && response.code === "200") {
            console.log(response);
            this.chatList = response.data;
            this.page.totalCount = response.pageParam ? response.pageParam.total : 0;
          } else {
            this.$message.error(response.message);
          }
        })
    },
  },

};
</script>
<style lang="less" scoped>
@primary: #409eff;
@border: 1px solid #e8e8e8;

.case-detail__header {
  padding: 15px 24px;
  border-bottom: @border;

  .title {
    margin-bottom: 16px;

    .icon {
      margin-right: 12px;
      border-radius: 3px;
      vertical-align: middle;
    }

    .name {
      font-size: 20px;
      vertical-align: middle;
      color: rgba(0, 0, 0, .85);
    }
  }

  .info {
    padding-left: 40px;

    .score {
      line-height: 1;
      font-size: 30px;
      color: #d2a320;
    }
  }
}

.container-content--pagination {
  float: right;
  padding: 10px;
}

.case-detail__content {
  .chat-wrapper {
    width: 800px;
    margin: 20px auto;
    border: @border;

    .chat-header {
      padding: 10px;
      background: #eee;
    }

    .chat-content {
      height: 350px;

      .align-left {
        display: flex;
        justify-content: flex-start;

        .content {
          padding-left: 15px;

          &>div {
            background: #f7f7f7;
          }
        }
      }

      .align-right {
        display: flex;
        justify-content: flex-end;

        .content {
          padding-right: 15px;

          &>div {
            color: #fff;
            background: @primary;
          }
        }
      }

      .item {
        padding: 8px;
        max-width: 550px;

        .label {
          padding-top: 8px;

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }

        .content {
          .time1 {
            margin: 5px 0;
            display: flex;
            justify-content: space-between;
            font-size: .86rem;
            font-style: italic;

            &>span:last-child {
              margin-left: 20px;
            }
          }
        }
      }

      .content>div {
        padding: 5px;
        background: #fff;
        border-radius: 5px;
      }
    }

    .chat-footer {
      border-top: @border;
      padding: 10px;
    }
  }
  .one {
  font-size: 13px;
  font-weight: 400;
  display: block;
  margin: 2px;
  padding-top: 8px;
}
  .divs .audio,
.download {
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
.audioplay{
  width: 100%;
   display: flex;
  justify-content: center;
}
}
</style>
