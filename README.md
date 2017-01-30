# area-selector地区选择组件

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
area | 初始选中的地区,以-分割如'浙江-杭州-西湖区' | String | ''


## 事件说明

### change事件

当选择select框且引发了数据改变时，发生该事件。参数为'-'分割的字符串，如'浙江-杭州-西湖区'。
