import Vue from 'vue';
import AreaSelector from 'main';

new Vue({
    el: '#app',
    components: {
        AreaSelector
    },
    data: {
        address: '0601',
        sep: '_'
    },
    methods: {
        change(area) {
            this.address = this.$refs.area.getArea(false);
            console.log('===========change!!!===========', area, this.$refs.area.getArea(false));
        },
        modify() {
            this.address = '广西_百色_德保县';
        },
        getArea(){
            console.log('===========get!!!===========', this.$refs.area.getArea());
            console.log('===========get!!!===========', this.$refs.area.getArea(false));
        }
    }
});
