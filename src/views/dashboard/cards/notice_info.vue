<template>
    <div>
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
            <div v-if="currentNotice.read_ind == 0" class="footer-btn">
                <el-button type="success" icon="el-icon-check" @click="read">{{$i18ns('已阅')}}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Tools from "pte-ui/utils/Tools";

export default {
    props: {
        cParentParams: Object, // 父页面传的参数
    },
    data() {
        return {
            currentNotice: {},
        };
    },
    created() {
        this.currentNotice = { ...this.cParentParams };
        if (
            this.currentNotice.announce_file_path !== null &&
            this.currentNotice.announce_file_path !== ""
        ) {
            this.currentNotice.announce_file =
                this.currentNotice.announce_file_path.substring(
                    this.currentNotice.announce_file_path.lastIndexOf("\\") + 1
                );
        } else {
            this.currentNotice.announce_file = "";
        }
    },
    methods: {
        read() {
            const params = {
                servicecode: "ct2336",
                announce_id: this.currentNotice.announce_id,
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    this.$dataBus.doCallBack(this, response);
                });
        },
        download() {
            const params = {
                filePath: this.currentNotice.announce_file_path,
                fileName: this.currentNotice.announce_file,
            };
            Tools.downLoadFile(
                "/SUMP/icmcall/downloadStream",
                "post",
                params,
                null,
                (err) => {
                    this.$msg({
                        type: "error",
                        message: err,
                    });
                }
            );
        },
    },
};
</script>

<style lang="less" scoped>
.detail {
    padding: 20px 50px;
    .title {
        text-align: left;
        font-size: 26px;
    }
    .public {
        padding-top: 12px;
        span {
            margin-right: 30px;
        }
    }
    .content {
        font-size: 14px;
        height: 400px;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
    }
    .link {
        margin-left: 4%;
        color: #368ee0;
        cursor: pointer;
    }
    .footer-btn {
        text-align: right;
    }
}
</style>

