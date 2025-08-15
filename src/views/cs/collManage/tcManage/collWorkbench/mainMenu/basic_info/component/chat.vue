<template>
  <el-container>
    <!-- 聊天框 -->
    <div class="chat-wrapper">
      <!-- <div class="chat-header">聊天</div> -->
      <div ref="chat_content" class="chat-content" style="overflow:scroll;">
        <div class="msg-box padding15">
          <!-- 聊天框内容渲染 -->
          <template v-for="(item, index) of messageList">
            <!-- 自己 -->
            <div v-if="item.calling_party === currentUser" :key="generator('chat1',index)" class="align-right">
              <div class="item">
                <div class="content">
                  <div>
                    <div class="message" v-html="replaceColor(item.sentence_content, item.matchVocabularys)"></div>
                    <p class="time">
                      <!-- <span><el-tag type="info" size="mini" color="#f7f7f7" :hit="false">{{ item.label }}</el-tag></span> -->
                      <span name="responseTime">{{ item.sentence_begin_time | formatTime }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 对方 -->
            <div v-if="item.calling_party != currentUser" :key="generator('chat2',index)" class="align-left">
              <div class="item">
                <div class="content">
                  <div>
                    <div class="message" v-html="replaceColor(item.sentence_content, item.matchVocabularys)"></div>
                    <p class="time">
                      <!-- <span><el-tag type="info" size="mini" :hit="false">{{ item.sendWay === 'msg' ? '短信' : '语音' }}</el-tag></span> -->
                      <span>{{ item.sentence_begin_time | formatTime }}</span>
                    </p>
                  </div>
                </div>
                <!-- <div class="label">
                  <img class="avatar" src="@/static/imgs/default_avatar.png">
                </div> -->
              </div>
            </div>
            <div v-for="(item, index) of item.qualityResults" :key="index">
              <div v-if="item.hit_detail != null && item.hit_detail != ''">
              <el-divider content-position="right"><span style="color:red"> {{formatProduceData(item.quality_rule_type, qualityRuleTypeDict)}}:{{item.hit_detail}}</span></el-divider>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: 'Chat',
  props: {
    messageList: {
      type: Object,
      default: null
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      qualityRuleTypeDict: [],
      // message: ''
    };
  },
  watch: {
    messageList() {
      // 滚动滚动条
      setTimeout(() => {
        this.$refs.showMessageList.$el.scrollTop =
          this.$refs.showMessageList.$el.scrollHeight;
      }, 0);
    }
  },
  mounted() {
    //this.$refs.inputMessage.focus();
    this.getDictList("CS_QUALITY_PLAN_RULE_TYPE", "qualityRuleTypeDict");
  },
  methods: {
    formatProduceData(dictId, dicts){
            let name;
            dicts.forEach(function(item, index){
                if (dictId === item.dictId){
                    name = item.dictName;
                }
            })
            return name;
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
              console.log(listKey + res.data);
            }
          })
          .catch(err => {
            console.error(err);
          });
    },
    submitMessage() {
      // 不能在 textarea 上使用 trim ，否则按 Enter 无法换行
      this.message = this.message.trim();
      if (!this.message) {
        return;
      }
      this.$emit('submitMessageEvent', this.message);
      this.message = '';
      this.$refs.inputMessage.focus();
    },
    keydown(event) {
      // Ctrl + Enter 发送消息
      event.ctrlKey && this.submitMessage();
    },
    currentTime() {
      const now = new Date();
      return `${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    },
    generator(name, index) {
      return `${name}${index}`;
    },
   replaceColor(sentence_content, matchVocabularys) {
      if (matchVocabularys != null){
        let words = [];
        words = matchVocabularys.split(',');
        words.forEach((item) => {
          const res = new RegExp(`${item}`, 'g');
          sentence_content = sentence_content.toString().replace(res, `<span style="color: red">${item}</span>`);
        });
        return sentence_content;
      } else {
        return sentence_content;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@primary: #409eff;
@border: 1px solid #e8e8e8;
.chat-wrapper {
    width: 90%;
    height: 500px;
    margin: 20px auto;
    border: @border;
    .chat-header {
      padding: 10px;
      background: #eee;
    }
    .chat-content {
      height: 500px;
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
          .time {
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
      .content > div {
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
</style>
