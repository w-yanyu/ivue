<template>
    <div class="layout-containers">
        <div class="tool-bar">
            <div class="left">
                {{layoutObj.layout_name}}
                <span v-if="layoutObj.layout_id">（{{layoutObj.layout_id}}）</span>
            </div>
            <div class="right">
                <el-button
                    type="primary"
                    icon="el-icon-s-tools"
                    size="mini"
                    @click="editLayoutInfo"
                >{{$i18ns('布局信息')}}</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-s-order"
                    size="mini"
                    @click="chooseTemp"
                >{{$i18ns('选择模板')}}</el-button>
                <el-button icon="el-icon-delete" size="mini" @click="resetWidget">{{$i18ns('清空')}}</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="save">{{$i18ns('保存')}}</el-button>
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-refresh-left"
                    size="mini"
                    @click="goBack"
                >{{$i18ns('返回')}}</el-button>
            </div>
        </div>
        <div class="report-page-outer">
            <div ref="widthOuter">
                <div
                    v-resize:debounce="refresh"
                    class="report-page"
                    :style="{height: layout.height + 'px', 'margin-left': layout.gutter + 'px'}"
                >
                    <!-- 拖拽投影，用于辅助拖拽 -->
                    <div
                        class="widget-drag-preview"
                        v-if="!!activeWidget"
                        :style="shadowWidget.screenPosition"
                    ></div>
                    <template v-if="widgetList.length">
                        <div
                            class="widget"
                            v-for="widget in widgetList"
                            :key="widget.id"
                            :style="widget.screenPosition"
                            :class="[widget === activeWidget ? 'active' : '']"
                        >
                            <!-- 拖拽移动卡片位置 -->
                            <div
                                class="widget-move"
                                draggable
                                @mousedown="handleWidgetMove($event, widget)"
                            >
                                <div
                                    v-if="widget.data.card_name"
                                    class="widget-title"
                                >{{widget.data.card_name}}</div>
                            </div>
                            <div class="widget-inner">
                                <to-json
                                    v-if="widget.data.url"
                                    :toUrl="widget.data.url"
                                    :params="widget.data.params"
                                ></to-json>
                                <div v-else class="widget-choose-card" @click="chooseCard(widget)">
                                    <div class="widget-size">
                                        <span>{{widget.position.width}}</span>
                                        ×
                                        <span>{{widget.position.height}}</span>
                                    </div>
                                    <el-button type="text">{{$i18ns('选择')}}卡片</el-button>
                                </div>
                            </div>
                            <i
                                class="widget-tools el-icon-close"
                                @click="deleteWidget(widget.id, widget)"
                            ></i>
                        </div>
                    </template>
                </div>
            </div>
            <div class="report-add-widget" @click="chooseCard()">
                <i class="el-icon-plus">{{$i18ns('选择卡片')}}</i>
            </div>
        </div>
        <el-dialog :title="$i18ns('配置布局信息')" :close-on-click-modal="false" :visible.sync="layoutInfoDialog">
            <el-form
                :model="layoutObjForm"
                :rules="layoutObjRules"
                ref="layoutForm"
                label-width="26%"
                class="form-two-column"
            >
                <el-form-item v-if="layoutObjForm.layout_id" :label="$i18ns('布局编号')" prop="layout_id">
                    <el-input v-model="layoutObjForm.layout_id" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('布局名称')" prop="layout_name">
                    <el-input v-model="layoutObjForm.layout_name"></el-input>
                </el-form-item>
                <el-form-item :label="$i18ns('布局类型')" prop="layout_type">
                    <el-select v-model="layoutObjForm.layout_type">
                        <el-option
                            v-for="(item) in layoutTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$i18ns('备注信息')" prop="remark" class="full-row" label-width="13%">
                    <el-input v-model="layoutObjForm.remark" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="saveLayoutInfo">{{$i18ns('确认')}}</el-button>
                <el-button @click="layoutInfoDialog = false">{{$i18ns('取消')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog
            :title="$i18ns('可选模板列表')"
            width="65%"
            :close-on-click-modal="false"
            :visible.sync="layoutTempDialog"
        >
            <el-form :model="searchForm" :inline="true" class="search-form-inline">
                <el-row>
                    <el-col :span="20">
                        <el-form-item :label="$i18ns('模板编号')">
                            <el-input v-model="searchForm.template_id"></el-input>
                        </el-form-item>
                        <el-form-item :label="$i18ns('模板名称')">
                            <el-input v-model="searchForm.template_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="queryTempList"
                                icon="el-icon-search"
                            >{{$i18ns('查询')}}</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="warning"
                                @click="searchReset"
                                icon="el-icon-refresh"
                                plain
                            >{{$i18ns('重置')}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <ul class="temp-list">
                <li
                    v-for="(item,index) in tempList"
                    :key="index"
                    :class="selectedNum==index?'active':''"
                    @click="select(index)"
                >
                    <div v-if="item.thumbnail_image" class="temp-img">
                        <img :src="item.thumbnail_image" />
                    </div>
                    <div v-else class="temp-img">
                        <p>暂无预览图</p>
                    </div>
                    <div class="temp-name">{{item.template_name}}</div>
                    <div class="temp-id">{{item.template_id}}</div>
                </li>
            </ul>
            <pagination :total="pageParam.total"></pagination>
            <div slot="footer">
                <el-button type="primary" @click="chooseTempCallBack">{{$i18ns('确认')}}</el-button>
                <el-button @click="layoutTempDialog = false">{{$i18ns('取消')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    dragHandle,
    Widget,
    sortWidgetList,
    isLineCollision,
    isRectCollision,
    uniqueArray,
} from "./utils";
import dictionaries from "pte-ui/utils/dictionaries";
import pagination from "pte-ui/pagination";
import ResizeObserver from "v-resize-observer";

export default {
    name: "layoutDesigner",
    components: {
        pagination,
    },
    props: {
        cParentParams: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            
            optional_card:this.$i18ns("可选卡片列表"),
            reminder_info:this.$i18ns("提示信息"),
            allcard_confirm:this.$i18ns("确定清空布局中所有卡片？"),
            card_confirm:this.$i18ns("确定删除此卡片？"),
            layout_conf:this.$i18ns("请先配置布局信息"),
            
            widgets: [],
            layout: {
                width: 200,
                height: 800,
                horizontalGridCount: 24,
                gridSize: 0,
                gutter: 10,
            },
            widgetList: [],
            shadowWidget: new Widget(),
            activeWidget: null,
            layoutTypeList: [],
            layoutObj: {},
            layoutObjForm: {},
            layoutObjRules: {
                layout_name: [
                    {
                        required: true,
                        message: "布局名称不能为空",
                        trigger: "blur",
                    },
                    {
                        max: 30,
                        message: "长度不能超过30个字符",
                        trigger: "blur",
                    },
                ],
                layout_type: [
                    {
                        required: true,
                        message: "布局类型不能为空",
                        trigger: "blur",
                    },
                ],
            },
            layoutInfoDialog: false,
            layoutTempDialog: false,
            searchForm: {
                template_id: "",
                template_name: "",
            },
            pageParam: {
                pageNumber: 1,
                pageSize: 10,
                total: 0,
            },
            selectedNum: null,
            tempList: [],
        };
    },
    created() {
        this.queryDict();
        console.log("父类传入的参数", this.cParentParams);
        if (this.cParentParams.layout_id) {
            this.layoutObj = this.cParentParams;
            this.widgets = this.cParentParams.layout_data;
        }
    },
    mounted() {
        this.widgets.forEach((item) => {
            this.addWidget(item);
        });
        this.refresh();
        window.addEventListener("resize", this.refresh);
    },
    directives: {
        resize: ResizeObserver.directive,
    },
    methods: {
        async queryDict() {
            this.layoutTypeList = await dictionaries.get({
                dictType: "CT_E_LAYOUT_TYPE",
                dictKey: ["CT_E_LAYOUT_TYPE"],
            });
        },
        editLayoutInfo() {
            this.layoutObjForm = { ...this.layoutObj };
            this.layoutInfoDialog = true;
        },
        saveLayoutInfo() {
            this.$refs.layoutForm.validate((valid) => {
                if (valid) {
                    this.layoutInfoDialog = false;
                    this.layoutObj = {
                        ...this.layoutObj,
                        ...this.layoutObjForm,
                    };
                }
            });
        },
        save() {
            if (this.layoutObj.layout_name && this.layoutObj.layout_type) {
                let widgets = this.widgetList.map((widget) => {
                    return JSON.parse(JSON.stringify(widget.parse()));
                });
                const params = {
                    servicecode: "ct3006",
                    ...this.layoutObj,
                    layout_data: widgets,
                };
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                    .then((response) => {
                        this.layoutObj.layout_id = response.data.layout_id;
                        this.$message.success(this.$i18ns("保存成功"));
                    });
            } else {
                this.$message({
                    message: this.layout_conf,
                    type: "warning",
                    onClose: () => {
                        this.layoutInfoDialog = true;
                    },
                });
            }
        },
        goBack() {
            this.$dataBus.doCallBack(this, {});
        },
        chooseCard(widget) {
            if (this.layoutObj.layout_type) {
                if (widget) {
                    this.$dataBus.bindCallBackMethod(
                        this,
                        this.chooseCardCallBack2,
                        { ...widget }
                    );
                    this.$dialog.open({
                        that: this,
                        title: this.optional_card,
                        toRequest: {
                            url: "/views/ismt/ct/layout/card_list.json",
                            method: "get",
                            params: {
                                card_portrait: widget.position.width,
                                card_transver: widget.position.height,
                            },
                        },
                        width: "80%",
                    });
                } else {
                    this.$dataBus.bindCallBackMethod(
                        this,
                        this.chooseCardCallBack,
                        {}
                    );
                    this.$dialog.open({
                        that: this,
                        title: this.optional_card,
                        toRequest: {
                            url: "/views/ismt/ct/layout/card_list.json",
                            method: "get",
                        },
                        width: "80%",
                    });
                }
            } else {
                this.$message({
                    message: this.layout_conf,
                    type: "warning",
                    onClose: () => {
                        this.layoutInfoDialog = true;
                    },
                });
            }
        },
        chooseCardCallBack(btnConfig, response) {
            let top = this.getEndGrid();
            this.addWidget({ ...response, card_top: top });
        },
        chooseCardCallBack2(widget, response) {
            this.widgetList.forEach((w) => {
                if (w.id === widget.id) {
                    w.refreshData(response);
                }
            });
        },
        queryTempList() {
            const params = {
                servicecode: "ct3014",
                ...this.searchForm,
                ...this.pageParam,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((response) => {
                    this.tempList = response.data;
                    this.pageParam.total = response.pageParam.total;
                });
        },
        searchReset() {
            this.searchForm = {
                template_id: "",
                template_name: "",
            };
        },
        chooseTemp() {
            this.layoutTempDialog = true;
            this.queryTempList();
        },
        chooseTempCallBack() {
            this.widgetList = [];
            this.widgets = this.tempList[this.selectedNum].layout_data;
            this.widgets.forEach((item) => {
                this.addWidget(item);
            });
            this.layoutTempDialog = false;
        },
        refresh() {
            let outerWidth;
            if (this.$refs.widthOuter) {
                outerWidth = this.$refs.widthOuter.clientWidth;
            } else {
                outerWidth = 0;
            }
            if (outerWidth === 0) {
                return;
            }
            this.layout.width = outerWidth - this.layout.gutter;
            this.layout.gridSize =
                this.layout.width / this.layout.horizontalGridCount;
            this.widgetList.forEach((widget) => widget.refresh(this.layout));
            this._resetHeight();
        },
        handleWidgetMove(event, widget) {
            this.activeWidget = widget;
            // 标记初始位置
            this.shadowWidget.setPosition(
                {
                    width: widget.position.width,
                    height: widget.position.height,
                    top: widget.position.top,
                    left: widget.position.left,
                },
                this.layout
            );
            dragHandle(event, {
                move: ({ xOffset, yOffset }) => {
                    // move
                    let { position, screenPosition } = widget;
                    let maxLeft =
                        (this.layout.horizontalGridCount - position.width) *
                        this.layout.gridSize;

                    let newTop = position.top * this.layout.gridSize + yOffset;
                    let newLeft =
                        position.left * this.layout.gridSize + xOffset;

                    newTop = Math.max(0, newTop);
                    newLeft = Math.max(0, newLeft);
                    newLeft = Math.min(maxLeft, newLeft);

                    this.shadowWidget.setPosition(
                        {
                            top: Math.floor(newTop / this.layout.gridSize),
                            left: Math.floor(newLeft / this.layout.gridSize),
                        },
                        this.layout
                    );
                    screenPosition.top = newTop + "px";
                    screenPosition.left = newLeft + "px";
                    this._previewWidgets();
                },
                end: () => {
                    this._dragEnd();
                },
            });
        },
        _dragEnd(event) {
            this.shadowWidget.applyOffset();
            this.activeWidget.setPosition(
                {
                    width: this.shadowWidget.position.width,
                    height: this.shadowWidget.position.height,
                    top: this.shadowWidget.position.top,
                    left: this.shadowWidget.position.left,
                },
                this.layout
            );
            this.touchCeiling(this.widgetList);
            this.widgetList.forEach((widget) => widget.refresh(this.layout));
            // 应用预览状态下的偏移量
            this.widgetList.forEach((widget) => widget.applyOffset());
            this._resetHeight();
            this.activeWidget = null;
        },
        // 根据拖拽预览数据，自动调整布局
        _previewWidgets() {
            if (this.widgetList.length < 2) {
                return;
            }
            // 获取除了被拖拽以外的其他  widgets
            this.shadowWidget.setOffset(0);
            let restWidgets = this.widgetList.filter((widget) => {
                widget.setOffset(0);
                return widget !== this.activeWidget;
            });
            // 获取界面上用于预览的所有 widget，包括影子，但是不包括被拖拽的 widget
            let repainList = restWidgets.concat(this.shadowWidget);
            // 第一步：先做一遍自动吸顶效果，排除被拖拽的 widget、shadowWidget
            this.touchCeiling(restWidgets);
            // 第二步：根据 shadowWidget 的数据，查找碰撞到的 widget，不包含影子对象
            let collisionWidgets = restWidgets.filter((widget) => {
                let { width, height, top, left } = this.shadowWidget.position;
                let rect = widget.position;
                return isRectCollision(
                    left,
                    top,
                    width,
                    height,
                    rect.left,
                    rect.top + rect.previewOffset,
                    rect.width,
                    rect.height
                );
            });
            // 第三步：查找出受拖拽影响的 widgets，排除被拖拽的 widget 与影子 widget
            let dirtyWidgetList = this.getDeepFollowing(collisionWidgets);
            dirtyWidgetList = dirtyWidgetList.filter((widget) => {
                return (
                    widget !== this.activeWidget && widget !== this.shadowWidget
                );
            });
            // 第四步：将受到拖拽影响的 widgets 向下挪出空位
            dirtyWidgetList.forEach((widget) => widget.setOffset(100));
            // 第五步：再次执行自动吸顶效果
            this.touchCeiling(repainList);
            // 最后：计算完毕，触发位置更新
            restWidgets.forEach((widget) => {
                widget.refresh(this.layout);
            });
        },
        // 自动吸顶效果
        touchCeiling(widgetList) {
            sortWidgetList(widgetList);
            widgetList.forEach((widget) => {
                let followedWidget = this.findFollowedWidget(
                    widget,
                    widgetList
                );
                let followedWidgetBottom = 0;
                if (followedWidget) {
                    followedWidgetBottom =
                        followedWidget.position.top +
                        followedWidget.getOffset() +
                        followedWidget.position.height;
                }
                widget.setOffset(followedWidgetBottom - widget.position.top);
            });
        },
        // 查找能够影响自身位置的 widget，仅返回 widget 或 null
        findFollowedWidget(upperWidget, widgetList) {
            let { width, top, left, previewOffset } = upperWidget.position;
            // 获取向上投影所覆盖到的 widgets
            let findWidgetsAtHorizonGrid = widgetList.filter((widget) => {
                let rect = widget.position;
                // 排除垂直方向下方的 widget
                let islower =
                    rect.top + rect.previewOffset < top + previewOffset;
                return (
                    islower &&
                    isLineCollision(left, width, rect.left, rect.width)
                );
            });
            // 未匹配上，或者只有一个 widget 无需做去重处理
            if (findWidgetsAtHorizonGrid.length <= 1) {
                return findWidgetsAtHorizonGrid[0] || null;
            }
            // 按照底部位置逆序排序
            findWidgetsAtHorizonGrid.sort((widgetA, widgetB) => {
                return (
                    widgetB.position.top +
                    widgetB.getOffset() +
                    widgetB.position.height -
                    (widgetA.position.top +
                        widgetA.getOffset() +
                        widgetA.position.height)
                );
            });
            return findWidgetsAtHorizonGrid[0] || null;
        },
        // 查找受自身影响的 widget 垂直方向无间隔，并且水平方向有重合
        findFollowingWidgets(upperWidget, list) {
            let { width, height, top, left, previewOffset } =
                upperWidget.position;
            list = typeof list === "undefined" ? this.widgetList : list;
            // 先在水平方向找到相交的 widgets
            let findWidgetsAtHorizonGrid = list.filter((widget) => {
                let rect = widget.position;
                // 排除垂直方向上方的 widget
                if (
                    rect.top + rect.previewOffset <
                    top + previewOffset + height
                ) {
                    return false;
                }
                return isLineCollision(left, width, rect.left, rect.width);
            });
            // 未匹配上，或者只有一个 widget 无需做去重处理
            if (findWidgetsAtHorizonGrid.length <= 1) {
                return findWidgetsAtHorizonGrid;
            }
            // 按照顶部位置排序
            findWidgetsAtHorizonGrid.sort((widgetA, widgetB) => {
                return (
                    widgetA.position.top +
                    widgetA.getOffset() -
                    (widgetB.position.top + widgetB.getOffset())
                );
            });
            // 逆序删除与前面有相交的 widgets
            for (
                let index = findWidgetsAtHorizonGrid.length - 1;
                index !== 0;
                index--
            ) {
                let checkWidget = findWidgetsAtHorizonGrid[index];
                let checkWidgetRect = checkWidget.position;
                let compareWidgets = findWidgetsAtHorizonGrid.slice(0, index);
                // 被检查的 widget 与之前任一个有相交，都要移除
                let needRemove = compareWidgets.some((widget) => {
                    let rect = widget.position;
                    let isCol = isLineCollision(
                        checkWidgetRect.left,
                        checkWidgetRect.width,
                        rect.left,
                        rect.width
                    );
                    return isCol;
                });
                if (needRemove) {
                    // 符合条件，移除
                    findWidgetsAtHorizonGrid.splice(index, 1);
                }
            }
            return findWidgetsAtHorizonGrid;
        },
        // 递归查找受影响的 widgets
        getDeepFollowing(sourceWidgets) {
            let returns = [].concat(sourceWidgets);
            let recursionFollowingWidgets = (sourceWidgets) => {
                sourceWidgets.forEach((upperWidget) => {
                    let followingWidgets =
                        this.findFollowingWidgets(upperWidget);
                    returns = returns.concat(followingWidgets);
                    // 向下递归
                    recursionFollowingWidgets(followingWidgets);
                });
            };
            recursionFollowingWidgets(sourceWidgets);
            return uniqueArray(returns);
        },
        getEndGrid() {
            if (this.widgetList.length === 0) {
                return 0;
            }
            let bottoms = this.widgetList.map(
                (item) => item.position.top + item.position.height
            );
            return Math.max.apply(Math, bottoms) || 0;
        },
        _resetHeight() {
            this.layout.height = this.getEndGrid() * this.layout.gridSize + 10;
        },
        addWidget(data) {
            const position = {
                width: data.card_portrait,
                height: data.card_transver,
                top: data.card_top || 0,
                left: data.card_left || 0,
            };
            let widget = new Widget({
                position,
                layout: this.layout,
                data: data,
            });
            this.widgetList.push(widget);
            this._resetHeight();
        },
        resetWidget(id, widget) {
            this.$confirm(this.allcard_confirm, this.reminder_info, {
                type: "warning",
            }).then(() => {
                this.widgetList = [];
            });
        },
        deleteWidget(id, widget) {
            this.$confirm(this.card_confirm, this.reminder_info, {
                type: "warning",
            }).then(() => {
                let index = -1;
                for (
                    let i = 0, total = this.widgetList.length;
                    i < total;
                    i++
                ) {
                    if (this.widgetList[i].id === id) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    this.widgetList.splice(index, 1);
                    this.touchCeiling(this.widgetList);
                    sortWidgetList(this.widgetList);
                    this.widgetList.forEach((widget) => {
                        widget.applyOffset();
                        widget.refresh(this.layout);
                    });
                    this._resetHeight();
                }
            });
        },
        select(i) {
            console.log(i);
            this.selectedNum = i;
        },
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.refresh);
    },
};
</script>

<style lang="less" scoped>
.tool-bar {
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.4);
    padding: 5px 16px;
    display: flex;
    justify-content: space-around;
    .left {
        flex: 1;
        line-height: 28px;
        font-size: 18px;
        font-weight: bold;
    }
}
.report-page-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.report-page {
    position: relative;
    margin: 10px 0;
}
.widget-drag-preview {
    position: absolute;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    transition: 0.3s;
}
.widget {
    position: absolute;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease-in-out;
    .widget-move {
        position: relative;
        height: 100%;
        cursor: move;
    }
    .widget-inner {
        position: absolute;
        top: 60px;
        left: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 80px);
        .widget-choose-card {
            width: 100%;
            height: calc(100% - 20px);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
            .widget-size {
                color: #999;
                font-size: 20px;
                span {
                    font-size: 30px;
                }
            }
        }
    }
    .widget-title {
        width: 100%;
        line-height: 40px;
        padding-left: 20px;
        font-size: 18px;
        font-weight: bold;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .widget-tools {
        position: absolute;
        top: 14px;
        right: 20px;
    }
    &:hover,
    &.active {
        z-index: 1;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
    }
    &.active {
        transition: none;
    }
}
.report-add-widget {
    width: 300px;
    height: 180px;
    line-height: 180px;
    margin: 0 auto 50px;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    border: 2px dashed rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.form-two-column {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        width: 50%;
    }
    .el-select,
    .el-form-item.full-row {
        width: 100%;
    }
}
/deep/ .el-dialog__footer {
    text-align: center;
}
.temp-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 19%;
        margin: 0.5%;
        box-sizing: border-box;
        border-radius: 8px;
        text-align: center;
        border: 2px solid #f0f2f5;
        cursor: pointer;
        .temp-img {
            width: 100%;
            height: 200px;
            padding: 6px;
            box-sizing: border-box;
            border-radius: 8px;
            background-color: #f0f2f5;
            img {
                width: 100%;
                height: 100%;
                object-fit: scale-down;
            }
            p {
                line-height: 200px;
                margin: 0;
            }
        }
        .temp-name {
            font-size: 18px;
        }
        .temp-id {
            font-size: 12px;
            color: #ccc;
        }
    }
}
li.active {
    border: 2px solid #368ee0;
}
/deep/ .el-form.search-form-inline {
    padding: 8px 8px 0;
    .el-row {
        display: flex;
        align-items: flex-end;
        .el-form-item {
            margin-bottom: 8px;
        }
        .el-col-20 {
            display: flex;
            flex-flow: row wrap;
            .el-form-item {
                width: 50%;
                margin-right: 0;
                .el-form-item__label {
                    width: 28%;
                    border-width: 0;
                }
                .el-form-item__content {
                    width: 70%;
                    .el-select {
                        width: 100%;
                    }
                }
            }
        }
        .el-col-4 {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>