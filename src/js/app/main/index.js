import Vue from 'vue';
import AreaSelector from 'main';
import utility from 'ct-utility';

// const areaList = {
//     province: [{ID: '01', Name: '北京'}],
//     city: {
//         北京: [{ID: '0101', Name: '北京'}]
//     },
//     region: {
//         七台河: [
//             {
//                 ID: '261101',
//                 Name: '新兴区'
//             },
//             {
//                 ID: '261102',
//                 Name: '桃山区'
//             }, {
//                 ID: '261103',
//                 Name: '茄子河区'
//             }, {
//                 ID: '261104',
//                 Name: '勃利县'
//             }
//         ]
//     }
// };

new Vue({
    el: '#app',
    components: {
        AreaSelector
    },
    data: {
        address: '0',
        sep: '_'
    },
    methods: {
        change(area) {
            this.address = this.$refs.area.getArea(false);
            console.log('===========change!!!===========', area, this.$refs.area.getArea(false));
        },
        modify() {
            this.address = '浙江_杭州_滨江区';
        },
        getArea() {
            console.log('===========get!!!===========', this.$refs.area.getArea());
            console.log('===========get!!!===========', this.$refs.area.getArea(false));
        },
        areaList() {
            return utility.areaDataFormat.filterByName(['浙江-杭州-滨江区', '江西-南昌', '江苏'], true);
            // return utility.areaDataFormat.filterByCode(['060101'], true);
            // return utility.areaDataFormat.filterByCode(['060100'], true);
            // return utility.areaDataFormat.filterByCode(['060100'], false);
        }
    }
});
