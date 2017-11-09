/**
 * @author rubyisapm
 */
import Vue from 'vue';
import AreaSelector from '../../index.js';
Vue.component(AreaSelector.name, AreaSelector);
var demo = new Vue({
    el: '#app',
    data: {
        address: '00',
        sep:'_'
    },
    methods: {
        change(area){
            this.address = this.$refs.area.getArea(false);
            console.log('===========change!!!===========',area,this.$refs.area.getArea(false));
        },
        modify(area){
            this.address = '广西_百色_德保县'
        }
    }

});