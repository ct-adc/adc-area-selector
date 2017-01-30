<template>
    <div class="area-select-container">
        <select class="form-control area-select"
                v-model="p">
            <option value="">省</option>
            <option v-for="province in provinces">{{ province.Name }}</option>
        </select>

        <select class="form-control area-select"
                v-model="c">
            <option value="">市</option>
            <option v-for="city in cities">{{ city.Name }}</option>
        </select>

        <select class="form-control area-select"
                v-model="d">
            <option value="">县 / 区</option>
            <option v-for="district in districts">{{ district.Name }}</option>
        </select>
    </div>
</template>

<script type="es6">
    export default{
        name:'area-selector',
        props: {
            area: {
                type: String,
                default: ''
            }
        },
        created(){
            var province = this.area.split('-')[0];
            var city = this.area.split('-')[1];
            if (province != '') {
                this.cities = AREA.city[province];
            }
            if (city != '') {
                this.districts = AREA.region[city];
            }
        },
        data(){
            return {
                p: this.area.split('-')[0] || '',
                c: this.area.split('-')[1] || '',
                d: this.area.split('-')[2] || '',
                provinces: AREA.province,
                cities: AREA.city[this.p] || [],
                districts: AREA.region[this.c] || [],
                result:this.area
            }
        },
        methods: {
            getArea(){
                var areaArr = [];
                if (this.p != '') {
                    areaArr.push(this.p);
                }
                if (this.c != '') {
                    areaArr.push(this.c);
                }
                if (this.d != '') {
                    areaArr.push(this.d);
                }
                return areaArr.join('-');
            }
        },
        watch: {
            p(n){
                var that=this;
                this.cities = AREA.city[n];
                var matched = this.cities.filter(function (city) {
                            return city.Name === that.c;
                        }).length > 0;

                if (!matched) {
                    this.c = '';
                }
                this.$nextTick(function () {
                    this.result=this.getArea();
                })
            },
            c(n){
                var that=this;
                this.districts = AREA.region[n] || [];
                var matched = this.districts.filter(function (district) {
                            return district.Name === that.d;
                        }).length > 0;
                if (!matched) {
                    this.d = '';
                }
                this.$nextTick(function () {
                    this.result=this.getArea();
                })
            },
            d(){
                this.$nextTick(function () {
                    this.result=this.getArea();
                })
            },
            area(){
                this.p = this.area.split('-')[0] || '';
                this.c = this.area.split('-')[1] || '';
                this.d = this.area.split('-')[2] || '';
            },
            result(newVal){
                this.$emit('change',newVal);
            }
        }
    }
</script>

<style scoped>
    .area-select-container {
        display: flex;
        justify-content: space-between;
    }

    .area-select {
        width: 33%;
        display: inline-block;
    }
</style>