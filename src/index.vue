<template>
    <div ref = 'a'>
    </div>
</template>
<script>
import Slider from './slider.js'
export default {
    name: 'btn',
    props:['val'],
    mounted(){
        new Slider(this.val,this.$refs.a)
    }
}
</script>