<template>
    <div class="page_content">
        <div class="item-tale" v-for="(itemClass,index) in tempList" :key="index">
            <div class="title-table" @click.prevent="unDown(itemClass,index)">
                <i class="el-icon-caret-top" type="primary" v-if="itemClass.isOpen"></i>
                <i class="el-icon-caret-bottom" v-else></i>
                <p>{{itemClass.index_grade}}、{{itemClass.index_content}}</p>
            </div>
            <table class="table-content" v-show="itemClass.isOpen">
                <tr v-for="(itemsubitem,index) in itemClass.children" :key="index">
                    <td class="table-index">
                        <p class="table-index-p">{{itemsubitem.index_grade}}</p>
                    </td>
                    <td class="table-text">
                        <p class="table-text-p">{{itemsubitem.index_content}}</p>
                    </td>
                    <td class="table-choose">
                        <div class="table-choose-div">
                            <el-radio v-model="itemsubitem.is_situation" label="1">{{$i18ns('是')}}</el-radio>
                            <el-radio v-model="itemsubitem.is_situation" label="0">{{$i18ns('否')}}</el-radio>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="item-tale" v-if="tempList.length===0">{{$i18ns('暂无相关数据，请稍后尝试')}}</div>

        <el-button type="primary" plain @click.native.prevent="saveData" v-if="show_flash !== '' && tempList.length>0">{{$i18ns('保存')}}</el-button>
    </div>
