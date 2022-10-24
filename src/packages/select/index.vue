<template>
  <el-select
    v-model="value"
    filterable
    remote
    :size="size"
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in listData"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
// import { Select, Option} from 'element-ui'
// import axios from 'axios'

export default {
  name: 'zby-select',
  // components: {
  //   [Select.name]: Select,
  //   [Option.name]: Option
  // },
  props: {
    placeholder: {
      type: String,
      default: "请输入关键词"
    },
    mapping: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dataLevel: {
      type: Array,
      default: () => {
        return []
      }
    },
    getDataF: {
      type: Function,
      default: () => {}
    },
    /**
     * 1 ['aa', 'bb'] 代表一维数组 每一项为字符串
     * 2 [key: val}]  代表以为数组  每一项为对象  需要依赖maaping对象对数据进行处理
     */
    resType: {
      type: Number
    },
    size: {
      type: String
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.$emit('callback', val)
      }
    }
  },
  data() {
    return {
      value: [],
      loading: false,
      listData: [],
      originalData: [] // 存储原始数据
    }
  },
  methods: {
    remoteMethod(query) {
      /**
       * 直接调用父类给予的获取数据函数  element组件已经做过防抖处理
       * 理论上来说组件组件应该直接接受数据即可  但是这里还是想尽量简化引用组件的成本
       * 并且有效的利用系统封装好的axios
       */
      this.getDataF(query).then(res => {
        // 实际上这里需要依据maaping值将接口返回的数据处理成el-options能够执行的数据
        const len = this.dataLevel.length;
        if (len) {
          let data = res
          for(let i = 0; i < len; i++) {
            data = data[this.dataLevel[i]]
          }
          this.originalData = data
        } else {
          this.originalData = res
        }
        this.listData = this.dealData()
      })
    },
    dealData() {
      if (this.resType === 1) {
        return this.originalData.map(item => {
          return {
            value: item,
            label: item
          }
        })
      } else { // todo 根据mapping值来处理数据
        return this.originalData.map(item => {
          return {
            value: item[this.mapping.value],
            label: item[this.mapping.key]
          }
        })
      }
    }
  }
}
</script>

<style></style>
