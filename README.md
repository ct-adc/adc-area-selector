# area-selector地区选择组件

## [在线demo](https://codepen.io/rubyisapm/pen/YVdgdY)

## 使用

从npm安装`ct-adc-area-selector`
```
npm install ct-adc-area-selector
```
在代码中引用
```
import AreaSelector from 'ct-adc-area-selector';
Vue.component(AreaSelector.name,AreaSelector);
```
## 参数说明

参数|描述|类型|默认值
--- | --- | --- | --- |
initialArea | 初始选中的地区,以-分割如'浙江-杭州-西湖区'或0601(浙江-杭州) | String | ''
sep | 地区分隔符 | String | '-'
showNation | 是否显示全国选项 | Boolean | false
codeForNation | 表示"全国"的code（其他的地区都是有编码的，但"全国"没有） | String | '00'

## 事件说明

### change事件

当选择select框且引发了数据改变时，发生该事件。参数为带有分割符(由sep属性指定)的字符串，如'浙江-杭州-西湖区'。


## 方法说明

### getArea

参数：readable 默认为true

获得选择的结果，当readable为false时返回地区编码