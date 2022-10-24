import zbSelect from './select/index.vue'

const install = (Vue, args={size: 'small'}) => {
  const params = args
  Vue.prototype.$ELEMENT = { size: params.size, zIndex: 3000 };
  Vue.component(zbSelect.name, zbSelect)
}

export default {
  install
}