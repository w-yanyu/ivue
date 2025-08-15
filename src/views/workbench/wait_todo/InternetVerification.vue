<template>
  <div class="verifiy-container clearfix">
    <div class="verifiy-left">
      <el-form
        ref="interForm"
        :model="interForm"
        :rules="interRules"
        label-width="120px"
        class="custom-common--form"
      >
        <el-row class="internet-info--title">基本资料</el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户姓名:">{{interForm.custna}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">{{genderTranslate(interForm.gender)}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码:">{{interForm.mobino}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="internet-info--title">单位信息</el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称:">{{interForm.emplna}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位电话:">{{interForm.emptel}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位地址:">{{interForm.empadd}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="internet-info--title">住宅信息</el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="住宅地址:">{{interForm.house_addr}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="internet-info--title">联系人信息</el-row>
        <el-row v-for="(item, index) in interForm.contacts" :key="index">
          <el-col :span="8">
            <el-form-item :label="`联系人姓名${numberTranslate(index)}:`">{{item.custna}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关系:" label-width="70px">{{shipTranslate(item.relatp)}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号码:" label-width="100px">{{item.mobino}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="internet-info--title">审核信息</el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果:"  prop="result">
              <el-radio v-model="interForm.result" @change="resultChange" label="S">通过</el-radio>
              <el-radio v-model="interForm.result" @change="resultChange" label="F">拒绝</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="拒绝原因:" v-show="isShowReject">
              <el-checkbox-group v-model="interForm.rejectResaion">
                <el-checkbox  v-for="(item,i) in reasionList" :key="i" :label="item.id">{{item.content}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核备注:" prop="apdesc">
              <el-input type="textarea" :rows="4" v-model="interForm.memo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="custom-common--footer">
          <el-button type="primary" size="small" @click="bottomSubmit">{{$i18ns('保存')}}</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="verifiy-right">
      <div class="verifiy-right--title">人脸比对信息</div>
      <div class="verifiy-right--container clearfix">
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">大头照</span>
          <el-image @contextmenu.prevent :src="imageForm.faceUrl" fit="scale-down" @click="openPreview(imageForm.faceUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证正照片</span>
          <el-image @contextmenu.prevent :src="imageForm.backUrl" fit="scale-down" @click="openPreview(imageForm.backUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证反面</span>
          <el-image @contextmenu.prevent :src="imageForm.frontUrl" fit="scale-down" @click="openPreview(imageForm.frontUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <image-preview :preview-url="previewUrl" @close="closePreview" v-if="showViewer" />
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";

export default {
  name: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {
    ImagePreview
  },
  data() {
    return {
      interForm: {
        custna: "", // 客户姓名
        custid: "", // 客户ID
        gender: "", // 性别
        mobino: "", // 手机号码
        emplna: "", // 单位名称
        emptel: "", // 单位电话
        empadd: "", // 单位地址
        house_addr: "", // 住宅信息
        contacts: [], // 联系人信息
        result: "", // 审核结果
        rejectResaion: [],//拒绝原因
        memo: "", // 备注
      },
      reasionList: [
        {id:"A_INF_A001",content:"手持身份证照片非现场照片"},
        {id:"A_INF_A002",content:"手持身份证照片模糊"},
        {id:"A_INF_A003",content:"身份证照片不全"},
        {id:"A_INF_A004",content:"身份证照片模糊"},
        {id:"A_INF_B001",content:"身份证照片无法识别"},
        {id:"A_INF_B002",content:"人脸对比不通过"},
        {id:"A_INF_Z001",content:"其他"},
        {id:"A_INF_C001",content:"单位名称不合规"},
        {id:"A_INF_C002",content:"单位电话不合规"},
        {id:"A_INF_C003",content:"单位地址不合规"},
        {id:"A_INF_C004",content:"住宅地址不合规"},
        {id:"A_INF_A005",content:"身份证为截屏不合规"},
        {id:"A_INF_A006",content:"身份证有效期不合规"}
      ],
      interRules: {},
      genderList: [], // 性别数据字典列表
      shipList:[],//获取关系字典列表
      imageForm: { // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "", // 身份证反面
      },
      isShowReject: false,
      showViewer: false, // 控制预览组件显示/隐藏
      previewUrl: "", // 预览图片路径
    }
  },
  created() {
    this.getBasicInfo(); // 获取申请人基本信息
    this.getDictList("MS_E_GENDER", "genderList"); // 获取性别数据字典
    this.getIdCardInfo(); // 初始化申请人影像信息
    this.getDictList("E_LINKREL", "shipList"); // 获取关系数据字典
  },
  methods: {
    // 打开图片预览
    openPreview(url) {
      this.showViewer = true;
      this.previewUrl = url;
    },
    closePreview() {
      this.showViewer = false;
    },
    /**
     * 获取申请人基本信息
     */
    getBasicInfo() {
      let params = {
        applid: this.cParentParams.applid,
        servicecode: "AS_ICMS_CM_CUSAUD",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.interForm.custna = res.data.custna;
          this.interForm.custid = res.data.custid;
          this.interForm.gender = res.data.gender;
          this.interForm.mobino = res.data.mobino;
          this.interForm.emplna = res.data.emplna;
          this.interForm.emptel = res.data.emptel;
          this.interForm.empadd = res.data.empadd;
          this.interForm.house_addr = res.data.house_addr;
          this.interForm.contacts = res.data.contacts;
          this.interForm.result = !!res.data.result ? res.data.result : "S";
          this.interForm.rejectResaion = res.data.rejectResaion;
          this.interForm.memo = res.data.memo;
          if (this.interForm.result === "F") {
            this.isShowReject = true;
          }

        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },


    /**
     * 审核结果change回调
     */
    resultChange(val){
      if (val==="F") {
        this.isShowReject = true;
      }else{
        this.isShowReject = false;
      }
    },
    /**
     * 性别转换
     */
    genderTranslate(gender) {
      for (let index = 0;index < this.genderList.length;index++) {
        const item = this.genderList[index];
        if (item.dictId === gender) return item.dictName;
      }
    },

    /**
     * 关系转换
     */
    shipTranslate(ship) {
      for (let index = 0;index < this.shipList.length;index++) {
        const item = this.shipList[index];
        if (item.dictId === ship) return item.dictName;
      }
    },
    /**
     * 数字转换
     */
    numberTranslate(num) {
      num++;
      num = String(num);
      const data = {
        '0': '零',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九',
      };
      return num.split('').map(v => data[v] || v).join('');
    },
    /**
     * 获取申请人影像信息
     */
    getIdCardInfo() {
      let params = {
        applid: this.cParentParams.applid,
        servicecode: "AS_ICMS_CM_FILERC",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          res.data.forEach(item => {
            switch (item.filetp) {
              case "1":
                this.imageForm.backUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              case "2":
                this.imageForm.frontUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              case "3":
                this.imageForm.faceUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              default:
                break;
            }
          });
        }
      })
    },
    /**
     * 客户基础资料提交
     */
    bottomSubmit() {
      this.$refs.interForm.validate(valid => {
        if (valid) {
          if (this.interForm.result) {
            if (this.interForm.result === "S" || (this.interForm.result === "F" && this.interForm.rejectResaion.length > 0) ) {
                let params = {
                  applid: this.cParentParams.applid,
                  custid: this.interForm.custid,
                  result: this.interForm.result,
                  memo: this.interForm.memo,
                  rejectResaion: this.interForm.rejectResaion,
                  servicecode: "AS_ICMS_CM_FIREAD",
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                  if (res && res.code === "200") {
                    this.$message({
                      type: "success",
                      message: "操作成功"
                    })
                  }
                }).catch(err => {
                  console.error(err);
                })
              }else{
                this.$message({
                  type: "warning",
                  message: "请选择拒绝原因"
                })
            }
          } else {
            this.$message({
              type: "warning",
              message: "请选择审批结果"
            })
          }
        }
      })
    },
  }
};
</script>
<style lang="less" scoped>
.verifiy-left {
  width: 50%;
  float: left;
  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}
.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}
.custom-common--footer {
  padding-top: 10px;
}
.verifiy-right {
  width: 50%;
  float: left;
  border-left: 1px solid #dcdfe6;
  box-sizing: border-box;
  .verifiy-right--title {
    padding: 16px 0 12px 12px;
    font-size: 14px;
    font-weight: 600;
    color: #666;
  }
  .verifiy-right--block {
    text-align: center;
    width: 50%;
    float: left;
    box-sizing: border-box;
    .verifiy-right--desc {
      display: block;
    }
    .el-image {
      width: 290px;
      height: 290px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .left-block {
    .el-image {
      border-right: 1px solid #e3e8f5;
      cursor: pointer;
    }
  }
}
</style>
