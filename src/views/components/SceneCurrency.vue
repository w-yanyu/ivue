<template>
  <el-input
    ref="input"
    :disabled="disabled"
    v-bind:value="formatValue"
    v-on:input="onInput($event)"
    v-on:focus="selectAll"
    v-on:blur="onBlur">
  </el-input>
</template>
<script>
import accounting from 'pte-ui/utils/accounting';
export default {
  name: "SceneCurrency",
  components: {},
  props: {
    value: {
      type: [Number, String],
      default: 0,
      desc: '数值'
    },
    index: {
      type: Number,
      default: 0,
      desc: "场景收费表单$index"
    },
    disabled: {
      type: Boolean,
      default: false,
      desc: '禁用'
    },
    symbol: {
      type: String,
      default: '',
      desc: '货币标识符'
    },
    decimal: {
      type: Number,
      default: 2,
      desc: '小数位'
    },
    thousand: {
      type: String,
      default: ",",
      desc: '千分位标识符'
    }
  },
  data() {
    return {
      currencyValue: accounting.unformat(this.value),
      focused: false
    }
  },
  watch: {
    value(val) {
      this.currencyValue = accounting.unformat(this.value);
    }
  },
  computed: {
    formatValue: function () {
      if (this.focused) {
        return this.currencyValue;
      } else {
        return accounting.formatMoney(this.currencyValue, this.symbol, this.decimal, this.thousand);
      }
    }
  },
  methods: {
    onInput: function (value) {
      this.currencyValue = accounting.unformat(value);
      this.$emit('input', this.currencyValue);
    },
    onBlur: function () {
      if (this.currencyValue === "-") {
        this.currencyValue = 0
      }
      this.focused = false;
      this.$emit('change', this.formatValue, this.index);
    },
    selectAll: function (event) {
      this.focused = true;
      setTimeout(function () {
        event.target.select()
      }, 0)
    }
  }
}

</script>
