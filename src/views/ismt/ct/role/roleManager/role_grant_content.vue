<template>
  <!-- <template v-if="!isShowAuthority && cacheCollapseListData.length === 0 || isReadOnly">
      <div class="authority-role-content__header" v-if="!isReadOnly">
        <div class="authority-role-content__header--action">
          <slot name="contentHeader" />
        </div>
      </div>
      <div class="empty-text_box">
        缺省图配置
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </div>
    </template> -->
  <div>
    <!-- 缺省图配置 -->
    <emptyData v-if="!active" class="empty-box"></emptyData>
    <div v-else>
      <el-card shadow="always" class="title margin-b-12">
        {{ selectTitle }}
      </el-card>
      <div ref="contentBox" class="config-content">
        <div
          class="left-content margin-r-16"
          @drop.stop="handleDrop(true)"
          @dragover.stop="handleDragOver"
        >
          <div class="left-content__header">
            <span>{{ $i18ns("默认数据权限") }}</span>
          </div>
          <!-- 缺省图配置 -->
          <div
            v-if="selectedDataPermission.length === 0"
            class="left-content__empty"
          >
            <emptyData class="left-content__emptybox"></emptyData>
          </div>
          <ul class="left-content__body" v-else>
            <li
              class="left-content__body--lists"
              v-for="(item, index) in selectedDataPermission"
              :key="index"
            >
              <div class="lists-content">
                <!-- <div
                class="lists-content__icon"
                :class="
                  !isShowAuthority && isDefaultAuthority ? 'default-auth' : ''
                "
              >
                <svg-icon iconname="iconpermission"></svg-icon>
              </div> -->
                <span>{{ item.data_perm_name }}</span>
              </div>
              <div class="lists-btn">
                <i class="el-icon-close" @click="removeRule(item, index)"></i>
              </div>
            </li>
          </ul>
        </div>
        <div class="right-conten" ref="ruleBox">
          <div class="right-conten__header">
            <span>{{ $i18ns("数据权限及规则") }}</span>
          </div>
          <ul class="right-conten__body" v-loading="collapseLoading">
            <li
              class="right-conten__body--lists"
              v-for="(item, index) in ruleLists"
              :key="index"
              :class="item.checked ? 'selected' : ''"
              :draggable="!item.checked"
              @dragstart.stop="e => handleDragStart(e, item)"
            >
              {{ item.data_perm_name }}
            </li>
            <el-pagination
              v-show="ruleLists.length > length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="start"
              :page-sizes="[10, 15, 20]"
              :page-size="length"
              layout="total,sizes,prev,pager,next,jumper"
              :total="total"
              style="text-align: right;"
            >
            </el-pagination>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import debounce from "lodash/debounce";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import Tools from "pte-ui/utils/Tools";

