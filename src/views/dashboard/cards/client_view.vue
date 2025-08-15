<template>
    <div class="client-view">
        <i class="el-icon-setting" @click.stop="config"></i>
        <ul class="client-list">
            <li
                v-for="item in clientList"
                :key="item.card_id"
                :style="{width: `calc( ${liWidth}% - 20px`, height: liHeight + '%'}"
            >
                <div class="top">
                    <i :class="['client-icon', 'icon', item.card_icon]"></i>
                    <div>
                        <span>{{item.card_name}}</span>
                        <div class="client-count">
                            <span>
                                {{$i18ns('存量客户')}}：
                                <i>{{item.stock_count}}</i>
                            </span>
                            <span>
                                {{$i18ns('潜在客户')}}：
                                <i>{{item.potential_count}}</i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <span
                        v-for="it in item.buttonInfo"
                        :key="it.button_id"
                        @click="goto(item,it)"
                    >{{it.button_desc}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        cParentParams: Object,
    },
    data() {
        return {
            clientList: [],
            params: {
                row: 1,
                col: 4,
            },
        };
    },
    computed: {
        liWidth() {
            const width = 100 / this.params.col || 3;
            return width;
        },
        liHeight() {
            const height = 100 / this.params.row || 1;
            return height;
        },
    },
    created() {
        if (this.cParentParams) {
            const params = JSON.parse(this.cParentParams);
            this.params.row = params.row || 1;
            this.params.col = params.col || 3;
        }
        this.getPortalList();
    },
    methods: {
        getPortalList() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "us0515",
                    user_num: JSON.parse(localStorage.user_info).userCode,
                })
                .then((response) => {
                    this.clientList = response.data.slice(
                        0,
                        this.params.row * this.params.col || 0
                    );
                });
        },
        config() {
            this.$dataBus.bindCallBackMethod(this, this.getPortalList, {});
            this.$dialog.open({
                that: this,
                title: "自定义配置",
                width: "65%",
                height: "80%",
                toRequest: {
                    url: "@cardClientViewConfig",
                    method: "get",
                    params: {
                        total: this.params.row * this.params.col || 0,
                    },
                },
            });
        },
        goto(card, button) {
            this.$dataBus.bindCallBackMethod(this, this.getPortalList, {});
            this.$dialog.open({
                that: this,
                title: card.card_name + button.button_desc,
                width: "80%",
                height: "80%",
                toRequest: {
                    url: button.url,
                    method: "get",
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.client-view {
    height: 100%;
    position: relative;
    .el-icon-setting {
        position: absolute;
        top: -46px;
        right: 0;
        cursor: pointer;
    }
}
.client-list {
    height: 100%;
    margin: 0 -10px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        margin: 0 10px 10px;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: 16px;
        box-sizing: border-box;
        cursor: pointer;
        .top {
            height: 70%;
            padding: 14px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .client-icon {
                font-size: 54px;
                margin-right: 18px;
                line-height: 1;
                color: #368ee0;
                position: relative;
                outline: 6px solid rgba(54, 142, 224, 0.2);
                outline-offset: -4px;
                border-radius: 50%;
            }
            .client-count {
                font-size: 13px;
                margin-top: 6px;
                color: #bbb;
                span {
                    margin-right: 10px;
                }
                i {
                    color: #f56c6c;
                }
            }
        }
        .bottom {
            height: 30%;
            display: flex;
            span {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                padding: 6px;
                border: 1px solid #eee;
                cursor: pointer;
                &:hover {
                    border: 1px solid #368ee0;
                    color: #368ee0;
                }
                &:first-child {
                    border-bottom-left-radius: 8px;
                }
                &:last-child {
                    border-bottom-right-radius: 8px;
                }
            }
        }
    }
}

.language-EN .client-list {
    height: 100%;
    margin: 0 -10px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        margin: 0 10px 10px;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: 16px;
        box-sizing: border-box;
        cursor: pointer;
        .top {
            height: 70%;
            padding: 14px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .client-icon {
                font-size: calc(100vw * 54 / 1920);
                margin-right: 18px;
                line-height: 1;
                color: #368ee0;
                position: relative;
                outline: 6px solid rgba(54, 142, 224, 0.2);
                outline-offset: -4px;
                border-radius: 50%;
            }
            .client-count {
                display: flex;
                flex-direction: column;
                font-size: calc(100vw * 13 / 1920);
                margin-top: 6px;
                color: #bbb;
                span {
                    display:inline-block ;
                    margin-right: 10px;
                }
                i {
                    color: #f56c6c;
                }
            }
        }
        .bottom {
            height: 30%;
            display: flex;
            span {
                font-size: calc(100vw * 12 / 1920);
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1;
                padding: 6px;
                border: 1px solid #eee;
                cursor: pointer;
                &:hover {
                    border: 1px solid #368ee0;
                    color: #368ee0;
                }
                &:first-child {
                    border-bottom-left-radius: 8px;
                }
                &:last-child {
                    border-bottom-right-radius: 8px;
                }
            }
        }
    }
}
</style>