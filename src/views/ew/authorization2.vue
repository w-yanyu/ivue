<template>
    <div class="container">
        <Authorization 
            v-if="pageType == 1"
            :cMeta="cMeta"
            :cParentParams="cParentParams"
            :cParentMeta="cParentMeta"
            :cParentScope="cParentScope"/>
        <iframe 
            v-if="pageType == 2" 
            class="iframe_html" 
            width="100%" 
            style="height:100%" 
            :src="pdfUrl" 
            frameborder="0">
            </iframe>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import Authorization from './authorization.vue';
import _ from "lodash";
export default {
    name : "authorization2",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
        Authorization
    },
    data() {
        return{
            pageType: 0, // 1=固定合同模板、2=迁移合同数据
            pdfUrl: ''
        }
    },
    mounted() {

    },
    created() {
        this.init();
    },
    methods: {
        dataUrlToBlob(data, prefix) {
            var bstr = window.atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: prefix });
        },
        /**
         * 初始化合同数据
         */
        init() {
            const sysflg = this.cParentParams.sysflg
            if (sysflg == 'qysj') {
                const fileId = this.cParentParams.fileId;
                const filepath = this.cParentParams.filepath;
                const filename = this.cParentParams.filename;
                this.downloadByFileId({
                    fileId: fileId,
                    filepath: filepath, 
                    filename: "test.html"
                });
            } else {
                this.pageType = 1;
            }
        },
        /**
         * step 1. 通过fileid将影像文件下载到服务器
         * step 2. 再获取文件地址并下载base64数据
         * @param param Object
         */
        async downloadByFileId(param) {
            let params = {
                servicecode: "yxxz01",

            };
            params = Object.assign(params, param);
            await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
                console.log('res', res);
                this.handleDownload(res.data)
            })
            .catch(err => {
                console.error(err);
                this.$message({
                    type: "error",
                    message: "文件加载异常！"
                });
            });
        },
        /**
         * 加载文件数据
         * html文件显示在iframe中，其他类型文件直接通过浏览器进行下载。
         * @param file String
         */
        handleDownload(file) {
            let params = {
                servicecode: "ar4132",
                file_path: file.filepath
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
                if(/.(html)$/.test(file.filename)) {
                    this.pdfUrl = "data:text/html;base64,"+res.data.file_id;
                    this.pageType = 2;
                } else {
                    var filename =  file.filename;
                    let URL = this.dataUrlToBlob(res.data.file_id, res.data.prefix);
                    var a = document.createElement("a");
                    a.download = filename;
                    a.style.display = "none";
                    a.href = window.URL.createObjectURL(URL);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            })
            .catch(err => {
                console.error(err);
                this.$message({
                    type: "error",
                    message: "文件加载异常！"
                });
            });
        }
    },
}
</script>

<style lang="less" scoped>
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--toolbar{
        padding: 10px;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }
    .container-centent--table {
        margin-top: 10px;
    }
}
.container-footer {
    width: 50px;
    margin: 0 auto;
    padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
