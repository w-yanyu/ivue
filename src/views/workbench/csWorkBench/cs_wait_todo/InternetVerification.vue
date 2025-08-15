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
          <el-col :span="8">
            <el-form-item label="关系:" label-width="70px">{{item.relatp}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码:" label-width="100px">{{item.mobino}}</el-form-item>
          </el-col>
        </el-row>
        <el-row class="internet-info--title">审核信息</el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="审核结果:" prop="result">
              <el-radio v-model="interForm.result" label="S">通过</el-radio>
              <el-radio v-model="interForm.result" label="F">拒绝</el-radio>
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
          <el-image @contextmenu.prevent :src="imageForm.faceUrl" fit="scale-down" @click="imagePreview(imageForm.faceUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证正照片</span>
          <el-image @contextmenu.prevent :src="imageForm.backUrl" fit="scale-down" @click="imagePreview(imageForm.backUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证反面</span>
          <el-image @contextmenu.prevent :src="imageForm.frontUrl" fit="scale-down" @click="imagePreview(imageForm.frontUrl)">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showViewer">
      <img width="100%" :src="previewUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
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
        memo: "", // 备注
      },
      interRules: {},
      genderList: [], // 性别数据字典列表
      imageForm: { // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "", // 身份证反面
      },
      showViewer: false, // 控制预览组件显示/隐藏
      previewUrl: "", // 预览图片路径
    }
  },
  created() {
    this.getBasicInfo(); // 获取申请人基本信息
    this.getDictList("MS_E_GENDER", "genderList"); // 获取性别数据字典
    this.getIdCardInfo(); // 初始化申请人影像信息
  },
  methods: {
    // 打开图片预览
    imagePreview(url) {
      this.showViewer = true;
      this.previewUrl = url;
    },
    /**
     * 获取申请人基本信息
     */
    getBasicInfo() {
      let params = {
        applid: this.cParentParams.applid,
        servicecode: "AS_RLMS_CM_CUSAUD",
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
          this.interForm.memo = res.data.memo;
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
     * 性别转换
     */
    genderTranslate(gender) {
      for (let index = 0;index < this.genderList.length;index++) {
        const item = this.genderList[index];
        if (item.dictId === gender) return item.dictName;
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
            let params = {
              applid: this.cParentParams.applid,
              custid: this.interForm.custid,
              result: this.interForm.result,
              memo: this.interForm.memo,
              servicecode: "AS_RLMS_CM_FIREAD",
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
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;
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
    .el-image {
      width: 100%;
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
