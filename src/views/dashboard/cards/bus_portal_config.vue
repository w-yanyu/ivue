<template>
    <div>
        <el-collapse v-model="activeNames">
            <el-collapse-item
                v-for="item in busiTypeList"
                :key="item.value"
                :title="item.label"
                :name="item.value"
            >
                <ul class="portal-list">
                    <template v-for="(it, index) in portalList">
                        <li
                            v-if="it.busi_tp === item.value"
                            :key="index"
                            :class="it.checked ?'active':''"
                            @click="check(it)"
                        >
                            <i :class="`icon ${it.card_icon}`"></i>
                            <span class="title">{{it.card_name}}</span>
                            <span class="el-icon-success"></span>
                        </li>
                    </template>
                </ul>
            </el-collapse-item>
        </el-collapse>
        <div class="footer-btn">
            <el-button type="primary" @click="choosePortalCallBack">{{$i18ns('确认')}}</el-button>
            <el-button @click="layoutTempDialog = false">{{$i18ns('取消')}}</el-button>
        </div>
    </div>
</template>

<script>
import dictionaries from "pte-ui/utils/dictionaries";

export default {
    data() {
        return {
            busiTypeList: [],
            activeNames: [],
            portalList: [],
            checkbox: [],
            userCode: JSON.parse(localStorage.user_info).userCode,
        };
    },
    created() {
        this.queryDict();
        this.getPortalList();
    },
    methods: {
        async queryDict() {
            this.busiTypeList = await dictionaries.get({
                dictType: "CT_E_BUSI_TP",
                dictKey: ["CT_E_BUSI_TP"],
            });
            for (const i in this.busiTypeList) {
                this.activeNames.push(this.busiTypeList[i].value);
            }
        },
        getPortalList() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "ct3016",
                })
                .then((response) => {
                    this.portalList = response.data;
                    this.portalList.forEach((item) => {
                        if (item.scope_range.indexOf(this.userCode) !== -1) {
                            item.checked = true;
                            this.checkbox.push(item.card_id);
                        }
                    });
                });
        },
        check(it) {
            let idx = this.checkbox.indexOf(it.card_id);
            if (idx <= -1 && this.checkbox.length >= 10) {
                this.$message({
                    message: "最多可配置10个业务门户",
                    type: "warning",
                });
                return false;
            }
            if (idx > -1) {
                this.checkbox.splice(idx, 1);
            } else {
                this.checkbox.push(it.card_id);
            }
            this.portalList = this.portalList.map((item) => {
                if (item.card_id === it.card_id) {
                    item.checked = !item.checked;
                }
                return item;
            });
        },
        choosePortalCallBack() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "ct3015",
                    user_num: this.userCode,
                    data: this.portalList.filter((item) => item.checked),
                })
                .then((response) => {
                    this.$dataBus.doCallBack(this, response);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.portal-list {
    height: 100%;
    margin: -10px;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 18%;
        height: 42%;
        margin: 1%;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #eee;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: 15px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            border: 1px solid #368ee0;
            color: #368ee0;
        }
        i {
            font-size: 42px;
            margin-right: 8px;
            line-height: 1;
            color: #368ee0;
            position: relative;
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: rgba(54, 142, 224, 0.2);
                width: 26px;
                height: 26px;
                border-radius: 50%;
            }
        }
        .title {
            flex: 1;
        }
        .el-icon-success {
            color: #ccc;
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