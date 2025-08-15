//SelectComponent.vue  要渲染的子组件
<template>
    <div>
    <el-col :span="12">
      <el-form-item class="upload-item" :label="ofield_desc" :prop="ofield">
        <el-select :value="oldval" :disabled="true">
          <el-option v-for="item in options" :key="item.dictId" :label="item.dictId+'-'+item.dictName"
                      :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item class="upload-item" :label="nfield_desc" :prop="nfield">
        <el-select v-model="newval" @change="changeHandler">
          <el-option v-for="item in options" :key="item.dictId" :label="item.dictId+'-'+item.dictName"
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
        options: [
          
        ],
        appl_no: this.item.appl_no,
        order_seq: this.item.order_seq,
        ofield: this.item.field_name,
        nfield: this.item.field_name,
        ofield_desc : this.item.field_desc+"原值",
        nfield_desc : this.item.field_desc+"新值",
        oldval: this.item.oldval,
        newval: this.item.newval,
        enum_type: this.item.enum_type,

      }
    
    },
    model: {
      prop: 'newval',
      event: 'change'
    },
    props: {
      item:{}
    },
    mounted(){
      
      this.getDictList(this.enum_type, "options")
      console.log("获取字典。。。。"+this.enum_type);
      console.log("字典值："+this.options);
    },
    methods: {
        changeHandler(ev) {
          this.$forceUpdate();
          // this.$emit('change', ev);
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
        newval(val){
          console.log("1111111111111");
          this.$emit('changeComponent', {
              number: this.number,
              key: this.$data.ofield,
              newval: this.$data.newval,
              appl_no: this.appl_no,
              order_seq: this.order_seq
          })
        }
    }
  }
</script>

<style scoped>

</style>
