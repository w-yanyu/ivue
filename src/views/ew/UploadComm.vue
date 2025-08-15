<template>
    <div>
    <div>
        <div class="container-content--toolbar" >
            <el-button type="primary" @click="upload" plain>上传文件</el-button>
        </div>
        <div class="container-centent--table">
            <el-table ref="tableFileData" :data="tableFileData" :border="true" style="width: 98%;">
                <el-table-column label="序号" type="index" align="center">
                </el-table-column>
                <el-table-column label="文件名"  prop="file_name"  align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="文件大小(byte)"  prop="filesize"  align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="文件上传时间" prop="datetime" align="center" show-overflow-tooltip>
                </el-table-column>


                <el-table-column label="文件路径" prop="filepath" align="center" show-overflow-tooltip>
                </el-table-column>

            
                <el-table-column label="操作" prop="deal_type"  align="center" width="200px"> 
                    <template slot-scope="scope" >
                        <el-button type="text" @click="view(scope.row)">查看</el-button>
                        <el-button type="text" @click="downloadBase64(scope.row)">下载</el-button>
                        <el-button type="text" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="container-content--pagination">
            <el-pagination v-if="tableFileData.length > 0"
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10,15,20]"
            :page-size="tableSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableTotal">
            </el-pagination>
        </div>
        <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
        <el-dialog :visible.sync="pdfVisible" width="1200px">
            <div class="el-dialog-dev" >
                <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0"></iframe>
            </div>
        </el-dialog>
    </div>
    <el-dialog title="上传文件" :visible.sync="dialogFileVisible" :show-close="true" width="600px" :close-on-click-modal="false" top="20vh">
        <el-upload
        ref="uploadProp"
        action="#"
        :on-preview = "handlePictureCardPreview"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :limit="40"
        multiple>
        <el-button size="small" type="primary">上传文件</el-button>
        </el-upload>
        <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
        <el-dialog :visible.sync="pdfVisible" width="1200px">
            <div class="el-dialog-dev" >
                <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0"></iframe>
            </div>
        </el-dialog>
        <div class="custom-common--footer">
            <el-button type="primary" @click="submit()" align-items=center>提交</el-button>
            <el-button type="primary" @click="cancel" align-items=center>取消</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";
