<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item class="collapse-item"
                      v-for="(item, index) in tableList"
                      :key="index"
                      :name="index">
      <template slot="title">
        <i class="header-icon el-icon-info"></i><em></em>{{ item.name }}
      </template>
<!--            <div class="thumbnail_image">-->
<!--&lt;!&ndash;              <img :src="cParentParams.thumbnail_image" />&ndash;&gt;-->
<!--            </div>-->

      <el-row v-for="(item1,index1) in item.fieldList"
              :key="index1">
        <el-col :span="10" class="el-col">
          <div class="field-label" :id="item1.id + '-label'">{{ item1.name }}</div>
        </el-col>
        <el-col :span="14">
          <div class="field-value" :id="item1.id">{{ item1.value }}</div>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "carDetailView",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      activeNames: [], //折叠框页签
      tableList: [],//各表数据以及对应字段信息

      car_model_no: ""// 车型编号
    }
  },
  created() {
    this.car_model_no = this.cParentParams.car_model_no;
    this.getTableData();
  },
  methods: {
    /**
     * 获取各个列表数据
     */
    getTableData() {
      let that = this;
      let params = {
        servicecode: "co0046",
        car_model_no: that.car_model_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableList = res.data.info.tableList;
            for (let i = 0; i < res.data.info.tableList.length; i++) {
              let fieldListLength = res.data.info.tableList[i].fieldList.length;
              if (fieldListLength !== 0){
                that.activeNames.push(i);
              }
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 给车身颜色设置样式
     */
    getDOM() {
      const colorDev = document.getElementById('color')
      console.log(colorDev)
      if (colorDev) {
        colorDev.style.color = 'red';
        colorDev.style = {

        }
      }
    }
  }
}
</script>


<style lang="less" scoped>

.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
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

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.box {
  width: 100%;
  height: 100%;
  margin: 0 0;
  padding: 0 0;
  border: 0px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

img {
  width: 100%;
  height: 100%;
}

.field-label {
  //border-radius: 4px;
  //border: 1px solid #FFE4B5;
  //background: #FDF5E6;
  text-align: left;
  width: 100%;
  height: 25px;
  font-weight: 400;
  //vertical-align: middle;
  border-top: solid 1px #d9e5f3;
  border-right: solid 1px #d9e5f3;
}

.field-value {
  //border-radius: 4px;
  //border: 1px solid #FFE4B5;
  //background: #FFFAFA;
  width: 100%;
  height: 25px;
  text-align: left;
  overflow:hidden; //超出的文本隐藏
  font-weight: 400;
  //vertical-align: middle;
  padding-left: 10px;
  border-top: solid 1px #d9e5f3;
  border-right: solid 1px #d9e5f3;
}

.thumbnail_image {
  width: 100%;
  height: 200px;
  padding: 10px;
  background-color: #f0f2f5;
  box-sizing: border-box;

  img {
    width: 100%;
  }
}

</style>