</template>
<script>
import MyMessage from "pte-ui/utils/MyMessage";
export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            form: {
                channelType: "", //控制类型
                status: "", //状态
                channelName: "", //渠道名
                dictId: "", //渠道编号值
            },
            channelOptions: [],
            statusOptions: [],
            channelNameOptions: [],
            isBtnDisabel: true,
            dialogVisible: false,

            cooperationSelectionTemp: null, //选择了的合作列表暂存
            cooperationSelection: null, //选择了的合作列表
            radio: "1",
            pageData: [], //页面数据
            tempList: [],
            show_flash:"",
        };
    },
    mounted() {
        // console.log('cParentParams', this.cParentParams);
        // console.log('cParentMeta', this.cParentMeta);
        // console.log('cParentScope', this.cParentScope);
        this.initData();
         this.show_flash = this.cParentParams.show_flash;
    },
    methods: {
        //初始化页面数据
        initData() {
            this.pageData = []; //页面数据列表
            let request_map = {}
            let request_url = "/SUMP/icmcall/icmRPCCall";
            request_map["servicecode"] = "us0380";
            request_map["cust_no"] = this.cParentParams.cust_no ? this.cParentParams.cust_no : '';
            request_map["index_code"] = this.cParentParams.index_code ? this.cParentParams.index_code : 'risk_yj';
            this.$http.invokeAPI(request_url, "post", request_map).then(response => {
              if (response.code === "200") {
                this.pageData = response.data
                this.tidyPageData(this.pageData)
              } else {
                MyMessage({
                  message: response.message,
                  type: 'error'
                });
              }
            });
        },
        //整理页面数据准备渲染
        tidyPageData(data) {
            // let that = this;
            // let tidyData = [];
            // let menuIndex = [];
            // for (let j in data) {
            //     if (data[j].prrank === "") {
            //         menuIndex.push(j);
            //     }
            // }
            // for (let i in data) {
            //     if (data[i].prrank === "") {
            //         data[i].isOpen = true;
            //         tidyData.push(data[i]);
            //     } else {
            //         data[i].istrue =
            //             data[i].istrue != null ? data[i].istrue : "N";
            //         tidyData.push(data[i]);
            //     }

            //     if (that.find(i, menuIndex)) {
            //         that.tempList.push(tidyData);
            //         tidyData = [];
            //     }
            //     if (parseInt(i) + 1 === parseInt(data.length)) {
            //         that.tempList.push(tidyData);
            //     }
            // }
            // console.log("tempList", that.tempList);
            let map = {};
            let val = [];
            let parent = {};
            data.forEach((item) => {
                delete item.children;
                item.id = item.index_grade;
                item.pid = item.index_superior;
                item.label = item.index_content;
                if (item.index_superior === "") {
                    item.isOpen = true;
                } else {
                    item.is_situation = item.is_situation != null ? item.is_situation : "0";
                }
                map[item.id] = item;
                parent = map[item.pid];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            this.tempList = val;
            console.log("======cgc=====:")
            console.log(this.tempList);
        },
        // find(findKey, array) {
        //     for (let i in array) {
        //         if (parseInt(findKey) + 1 === parseInt(array[i])) {
        //             return true;
        //         }
        //     }
        //     return false;
        // },
        //上传数据前规整数据
        saveData() {
            let that = this;
            let tidyData = [];
            for (let i in that.tempList) {
                console.log("======that.tempList[i]=====:");
                console.log(that.tempList[i]);

                if(that.tempList[i].children !==null && that.tempList[i].children !==undefined){
                  for(let j in that.tempList[i].children){
                      tidyData.push(that.tempList[i].children[j]);
                  }
                 }
            }
            console.log(tidyData);
            that.postData(tidyData);
        },
        //上传数据
        postData(tidyData) {
            let request_map = {};
            let request_url = "/SUMP/icmcall/icmRPCCall";
            request_map["servicecode"] = "us0381";
            request_map["cust_no"] = this.cParentParams.cust_no
                ? this.cParentParams.cust_no
                : "";
            request_map["list01"] = tidyData;
            this.$http
                .invokeAPI(request_url, "post", request_map)
                .then((response) => {
                    console.log("us0381", response);
                    if (response.code === "200") {
                        console.log(response.data);
                        MyMessage({
                            message: response.message,
                            type: "success",
                        });
                    } else {
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
        unDown(item, index) {
            console.log("isOpen", item.isOpen + "--------------" + item.index_grade);
            item.isOpen = !item.isOpen;
            this.$set(this.tempList[index], 0, item);
            console.log("tempList", this.tempList);
        },

        //加载渠道控制类型选项
        initChannelOptions() {
            let request_map = {};
            let request_url = "/SUMP/rest/dict";
            request_map["dictType"] = "E_CHATTP";
            request_map["dictKey"] = "E_CHATTP";
            this.$http
                .invokeAPI(request_url, "post", request_map)
                .then((response) => {
                    if (response.code === "200") {
                        console.log(response.data);
                        this.channelOptions = response.data;
                    } else {
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
        //加载状态类型选项
        initStatusOptions() {
            let request_map = {};
            let request_url = "/SUMP/rest/dict";
            request_map["dictType"] = "E_CHSTAT";
            request_map["dictKey"] = "E_CHSTAT";
            this.$http
                .invokeAPI(request_url, "post", request_map)
                .then((response) => {
                    if (response.code === "200") {
                        console.log(response.data);
                        this.statusOptions = response.data;
                    } else {
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
        initChannelNameOptions() {
            let request_map = {};
            let request_url = "/SUMP/rest/dict";
            request_map["dictType"] = "E_SERVTP";
            request_map["dictKey"] = "E_SERVTP";
            this.$http
                .invokeAPI(request_url, "post", request_map)
                .then((response) => {
                    if (response.code === "200") {
                        console.log(response.data);
                        this.channelNameOptions = response.data;
                    } else {
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
        changeNameValue(dictId) {
            this.form.dictId = dictId;
        },
        //合作方选择请求
        cooperationSelect() {
            this.dialogVisible = true;
            this.cooperationData = []; //合作方列表数据
            let request_map = {};
            let request_url = "/SUMP/icmcall/icmRPCCall";
            request_map["servicecode"] = "AS_ICMS_PD_QYOFLS";
            this.$http
                .invokeAPI(request_url, "post", request_map)
                .then((response) => {
                    console.log("cooperationSelect", response);
                    if (response.code === "200") {
                        console.log(response.data);
                        this.isBtnDisabel = false;
                        this.cooperationData = response.data;
                    } else {
                        this.isBtnDisabel = true;
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
        //合作方选择处理方法
        handleSelectionChange(val) {
            console.log(val);
            this.cooperationSelectionTemp = val;
        },
        //合作方选择对话框取消
        cooperationDialogCancle() {
            this.dialogVisible = false;
            this.cooperationSelectionTemp = null;
        },
        //合作方选择对话框显示
        cooperationDialogSubmit() {
            this.dialogVisible = false;
            let temp = this.cooperationSelectionTemp;
            for (let i in temp) {
                temp[i].remark = "";
                temp[i].port = "0";
            }
            // for(let i=0;i<10;i++)
            // temp.push(temp[0])

            this.cooperationSelection = temp;
            console.log(this.cooperationSelection);
        },

        openMask(request, response) {
            console.log("open build todo");
            if (this.dialogVisible === false) {
                this.dialogVisible = true;
            }

            let workflow_rsp = response.workflow_info;
            let request_rsp = request.data;

            let json_request = JSON.parse(request_rsp);
            let json_workflow = JSON.parse(workflow_rsp);

            this.workflow_info.page_id = json_request.page_id;
            this.workflow_info.output_page_id = json_request.output_page_id;
            this.request_data = request.data;
            this.route_id_list = json_workflow.LINE_LIST;
            this.workflow_info.ince_id = json_workflow.ince_id;
        },
        clickCancel() {
            this.dialogVisible = false;
        },
        clickConfirm() {
            this.workflow_info.update_page_info = this.request_data;
            this.workflow_info.original_page_info = this.request_data;
            this.dialogVisible = false;

            let request_url = "/SUMP/call/RPCCall";
            this.workflow_info["servicecode"] = "ct2016";

            this.$http
                .invokeAPI(request_url, "post", this.workflow_info)
                .then((response) => {
                    if (response.code === "200") {
                        MyMessage({
                            message: response.message,
                            type: "success",
                        });
                    } else {
                        MyMessage({
                            message: response.message,
                            type: "error",
                        });
                    }
                });
        },
    },
};
</script>
<style lang="css" scoped>
.page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.item-tale {
    width: 90%;
    font-family: "PingFang SC";
    font-size: 16px;
    font-weight: bold;
    margin: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title-table {
    width: 100%;
    background-color: #93cdff;
    border-radius: 5px 5px 0 0;
    height: 40px;
    display: flex;
    align-items: center;
}

.table-content {
    width: 100%;
    font-size: 14px;
}

table,
th,
td {
    font-weight: normal;
    border: 1px solid #93cdff;
}

tr {
    width: 100%;
    height: 10px;
}

.table-index {
    width: 10%;
    vertical-align: center;
    text-align: right;
}

.table-index-p {
    margin-right: 4px;
}

.table-text {
    width: 70%;
    vertical-align: center;
    text-align: left;
}

.table-text-p {
    margin-left: 4px;
}

.table-choose {
    width: 20%;
    vertical-align: center;
    text-align: center;
}

.table-choose-div {
    margin-left: 4px;
}

.el-icon-caret-top,
.el-icon-caret-bottom {
    color: #c9ebff;
    margin-right: 5px;
    margin-left: 5px;
}
</style>
