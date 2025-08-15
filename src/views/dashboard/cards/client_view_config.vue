<template>
    <div>
        <ul class="client-list">
            <li
                v-for="item in clientList"
                :key="item.card_id"
                :class="item.checked ?'active':''"
                @click="check(item)"
            >
                <div>
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
                        <span v-for="it in item.buttonInfo" :key="it.button_id">{{it.button_desc}}</span>
                    </div>
                </div>
                <span class="el-icon-success"></span>
            </li>
        </ul>
        <div class="footer-btn">
            <el-button type="primary" @click="choosePortalCallBack">{{$i18ns('确认')}}</el-button>
            <el-button @click="layoutTempDialog = false">{{$i18ns('取消')}}</el-button>
        </div>
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
            checkbox: [],
            userCode: JSON.parse(localStorage.user_info).userCode,
        };
    },
    created() {
        this.getPortalList();
    },
    methods: {
        getPortalList() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "us0515",
                })
                .then((response) => {
                    this.clientList = response.data;
                    this.clientList.forEach((item) => {
                        if (item.scope_range.indexOf(this.userCode) !== -1) {
                            item.checked = true;
                            this.checkbox.push(item.card_id);
                        }
                    });
                });
        },
        check(it) {
            let idx = this.checkbox.indexOf(it.card_id);
            if (idx <= -1 && this.checkbox.length >= this.cParentParams.total) {
                this.$message({
                    message: `最多可配置${this.cParentParams.total}个客户视图`,
                    type: "warning",
                });
                return false;
            }
            if (idx > -1) {
                this.checkbox.splice(idx, 1);
            } else {
                this.checkbox.push(it.card_id);
            }
            this.clientList = this.clientList.map((item) => {
                if (item.card_id === it.card_id) {
                    item.checked = !item.checked;
                }
                return item;
            });
        },
        choosePortalCallBack() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "us0516",
                    user_num: this.userCode,
                    data: this.clientList.filter((item) => item.checked),
                })
                .then((response) => {
                    this.$dataBus.doCallBack(this, response);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.client-list {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 31.33%;
        height: 98%;
        margin: 1%;
        align-items: center;
        border: 1px solid #eee;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: 16px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        .top {
            height: 70%;
            padding: 20px;
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
                font-size: 12px;
                margin-top: 8px;
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
                &:first-child {
                    border-bottom-left-radius: 8px;
                }
                &:last-child {
                    border-bottom-right-radius: 8px;
                }
            }
        }
        .el-icon-success {
            color: #ccc;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    }
    .active {
        border: 1px solid #368ee0;
        color: #368ee0;
        .el-icon-success {
            color: #368ee0;
        }
    }
}
.footer-btn {
    text-align: center;
}
</style>