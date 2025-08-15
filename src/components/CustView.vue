<template>
    <div class="cust-view">
        <div class="center">
            <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFileMethod"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="icon icon-dskh"></i>
            </el-upload>
            <p class="name">
                {{$i18ns('名称')}}
                <span v-if="cParentParams.cust_name">：{{cParentParams.cust_name}}</span>
            </p>
            <p>
                {{$i18ns('证件号码')}}
                <span v-if="cParentParams.cert_no">：{{cParentParams.cert_no}}</span>
            </p>
            <p v-if="is_label">
                {{$i18ns('客户标签')}}
                <span>：
                    <span v-for="(item, index) in array"  :key="index">
                        <i :class="item.label_flg" style="font-size:2px" :title="item.label_name"></i>&ensp;
                    </span>
                </span>
            </p>
            <div v-if="isEdit" class="footer-btns">
                <el-button type="primary" @click="saveConfirm" v-loading="loading">{{$i18ns('保存')}}</el-button>
                <el-button type="warning" plain @click="initWidgetList">{{$i18ns('重置')}}</el-button>
            </div>
        </div>
        <template v-for="(item, index) in widgetList">
            <el-card
                v-if="isEdit || item.info_item_id"
                class="box-card default-font-color"
                :key="index"
                :style="`transform: translate(${item.position.x}%, ${item.position.y}%) rotateZ(${item.position.rot}deg) translateY(30vh) rotate(${-item.position.rot}deg)`"
                :body-style="{ height: `calc(100% - ${item.info_thumbnail_item_page ? 60 : 0}px)` }"
            >
                <template slot="header" v-if="item.info_item_name">
                    <span><i v-if="item.icon" :class="`header_icon ${item.icon}`"></i>{{item.info_item_name}}</span>
                    <div>
                        <i v-if="item.info_item_page" class="el-icon-more" @click="detail(item)"></i>
                        <i v-if="isEdit" class="el-icon-close" @click="close(index)"></i>
                    </div>
                </template>
                <to-json
                    v-if="item.info_thumbnail_item_page"
                    :toUrl="item.info_thumbnail_item_page"
                    :params="cParentParams"
                ></to-json>
                <div v-else class="report-add-widget" @click="chooseView(index)">
                    <i class="el-icon-plus">{{$i18ns('选择视图')}}</i>
                </div>
            </el-card>
        </template>
        <el-dialog title="复核" :visible.sync="dialogFormVisible">
             <el-form
                ref="form"
                :rules="rules"
                :model="form"
                label-width="80px"
                >
                <div>
                    <el-form-item :label="$i18ns('复核员')" prop="review_user_id">
                    <el-input v-model="form.review_user_id"></el-input>
                    </el-form-item>
                    <el-form-item :label="$i18ns('密码')" prop="review_user_passwd">
                    <!-- <el-input v-model="form.review_user_passwd"></el-input> -->
                    <pte-password
                        v-model="form.review_user_passwd"
                        name="passwd"
                        :type="pwdType"
                        encryptionType="SHA"
                        :min="1"
                    ></pte-password>
                    <span class="show-pwd" @click="showPwd">
                        <span class="iconfont icon-yanjing1" v-show="isShowPwd"></span>
                        <span class="iconfont icon-see" v-show="iseye"></span>
                    </span>
                    </el-form-item>
                    <!-- <el-form-item :label="$i18ns('复核标志')" prop="review_flag">
                    <el-radio-group v-model="form.review_flag">
                        <el-radio label="0">否</el-radio>
                        <el-radio label="1">是</el-radio>
                    </el-radio-group>
                    </el-form-item> -->
                </div>
                <el-form-item class="footer">
                    <el-button type="primary" @click="save">{{$i18ns('保存')}}</el-button>
                    <el-button @click="cancelSubmit">{{$i18ns('取消')}}</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    props: {
        cParentParams: {
            type: Object,
            default: () => {},
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {

            //toSelectVeiw:this.$i18ns('可选视图列表'),
            deleteConf:this.$i18ns('确定删除该栏位信息吗'),
            message:this.$i18ns('提示信息'),
            successTip:this.$i18ns('操作成功'),
            loanFail:this.$i18ns('上传失败'),
            pictureRule1:this.$i18ns('图片仅支持JPG/PNG格式'),
            pictureRule2:this.$i18ns('图片大小不能超过2MB'),
            widgetList: [],
            currentIndex: null,
            imageUrl: "",
            is_label: false,
            array: [],
            dialogFormVisible: false,
            review_flag: "",
            form: {
                review_user_id: "",
                review_user_passwd: ""
            },
            pwdType: "password",
            isShowPwd: true,
            iseye: false,
            rules: {
                review_user_id: [
                { required: true, message: "请输入", trigger: "blur" }
                ],
                review_user_passwd: [
                { required: true, message: "请输入", trigger: "blur" }
                ]
            },
            loading: false,
        };
    },
    watch: {
        cParentParams: {
            handler(val, oldval) {
                this.initWidgetList();
                this.getWidgetList(val);
                if (this.cParentParams.cust_id && !this.cParentParams.cust_type) {
                  this.cParentParams.cust_no = this.cParentParams.cust_id;
                  this.getCustDetail();
                }
                if (this.cParentParams.cust_id){
                  this.cParentParams.cust_no = this.cParentParams.cust_id;
                }
                if (!this.cParentParams.cust_id){
                  this.addTempParams();
                }
            },
            deep: true,
        },
    },
    created() {
        this.initWidgetList();
         if (this.cParentParams.cust_id) {
            this.cParentParams.cust_no = this.cParentParams.cust_id;
            this.getCustDetail();
        }
        this.initLabelId();
    },
    methods: {
        /**
         * 初始化查询当前产品是否需要复核
         */
        initSearch() {
            let params = {
                appId: this.cParentParams.appId || "usOnl",
                length: 10,
                review_flag: "",
                role_id: "",
                servicecode: "ms0062",
                start: 1,
                sub_system_id: "",
                system_id: "",
                trxn_code: this.cParentParams.servicecode || "us1150",
                trxn_desc: "",
                登记报文标志: ""
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then(res => {
                if (res && res.code === "200") {
                    // 是否需要复核，需要则先填写信息，再进行保存操作
                    this.review_flag = res.data[0].review_flag;
                    if(this.review_flag === '1') {
                        this.dialogFormVisible = true;
                    } else {
                        this.dialogFormVisible = false;
                        this.save();
                    }
                }
                })
                .catch(err => {
                this.dialogFormVisible = false;
                console.error(err);
                });
        },
        initLabelId() {
            let params = {
                cert_no: this.cParentParams.cert_no,
                label_state: 0,
                servicecode: "mk0012",
            };
            this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res.data.length > 0) {
                        this.is_label = true;
                        for (let i=0; i<res.data.length; i++) {
                            this.initLabelFlg(res.data[i].label_id);
                        };
                    }
                });
        },
        initLabelFlg(val) {
            let params = {
                label_id: val,
                servicecode: "mk0001",
            };
            this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    this.array.push(res.data[0])
                });
        },
        initWidgetList() {
            this.widgetList = [
              { position: { x: -50, y: -55 } },
              { position: { x: -5, y: -65 } },
              { position: { x: -5, y: -55 } },
              { position: { x: -5, y: -45 } },
              { position: { x: -50, y: -55 } },
              { position: { x: -95, y: -45 } },
              { position: { x: -95, y: -55 } },
              { position: { x: -95, y: -65 } },
            ];
            let currRot = 360 / this.widgetList.length;
            this.widgetList.forEach((item, index) => {
                this.$set(item.position, "rot", currRot * (index + 4));
            });
        },
        getWidgetList(val) {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "us1149",
                    cust_type_no: val.node_cd,
                })
                .then((response) => {
                    if (response.data.info.field_list.length > 0) {
                        response.data.info.field_list.forEach((item) => {
                            if (item.sort_no) {
                                this.$set(this.widgetList, item.sort_no, {
                                    ...this.widgetList[item.sort_no],
                                    ...item,
                                });
                            }
                        });
                    } else {
                        this.initWidgetList();
                    }
                    loading.close();
                });
            if (!this.isEdit) {
                this.widgetList.forEach((item) => {});
            }
        },
        getCustDetail() {
            let params = {
                cust_no: this.cParentParams.cust_id,
                servicecode: "us0005",
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    this.cParentParams.cert_no = res.data.info.cert_no;
                    this.cParentParams.cert_type = res.data.info.cert_type;
                    this.cParentParams.apply_cust_type = res.data.info.cust_type;
                    this.getWidgetList({
                        ...this.cParentParams,
                        node_cd: res.data.info.cust_type
                    });
                });
        },
        chooseView(index) {
            this.currentIndex = index;
            this.$dataBus.bindCallBackMethod(this, this.chooseViewCallBack, {});
            this.$dialog.open({
                that: this,
                title: "可选视图列表",
                toRequest: {
                    url: "/views/us/viewManage/viewConfig/view_list.json",
                    method: "get",
                    params: {
                        parent_node_cd: this.cParentParams.node_cd,
                        cust_no: this.cParentParams.cust_no
                    },
                },
                width: "60%",
            });
        },
        chooseViewCallBack(btnConfig, response) {
            if (this.currentIndex !== null) {
                this.$set(this.widgetList, this.currentIndex, {
                    ...this.widgetList[this.currentIndex],
                    ...response,
                    sort_no: this.currentIndex,
                });
              console.log("widgetList", this.widgetList);
            }
        },
        detail(item) {
            this.$dialog.open({
                that: this,
                title: item.info_item_name,
                width: "60%",
                toRequest: {
                    url: item.info_item_page,
                    method: "get",
                    params: { ...this.cParentParams },
                }
            });
        },
        close(index) {
            this.$confirm(this.deleteConf, this.message, {
                type: "warning",
            })
                .then(() => {
                    this.$set(this.widgetList, index, {
                        position: this.widgetList[index].position,
                    });
                })
                .catch(() => {});
        },
        saveConfirm() {
            this.loading = true;
            this.initSearch();
        },
        save() {
            let fieldList = [];
            this.widgetList.forEach((item) => {
                if (item.info_item_id) {
                    fieldList.push(item);
                }
            });
            const params = {
                servicecode: "us1150",
                cust_type_no: this.cParentParams.node_cd,
                file_path: this.imageUrl,
                field_list: fieldList,
                review_flag: this.review_flag,
                review_user_id: this.form.review_user_id,
                review_user_passwd: this.form.review_user_passwd
            };
            if(this.review_flag === '1') {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$http
                        .invokeAPI("/SUMP/call/RPCCall", "post", params)
                        .then((response) => {
                            this.loading = false;
                            this.dialogFormVisible = false;
                            this.$message({
                                type: "success",
                                message: this.successTip,
                            });
                        });
                    }
                })
            } else {
                this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    this.loading = false;
                    this.dialogFormVisible = false;
                    this.$message({
                        type: "success",
                        message: this.successTip,
                    });
                });
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error(this.pictureRule1);
            }
            if (!isLt2M) {
                this.$message.error(this.pictureRule2);
            }
            return isJPG && isLt2M;
        },
        uploadFileMethod(param) {
            let file = param.file;
            let formData = new FormData();
            formData.append("file", file);
            this.$http
                .invokeAPI("/SUMP/minioCall/upload", "post", formData)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.imageUrl = res.data.path;
                    } else {
                        this.$message({
                            type: "error",
                            message: this.loanFail,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
      addTempParams(){
        this.cParentParams.cust_no = "UR" + parseInt(Math.random() * 100000);
        this.cParentParams.cert_type = "101";//证件类型：身份证
        // this.cParentParams.cert_no = "CERT" + parseInt(Math.random() * 100000);
        this.cParentParams.cert_no = "xxx";
        this.cParentParams.apply_cust_type = "";
      },
      /**
         * 密码加密显示隐藏
         */
        showPwd() {
        if (this.pwdType === "password") {
            this.pwdType = "";
            this.isShowPwd = false;
            this.iseye = true;
        } else {
            this.pwdType = "password";
            this.isShowPwd = true;
            this.iseye = false;
        }
        },
      cancelSubmit() {
        this.loading = false;
        this.dialogFormVisible = false;
        this.$dialog.close();
        this.resetForm();
        },
        resetForm() {
        this.$refs.form.resetFields();
        }
    },
};
</script>

<style lang="less" scoped>
.cust-view {
    height: calc(100vh - 115px);
    position: relative;
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        text-align: center;
        font-size: 18px;
        i {
            font-size: 84px;
            line-height: 1;
            //color: #368ee0;
            color: #368ee0;
            outline: 10px solid rgba(54, 142, 224, 0.2);
            outline-offset: -6px;
            border-radius: 50%;
        }
        p {
            margin: 14px;
            font-size: 14px;
        }
        .name {
            margin-top: 20px;
        }
    }
    /deep/ .box-card {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 280px;
        height: 150px;
        .el-card__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 8px ;
            border-top: 4px solid #368ee0 ;
            i {
                margin-left: 8px;
                cursor: pointer;
                color: #4b5960;
            }
            span {
              color: #4b5960;
            }
          .header_icon{
            margin-left: 0px;
            margin-right: 8px;
          }
        }
        .el-card__body {
            overflow: scroll;
        }
      .el-card__body::-webkit-scrollbar {
        width: 10px;
      }
        .report-add-widget {
            height: calc(100% - 20px);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
/deep/ .avatar-uploader .el-upload {
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
}
.avatar {
    width: 84px;
    height: 84px;
    display: block;
}

/deep/ .el-form-item__content {
  .pte-password-input {
    width: 100%;
  }
  .show-pwd {
    position: absolute;
    top: 4px;
    right: 8px;
  }
}

</style>
