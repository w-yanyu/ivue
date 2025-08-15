//SelectComponent.vue  要渲染的子组件
<template>
  <div>
    <el-col :span="8">
      <el-form-item class="upload-item" :label="item.field_desc" :prop="item.field_name">
        <el-select v-model="select_val" :disabled="false" @change="changeHandler">
          <el-option v-for="item in options" :key="item.dictId" :label="item.dictName"
                      :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: 'SelectComponent',
    data () {
      return {
        options: [],
        item: this.item,
        enum_type: this.item.enum_type,
        field_name: this.item.field_name,
        field_desc : this.item.field_desc,
        select_val: this.select_val
      }

    },
    mounted(){
      
      this.getDictList(this.enum_type, "options")
    },
    model: {
      prop: 'select_val',
      event: 'change'
    },
    props: {
      item:{},
      select_val:{
        default: ''
      }
    },
    
    methods: {
        changeHandler(ev) {
          this.$emit('change', ev);
          this.$forceUpdate;
          console.log("选择下拉框。。。"+ev);
        },
        inputHandler(ev) {
            console.log(ev)
            this.$emit('input', ev)
        },

        /**
         * 获取数据字典列表
         * @param dictType  数据字典 dictType
         * @param listKey 列表对象key名称
         */
        getDictList(dictType, listKey) {
            let params = {
                dictType: dictType,
                dictKey: [dictType]
            };
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
                .then(res => {
                if (res && res.code === "200") {
                    this[listKey] = res.data;
                }
                })
                .catch(err => {
                console.error(err);
                });
        }
    },
    watch: {
        select_val(v, o){
          console.log("============="+v);
          console.log("-----------------"+v);
          this.$emit('changeComponent', {
              number: this.number,
              key: this.$data.field_name,
              value: this.select_val
          })
        },
        deep: true
    }
  }
</script>

<style scoped>

</style>
