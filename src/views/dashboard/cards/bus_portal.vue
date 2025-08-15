<template>
    <div class="bus-portal">
        <i class="el-icon-setting" @click.stop="config"></i>
        <ul class="portal-list">
            <li v-for="item in portalList" :key="item.card_id" @click="$router.push(item.url)">
                <i :class="['icon', item.card_icon]"></i>
                <span >{{item.card_name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            portalList: [],
        };
    },
    created() {
        this.getPortalList();
    },
    methods: {
        getPortalList() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "ct3016",
                    user_num: JSON.parse(localStorage.user_info).userCode,
                })
                .then((response) => {
                    this.portalList = response.data;
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
                    url: "@cardBusPortalConfig",
                    method: "get",
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.bus-portal {
    height: 100%;
    position: relative;
    .el-icon-setting {
        position: absolute;
        top: -36px;
        right: 0;
        cursor: pointer;
    }
}
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
    }
}
.language-EN .portal-list {
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
        align-items: center;
        border: 1px solid #eee;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        font-size: calc(100vw * 12 / 1920);
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            border: 1px solid #368ee0;
            color: #368ee0;
        }
        i {
            font-size:calc(100vw * 36 / 1920);
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
    }
}
</style>