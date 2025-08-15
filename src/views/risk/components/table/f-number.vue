<template>
  <Poptip placement="bottom" title="过滤条件" style="padding-left: 5px;">
    <Icon type="funnel" size="16" style="cursor: pointer;" color="#2d8cf0"></Icon>
    <div slot="content">
      <InputNumber id="ents-f-number0" data-sign="ents-f-number"Number v-model="startval"></InputNumber>
      至
      <InputNumber id="ents-f-number1" data-sign="ents-f-number"Number v-model="endval"></InputNumber>
      <Button id="ents-f-number2" data-sign="ents-f-number" type="primary" size="small" @click.prevent="ok">确定</Button>
    </div>
  </Poptip>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        startval: 0,
        endval: 100
      }
    },
    methods: {
      ok () {
        this.$emit(
          'filter-numrange', [this.startval, this.endval]
        )
      }
    }
  }
</script>
