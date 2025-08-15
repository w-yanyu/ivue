<template>
  <div>
    <div class="page case-detail__content">
      <div class="panel">
        <div class="panel-header">
          <el-form size="small" label-width="100px" class="margin15-tb">
            <el-row class="centered-row" :gutter="20">
              <el-col :span="6" :offset="1">
                <el-form-item label="客户姓名">
                  <el-select v-model="company.companySelected" filterable placeholder="请选择" style="width: 80%;" @change="chatNameChange">
                    <el-option v-for="item in company.companyOption" :key="item.cust_id" :label="item.cust_name"
                      :value="item.cust_name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="策略组">
                  <el-select v-model="group.groupSelected" filterable placeholder="请选择" style="width: 80%;">
                    <el-option v-for="item in group.groupOption" :key="item.strategy_group_code" :label="item.strategy_group_name" 
                      :value="item.strategy_group_code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div class="text right" :gutter="20">
                  <el-button type="primary" size="small" @click="initSimulate('initSession')" v-show="initButton"
                    plain>初始对话</el-button>
                  <el-button type="primary" size="small" @click="initSimulate('resetSession')" v-show="resetButton"
                    plain>{{$i18ns('重置')}}对话</el-button>
                  <el-button type="primary" size="small" @click="nextStrategy" plain>触发下个时间策略</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="panel-content">
          <!-- 聊天框 -->
          <div class="chat-wrapper">
            <div class="chat-header"><i class="fa fa-comments"></i> 和{{chatName}}的聊天</div>
            <div class="chat-content" style="overflow:scroll;" ref="chat_content">
              <div class="msg-box padding15">
                <!-- 聊天框内容渲染 -->
                <template v-for="(item, index)  of chatList">
                  <!-- 对方 -->
                  <div v-if="item.way === 'response'" class="align-left" :key="generator('chat', index)">
                    <div class="item">
                      <div class="label">
                        <img class="avatar" :src="imgIcon">
                      </div>
                      <div class="content">
                        <div>
                          <div class="message">{{ item.content }}</div>
                          <p class="time">
                            <span><el-tag type="info" size="mini" :hit="false">{{ item.send_way }}</el-tag></span>
                            <span>{{ item.execution_time }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 自己 -->
                  <div v-else class="align-right">
                    <!-- <div v-else class="align-right"> -->
                    <div class="item">
                      <div class="content">
                        <div>
                          <div class="message">{{ item.content }}</div>
                          <p class="time">
                            <span><el-tag type="info" size="mini" color="#f7f7f7" :hit="false">{{
                              item.coll_result_code }}</el-tag></span>
                            <span name='responseTime'>{{ item.execution_time }}</span>
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
            <div class="chat-footer">
              <el-row :gutter="10">
                <el-col :span="19">
                  <el-input type="text" size="small" placeholder="请输入内容" v-model="selectTemplate.finalTemplate"
                    @keyup.enter.native="sendMsg">
                  </el-input>
                </el-col>
                <el-col :span="3">
                  <el-button type="primary" size="small" style="width: 100%;" @click="sendMsg()">发送</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  data() {
    return {
      imgIcon: require('../../../../../../public/default_avatar.png'),
      ff: null,
      contactStatusOption: [],
      statusList: [],
      mobileStatusOption: [],
      comboxCaseOption: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      chatList: [],
      selectTemplate: {
        finalTemplate: ''
      },
      groupReq: {
        companyId: ''
      },
      company: {
        companySelected: '',
        companyOption: []
      },
      group: {
        groupSelected: '',
        groupOption: []
      },
      collResult: {
        coll_result_code: '',
        collResultList: []
      },
      initButton: true,
      resetButton: false,
      coll_result_name: '',
      chatName: '',
      cust_id: '',
      case_no: '',
      case_id: '',
      cert_no: '',
      oa_org_id: '',
      org_id: '',
      responseMessageReq: {
        message: '',
        strategyId: '',
        companyId: '',
        groupId: '',
        time: ''
      },
      corpusInfo: '',
      nextStrategyReq: {
        time: '',
        companyId: '',
        groupId: ''
      },
      contactStatusType: {
        benrendianhua: 'benrendianhuaContactStatus',
        zhixidianhua: 'zhixidianhuaContactStatus'
      }
    };
  },
  watch: {
    chatList() {
      this.$nextTick(() => {
        const div = this.$refs.chat_content;
        div.scrollTop = div.scrollHeight;
      });
    }
  },
  mounted() {
    this.getCaseList();
    this.getStrategyGroupList();
  },
  methods: {

    chatNameChange() {
      this.chatName = this.company.companySelected
      this.cust_id = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).cust_id,
      this.case_no = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).case_no,
      this.case_id = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).case_id,
      this.oa_org_id = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).oa_org_id,
      this.org_id = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).org_id
    },

//     chatNameChange() {  
//   // 获取新的cust_id  
//   let cust_id = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).cust_id; 
//   let case_no = this.company.companyOption.find(item => item.cust_name === this.company.companySelected).case_no;  
 
