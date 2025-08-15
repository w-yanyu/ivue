<template>
  <el-col :lg="lg" :md="md" :sm="sm" :xs="xs" :xl="xl">
    <slot></slot>
  </el-col>
</template>
<script type="text/javascript">
  export default {
    props: {
      size: {
        //lg md sm
        type: String,
        default: 'md'
      }
    },
    created() {
      this.analyCol(this.size);
    },
    watch: {},
    data() {
      return {
        lg: 24,
        md: 24,
        sm: 24,
        xs: 24,
        xl: 24
      }
    },
    methods: {
      analyCol(size) {
        if (size == "xlg") {
          this.lg = 12;
          this.md = 12;
          this.sm = 12;
          this.xs = 24;
        } else if (size == 'lg') {
          this.lg = 8;
          this.md = 12;
          this.sm = 16;
          this.xs = 24;
        } else if (size == 'md') {
          this.lg = 6;
          this.md = 8;
          this.sm = 12;
          this.xs = 24;
        } else if (size == 'sm') {
          this.lg = 8;
          this.md = 6;
          this.sm = 4;
          this.xs = 3;
          this.xl = 1;
        }
        if (size == "xs") {
          this.lg = 8;
          this.md = 4;
          this.sm = 6;
          this.xs = 5;
          this.x1 = 3;
        } else {
          this.lg = 24;
          this.md = 24;
          this.sm = 24;
          this.xs = 24;
        }
      }
    }
  }
</script>
<style>
  .el-col {
    border-radius: 4px;
  }
</style>
