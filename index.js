import btn from './src/index'
btn.install = function (Vue) {
    Vue.component(btn.name,btn)
    // Vue.mixin({
    //     data(){
    //         return {
    //             slider:btn.data().slider
    //         }
    //     },
    // })
}
export default btn