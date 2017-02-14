/**
 * @author rubyisapm
 */
import Vue from 'vue';
import AreaSelector from '../../index.js';
Vue.component(AreaSelector.name, AreaSelector);
var demo = new Vue({
    el: '#app',
    data: {
        address: '浙江_杭州_西湖区',
        sep:'_'
    },
    methods: {
        change(area){
            this.address = area;
            console.log(area);
        },
        modify(area){
            this.address = '广西_百色_德保县'
        }
    }

});