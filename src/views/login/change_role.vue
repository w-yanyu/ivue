<template>
  <div class="role-main">
    <ul class="role-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="getData(item.role_id)"
        class="role-list-item"
      >
        <img :src="item.imgUrl" />
        <p>{{ item.role_name }}</p>
      </li>
    </ul>
  </div>
</template>
<style lang="less">
.role-main {
  padding: 10px;
  .role-list {
    width: 100%;
    padding: 0;
    float: left;
    height: 300px;
    overflow: auto;
    .role-list-item {
      float: left;
      width: 33%;
      text-align: center;
      margin-bottom: 15px;
      cursor: pointer;
      p {
        margin-top: 0px;
      }
    }
  }
}
</style>
<script>
import Tools from "pte-ui/utils/Tools";
import { LoginService } from "pte-ui/services";
import { mapGetters, mapMutations } from "vuex";
import SysConfig from "@/pte/sysconfig.json";
import { i18ns } from "pte-ui/utils/i18n";
import routerUtil from "pte-ui/utils/routerUtil";
import axios from "axios";
export default {
  name: "switchRole",
  props: {
    cMeta: Object // 角色数据
  },
  data() {
    return {
      items: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters(["themes"])
  },
  created() {
    this.dataInit();
  },
  methods: {
    ...mapMutations([
      "setTagNavList",
      "SET_THEME",
      "SET_LANGUAGE",
      "SET_HOME_NAME",
      "PTE_TAGSVIEW_SET_HOME_NAME",
      "PTE_TAGSVIEW_SETTAGNAVLIST"
    ]),
    getData(role_id) {
      let url = "/SUMP/rest/auth/changeUserRole";
      axios
        .post(url, { role_id }, { token: localStorage.getItem("access_token") })
        .then(res => {
          localStorage.setItem("user_info", JSON.stringify(res.data.data));

          let obj = JSON.parse(sessionStorage.getItem("PTE_USER"));
          let obj2 = JSON.parse(localStorage.getItem("user_info"));
          localStorage.setItem(
            "PTE_USER",
            JSON.stringify(
              Object.assign({}, obj, {
                current_role_id: obj2.current_role_id,
                current_role_name: obj2.current_role_name
              })
            )
          );
          sessionStorage.setItem(
            "PTE_USER",
            JSON.stringify(
              Object.assign({}, obj, {
                current_role_id: obj2.current_role_id,
                current_role_name: obj2.current_role_name
              })
            )
          );

          this.$dataBus.doCallBack(this, res);
          setTimeout(() => {
            this.getRoutes();
          }, 500);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // //加载url数据
    dataInit() {
      const cacheUserInfo = localStorage.getItem("user_info");
      const userInfo = JSON.parse(cacheUserInfo);

      this.items = userInfo.role_list;
      // this.items = userInfo.role_list.filter(ele => {return ele.default_role_flag !== '1'});
      this.items.forEach((item, index) => {
        item.imgUrl = require("../../../public/default_avatar.png");
      });
    },
    clearDictData() {
      window.sessionStorage.removeItem("dictionaries");
    },
    getRoutes() {
      this.$store
        .dispatch("PET_ROUTERMAP_GETROUTELIST")
        .then(routesMap => {
          const routeData = _.get(routesMap, "data");
          let treeData = Tools.forRoutesData(routeData);
          const root = {
            path: "/",
            redirect: treeData[0].path + "/" + treeData[0].children[0].path,
            hidden: true
          };
          treeData.push(root);
          // 将后台数据转为树形结构
          // localStorage.setItem("ROUTES", JSON.stringify(routeData));
          routerUtil.set(routeData);
          this.$router.addRoutes(treeData);
          this.PTE_TAGSVIEW_SET_HOME_NAME(treeData[0].children[0].name);

          this.$router.push({ path: "/" + treeData[0].children[0].name });
          //过滤主页
          let res = this.$store.state.pte_tagsNav.tagNavList.filter(
            item => item.name === this.$store.state.pte_tagsNav.homeName
          );
          this.PTE_TAGSVIEW_SETTAGNAVLIST(res);
          Tools.setUserConfig("globalForm", {});

          location.reload();
        })
        .catch(err => {
          console.log("err===========", err);
        });
    }
  }
};
</script>
