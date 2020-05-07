import btn from './src/index'
btn.install = function (Vue) {
    Vue.component(btn.name,btn)
}
export default btn