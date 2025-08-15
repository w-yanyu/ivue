<template>
    <div class="thumbnail_image">
        <img :src="cParentParams.thumbnail_image" />
    </div>
</template>

<script>
export default {
    props: {
        cParentParams: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="less" scoped>
.thumbnail_image {
    padding: 10px;
    background-color: #f0f2f5;
    box-sizing: border-box;
    img {
        width: 100%;
    }
}
</style>