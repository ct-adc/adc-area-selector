## ct-adc-area-selector

地区选择组件, select联动

## 组件示例图

![img](https://github.com/ct-adc/adc-area-selector/blob/dev/area-selector.png)

## 在线demo

[在线demo](https://codepen.io/rubyisapm/pen/YVdgdY)

## 功能点

1. selector联动选择地区
2. 数据源使用公司统一AREA库
3. 可以选择全国或指定地区

## 使用

从npm安装ct-adc-area-selector

```
npm install ct-adc-area-selector --save
```
在代码中使用

```
import AreaSelector from 'ct-adc-area-selector';

Vue.component(AreaSelector.name,AreaSelector);
或
new Vue({
    el: '#app',
    components: {
        AreaSelector
    }
}
```

## props

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
initialArea | 初始选中的地区 | String | '' | ''或合法的地区名称/编码 | 以-分割如'浙江-杭州-西湖区'或0601(浙江-杭州)
sep | 地区分隔符 | String | '-' |  | 地区名称中的分隔符 
showNation | 是否显示全国选项 | Boolean | false | true/false | 若不显示全国选项，selector只有三个
codeForNation | 表示"全国"的code | String | '00' | 任何数字或数字组成的字符串 | 其他的地区都是有编码的，但"全国"没有。请配置和后端约定的地区编码
min | 精确到的地区类型 | String | 'region' | 'province' / 'city' / 'region' | 例如只想选择省，就把该值配置为'province'

## 方法

### getArea
    
    参数：readable 默认为true
    
获得选择的结果

方法描述。。。。。。

#### 参数列表

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ----
readable | 结果是中文还是编码 | Boolean | true | true / false | 如果为true返回中文，false则返回地区编码

返回值

类型: {String}

说明: 当前选择的地区

## 事件

### change事件
    
当选择select框且引发了数据改变时，发生该事件。参数为带有分割符(由sep属性指定)的字符串，如'浙江-杭州-西湖区'。

事件名称 | 说明 | 回调参数 | 描述
selected | 选中事件 | value1:说明1; value2: 说明2 | 描述

## 更新日志

[更新日志](https://github.com/ct-adc/adc-area-selector/blob/dev/changeLog.md)

## 外部资源依赖列表

- area.js(1.0.0+)