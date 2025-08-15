<template>
<div>
    <el-upload
    ref="uploadProp"
    action="#"
    :on-preview = "handlePictureCardPreview"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :limit="maxLength"
    :disabled="uploadDisabled"
    multiple>
        <el-button :disabled="uploadDisabled" size="small" type="primary">{{$i18ns('选择')}}文件</el-button>
    </el-upload>
    <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
    <el-dialog :visible.sync="pdfVisible" width="1200px" :append-to-body="true">
        <div class="el-dialog-dev" >
            <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0"></iframe>
        </div>
    </el-dialog>
</div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";

export default {
    name: "UploadFileView",
    props: {
        uploadFileList: {
            type: Array,
            required: true
        }, //文件列表
        uploadDisabled: {
            type: Boolean,
            required: false,
            default: false
        }, //是否可以编辑
        maxLength: {
            type: Number,
            required: false,
            default: 20
        },
        uploadAttachType: {
            type: String,
            required: false,
            default: ""
        },
        typeList: {
            type: Array,
            required: true
        },
    },
    components: {
        ImagePreview
    },
    data() {
        return {
            dialogImageUrl: '',
            editDisabled: false,
            totalFileList:[],
            fileList:[],
            pdfVisible:false,
            imageVisible:false,
        }
    },
    created() {
        this.totalFileList = this.uploadFileList;
        this.initFileList();
    },
    mounted() {
        this.$bus.off("deleteRowUpload");
        this.$bus.on("deleteRowUpload", data => {
            this.handleRemove(data)
        });
    },
    methods: {
        initFileList(){
            let that = this;
            if(that.totalFileList.length>0){
                that.totalFileList.forEach(item=>{
                    var file = new Object();
                    file.name = this.getDictName(item.fileType)+item.orig_file_nm;
                    if(/.(gif|jpg|png|gif|jpg|png)$/.test(file.name)){
                        file.url = "data:image/png;base64,"+item.fileString;
                    }else if(/.(jpeg)$/.test(file.name)){
                        file.url = "data:image/jpeg;base64,"+item.fileString;
                    }else if(/.(pdf)$/.test(file.name)){
                        file.url = "data:application/pdf;base64,"+item.fileString;
                    }else{
                        file.url = item.fileString;
                    }
                    that.fileList.push(file);
                })
            }
        },
        handleRemove(file) {
           let index = null;
            this.fileList.forEach((item, key) => {
                if (item.uid === file.uid) {
                    index = key;
                    return false;
                }
            });
            this.fileList.splice(index, 1);
            this.totalFileList.splice(index, 1);
            this.$emit('changeFile',  this.totalFileList);
        },
        handlePictureCardPreview(file) {
            if(/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)){
                this.dialogImageUrl = file.url;
                this.pdfVisible = false;
                this.imageVisible=true;
            }else if(/.(pdf)$/.test(file.name)){
                this.pdfUrl = file.url;
                this.imageVisible=false;
                this.pdfVisible = true;
            }else{
                this. handleDownload(file);
            }

        },
        handleDownload(file) {
            var vm = this;
            let index = null;
            vm.fileList.forEach((item, key) => {
                if (item.uid === file.uid) {
                    index = key;
                    return false;
                }
            });

            var params = {};
            params.path = vm.totalFileList[index].file_path;
            if(params.path === "") {
                vm.$message({
                    type: "warning",
                    message: "该附件未上传"
                })
                return;
            }
            MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
            .then(res => {
                var orig_file_nm =  vm.totalFileList[index].orig_file_nm;
                let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
                var a = document.createElement("a");
                a.download = orig_file_nm;
                a.style.display = "none";
                a.href = window.URL.createObjectURL(URL);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                })
            .catch(err => {
                console.error(err);
            });

        },
        handleChange(file, fileList){
             this.fileList = fileList;
            console.log(file);
            const isLt8M = file.size / 1024 / 1024 < 20;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            if (!isLt8M) {
                this.fileList.splice(fileList.indexOf(file), 1);
                this.$message({
                type: "warning",
                message: "凭证文件大于20M"
                })
            } else {
                let formData = new FormData();
                formData.append("file", file.raw);
                formData.append("org_id", userInfo.org_id);
                formData.append("path", "PD");
                MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
                .then(res => {
                    if (res && res.code === "200" && res.data && res.data.path) {
                        file.status = "success";
                        let param={
                            file_path:res.data.path,
                            orig_file_nm:file.name,
                            fileType:this.uploadAttachType,
                            file_size: file.size,
                            uid: file.uid,
                            url: window.URL.createObjectURL(file.raw)
                        }
                        let url =  window.URL.createObjectURL(file.raw);
                        this.fileList[fileList.indexOf(file)].url  = url;
                        this.fileList[fileList.indexOf(file)].name  = this.getDictName(this.uploadAttachType)+file.name;
                        this.totalFileList[fileList.indexOf(file)] = param;
                        this.$emit('changeFile',  this.totalFileList)

                    } else {
                        this.fileList.splice(fileList.indexOf(file), 1);
                        this.$message({
                        type: 'error',
                        message: '上传失败！'
                        })
                    }
                    })
                .catch(err => {
                    console.error("err==========", err);
                });
            }

        },

        dataUrlToBlob(data, prefix) {
            var bstr = window.atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: prefix });
        },
        clearFileList(){
            this.totalFileList=[];
            this.fileList=[];
        },
        /**
        * 关闭图片预览
        */
        closePreview() {
            this.imageVisible = false;
        },

        getDictName(dictId){
            let vm = this;
            let perfix = "";
            if(vm.typeList && vm.typeList.length>0 && dictId && dictId!=""){
                vm.typeList.forEach(item=>{
                    if(item.dictId == dictId){
                        perfix = item.dictName+"_";
                    }
                })
            }

            return perfix;
        }
    },

}
</script>
<style lang="less" scoped>
    .el-dialog-dev{
        max-height:70vh;
        overflow:auto;
    }
</style>
