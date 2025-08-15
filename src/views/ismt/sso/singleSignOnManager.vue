<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-01-11 14:42:38
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-01-12 10:12:37
 * @FilePath: /ivue/src/views/ismt/ct/sso/singleSignOnManager.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="5">
        <div class="card-box">
          <el-card
            shadow="always"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div class="card-item">
              <div class="item-box">
                <i :class="['icon', 'icon-grsxsq']"></i>
                <p class="item-p">
                  <span>{{ item.system_id }}</span
                  ><span class="margin-t-8">{{ item.system_name }}</span>
                </p>
              </div>
              <p class="item-url" @click="toUrl(item.redirect_url)">{{ item.redirect_url }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "SingleSignOnManager",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let params = {
        servicecode: "ct3402",
        enable_ind:"1"
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params).then(response => {
        if (response.code === "200") {
          this.tableData = response.data;
        } else {
          that.$message({ message: response.message, type: "error" });
        }
      });
    },
    toUrl(url) {
      const accessToken = sessionStorage.getItem("access_token"); // 从某处获取 token
      const externalLink = url; // 外部链接

      Cookies.set("accessToken", accessToken);
      // window.location.href = externalLink;
      window.open(externalLink);
    }
  }
};
</script>

<style lang="less" scoped>
.card-box {
  margin: 16px;
  /deep/ .el-card__body {
    padding: 16px 24px;
  }
  .item-box {
    display: flex;
    i {
      font-size: 60px;
    }
    .item-p {
      color: #303133;
      margin-left: 16px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
    }
  }
  .item-url {
    cursor: pointer;
    margin: 0;
    word-break: break-word;
  }
}
</style>
