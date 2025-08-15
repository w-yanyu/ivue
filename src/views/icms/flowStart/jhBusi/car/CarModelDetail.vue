<template>
  <div>
    <el-form ref="carModelDetailForm" :rules="appRules" :model="carModelDetailForm" label-width="200px"
             class="custom-common--form">
      <el-row v-show="false">
        <el-col :span="8">
          <el-form-item :label="$i18ns('品牌编号')" prop="brand_no">
            <el-input type="text" v-model="carModelDetailForm.brand_no" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('品牌名称')" prop="brand_name">
            <el-input type="text" v-model="carModelDetailForm.brand_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车系编号')" prop="car_kind_no">
            <el-input type="text" v-model="carModelDetailForm.car_kind_no"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车系名称')" prop="car_kind_name">
            <el-input type="text" v-model="carModelDetailForm.car_kind_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车型编号')" prop="car_model_no">
            <el-input type="text" v-model="carModelDetailForm.car_model_no" disabled>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车型名称')" prop="car_model_name">
            <el-input type="text" v-model="carModelDetailForm.car_model_name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('使用状态')" prop="brand_state">
            <el-input type="text" :value="getDictLabel('brandStateList', carModelDetailForm.brand_state)"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车身结构')" prop="sizetype">
            <el-input type="text" v-model="carModelDetailForm.sizetype" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('排量')" prop="displacement2">
            <el-input type="text" v-model="carModelDetailForm.displacement2" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('厂商指导价')" prop="price">
            <el-input type="text" v-model="carModelDetailForm.price" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('生产状态')" prop="productionstate">
            <el-input type="text" v-model="carModelDetailForm.productionstate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('销售状态')" prop="salestate">
            <el-input type="text" v-model="carModelDetailForm.salestate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('变速箱类型')" prop="geartype">
            <el-input type="text" v-model="carModelDetailForm.geartype" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('年款')" prop="yeartype">
            <el-input type="text" v-model="carModelDetailForm.yeartype" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('上市日期')" prop="listdate">
            <el-input type="text" v-model="carModelDetailForm.listdate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('乘员人数 (个)')" prop="seatnum">
            <el-input type="text" v-model="carModelDetailForm.seatnum" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$i18ns('档位数')" prop="gearnum">
            <el-input type="text" v-model="carModelDetailForm.gearnum" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$i18ns('车厢数')" prop="compartnum">
            <el-input type="text" v-model="carModelDetailForm.compartnum" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$i18ns('车型图标')" prop="logo">
            <el-image
              :src="carModelDetailForm.logo"
              :fit="fit">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center">
          <el-button type="primary" @click="qryModelDetailInfo">{{$i18ns('查看车型详情')}}</el-button>
          <el-button type="primary" @click="carModelCallback">{{$i18ns('选择')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :title="$i18ns('查看车型详情')" :visible.sync="carModelDetailVisible" v-if="carModelDetailVisible" width="30%"
               :before-close="handleClose"
               top="30vh"
               :append-to-body="true">
      <to-json
        :toUrl="carModelDetailUrl"
        :params="this.carModelDetailForm"
      ></to-json>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CarModelDetail",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      carModelDetailUrl: "@carDetailView",
      carModelDetailVisible: false,
      carModelDetailForm: {
        brand_no: "",//品牌编号
        brand_name: "",//品牌名称
        car_kind_no: "",//车系编号
        car_kind_name: "",//车系名称
        car_model_no: "",//车型编号
        car_model_name: "",//车型名称
        price: "",//厂商指导价
        sizetype: "",//车身结构
        displacement2: "",//排量(mL)
        geartype: "",//变速箱类型
        color: "",//车身颜色
        brand_state: "",//使用状态
        productionstate: "",//生产状态
        salestate: "",//销售状态
        yeartype: "",//年款
        listdate: "",//上市日期
        seatnum: "",//乘员人数 (个)
        gearnum: "",//档位数
        compartnum: "",//车厢数
        logo: ""//车型图标
      },
      brandStateList: []
    };
  },
  created() {
    this.carModelDetailForm.car_model_no = this.cParentParams.car_model_no;
    this.initFormData();
    this.getDictList("MS_E_YESORNO", "brandStateList");
  },
  inject: {
    parentCarModelCallback: "carModelCallback",
  },
  methods: {
    initFormData() {
      let params = {
        car_model_no: this.carModelDetailForm.car_model_no,
        servicecode: "co0045"
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.carModelDetailForm = res.data;
            console.log("车型细腻", this.carModelDetailForm);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    carModelCallback() {
      this.parentCarModelCallback(this.carModelDetailForm);
    },
    qryModelDetailInfo() {
      this.carModelDetailVisible = true;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictLabel(listName, value) {
      let that = this;
      let tempValue = value;
      for (const item of that[listName]) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
