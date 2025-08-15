<!--
 * @Author: yangbin
 * @Date: 2021-03-04 10:33:30
 * @Description: iconfont 的symbol引用组件
-->
<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
export default {
    name: 'icon-svg',
    props: {
        iconname: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            return `#${this.iconname}`
        }
    }
}
</script>

<style scoped lang="less">
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
