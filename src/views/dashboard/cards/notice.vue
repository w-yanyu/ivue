<template>
    <div class="notice-card">
        <i class="el-icon-refresh" @click.stop="getNotice"></i>
        <el-tabs v-model="activeName" @tab-click="getNotice">
            <el-tab-pane name="0">
                <span slot="label">
                    {{$i18ns('未读')}}
                    <el-badge v-if="total > 0" :value="total"></el-badge>
                </span>
                <ul>
                    <li v-for="(item, index) in noticeList" :key="index" @click="info(item)">
                        <i v-if="item.new_ind == '1'" class="icon-new"></i>
                        <el-tooltip effect="dark" :content="item.announce_title">
                            <span class="announce_title">{{item.announce_title}}</span>
                        </el-tooltip>
                        <span class="effect_date">{{$moment(item.effect_date).format('YYYY-MM-DD')}}</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane name="1">
                <span slot="label">{{$i18ns('已读')}}</span>
                <ul>
                    <li v-for="(item, index) in noticeList" :key="index" @click="info(item)">
                        <i v-if="item.new_ind == '1'" class="icon-new"></i>
                        <el-tooltip effect="dark" :content="item.announce_title">
                            <span class="announce_title">{{item.announce_title}}</span>
                        </el-tooltip>
                        <span class="effect_date">{{$moment(item.effect_date).format('YYYY-MM-DD')}}</span>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
        <el-button class="more" @click="more">{{$i18ns('查看更多')}}</el-button>
        <el-dialog
            :title="currentNotice.announce_title"
            width="65%"
            :close-on-click-modal="false"
            :visible.sync="detailDialog"
        >
            <div class="detail">
                <div class="title">{{currentNotice.announce_title}}</div>
                <div class="public">
                    <span>{{$i18ns('发布人')}}：{{currentNotice.publisher}}</span>
                    <span>{{$i18ns('发布时间')}}：{{$moment(currentNotice.effect_date).format('YYYY-MM-DD')}}</span>
                    <span>{{$i18ns('有效期至')}}：{{$moment(currentNotice.expiry_date).format('YYYY-MM-DD')}}</span>
                </div>
                <el-divider></el-divider>
                <el-scrollbar>
                    <div class="content">{{currentNotice.announce_content}}</div>
                </el-scrollbar>
                <div v-if="currentNotice.announce_file != ''">
                    <el-divider content-position="left">{{$i18ns('附件下载')}}:</el-divider>
                    <span class="link" @click="download">{{currentNotice.announce_file}}</span>
                </div>
            </div>
            <div slot="footer">
                <el-button type="success" icon="el-icon-check" @click="read">{{$i18ns('已阅')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {

            lookmore: this.$i18ns("T302.Look_more"),
            activeName: "0",
            total: 0,
            noticeList: [],
            detailDialog: false,
            currentNotice: {},
        };
    },
    created() {
        this.getNotice();
    },
    methods: {
        getNotice() {
            const params = {
                servicecode: "ct2335",
                length: 10,
                read_ind: this.activeName,
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    this.noticeList = response.data;
                    if (this.activeName === "0") {
                        this.total = response.pageParam.total;
                    }
                });
        },
        more() {
            this.$dialog.open({
                that: this,
                title: this.lookmore,
                width: "80%",
                toRequest: {
                    url: "/views/dashboard/cards/notice_more.json",
                    method: "get",
                },
            });
        },
        info(row) {
            this.$dataBus.bindCallBackMethod(this, this.getNotice, {});
            this.$dialog.open({
                that: this,
                title: this.currentNotice.announce_title,
                width: "65%",
                height: "80%",
                toRequest: {
                    url: "@cardNoticeInfo",
                    method: "get",
                    params: row,
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.notice-card {
    height: 100%;
    margin-top: -16px;
    position: relative;
    .el-icon-refresh {
        position: absolute;
        top: -46px;
        right: 0;
        cursor: pointer;
    }
    /deep/ .el-tabs {
        height: 96%;
        .el-tabs__header {
            background: #f7f8fa;
            padding: 6px;
            border: none;
            margin-top: 16px;
            }
        .el-tabs__nav-scroll {
            display: flex;
            justify-content: center;
            .el-tabs__nav {
                width: 100%;
                .el-tabs__item {
                    width: 50%;
                    text-align: center;
                }
            }
        }
        .el-tabs__content {
            height: 82%;
            border: 0;
            .el-tab-pane {
                height: 100%;
            }
        }
        .el-tabs__nav-wrap {
            border: none;
            margin-bottom: 0px;
        }
        .el-tabs__nav-wrap::after {
            display: none;
        }
        .el-tabs__active-bar {
            display: none;
        }
        .el-tabs__item {
            border-radius: 4px;
            height: 32px;
            line-height: 32px;
        }
        .is-active {
            background: #ffffff !important;
            border: none !important;
        }
    }
    ul {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 4px 8px;
            background: #f7f8fa;
            margin-top: 12px;
            border-radius: 8px;
            line-height: 38px;
            cursor: pointer;
            i {
                font-size: 24px;
                color: #f56c6c;
                margin-right: 6px;
            }
            .announce_title {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                font-weight: 500;
                line-height: 22px;
                color: #1d2129;
                width: 100%;
            }
            .effect_date {
                font-size: 12px;
                color: #86909c;
                line-height: 20px;
                margin-top: 4px;
            }
        }
    }
    .more {
        width: 100%;
        position: absolute;
        // bottom: 2%;
        left: 25%;
        width: 10vw;
    }
}
</style>

