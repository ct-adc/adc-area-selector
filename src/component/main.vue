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
                v-if="showCity"
                :disabled="disabled"
                v-model="c">
            <option value="">市</option>
            <option v-for="city in cities">{{ city.Name }}</option>
        </select>

        <select class="form-control area-select mr10"
                v-if="showRegion"
                :disabled="disabled"
                v-model="d">
            <option value="">县 / 区</option>
            <option v-for="district in districts">{{ district.Name }}</option>
        </select>
    </div>
</template>

<script type="text/ecmascript-6">
    import Utility from 'ct-utility';

    export default {
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
            showNation: {
                type: Boolean,
                default: false
            },
            codeForNation: {
                type: String,
                default: '00'
            },
            min: {
                type: String,
                default: 'region' // province city region
            },
            areaList: {
                type: Function,
                default: AREA=>{
                    return AREA;
                }
            }
        },
        data() {
            const that = this;
            let area = '';

            if (/^\d+$/.test(this.initialArea)) {
                if (this.initialArea === '00'){
                    area = '全国';
                } else {
                    area = Utility.areaDataFormat.getAreaNameById(this.initialArea).replace(/-/g, this.sep);
                }
            } else {
                area = this.initialArea;
            }
            return {
                area: area,
                n: area === '全国' ? '全国' : '',
                p: area === '全国' ? '' : area.split(that.sep)[0] || '',
                c: area === '全国' ? '' : area.split(that.sep)[1] || '',
                d: area === '全国' ? '' : area.split(that.sep)[2] || ''
            };
        },
        computed: {
            disabled() {
                return this.n === '全国';
            },
            showCity(){
                return this.min === 'city' || this.min === 'region';
            },
            showRegion(){
                return this.min === 'region';
            },
            source(){
                return this.areaList(AREA);
            },
            provinces(){
                if (this.area !== '全国'){
                    return this.source.province;
                }
                return [];
            },
            cities(){
                if (this.p !== ''){
                    return this.source.city[this.p] || [];
                }
                return [];
            },
            districts(){
                if (this.c !== ''){
                    return this.source.region[this.c] || [];
                }
                return [];
            }
        },
        methods: {
            getArea(readable = true) {
                let result;

                if (this.n === '全国') {
                    if (readable) {
                        result = '全国';
                    } else {
                        result = this.codeForNation;
                    }
                } else {
                    const areaArr = [];

                    if (this.p !== '') {
                        areaArr.push(this.p);
                    }
                    if (this.showCity && this.c !== '') {
                        areaArr.push(this.c);
                    }
                    if (this.showRegion && this.d !== '') {
                        areaArr.push(this.d);
                    }
                    if (readable) {
                        result = areaArr.join(this.sep) || '';
                    } else {
                        if (areaArr.length > 0) {
                            result = Utility.areaDataFormat.getAreaIdByName(areaArr.join(this.sep));
                        } else {
                            result = '';
                        }
                    }
                }
                return result;
            }
        },
        watch: {
            n(n) {
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
                });
            },
            p() {
                const that = this;

                if (typeof this.cities !== 'undefined') {
                    const matched = this.cities.filter(function(city) {
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
                    });
                }
            },
            c() {
                const that = this;

                const matched = this.districts.filter(function(district) {
                    return district.Name === that.d;
                }).length > 0;

                if (!matched) {
                    this.d = '';
                }
                this.$nextTick(function() {
                    if (this.area !== this.getArea()) {
                        this.area = this.getArea();
                        this.$emit('change', this.area);
                    }
                });
            },
            d() {
                this.$nextTick(function() {
                    if (this.area !== this.getArea()) {
                        this.area = this.getArea();
                        this.$emit('change', this.area);
                    }
                });
            },
            initialArea(n) {
                let area = '';

                if (/^\d+$/.test(n)) {
                    if (n === this.codeForNation) {
                        area = '全国';
                    } else {
                        area = Utility.areaDataFormat.getAreaNameById(this.initialArea).replace(/-/g, this.sep);
                    }
                } else {
                    area = this.initialArea;
                }
                this.p = area === '全国' ? '' : area.split(this.sep)[0] || '';
                this.c = area === '全国' ? '' : area.split(this.sep)[1] || '';
                this.d = area === '全国' ? '' : area.split(this.sep)[2] || '';
            }
        }
    };
</script>

<style scoped>
    .area-select-container {
        display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox; /* TWEENER - IE 10 */
        display: -webkit-flex; /* NEW - Chrome */
        display: flex;
        justify-content: space-between;
    }

    .area-select {
        -webkit-box-flex: 1; /* OLD - iOS 6-, Safari 3.1-6 */
        -moz-box-flex: 1; /* OLD - Firefox 19- */
        -webkit-flex: 1; /* Chrome */
        -ms-flex: 1; /* IE 10 */
        flex: 1;
    }
</style>
