<template>
    <div class="layout-containers">
        <div class="report-page-outer">
            <div class="report-container" ref="widthOuter">
                <div
                    v-resize:debounce="refresh"
                    class="report-page"
                    :style="{height: layout.height + 'px'}"
                >
                <!--  'margin-left': layout.gutter + 'px' -->
                    <template v-if="widgetList.length">
                        <div
                            class="widget"
                            v-for="widget in widgetList"
                            :key="widget.id"
                            :style="widget.screenPosition"
                        >
                            <div
                                v-if="widget.data.card_name"
                                class="widget-title"
                            >{{widget.data.card_name}}</div>
                            <div class="widget-inner">
                                <to-json :toUrl="widget.data.url" :params="widget.data.params"></to-json>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Widget } from "@/views/ismt/ct/layout/utils";
import ResizeObserver from "v-resize-observer";

export default {
    name: "dashboard",
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
            layoutObj: {},
        };
    },
    watch: {
        widgets: {
            handler(widgetsListStr) {
                let widgetsList = widgetsListStr;
                this.widgetList = [];
                widgetsList.forEach((item) => {
                    this.addWidget(item);
                });
            },
            immediate: true,
        },
        $route(to, from) {
            // this.queryLayout();
        },
    },
    created() {
        const params = {
            servicecode: "ct3010",
            user_id: JSON.parse(localStorage.user_info).userCode,
        };
        this.$http
            .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((response) => {
                this.widgets = response.data[0].layout_data;
                console.log(this.widgets);
            });
    },
    mounted() {
        this.refresh();
        window.addEventListener("resize", this.refresh);
    },
    directives: {
        resize: ResizeObserver.directive,
    },
    methods: {
        queryLayout() {
            const params = {
                servicecode: "ct3010",
                user_id: JSON.parse(localStorage.user_info).userCode,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((response) => {
                    this.widgets = response.data[0].layout_data;
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
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.refresh);
    },
};
</script>

<style lang="less" scoped>
.report-page-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.report-page {
    position: relative;
    // margin: 10px 0;
}
.widget {
    position: absolute;
    border-radius: 8px;
    overflow: hidden;
    .widget-inner {
        position: absolute;
        top: 60px;
        left: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 80px);
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
}
</style>