import _ from "lodash";
export default {
    name : "UploadFile",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components :{
        ImagePreview
    },
    data(){
        return{
            activeNames : ['1'],
            basicForm:{
                custno : "",
                acctna : "",
                applyAmt : "",
                channel_code : "",
                applyDt : "",
            },
            isShow : false,
            totalNum: 0,
            erortx : "",
            frtT : "",
            sndT : "",
            fileId : "",
            bid:"",
            tableFileData : [],
            channel_no:"",
            nodecode:"",
            yesnoList: [], //是否列表
            dialogVisible : false, //维护弹框是否展示
            dialogFileVisible : false, //文件上传弹框是否展示
            currentPage: 1,
            tableTotal: 40,
            tableSize: 10,
            dialogImageUrl: '',
            fileType : "Picture",
            fileList:[],
            pdfVisible:false,
            imageVisible:false,
        }
    },
    mounted(){
        this.getDictList("E_YES___", "yesnoList"); //是否字典
    },
    created(){
        this.apply_no = this.cParentParams.apply_no;//业务编号
        this.bid = this.cParentParams.apply_no;
        this.channel_no = this.cParentParams.channel_no;//渠道编号

        this.upload_path = "ICMSImage/".concat(`${this.channel_no}`).concat("/").concat(`${this.apply_no}`).concat("/");//该类渠道下，一笔业务一个单独文件夹

this.search();
    },
    methods:{








        /**
         * 获取数据字典列表
         * @param dictType  数据字典 dictTyp
         * @param listKey 列表对象key名称
         */
        getDictList(dictType, listKey) {
        let that = this;
        let params = {
            dictType: dictType,
            dictKey: [dictType]
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
            .then(res => {
            if (res && res.code === "200") {
                this[listKey] = res.data;
                return this[listKey];
            }
            })
            .catch(err => {
            console.error(err);
            });
        },
        /**
         * 获取信息
         */
        getFileInfo(bid,nodecode) {
            if( this.cParentParams.apply_no){
            console.log("bid:",bid);
            console.log("nodecode",nodecode);

            let params = {
                servicecode: "jny030",
                bid : bid,
                nodecode:nodecode,
                pageStart: (this.currentPage - 1) * this.tableSize,
                pageSize: this.tableSize,
            };
            MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
            .then((res) => {
                if (res && res.code === "200") {
                    this.tableFileData = res.data;
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                    this.getTotalFile(bid,nodecode);
                } else {
                    this.$message({message: res.message,type: 'error'});
                }
            });
        }
        },
        /**
         * 获取信息
         */
        getTotalFile(bid,nodecode) {
            let params = {
                servicecode: "jny030",
                bid : bid
            };
            MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
            .then((res) => {
                if (res && res.code === "200") {
                    this.totalNum = res.pageParam ? res.pageParam.total : 0;
                } else {
                    this.$message({message: res.message,type: 'error'});
                }
            });
        },
        /**
         * 维护
         */
        maintain(row){
            this.dialogVisible = true;
            if(row.fileId == '2'){
                this.isShow = false;
            }else{
                this.isShow = true;
            };
            this.erortx = row.erortx;
            this.fileId = row.fileId;
            this.channel_no=row.channel_no;
            this.nodecode=row.nodecode;
            this.search();
        },
        /**
         * 删除
         */
        del(row){
            this.$confirm("确定删除该信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let params = {
                    servicecode: "jny031",
                    fileId : row.fileId
                };
                this.$http.invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.$message({message: res.message,type: 'success'});
                        this.search();
                    } else {
                        this.$message({message: res.message,type: 'error'});
                    }
                });
            });
        },
         /**
          * 上传文件
          */
        upload(){
            this.dialogFileVisible = true;
            this.pdfVisible = false;
            this.imageVisible = false;
        },
        search(val){
            
            this.currentPage = 1;
            this.getFileInfo(this.bid,this.nodecode);
        },
        /**
        * 分页sizeChange 回调
        */
        sizeChange(val) {
            this.tableSize = val;
            this.getFileInfo(this.bid);
        },
        /**
        * 分页currentChange回调
        */
        currentChange(val) {
            this.currentPage = val;
            this.getFileInfo(this.bid);
        },
        showPictureView(url){
            this.dialogImageUrl = url;
            this.pdfVisible = false;
            this.imageVisible=true;
        },

        showPdfView(url){
            this.pdfUrl = url;
            this.imageVisible=false;
            this.pdfVisible = true;
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
        handlePictureCardPreview(file) {
            if(file.url){//是否是新上传文件
                if(/.(gif|jpg|jpeg|png|gif|jpg|png|PNG)$/.test(file.name)){
                    this.showPictureView(file.url);
                }else if(/.(pdf)$/.test(file.name)){
                    this.showPdfView(file.url);
                    this.timer = new Date().getTime(); //更新timer，重新加载子组件
                }else{
                    this.downloadOtherFile(file.url,file.name);
                }
            }else{
                this.handleDownload(file);
            }
        },
        downloadOtherFile(url,name){
            var a = document.createElement("a");
            a.download = name;
            a.style.display = "none";
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        handleDownload(file) {
            let fileitem = []; // 文件清单
            let file_Info = {};
            file_Info = {
                filepath: file.filepath,
                file_name: file.file_name,
                nodecode: file.nodecode,
                bid: file.bid,
                cid: file.cid,
                fileId: file.fileId,
                datetime: file.datetime,
                entries: file.entries
            };
            console.log("file_Info:" + file_Info);
            fileitem.push(file_Info);
            let params = {
                servicecode: "jny029",
                fileitems: fileitem,
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
                if (res.code === "200") {
		            //转base64
                    let params = {
                        servicecode: "ar4132",
                        file_path: file.path
                    };
                    MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
                    .then(res => {
                        if(/.(gif|jpg|png|gif|jpg|png)$/.test(file.name)){
                        this.dialogImageUrl = "data:image/png;base64,"+res.data.file_id;
                        this.pdfVisible = false;
                        this.imageVisible=true;
                        }else if(/.(jpeg)$/.test(file.name)){
                        this.dialogImageUrl = "data:image/jpeg;base64,"+res.data.file_id;
                        this.pdfVisible = false;
                        this.imageVisible=true;
                        }else if(/.(pdf)$/.test(file.name)){
                        this.pdfUrl = "data:application/pdf;base64,"+res.data.file_id;
                        this.imageVisible=false;
                        this.pdfVisible = true;
                        }else{
                        file.url = res.data.file_id;
                        var filename =  file.name;
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
                    });
                }
            });
        },
        view(file) {
            let fileitem = []; // 文件清单
            let file_Info = {};
            file_Info = {
                filepath: file.filepath,
                file_name: file.file_name,
                nodecode: file.nodecode,
                bid: file.bid,
                cid: file.cid,
                fileId: file.fileId,
                datetime: file.datetime,
                entries: file.entries
            };
            console.log("file_Info:" + file_Info);
            fileitem.push(file_Info);
            let params = {
                servicecode: "jny029",
                fileitems: fileitem,
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
                if (res.code === "200") {
		            //转base64
                    let params = {
                        servicecode: "ar4132",
                        file_path: file.filepath
                    };
                    MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
                    .then(res => {
                        if(/.(gif|jpg|png|gif|jpg|png|JPG|PNG|GIF)$/.test(file.file_name)){
                            this.dialogImageUrl = "data:image/png;base64,"+res.data.file_id;
                            this.pdfVisible = false;
                            this.imageVisible=true;
                        }else if(/.(jpeg|JPEG)$/.test(file.file_name)){
                            this.dialogImageUrl = "data:image/jpeg;base64,"+res.data.file_id;
                            this.pdfVisible = false;
                            this.imageVisible=true;
                        }else if(/.(pdf|PDF)$/.test(file.file_name)){
                            this.pdfUrl = "data:application/pdf;base64,"+res.data.file_id;
                            this.imageVisible=false;
                            this.pdfVisible = true;
                        }else{
                            this.$message({type:"warning",message:"暂不支持该文件类型的在线预览"})
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
                }
            });   
        },
        handleChange(file, fileList){
            if (this.fileType && this.fileType === 'Picture') {
                let name = file.name.split(".");
                let type = name[name.length - 1];
                if ('jpg' != type && 'png' != type && 'pdf' != type && 
                    'JPG' != type && 'PNG' != type) {
                    this.fileList = [];
                    this.$message({
                        type: "warning",
                        message: `只能上传jpg、png或pdf格式的文件`
                    });
                    return false;
                }
            }
            this.fileList = fileList;

            const isLt8M = file.size / 1024 / 1024 > 10;
            if (isLt8M) {
            this.fileList.splice(fileList.indexOf(file), 1);
            this.$message({
                type: "warning",
                message: "文件不能大于10M"
            })
            } else {
            let formData = new FormData();
            formData.append("file", file.raw);

            var path="ICMSImage/workflow/";
                path=path.concat(this.bid).concat("/");

                console.log("path:"+path);

            formData.append("path", path);
            MyAxios.invokeAPI("/SUMP/icmcall/PlFile", "post", formData)
                .then(res => {
                if (res && res.code === "200" && res.data && res.data.path) {
                    file.status = "success";
                    let param={
                       filePath: res.data.path,
                       fileName: res.data.filename,
                        upflag: "1",
                        erortx: this.erortx,
                        filetp: "ZMCL",
                    }
                    let url =  window.URL.createObjectURL(file.raw);
                    file.url  = url;
                    file.name  = file.name;
                    this.fileList[fileList.indexOf(file)] = param;
                    this.$message({type: 'success',message: '上传成功'})
                } else {
                    this.fileList.splice(fileList.indexOf(file), 1);
                    this.$message({
                    type: 'error',
                    message: '上传失败！'
                    })
                }
                })
                .catch(err => {
                console.error(err);
                });
            }
        },
        handleRemove(file) {
            let index = null;
            let arr = []
            this.fileList.forEach((item, key) => {
            if (item.uid != file.uid) {
                arr.push(item)
                
            }
            });
            this.fileList = arr 
        },
        formatPath(sourcePath, needRemovePath) {
           let regExp = new RegExp(needRemovePath, 'g');
           return sourcePath.replace(regExp, '');
       },
        submit(){
       //开始组装filelist对象
           var file = [];

         for (var i = 0; i < this.fileList.length; i++) {

              var fileName = this.fileList[i].fileName;
              var filePath = this.fileList[i].filePath;

              filePath = this.formatPath(filePath, fileName);

             let C_FILE_LIST = {
                "filetp": "ZMCL",
                "filaph": filePath,
                "filena": fileName,
                "upflag": "1",
                "erortx": "DHYJ"
             };

                 file.push(C_FILE_LIST);

        }

          let filelist = {
              file: file
          }

            let params = {
              servicecode: "jny021",
              cert_no: "",
              apply_no: this.apply_no,
              filelist: filelist,
              channel_no: this.channel_no,
              appl_prod_cd: ""
            };

            MyAxios.invokeAPI("/SUMP/call/RPCCall", "POST", params)
            .then(res => {
                if (res && res.code === "200") {
                    this.$message({
                    type: "success",
                    message: "操作成功"
                    });
                    this.dialogFileVisible = false;
                    this.fileList = [];
                    this.search();
                }
            })
            .catch(err => {
                console.error(err);
            });
        },

        /**
        * 取消
        */
        cancel(){
            this.fileList = [];
            this.dialogFileVisible = false;
        },

        /**
         * 关闭图片预览
         */
        closePreview() {
            this.imageVisible = false;
        },

        downloadBase64(row){
            let fileitem = []; // 文件清单
            let file_Info = {};
            file_Info = {
                filepath: row.filepath,
                file_name: row.file_name,
                nodecode: row.nodecode,
                bid: row.bid,
                cid: row.cid,
                fileId: row.fileId,
                datetime: row.datetime,
                entries: row.entries
            };
            console.log("file_Info:" + file_Info);
            fileitem.push(file_Info);
            let params = {
                servicecode: "jny029",
                fileitems: fileitem,
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
                if (res.code === "200") {
		            //转base64
                    let params = {
                        servicecode: "ar4132",
                        file_path: row.filepath
                    };
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                        .then(res => {
                        this.file_id = res.data.file_id;
                        let base64Url = `${this.file_id}`;
                        let fileName = row.file_name;
                    console.log(base64Url);
                    console.log(fileName);
                    let byteCharacters = atob(base64Url);
                    let byteNumbers = new Array(byteCharacters.length);
                    for (var i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    let byteArray = new Uint8Array(byteNumbers);
                    let blob = new Blob([byteArray], { type: "application/octet-stream" });
                    if (navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(blob, fileName);
                    } else {
                        let link = document.createElement("a");
                        link.href = window.URL.createObjectURL(blob);
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(link.href);
                    }

                    })
                    .catch(err => {
                        console.error(err);
                });
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.container-centent--table{
    padding-top: 10px;
}
.custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
    }
  }
.button_down {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top:20px
}
</style>