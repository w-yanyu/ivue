<template>
    <div
        ref="container"
        class="timeline-container"
        :style="{width: containerWidth}"
        @mousewheel="(event)=>MouseMove.handleMousewhell(event)"
    >
        <div v-if="!timelineList" class="loading-mask">
            <div class="loading-spinner">
                <svg viewBox="25 25 50 50" class="circular">
                    <circle cx="50" cy="50" r="20" fill="none" class="path" />
                </svg>
            </div>
        </div>
        <template v-if="hasData">
            <div ref="timelineRef" :class="{'scroll-container':true,'scroll-show':showScroll}">
                <div :style="{height: maxItemHeight * 2 + 20 + 'px'}" class="timeline-wrapper">
                    <div class="timeline">
                        <div
                            v-for="(i,index) in timelineList"
                            :key="i[uuid]"
                            v-inserted="afterInserted"
                            :data-id="i[uuid]"
                            class="timeline-item"
                        >
                            <div class="tail"></div>
                            <div
                                v-if="i.newMark"
                                :class="{right:i.newMark=='left'}"
                                class="divider"
                            ></div>
                            <div :class="{center:i.centerNode}" class="node"></div>
                            <div :class="{time:true,top:getIsTop(index)}" class="time">
                                <slot name="time" :item="i">{{i&&i.time||''}}</slot>
                            </div>
                            <div class="wrapper">
                                <div :style="{top:getIsTop(index)}" class="card">
                                    <div style="flex:1;">
                                        <slot :item="i"></slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import MouseMove from "./MouseMove";

export default {
    name: "Timeline",
    directives: {
        inserted: {
            inserted: (el, binding) => {
                binding.value && binding.value(el.offsetHeight);
            },
            update: (el, binding) => {
                binding.value && binding.value(el.offsetHeight);
            },
        },
    },
    props: {
        timelineList: {
            type: Array,
            default: null,
        },
        showScroll: {
            type: Boolean,
            default: true,
        },
        uuid: {
            type: String,
            default: "id",
        },
        containerWidth: {
            type: String,
            default: "100%",
        },
    },
    data() {
        return {
            MouseMove,
            maxScrollLeft: 0,
            maxItemHeight: 0,
        };
    },
    computed: {
        offset() {
            return MouseMove.offset;
        },
        hasData() {
            return this.timelineList && this.timelineList.length;
        },
    },
    watch: {
        offset(val) {
            this.hasData && this.watchOffset(val.value);
        },
        timelineList: {
            handler(val, oldval) {
                this.setMaxScrollLeft();
            },
            deep: true,
        },
    },
    mounted() {
        this.setMaxScrollLeft();
    },
    methods: {
        getIsTop(index) {
            if (this.timelineList.length % 2) {
                return index % 2 ? "calc(100% + 30px)" : 0;
            } else {
                return index % 2 ? 0 : "calc(100% + 30px)";
            }
        },
        afterInserted(height) {
            this.maxItemHeight = Math.max(height, this.maxItemHeight);
        },
        setMaxScrollLeft() {
            this.$nextTick(() => {
                let timelineRef = this.$refs.timelineRef;
                if (!timelineRef) return;
                this.maxScrollLeft =
                    timelineRef.scrollWidth - timelineRef.offsetWidth;
            });
        },
        watchOffset(val) {
            let timelineRef = this.$refs.timelineRef;
            let scrollLeft = timelineRef.scrollLeft;
            scrollLeft += -val;
            if (scrollLeft < 0) scrollLeft = 0;
            if (scrollLeft > this.maxScrollLeft) {
                scrollLeft = this.maxScrollLeft;
            }
            if (val < 0 && scrollLeft >= this.maxScrollLeft) {
            }
            if (val > 0 && scrollLeft <= 0) {
            }
            timelineRef.scrollLeft = scrollLeft;
        },
    },
};
</script>

<style lang="less" scoped>
.loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: hsla(0, 0%, 100%, 0.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity 0.3s;
    .loading-spinner {
        top: 50%;
        margin-top: -21px;
        width: 100%;
        text-align: center;
        position: absolute;
    }
}
@keyframes loading-rotate {
    100% {
        transform: rotate(1turn);
    }
}
.circular {
    height: 42px;
    width: 42px;
    animation: loading-rotate 2s linear infinite;
    &.small {
        height: 22px;
        width: 22px;
    }
    .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: #409eff;
        stroke-linecap: round;
    }
}
.card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
}
.timeline-container {
    margin: 0 auto;
    padding: 20px;
}
.timeline-wrapper {
    user-select: none;
    position: relative;
}
.timeline {
    display: flex;
    flex-wrap: nowrap;
    margin: 0;
    width: 100%;
    font-size: 14px;
    list-style: none;
    padding-top: 10px;
    .timeline-item {
        position: relative;
        display: inline-flex;
        padding: 0 8px;
        .tail {
            position: absolute;
            bottom: 5px;
            right: 0;
            width: 100%;
            border-top: 2px solid #e4e7ed;
        }
        .divider {
            position: absolute;
            width: 1px;
            height: 200%;
            left: 0;
            top: 0;
            border-right: 1px dashed #e4e7ed;
            &.right {
                left: initial;
                right: 0;
            }
        }
        .link {
            position: absolute;
            bottom: 5px;
            left: 6px;
            transform-origin: 0 0;
            transform: rotate(-45deg);
            width: 21px;
            border-top: 1px solid #e4e7ed;
        }
        .time {
            position: absolute;
            bottom: -30px;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            color: #909399;
            line-height: 1.3;
            font-size: 13px;
            text-align: center;
            &.top {
                bottom: 30px;
            }
        }
        .node {
            position: absolute;
            bottom: 0;
            transform: translateX(-50%);
            left: 50%;
            background-color: #e4e7ed;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12px;
            height: 12px;
            &.center {
                background-color: #74f5dd;
            }
        }
        &:first-child .tail {
            width: 50%;
        }
        &:last-child .tail {
            left: 0;
            width: 50%;
        }
        .wrapper {
            margin-bottom: 20px;
            width: 100%;
        }
    }
}
.scroll-container {
    overflow-x: hidden;
    &.scroll-show {
        overflow-x: auto;
    }
    flex: 1;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-track {
        display: none;
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.16);
    }
    &::-webkit-scrollbar-track-piece {
        display: none;
    }
    &::-webkit-scrollbar-button {
        display: none;
    }
    &::-webkit-scrollbar-corner {
        display: none;
    }
}
</style>