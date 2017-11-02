<template>
    <div class="area-select-container">
        <select class="form-control area-select mr10"
                v-model="n" v-if="showNation">
            <option value="全国">全国</option>
            <option value="">指定地区</option>
        </select>
        <select class="form-control area-select mr10"
                :disabled="disabled"
                v-model="p">
            <option value="">省</option>
            <option v-for="province in provinces">{{ province.Name }}</option>
        </select>

        <select class="form-control area-select mr10"
                :disabled="disabled"
                v-model="c">
            <option value="">市</option>
            <option v-for="city in cities">{{ city.Name }}</option>
        </select>

        <select class="form-control area-select mr10"
                :disabled="disabled"
                v-model="d">
            <option value="">县 / 区</option>
            <option v-for="district in districts">{{ district.Name }}</option>
        </select>
    </div>
</template>

<script type="text/ecmascript-6">
    import Utility from 'ct-utility';
    export default{
        name: 'area-selector',
        props: {
            initialArea: {
                type: String,
                default: ''
            },
            sep: {
                type: String,
                default: '-'
            },
            showNation:{
                type:Boolean,
                default:false
            },
            codeForNation: {
                type: String,
                default: '00'
            }
        },
        created(){
            if (this.area !== '全国') {
                var province = this.area.split(this.sep)[0];
                var city = this.area.split(this.sep)[1];
                if (province != '') {
                    this.cities = AREA.city[province];
                }
                if (city != '') {
                    this.districts = AREA.region[city];
                }
            }
        },
        data(){
            var that = this;
            var area = '';

            if (/^\d+$/.test(this.initialArea)) {
                area = Utility.areaDataFormat.getAreaNameById(this.initialArea).replace(/-/g, this.sep);
            } else {
                area = this.initialArea;
            }
            return {
                area: area,
                n: area === '全国' ? '全国' : '',
                p: area === '全国' ? '' : (area.split(that.sep)[0] || ''),
                c: area === '全国' ? '' : (area.split(that.sep)[1] || ''),
                d: area === '全国' ? '' : (area.split(that.sep)[2] || ''),
                provinces: AREA.province,
                cities: AREA.city[that.p] || [],
                districts: AREA.region[that.c] || []
            }
        },
        computed: {
            disabled(){
                return this.n === '全国';
            }
        },
        methods: {
            getArea(readable = true){
                var areaArr = [];
                if (this.n === '全国') {
                    if (readable) {
                        return '全国';
                    } else {
                        return this.codeForNation;
                    }
                } else {
                    if (this.p != '') {
                        areaArr.push(this.p);
                    }
                    if (this.c != '') {
                        areaArr.push(this.c);
                    }
                    if (this.d != '') {
                        areaArr.push(this.d);
                    }
                    if (readable) {
                        return areaArr.join(this.sep) || '';
                    } else {
                        if (areaArr.length > 0) {
                            return Utility.areaDataFormat.getAreaIdByName(areaArr.join(this.sep));
                        } else {
                            return '';
                        }
                    }
                }
            }
        },
        watch: {
            n(n){
                if (n === '全国') {
                    this.p = '';
                    this.c = '';
                    this.d = '';
                }
                this.$nextTick(function() {
                    if (this.area !== this.getArea()) {
                        this.area = this.getArea();
                        this.$emit('change', this.area);
                    }
                })
            },
            p(n){
                var that = this;
                this.cities = AREA.city[n] || [];
                if (typeof this.cities !== 'undefined') {
                    var matched = this.cities.filter(function(city) {
                                return city.Name === that.c;
                            }).length > 0;

                    if (!matched) {
                        this.c = '';
                    }
                    this.$nextTick(function() {
                        if (this.area !== this.getArea()) {
                            this.area = this.getArea();
                            this.$emit('change', this.area);
                        }
                    })
                }
            },
            c(n){
                var that = this;
                this.districts = AREA.region[n] || [];
                var matched = this.districts.filter(function(district) {
                            return district.Name === that.d;
                        }).length > 0;
                if (!matched) {
                    this.d = '';
                }
                this.$nextTick(function() {
                    if(this.area !== this.getArea()){
                        this.area=this.getArea();
                        this.$emit('change',this.area);
                    }
                })
            },
            d(){
                this.$nextTick(function() {
                    if(this.area !== this.getArea()){
                        this.area=this.getArea();
                        this.$emit('change',this.area);
                    }
                })
            },
            initialArea(n){
                var area = '';
                if (/^\d+$/.test(n)) {
                    if(n===this.codeForNation){
                        area='全国';
                    }else{
                        area = Utility.areaDataFormat.getAreaNameById(this.initialArea).replace(/-/g, this.sep);
                    }
                } else {
                    area = this.initialArea;
                }
                this.p = area==='全国' ? '' : area.split(this.sep)[0] || '';
                this.c = area==='全国' ? '' : area.split(this.sep)[1] || '';
                this.d = area==='全国' ? '' : area.split(this.sep)[2] || '';
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
        /*width: 25%;*/
        display: inline-block;
    }
</style>