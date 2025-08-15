<template>
    <div class="layout-containers">
        <div class="tool-bar">
            <div class="left">
                {{layoutObj.template_name}}
                <span
                    v-if="layoutObj.template_id"
                >（{{layoutObj.template_id}}）</span>
            </div>
            <div class="right">
                <el-button icon="el-icon-setting" size="mini" @click="editLayoutInfo">模板信息</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-document-checked"
                    size="mini"
                    @click="save"
                >{{$i18ns('保存')}}</el-button>
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
                    ref="imageTest"
                    :style="{ height: layout.height + 'px', 'margin-left': layout.gutter + 'px' }"
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
                                    class="widget-size"
                                    :style="{'font-size': widget.position.width * 1.6 + 16 + 'px'}"
                                >
                                    {{widget.position.width}}
                                    <span
                                        :style="{'font-size': widget.position.width * 1.6 + 10 + 'px'}"
                                    >×</span>
                                    {{widget.position.height}}
                                </div>
                            </div>
                            <!-- 拖拽控制卡片大小 -->
                            <div
                                class="widget-resize"
                                draggable
                                @mousedown="handleWidgetResize($event, widget)"
                            ></div>
                            <i
                                class="widget-tools el-icon-close"
                                @click="deleteWidget(widget.id, widget)"
                            ></i>
                        </div>
                    </template>
                </div>
            </div>
            <div class="report-add-widget" @click="addEmptyWidget">
                <i class="el-icon-plus">增加板块</i>
            </div>
        </div>
        <el-dialog title="配置模板信息" :close-on-click-modal="false" :visible.sync="layoutInfoDialog">
            <el-form
                :model="layoutObjForm"
                :rules="layoutObjRules"
                ref="layoutForm"
                label-width="26%"
                class="form-two-column"
            >
                <el-form-item v-if="layoutObjForm.template_id" label="模板编号" prop="template_id">
                    <el-input v-model="layoutObjForm.template_id" disabled></el-input>
                </el-form-item>
                <el-form-item label="模板名称" prop="template_name">
                    <el-input v-model="layoutObjForm.template_name"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" prop="remark" class="full-row" label-width="13%">
                    <el-input v-model="layoutObjForm.remark" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="saveLayoutInfo">确认</el-button>
                <el-button @click="layoutInfoDialog = false">{{$i18ns('取消')}}</el-button>
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
} from "../layout/utils";
import ResizeObserver from "v-resize-observer";
import html2canvas from "html2canvas";

export default {
    name: "layoutTempDesigner",
    props: {
        cParentParams: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
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
            layoutObj: {},
            layoutObjForm: {},
            layoutObjRules: {
                template_name: [
                    {
                        required: true,
                        message: "模板名称不能为空",
                        trigger: "blur",
                    },
                    {
                        max: 30,
                        message: "长度不能超过30个字符",
                        trigger: "blur",
                    },
                ],
            },
            layoutInfoDialog: false,
        };
    },
    created() {
        if (this.cParentParams.template_id) {
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
            if (this.layoutObj.template_name) {
                let widgets = this.widgetList.map((widget) => {
                    return JSON.parse(JSON.stringify(widget.parseTemp()));
                });
                const loading = this.$loading({
                    lock: true,
                    text: "保存中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                });
                document.createElement("canvas");
                setTimeout(() => {
                    html2canvas(this.$refs.imageTest, {
                        scale: 0.3,
                        backgroundColor: "#f0f2f5",
                    }).then((canvas) => {
                        const params = {
                            servicecode: "ct3012",
                            ...this.layoutObj,
                            layout_data: widgets,
                            thumbnail_image: canvas.toDataURL(),
                        };
                        this.$http
                            .invokeAPI(
                                "/SUMP/icmcall/icmRPCCall",
                                "post",
                                params
                            )
                            .then((response) => {
                                this.layoutObj.template_id =
                                    response.data.template_id;
                                this.$message.success("保存成功");
                            });
                        if (loading) {
                            loading.close();
                        }
                    });
                }, 500);
            } else {
                this.$message({
                    message: "请先配置模板信息",
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
        addEmptyWidget() {
            let card_top = this.getEndGrid();
            this.addWidget({
                card_portrait: 1,
                card_transver: 1,
                card_top,
                card_left: 0,
            });
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
        handleWidgetResize(event, widget) {
            this.activeWidget = widget;
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
                    let { position, screenPosition } = widget;
                    let maxWidth =
                        (this.layout.horizontalGridCount - position.left) *
                            this.layout.gridSize -
                        this.layout.gutter;
                    let startWidth =
                        position.width * this.layout.gridSize -
                        this.layout.gutter;
                    let startHeight =
                        position.height * this.layout.gridSize -
                        this.layout.gutter;
                    let newWidth = startWidth + xOffset;
                    let newHeight = startHeight + yOffset;
                    newWidth = Math.max(
                        this.layout.gridSize * 1 - this.layout.gutter,
                        newWidth
                    );
                    newWidth = Math.min(maxWidth, newWidth);
                    newHeight = Math.max(
                        this.layout.gridSize * 1 - this.layout.gutter,
                        newHeight
                    );
                    this.shadowWidget.setPosition(
                        {
                            width: Math.ceil(newWidth / this.layout.gridSize),
                            height: Math.ceil(newHeight / this.layout.gridSize),
                        },
                        this.layout
                    );
                    screenPosition.width = newWidth + "px";
                    screenPosition.height = newHeight + "px";
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
            this.layout.height = this.getEndGrid() * this.layout.gridSize + 50;
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
            });
            this.widgetList.push(widget);
            this._resetHeight();
        },
        deleteWidget(id, widget) {
            this.$confirm("确定删除此卡片？", "提示信息", {
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
    transition: box-shadow 0.3s ease-in-out;
    .widget-move {
        position: relative;
        height: 100%;
        cursor: move;
        display: flex;
        justify-content: center;
        align-items: center;
        .widget-size {
            color: #999;
        }
    }
    .widget-resize {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: se-resize;
        &:before {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-width: 0 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #c2ced6 transparent;
        }
    }
    .widget-tools {
        position: absolute;
        top: 10px;
        right: 10px;
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
</style>