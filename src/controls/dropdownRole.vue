<template>
  <div style="position: absolute; right: -1px; top: -2px;">
    <el-dropdown @command="handleCommand" trigger="click">
      <el-tooltip class="item" effect="dark" content="角色切换" placement="bottom">
        <span class="el-dropdown-link">
          <i class="el-icon-s-custom"></i>
        </span>
      </el-tooltip>
      
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in list"
          :key="index"
          :command="item"
        >
          {{ item.role_name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import _ from "lodash";
import Tools from "pte-ui/utils/Tools";
import { LoginService } from "pte-ui/services";
import { mapGetters, mapMutations } from "vuex";
import SysConfig from "@/pte/sysconfig.json";
import { i18ns } from "pte-ui/utils/i18n";
import routerUtil from "pte-ui/utils/routerUtil";
import axios from "axios";

export default {
  name: "dropdownRole",
  props: {
    config: Object, // 控件的相关配置
    name: String,
    scope: Object,
    value: String,
    /* 配置项 */
    defaultProps: {
      type: Object,
      default: () => {
        return {};
      }
    },

    /* 初始值 */
    value: [String, Number],
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      list: [],
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
      loading: false, //非异步情况loading
      hasDefinedNode: false,
      pageCodeStr: "", //节点的唯一标识
      labelField: "", //节点的唯一标识
      parentCodeStr: "", // 节点父节点标识
      currentSelectNode: {},
      loading: false
    };
  },
  created() {
    this.dataInit();
  },
  mounted() {},
  computed: {
    ...mapGetters(["themes"])
  },
  watch: {},
  methods: {
    ...mapMutations([
      "setTagNavList",
      "SET_THEME",
      "SET_LANGUAGE",
      "SET_HOME_NAME",
      "PTE_TAGSVIEW_SET_HOME_NAME",
      "PTE_TAGSVIEW_SETTAGNAVLIST"
    ]),
    /**
     * 获取角色列表信息
     */
    dataInit() {
      const cacheUserInfo = localStorage.getItem("user_info");
      const userInfo = JSON.parse(cacheUserInfo);

      this.list = userInfo.role_list;
    },
    handleCommand(command) {
      const role_id = command.role_id;
      // this.$publicFn.openNavTab("@dashboard", "首页", command, this);
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

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}

.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