export default {
  name: "authorityConfig",
  props: {
    roleCode: String,
    isReadOnly: {
      // 是否是view页面
      type: Boolean,
      default: true
    },
    isShowAuthority: {
      // 概览界面只显示已选权限数据
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    filterText: {
      // 过滤的字段
      type: String,
      default: ""
    },
    collapseList: {
      type: Array,
      default: () => []
    },
    isMultiRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false, // Box是否显示
      config: {
        leftIndex: "",
        rightIndex: ""
      },
      collapseLoading: false,
      selectedDataPermission: [],
      ruleLists: [], // 规则数据
      parentData: {},
      cloneCollapseData: [], // 存储collapseList的数据，用作本页数据渲染
      cacheCollapseListData: [], // 缓存手风琴数据
      cloneDataPermission: [], // 存储已选的权限数据
      collapseActive: "",
      draggingNode: null, // 拖拽的节点
      isDefaultAuthority: false, // 显示默认数据权限
      selectTitle: "", // 左侧选中菜单标题
      length: 10,
      start: 1
    };
  },
  watch: {
    filterText: {
      handler(newValue, oldValue) {
        if (oldValue === undefined) return; // 过滤掉第一次oldValue未赋值的情况
        if (oldValue !== newValue) {
          this.setFilterText(this.filterText, newValue, () => {
            // 过滤数据
            this.collapseActive = "-1";
            this.cloneCollapseData =
              newValue === ""
                ? [...this.cacheCollapseListData]
                : this.cacheCollapseListData.filter(f =>
                    f.dataPermName.includes(newValue)
                  );
          });
        }
      },
      immediate: true,
      deep: true
    },
    collapseList: {
      handler(newValue, oldValue) {
        this.collapseActive = "-1";
        this.cloneCollapseData = this.cacheCollapseListData = JSON.parse(
          JSON.stringify(newValue)
        );
        this.cloneDataPermission = this.cloneCollapseData.filter(
          f => f.checked
        ); // 已选数据权限
        let defaultDataPermission = this.cloneCollapseData.filter(
          f => f.defaultPerm
        ); // 默认数据权限
        if (this.cloneDataPermission.length || this.isMultiRole) {
          this.isDefaultAuthority = false;
          this.selectedDataPermission = this.cloneDataPermission;
        } else {
          // 默认数据权限为空
          if (defaultDataPermission.length) {
            //查询的默认权限，在右侧权限列表应是选中状态
            this.cloneCollapseData.forEach(element => {
              defaultDataPermission.forEach(ele => {
                if (ele.dataPermId === element.dataPermId) {
                  element.checked = true;
                }
              });
            });
          }
          this.selectedDataPermission = defaultDataPermission;
          this.isDefaultAuthority = true;
        }
        if (this.filterText) {
          // 拖拽后有搜索条件重新过滤
          this.cloneCollapseData =
            this.filterText === ""
              ? [...this.cacheCollapseListData]
              : this.cacheCollapseListData.filter(f =>
                  f.dataPermName.includes(this.filterText)
                );
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(["roleCurrentNodeInfo", "roleDefaultDataPermission"])
  },
  created() {},
  mounted() {
    // 接受左侧点击事件,先清除之前的监听事件
    this.$bus.off("rightModify");
    this.$bus.on("rightModify", this.rightModify);
  },
  methods: {
    ...mapActions(["setCurrentNodeInfo"]),
    ...mapMutations([
      "ADD_DATA_PEIMISSION_ITEM",
      "DELETE_DATA_PEIMISSION_ITEM"
    ]),
    /**
     * 左侧点击事件处理
     * 查询已选列表及规则列表
     */
    rightModify(item) {
      if (item) {
        this.active = true;
        this.parentData = item;
        this.selectTitle = item.title;
        this.initSelectPer(item);
      }
    },
    handleDragStart(event, item) {
      this.draggingNode = item;
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(value, item) {
      // 左侧删除、右侧拖拽后发送请求
      if (this.isMultiRole) {
        this.$confirm(
          i18n.t("role_tips_GrantAuth"),
          i18n.t("PTE_confirmTitle"),
          {
            confirmButtonText: i18n.t("PTE_confirm"),
            cancelButtonText: i18n.t("PTE_confirmCancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.addBatchDataPermission(value, item);
          })
          .catch(() => {
            //
          });
      } else {
        this.addDataPermission(value, item);
      }
    },
    addDataPermission(value, item) {
      let { data_perm_id } = item || this.draggingNode,
        params = {
          role_id: this.parentData.role_id,
          data_perm_type: this.parentData.data_perm_type,
          parent_code: this.parentData.parent_code,
          data_perm_id: data_perm_id,
          checked: value,
          servicecode: "ct3315"
        };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          value
            ? this.ADD_DATA_PEIMISSION_ITEM(this.draggingNode)
            : this.DELETE_DATA_PEIMISSION_ITEM(item);
          this.$message({
            type: "success",
            message: res.message || i18n.t("PTE_successInfo")
          });
          this.initSelectPer(this.parentData); // 重新加载数据
        })
        .catch(err => {
          //
        });
    },
    /**
     * 数据权限及规则列表查询
     */
    initRule(item, index, position) {
      // 获取rule数据
      this.collapseLoading = true;
      let params = {
        data_perm_id: "",
        data_perm_name: "",
        start: this.start,
        length: this.length,
        servicecode: "ct3306"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          this.collapseLoading = false;
          // this.$set(this.cloneCollapseData[index], "content", res.data ? res.data: [])
          this.ruleLists = res.data ? res.data : [];
          this.ruleLists.forEach(ele => {
            this.selectedDataPermission.forEach(e => {
              if (e.data_perm_id === ele.data_perm_id) ele.checked = true;
            });
          });
        })
        .catch(err => {
          this.collapseLoading = false;
        });
    },
    handleSizeChange(val) {
      this.length = val;
      this.start = 1;
      this.initRule(); //重新渲染列表
    },
    //处理当前页数改变的方法
    handleCurrentChange(val) {
      this.start = val;
      this.initRule();
    },
    /**
     * 查询已选数据
     */
    removeRule(item, index) {
      // 移除已选
      this.$confirm(i18n.t("PTE_confirmInfo"), i18n.t("PTE_confirmTitle"), {
        confirmButtonText: i18n.t("PTE_confirm"),
        cancelButtonText: i18n.t("PTE_confirmCancel"),
        type: "warning"
      })
        .then(() => {
          let params = {
            role_id: item.role_id,
            data_perm_id: item.data_perm_id,
            parent_code: item.parent_code,
            servicecode: "ct3316"
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              this.$message({
                type: "success",
                message: res.message || i18n.t("PTE_successInfo")
              });
              this.initSelectPer(this.parentData); // 重新加载数据
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: i18n.t("PTE_cancelMsg")
          });
        });
    },
    initSelectPer(item) {
      this.collapseLoading = true;
      let params = {
        role_id: item.role_id,
        data_perm_type: item.data_perm_type,
        parent_code: item.parent_code,
        servicecode: "ct3321"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          this.selectedDataPermission = res.data;
          this.initRule(item);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 使用防抖动函数，规避频繁触发的情况
    setFilterText: debounce((key, value, callback) => {
      key = value;
      callback && callback();
    }, 300),
    closeRule() {
      this.active = false;
    }
  }
};
</script>

<style lang="less" scoped>
.empty-box {
  text-align: center;
  ::v-deep p {
    margin-top: 0 !important;
  }
}
.config-content {
  display: flex;
  .title {
    position: absolute;
    top: 2%;
    left: 2%;
    font-size: 14px;
    color: #333333;
  }
  .left-content {
    flex: 1;
    &__header {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      display: flex;
      line-height: 32px;
      margin-bottom: 15px;
    }
    &__emptybox {
      position: relative;
      text-align: center;
      ::v-deep p {
        margin-top: 0 !important;
        position: absolute;
        bottom: -10%;
        left: 47%;
      }
    }
    &__body {
      height: calc(100% - 48px);
      overflow-y: auto;
      padding: 0;
      &--lists {
        display: flex;
        justify-content: space-between;
        line-height: 28px;
        padding: 6px 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background: #f7f9fd;
        border-radius: 4px;
        cursor: pointer;
        .lists-content {
          // width: 80%;
          font-size: 13px;
          color: #333333;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &__icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            margin-right: 5px;
            border-radius: 50%;
            text-align: center;
            background: #ffdae5;
            > svg {
              color: #e55093;
            }
          }
          &__icon.default-auth {
            background: #e9ecf1;
            > svg {
              color: #bac3d3;
            }
          }
        }
        .lists-btn {
          // width: 20%;
          min-width: 56px;
          text-align: right;
          &__icon {
            display: inline-block;
            width: 26px;
            height: 26px;
            margin-left: 10px;
            line-height: 26px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 50%;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 1px 4px 0 rgba(124, 147, 202, 0.5);
            cursor: pointer;
          }
          i {
            font-size: 14px;
            font-weight: bold;
            padding-left: 2px;
            cursor: pointer;
          }
          i:hover {
            color: #e72c2c;
          }
        }
      }
    }
  }
  .right-conten {
    flex: 1;
    width: 240px;
    padding: 5px 10px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 2px 3px 8px 1px rgba(155, 155, 155, 0.5);
    border-radius: 8px;
    &__header {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      display: flex;
      line-height: 32px;
      margin-bottom: 15px;
    }
    &__body {
      height: calc(100% - 48px);
      overflow-y: auto;
      padding: 0;
      &--lists {
        display: flex;
        justify-content: space-between;
        line-height: 28px;
        padding: 6px 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        background: #f7f9fd;
        border-radius: 4px;
        cursor: pointer;
        .lists-content {
          // width: 80%;
          font-size: 13px;
          color: #333333;
          font-weight: bold;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &__icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            margin-right: 5px;
            border-radius: 50%;
            text-align: center;
            background: #ffdae5;
            > svg {
              color: #e55093;
            }
          }
          &__icon.default-auth {
            background: #e9ecf1;
            > svg {
              color: #bac3d3;
            }
          }
        }
        .lists-btn {
          // width: 20%;
          min-width: 56px;
          text-align: right;
          &__icon {
            display: inline-block;
            width: 26px;
            height: 26px;
            margin-left: 10px;
            line-height: 26px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 50%;
            font-weight: bold;
            background: #ffffff;
            box-shadow: 0 1px 4px 0 rgba(124, 147, 202, 0.5);
            cursor: pointer;
          }
          i {
            font-size: 14px;
            font-weight: bold;
            padding-left: 2px;
            cursor: pointer;
          }
          i:hover {
            color: #e72c2c;
          }
        }
      }
      &--lists:hover {
        box-shadow: 0 0 10px 0 rgba(0, 53, 143, 0.28);
        // border: 1px solid #efefef;
      }
      &--lists.selected:hover {
        box-shadow: 0 0 0 0;
      }
      &--lists.selected {
        cursor: no-drop;
        div.lists-content__icon {
          background: #e9ecf1;
          > svg {
            color: #bac3d3;
          }
          > span {
            color: #bcc2de;
          }
        }
      }
    }
  }
}
</style>