//   // 更新company.companySelected的值，以保证调用py2001时数据的正确性  
//   this.company.companySelected = { cust_name: this.company.companySelected, cust_id: cust_id , case_no: case_no};  
// },

    // 案件列表
    getCaseList() {
      let params = {
        length: 100,
        servicecode: "cb0042"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('cb0042=====>', res.data)
            this.company.companyOption = res.data;
            if(res.data.length>0){
              this.company.companySelected = res.data[0].cust_name;
              this.chatName = res.data[0].cust_name;
              this.cust_id = res.data[0].cust_id;
              this.case_no = res.data[0].case_no;
              this.case_id = res.data[0].case_id;
              this.oa_org_id = res.data[0].oa_org_id;
              this.org_id = res.data[0].org_id
            }
            // for (let i = 0; i < res.data.length; i++) {
            //   this.company.companySelected = res.data[i].cust_id;
            // }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 策略组列表
    getStrategyGroupList() {
      let params = {
        length: 100,
        servicecode: "py0008"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('py0008=====>', res.data)
            this.group.groupOption = res.data;
            if(res.data.length>0){
              this.group.groupSelected = res.data[0].strategy_group_name;
            }
            // for (let i = 0; i < res.data.length; i++) {
            //     this.group.groupSelected = res.data[i].strategy_group_code;
            //   }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    // 初始化对话、重置对话
    initSimulate(button) {
      let params = {
        servicecode: "py2001",
        cust_name: this.company.companySelected,
        cust_id: this.cust_id, 
        case_no: this.case_no, 
        case_id: this.case_id, 
        oa_org_id: this.oa_org_id, 
        org_id: this.org_id, 
        strategy_group_code: this.group.groupSelected
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('py2001=====>', res.data)
            this.chatList = res.data.chatRecordList;
            if (button === 'initSession') {
              this.initButton = false;
              this.resetButton = true;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    // 触发下一个策略
    nextStrategy() {
      let params = {
        servicecode: "py2002",
        cust_name: this.company.companySelected,
        cust_id: this.cust_id, 
        case_no: this.case_no, 
        case_id: this.case_id, 
        oa_org_id: this.oa_org_id, 
        org_id: this.org_id, 
        strategy_group_code: this.group.groupSelected
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('py2002=====>', res.data)
            const data = res.data;
            const chatRecords = data.chatRecordList;
            chatRecords.map(record => {
              this.chatList.push(record);
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    // 发送，获取打标信息
    sendMsg() {
      let params = {
        servicecode: "py2003",
        content: this.selectTemplate.finalTemplate,
        cust_name: this.company.companySelected
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('py2003=====>', res.data)
            const data = res.data;
            const chatRecords = data.chatRecordList;
            chatRecords.map(record => {
              // this.chatList.push(record);

              // 复制record对象  
             const copiedRecord = { ...record };  

              // 调用getCollResultName方法获取催收结果名称
              return this.getCollResultName(copiedRecord.coll_result_code)  
            .then(coll_result_name => {  
              // 将返回的催收结果名称替换copiedRecord对象中的coll_result_code为coll_result_name    
              copiedRecord.coll_result_code = coll_result_name;    
              console.log('coll_result_name=====>',coll_result_name);
              // 将修改后的copiedRecord对象添加到聊天记录中    
              this.chatList.push(copiedRecord);    
              // 回复
              this.responseMessage(record.cust_name, record.coll_result_code);
              }); 
            });

            this.selectTemplate.finalTemplate = null;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

 // 获取催收结果名称
 async getCollResultName(coll_result_code) {
  try{
  let params = {
    servicecode: "cb0037",
    length: 100,
    coll_result_code: coll_result_code
  };
  const res = await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params);
      if (res && res.code === "200" && res.data) {
              console.log('cb0037=====>', res.data)
              this.collResult.collResultList = res.data;
              const coll_result_name = this.collResult.collResultList.find(item => item.coll_result_code === coll_result_code).coll_result_name
              return coll_result_name;
            }
        } catch(err) {
      console.error(err);
    }
},

    // 回复信息
    responseMessage(cust_name, coll_result_code) {

      let params = {
        servicecode: "py2004",
        cust_name: cust_name,
        cust_id: this.cust_id, 
        case_no: this.case_no, 
        case_id: this.case_id, 
        oa_org_id: this.oa_org_id, 
        org_id: this.org_id, 
        coll_result_code: coll_result_code
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log('py2003=====>', res.data)
            const data = res.data;
            const chatRecords = data.chatRecordList;
            chatRecords.map(record => {
              this.chatList.push(record);
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    generator(name, index) {
      return `${name}${index}`;
    }
  }
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

.centered-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

// 表示聊天界面的父容器，可以根据需要修改它的样式。
.case-detail__content {

  // 聊天界面的容器，设置了宽度、边距和边框样式。
  .chat-wrapper {
    width: 80%;
    margin: 20px auto;
    border: @border;

    // 聊天界面的头部，设置了内边距和背景颜色。
    .chat-header {
      padding: 10px;
      background: #eee;
    }

    // 聊天内容的容器，设置了高度和滚动样式。包含了左对齐和右对齐的消息样式，以及消息内容和时间的样式设置。
    .chat-content {
      height: 600px;

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

      .content>div {
        padding: 5px;
        background: #fff;
        border-radius: 5px;
      }
    }

    // 聊天界面的底部，设置了上边框和内边距样式。
    .chat-footer {
      border-top: @border;
      padding: 10px;
    }
  }
}
</style>
