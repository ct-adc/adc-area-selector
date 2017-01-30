/**
 * @author rubyisapm
 */
import Vue from 'vue';
import AreaSelector from '../../index.js';
Vue.component(AreaSelector.name, AreaSelector);
var demo = new Vue({
    el: '#app',
    data: {
        address: '浙江-杭州-西湖区'
    },
    methods: {
        change(area){
            this.address = area;
            console.log(area);
        },
        modify(area){
            this.address = '广西-百色-德保县'
        }
    }

});